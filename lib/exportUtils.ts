import { JournalState } from '@/types/journal';

export function exportAsTXT(state: JournalState): string {
  let text = '';
  const title = state.title || 'Judul Penelitian';
  
  text += `${title}\n${'='.repeat(title.length)}\n\n`;
  
  if (state.keywords.length) {
    text += `Kata Kunci: ${state.keywords.join('; ')}\n\n`;
  }
  
  text += 'ABSTRAK\n';
  text += '-'.repeat(7) + '\n';
  const absValues = Object.values(state.abstract).filter(v => v.trim());
  if (absValues.length) text += absValues.join('\n') + '\n';
  text += '\n';
  
  const sections = [
    { name: 'PENDAHULUAN', data: state.pendahuluan },
    { name: 'TINJAUAN PUSTAKA / LANDASAN TEORI', data: state.pustaka },
    { name: 'METODOLOGI PENELITIAN', data: state.metodologi },
    { name: 'HASIL PENELITIAN', data: { gambaran: state.hasil.gambaran, pendukung: state.hasil.pendukung, hubungan: state.hasil.hubungan } },
    { name: 'PEMBAHASAN', data: state.pembahasan },
    { name: 'KESIMPULAN DAN SARAN', data: { umum: state.kesimpulan.umum, saranPraktis: state.kesimpulan.saranPraktis, saranLanjutan: state.kesimpulan.saranLanjutan } }
  ];
  
  sections.forEach(section => {
    text += `\n${section.name}\n`;
    text += '-'.repeat(section.name.length) + '\n';
    
    // Add dynamic temas
    if (section.name === 'HASIL PENELITIAN') {
      text += state.hasil.gambaran ? state.hasil.gambaran + '\n\n' : '';
      state.hasil.temas.forEach(t => {
        if (t.value) text += t.value + '\n\n';
      });
      text += state.hasil.pendukung ? state.hasil.pendukung + '\n\n' : '';
      text += state.hasil.hubungan ? state.hasil.hubungan + '\n\n' : '';
    }
    // Add dynamic kesimpulan rumusan
    else if (section.name === 'KESIMPULAN DAN SARAN') {
       text += state.kesimpulan.umum ? state.kesimpulan.umum + '\n\n' : '';
       state.kesimpulan.rumusan.forEach(t => {
        if (t.value) text += t.value + '\n\n';
       });
       text += state.kesimpulan.saranPraktis ? state.kesimpulan.saranPraktis + '\n\n' : '';
       text += state.kesimpulan.saranLanjutan ? state.kesimpulan.saranLanjutan + '\n\n' : '';
    } else {
      Object.values(section.data).forEach(val => {
        if (typeof val === 'string' && val.trim()) text += val + '\n\n';
      });
    }
  });
  
  text += '\nDAFTAR PUSTAKA\n';
  text += '-'.repeat(14) + '\n';
  state.bibliography.forEach(bib => {
    if (bib.penulis || bib.judul) {
      text += `${bib.penulis || ''}. (${bib.tahun || ''}). ${bib.judul || ''}. ${bib.penerbit || ''}. hlm. ${bib.hal || ''}.\n`;
    }
  });
  
  if (state.lampiran.length) {
    text += '\nLAMPIRAN\n';
    text += '-'.repeat(8) + '\n';
    state.lampiran.forEach(f => text += `- ${f.name}\n`);
  }
  
  return text;
}

export function exportAsMD(state: JournalState): string {
  let md = '';
  const title = state.title || 'Judul Penelitian';
  
  md += `# ${title}\n\n`;
  
  if (state.keywords.length) {
    md += `**Kata Kunci:** ${state.keywords.join('; ')}\n\n`;
  }
  
  md += `## Abstrak\n\n`;
  const absValues = Object.values(state.abstract).filter(v => v.trim());
  if (absValues.length) md += absValues.join('\n\n') + '\n\n';
  
  const sections = [
    { name: 'Pendahuluan', data: state.pendahuluan },
    { name: 'Tinjauan Pustaka / Landasan Teori', data: state.pustaka },
    { name: 'Metodologi Penelitian', data: state.metodologi },
  ];
  
  sections.forEach(section => {
    md += `## ${section.name}\n\n`;
    Object.values(section.data).forEach(val => {
      if (typeof val === 'string' && val.trim()) md += val + '\n\n';
    });
  });

  md += `## Hasil Penelitian\n\n`;
  if (state.hasil.gambaran) md += state.hasil.gambaran + '\n\n';
  state.hasil.temas.forEach(t => { if(t.value) md += t.value + '\n\n'; });
  if (state.hasil.pendukung) md += state.hasil.pendukung + '\n\n';
  if (state.hasil.hubungan) md += state.hasil.hubungan + '\n\n';

  md += `## Pembahasan\n\n`;
  Object.values(state.pembahasan).forEach(val => {
    if (val.trim()) md += val + '\n\n';
  });

  md += `## Kesimpulan dan Saran\n\n`;
  if (state.kesimpulan.umum) md += state.kesimpulan.umum + '\n\n';
  state.kesimpulan.rumusan.forEach(t => { if(t.value) md += t.value + '\n\n'; });
  if (state.kesimpulan.saranPraktis) md += state.kesimpulan.saranPraktis + '\n\n';
  if (state.kesimpulan.saranLanjutan) md += state.kesimpulan.saranLanjutan + '\n\n';
  
  md += `## Daftar Pustaka\n\n`;
  state.bibliography.forEach(bib => {
    if (bib.penulis || bib.judul) {
      md += `${bib.penulis || ''}. (${bib.tahun || ''}). *${bib.judul || ''}*. ${bib.penerbit || ''}. hlm. ${bib.hal || ''}.\n\n`;
    }
  });
  
  if (state.lampiran.length) {
    md += `## Lampiran\n\n`;
    state.lampiran.forEach(f => md += `- ${f.name}\n`);
  }
  
  return md;
}

export function exportAsHTML(state: JournalState, htmlPreviewContent: string): string {
  const title = state.title || 'Research Builder';
  return `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body { font-family: Georgia, serif; max-width: 800px; margin: 2rem auto; padding: 2rem; line-height: 1.7; color: #1a1a1a; }
        .paper-title { font-size: 1.5rem; font-weight: bold; text-align: center; margin-bottom: 1.5rem; }
        .paper-abstract-label { font-weight: bold; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; color: #666; margin-bottom: 0.5rem; }
        .paper-abstract-content { font-size: 0.9375rem; line-height: 1.7; color: #444; text-align: justify; }
        .paper-keywords { margin-bottom: 2rem; padding-bottom: 1rem; border-bottom: 1px solid #ddd; }
        .paper-keywords-label { font-weight: bold; font-size: 0.875rem; color: #666; }
        .paper-keywords-content { font-style: italic; }
        .paper-section { margin-bottom: 2rem; }
        .paper-section-title { font-size: 1.125rem; font-weight: bold; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #2563eb; }
        .paper-subsection { margin-bottom: 1rem; }
        .paper-subsection-title { font-size: 1rem; font-weight: bold; margin-bottom: 0.5rem; }
        .paper-content { font-size: 0.9375rem; line-height: 1.7; color: #444; text-align: justify; white-space: pre-wrap; }
        @media print { body { margin: 0; padding: 1rem; } }
    </style>
</head>
<body>
${htmlPreviewContent}
</body>
</html>`;
}
