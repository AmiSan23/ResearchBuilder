export const ABSTRACT_FIELDS = [
  { key: 'latar', label: 'Latar Belakang Masalah', tooltip: 'Deskripsi singkat konteks masalah', placeholder: 'Latar belakang masalah...' },
  { key: 'tujuan', label: 'Tujuan Penelitian', tooltip: 'Tujuan utama penelitian ini', placeholder: 'Tujuan penelitian...' },
  { key: 'metode', label: 'Metodologi', tooltip: 'Pendekatan dan metode yang digunakan', placeholder: 'Metodologi penelitian...' },
  { key: 'sampel', label: 'Sampel / Populasi', tooltip: 'Deskripsi sampel atau populasi penelitian', placeholder: 'Sampel / populasi...' },
  { key: 'data', label: 'Pengumpulan Data', tooltip: 'Teknik pengumpulan data', placeholder: 'Pengumpulan data...' },
  { key: 'keabsahan', label: 'Teknik Keabsahan Data', tooltip: 'Cara memastikan keabsahan data', placeholder: 'Teknik keabsahan data...' },
  { key: 'variabel', label: 'Variabel yang Diteliti', tooltip: 'Variabel-variabel dalam penelitian', placeholder: 'Variabel yang diteliti...' },
  { key: 'subjek', label: 'Subjek Penelitian', tooltip: 'Subjek yang diteliti', placeholder: 'Subjek penelitian...' },
  { key: 'tempat', label: 'Tempat Penelitian', tooltip: 'Lokasi penelitian dilaksanakan', placeholder: 'Tempat penelitian...' },
  { key: 'periode', label: 'Periode Penelitian', tooltip: 'Waktu pelaksanaan penelitian', placeholder: 'Periode penelitian...' },
  { key: 'hasil', label: 'Hasil Penelitian', tooltip: 'Hasil utama penelitian', placeholder: 'Hasil penelitian...' },
  { key: 'temuan', label: 'Temuan Penelitian', tooltip: 'Temuan penting dari penelitian', placeholder: 'Temuan penelitian...' },
  { key: 'kesimpulan', label: 'Kesimpulan', tooltip: 'Kesimpulan utama penelitian', placeholder: 'Kesimpulan...' },
  { key: 'saran', label: 'Saran / Rekomendasi', tooltip: 'Saran berdasarkan temuan', placeholder: 'Saran / rekomendasi...' },
  { key: 'implikasi', label: 'Implikasi / Manfaat', tooltip: 'Manfaat dan implikasi penelitian', placeholder: 'Implikasi / manfaat...' },
] as const;

export const PENDAHULUAN_FIELDS = [
  { key: 'latar', label: '1. Latar Belakang Masalah', tooltip: 'Jelaskan konteks dan urgensi masalah', placeholder: 'Latar belakang masalah...' },
  { key: 'rumusan', label: '2. Rumusan Masalah', tooltip: 'Pertanyaan penelitian yang akan dijawab', placeholder: 'Rumusan masalah...' },
  { key: 'tujuan', label: '3. Tujuan Penelitian', tooltip: 'Tujuan yang ingin dicapai', placeholder: 'Tujuan penelitian...' },
  { key: 'manfaat', label: '4. Manfaat Penelitian', tooltip: 'Manfaat teoritis dan praktis', placeholder: 'Manfaat penelitian...' },
  { key: 'ruanglingkup', label: '5. Ruang Lingkup dan Batasan', tooltip: 'Batasan-batasan penelitian', placeholder: 'Ruang lingkup dan batasan...' },
  { key: 'sistematika', label: '6. Sistematika Penulisan', tooltip: 'Struktur penulisan jurnal', placeholder: 'Sistematika penulisan...' },
] as const;

export const PUSTAKA_FIELDS_PART_1 = [
  { key: 'konsep', label: '1. Konsep / Definisi Dasar', tooltip: 'Definisi konsep-konsep kunci', placeholder: 'Konsep / definisi dasar...' },
  { key: 'teori', label: '2. Teori yang Relevan', tooltip: 'Teori-teori pendukung penelitian', placeholder: 'Teori yang relevan...' },
  { key: 'terdahulu', label: '3. Kajian Terdahulu', tooltip: 'Penelitian-penelitian sebelumnya yang relevan', placeholder: 'Kajian terdahulu...' },
] as const;

export const METODOLOGI_FIELDS = [
  { key: 'jenis', label: '1. Jenis dan Pendekatan Penelitian', placeholder: 'Jenis dan pendekatan...' },
  { key: 'lokasi', label: '2. Lokasi dan Waktu Penelitian', placeholder: 'Lokasi dan waktu...' },
  { key: 'subjek', label: '3. Subjek / Informan Penelitian', placeholder: 'Subjek / informan...' },
  { key: 'pengumpulan', label: '4. Teknik Pengumpulan Data', placeholder: 'Teknik pengumpulan data...' },
  { key: 'analisis', label: '5. Teknik Analisis Data', placeholder: 'Teknik analisis data...' },
  { key: 'keabsahan', label: '6. Teknik Keabsahan', placeholder: 'Teknik keabsahan...' },
  { key: 'etika', label: '7. Etika Penelitian', placeholder: 'Etika penelitian...' },
] as const;

export const PEMBAHASAN_FIELDS = [
  { key: 'interpretasi', label: '1. Interpretasi Temuan Utama', placeholder: 'Interpretasi temuan utama...' },
  { key: 'perbandingan', label: '2. Perbandingan Kajian Terdahulu', placeholder: 'Perbandingan dengan kajian terdahulu...' },
  { key: 'teori', label: '3. Penjelasan dengan Landasan Teori', placeholder: 'Penjelasan dengan teori...' },
  { key: 'faktor', label: '4. Faktor Penghambat dan Pendukung', placeholder: 'Faktor penghambat dan pendukung...' },
  { key: 'implikasi', label: '5. Implikasi Temuan', placeholder: 'Implikasi temuan...' },
  { key: 'keterbatasan', label: '6. Keterbatasan Penelitian', placeholder: 'Keterbatasan penelitian...' },
] as const;
