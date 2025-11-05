import React from 'react'
import { Code, Server, Phone, Mail } from 'lucide-react'

export default function ServicesGrid({ t }) {
  const items = [
    { 
      title: 'Front-end', 
      desc: 'React, performance and accessible interfaces.', 
      icon: <Code className="w-6 h-6 text-indigo-400" />,
      gradient: 'from-indigo-500/10 to-purple-500/10'
    },
    { 
      title: 'Back-end', 
      desc: 'APIs, integrations, and scalable services.', 
      icon: <Server className="w-6 h-6 text-emerald-400" />,
      gradient: 'from-emerald-500/10 to-teal-500/10'
    },
    { 
      title: t('features.support'), 
      desc: 'On-call, maintenance and continuous improvements.', 
      icon: <Phone className="w-6 h-6 text-amber-400" />,
      gradient: 'from-amber-500/10 to-orange-500/10'
    },
    { 
      title: t('features.consulting'), 
      desc: 'Architecture reviews and team training.', 
      icon: <Mail className="w-6 h-6 text-pink-400" />,
      gradient: 'from-pink-500/10 to-rose-500/10'
    }
  ]

  return (
    <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-0">
      {items.map((it, idx) => (
        <div 
          key={idx} 
          className={`group p-5 sm:p-6 rounded-xl bg-gradient-to-br ${it.gradient} backdrop-blur-sm border border-slate-700/50 hover:border-slate-600 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl`}
          style={{
            animation: `fadeInUp 0.6s ease-out ${idx * 0.1}s both`
          }}
        >
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 bg-slate-800/50 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300">
              {it.icon}
            </div>
            <div>
              <h4 className="font-semibold text-base sm:text-lg mb-1.5 sm:mb-2">{it.title}</h4>
              <p className="text-slate-400 text-sm leading-relaxed">{it.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
