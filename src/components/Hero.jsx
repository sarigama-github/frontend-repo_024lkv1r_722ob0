import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Finanalyzer</h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
            AI-driven financial analysis from your statements. Secure uploads, predictive scenarios, and interactive insights.
          </p>
          <div className="mt-8 flex gap-3">
            <a href="#upload" className="px-5 py-2.5 bg-white text-black rounded-lg font-medium">Upload PDF</a>
            <a href="#features" className="px-5 py-2.5 bg-white/10 backdrop-blur border border-white/20 rounded-lg font-medium">Learn more</a>
          </div>
          <p className="mt-6 text-xs text-white/60">Not financial advice. For educational purposes.</p>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
    </section>
  )
}
