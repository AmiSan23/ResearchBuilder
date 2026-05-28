'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { JournalState, INITIAL_STATE, DynamicItem, BibliographyItem, LampiranItem } from '@/types/journal';

type UpdateVal = string | string[] | DynamicItem[] | BibliographyItem[] | LampiranItem[] | string | null;

interface JournalContextType {
  state: JournalState;
  updateField: <K extends keyof JournalState>(field: K, value: JournalState[K]) => void;
  updateNestedField: <K extends keyof JournalState, SubK extends keyof JournalState[K]>(
    section: K,
    field: SubK,
    value: JournalState[K][SubK]
  ) => void;
  resetState: () => void;
  isSaving: boolean;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<JournalState>(INITIAL_STATE);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('research_builder_data');
      if (saved) {
        // Deep merge to ensure arrays and objects exist
        const parsed = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setState({ ...INITIAL_STATE, ...parsed });
      }
    } catch (e) {
      console.error("Failed to load from storage", e);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  // Save to LocalStorage when state changes (debounced mildly)
  useEffect(() => {
    if (!isLoaded) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSaving(true);
    const timeout = setTimeout(() => {
      // Exclude File objects from storage to avoid stringify errors
      // So we map lampiran to only strings
      const stateToSave = {
        ...state,
        lampiran: state.lampiran.map(l => ({ id: l.id, name: l.name }))
      };
      localStorage.setItem('research_builder_data', JSON.stringify(stateToSave));
      setIsSaving(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [state, isLoaded]);

  const updateField = useCallback(<K extends keyof JournalState>(field: K, value: JournalState[K]) => {
    setState((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateNestedField = useCallback(<K extends keyof JournalState, SubK extends keyof JournalState[K]>(
    section: K,
    field: SubK,
    value: JournalState[K][SubK]
  ) => {
    setState((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, any>),
        [field]: value,
      },
    }));
  }, []);

  const resetState = useCallback(() => {
    setState(INITIAL_STATE);
    localStorage.removeItem('research_builder_data');
  }, []);

  if (!isLoaded) {
    return null; // or a loader
  }

  return (
    <JournalContext.Provider value={{ state, updateField, updateNestedField, resetState, isSaving }}>
      {children}
    </JournalContext.Provider>
  );
}

export function useJournal() {
  const context = useContext(JournalContext);
  if (context === undefined) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
}
