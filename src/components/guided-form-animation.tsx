"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function GuidedFormAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [activeField, setActiveField] = useState<number>(-1);

  useEffect(() => {
    if (!isInView) {
      setActiveField(-1);
      return;
    }

    const sequence = [0, 1, 2]; // Field indices to highlight
    let currentIndex = 0;

    const interval = setInterval(() => {
      setActiveField(sequence[currentIndex]);
      currentIndex = (currentIndex + 1) % sequence.length;
    }, 2000);

    // Start after a delay
    const timeout = setTimeout(() => {
      setActiveField(sequence[0]);
    }, 500);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isInView]);

  const fields = [
    { id: "name", label: "Full Name", placeholder: "John Doe", tooltip: "Enter your full name here" },
    { id: "email", label: "Email", placeholder: "john@company.com", tooltip: "Your work email address" },
    { id: "role", label: "Role", placeholder: "Software Engineer", tooltip: "Your job title or role" },
  ];

  return (
    <div ref={ref} className="w-full h-full flex items-center justify-center p-6">
      <div className="relative w-full max-w-sm">
        <div className="bg-background border border-border rounded-lg p-4 shadow-sm">
          <h3 className="text-sm font-medium mb-3 text-center">New Employee Setup</h3>
          
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="relative">
                {/* Highlight ring */}
                <motion.div
                  className="absolute -inset-1 rounded-md bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
                  animate={{
                    opacity: activeField === index ? 0.3 : 0,
                    scale: activeField === index ? 1.02 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Form field */}
                <div className="relative">
                  <label className="block text-xs font-medium text-muted-foreground mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    className={`w-full px-2 py-1.5 text-xs border rounded transition-all duration-300 ${
                      activeField === index 
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20' 
                        : 'border-border bg-background'
                    }`}
                    readOnly
                  />
                </div>

                {/* Tooltip */}
                <motion.div
                  className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-secondary text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap pointer-events-none"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{
                    opacity: activeField === index ? 1 : 0,
                    y: activeField === index ? 0 : 5,
                  }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  {field.tooltip}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-secondary"></div>
                </motion.div>
              </div>
            ))}
          </div>

          <motion.button
            className="w-full mt-4 px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
            animate={{
              scale: activeField === 2 ? 1.05 : 1,
              boxShadow: activeField === 2 ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            Complete Setup
          </motion.button>
        </div>

        {/* Animated pointer */}
        <motion.div
          className="absolute w-4 h-4 pointer-events-none z-20"
          animate={{
            x: activeField === 0 ? 100 : activeField === 1 ? 100 : activeField === 2 ? 100 : -20,
            y: activeField === 0 ? 40 : activeField === 1 ? 75 : activeField === 2 ? 110 : -20,
            opacity: activeField >= 0 ? 1 : 0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-blue-500">
            <path
              d="M7 4V2C7 1.45 7.45 1 8 1S9 1.45 9 2V4H15V2C15 1.45 15.45 1 16 1S17 1.45 17 2V4H19C20.1 4 21 4.9 21 6V20C21 21.1 20.1 22 19 22H5C3.9 22 3 21.1 3 20V6C3 4.9 3.9 4 5 4H7Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
