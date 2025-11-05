import React, { useEffect } from 'react'

export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div
        className="relative z-10 max-w-xl w-full mx-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-600 hover:text-slate-800 dark:text-slate-300"
          >
            ✕
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}
