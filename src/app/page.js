import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';

/**
 * Home Page - Adaline.ai Clone
 * 
 * Main landing page featuring:
 * - Sticky navigation bar
 * - Scroll-based frame animation hero section
 * - Animated features section
 * - Footer with links
 * 
 * Built with Next.js App Router, React, Tailwind CSS, and Framer Motion
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F1E8]">
      <Navbar />
      <main>
        <HeroSection />
      </main>
    </div>
  );
}
