import { useState, useEffect, useRef } from 'react'
import { Search, Link as LinkIcon, FileArchive, QrCode, Music, Star, Film, ArrowRight, Globe, Smartphone, Crown } from 'lucide-react'
import { motion } from 'motion/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tools = [
  { id: 1, title: 'File ke Link', desc: 'Ubah file jadi URL.', icon: LinkIcon, badge: 'URL' },
  { id: 2, title: 'Kompres Media', desc: 'Kecilkan ukuran file.', icon: FileArchive, badge: 'MB/KB' },
  { id: 3, title: 'QR Studio', desc: 'Buat QR custom.', icon: QrCode, badge: 'QR' },
  { id: 4, title: 'Audio Merger', desc: 'Gabung audio jadi satu.', icon: Music, badge: 'MP3' },
  { id: 5, title: 'Photo Studio', desc: 'Edit dan poles foto.', icon: Star, badge: 'IMG' },
  { id: 6, title: 'Video Studio', desc: 'Konversi format video.', icon: Film, badge: 'VID' },
]

export default function Home() {
  const [search, setSearch] = useState('')
  const titleRef = useRef(null)

  // GSAP: Judul muncul per kata saat discroll
  useEffect(() => {
    const words = titleRef.current.querySelectorAll('.word')
    gsap.fromTo(words, 
      { y: 30, opacity: 0 },
      {
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 85%",
        }
      }
    )
  }, [])

  return (
    <div className="min-h-screen pb-20 selection:bg-black selection:text-white">
      
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-6">
        
        {/* ================= HERO BANNER (VIDEO FRAME) ================= */}
        <div className="bg-white border-2 border-black rounded-2xl shadow-[5px_5px_0px_0px_#111] overflow-hidden mb-8 relative">
          <div className="relative w-full h-[200px] md:h-[280px] bg-black">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover opacity-80"
            >
              <source src="https://files.catbox.moe/w7817a.mp4" type="video/mp4" />
            </video>
            {/* Overlay Gradient tipis biar teks kebaca */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <h1 ref={titleRef} className="text-white text-3xl md:text-4xl font-extrabold tracking-tight flex gap-2">
                <span className="word inline-block">All</span>
                <span className="word inline-block">Tools</span>
              </h1>
              <p className="text-gray-300 text-xs md:text-sm mt-1 font-medium">Satu platform, semua kebutuhan.</p>
            </div>
          </div>
        </div>

        {/* ================= INFO BAR ================= */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4 }}
          className="bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#111] p-3 flex flex-col md:flex-row items-center justify-between gap-3 mb-6"
        >
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white shrink-0">
              <Star size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                <Globe size={12} /> ID
                <span>•</span>
                <Smartphone size={12} /> Android
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="flex items-center gap-1 text-[10px] font-bold text-green-600">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-3 py-1.5 border-2 border-black rounded-lg text-xs font-bold bg-white hover:bg-gray-100 active:scale-95 transition-transform flex items-center justify-center gap-1">
              <Crown size={14} /> Member
            </button>
            <button className="flex-1 md:flex-none px-3 py-1.5 border-2 border-black rounded-lg text-xs font-bold bg-black text-white hover:bg-gray-800 active:scale-95 transition-transform flex items-center justify-center gap-1">
              VVIP <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>

        {/* ================= SEARCH BAR ================= */}
        <div className="relative group mb-8">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-transform group-focus-within:scale-110">
            <Search className="h-4 w-4 text-black" strokeWidth={3} />
          </div>
          <input
            type="text"
            placeholder="Cari alat..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#111] focus:outline-none focus:-translate-y-0.5 focus:shadow-[5px_5px_0px_0px_#111] transition-all text-sm font-bold placeholder-gray-400"
          />
        </div>

        {/* ================= GRID TOOLS (2 KOLOM) ================= */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).map((tool, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -4, boxShadow: "6px 6px 0px 0px #111" }}
              whileTap={{ scale: 0.97, boxShadow: "2px 2px 0px 0px #111" }}
              key={tool.id}
              className="bg-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_#111] p-3 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-1.5 bg-gray-100 border-2 border-black rounded-lg text-black">
                    <tool.icon size={18} strokeWidth={2.5} />
                  </div>
                  <span className="text-[8px] font-extrabold tracking-widest uppercase px-1.5 py-0.5 border-2 border-black rounded-md bg-white">
                    {tool.badge}
                  </span>
                </div>
                
                <h3 className="text-sm font-extrabold text-black leading-tight mb-1">{tool.title}</h3>
                <p className="text-gray-500 text-[10px] md:text-xs leading-snug mb-3 line-clamp-2">{tool.desc}</p>
              </div>

              <button className="w-full py-1.5 bg-black text-white rounded-lg font-bold text-xs flex items-center justify-between px-2 group/btn">
                <span>Buka</span>
                <ArrowRight size={14} className="transform group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State */}
        {tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).length === 0 && (
          <div className="text-center py-10 border-2 border-black border-dashed rounded-xl bg-white/50 mt-4">
            <h3 className="text-sm font-bold">Tidak ditemukan</h3>
            <p className="text-xs text-gray-500 mt-1">Coba kata kunci lain.</p>
          </div>
        )}

      </div>
    </div>
  )
}
