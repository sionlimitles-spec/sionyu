import { useState } from 'react'
import { Search, Link as LinkIcon, FileArchive, QrCode, Music, Star, Film, ArrowRight, Globe, Smartphone, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

// Data dummy tool (nanti tinggal diganti endpoint API aslinya)
const tools = [
  { id: 1, title: 'File ke Link', desc: 'Unggah foto, video, dan PDF untuk dijadikan tautan URL.', icon: LinkIcon, badge: 'UNIVERSAL' },
  { id: 2, title: 'Kompres Media HD', desc: 'Optimasi ukuran file gambar dan video hingga kilobyte.', icon: FileArchive, badge: 'MB + KB' },
  { id: 3, title: 'QR Code Studio', desc: 'Desain kode QR kustom dengan logo dan frame.', icon: QrCode, badge: 'CUSTOM QR' },
  { id: 4, title: 'Audio Merger', desc: 'Satukan dan potong menit atau detik beberapa lagu.', icon: Music, badge: 'TIMF' },
  { id: 5, title: 'Photo Studio', desc: 'Peralatan visual untuk mengedit dan memoles foto.', icon: Star, badge: 'STUDIO HD' },
  { id: 6, title: 'Video Studio', desc: 'Konversi dan sesuaikan format video dengan mudah.', icon: Film, badge: 'FX STUDIO' },
]

export default function Home() {
  const [search, setSearch] = useState('')

  return (
    <div className="min-h-screen pb-20">
      
      {/* ================= HERO BANNER (FOTO 2) ================= */}
      <div className="relative w-full h-[280px] md:h-[350px] bg-gray-900 overflow-hidden">
        {/* Placeholder Gambar Anime/Neon. Ganti URL di bawah dengan gambar kamu */}
        <img 
          src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero Banner" 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {/* Teks Hero Minimalis (Biar tidak AI Slop) */}
        <div className="absolute bottom-16 left-6 md:left-12">
          <h1 className="text-white text-3xl font-bold tracking-tight">All Tools</h1>
          <p className="text-gray-300 text-sm mt-1">Satu platform, semua kebutuhan.</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-6">
        
        {/* ================= INFO BAR (FOTO 2 - Disesuaikan) ================= */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          className="-mt-10 relative z-10 bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#111] p-4 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shrink-0">
              <Star size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <Globe size={14} /> Indonesia
                <span className="mx-1">•</span>
                <Smartphone size={14} /> Android
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            <button className="flex-1 md:flex-none whitespace-nowrap px-4 py-2 border-2 border-black rounded-xl text-sm font-bold bg-white hover:bg-gray-100 transition-colors flex items-center gap-2">
              <Crown size={16} /> Role: Member
            </button>
            <button className="flex-1 md:flex-none whitespace-nowrap px-4 py-2 border-2 border-black rounded-xl text-sm font-bold bg-black text-white hover:bg-gray-800 transition-colors flex items-center gap-2">
              VVIP <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

        {/* ================= SEARCH BAR ================= */}
        <div className="mt-10 mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-black" />
            </div>
            <input
              type="text"
              placeholder="Cari alat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_#111] focus:outline-none focus:ring-0 focus:-translate-y-1 focus:shadow-[6px_6px_0px_0px_#111] transition-all font-medium text-black placeholder-gray-400"
            />
          </div>
        </div>

        {/* ================= GRID TOOLS (FOTO 1 - Neo Brutalism) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).map((tool, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={tool.id}
              className="bg-white border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_#111] p-5 flex flex-col justify-between group hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#111] transition-all duration-200"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-gray-100 border-2 border-black rounded-xl text-black">
                    <tool.icon size={24} strokeWidth={2.5} />
                  </div>
                  <span className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 border-2 border-black rounded-full bg-white text-black">
                    {tool.badge}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-black mb-2">{tool.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{tool.desc}</p>
              </div>

              <button className="w-full py-3 bg-black text-white rounded-xl font-bold flex items-center justify-between px-4 group-hover:bg-gray-800 transition-colors">
                <span>Buka Alat</span>
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
        
        {/* Empty State jika pencarian tidak ketemu */}
        {tools.filter(t => t.title.toLowerCase().includes(search.toLowerCase())).length === 0 && (
          <div className="text-center py-20 border-2 border-black border-dashed rounded-2xl bg-white/50">
            <h3 className="text-xl font-bold">Alat tidak ditemukan</h3>
            <p className="text-gray-500 mt-2">Coba gunakan kata kunci lain.</p>
          </div>
        )}

      </div>
    </div>
  )
                  }
