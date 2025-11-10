import { useState } from 'react'
import Modal from './Modal'
import i18n from '../i18n'
import { Mail, Send, User, AtSign, MessageSquare, AlertCircle } from 'lucide-react'

export default function EmailModal({ open, onClose }) {
  const t = (k, opts) => i18n.t(k, opts)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    const recipient = t('email') || ''
    const bodyParts = []
    if (name) bodyParts.push(`${t('modal.name')}: ${name}`)
    if (email) bodyParts.push(`${t('modal.email')}: ${email}`)
    if (message) bodyParts.push('\n' + message)
    const body = bodyParts.join('\n')
    const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject || t('start_project.title'))}&body=${encodeURIComponent(body)}`
    
    // Small delay to show loading state
    setTimeout(() => {
      window.location.href = mailto
      setIsSubmitting(false)
      // Reset form and close after opening mail client
      setName('')
      setEmail('')
      setSubject('')
      setMessage('')
      setErrors({})
      onClose()
    }, 300)
  }

  return (
    <Modal open={open} onClose={onClose} title={t('modal.title')}>
      <form onSubmit={submit} className="space-y-8" noValidate>
        <div>
          <label htmlFor="contact-name" className="block text-sm font-light text-white/70 mb-3">
            {t('modal.name')} <span className="text-[#BB8400]">*</span>
          </label>
          <input 
            id="contact-name"
            type="text"
            value={name} 
            onChange={(e) => {
              setName(e.target.value)
              if (errors.name) setErrors({...errors, name: null})
            }}
            aria-invalid={!!errors.name}
            className={`w-full px-0 py-3 border-0 border-b ${errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#BB8400]'} bg-transparent text-white placeholder-white/30 focus:ring-0 transition-colors outline-none font-light`}
            placeholder="John Doe" 
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400 font-light">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-light text-white/70 mb-3">
            {t('modal.email')} <span className="text-[#BB8400]">*</span>
          </label>
          <input 
            id="contact-email"
            type="email"
            value={email} 
            onChange={(e) => {
              setEmail(e.target.value)
              if (errors.email) setErrors({...errors, email: null})
            }}
            aria-invalid={!!errors.email}
            className={`w-full px-0 py-3 border-0 border-b ${errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#BB8400]'} bg-transparent text-white placeholder-white/30 focus:ring-0 transition-colors outline-none font-light`}
            placeholder="john@example.com" 
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400 font-light">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-sm font-light text-white/70 mb-3">
            {t('modal.subject')} <span className="text-[#BB8400]">*</span>
          </label>
          <input 
            id="contact-subject"
            type="text"
            value={subject} 
            onChange={(e) => {
              setSubject(e.target.value)
              if (errors.subject) setErrors({...errors, subject: null})
            }}
            aria-invalid={!!errors.subject}
            className={`w-full px-0 py-3 border-0 border-b ${errors.subject ? 'border-red-500' : 'border-white/10 focus:border-[#BB8400]'} bg-transparent text-white placeholder-white/30 focus:ring-0 transition-colors outline-none font-light`}
            placeholder="Project inquiry" 
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-400 font-light">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-light text-white/70 mb-3">
            {t('modal.message')} <span className="text-[#BB8400]">*</span>
          </label>
          <textarea 
            id="contact-message"
            value={message} 
            onChange={(e) => {
              setMessage(e.target.value)
              if (errors.message) setErrors({...errors, message: null})
            }}
            aria-invalid={!!errors.message}
            rows={4} 
            className={`w-full px-0 py-3 border-0 border-b ${errors.message ? 'border-red-500' : 'border-white/10 focus:border-[#BB8400]'} bg-transparent text-white placeholder-white/30 focus:ring-0 transition-colors outline-none resize-none font-light`}
            placeholder="Tell us about your project..."
          ></textarea>
          {errors.message && (
            <p className="mt-2 text-sm text-red-400 font-light">{errors.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="inline-flex items-center gap-3 px-12 py-4 border border-[#BB8400]/30 hover:border-[#BB8400] disabled:border-white/10 text-white hover:text-[#BB8400] disabled:text-white/30 disabled:cursor-not-allowed transition-all duration-500 font-light tracking-wider text-sm"
          >
            {isSubmitting ? 'Sending...' : t('modal.send')}
            <span className="w-8 h-px bg-current" />
          </button>
          <button 
            type="button" 
            onClick={onClose}
            disabled={isSubmitting}
            className="text-sm text-white/40 hover:text-white disabled:text-white/20 disabled:cursor-not-allowed transition-colors font-light"
          >
            {t('modal.close')}
          </button>
        </div>
      </form>
    </Modal>
  )
}
