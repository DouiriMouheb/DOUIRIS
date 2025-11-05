import React, { useState } from 'react'
import Modal from './Modal'
import i18n from '../i18n'
import { Mail, CheckCircle } from 'lucide-react'

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
      <form onSubmit={submit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-700 dark:text-slate-200">{t('modal.name')}</label>
          <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border bg-white/90" placeholder={t('modal.name')} />
        </div>

        <div>
          <label className="block text-sm text-slate-700 dark:text-slate-200">{t('modal.email')}</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border bg-white/90" placeholder={t('modal.email')} />
        </div>

        <div>
          <label className="block text-sm text-slate-700 dark:text-slate-200">{t('modal.subject')}</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full mt-1 px-3 py-2 rounded border bg-white/90" placeholder={t('modal.subject')} />
        </div>

        <div>
          <label className="block text-sm text-slate-700 dark:text-slate-200">{t('modal.message')}</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full mt-1 px-3 py-2 rounded border bg-white/90" placeholder={t('modal.message')}></textarea>
        </div>

        <div className="flex items-center justify-between">
          <button type="submit" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
            <Mail className="w-4 h-4" /> {t('modal.send')}
          </button>
          <button type="button" onClick={onClose} className="text-sm text-slate-600 hover:underline">{t('modal.close')}</button>
        </div>
      </form>
    </Modal>
  )
}
