import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function ContactCard({ t, onContact }) {
  return (
    <div className="mx-auto w-full max-w-lg bg-gradient-to-tr from-indigo-600/20 to-slate-700/40 rounded-2xl p-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">{t('start_project.title')}</h3>
          <p className="text-sm text-slate-300">{t('start_project.desc')}</p>
        </div>
        <div className="text-slate-200/70 text-sm">Est. time: 2-4 weeks</div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-300 mb-4">{t('start_project.desc')}</p>
        <button onClick={onContact} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">{t('start_project.request_quote')}</button>
        <div className="mt-4 text-sm text-slate-300 flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-400" /> {t('start_project.secure')}</div>
      </div>
    </div>
  )
}
