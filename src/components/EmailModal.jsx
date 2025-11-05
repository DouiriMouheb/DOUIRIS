import React, { useState } from 'react'
import Modal from './Modal'
import i18n from '../i18n'
import { Mail, Send, User, AtSign, MessageSquare } from 'lucide-react'

export default function EmailModal({ open, onClose }) {
  const t = (k, opts) => i18n.t(k, opts)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const recipient = t('email') || ''
    const bodyParts = []
    if (name) bodyParts.push(`${t('modal.name')}: ${name}`)
    if (email) bodyParts.push(`${t('modal.email')}: ${email}`)
    if (message) bodyParts.push('\n' + message)
    const body = bodyParts.join('\n')
    const mailto = `mailto:${encodeURIComponent(recipient)}?subject=${encodeURIComponent(subject || t('start_project.title'))}&body=${encodeURIComponent(body)}`
    window.location.href = mailto
    // close after opening mail client
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose} title={t('modal.title')}>
      <form onSubmit={submit} className="space-y-4 sm:space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <User className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.name')}</span>
          </label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm sm:text-base" 
            placeholder={t('modal.name')} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <AtSign className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.email')}</span>
          </label>
          <input 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm sm:text-base" 
            placeholder={t('modal.email')} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.subject')}</span>
          </label>
          <input 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)} 
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-sm sm:text-base" 
            placeholder={t('modal.subject')} 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            <span>{t('modal.message')}</span>
          </label>
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            rows={4} 
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-slate-100 placeholder-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none resize-none text-sm sm:text-base" 
            placeholder={t('modal.message')}
          ></textarea>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <button 
            type="submit" 
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium transition-all transform hover:-translate-y-0.5 hover:shadow-lg text-sm sm:text-base"
          >
            <Send className="w-4 h-4 flex-shrink-0" /> {t('modal.send')}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-sm text-slate-400 hover:text-slate-200 transition-colors py-2"
          >
            {t('modal.close')}
          </button>
        </div>
      </form>
    </Modal>
  )
}
