'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';

/**
 * HeroFrames Component
 * 
 * Implements scroll-based frame animation for the hero section
 * 
 * Performance Optimizations:
 * 1. Lazy loading - Only loads frames as needed based on scroll position
 * 2. Preloading - Preloads nearby frames for smooth transitions
 * 3. RequestAnimationFrame - Uses RAF for smooth scroll handling
 * 4. Debouncing - Prevents excessive frame updates
 * 
 * @param {number} totalFrames - Total number of frames (default: 281)
 * @param {string} frameBasePath - Base path to frames folder
 */
export default function HeroFrames({
    totalFrames = 281,
    frameBasePath = '/adaline_frames'
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [currentFrame, setCurrentFrame] = useState(1);
    const [loadedImages, setLoadedImages] = useState({});
    const frameIndexRef = useRef(1);


    // Generate frame path with proper zero-padding
    const getFramePath = useCallback((index) => {
        const paddedIndex = String(index).padStart(3, '0');
        return `${frameBasePath}/${paddedIndex}.jpg`;
    }, [frameBasePath]);

    // Preload images in batches for better performance
    const preloadFrames = useCallback((startFrame, endFrame) => {
        const framesToLoad = [];

        for (let i = startFrame; i <= endFrame; i++) {
            if (!loadedImages[i]) {
                framesToLoad.push(i);
            }
        }

        framesToLoad.forEach((frameNum) => {
            const img = new window.Image();
            img.src = getFramePath(frameNum);
            img.onload = () => {
                setLoadedImages((prev) => ({ ...prev, [frameNum]: img }));
            };
        });
    }, [loadedImages, getFramePath]);

    // Canvas resize with DPR scaling - CRITICAL FOR QUALITY
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;

            const dpr = window.devicePixelRatio || 1;
            const width = container.offsetWidth;
            const height = container.offsetHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + "px";
            canvas.style.height = height + "px";

            const ctx = canvas.getContext("2d");
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        return () => window.removeEventListener("resize", resizeCanvas);
    }, []);


    // Calculate current frame based on scroll position
    const updateFrame = useCallback(() => {
        if (!containerRef.current) return;

        const scrollTop = window.scrollY;
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight;

        // Calculate scroll progress within the container
        const scrollProgress = Math.max(
            0,
            Math.min(1, (scrollTop - containerTop) / (containerHeight - window.innerHeight))
        );

        // Map scroll progress to frame number (starting from 2) - DIRECT, NO LERP
        const frameIndex = Math.min(
            totalFrames,
            Math.max(1, Math.round(1 + scrollProgress * (totalFrames - 1)))
        );

        if (frameIndex !== frameIndexRef.current) {
            frameIndexRef.current = frameIndex;
            setCurrentFrame(frameIndex);

            // Preload nearby frames for smooth playback
            const preloadRange = 40; // Increased for smoother playback on network
            const preloadStart = Math.max(1, frameIndex - preloadRange);
            const preloadEnd = Math.min(totalFrames, frameIndex + preloadRange);
            preloadFrames(preloadStart, preloadEnd);
        }
    }, [totalFrames, preloadFrames]);

    // Handle scroll with simple RAF
    useEffect(() => {
        let rafId;

        const handleScroll = () => {
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
            rafId = requestAnimationFrame(updateFrame);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial frame load - aggressive start
        preloadFrames(1, 30);
        updateFrame(); // Initial update

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId) {
                cancelAnimationFrame(rafId);
            }
        };
    }, [updateFrame, preloadFrames]);

    // Render current frame on canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const container = containerRef.current;

        if (!canvas || !ctx || !container) return;

        // Try to get current frame, or closest available loaded frame
        // This prevents "stuck" frames during network latency
        let img = loadedImages[currentFrame];

        if (!img) {
            // Search range for fallback
            const range = 20;
            for (let i = 1; i <= range; i++) {
                if (loadedImages[currentFrame - i]) {
                    img = loadedImages[currentFrame - i];
                    break;
                }
                if (loadedImages[currentFrame + i]) {
                    img = loadedImages[currentFrame + i];
                    break;
                }
            }
        }

        if (!img) return; // If truly nothing loaded nearby, keep previous frame

        const width = container.offsetWidth;
        const height = container.offsetHeight;

        // FIT image (contain) - shows full width like Adaline.ai
        const scale = Math.min(width / img.width, height / img.height);

        const scaledWidth = img.width * scale;
        const scaledHeight = img.height * scale;

        // MOVE IMAGE 10px LEFT & 3px DOWN
        const offsetX = 0;
        const offsetY = -0.5;

        const x = (width - scaledWidth) / 2 + offsetX;
        const y = (height - scaledHeight) / 2 + offsetY;

        // Fill background with beige color
        ctx.fillStyle = '#F5F1E8';
        ctx.fillRect(0, 0, width, height);

        // Draw image with high quality
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, x, y, scaledWidth, scaledHeight);

    }, [currentFrame, loadedImages]);


    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${totalFrames * 20}px` }} // Optimized: 281 * 8 = 2248px
        >
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />

                {/* Debug info (remove in production) */}
                {process.env.NODE_ENV === 'development' && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-mono">
                        Frame: {currentFrame} / {totalFrames}
                    </div>
                )}
            </div>
        </div>
    );
}
