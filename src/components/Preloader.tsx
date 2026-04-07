'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lock scrolling
    document.body.style.overflow = 'hidden';

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Unlock scrolling
      document.body.style.overflow = 'unset';
    }, 2000); 

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-foreground"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center gap-4"
          >
            {/* Logo */}
            <div className="font-playfair text-6xl font-black text-background tracking-tight flex items-center">
              AK
              <motion.span 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="text-primary"
              >
                .
              </motion.span>
            </div>
            
            {/* Loading text or bar */}
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden mt-2">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="h-full bg-primary"
              />
            </div>
            <motion.p
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.3 }}
               className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-2"
            >
              Loading
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
