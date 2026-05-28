'use client';

import React, { useRef, KeyboardEvent } from 'react';
import { Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Textarea Field ---
interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  infoText?: string;
}

export function TextareaField({ label, infoText, className, ...props }: TextareaFieldProps) {
  return (
    <div className={cn("mb-4 last:mb-0 pb-4 last:pb-0 border-b border-dashed border-slate-200 last:border-0", className)}>
      {label && (
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-slate-900">{label}</span>
          {infoText && (
            <div className="relative group p-1 z-10 cursor-help">
              <div className="w-5 h-5 flex items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50 transition-colors">
                 <Info size={12} strokeWidth={2.5} />
              </div>
              <div className="absolute bottom-full right-0 mb-2 w-56 p-2 bg-slate-900 text-white text-xs text-center rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
                {infoText}
                <div className="absolute top-full right-2 border-4 border-transparent border-t-slate-900" />
              </div>
            </div>
          )}
        </div>
      )}
      <textarea
        className="w-full min-h-[80px] p-3 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all resize-y"
        {...props}
      />
    </div>
  );
}

// --- Tag Input Field ---
interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}

export function TagInput({ tags, onChange, placeholder = "Tambahkan tag... (Enter)" }: TagInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = e.currentTarget.value.trim();
      if (val && !tags.includes(val)) {
        onChange([...tags, val]);
        e.currentTarget.value = '';
      }
    } else if (e.key === 'Backspace' && e.currentTarget.value === '' && tags.length > 0) {
      // Remove last tag if backspacing on empty input
      const newTags = [...tags];
      newTags.pop();
      onChange(newTags);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter(t => t !== tagToRemove));
  };

  return (
    <div 
      className="flex flex-wrap gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg min-h-[44px] cursor-text focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/10 transition-all"
      onClick={() => inputRef.current?.focus()}
    >
      {tags.map((tag) => (
        <span 
          key={tag}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 text-blue-700 rounded-md text-[13px] font-medium"
        >
          {tag}
          <span 
            className="cursor-pointer opacity-60 hover:opacity-100 flex items-center justify-center p-0.5 rounded hover:bg-blue-200/50"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag);
            }}
          >
            <X size={12} strokeWidth={3} />
          </span>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm text-slate-900 placeholder:text-slate-400"
        placeholder={tags.length === 0 ? placeholder : "Tambah..."}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

// --- Standard Input Group ---
export function InputGroup({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col mb-3">
      <label className="text-[13px] font-semibold text-slate-500 mb-1.5">{label}</label>
      <input
        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-600 focus:ring-3 focus:ring-blue-600/10 transition-all"
        {...props}
      />
    </div>
  );
}
