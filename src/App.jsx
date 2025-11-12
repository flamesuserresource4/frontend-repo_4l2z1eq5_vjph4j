import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { motion, AnimatePresence } from 'framer-motion'

// Utility for random numbers
const rand = (min, max) => Math.random() * (max - min) + min

// Inline Floating Hearts (no external file)
function FloatingHearts({ active = false, count = 18 }) {
  const items = useMemo(
    () => Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: rand(0, 100),
      delay: rand(0, 2),
      duration: rand(6, 12),
      size: rand(16, 28),
      opacity: rand(0.4, 0.9)
    })),
    [count]
  )

  if (!active) return null

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: 40, x: `${h.x}%`, opacity: 0 }}
          animate={{ y: -100, opacity: [0, h.opacity, 0.1] }}
          transition={{ repeat: Infinity, delay: h.delay, duration: h.duration, ease: 'easeOut' }}
          style={{ fontSize: h.size }}
          className="absolute text-rose-500 drop-shadow"
        >
          ❤️
        </motion.div>
      ))}
    </div>
  )
}

// Emoji sparkle burst
function SparkleBurst({ trigger = 0 }) {
  const [shots, setShots] = useState([])

  useEffect(() => {
    if (trigger <= 0) return
    const id = Math.random().toString(36).slice(2)
    const payload = Array.from({ length: 20 }).map((_, i) => ({
      id: `${id}-${i}`,
      x: 50,
      y: 55,
      dx: rand(-40, 40),
      dy: rand(-60, -20),
      rot: rand(-90, 90),
      emoji: ['🎉', '✨', '🎈', '💖', '🎂'][Math.floor(rand(0, 5))],
      duration: rand(0.9, 1.4)
    }))
    setShots(prev => [...prev, { id, items: payload }])
    const t = setTimeout(() => setShots(prev => prev.filter(s => s.id !== id)), 1400)
    return () => clearTimeout(t)
  }, [trigger])

  return (
    <div className="pointer-events-none absolute inset-0">
      <AnimatePresence>
        {shots.map(shot => (
          <div key={shot.id} className="absolute inset-0">
            {shot.items.map(p => (
              <motion.span
                key={p.id}
                initial={{
                  x: `${p.x}%`,
                  y: `${p.y}%`,
                  rotate: 0,
                  opacity: 1,
                  scale: 0.9
                }}
                animate={{
                  x: `calc(${p.x}% + ${p.dx}vw)`,
                  y: `calc(${p.y}% + ${p.dy}vh)`,
                  rotate: p.rot,
                  opacity: 0,
                  scale: 1.1
                }}
                transition={{ duration: p.duration, ease: 'easeOut' }}
                className="absolute text-2xl sm:text-3xl drop-shadow"
              >
                {p.emoji}
              </motion.span>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function App() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [celebrateTick, setCelebrateTick] = useState(0)
  const [showHearts, setShowHearts] = useState(false)

  const handleGenerate = () => {
    const n = name.trim() || 'My Love'
    const wish = `🎉 Happy Birthday, ${n}! May your year be full of soft mornings, sparkling wins, and little moments that feel like magic. Since 2022, you’ve turned every ordinary day into a favorite memory. 🎂`
    setMessage(wish)
    // trigger bursts + hearts
    setCelebrateTick(v => v + 1)
    setShowHearts(true)
    setTimeout(() => setShowHearts(false), 4000)
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-sky-100">
      {/* 3D Spline background as full-width cover */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/pVLJXSVq3zyQq0OD/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Readability veil */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-sky-50/50 via-sky-50/25 to-sky-100/80" />

      {/* Celebration FX */}
      <SparkleBurst trigger={celebrateTick} />
      <FloatingHearts active={showHearts} />

      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <section className="min-h-[80vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-3xl"
          >
            <div className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-2xl rounded-3xl p-8 sm:p-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="text-3xl">🎈</span>
                <p className="uppercase tracking-widest text-xs sm:text-sm font-semibold text-sky-800/80">Birthday Special</p>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold leading-[1.05] text-sky-900 drop-shadow-sm">
                For my favorite person
              </h1>
              <p className="mt-4 text-sky-900/80 text-base sm:text-lg">
                A playful, balloon-bright page to make your day feel extra magical.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (e.g., My Partner)"
                  className="w-full rounded-xl border border-sky-200 bg-white/70 px-4 py-3 text-sky-900 placeholder-sky-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-sky-300"
                />
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center justify-center rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white shadow-lg shadow-sky-600/20 transition hover:scale-[1.02] hover:bg-sky-700 active:scale-[0.99]"
                >
                  🎉 Celebrate
                </button>
              </div>

              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="mt-6 rounded-2xl bg-white/85 border border-sky-100 p-5 sm:p-6 text-sky-900 shadow-md"
                  >
                    <p className="leading-relaxed">{message}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(message)}
                        className="rounded-lg border border-sky-200 bg-white/70 px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
                      >
                        Copy
                      </button>
                      <a
                        href={`mailto:?subject=Birthday%20Wishes&body=${encodeURIComponent(message)}`}
                        className="rounded-lg border border-sky-200 bg-white/70 px-3 py-2 text-sm font-medium text-sky-700 hover:bg-sky-50"
                      >
                        Share via Email
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </section>

        {/* Since 2022 timeline beat */}
        <section className="px-4 py-10">
          <div className="mx-auto max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { year: '2022', text: 'We met — a tiny moment that changed everything.' },
                { year: '2023', text: 'We grew — inside jokes, late walks, new traditions.' },
                { year: 'Today', text: 'We celebrate — your light, your laugh, your heart.' },
              ].map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl border border-sky-200/60 bg-white/70 backdrop-blur p-5 shadow-sm"
                >
                  <div className="text-sm uppercase tracking-widest text-sky-700/80 font-semibold">{item.year}</div>
                  <div className="mt-2 text-sky-950 font-medium">{item.text}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Sweet surprises */}
        <section className="px-4 pb-16">
          <div className="mx-auto max-w-5xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="text-2xl">🎁</span>
              <h2 className="text-xl sm:text-2xl font-bold text-sky-900">Sweet surprises</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                { icon: '🍰', title: 'Cake First', text: 'Extra frosting, extra sprinkles, zero regrets.' },
                { icon: '📸', title: 'Memory Snap', text: 'We capture a goofy photo to add to our story.' },
                { icon: '🌅', title: 'Sunset Walk', text: 'Hold my hand, let the sky write the caption.' },
              ].map((c, i) => (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: 'easeOut' }}
                  className="group relative overflow-hidden rounded-2xl border border-sky-200/70 bg-white/70 backdrop-blur p-5 shadow-sm"
                >
                  <motion.div
                    whileHover={{ rotate: -6, scale: 1.08 }}
                    className="text-4xl drop-shadow-sm"
                  >
                    {c.icon}
                  </motion.div>
                  <div className="mt-3 font-semibold text-sky-900">{c.title}</div>
                  <div className="text-sky-800/80 text-sm mt-1">{c.text}</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-sky-200/20 to-transparent"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Love note */}
        <section className="px-4 pb-20">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-3xl border border-rose-200/70 bg-rose-50/70 p-6 sm:p-8 shadow-xl"
            >
              <div className="absolute -top-10 -right-10 text-7xl opacity-20">💞</div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-rose-900">A love note</h3>
              <p className="mt-3 text-rose-900/90 leading-relaxed">
                I love the way you turn simple moments into stories I want to tell forever. If every year is a chapter, I hope this one is our most joyful yet.
              </p>
              <div className="mt-4 text-sm text-rose-800/80">— From me, since 2022</div>
            </motion.div>
          </div>
        </section>

        {/* Footer action */}
        <section className="px-4 pb-24">
          <div className="mx-auto max-w-2xl text-center">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => {
                setCelebrateTick(v => v + 1)
                setShowHearts(true)
                setTimeout(() => setShowHearts(false), 4000)
              }}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-rose-500 px-6 py-4 text-white font-semibold shadow-lg shadow-rose-500/20"
            >
              ✨ One more surprise
            </motion.button>
            <p className="mt-3 text-sky-900/80">Tap to sprinkle more magic over the page.</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
