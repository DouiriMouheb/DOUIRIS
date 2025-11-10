import React from 'react'
import { CheckCircle } from 'lucide-react'

export default function ContactCard({ t, onContact }) {
  return (
    <div className="mx-auto w-full max-w-lg bg-black border border-[#BB8400]/20 rounded-2xl p-8 shadow-xl hover:border-[#BB8400]/40 transition-all duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-light text-white">{t('start_project.title')}</h3>
          <p className="text-sm text-white/60 font-light">{t('start_project.desc')}</p>
        </div>
        <div className="text-white/50 text-sm font-light">Est. time: 2-4 weeks</div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-white/60 mb-4 font-light">{t('start_project.desc')}</p>
        <button 
          onClick={onContact} 
          className="inline-flex items-center gap-3 px-8 py-3 border border-[#BB8400]/30 hover:border-[#BB8400] text-white hover:text-[#BB8400] transition-all duration-500 font-light tracking-wider text-sm"
        >
          {t('start_project.request_quote')}
          <span className="w-6 h-px bg-current" />
        </button>
        <div className="mt-4 text-sm text-white/60 flex items-center gap-2 font-light">
          <CheckCircle className="w-4 h-4 text-[#BB8400]" /> {t('start_project.secure')}
        </div>
      </div>
    </div>
  )
}
