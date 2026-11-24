import { useState, useEffect, useRef } from 'react'
import { Search, Link as LinkIcon, FileArchive, QrCode, Music, Star, Film, ArrowRight, Wifi, WifiOff, Battery, BatteryCharging, Clock } from 'lucide-react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tools = [
  { id: 1, title: 'File ke Link', desc: 'Unggah file dan ubah menjadi tautan URL yang bisa dibagikan.', icon: LinkIcon, badge: 'UNIVERSAL', featured: true },
  { id: 2, title: 'Kompres Media', desc: 'Kecilkan ukuran foto & video tanpa merusak kualitas.', icon: FileArchive, badge: 'MB/KB' },
  { id: 3, title: 'QR Studio', desc: 'Buat kode QR kustom dengan logo.', icon: QrCode, badge: 'QR' },
  { id: 4, title: 'Audio Merger', desc: 'Gabungkan beberapa file audio jadi satu.', icon: Music, badge: 'MP3' },
  { id: 5, title: 'Photo Studio', desc: 'Edit dan poles foto jadi lebih estetik.', icon: Star, badge: 'IMG' },
  { id: 6, title: 'Video Studio', desc: 'Konversi dan potong format video.', icon: Film, badge: 'VID' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const [time, setTime] = useState(new Date())
  const [battery, setBattery] = useState({ level: 0, charging: false })
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const titleRef = useRef(null)

  // GSAP: Judul muncul per kata saat discroll (dipindah ke section bawah biar gak AI slop)
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

  // Real-time Clock, Battery, & Network
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    
    // Battery API (Support di Chrome/Edge Android, fallback buat iOS)
    if (navigator.getBattery) {
      navigator.getBattery().then(batt => {
        setBattery({ level: Math.round(batt.level * 100), charging: batt.charging })
        batt.addEventListener('levelchange', () => setBattery(prev => ({ ...prev, level: Math.round(batt.level * 100) })))
        batt.addEventListener('chargingchange', () => setBattery(prev => ({ ...prev, charging: batt.charging })))
      })
    }

    // Network Listener
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
      
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-6">
        
        {/* ================= HERO BANNER (VIDEO TANPA TEKS) ================= */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-black border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_#111] overflow-hidden mb-6 relative"
        >
          <div className="relative w-full h-[220px] md:h-[300px]">
            <video 
              autoPlay loop muted playsInline 
              className="w-full h-full object-cover opacity-90"
            >
              <source src="https://files.catbox.moe/w7817a.mp4" type="video/mp4" />
            </video>
            {/* Garis aksen tipis di bawah video */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DFFF00]" />
          </div>
        </motion.div>

        {/* ================= INFO BAR (REAL DATA) ================= */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#111] p-4 flex items-center justify-between mb-8"
        >
          {/* Jam Real-time */}
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <span className="font-mono text-sm md:text-base font-bold tracking-tighter">
              {time.toLocaleTimeString('id-ID', { hour12: false })}
            </span>
          </div>

          {/* Status Baterai & Jaringan */}
          <div className="flex items-center gap-4">
            {/* Baterai */}
            <div className="flex items-center gap-1.5">
              {battery.charging ? (
                <BatteryCharging size={18} className="text-green-600" />
              ) : (
                <Battery size={18} className={battery.level > 20 ? "text-black" : "text-red-500"} />
              )}
              <span className="text-xs font-bold font-mono">
                {navigator.getBattery ? `${battery.level}%` : 'N/A'}
              </span>
            </div>

            {/* Jaringan */}
            <div className="flex items-center gap-1.5 pl-4 border-l-2 border-gray-200">
              {isOnline ? (
                <>
                  <Wifi size={18} className="text-black" />
                  <span className="text-xs font-bold uppercase tracking-wider text-green-600">Online</span>
                </>
              ) : (
                <>
                  <WifiOff size={18} className="text-red-500" />
                  <span className="text-xs font-bold uppercase tracking-wider text-red-500">Offline</span>
                </>
              )}
            </div>
          </div>
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

        {/* ================= SECTION TITLE (GSAP) ================= */}
        <div ref={titleRef} className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight flex gap-2">
            <span className="word inline-block">Semua</span>
            <span className="word inline-block">Alat.</span>
          </h2>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{tools.length} Tersedia</span>
        </div>

        {/* ================= GRID TOOLS ================= */}
        <div className="grid grid-cols-2 gap-3 md:gap-5">
          {tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).map((tool, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ y: -6, rotate: index % 2 === 0 ? -1 : 1, boxShadow: "8px 8px 0px 0px #111" }}
              whileTap={{ scale: 0.95, boxShadow: "2px 2px 0px 0px #111" }}
              key={tool.id}
              className={`bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#111] p-4 flex flex-col justify-between cursor-pointer ${tool.featured ? 'col-span-2 md:col-span-2' : ''}`}
            >
              <div className={tool.featured ? "flex gap-4 items-start" : ""}>
                {/* Icon Box */}
                <div className={`mb-3 p-2.5 border-2 border-black rounded-lg inline-block ${tool.featured ? 'bg-[#DFFF00]' : 'bg-gray-50 group-hover:bg-[#DFFF00] transition-colors'}`}>
                  <tool.icon size={tool.featured ? 28 : 22} strokeWidth={2.5} className="text-black" />
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className={`font-extrabold text-black leading-tight ${tool.featured ? 'text-lg md:text-xl' : 'text-sm'}`}>
                      {tool.title}
                    </h3>
                    <span className="text-[9px] font-extrabold tracking-widest uppercase px-2 py-0.5 border-2 border-black rounded-md bg-white ml-2">
                      {tool.badge}
                    </span>
                  </div>
                  <p className={`text-gray-500 leading-snug mb-4 ${tool.featured ? 'text-sm md:text-base' : 'text-[11px]'}`}>
                    {tool.desc}
                  </p>
                </div>
              </div>

              <button className={`w-full py-2 bg-black text-white rounded-lg font-bold text-xs flex items-center justify-between px-3 group/btn border-2 border-transparent hover:border-black hover:bg-white hover:text-black transition-all ${tool.featured ? 'md:w-auto md:px-6 md:self-end' : ''}`}>
                <span>Buka Alat</span>
                <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
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
