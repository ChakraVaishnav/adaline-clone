'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * HeroFrames Component
 *
 * Implements scroll-based frame animation for the hero section
 *
 * FIX APPLIED:
 * - Prevent production frame freezing
 * - Reduce preload pressure
 * - Draw immediately on scroll
 * - Keep existing behavior unchanged
 */

export default function HeroFrames({
    totalFrames = 281,
    frameBasePath = '/adaline_frames',
}) {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    const [currentFrame, setCurrentFrame] = useState(2);
    const loadedImagesRef = useRef({});
    const frameIndexRef = useRef(2);
    const [tick, setTick] = useState(0);

    const [isMobile, setIsMobile] = useState(false);

    /* -------------------- Mobile detection -------------------- */
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            if (mobile !== isMobile) {
                setIsMobile(mobile);
                loadedImagesRef.current = {};
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, [isMobile]);

    /* -------------------- Frame path -------------------- */
    const getFramePath = useCallback(
        (index) => {
            const paddedIndex = String(index).padStart(3, '0');
            const basePath = isMobile ? '/adaline_frames_3x5' : frameBasePath;
            return `${basePath}/${paddedIndex}.jpg`;
        },
        [frameBasePath, isMobile]
    );

    /* -------------------- Preload frames (FIXED) -------------------- */
    const preloadFrames = useCallback(
        (startFrame, endFrame) => {
            for (let i = startFrame; i <= endFrame; i++) {
                if (!loadedImagesRef.current[i]) {
                    const img = new Image();
                    img.src = getFramePath(i);
                    img.onload = () => {
                        loadedImagesRef.current[i] = img;

                        if (Math.abs(i - frameIndexRef.current) <= 2) {
                            setTick((t) => t + 1);
                        }
                    };
                }
            }
        },
        [getFramePath]
    );

    /* -------------------- Canvas resize -------------------- */
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            const container = containerRef.current;
            if (!canvas || !container) return;

            const dpr = window.devicePixelRatio || 1;
            const width = container.offsetWidth;
            const height = window.innerHeight; // Use viewport height, not scroll height

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            const ctx = canvas.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    /* -------------------- Immediate canvas draw (FIX) -------------------- */
    const drawFrameImmediate = useCallback((frame, imageOverride) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const container = containerRef.current;
        const img = imageOverride || loadedImagesRef.current[frame];

        if (!canvas || !ctx || !container || !img) return;

        const width = container.offsetWidth;
        const height = window.innerHeight; // Draw relative to viewport

        // --- DIMENSIONS & POSITIONING CONFIG ---
        // Adjust these to change how the image fits
        const desktopScale = 1.25;  // Scale for desktop
        const mobileScale = 1.2;  // Scale for mobile

        const desktopOffsetY = -0.5; // Pixels to move up/down on desktop
        const mobileOffsetY = 0;     // Pixels to move up/down on mobile (e.g. 40)

        const currentScale = isMobile ? mobileScale : desktopScale;
        const currentOffsetY = isMobile ? mobileOffsetY : desktopOffsetY;

        const scale = Math.min(width / img.width, height / img.height) * currentScale;
        const sw = img.width * scale;
        const sh = img.height * scale;

        ctx.fillStyle = '#F5F1E8';
        ctx.fillRect(0, 0, width, height);

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(
            img,
            (width - sw) / 2,
            (height - sh) / 2 + currentOffsetY,
            sw,
            sh
        );
    }, [isMobile]);

    /* -------------------- Scroll → frame logic (FIXED) -------------------- */
    const updateFrame = useCallback(() => {
        if (!containerRef.current) return;

        const scrollTop = window.scrollY;
        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight;

        const scrollProgress = Math.max(
            0,
            Math.min(
                1,
                (scrollTop - containerTop) /
                (containerHeight - window.innerHeight)
            )
        );

        const frameIndex = Math.min(
            totalFrames,
            Math.max(2, Math.round(2 + scrollProgress * (totalFrames - 2)))
        );

        if (frameIndex !== frameIndexRef.current) {
            frameIndexRef.current = frameIndex;
            setCurrentFrame(frameIndex);

            const preloadRange = 6; // Reduced to prevent network congestion
            preloadFrames(
                Math.max(2, frameIndex - preloadRange),
                Math.min(totalFrames, frameIndex + preloadRange)
            );

            drawFrameImmediate(frameIndex);
        }
    }, [totalFrames, preloadFrames, drawFrameImmediate]);

    /* -------------------- Scroll handler -------------------- */
    useEffect(() => {
        let rafId;

        const onScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(updateFrame);
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        preloadFrames(2, 12);
        updateFrame();

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [updateFrame, preloadFrames]);

    /* -------------------- Fallback render (FIXED RANGE) -------------------- */
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        const container = containerRef.current;
        if (!canvas || !ctx || !container) return;

        let img = loadedImagesRef.current[currentFrame];

        if (!img) {
            const range = 6; // ✅ FIXED
            for (let i = 1; i <= range; i++) {
                if (loadedImagesRef.current[currentFrame - i]) {
                    img = loadedImagesRef.current[currentFrame - i];
                    break;
                }
                if (loadedImagesRef.current[currentFrame + i]) {
                    img = loadedImagesRef.current[currentFrame + i];
                    break;
                }
            }
        }

        if (!img) return;

        drawFrameImmediate(currentFrame, img);
    }, [currentFrame, tick, drawFrameImmediate]);

    /* -------------------- Render -------------------- */
    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: `${totalFrames * 20}px` }}
        >
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full" />

                {/* Video Overlay */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{
                        opacity: Math.max(0, Math.min(1, (currentFrame - 270) / 10)),
                        pointerEvents: currentFrame >= 270 ? 'auto' : 'none',
                        zIndex: 10,
                    }}
                >
                    <video
                        src="/"
                        controls
                        playsInline
                        className="w-[90%] h-auto max-h-[90vh] rounded-xl shadow-2xl object-cover"
                    />
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="absolute bottom-4 right-4 bg-black/50 text-white px-4 py-2 rounded-lg text-sm font-mono">
                        Frame: {currentFrame} / {totalFrames}
                    </div>
                )}
            </div>
        </div>
    );
}
