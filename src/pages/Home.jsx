import { useState, useEffect, useRef } from 'react'
import { Search, Link as LinkIcon, FileArchive, QrCode, Music, Star, Film, ArrowRight, Wifi, Battery, BatteryCharging, Clock, Globe, Smartphone, LayoutGrid, User } from 'lucide-react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SettingsMenu from '../components/SettingsMenu'

gsap.registerPlugin(ScrollTrigger)

// Semua card dibikin normal (nggak ada yang featured)
const tools = [
  { id: 1, title: 'File ke Link', desc: 'Unggah file jadi tautan URL.', icon: LinkIcon, badge: 'URL' },
  { id: 2, title: 'Kompres Media', desc: 'Kecilkan ukuran foto & video.', icon: FileArchive, badge: 'MB/KB' },
  { id: 3, title: 'QR Studio', desc: 'Buat kode QR kustom.', icon: QrCode, badge: 'QR' },
  { id: 4, title: 'Audio Merger', desc: 'Gabungkan file audio.', icon: Music, badge: 'MP3' },
  { id: 5, title: 'Photo Studio', desc: 'Edit dan poles foto.', icon: Star, badge: 'IMG' },
  { id: 6, title: 'Video Studio', desc: 'Konversi format video.', icon: Film, badge: 'VID' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [time, setTime] = useState(new Date())
  const [battery, setBattery] = useState({ level: 0, charging: false })
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const titleRef = useRef(null)

  // Animasi GSAP
  useEffect(() => {
    const words = titleRef.current.querySelectorAll('.word')
    gsap.fromTo(words, 
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 90%" }
      }
    )
  }, [])

  // Real-time data
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    
    if (navigator.getBattery) {
      navigator.getBattery().then(batt => {
        setBattery({ level: Math.round(batt.level * 100), charging: batt.charging })
        batt.addEventListener('levelchange', () => setBattery(prev => ({ ...prev, level: Math.round(batt.level * 100) })))
        batt.addEventListener('chargingchange', () => setBattery(prev => ({ ...prev, charging: batt.charging })))
      })
    }

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      clearInterval(timer)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return (
    <div className="min-h-screen pb-20 selection:bg-black selection:text-[#DFFF00]">
      
      <SettingsMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-6">
        
        {/* ================= HERO BANNER ================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-black border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_#111] overflow-hidden mb-6 relative"
        >
          <div className="relative w-full h-[220px] md:h-[300px]">
            <video 
              autoPlay loop muted playsInline 
              className="w-full h-full object-cover opacity-80"
            >
              <source src="https://files.catbox.moe/w7817a.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay Gradient (Kiri Bawah biar teks kebaca) */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-transparent to-transparent" />
            
            {/* Teks Sionyu */}
            <div className="absolute bottom-4 left-5 md:bottom-6 md:left-6">
              <h1 className="text-white font-heading font-extrabold text-3xl md:text-4xl tracking-widest drop-shadow-lg">SIONYU</h1>
              <p className="text-gray-300 text-xs md:text-sm font-medium tracking-wide mt-1">by sion</p>
            </div>
          </div>
        </motion.div>

        {/* ================= INFO BAR (Gaya Foto 1 + Real Data) ================= */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#111] p-3 md:p-4 flex items-center justify-between mb-8"
        >
          {/* Kiri: Avatar & Info */}
          <div className="flex items-center gap-3 w-full">
            <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shrink-0">
              <User size={20} />
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider">
                <Globe size={12} /> Indonesia
                <span className="text-gray-300 mx-0.5">•</span>
                <Smartphone size={12} /> Android
              </div>
              <div className="flex items-center gap-3 mt-1">
                {/* Waktu */}
                <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold font-mono">
                  <Clock size={12}/> {time.toLocaleTimeString('id-ID', { hour12: false })}
                </span>
                {/* Baterai */}
                <span className="flex items-center gap-1 text-[10px] md:text-xs font-bold font-mono">
                  {battery.charging ? <BatteryCharging size={14} className="text-green-600"/> : <Battery size={14} />} 
                  {navigator.getBattery ? `${battery.level}%` : 'N/A'}
                </span>
                {/* Jaringan */}
                <span className={`flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase ${isOnline ? 'text-green-600' : 'text-red-500'}`}>
                  <Wifi size={12} /> {isOnline ? 'On' : 'Off'}
                </span>
              </div>
            </div>
          </div>

          {/* Kanan: Tombol Menu Grid */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 border-2 border-black rounded-lg bg-gray-50 hover:bg-[#DFFF00] active:scale-95 transition-all shrink-0 ml-2"
          >
            <LayoutGrid size={20} strokeWidth={2.5} />
          </button>
        </motion.div>

        {/* ================= SEARCH BAR ================= */}
        <div className="relative group mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-transform group-focus-within:scale-110 group-focus-within:text-black">
            <Search className="h-5 w-5 text-gray-400" strokeWidth={3} />
          </div>
          <input
            type="text"
            placeholder="Cari alat yang lo butuhin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#111] focus:outline-none focus:-translate-y-1 focus:shadow-[6px_6px_0px_0px_#DFFF00] transition-all text-sm font-bold placeholder-gray-400"
          />
        </div>

        {/* ================= SECTION TITLE ================= */}
        <div ref={titleRef} className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight flex gap-2">
            <span className="word inline-block">Semua</span>
            <span className="word inline-block">Alat.</span>
          </h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tools.length} Tersedia</span>
        </div>

        {/* ================= GRID TOOLS (2 KOLOM NORMAL) ================= */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).map((tool, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -4, boxShadow: "6px 6px 0px 0px #111" }}
              whileTap={{ scale: 0.97, boxShadow: "2px 2px 0px 0px #111" }}
              key={tool.id}
              className="bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#111] p-3 md:p-4 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="p-2 bg-gray-50 border-2 border-black rounded-lg text-black">
                    <tool.icon size={20} strokeWidth={2.5} />
                  </div>
                  <span className="text-[8px] md:text-[9px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 border-2 border-black rounded-md bg-white">
                    {tool.badge}
                  </span>
                </div>
                
                <h3 className="text-sm md:text-base font-extrabold text-black leading-tight mb-1">{tool.title}</h3>
                <p className="text-gray-500 text-[10px] md:text-xs leading-snug mb-4 line-clamp-2">{tool.desc}</p>
              </div>

              <button className="w-full py-2 bg-black text-white rounded-lg font-bold text-xs flex items-center justify-between px-3 group/btn hover:bg-gray-800 transition-colors">
                <span>Buka</span>
                <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).length === 0 && (
          <div className="text-center py-12 border-2 border-black border-dashed rounded-xl bg-white/50 mt-4">
            <h3 className="text-lg font-bold font-heading">Nggak ketemu.</h3>
            <p className="text-sm text-gray-500 mt-1">Coba pakai kata kunci lain.</p>
          </div>
        )}

      </div>
    </div>
  )
        }
