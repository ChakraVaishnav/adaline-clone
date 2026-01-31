'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Navbar Component - Exact Adaline.ai Clone
 */
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [navbarOpacity, setNavbarOpacity] = useState(1);
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
            
            // Calculate opacity based on scroll position to fade at frame 55
            const scrollY = window.scrollY;
            const fadeStartScroll = 300; // Start fading at this scroll position
            const fadeEndScroll = 920; // Fully transparent at this scroll position (around frame 55)
            
            if (scrollY < fadeStartScroll) {
                setNavbarOpacity(1);
            } else if (scrollY > fadeEndScroll) {
                setNavbarOpacity(0);
            } else {
                // Linear fade between fadeStart and fadeEnd
                const opacity = 1 - (scrollY - fadeStartScroll) / (fadeEndScroll - fadeStartScroll);
                setNavbarOpacity(opacity);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav 
            className="pointer-events-auto fixed top-0 right-0 left-0 h-16 z-50"
            style={{ 
                opacity: navbarOpacity,
                transition: 'opacity 0.3s ease-out'
            }}
        >
            <div className="h-16 relative">
                <div className="absolute inset-0 z-20 flex flex-row items-center justify-between px-6 lg:px-8">
                    {/* Left Side Navigation Links - Desktop Only */}
                    <div className="flex-1 hidden min-[900px]:flex items-center gap-[45px] justify-start"
                        style={{
                            marginLeft: "45px",
                        }}>
                        {/* Products Dropdown */}
                        <div 
                            className="relative"
                            onMouseEnter={() => setIsProductsOpen(true)}
                            onMouseLeave={() => setIsProductsOpen(false)}
                        >
                            <div className="flex items-center gap-1 cursor-pointer hover:opacity-70 transition-opacity">
                                <span className="atlas-web-mono text-[#171717] tracking-wide font-light" style={{ fontSize: '15px' }}>PRODUCTS</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#171717]">
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </div>
                            
                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {isProductsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 top-full mt-2 bg-white border border-pebble-100 rounded-lg shadow-lg overflow-hidden"
                                        style={{ minWidth: '320px' }}
                                    >
                                        <div className="divide-pebble-100 border-y-pebble-100 flex flex-col divide-y border-y">
                                            <a className="flex flex-row items-center gap-4 py-3 px-4 hover:bg-pebble-50 transition-colors" href="/iterate">
                                                <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                    <div className="absolute -inset-1/6" style={{transform:'none'}}>
                                                        <div className="absolute inset-0" style={{transform:'none'}}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                                <path fill="none" stroke="currentColor" d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z" vectorEffect="non-scaling-stroke"></path>
                                                            </svg>
                                                        </div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                            <path fill="none" stroke="currentColor" d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z" vectorEffect="non-scaling-stroke"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="-pt-1 flex flex-col justify-center flex-1">
                                                    <div className="text-sm font-medium">Iterate</div>
                                                    <div className="text-xs text-pebble-500">Sketch, test and refine</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pebble-500 mr-1 ml-auto h-4 w-4">
                                                    <path d="m9 18 6-6-6-6"></path>
                                                </svg>
                                            </a>
                                            <a className="flex flex-row items-center gap-4 py-3 px-4 hover:bg-pebble-50 transition-colors" href="/evaluate">
                                                <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                    <div className="absolute -inset-1/6" style={{transform:'none'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke"></circle>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="-pt-1 flex flex-col justify-center flex-1">
                                                    <div className="text-sm font-medium">Evaluate</div>
                                                    <div className="text-xs text-pebble-500">Reflect and measure</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pebble-500 mr-1 ml-auto h-4 w-4">
                                                    <path d="m9 18 6-6-6-6"></path>
                                                </svg>
                                            </a>
                                            <a className="flex flex-row items-center gap-4 py-3 px-4 hover:bg-pebble-50 transition-colors" href="/deploy">
                                                <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                    <div className="absolute -inset-1/6" style={{transform:'none'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                            <path fill="none" stroke="currentColor" d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z" vectorEffect="non-scaling-stroke"></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="-pt-1 flex flex-col justify-center flex-1">
                                                    <div className="text-sm font-medium">Deploy</div>
                                                    <div className="text-xs text-pebble-500">From draft to live</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pebble-500 mr-1 ml-auto h-4 w-4">
                                                    <path d="m9 18 6-6-6-6"></path>
                                                </svg>
                                            </a>
                                            <a className="flex flex-row items-center gap-4 py-3 px-4 hover:bg-pebble-50 transition-colors" href="/monitor">
                                                <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                    <div className="absolute -inset-1/6" style={{transform:'none'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                            <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke"></circle>
                                                        </svg>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke"></circle>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="-pt-1 flex flex-col justify-center flex-1">
                                                    <div className="text-sm font-medium">Monitor</div>
                                                    <div className="text-xs text-pebble-500">Insights in real time</div>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pebble-500 mr-1 ml-auto h-4 w-4">
                                                    <path d="m9 18 6-6-6-6"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        
                        <a href="#pricing" className="atlas-web-mono text-[#171717] tracking-wide font-light hover:opacity-70 transition-opacity" style={{ fontSize: '15px' }}>PRICING</a>
                        <a href="#blog" className="atlas-web-mono text-[#171717] tracking-wide font-light hover:opacity-70 transition-opacity" style={{ fontSize: '15px' }}>BLOG</a>
                    </div>

                    {/* Logo - Centered on Desktop, Left on Mobile */}
                    <a className="flex-none min-[900px]:absolute min-[900px]:left-1/2 min-[900px]:transform min-[900px]:-translate-x-1/2" aria-label="Adaline Homepage" href="/">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 84 15" className="text-black"
                            style={{
                                width: "133px", height: "auto"
                            }}>
                            <path d="M9.15.003.451 12.124v1.733h1.74l8.698-6.928V.003zM10.89 11.777H8.801v2.078h2.087zM39.034.67v5.113h-.036C38.52 5.034 37.472 4.5 36.301 4.5c-2.413 0-4.099 1.906-4.099 4.81 0 2.601 1.562 4.775 4.135 4.775 1.029 0 2.218-.517 2.697-1.425h.035l.089 1.193h1.349V.67zM36.46 12.73c-1.739 0-2.715-1.497-2.715-3.439 0-1.977.976-3.474 2.715-3.474 1.757 0 2.59 1.515 2.59 3.474 0 1.925-.887 3.439-2.59 3.439m13.396-.196V7.742c0-.516-.088-1.015-.283-1.443-.409-.98-1.491-1.8-3.248-1.8-1.916 0-3.584 1.052-3.655 2.887h1.473c.089-1.122 1.1-1.639 2.182-1.639 1.225 0 2.023.606 2.023 1.853v.66l-2.821.195c-2.395.16-3.265 1.568-3.265 2.94 0 1.265.976 2.69 3.159 2.69 1.348 0 2.43-.588 2.98-1.497h.036l.16 1.265h2.218v-1.318zm-1.508-2.53c0 1.586-1.082 2.762-2.697 2.762-1.295 0-1.828-.73-1.828-1.515 0-1.122.994-1.568 1.988-1.639l2.537-.178zM70.263 4.5c-1.1 0-2.414.57-2.857 1.621h-.036l-.106-1.39h-1.33v9.122h1.525v-4.24c0-.766.035-1.657.337-2.334.408-.82 1.189-1.39 2.094-1.39C71.31 5.89 72 6.78 72 8.189v5.665h1.509V7.974c0-2.174-1.225-3.474-3.248-3.474m13.236 5.22c0-.018.036-.25.036-.57 0-2.459-1.384-4.65-4.117-4.65-2.715 0-4.258 2.298-4.258 4.828 0 2.298 1.366 4.757 4.223 4.757 2.058 0 3.637-1.23 3.921-2.975h-1.526c-.302 1.104-1.136 1.621-2.342 1.621-1.721 0-2.715-1.514-2.715-2.922V9.72zM79.4 5.8c1.668 0 2.467 1.283 2.502 2.637h-5.128C76.81 7.101 77.857 5.8 79.4 5.8m-23.74 6.735V.669h-3.301v1.265h1.74v10.601h-1.882v1.318h5.359v-1.318zm6.813 0V4.732h-3.282V6.05h1.72v6.485H58.96v1.318h5.483v-1.318zM64.407.669h-1.934v1.907h1.934zM26.134 8.847l.107-.16h2.714V3.128L21.361 13.89h-1.916v-.036L28.885.67h1.738v13.22h-1.668V9.987h-2.82z"></path>
                        </svg>
                    </a>

                    {/* Desktop Navigation - Right Side */}
                    <div className="flex flex-1 items-center justify-end gap-8 pr-8">
                        <div className="hidden min-[900px]:flex items-center gap-2"
                            style={{
                                marginRight: "50px"
                            }}>
                            {/* Demo Button */}
                            <div className="relative">
                                <button className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[20px] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none shrink-0 h-10 gap-2 border border-pebble-200 text-meadow-700 hover:text-meadow-700 hover:border-[#C4B5A0] disabled:border-pebble-100 disabled:bg-transparent disabled:text-pebble-400 ring-offset-meadow-50 focus-visible:ring-meadow-700 px-6 atlas-web-mono bg-pebble-50"
                                    style={{
                                        transition: "border-radius 0.45s ease-out, background-color 0.45s ease-out",
                                        backgroundColor: "#fbfdf6",
                                        borderColor: "#e0e5d5",
                                        paddingTop: "18px",
                                        paddingBottom: "18px",
                                        paddingLeft: "16px",
                                        paddingRight: "16px",
                                        fontSize: "14.5px",
                                        fontStyle: "normal",
                                    }}>
                                    WATCH DEMO
                                    <div className="-mr-2.5 ml-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e0e5d5]">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="text-black w-4 h-4">
                                            <path d="M7 7.396c0-1.432 0-2.148.3-2.548a1.5 1.5 0 0 1 1.093-.597c.498-.035 1.1.352 2.305 1.126l7.162 4.604c1.045.672 1.567 1.008 1.748 1.435a1.5 1.5 0 0 1 0 1.168c-.18.427-.703.763-1.748 1.435l-7.162 4.604c-1.205.774-1.807 1.161-2.305 1.126A1.5 1.5 0 0 1 7.3 19.15C7 18.751 7 18.036 7 16.604z"></path>
                                        </svg>
                                    </div>
                                </button>
                            </div>

                            {/* Start for Free Button */}
                            <button className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[20px] cursor-pointer transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 shrink-0 h-10 gap-3 bg-meadow-700 text-meadow-60 hover:bg-meadow-700/90 disabled:bg-pebble-100 disabled:text-pebble-400 ring-offset-meadow-50 focus-visible:ring-meadow-700 atlas-web-mono px-6"
                                style={{
                                    paddingTop: "20px",
                                    paddingBottom: "20px",
                                    paddingLeft: "22px",
                                    paddingRight: "22px",
                                    fontSize: "14.5px",
                                    fontStyle: "normal",
                                }}>
                                START FOR FREE
                            </button>

                            {/* Mobile Menu Button - HIDDEN on desktop */}
                        </div>

                        {/* Mobile Only Buttons */}
                        <div className="flex min-[900px]:hidden items-center gap-4">
                            {/* Mobile DEMO Button */}
                            <button className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[20px] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none shrink-0 h-10 gap-2 border border-pebble-200 text-meadow-700 hover:text-meadow-700 hover:border-[#C4B5A0] disabled:border-pebble-100 disabled:bg-transparent disabled:text-pebble-400 ring-offset-meadow-50 focus-visible:ring-meadow-700 px-6 atlas-web-mono bg-pebble-50"
                                style={{
                                    transition: "border-radius 0.45s ease-out, background-color 0.45s ease-out",
                                    backgroundColor: "#fbfdf6",
                                    borderColor: "#e0e5d5",
                                    paddingTop: "20px",
                                    paddingBottom: "20px",
                                    paddingLeft: "20px",
                                    paddingRight: "20px",
                                    fontSize: "14.5px",
                                    fontStyle: "normal",
                                }}>
                                DEMO
                                <div className="-mr-2.5 ml-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e0e5d5]">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="text-black w-4 h-4">
                                        <path d="M7 7.396c0-1.432 0-2.148.3-2.548a1.5 1.5 0 0 1 1.093-.597c.498-.035 1.1.352 2.305 1.126l7.162 4.604c1.045.672 1.567 1.008 1.748 1.435a1.5 1.5 0 0 1 0 1.168c-.18.427-.703.763-1.748 1.435l-7.162 4.604c-1.205.774-1.807 1.161-2.305 1.126A1.5 1.5 0 0 1 7.3 19.15C7 18.751 7 18.036 7 16.604z"></path>
                                    </svg>
                                </div>
                            </button>

                            <button className="inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-[20px] cursor-pointer transition-colors shrink-0 h-10 bg-meadow-700 text-meadow-50 hover:bg-meadow-700/90 atlas-web-mono px-6">
                                START FOR FREE
                            </button>

                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="-mr-3 flex size-12 cursor-pointer items-center justify-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="4" x2="20" y1="12" y2="12"></line>
                                    <line x1="4" x2="20" y1="6" y2="6"></line>
                                    <line x1="4" x2="20" y1="18" y2="18"></line>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-clip shadow-[0_1px_0_0_transparent] transition-shadow duration-200"
                        >
                            <div className="bg-[#F5F1E8] px-6 lg:px-8 flex flex-col py-4 pt-16">
                                <div className="flex flex-col gap-4 py-2">
                                    <a href="#products">
                                        <span className="font-medium text-base">Products</span>
                                        <div className="text-sm text-[#6B6B6B]">Across your journey</div>
                                    </a>

                                    <div className="flex flex-col divide-y divide-[#E5E1D8] border-y border-[#E5E1D8]">
                                        {/* Iterate */}
                                        <a className="flex flex-row items-center gap-4 py-2" href="#iterate">
                                            <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                <div className="absolute -inset-1/6">
                                                    <div className="absolute inset-0">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                            <path fill="none" stroke="currentColor" d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z" vectorEffect="non-scaling-stroke"></path>
                                                        </svg>
                                                    </div>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                        <path fill="none" stroke="currentColor" d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z" vectorEffect="non-scaling-stroke"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-base">Iterate</div>
                                                <div className="text-sm text-[#6B6B6B]">Sketch, test and refine</div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B6B6B] mr-1 ml-auto h-4 w-4">
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                        </a>

                                        {/* Evaluate */}
                                        <a className="flex flex-row items-center gap-4 py-2" href="#evaluate">
                                            <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                <div className="absolute -inset-1/6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                        <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke"></circle>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-base">Evaluate</div>
                                                <div className="text-sm text-[#6B6B6B]">Reflect and measure</div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B6B6B] mr-1 ml-auto h-4 w-4">
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                        </a>

                                        {/* Deploy */}
                                        <a className="flex flex-row items-center gap-4 py-2" href="#deploy">
                                            <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                <div className="absolute -inset-1/6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                        <path fill="none" stroke="currentColor" d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z" vectorEffect="non-scaling-stroke"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-base">Deploy</div>
                                                <div className="text-sm text-[#6B6B6B]">From draft to live</div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B6B6B] mr-1 ml-auto h-4 w-4">
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                        </a>

                                        {/* Monitor */}
                                        <a className="flex flex-row items-center gap-4 py-2" href="#monitor">
                                            <div className="relative flex aspect-square shrink-0 items-center justify-center size-9">
                                                <div className="absolute -inset-1/6">
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                        <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke"></circle>
                                                    </svg>
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0" strokeWidth="1">
                                                        <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke"></circle>
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <div className="text-base">Monitor</div>
                                                <div className="text-sm text-[#6B6B6B]">Insights in real time</div>
                                            </div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6B6B6B] mr-1 ml-auto h-4 w-4">
                                                <path d="m9 18 6-6-6-6"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>

                                <div className="font-medium text-base py-2">
                                    <a href="#pricing">Pricing</a>
                                </div>
                                <div className="font-medium text-base py-2">
                                    <a href="#blog">Blog</a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav >
    );
}
