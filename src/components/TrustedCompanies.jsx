'use client';

import Logo1 from "@/components/logos/Logo1";
import Logo2 from "@/components/logos/Logo2";
import Logo3 from "@/components/logos/Logo3";
import Logo4 from "@/components/logos/Logo4";
import Logo5 from "@/components/logos/Logo5";
import Logo6 from "@/components/logos/Logo6";
import Logo7 from "@/components/logos/Logo7";

export default function TrustedCompanies() {
  const logos = [Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7];

  return (
    <section className="relative w-full overflow-hidden py-12">

      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-[100px] bg-gradient-to-r from-[#F5F1E8] to-transparent z-10" />

      <div className="flex gap-16 whitespace-nowrap animate-marquee text-black">
  {[...logos, ...logos].map((Logo, i) => (
    <Logo key={i} className="h-6 w-auto opacity-100 transition" />
  ))}
</div>


    </section>
  );
}
