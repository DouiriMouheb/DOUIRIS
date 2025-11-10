# Complete Digital Ocean Deployment Guide
## Deploying React + Vite App with Docker, Nginx, and SSL

**Project:** DOUIRIS  
**Domain:** https://douirilabs.studio  
**Stack:** React, Vite, Docker, Nginx, Let's Encrypt SSL  

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Initial Server Setup](#initial-server-setup)
3. [DNS Configuration](#dns-configuration)
4. [Docker Installation & Deployment](#docker-installation--deployment)
5. [Nginx Reverse Proxy Setup](#nginx-reverse-proxy-setup)
6. [Firewall Configuration](#firewall-configuration)
7. [SSL Certificate Setup](#ssl-certificate-setup)
8. [Updating Deployment](#updating-deployment)
9. [Troubleshooting](#troubleshooting)
10. [Maintenance](#maintenance)

---

## Prerequisites

- Digital Ocean Droplet (Ubuntu 22.04 recommended)
- Domain name (e.g., douirilabs.studio)
- GitHub repository with your code
- SSH access to your droplet

---

## Initial Server Setup

### 1. Connect to Your Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

### 2. Update System Packages

```bash
apt update && apt upgrade -y
```

### 3. Install Required Software

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
systemctl start docker
systemctl enable docker

# Install Docker Compose
apt install -y docker-compose

# Install Nginx
apt-get install -y nginx

# Install Certbot for SSL
apt-get install -y certbot python3-certbot-nginx

# Install Curl (for testing)
apt-get install -y curl

# Verify installations
docker --version
docker-compose --version
nginx -v
certbot --version
```

---

## DNS Configuration

### Configure Your Domain (at your domain registrar)

1. **A Record** for root domain:
   - **Host/Name:** `@`
   - **Type:** A
   - **Value:** Your droplet's IP address (e.g., 159.89.30.67)
   - **TTL:** 300 or Auto

2. **CNAME Record** for www subdomain:
   - **Host/Name:** `www`
   - **Type:** CNAME
   - **Value:** `yourdomain.com` (e.g., douirilabs.studio)
   - **TTL:** 300 or Auto

3. **Optional - API subdomain:**
   - **Host/Name:** `api`
   - **Type:** A
   - **Value:** Your droplet's IP address
   - **TTL:** 300 or Auto

### Verify DNS Propagation

```bash
# Check if domain resolves to your IP
nslookup yourdomain.com

# Or use dig
dig yourdomain.com
```

**Note:** DNS propagation can take 5-30 minutes (sometimes up to 48 hours).

---

## Docker Installation & Deployment

### 1. Clone Your Repository

```bash
# Navigate to web directory
cd /var/www

# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Project Structure

Your project should have these files:

```
DOUIRIS/
├── docker-compose.yml
├── Dockerfile
├── nginx.conf
├── package.json
├── src/
└── public/
```

### 3. Docker Configuration Files

**Dockerfile:**
```dockerfile
# Multi-stage build: build with Node, serve static with nginx
FROM node:18-alpine AS builder
WORKDIR /app

# install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --silent || npm install --silent

# copy and build
COPY . .
RUN npm run build

### Production image
FROM nginx:stable-alpine

# Remove default nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml:**
```yaml
version: '3.8'
services:
  web:
    build: .
    image: douiris-web:latest
    ports:
      - "5173:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

**nginx.conf (inside Docker):**
```nginx
server {
  listen 80;
  server_name douirilabs.studio www.douirilabs.studio;
  root /usr/share/nginx/html;
  index index.html;

  # SPA: serve index.html for missing files
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Optional: increase file size limits for uploads
  client_max_body_size 10M;

  # Security headers (basic)
  add_header X-Frame-Options "SAMEORIGIN";
  add_header X-Content-Type-Options "nosniff";
  add_header Referrer-Policy "no-referrer-when-downgrade";
}
```

### 4. Build and Run Docker Container

```bash
# Build and start containers in detached mode
docker-compose up -d --build

# Check if container is running
docker-compose ps

# View logs
docker-compose logs -f

# Stop viewing logs: Ctrl+C
```

**Expected Output:**
```
NAME              STATUS    PORTS
douiris-web-1     Up        0.0.0.0:5173->80/tcp
```

### 5. Test Docker Container

```bash
# Test if app is accessible locally
curl http://localhost:5173
```

You should see HTML output from your React app.

---

## Nginx Reverse Proxy Setup

### 1. Create Nginx Configuration for Your Domain

```bash
# Create nginx config file
cat > /etc/nginx/sites-available/douirilabs.studio << 'EOF'
server {
    listen 80;
    server_name douirilabs.studio www.douirilabs.studio;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF
```

### 2. Enable the Site

```bash
# Create symbolic link to enable the site
ln -s /etc/nginx/sites-available/douirilabs.studio /etc/nginx/sites-enabled/

# Remove default nginx site
rm -f /etc/nginx/sites-enabled/default

# Test nginx configuration
nginx -t

# If test passes, reload nginx
systemctl reload nginx
systemctl enable nginx
```

### 3. Test Nginx

```bash
# Test from server
curl -I http://localhost:80

# You should see: HTTP/1.1 200 OK
```

---

## Firewall Configuration

### 1. Configure UFW (Ubuntu Firewall)

```bash
# Allow Nginx (HTTP and HTTPS)
ufw allow 'Nginx Full'

# Allow SSH (important - don't lock yourself out!)
ufw allow OpenSSH

# Enable firewall
ufw enable

# Check firewall status
ufw status verbose
```

**Expected Output:**
```
To                         Action      From
--                         ------      ----
22/tcp                     LIMIT       Anywhere
80/tcp (Nginx Full)        ALLOW       Anywhere
443/tcp (Nginx Full)       ALLOW       Anywhere
```

### 2. Digital Ocean Cloud Firewall

In Digital Ocean Dashboard:

1. Go to **Networking** → **Firewalls**
2. Ensure your droplet has these **Inbound Rules**:
   - **SSH:** Port 22, All IPv4/IPv6
   - **HTTP:** Port 80, All IPv4/IPv6
   - **HTTPS:** Port 443, All IPv4/IPv6

### 3. Test HTTP Access

Visit **http://yourdomain.com** in your browser. Your site should load!

---

## SSL Certificate Setup

### 1. Install SSL Certificate with Certbot

```bash
# Run Certbot to get SSL certificate and auto-configure Nginx
certbot --nginx -d douirilabs.studio -d www.douirilabs.studio
```

### 2. Follow the Prompts

1. **Enter email address:** Your email for renewal notifications
2. **Agree to Terms of Service:** Y
3. **Share email with EFF:** Y or N (your choice)
4. **Redirect HTTP to HTTPS:** Choose **2** (Redirect)

### 3. Verify SSL Configuration

Certbot will automatically:
- Obtain SSL certificates from Let's Encrypt
- Modify your Nginx config to use HTTPS
- Set up automatic HTTP → HTTPS redirects
- Configure auto-renewal

### 4. Test HTTPS

Visit **https://douirilabs.studio** - you should see a secure padlock! 🔒

### 5. Verify Auto-Renewal

```bash
# Test renewal process (dry run)
certbot renew --dry-run
```

**Note:** Certificates auto-renew every 90 days via cron job.

### 6. Check Certificate Status

```bash
# View certificate information
certbot certificates
```

---

## Updating Deployment

### Method 1: Manual Update

```bash
# Navigate to project directory
cd /var/www/DOUIRIS

# Stop Docker containers
docker-compose down

# Pull latest changes from GitHub
git pull origin main

# Rebuild and restart containers
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs --tail=50
```

### Method 2: Using Update Script

Create an update script:

```bash
# Create update script
cat > /var/www/DOUIRIS/update-deployment.sh << 'EOF'
#!/bin/bash
echo "🔄 Stopping Docker containers..."
docker-compose down

echo "📥 Pulling latest changes from Git..."
git pull origin main

echo "🏗️  Building and starting Docker containers..."
docker-compose up -d --build

echo "✅ Deployment complete!"
echo "🌐 Your site is live at: https://douirilabs.studio"

echo ""
echo "📊 Container status:"
docker-compose ps

echo ""
echo "📝 Recent logs:"
docker-compose logs --tail=20
EOF

# Make it executable
chmod +x /var/www/DOUIRIS/update-deployment.sh
```

**Usage:**
```bash
cd /var/www/DOUIRIS
./update-deployment.sh
```

---

## Troubleshooting

### Site Not Loading

**Check if Docker container is running:**
```bash
docker-compose ps
```

**Check Docker logs:**
```bash
docker-compose logs --tail=100
```

**Test if app responds locally:**
```bash
curl http://localhost:5173
```

### Nginx Issues

**Check Nginx status:**
```bash
systemctl status nginx
```

**Check Nginx error logs:**
```bash
tail -50 /var/log/nginx/error.log
```

**Check Nginx access logs:**
```bash
tail -50 /var/log/nginx/access.log
```

**Test Nginx configuration:**
```bash
nginx -t
```

**Restart Nginx:**
```bash
systemctl restart nginx
```

### Firewall Issues

**Check UFW status:**
```bash
ufw status verbose
```

**Check what's listening on ports:**
```bash
ss -tlnp | grep :80
ss -tlnp | grep :443
ss -tlnp | grep :5173
```

### SSL Certificate Issues

**Check certificate status:**
```bash
certbot certificates
```

**Test renewal:**
```bash
certbot renew --dry-run
```

**Force certificate renewal:**
```bash
certbot renew --force-renewal
```

**View Certbot logs:**
```bash
tail -50 /var/log/letsencrypt/letsencrypt.log
```

### DNS Issues

**Check DNS resolution:**
```bash
nslookup yourdomain.com
dig yourdomain.com
```

**Flush DNS cache (on your local Windows machine):**
```powershell
ipconfig /flushdns
```

### Docker Issues

**Restart Docker:**
```bash
systemctl restart docker
```

**Remove all containers and rebuild:**
```bash
docker-compose down
docker system prune -a  # WARNING: removes all unused images
docker-compose up -d --build
```

**Check Docker disk usage:**
```bash
docker system df
```

---

## Maintenance

### Regular Maintenance Tasks

**1. Update System Packages (monthly):**
```bash
apt update && apt upgrade -y
```

**2. Check Disk Space:**
```bash
df -h
```

**3. Clean Docker:**
```bash
# Remove unused Docker images
docker image prune -a

# Remove unused containers
docker container prune
```

**4. Monitor Logs:**
```bash
# Docker logs
docker-compose logs --tail=100

# Nginx access logs
tail -100 /var/log/nginx/access.log

# Nginx error logs
tail -100 /var/log/nginx/error.log

# System logs
journalctl -xe
```

**5. Check SSL Certificate Expiry:**
```bash
certbot certificates
```

### Backup Strategy

**1. Backup Important Files:**
```bash
# Backup nginx config
cp /etc/nginx/sites-available/douirilabs.studio ~/backup/

# Backup docker-compose files
cp /var/www/DOUIRIS/docker-compose.yml ~/backup/
cp /var/www/DOUIRIS/Dockerfile ~/backup/
```

**2. Database Backups (if applicable):**
```bash
# Add database backup commands here
```

### Security Best Practices

**1. Set up automatic security updates:**
```bash
apt install unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades
```

**2. Create a non-root user:**
```bash
adduser deploy
usermod -aG sudo deploy
usermod -aG docker deploy
```

**3. Disable root SSH login:**
```bash
nano /etc/ssh/sshd_config
# Set: PermitRootLogin no
systemctl restart sshd
```

**4. Set up SSH keys (more secure than passwords):**
```bash
# On your local machine, generate SSH key
ssh-keygen -t rsa -b 4096

# Copy to server
ssh-copy-id deploy@YOUR_DROPLET_IP
```

**5. Configure fail2ban (prevents brute force attacks):**
```bash
apt install fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

### Monitoring

**Check uptime:**
```bash
uptime
```

**Check memory usage:**
```bash
free -h
```

**Check CPU usage:**
```bash
top
# Press 'q' to quit
```

**Check running processes:**
```bash
ps aux | grep nginx
ps aux | grep docker
```

---

## Quick Reference

### Important File Locations

- **Nginx config:** `/etc/nginx/sites-available/douirilabs.studio`
- **Nginx logs:** `/var/log/nginx/`
- **SSL certificates:** `/etc/letsencrypt/live/douirilabs.studio/`
- **Project directory:** `/var/www/DOUIRIS`
- **Docker compose file:** `/var/www/DOUIRIS/docker-compose.yml`

### Common Commands

```bash
# Docker
docker-compose ps                    # Check container status
docker-compose logs -f               # View live logs
docker-compose restart               # Restart containers
docker-compose down                  # Stop containers
docker-compose up -d --build         # Rebuild and start

# Nginx
nginx -t                             # Test config
systemctl status nginx               # Check status
systemctl restart nginx              # Restart nginx
systemctl reload nginx               # Reload config

# Firewall
ufw status                           # Check firewall
ufw allow 80/tcp                     # Allow port
ufw enable                           # Enable firewall

# SSL
certbot certificates                 # Check certificates
certbot renew                        # Renew certificates
certbot renew --dry-run              # Test renewal

# System
systemctl status SERVICE_NAME        # Check service
journalctl -xe                       # View system logs
df -h                                # Check disk space
free -h                              # Check memory
```

### Your Deployment Info

- **Domain:** https://douirilabs.studio
- **Droplet IP:** 159.89.30.67
- **Docker Port:** 5173 (internal)
- **Nginx Ports:** 80 (HTTP), 443 (HTTPS)
- **Project Path:** /var/www/DOUIRIS
- **Repository:** https://github.com/DouiriMouheb/DOUIRIS

---

## Deployment Checklist

- [ ] Digital Ocean Droplet created
- [ ] SSH access configured
- [ ] System packages updated
- [ ] Docker installed and running
- [ ] Docker Compose installed
- [ ] Repository cloned
- [ ] Docker container built and running
- [ ] Nginx installed and configured
- [ ] Reverse proxy set up
- [ ] UFW firewall configured
- [ ] Digital Ocean firewall configured
- [ ] DNS A records configured
- [ ] DNS CNAME records configured
- [ ] HTTP site accessible
- [ ] SSL certificate installed
- [ ] HTTPS site accessible
- [ ] HTTP → HTTPS redirect working
- [ ] SSL auto-renewal tested

---

## Support & Resources

- **Digital Ocean Docs:** https://docs.digitalocean.com/
- **Docker Docs:** https://docs.docker.com/
- **Nginx Docs:** https://nginx.org/en/docs/
- **Let's Encrypt:** https://letsencrypt.org/
- **Certbot:** https://certbot.eff.org/

---

## Notes

- SSL certificates renew automatically every 90 days
- DNS changes can take up to 48 hours to propagate
- Always test nginx config with `nginx -t` before reloading
- Keep backups of important configuration files
- Monitor disk space regularly
- Review logs periodically for issues

---

**Last Updated:** November 8, 2025  
**Status:** ✅ Production Ready

---

## Need Help?

If you encounter issues not covered in this guide:

1. Check the troubleshooting section
2. Review nginx and docker logs
3. Verify firewall settings
4. Test each component individually
5. Check Digital Ocean community forums

Good luck with your deployment! 🚀
