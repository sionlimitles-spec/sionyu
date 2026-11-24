import { motion, AnimatePresence } from 'motion/react'
import { X, Settings, Bug, Info, Shield, Sun } from 'lucide-react'

export default function SettingsMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Gelap */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />
          
          {/* Panel Seting */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[280px] bg-[#f4f4f0] border-l-2 border-black z-50 shadow-[-4px_0px_0px_0px_#111] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b-2 border-black bg-white">
              <h2 className="font-heading font-bold text-lg flex items-center gap-2">
                <Settings size={18} /> Menu
              </h2>
              <button onClick={onClose} className="p-1 border-2 border-black rounded-md hover:bg-gray-100 active:scale-95 transition-transform">
                <X size={18} strokeWidth={3} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-2">
              <button className="flex items-center gap-3 w-full p-3 border-2 border-transparent hover:border-black rounded-xl font-bold text-sm transition-all hover:bg-white">
                <Info size={18} /> Tentang Web
              </button>
              <button className="flex items-center gap-3 w-full p-3 border-2 border-transparent hover:border-black rounded-xl font-bold text-sm transition-all hover:bg-white">
                <Bug size={18} /> Lapor Bug
              </button>
              <button className="flex items-center gap-3 w-full p-3 border-2 border-transparent hover:border-black rounded-xl font-bold text-sm transition-all hover:bg-white">
                <Shield size={18} /> Kebijakan Privasi
              </button>
              <div className="h-0.5 bg-gray-300 my-2 rounded-full" />
              <button className="flex items-center gap-3 w-full p-3 border-2 border-transparent hover:border-black rounded-xl font-bold text-sm transition-all hover:bg-white">
                <Sun size={18} /> Mode Terang (Segera)
              </button>
            </div>
            
            <div className="mt-auto p-4 text-center text-xs text-gray-500 font-medium">
              v1.0.0 • by sion
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
