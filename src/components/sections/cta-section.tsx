"use client";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import Link from "next/link";

export function CTASection() {
  const { ctaSection } = siteConfig;

  return (
    <section
      id="cta"
      className="flex flex-col items-center justify-center w-full"
    >
      <div className="w-full">
        <div className="h-[400px] md:h-[400px] overflow-hidden shadow-xl w-full border border-border rounded-xl bg-secondary relative z-20">
          <Image
            src={ctaSection.backgroundImage}
            alt="Agent CTA Background"
            className="absolute inset-0 w-full h-full object-cover object-right md:object-center"
            fill
            priority
          />
          <div className="absolute inset-0 -top-32 md:-top-40 flex flex-col items-center justify-center">
            <h1 className="text-white text-4xl md:text-7xl font-medium tracking-tighter max-w-xs md:max-w-xl text-center">
                {ctaSection.title}
              </h1>
            <div className="absolute bottom-10 flex flex-col items-center justify-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={ctaSection.button.href}
                  target={ctaSection.button.target}
                  rel="noopener noreferrer"
                  className="bg-white text-black font-semibold text-sm h-10 px-6 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                >
                  {ctaSection.button.text}
                </a>
                <Link
                  href="/waitlist"
                  className="bg-white/20 backdrop-blur-sm text-white font-semibold text-sm h-10 px-6 rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                >
                  Join the Waitlist
                </Link>
              </div>
              <span className="text-white text-sm text-center">{ctaSection.subtext}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
