export type DynamicItem = {
  id: string;
  value: string;
};

export type BibliographyItem = {
  id: string;
  penulis: string;
  tahun: string;
  judul: string;
  penerbit: string;
  hal: string;
  link: string;
};

export type LampiranItem = {
  id: string;
  name: string;
  file?: File;
};

export type JournalState = {
  title: string;
  titleTags: string[];
  abstract: {
    latar: string;
    tujuan: string;
    metode: string;
    sampel: string;
    data: string;
    keabsahan: string;
    variabel: string;
    subjek: string;
    tempat: string;
    periode: string;
    hasil: string;
    temuan: string;
    kesimpulan: string;
    saran: string;
    implikasi: string;
  };
  keywords: string[];
  pendahuluan: {
    latar: string;
    rumusan: string;
    tujuan: string;
    manfaat: string;
    ruanglingkup: string;
    sistematika: string;
  };
  pustaka: {
    konsep: string;
    teori: string;
    terdahulu: string;
    kerangkaPenjelasan: string;
    hipotesis: string;
  };
  frameworkImage: string | null;
  metodologi: {
    jenis: string;
    lokasi: string;
    subjek: string;
    pengumpulan: string;
    analisis: string;
    keabsahan: string;
    etika: string;
  };
  hasil: {
    gambaran: string;
    temas: DynamicItem[];
    pendukung: string;
    hubungan: string;
  };
  pembahasan: {
    interpretasi: string;
    perbandingan: string;
    teori: string;
    faktor: string;
    implikasi: string;
    keterbatasan: string;
  };
  kesimpulan: {
    umum: string;
    rumusan: DynamicItem[];
    saranPraktis: string;
    saranLanjutan: string;
  };
  bibliography: BibliographyItem[];
  lampiran: LampiranItem[];
};

export const INITIAL_STATE: JournalState = {
  title: "",
  titleTags: ["Metode", "Variabel", "Objek Masalah"],
  abstract: {
    latar: "", tujuan: "", metode: "", sampel: "", data: "",
    keabsahan: "", variabel: "", subjek: "", tempat: "",
    periode: "", hasil: "", temuan: "", kesimpulan: "",
    saran: "", implikasi: ""
  },
  keywords: [],
  pendahuluan: { latar: "", rumusan: "", tujuan: "", manfaat: "", ruanglingkup: "", sistematika: "" },
  pustaka: { konsep: "", teori: "", terdahulu: "", kerangkaPenjelasan: "", hipotesis: "" },
  frameworkImage: null,
  metodologi: { jenis: "", lokasi: "", subjek: "", pengumpulan: "", analisis: "", keabsahan: "", etika: "" },
  hasil: { gambaran: "", temas: [], pendukung: "", hubungan: "" },
  pembahasan: { interpretasi: "", perbandingan: "", teori: "", faktor: "", implikasi: "", keterbatasan: "" },
  kesimpulan: { umum: "", rumusan: [], saranPraktis: "", saranLanjutan: "" },
  bibliography: [],
  lampiran: [],
};
