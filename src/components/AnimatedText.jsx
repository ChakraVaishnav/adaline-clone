'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * AnimatedText Component
 * 
 * Reusable component for text animations
 * Triggers animation when element comes into view
 * 
 * @param {Object} props
 * @param {string} props.text - Text to animate
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.as - HTML element type (default: 'p')
 * @param {number} props.delay - Animation delay in seconds
 */
export default function AnimatedText({
    text,
    className = '',
    as = 'p',
    delay = 0
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-50px' });

    const Component = motion[as];

    return (
        <Component
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
                duration: 0.6,
                delay,
                ease: 'easeOut'
            }}
            className={className}
        >
            {text}
        </Component>
    );
}

/**
 * AnimatedSection Component
 * 
 * Wrapper for sections that should animate on scroll
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} props.className - Additional CSS classes
 */
export function AnimatedSection({ children, className = '' }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
