import { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export default function InstallPrompt() {
  const { language, translations } = useLanguage()
  const isRTL = language === 'fa'
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Listen for the beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    // Listen for app installed event
    const handleAppInstalled = () => {
      setIsInstalled(true)
      setShowInstallButton(false)
      setDeferredPrompt(null)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return
    }

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)
    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (isInstalled) {
    return null
  }

  if (!showInstallButton) {
    return null
  }

  return (
    <div 
      className={`fixed bottom-4 ${isRTL ? 'left-4' : 'right-4'} bg-darker/95 backdrop-blur-md border border-white/10 text-white px-4 py-3 rounded-lg shadow-xl z-50 flex ${isRTL ? 'flex-row-reverse' : ''} items-center gap-3`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className={`flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
        <p className="font-semibold text-white">{translations.installPrompt.title}</p>
        <p className="text-sm text-gray-400">{translations.installPrompt.description}</p>
      </div>
      <button
        onClick={handleInstallClick}
        className="bg-netflix-red text-white px-4 py-2 rounded-md font-semibold hover:bg-netflix-red-hover transition-all duration-300 ease-in-out hover:-translate-y-0.5 whitespace-nowrap"
      >
        {translations.installPrompt.button}
      </button>
    </div>
  )
}

