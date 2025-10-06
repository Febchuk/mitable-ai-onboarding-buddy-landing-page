"use client";

// import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
import { BorderBeam } from "@/components/ui/border-beam";
import Link from "next/link";

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="w-full relative">
      <div className="relative flex flex-col items-center w-full px-6">
        <div className="absolute inset-0">
          <div className="absolute inset-0 -z-10 h-[600px] md:h-[800px] w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-b-xl"></div>
        </div>
        <div className="relative z-10 pt-32 max-w-3xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
          <div className="relative overflow-hidden rounded-full">
            <p className="border border-border bg-accent rounded-full text-sm h-8 px-3 flex items-center gap-2">
              {hero.badgeIcon}
              {hero.badge}
            </p>
            <BorderBeam 
              size={40} 
              duration={12} 
              delay={9}
              colorFrom="#6366F1"
              colorTo="#8b5cf6"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-5">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-medium tracking-tighter text-balance text-center text-primary">
              {hero.title}
            </h1>
            <p className="text-base md:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight">
              {hero.description}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
              {hero.cta.primary.target ? (
                <a
                  href={hero.cta.primary.href}
                  target={hero.cta.primary.target}
                  rel="noopener noreferrer"
                  className="bg-secondary hover:bg-secondary/90 h-12 flex items-center justify-center text-base font-medium tracking-wide rounded-full text-secondary-foreground px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out active:scale-95 transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center">
                    {hero.cta.primary.text}
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </a>
              ) : (
                <Link
                  href={hero.cta.primary.href}
                  className="bg-secondary hover:bg-secondary/90 h-12 flex items-center justify-center text-base font-medium tracking-wide rounded-full text-secondary-foreground px-8 shadow-lg hover:shadow-xl transition-all duration-300 ease-out active:scale-95 transform hover:-translate-y-0.5 hover:scale-105 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10 flex items-center">
                    {hero.cta.primary.text}
                    <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </Link>
              )}
              
              {hero.cta.secondary && (
                <Link
                  href={hero.cta.secondary.href}
                  className="h-12 flex items-center justify-center px-8 text-base font-medium tracking-wide text-primary rounded-full transition-all duration-300 ease-out active:scale-95 bg-background border-2 border-secondary/20 dark:border-secondary/80 hover:border-secondary/30 dark:hover:border-secondary/70 hover:bg-secondary/5 dark:hover:bg-secondary/10 transform hover:-translate-y-0.5 group hover:scale-105"
                >
                  <svg className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {hero.cta.secondary.text}
                </Link>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              See how screen-aware AI can transform your team&apos;s onboarding experience in just 15 minutes.
            </p>
          </div>
        </div>
      </div>
      {/* <HeroVideoSection /> */}
      <div className="pb-50 md:pb-44"></div>
    </section>
  );
}
