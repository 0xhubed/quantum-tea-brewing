'use client'

// Decorative animated glow blobs. Render inside a `relative overflow-hidden` parent.
export function Aura() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10">
      <div className="aura left-[8%] top-[-10%] h-72 w-72 bg-primary-500/40" />
      <div className="aura right-[6%] top-[10%] h-80 w-80 bg-accent-500/30 [animation-delay:-6s]" />
      <div className="aura bottom-[-15%] left-1/3 h-72 w-72 bg-accent-400/20 [animation-delay:-12s]" />
    </div>
  )
}
