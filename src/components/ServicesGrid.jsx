import { Code, Server, Phone, Mail } from 'lucide-react'

export default function ServicesGrid({ t }) {
  const items = [
    { 
      title: 'Front-end', 
      desc: 'React, performance and accessible interfaces.', 
      icon: Code
    },
    { 
      title: 'Back-end', 
      desc: 'APIs, integrations, and scalable services.', 
      icon: Server
    },
    { 
      title: t('features.support'), 
      desc: 'On-call, maintenance and continuous improvements.', 
      icon: Phone
    },
    { 
      title: t('features.consulting'), 
      desc: 'Architecture reviews and team training.', 
      icon: Mail
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((it, idx) => (
        <article
          key={idx}
          className="group bg-black p-12 hover:bg-white/5 transition-all duration-500 cursor-pointer shadow-lg shadow-gray-800/50 hover:shadow-xl hover:shadow-gray-700/60"
          style={{
            animation: `fadeInUp 0.8s ease-out ${idx * 0.15}s both`
          }}
        >
          <div className="flex flex-col items-start gap-6">
            <it.icon className="w-8 h-8 text-[#BB8400]/50 group-hover:text-[#BB8400] transition-colors duration-500" />
            <div>
              <h4 className="text-xl font-light text-white mb-3">{it.title}</h4>
              <p className="text-white/50 text-sm leading-relaxed font-light">{it.desc}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
