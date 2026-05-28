'use client';

import React from 'react';
import { useJournal } from '@/lib/JournalContext';

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[1.125rem] font-bold mb-4 pb-2 border-b-2 border-blue-600 text-slate-900">
      {children}
    </div>
  );
}

function SubsectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[1rem] font-semibold mb-2 text-slate-900">
      {children}
    </div>
  );
}

function ContentText({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[0.9375rem] leading-relaxed text-slate-700 text-justify whitespace-pre-wrap mb-4 empty:after:content-['...'] empty:after:text-slate-300">
      {children}
    </div>
  );
}

export function PaperPreview() {
  const { state } = useJournal();

  const abstractText = Object.values(state.abstract)
    .filter((text) => text.trim() !== '')
    .join(' ');

  return (
    <div className="bg-white w-full max-w-[800px] min-h-[1100px] p-8 md:p-12 shadow-xl shrink-0 mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-slate-900 leading-tight">
        {state.title || 'Judul Penelitian'}
      </h1>

      <div className="mb-6">
        <div className="font-bold text-sm uppercase tracking-wide text-slate-500 mb-2">Abstrak</div>
        <div className="text-[0.9375rem] leading-relaxed text-slate-700 text-justify">
          {abstractText || <span className="text-slate-300">...</span>}
        </div>
      </div>

      <div className="mb-8 pb-4 border-b border-slate-200">
        <span className="font-bold text-sm text-slate-500">Kata Kunci: </span>
        <span className="text-[0.9375rem] text-slate-900 italic">
          {state.keywords.length > 0 ? state.keywords.join('; ') : '...'}
        </span>
      </div>

      {/* Pendahuluan */}
      <div className="mb-8">
        <SectionTitle>Pendahuluan</SectionTitle>
        <SubsectionTitle>1. Latar Belakang Masalah</SubsectionTitle>
        <ContentText>{state.pendahuluan.latar}</ContentText>
        <SubsectionTitle>2. Rumusan Masalah</SubsectionTitle>
        <ContentText>{state.pendahuluan.rumusan}</ContentText>
        <SubsectionTitle>3. Tujuan Penelitian</SubsectionTitle>
        <ContentText>{state.pendahuluan.tujuan}</ContentText>
        <SubsectionTitle>4. Manfaat Penelitian</SubsectionTitle>
        <ContentText>{state.pendahuluan.manfaat}</ContentText>
        <SubsectionTitle>5. Ruang Lingkup dan Batasan</SubsectionTitle>
        <ContentText>{state.pendahuluan.ruanglingkup}</ContentText>
        <SubsectionTitle>6. Sistematika Penulisan</SubsectionTitle>
        <ContentText>{state.pendahuluan.sistematika}</ContentText>
      </div>

      {/* Tinjauan Pustaka */}
      <div className="mb-8">
        <SectionTitle>Tinjauan Pustaka / Landasan Teori</SectionTitle>
        <SubsectionTitle>1. Konsep / Definisi Dasar</SubsectionTitle>
        <ContentText>{state.pustaka.konsep}</ContentText>
        <SubsectionTitle>2. Teori yang Relevan</SubsectionTitle>
        <ContentText>{state.pustaka.teori}</ContentText>
        <SubsectionTitle>3. Kajian Terdahulu</SubsectionTitle>
        <ContentText>{state.pustaka.terdahulu}</ContentText>
        <SubsectionTitle>4. Kerangka Konseptual</SubsectionTitle>
        {state.frameworkImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={state.frameworkImage} alt="Kerangka Konseptual" className="max-w-full my-4 rounded-md mx-auto block" />
        )}
        <ContentText>{state.pustaka.kerangkaPenjelasan}</ContentText>
        <SubsectionTitle>5. Hipotesis / Proposisi</SubsectionTitle>
        <ContentText>{state.pustaka.hipotesis}</ContentText>
      </div>

      {/* Metodologi Penelitian */}
      <div className="mb-8">
        <SectionTitle>Metodologi Penelitian</SectionTitle>
        <SubsectionTitle>1. Jenis dan Pendekatan Penelitian</SubsectionTitle>
        <ContentText>{state.metodologi.jenis}</ContentText>
        <SubsectionTitle>2. Lokasi dan Waktu Penelitian</SubsectionTitle>
        <ContentText>{state.metodologi.lokasi}</ContentText>
        <SubsectionTitle>3. Subjek / Informan Penelitian</SubsectionTitle>
        <ContentText>{state.metodologi.subjek}</ContentText>
        <SubsectionTitle>4. Teknik Pengumpulan Data</SubsectionTitle>
        <ContentText>{state.metodologi.pengumpulan}</ContentText>
        <SubsectionTitle>5. Teknik Analisis Data</SubsectionTitle>
        <ContentText>{state.metodologi.analisis}</ContentText>
        <SubsectionTitle>6. Teknik Keabsahan</SubsectionTitle>
        <ContentText>{state.metodologi.keabsahan}</ContentText>
        <SubsectionTitle>7. Etika Penelitian</SubsectionTitle>
        <ContentText>{state.metodologi.etika}</ContentText>
      </div>

      {/* Hasil Penelitian */}
      <div className="mb-8">
        <SectionTitle>Hasil Penelitian</SectionTitle>
        <SubsectionTitle>1. Gambaran Umum Hasil Penelitian</SubsectionTitle>
        <ContentText>{state.hasil.gambaran}</ContentText>
        
        {state.hasil.temas.map((tema, index) => (
          <React.Fragment key={tema.id}>
            <SubsectionTitle>{index + 2}. Tema {index + 1}</SubsectionTitle>
            <ContentText>{tema.value}</ContentText>
          </React.Fragment>
        ))}

        <SubsectionTitle>{state.hasil.temas.length + 2}. Temuan Pendukung</SubsectionTitle>
        <ContentText>{state.hasil.pendukung}</ContentText>
        <SubsectionTitle>{state.hasil.temas.length + 3}. Hubungan Antar Temuan</SubsectionTitle>
        <ContentText>{state.hasil.hubungan}</ContentText>
      </div>

      {/* Pembahasan */}
      <div className="mb-8">
        <SectionTitle>Pembahasan</SectionTitle>
        <SubsectionTitle>1. Interpretasi Temuan Utama</SubsectionTitle>
        <ContentText>{state.pembahasan.interpretasi}</ContentText>
        <SubsectionTitle>2. Perbandingan Kajian Terdahulu</SubsectionTitle>
        <ContentText>{state.pembahasan.perbandingan}</ContentText>
        <SubsectionTitle>3. Penjelasan dengan Landasan Teori</SubsectionTitle>
        <ContentText>{state.pembahasan.teori}</ContentText>
        <SubsectionTitle>4. Faktor Penghambat dan Pendukung</SubsectionTitle>
        <ContentText>{state.pembahasan.faktor}</ContentText>
        <SubsectionTitle>5. Implikasi Temuan</SubsectionTitle>
        <ContentText>{state.pembahasan.implikasi}</ContentText>
        <SubsectionTitle>6. Keterbatasan Penelitian</SubsectionTitle>
        <ContentText>{state.pembahasan.keterbatasan}</ContentText>
      </div>

      {/* Kesimpulan dan Saran */}
      <div className="mb-8">
        <SectionTitle>Kesimpulan dan Saran</SectionTitle>
        <SubsectionTitle>Kesimpulan Umum</SubsectionTitle>
        <ContentText>{state.kesimpulan.umum}</ContentText>
        
        {state.kesimpulan.rumusan.map((rumusan, index) => (
          <React.Fragment key={rumusan.id}>
            <SubsectionTitle>Kesimpulan Rumusan Masalah {index + 1}</SubsectionTitle>
            <ContentText>{rumusan.value}</ContentText>
          </React.Fragment>
        ))}

        <SubsectionTitle>Saran Praktis</SubsectionTitle>
        <ContentText>{state.kesimpulan.saranPraktis}</ContentText>
        <SubsectionTitle>Saran Penelitian Lanjutan</SubsectionTitle>
        <ContentText>{state.kesimpulan.saranLanjutan}</ContentText>
      </div>

      {/* Daftar Pustaka */}
      <div className="mb-8">
        <SectionTitle>Daftar Pustaka</SectionTitle>
        {state.bibliography.length === 0 ? (
          <ContentText>{''}</ContentText>
        ) : (
          <ol className="list-decimal pl-6 text-[0.9375rem] leading-relaxed text-slate-700">
            {state.bibliography.map((bib) => {
              const parts = [];
              if (bib.penulis) parts.push(`${bib.penulis}.`);
              if (bib.tahun) parts.push(`(${bib.tahun}).`);
              if (bib.judul) parts.push(<span key="title" className="italic">{bib.judul}.</span>);
              if (bib.penerbit) parts.push(`${bib.penerbit}.`);
              if (bib.hal) parts.push(`hlm. ${bib.hal}.`);
              
              return (
                <li key={bib.id} className="mb-2">
                  <span className="space-x-1">
                    {parts.map((p, i) => <React.Fragment key={i}>{p} </React.Fragment>)}
                  </span>
                  {bib.link && (
                    <div className="mt-1 break-all">
                      <a href={bib.link} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        {bib.link}
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        )}
      </div>

      {/* Lampiran */}
      <div className="mb-8">
        <SectionTitle>Lampiran</SectionTitle>
        {state.lampiran.length === 0 ? (
          <ContentText>{''}</ContentText>
        ) : (
          <ul className="list-disc pl-6 text-[0.9375rem] leading-relaxed text-slate-700">
            {state.lampiran.map((f) => (
              <li key={f.id}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}
