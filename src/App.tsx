import { useRef, useState, useCallback, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import './index.css'

// Eagerly loaded critical components
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Loader from './components/Loader'

// Lazy load below-the-fold components for better initial load performance
const PinnedTextSection = lazy(() => import('./components/PinnedTextSection'))
const Services = lazy(() => import('./components/Services'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const ImageGrowSection = lazy(() => import('./components/ImageGrowSection'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const SectionFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center" aria-hidden="true">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
)

function App() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadComplete} />}
      <div 
        ref={mainRef} 
        className="app selection:bg-accent selection:text-white"
        role="application"
        aria-busy={isLoading}
      >
        <Navbar />
        <main id="main-content">
          <Hero />
          <Suspense fallback={<SectionFallback />}>
            <PinnedTextSection />
            <Services />
            <Testimonials />
            <ImageGrowSection />
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default App
