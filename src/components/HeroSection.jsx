'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroFrames from './HeroFrames';
import TrustedCompanies from './TrustedCompanies';

/**
 * HeroSection Component - Exact Adaline.ai Clone with Smooth Scroll Effects
 */
export default function HeroSection() {
    const sectionRef = useRef(null);

    // Scroll-based animations
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    // Parallax effects
    const textY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);

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

            {/* Content Overlay with Parallax */}
            <motion.div
                style={{ y: textY, opacity: textOpacity, paddingTop: '100px' }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-[111px] pb-20"

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
                                fontSize: "43px",
                                letterSpacing: "-1.63264px",
                                lineHeight: "40.0459px",
                                color: "rgb(10, 29, 8)",
                                fontFamily: 'akkurat, "akkurat Fallback", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
                                fontWeight: "550",
                                marginBottom: "0px",
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
                            className="mt-5"
                        >
                            <p className="text-xs text-gray-400 tracking-[0.2em] uppercase atlas-web-mono"
                            style={{
                            }}>TRUSTED BY</p>
                            <TrustedCompanies />
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
