'use client';

import React, { useRef, useState, useEffect } from 'react';
import { JournalProvider, useJournal } from '@/lib/JournalContext';
import { AccordionSection } from '@/components/ui/AccordionSection';
import { TextareaField, TagInput, InputGroup } from '@/components/form/Fields';
import { PaperPreview } from '@/components/preview/PaperPreview';
import { 
  ABSTRACT_FIELDS, PENDAHULUAN_FIELDS, 
  PUSTAKA_FIELDS_PART_1, METODOLOGI_FIELDS, PEMBAHASAN_FIELDS
} from '@/lib/form-configs';
import { 
  Settings, Save, FileText, Download, Printer, RefreshCw, X, Plus, UploadCloud, Info
} from 'lucide-react';
import { exportAsTXT, exportAsMD, exportAsHTML } from '@/lib/exportUtils';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

function BuilderApp() {
  const { state, updateField, updateNestedField, resetState, isSaving } = useJournal();
  
  // Split pane state
  const [splitPos, setSplitPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingList = useRef(false);

  // View state
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const paperRef = useRef<HTMLDivElement>(null);

  // Drag logic for split
  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingList.current = true;
    document.body.style.cursor = window.innerWidth > 768 ? 'col-resize' : 'row-resize';
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingList.current || !containerRef.current) return;
      
      const containerRect = containerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      if (window.innerWidth > 768) {
        let newPos = ((clientX - containerRect.left) / containerRect.width) * 100;
        newPos = Math.max(20, Math.min(80, newPos));
        setSplitPos(newPos);
      } else {
        let newPos = ((clientY - containerRect.top) / containerRect.height) * 100;
        newPos = Math.max(20, Math.min(80, newPos));
        setSplitPos(newPos);
      }
    };

    const handleMouseUp = () => {
      isDraggingList.current = false;
      document.body.style.cursor = 'default';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  const handleExport = (format: 'txt' | 'md' | 'html') => {
    setDropdownOpen(false);
    let content = '';
    const filename = `${state.title.replace(/[^a-zA-Z0-9]/g, '_') || 'Draft'}.${format}`;
    let mime = 'text/plain';

    if (format === 'txt') content = exportAsTXT(state);
    if (format === 'md') { content = exportAsMD(state); mime = 'text/markdown'; }
    if (format === 'html') { 
      const htmlContent = paperRef.current?.innerHTML || '';
      content = exportAsHTML(state, htmlContent); 
      mime = 'text/html'; 
    }

    const blob = new Blob([content], { type: mime + ';charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    setDropdownOpen(false);
    window.print();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        updateField('frameworkImage', ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden font-sans text-slate-900 print:bg-white text-[15px]">
      {/* HEADER */}
      <header className="flex-shrink-0 h-14 bg-white border-b border-slate-200 px-4 md:px-6 flex items-center justify-between z-10 select-none print:hidden shadow-sm">
        <div className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <FileText size={24} strokeWidth={2.5} />
          <span className="hidden sm:inline">Research Builder</span>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium mr-2">
            {isSaving ? (
              <span className="text-amber-500 flex items-center gap-1"><RefreshCw size={14} className="animate-spin" /> Menyimpan...</span>
            ) : (
              <span className="text-emerald-500 flex items-center gap-1"><Save size={14} /> Tersimpan</span>
            )}
          </div>

          <button 
            className="md:hidden p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
          >
            {showPreviewMobile ? <Settings size={20} /> : <FileText size={20} />}
          </button>

          <div className="relative">
            <button 
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors shadow-sm"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Download size={16} />
              <span className="hidden md:inline">Ekspor</span>
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setDropdownOpen(false)} />
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden py-1"
                  >
                    <button onClick={() => handleExport('txt')} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Ekspor sebagai .TXT</button>
                    <button onClick={() => handleExport('md')} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Ekspor sebagai .MD</button>
                    <button onClick={() => handleExport('html')} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors">Ekspor sebagai .HTML</button>
                    <div className="h-px bg-slate-100 my-1 font-bold"></div>
                    <button onClick={handlePrint} className="w-full text-left px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors flex items-center gap-2">
                       <Printer size={16} /> Cetak / PDF
                    </button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button 
            onClick={() => { if(confirm('Reset semua data?')) resetState(); }} 
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            <RefreshCw size={16} />
            <span className="hidden md:inline">Reset</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTENT SPLIT */}
      <div 
        ref={containerRef}
        className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:block"
      >
        {/* LEFT / TOP: INPUT PANEL */}
        <div 
          className={cn(
            "h-full overflow-y-auto w-full p-4 md:p-6 pb-20 print:hidden scroll-smooth",
            showPreviewMobile ? "hidden md:block" : "block"
          )}
          style={{ flexBasis: window.innerWidth > 768 ? `${splitPos}%` : undefined }}
        >
          <div className="max-w-3xl mx-auto space-y-4">
            
            <AccordionSection title="Judul Penelitian" defaultOpen infoText="Masukkan judul penelitian yang jelas dan spesifik (mengandung variabel, objek, subjek).">
              <input 
                type="text" 
                placeholder="Masukkan judul penelitian..." 
                className="w-full p-3 mb-4 bg-white border border-slate-300 rounded-lg text-[15px] font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all font-serif"
                value={state.title}
                onChange={e => updateField('title', e.target.value)}
              />
              <TagInput 
                tags={state.titleTags} 
                onChange={t => updateField('titleTags', t)} 
                placeholder="Tambah unsur judul... (Enter)"
              />
            </AccordionSection>

            <AccordionSection title="Abstrak" infoText="Ringkasan singkat keseluruhan jurnal (150-250 kata)">
              {ABSTRACT_FIELDS.map(f => (
                <TextareaField 
                  key={f.key} label={f.label} infoText={f.tooltip} placeholder={f.placeholder}
                  value={(state.abstract as any)[f.key]}
                  onChange={e => updateNestedField('abstract', f.key as any, e.target.value)}
                />
              ))}
            </AccordionSection>

            <AccordionSection title="Kata Kunci" infoText="Kata kunci utama penelitian (maks. 5 kata).">
              <TagInput 
                tags={state.keywords} 
                onChange={t => updateField('keywords', t)} 
                placeholder="Tambah kata kunci... (Enter)"
              />
            </AccordionSection>

            <AccordionSection title="Pendahuluan" infoText="Latar belakang, rumusan masalah, hingga sistematika.">
              {PENDAHULUAN_FIELDS.map(f => (
                <TextareaField 
                  key={f.key} label={f.label} infoText={f.tooltip} placeholder={f.placeholder}
                  value={(state.pendahuluan as any)[f.key]}
                  onChange={e => updateNestedField('pendahuluan', f.key as any, e.target.value)}
                />
              ))}
            </AccordionSection>

            <AccordionSection title="Tinjauan Pustaka / Landasan Teori">
              {PUSTAKA_FIELDS_PART_1.map(f => (
                <TextareaField 
                  key={f.key} label={f.label} infoText={f.tooltip} placeholder={f.placeholder}
                  value={(state.pustaka as any)[f.key]}
                  onChange={e => updateNestedField('pustaka', f.key as any, e.target.value)}
                />
              ))}
              
              <div className="mb-4 pb-4 border-b border-dashed border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-900">4. Kerangka Konseptual</span>
                </div>
                
                {!state.frameworkImage ? (
                  <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <UploadCloud className="text-slate-400 mb-2" size={32} />
                    <span className="text-sm font-medium text-slate-600">Klik untuk upload gambar kerangka konseptual</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                  </label>
                ) : (
                  <div className="relative group rounded-xl overflow-hidden border border-slate-200 inline-block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={state.frameworkImage} alt="Kerangka" className="max-w-full h-auto" />
                    <button 
                      onClick={() => updateField('frameworkImage', null)}
                      className="absolute top-2 right-2 p-1.5 bg-slate-900/60 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                <TextareaField 
                  className="mt-4 border-b-0 pb-0"
                  placeholder="Penjelasan kerangka konseptual..."
                  value={state.pustaka.kerangkaPenjelasan}
                  onChange={e => updateNestedField('pustaka', 'kerangkaPenjelasan', e.target.value)}
                />
              </div>

              <TextareaField 
                label="5. Hipotesis / Proposisi" infoText="Dugaan sementara atau proposisi penelitian"
                placeholder="Hipotesis / proposisi..."
                value={state.pustaka.hipotesis}
                onChange={e => updateNestedField('pustaka', 'hipotesis', e.target.value)}
                className="border-b-0 pb-0"
              />
            </AccordionSection>

            <AccordionSection title="Metodologi Penelitian">
              {METODOLOGI_FIELDS.map(f => (
                <TextareaField 
                  key={f.key} label={f.label} placeholder={f.placeholder}
                  value={(state.metodologi as any)[f.key]}
                  onChange={e => updateNestedField('metodologi', f.key as any, e.target.value)}
                />
              ))}
            </AccordionSection>

            <AccordionSection title="Hasil Penelitian">
              <TextareaField 
                label="1. Gambaran Umum Hasil Penelitian" placeholder="Gambaran umum hasil..."
                value={state.hasil.gambaran}
                onChange={e => updateNestedField('hasil', 'gambaran', e.target.value)}
              />
              
              {state.hasil.temas.map((tema, idx) => (
                <div key={tema.id} className="mb-4 pb-4 border-b border-dashed border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900">{idx + 2}. Tema Tambahan</span>
                    <button 
                      onClick={() => updateNestedField('hasil', 'temas', state.hasil.temas.filter(t => t.id !== tema.id))}
                      className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <textarea
                    className="w-full min-h-[80px] p-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all resize-y"
                    placeholder={`Temuan tema tambahan ${idx + 1}...`}
                    value={tema.value}
                    onChange={e => {
                      const newTemas = [...state.hasil.temas];
                      newTemas[idx].value = e.target.value;
                      updateNestedField('hasil', 'temas', newTemas);
                    }}
                  />
                </div>
              ))}
              
              <div className="mb-6">
                <button 
                  onClick={() => updateNestedField('hasil', 'temas', [...state.hasil.temas, { id: Date.now().toString(), value: '' }])}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Plus size={16} /> Tambah Tema
                </button>
              </div>

              <TextareaField 
                label={`${state.hasil.temas.length + 2}. Temuan Pendukung`} placeholder="Temuan pendukung..."
                value={state.hasil.pendukung}
                onChange={e => updateNestedField('hasil', 'pendukung', e.target.value)}
              />
              <TextareaField 
                label={`${state.hasil.temas.length + 3}. Hubungan Antar Temuan`} placeholder="Hubungan antar temuan..."
                value={state.hasil.hubungan}
                onChange={e => updateNestedField('hasil', 'hubungan', e.target.value)}
                className="border-b-0 pb-0"
              />
            </AccordionSection>

            <AccordionSection title="Pembahasan">
              {PEMBAHASAN_FIELDS.map(f => (
                <TextareaField 
                  key={f.key} label={f.label} placeholder={f.placeholder}
                  value={(state.pembahasan as any)[f.key]}
                  onChange={e => updateNestedField('pembahasan', f.key as any, e.target.value)}
                />
              ))}
            </AccordionSection>

            <AccordionSection title="Kesimpulan dan Saran">
              <TextareaField 
                label="Kesimpulan Umum" placeholder="Kesimpulan umum..."
                value={state.kesimpulan.umum}
                onChange={e => updateNestedField('kesimpulan', 'umum', e.target.value)}
              />
              
              {state.kesimpulan.rumusan.map((rumusan, idx) => (
                <div key={rumusan.id} className="mb-4 pb-4 border-b border-dashed border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-slate-900">Kesimpulan Rumusan Masalah {idx + 1}</span>
                    <button 
                      onClick={() => updateNestedField('kesimpulan', 'rumusan', state.kesimpulan.rumusan.filter(t => t.id !== rumusan.id))}
                      className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  <textarea
                    className="w-full min-h-[80px] p-3 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all resize-y"
                    placeholder={`Kesimpulan rumusan masalah ${idx + 1}...`}
                    value={rumusan.value}
                    onChange={e => {
                      const newList = [...state.kesimpulan.rumusan];
                      newList[idx].value = e.target.value;
                      updateNestedField('kesimpulan', 'rumusan', newList);
                    }}
                  />
                </div>
              ))}
              
              <div className="mb-6">
                <button 
                  onClick={() => updateNestedField('kesimpulan', 'rumusan', [...state.kesimpulan.rumusan, { id: Date.now().toString(), value: '' }])}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Plus size={16} /> Tambah Rumusan Masalah
                </button>
              </div>

              <TextareaField 
                label="Saran Praktis" placeholder="Saran praktis..."
                value={state.kesimpulan.saranPraktis}
                onChange={e => updateNestedField('kesimpulan', 'saranPraktis', e.target.value)}
              />
              <TextareaField 
                label="Saran Penelitian Lanjutan" placeholder="Saran untuk penelitian lanjutan..."
                value={state.kesimpulan.saranLanjutan}
                onChange={e => updateNestedField('kesimpulan', 'saranLanjutan', e.target.value)}
                className="border-b-0 pb-0"
              />
            </AccordionSection>

            <AccordionSection title="Daftar Pustaka">
              {state.bibliography.map((bib, idx) => (
                <div key={bib.id} className="mb-6 p-4 bg-slate-50 border border-slate-200 rounded-lg relative group">
                  <button 
                    onClick={() => updateField('bibliography', state.bibliography.filter(b => b.id !== bib.id))}
                    className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 text-slate-400 hover:text-red-600 hover:border-red-600 rounded-md shadow-sm opacity-0 group-hover:opacity-100 transition-all font-bold"
                  >
                    <X size={14} />
                  </button>
                  <div className="text-sm font-semibold text-slate-700 mb-3">Referensi #{idx + 1}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-[13px]">
                    <InputGroup label="Penulis" placeholder="Nama penulis" value={bib.penulis} onChange={e => {
                      const list = [...state.bibliography];
                      list[idx].penulis = e.target.value;
                      updateField('bibliography', list);
                    }}/>
                    <InputGroup label="Tahun" placeholder="Tahun" value={bib.tahun} onChange={e => {
                      const list = [...state.bibliography];
                      list[idx].tahun = e.target.value;
                      updateField('bibliography', list);
                    }}/>
                    <div className="col-span-1 md:col-span-2">
                       <InputGroup label="Judul" placeholder="Judul karya" value={bib.judul} onChange={e => {
                        const list = [...state.bibliography];
                        list[idx].judul = e.target.value;
                        updateField('bibliography', list);
                      }}/>
                    </div>
                    <InputGroup label="Penerbit / Jurnal" placeholder="Penerbit" value={bib.penerbit} onChange={e => {
                      const list = [...state.bibliography];
                      list[idx].penerbit = e.target.value;
                      updateField('bibliography', list);
                    }}/>
                    <InputGroup label="Halaman" placeholder="Halaman" value={bib.hal} onChange={e => {
                      const list = [...state.bibliography];
                      list[idx].hal = e.target.value;
                      updateField('bibliography', list);
                    }}/>
                    <div className="col-span-1 md:col-span-2">
                       <InputGroup label="Link" placeholder="URL / DOI" value={bib.link} onChange={e => {
                        const list = [...state.bibliography];
                        list[idx].link = e.target.value;
                        updateField('bibliography', list);
                      }}/>
                    </div>
                  </div>
                </div>
              ))}
              
              <button 
                onClick={() => updateField('bibliography', [...state.bibliography, { id: Date.now().toString(), penulis: '', tahun: '', judul: '', penerbit: '', hal: '', link: '' }])}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
              >
                <Plus size={16} /> Tambah Referensi
              </button>
            </AccordionSection>

            <AccordionSection title="Lampiran">
               <label className="flex flex-col items-center justify-center p-6 mb-4 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-colors">
                  <UploadCloud className="text-slate-400 mb-2" size={28} />
                  <span className="text-[13px] font-medium text-slate-600">Klik atau drag file untuk upload lampiran</span>
                  <input type="file" multiple className="hidden" onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    const newLampiran = files.map(f => ({ id: Math.random().toString(), name: f.name, file: f }));
                    updateField('lampiran', [...state.lampiran, ...newLampiran]);
                  }} />
                </label>
                
                <div className="space-y-2">
                  {state.lampiran.map((f, idx) => (
                    <div key={f.id} className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-slate-400" />
                        <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{f.name}</span>
                      </div>
                      <button 
                        onClick={() => updateField('lampiran', state.lampiran.filter(x => x.id !== f.id))}
                        className="text-red-500 hover:bg-red-100 p-1.5 rounded-md transition-colors"
                      >
                         <X size={14} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))}
                </div>
            </AccordionSection>

          </div>
        </div>

        {/* DIVIDER */}
        <div 
          className="bg-slate-200 hover:bg-blue-500 active:bg-blue-600 flex-shrink-0 z-20 cursor-row-resize md:cursor-col-resize transition-colors hidden md:block print:hidden"
          style={{ width: window.innerWidth > 768 ? '6px' : '100%', height: window.innerWidth > 768 ? '100%' : '6px' }}
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        />

        {/* RIGHT / BOTTOM: PREVIEW PANEL */}
        <div 
          className={cn(
            "h-full overflow-y-auto w-full bg-slate-300/50 print:bg-white print:block scroll-smooth",
            !showPreviewMobile ? "hidden md:block" : "block",
            "shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)]"
          )}
          style={{ flexBasis: window.innerWidth > 768 ? `${100 - splitPos}%` : undefined }}
        >
          <div ref={paperRef} className="print:w-full py-8 text-slate-900">
             <PaperPreview />
          </div>
        </div>
      </div>

    </div>
  );
}

export default function Page() {
  return (
    <JournalProvider>
      <BuilderApp />
    </JournalProvider>
  );
}
