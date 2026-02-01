
import React from 'react';

// Reusable Plus Sign Component - Centered perfectly
const PlusSign = ({ className }) => (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-3 h-3 text-black/60">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
    </div>
);

const StepLabel = ({ number, text, className }) => (
    <div className={`absolute flex items-center gap-3 z-30 ${className}`}>
        <div className="w-6 h-6 rounded-full bg-[#D4D9C7] text-[#131F0D] flex items-center justify-center text-xs font-mono font-medium">
            {number}
        </div>
        <span className="text-[11px] font-mono tracking-widest text-[#171717] uppercase">
            {text}
        </span>
    </div>
);

const ProductItem = ({ href, title, description, subLinks = [], children }) => (
    <div className="flex flex-col gap-6">
        <a href={href} className="flex flex-col gap-4">
            {/* Visual Area - Fixed Aspect Ratio */}
            <div className="relative w-full aspect-[16/9] flex items-center group/shape">
                {/* Visual Container */}
                <div className="relative w-full h-full text-[#171717]">
                    {children}
                </div>
            </div>

            {/* Title Section */}
            <div className="pl-[20px]">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B6B6B] mb-3">{title}</div>
                <h3
                    className="text-[26px] font-medium text-[#171717] leading-[1.15] tracking-tight"
                    style={{
                        fontFamily: 'akkurat, "akkurat Fallback", Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
                    }}
                >
                    {description}
                </h3>
            </div>
        </a>

        {/* Sub Links */}
        {subLinks.length > 0 && (
            <div className="flex flex-col gap-1.5 mt-2 pl-[20px]">
                {subLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        className="text-[13px] text-[#6B6B6B] hover:text-[#171717] transition-colors flex items-center gap-1.5 font-medium"
                    >
                        {link.label}
                        {link.hasArrow && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
                                <path d="M7 17L17 7" />
                                <path d="M7 7h10v10" />
                            </svg>
                        )}
                    </a>
                ))}
            </div>
        )}
    </div>
);

// Iterate Shape (Octagon-ish)
const IteratePolygon = ({ size = "100%", className }) => (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0 w-full h-full" strokeWidth="0.8">
            <path fill="none" stroke="currentColor" d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z" vectorEffect="non-scaling-stroke"></path>
        </svg>
        <PlusSign />
    </div>
);

// Evaluate Shape (Dashed Circle)
const EvaluateCircle = ({ size = "100%", className }) => (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0 w-full h-full" strokeWidth="0.8">
            <circle cx="32" cy="32" r="23" fill="none" stroke="currentColor" strokeDasharray="4 2" vectorEffect="non-scaling-stroke"></circle>
        </svg>
        <PlusSign />
    </div>
);

// Deploy Shape (Notched Circle - Fixed to look like original)
// Deploy Shape (Flower/Gear shape from original)
const DeployShape = ({ size = "100%", className }) => (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0 w-full h-full" strokeWidth="0.8">
            <path fill="none" stroke="currentColor" d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z" vectorEffect="non-scaling-stroke"></path>
        </svg>
        <PlusSign />
    </div>
);

// Monitor Shape (Concentric Circles)
const MonitorShape = ({ size = "100%", className }) => (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="absolute inset-0 w-full h-full" strokeWidth="1">
            <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" vectorEffect="non-scaling-stroke"></circle>
            <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" vectorEffect="non-scaling-stroke"></circle>
        </svg>
        <PlusSign />
    </div>
);

export default function ProductsMenu() {
    return (
        <div className="w-full bg-[#fbfdf6] border-t-2 border-dotted border-[#E5E5E5] pb-20 pt-10 px-6 lg:px-8 shadow-sm">
            <div className="max-w-[1400px] mx-auto grid grid-cols-4 gap-x-8">
                {/* Iterate */}
                <ProductItem
                    href="/iterate"
                    title="ITERATE"
                    description={<span>Sketch, test <br />and refine</span>}
                    subLinks={[
                        { label: 'Editor', href: '/editor' },
                        { label: 'Playground', href: '/playground' },
                        { label: 'Datasets', href: '/datasets' }
                    ]}
                >
                    <div className="w-full h-full relative">
                        {/* Main cluster Left-Center */}
                        <div className="absolute left-[15%] top-[25%] w-[42%] aspect-square z-10 rotate-6">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Overlap Top-Left */}
                        <div className="absolute left-[3%] top-[20%] w-[28%] aspect-square z-0 opacity-80 -rotate-6">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Overlap Bottom-Left */}
                        <div className="absolute left-[5%] top-[50%] w-[28%] aspect-square z-20 opacity-80 rotate-3">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Separate Small Top-Right */}
                        <div className="absolute right-[35%] top-[10%] w-[20%] aspect-square -rotate-12">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        <div className="absolute left-[15%] top-[25%] w-[42%] aspect-square z-10 rotate-0">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Overlap Top-Left */}
                        <div className="absolute left-[3%] top-[20%] w-[28%] aspect-square z-0 opacity-80 -rotate-0">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Overlap Bottom-Left */}
                        <div className="absolute left-[5%] top-[50%] w-[28%] aspect-square z-20 opacity-80 rotate-6">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Separate Small Top-Right */}
                        <div className="absolute right-[35%] top-[10%] w-[20%] aspect-square -rotate-6">
                            <IteratePolygon className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Label Badge */}
                        <StepLabel number="1" text="ITERATE" className="right-[5%] top-[45%]" />
                    </div>
                </ProductItem>

                {/* Evaluate */}
                <ProductItem
                    href="/evaluate"
                    title="EVALUATE"
                    description={<span>Reflect <br />and measure</span>}
                    subLinks={[
                        { label: 'Evaluations', href: '/evaluations' },
                        { label: 'Datasets', href: '/datasets' }
                    ]}
                >
                    <div className="w-full h-full relative">
                        {/* Main cluster Left-Center */}
                        <div className="absolute left-[18%] top-[35%] w-[25%] aspect-square z-10">
                            <EvaluateCircle className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        {/* Overlap Bottom-Left */}
                        <div className="absolute left-[30%] top-[55%] w-[20%] aspect-square z-20">
                            <EvaluateCircle className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        {/* Overlap Top-Left */}
                        <div className="absolute left-[27%] top-[12%] w-[30%] aspect-square z-0 opacity-70">
                            <EvaluateCircle className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Separate Small Right */}
                        <div className="absolute right-[35%] top-[40%] w-[13%] aspect-square">
                            <EvaluateCircle className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Label Badge */}
                        <StepLabel number="2" text="EVALUATE" className="right-[5%] top-[55%]" />
                    </div>
                </ProductItem>

                {/* Deploy */}
                <ProductItem
                    href="/deploy"
                    title="DEPLOY"
                    description={<span>From draft <br />to live</span>}
                    subLinks={[
                        { label: 'Deployments', href: '/deployments' },
                        { label: 'Analytics', href: '/analytics' },
                        { label: 'Gateway', href: '/gateway', hasArrow: true }
                    ]}
                >
                    <div className="w-full h-full relative">
                        {/* Large Bottom-Left */}
                        <div className="absolute left-[40%] bottom-[75%] w-[15%] aspect-square">
                            <DeployShape className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        <div className="absolute left-[15%] bottom-[15%] w-[32%] aspect-square">
                            <DeployShape className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        {/* Medium Top-Center/Right */}
                        <div className="absolute right-[35%] top-[20%] w-[22%] aspect-square">
                            <DeployShape className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        {/* Small Bottom-Center */}
                        <div className="absolute left-[40%] bottom-[15%] w-[12%] aspect-square">
                            <DeployShape className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Label Badge */}
                        <StepLabel number="3" text="DEPLOY" className="right-[10%] top-[20%]" />
                    </div>
                </ProductItem>

                {/* Monitor */}
                <ProductItem
                    href="/monitor"
                    title="MONITOR"
                    description={<span>Insights <br />in real time</span>}
                    subLinks={[
                        { label: 'Logs', href: '/logs' },
                        { label: 'Analytics', href: '/analytics' }
                    ]}
                >
                    <div className="w-full h-full relative">
                        {/* Large Left */}
                        <div className="absolute left-[25%] top-[10%] w-[37%] aspect-square">
                            <MonitorShape className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        {/* Small Top-Right */}
                        <div className="absolute right-[25%] top-[15%] w-[15%] aspect-square">
                            <MonitorShape className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        {/* Medium Bottom-Right */}
                        <div className="absolute right-[20%] bottom-[-5%] w-[23%] aspect-square">
                            <MonitorShape className="group-hover/shape:animate-spin-mixed" />
                        </div>
                        <div className="absolute right-[45%] bottom-[-5%] w-[17%] aspect-square">
                            <MonitorShape className="group-hover/shape:animate-spin-mixed" />
                        </div>

                        {/* Label Badge */}
                        <StepLabel number="4" text="MONITOR" className="right-[2%] top-[38%]" />
                    </div>
                </ProductItem>
            </div>
        </div>
    );
}
