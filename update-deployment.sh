#!/bin/bash
# Update Deployment Script for douirilabs.studio
# Run this script on your Digital Ocean droplet whenever you push updates

echo "🔄 Stopping Docker containers..."
docker-compose down

echo "📥 Pulling latest changes from Git..."
git pull origin main

echo "🏗️  Building and starting Docker containers..."
docker-compose up -d --build

echo "✅ Deployment complete!"
echo "🌐 Your site is live at: https://douirilabs.studio"

# Show container status
echo ""
echo "📊 Container status:"
docker-compose ps

# Show recent logs
echo ""
echo "📝 Recent logs:"
docker-compose logs --tail=20
