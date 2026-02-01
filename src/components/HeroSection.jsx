'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import HeroFrames from './HeroFrames';
import TrustedCompanies from './TrustedCompanies';

/**
 * HeroSection Component - Exact Adaline.ai Clone with Smooth Scroll Effects
 */
export default function HeroSection() {
    const sectionRef = useRef(null);
    const [contentScale, setContentScale] = useState(1);
    const [maskPosition, setMaskPosition] = useState(100); // Percentage for mask gradient
    const [contentOpacity, setContentOpacity] = useState(1); // Overall opacity

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Scroll to top on component mount/refresh
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;

            // Mask fade from right to left: Frame 65 at ~1087 to Frame 90 at ~1600
            const fadeStartScroll = 1087; // Frame 65
            const fadeEndScroll = 1600; // Frame 90

            // Scale reduction: starts from first scroll to Frame 90
            const scaleStartScroll = 0; // Start immediately
            const scaleEndScroll = 1600; // Frame 90

            // Calculate mask position (fade from right to left)
            if (scrollY < fadeStartScroll) {
                setMaskPosition(100); // Fully visible
                setContentOpacity(1); // Full opacity
            } else if (scrollY > fadeEndScroll) {
                setMaskPosition(0); // Fully hidden
                setContentOpacity(0); // Fully transparent
            } else {
                const progress = (scrollY - fadeStartScroll) / (fadeEndScroll - fadeStartScroll);
                setMaskPosition(100 - (progress * 100)); // From 100% to 0%
                setContentOpacity(1 - (progress * 0.5)); // From 1 to 0.5 (subtle overall fade)
            }

            // Calculate scale (starts from first scroll)
            if (scrollY < scaleStartScroll) {
                setContentScale(1);
            } else if (scrollY > scaleEndScroll) {
                setContentScale(0.7);
            } else {
                const scaleProgress = (scrollY - scaleStartScroll) / (scaleEndScroll - scaleStartScroll);
                setContentScale(1 - (scaleProgress * 0.3)); // Scale from 1 to 0.7
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Parallax effects
    const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: 'easeOut' }
    };

    const staggerChildren = {
        animate: {
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-[#F5F1E8] ">
            {/* Background Frame Animation */}
            <div className="absolute inset-0 z-0">
                <HeroFrames />
            </div>

            {/* Content Overlay - Fixed Position */}
            <div
                className="fixed top-0 left-0 right-0 z-10 flex flex-col items-center justify-start pt-[175px]"
                style={{
                    opacity: contentOpacity,
                    maskImage: `linear-gradient(to right, black 0%, black ${maskPosition - 20}%, transparent ${maskPosition + 20}%, transparent 100%)`,
                    WebkitMaskImage: `linear-gradient(to right, black 0%, black ${maskPosition - 20}%, transparent ${maskPosition + 20}%, transparent 100%)`,
                    transition: 'opacity 0.3s ease-out, mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out',
                    pointerEvents: maskPosition === 0 ? 'none' : 'auto'
                }}
            >
                <div
                    style={{
                        transform: `scale(${contentScale})`,
                        transformOrigin: 'center center',
                        transition: 'transform 0.3s ease-out'
                    }}
                >
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            variants={staggerChildren}
                            initial="initial"
                            animate="animate"
                            className="text-center"

                        >
                            <motion.h1
                                variants={fadeInUp}
                                className="max-w-4xl mx-auto"
                                style={{
                                    fontSize: "clamp(28px, 6vw, 43px)",
                                    letterSpacing: "-1.63264px",
                                    lineHeight: "clamp(32px, 6vw, 40.0459px)",
                                    color: "rgb(10, 29, 8)",
                                    fontFamily: 'akkurat, "akkurat Fallback", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                    fontWeight: "550",
                                    marginBottom: "45px",
                                    marginTop: "105px",
                                    textAlign: "center",
                                    display: "inline-block" // Using inline-block to respect text-center but allow transforms if needed
                                }}
                            >
                                The single platform to iterate,
                                <br />
                                evaluate, deploy, and monitor AI agents
                            </motion.h1>

                            {/* Trusted By Section */}
                            <motion.div
                                variants={fadeInUp}
                                className="mt-8"
                            >
                                <p className="atlas-web-mono text-meadow-900/50 mb-2"
                                    style={{
                                        fontSize: '15px',
                                        fontWeight: 'lighter',
                                        marginBottom: '20px',
                                        color: "color-mix(in oklab, #0a1d08 50%, transparent)"
                                    }}>TRUSTED BY</p>
                                <TrustedCompanies />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
