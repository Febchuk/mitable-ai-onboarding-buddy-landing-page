"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Ripple } from "@/components/ui/ripple";
import { Icons } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import confetti from "canvas-confetti";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function WaitlistPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);

    // Check if form is valid
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      return; // Don't submit if validation fails
    }

    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    // Debug: Log the form data
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }
    
    try {
      // Use a hidden iframe to submit the form (avoids CORS)
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.name = 'hidden_iframe';
      document.body.appendChild(iframe);

      const tempForm = document.createElement('form');
      tempForm.action = 'https://api.web3forms.com/submit';
      tempForm.method = 'POST';
      tempForm.target = 'hidden_iframe';

      // Add all form data to the temporary form
      for (const [key, value] of formData.entries()) {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value as string;
        tempForm.appendChild(input);
      }

      document.body.appendChild(tempForm);
      tempForm.submit();

      // Clean up
      setTimeout(() => {
        document.body.removeChild(tempForm);
        document.body.removeChild(iframe);
      }, 1000);

      console.log('✅ Form submitted successfully (emails should arrive)');
      
      // Since we know emails are working, just show success
      // Trigger confetti celebration
      const triggerConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: number, max: number) {
          return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
          const timeLeft = animationEnd - Date.now();
          if (timeLeft <= 0) {
            return clearInterval(interval);
          }

          const particleCount = 50 * (timeLeft / duration);
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          });
          confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          });
        }, 250);
      };

      triggerConfetti();
      setIsSubmitted(true);
      
      // Auto redirect to home after 4 seconds
      setTimeout(() => {
        window.location.href = "/";
      }, 4000);

    } catch (error) {
      console.error('Form submission error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background p-4">
        <Ripple />

        {/* Success Message */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-6 inline-flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <svg className="h-6 w-6 md:h-8 md:w-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4">
            Thanks! We&apos;ve got you covered 🎉
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            You&apos;re now on the Mitable waitlist
          </p>
          
          <p className="text-sm text-muted-foreground/70">
            Redirecting you back to home...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background p-4">
      <Ripple />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Top Navigation */}
        <div className="flex items-center justify-between mb-6 md:mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            Back to Home
          </Link>
          
          <ThemeToggle />
        </div>

        {/* Header with Logo */}
        <div className="text-center mb-8 md:mb-10">
          <div className="mb-6 md:mb-8">
            <Icons.logoFull className="h-8 md:h-10 mx-auto" />
          </div>
          
          <div className="max-w-xl mx-auto space-y-3 md:space-y-4">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed px-4 md:px-0">
              Mitable is on the verge of launching. Join our waitlist so you don&apos;t miss out 
              when we&apos;re ready to transform how your organization works with software.
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 px-4 md:px-0">
              Your input during development will help us create exactly what your team needs.
            </p>
          </div>
        </div>

        {/* Form - Mobile Optimized */}
        <div className="rounded-2xl border bg-card/60 backdrop-blur-sm p-6 md:p-10 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
            {/* Web3Forms Configuration */}
            <input type="hidden" name="access_key" value="038bd3cf-6de7-45f8-b72c-c8abb6bd34d0" />
            <input type="hidden" name="subject" value="New Mitable Waitlist Signup" />
            <input type="hidden" name="from_name" value="Mitable Waitlist" />
            <input type="hidden" name="redirect" value="false" />
            
            {/* Honeypot for spam protection */}
            <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />
            
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className={`h-11 md:h-12 text-base ${hasAttemptedSubmit ? 'invalid:border-red-500 invalid:ring-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500' : ''}`}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  required
                  className={`h-11 md:h-12 text-base ${hasAttemptedSubmit ? 'invalid:border-red-500 invalid:ring-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500' : ''}`}
                />
              </div>
            </div>

            {/* Job Title & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle" className="text-sm font-medium">
                  Job Title *
                </Label>
                <Input
                  id="jobTitle"
                  name="job_title"
                  placeholder="Training Manager"
                  required
                  className={`h-11 md:h-12 text-base ${hasAttemptedSubmit ? 'invalid:border-red-500 invalid:ring-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500' : ''}`}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-medium">
                  Company *
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Acme Corp"
                  required
                  className={`h-11 md:h-12 text-base ${hasAttemptedSubmit ? 'invalid:border-red-500 invalid:ring-red-500 focus:invalid:border-red-500 focus:invalid:ring-red-500' : ''}`}
                />
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">
                Additional Information <span className="text-muted-foreground font-normal">(optional)</span>
              </Label>
              <Textarea
                name="message"
                placeholder="Tell us about your onboarding challenges, team size, or specific questions..."
                rows={3}
                className="resize-none text-base"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 md:h-14 text-base font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Joining Waitlist...
                </>
              ) : (
                "Join the Waitlist"
              )}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We&apos;ll notify you when Mitable is ready. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
