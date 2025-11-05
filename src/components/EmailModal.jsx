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
      <form onSubmit={submit} className="space-y-4 sm:space-y-5" noValidate>
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.name')} <span className="text-red-400">*</span></span>
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
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:ring-2 transition-all outline-none text-sm sm:text-base`}
            placeholder="John Doe" 
            autoComplete="name"
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <AtSign className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.email')} <span className="text-red-400">*</span></span>
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
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:ring-2 transition-all outline-none text-sm sm:text-base`}
            placeholder="john@example.com" 
            autoComplete="email"
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.subject')} <span className="text-red-400">*</span></span>
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
            aria-describedby={errors.subject ? "subject-error" : undefined}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:ring-2 transition-all outline-none text-sm sm:text-base`}
            placeholder="Project inquiry" 
          />
          {errors.subject && (
            <p id="subject-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.subject}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.message')} <span className="text-red-400">*</span></span>
          </label>
          <textarea 
            id="contact-message"
            value={message} 
            onChange={(e) => {
              setMessage(e.target.value)
              if (errors.message) setErrors({...errors, message: null})
            }}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            rows={4} 
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-600 focus:border-indigo-500 focus:ring-indigo-500/20'} bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:ring-2 transition-all outline-none resize-none text-sm sm:text-base`}
            placeholder="Tell us about your project..."
          ></textarea>
          {errors.message && (
            <p id="message-error" className="mt-1.5 text-sm text-red-400 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              {errors.message}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg disabled:transform-none disabled:shadow-none text-sm sm:text-base"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 flex-shrink-0" /> {t('modal.send')}
              </>
            )}
          </button>
          <button 
            type="button" 
            onClick={onClose}
            disabled={isSubmitting}
            className="text-sm text-slate-400 hover:text-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors py-2"
          >
            {t('modal.close')}
          </button>
        </div>
      </form>
    </Modal>
  )
}
