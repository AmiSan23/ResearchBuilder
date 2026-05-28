'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccordionSectionProps {
  title: string;
  infoText?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function AccordionSection({ title, infoText, defaultOpen = false, children }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-xl mb-4 overflow-hidden transition-shadow hover:shadow-sm">
      <div
        className="px-5 py-4 flex items-center justify-between cursor-pointer select-none transition-colors hover:bg-slate-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <span className="text-[15px] font-semibold text-slate-900">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          {infoText && (
            <div className="relative group p-1 z-10" onClick={(e) => e.stopPropagation()}>
              <div className="w-6 h-6 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-colors cursor-help">
                <Info size={14} strokeWidth={2.5} />
              </div>
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2 bg-slate-900 text-white text-xs text-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {infoText}
                {/* Carrot */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          )}
          <motion.div
            initial={false}
            animate={{ rotate: isOpen ? 0 : -90 }}
            transition={{ duration: 0.2 }}
            className="text-slate-400"
          >
            <ChevronDown size={20} />
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-5 pb-5 pt-1">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
