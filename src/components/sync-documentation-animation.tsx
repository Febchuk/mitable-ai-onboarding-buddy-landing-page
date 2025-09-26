"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { SiSlack, SiNotion, SiGoogledrive } from "react-icons/si";

export function SyncDocumentationAnimation() {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const sources = [
    { name: "Slack", icon: <SiSlack className="w-5 h-5" />, color: "#4A154B" },
    { 
      name: "Notion", 
      icon: <SiNotion className="w-5 h-5 text-black dark:text-white" />, 
      color: "#000000" // Will be overridden by CSS
    },
    { name: "Drive", icon: <SiGoogledrive className="w-5 h-5" />, color: "#4285F4" },
  ];

  useEffect(() => {
    if (!isInView) {
      setActiveIndex(-1);
      return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setActiveIndex(index);
      index = (index + 1) % sources.length;
    }, 1500);

    return () => clearInterval(interval);
  }, [isInView, sources.length]);

  return (
    <div ref={ref} className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Compact header */}
      <div className="text-center mb-3">
        <motion.div
          className="text-xs px-3 py-1 rounded-full font-semibold border"
          animate={{
            borderColor: activeIndex >= 0 ? "#f59e0b" : "#22c55e",
            backgroundColor: activeIndex >= 0 ? "#f59e0b" : "#22c55e",
            color: "white",
          }}
        >
          {activeIndex >= 0 ? "Syncing..." : "All Current"}
        </motion.div>
      </div>

      {/* Compact source cards */}
      <div className="space-y-2 w-full max-w-[240px]">
        {sources.map((source, index) => (
          <motion.div
            key={source.name}
            className={`flex items-center justify-between p-2 rounded-lg border bg-white dark:bg-gray-800 ${
              activeIndex === index && source.name === "Notion" 
                ? "!border-black dark:!border-white" 
                : ""
            }`}
            animate={{
              borderColor: activeIndex === index && source.name !== "Notion" ? source.color : "#e5e7eb",
              scale: activeIndex === index ? 1.02 : 1,
            }}
            transition={{ duration: 0.3 }}
            style={{
              borderWidth: '2px',
            }}
          >
            {/* Icon and name */}
            <div className="flex items-center space-x-2">
              <div 
                className={`p-1 rounded ${
                  source.name === "Notion" 
                    ? "text-black dark:text-white bg-black/15 dark:bg-white/15" 
                    : ""
                }`}
                style={source.name === "Notion" ? {} : { 
                  color: source.color,
                  backgroundColor: `${source.color}25`,
                }}
              >
                {source.icon}
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {source.name}
              </span>
            </div>

            {/* Status indicator */}
            <div className="flex items-center space-x-1">
              <motion.div
                className="w-3 h-3 rounded-full flex items-center justify-center"
                animate={{
                  backgroundColor: activeIndex === index ? "#f59e0b" : "#22c55e",
                  scale: activeIndex === index ? [1, 1.2, 1] : 1,
                }}
                transition={{
                  duration: activeIndex === index ? 0.6 : 0.3,
                  repeat: activeIndex === index ? Infinity : 0,
                }}
              >
                {activeIndex !== index && (
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compact footer */}
      <motion.div
        className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 mt-3"
        animate={{
          opacity: activeIndex >= 0 ? 1 : 0.7,
        }}
      >
        <motion.div
          className="w-1.5 h-1.5 bg-blue-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        />
        <span>Auto-sync enabled</span>
      </motion.div>
    </div>
  );
}
