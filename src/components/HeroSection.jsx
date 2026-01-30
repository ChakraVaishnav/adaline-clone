'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import HeroFrames from './HeroFrames';

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

    // Company logos for "TRUSTED BY" section
    const trustedCompanies = [
        'salesforce',
        'Daybreak',
        'McKinsey & Company',
        'Symbolic.ai',
        'DOORDASH',
    ];

    return (
        <section ref={sectionRef} className="relative min-h-screen bg-[#F5F1E8]">
            {/* Background Frame Animation */}
            <div className="absolute inset-0 z-0">
                <HeroFrames />
            </div>

            {/* Content Overlay with Parallax */}
            <motion.div
                style={{ y: textY, opacity: textOpacity }}
                className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-32 pb-20"
            >
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={staggerChildren}
                        initial="initial"
                        animate="animate"
                        className="text-center"
                    >
                        {/* Main Heading */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-gray-900 mb-16 leading-tight max-w-4xl mx-auto"
                            style={{ fontFamily: 'Georgia, serif' }}
                        >
                            The single platform to iterate,
                            <br />
                            evaluate, deploy, and monitor AI agents
                        </motion.h1>

                        {/* Trusted By Section */}
                        <motion.div
                            variants={fadeInUp}
                            className="mt-20"
                        >
                            <p className="text-xs text-gray-600 mb-6 tracking-wider">TRUSTED BY</p>
                            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                                {trustedCompanies.map((company, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: 0.8 + index * 0.1,
                                            duration: 0.5,
                                            ease: 'easeOut'
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.2 }
                                        }}
                                        className="text-gray-800 font-semibold text-sm md:text-base cursor-default"
                                    >
                                        {company}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
