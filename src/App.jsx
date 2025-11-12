import { useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

function App() {
  const [name, setName] = useState('')
  const [generated, setGenerated] = useState('')

  const handleGenerate = () => {
    const n = name.trim() || 'Friend'
    setGenerated(`🎉 Happy Birthday, ${n}! Wishing you a day filled with joy, laughter, and sweet surprises. 🎂`)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-sky-100">
      {/* 3D Spline background */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/pVLJXSVq3zyQq0OD/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Soft gradient overlay for readability (does not block interaction) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/40 via-sky-50/20 to-sky-100/70" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-2xl"
        >
          <div className="backdrop-blur-xl bg-white/60 border border-white/40 shadow-xl rounded-3xl p-8 sm:p-10">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">🎈</span>
              <p className="uppercase tracking-widest text-sm sm:text-xs font-semibold text-sky-700/80">Birthday Special</p>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight text-sky-900 drop-shadow-sm">
              Make their day magical
            </h1>
            <p className="mt-4 text-sky-900/80 text-base sm:text-lg">
              Celebrate with a playful, 3D balloon vibe. Personalize a sweet wish and share it instantly.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Their name (e.g., Alex)"
                className="w-full rounded-xl border border-sky-200 bg-white/70 px-4 py-3 text-sky-900 placeholder-sky-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-300"
              />
              <button
                onClick={handleGenerate}
                className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:scale-[1.02] hover:bg-sky-700 active:scale-[0.99]"
              >
                🎉 Generate Wish
              </button>
            </div>

            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 rounded-2xl bg-white/80 border border-sky-100 p-4 sm:p-5 text-sky-900 shadow-md"
              >
                <p className="leading-relaxed">{generated}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(generated)}
                    className="rounded-lg border border-sky-200 bg-white/70 px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
                  >
                    Copy
                  </button>
                  <a
                    href={`mailto:?subject=Birthday%20Wishes&body=${encodeURIComponent(generated)}`}
                    className="rounded-lg border border-sky-200 bg-white/70 px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
                  >
                    Share via Email
                  </a>
                </div>
              </motion.div>
            )}

            <div className="mt-8 text-xs text-sky-700/70">
              Tip: Drag around the balloons in the background and explore the scene.
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default App
