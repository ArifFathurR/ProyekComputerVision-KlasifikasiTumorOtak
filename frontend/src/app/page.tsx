"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, Target, ShieldAlert, ImageIcon } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function Home() {
  // Animasi variants untuk fade in saat di-scroll
  const fadeUpVariant: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col gap-12 pb-12 overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-6 pt-20 pb-12">

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-primary/20 p-5 rounded-full mb-4 shadow-[0_0_40px_rgba(var(--primary),0.5)]"
        >
          <Brain className="w-20 h-20 text-primary animate-pulse" />
        </motion.div>
        
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground drop-shadow-lg"
        >
          Sistem Deteksi Dini <br className="hidden sm:block" />
          <span className="text-primary">Tumor Otak</span>
        </motion.h1>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-[700px] text-lg font-medium text-foreground/80 sm:text-xl drop-shadow-md"
        >
          Platform pintar berbasis Deep Learning (CNN) untuk membantu menganalisis dan mendeteksi berbagai jenis tumor otak dari citra X-Ray/MRI dengan cepat dan akurat.
        </motion.p>
      </section>

      {/* Info Section: Apa itu Tumor Otak */}
      <section className="space-y-6 bg-muted/30 p-8 rounded-2xl border shadow-sm max-w-6xl mx-auto w-full">
        <motion.h2 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
          className="text-3xl font-bold tracking-tight"
        >
          Apa Itu Tumor Otak?
        </motion.h2>
        <motion.p 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          Tumor otak adalah pertumbuhan sel abnormal di dalam atau di sekitar otak. Pertumbuhan sel ini dapat bersifat jinak (non-kanker) atau ganas (kanker). Tumor ini dapat berasal langsung dari jaringan otak (tumor otak primer) atau merupakan penyebaran dari kanker di bagian tubuh lain (tumor otak sekunder/metastasis).
        </motion.p>
        
        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={fadeUpVariant}>
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
              <CardHeader className="pb-2">
                <Activity className="w-8 h-8 text-blue-500 mb-2" />
                <CardTitle className="text-xl">Gejala Umum</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Sakit kepala yang memburuk di pagi hari</li>
                  <li>Mual dan muntah tanpa sebab</li>
                  <li>Perubahan penglihatan, pendengaran, atau bicara</li>
                  <li>Masalah keseimbangan dan kesulitan berjalan</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeUpVariant}>
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
              <CardHeader className="pb-2">
                <ShieldAlert className="w-8 h-8 text-orange-500 mb-2" />
                <CardTitle className="text-xl">Faktor Risiko</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Paparan radiasi (seperti terapi radiasi sebelumnya)</li>
                  <li>Riwayat keluarga dengan tumor otak</li>
                  <li>Kondisi genetik bawaan tertentu</li>
                  <li>Sistem imun yang melemah</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeUpVariant} className="md:col-span-2 lg:col-span-1">
            <Card className="transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
              <CardHeader className="pb-2">
                <Target className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle className="text-xl">Deteksi Dini</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mendiagnosis tumor otak secara dini sangat krusial. Teknologi AI dan Machine Learning (seperti CNN) membantu dokter radiologi untuk menganalisis pemindaian MRI dengan lebih detail, mengurangi risiko human-error.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Tipe Kanker Otak Berdasarkan Model */}
      <section className="space-y-8 pt-6 pb-10 max-w-6xl mx-auto w-full">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
          className="text-center space-y-2"
        >
          <h2 className="text-3xl font-bold tracking-tight">Jenis Klasifikasi Model AI Kami</h2>
          <p className="text-muted-foreground">
            Sistem kami dilatih untuk mendeteksi 4 kategori citra MRI otak berikut:
          </p>
        </motion.div>
        
        <motion.div 
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <motion.div variants={fadeUpVariant}>
            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
              <CardHeader>
                <CardTitle>Glioma</CardTitle>
                <CardDescription>Tumor Primer</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tumor yang berasal dari sel glial (sel pendukung saraf di otak). Bisa tumbuh perlahan atau sangat agresif.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeUpVariant}>
            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
              <CardHeader>
                <CardTitle>Meningioma</CardTitle>
                <CardDescription>Tumor Selaput Otak</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tumor yang terbentuk di meninges (selaput yang menutupi otak dan sumsum tulang belakang). Umumnya bersifat jinak.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeUpVariant}>
            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 h-full">
              <CardHeader>
                <CardTitle>Pituitary</CardTitle>
                <CardDescription>Tumor Kelenjar Hipofisis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Tumor yang berkembang di kelenjar pituitari (kelenjar kecil di dasar otak). Sering kali mengganggu produksi hormon.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          
          <motion.div variants={fadeUpVariant}>
            <Card className="hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-green-500/20 bg-green-500/5 h-full">
              <CardHeader>
                <CardTitle className="text-green-600 dark:text-green-500">No Tumor</CardTitle>
                <CardDescription>Jaringan Otak Sehat</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Citra MRI yang menunjukkan tidak adanya indikasi pertumbuhan sel tumor atau anomali jaringan kanker.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </section>

      {/* Galeri Citra & Ciri-Ciri Tumor */}
      <section className="space-y-8 pt-6 pb-10 max-w-6xl mx-auto w-full px-4 sm:px-0">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUpVariant}
          className="flex flex-col items-center justify-center text-center space-y-2 mb-10"
        >
          <div className="bg-primary/10 p-3 rounded-full mb-2">
            <ImageIcon className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Karakteristik Visual Citra MRI</h2>
          <p className="text-muted-foreground max-w-2xl">
            Di bawah ini adalah contoh representasi visual dari dataset yang kami gunakan untuk melatih AI mengenali berbagai pola tumor.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Glioma */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-black/90">
              <Image 
                src="/sample_glioma.jpg" 
                alt="Contoh Glioma" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="p-6 w-full md:w-3/5 space-y-3">
              <h3 className="text-xl font-bold text-primary">Glioma</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Ciri Visual:</strong> Biasanya terlihat sebagai massa dengan tepi yang tidak beraturan (irregular borders). Tumor ini sering kali tidak memiliki batas yang tegas dengan jaringan otak sehat di sekitarnya karena sifat infiltratifnya. Area nekrosis (jaringan mati) sering terlihat di bagian tengah pada tingkat lanjut.
              </p>
            </div>
          </motion.div>

          {/* Meningioma */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-black/90">
              <Image 
                src="/sample_meningioma.jpg" 
                alt="Contoh Meningioma" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="p-6 w-full md:w-3/5 space-y-3">
              <h3 className="text-xl font-bold text-primary">Meningioma</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Ciri Visual:</strong> Muncul di area permukaan otak (meninges) dan tumbuh menekan ke dalam. Tepi tumor biasanya berbatas sangat tegas dan membulat (well-circumscribed). Sering disertai dengan "dural tail sign" (penebalan selaput otak di sekitar tumor) yang sangat khas.
              </p>
            </div>
          </motion.div>

          {/* Pituitary */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-black/90">
              <Image 
                src="/sample_pituitary.jpg" 
                alt="Contoh Pituitary" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="p-6 w-full md:w-3/5 space-y-3">
              <h3 className="text-xl font-bold text-primary">Pituitary</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Ciri Visual:</strong> Terletak secara sentral di dasar tengkorak (area sella turcica). Tumor ini sering berbentuk seperti angka delapan ("snowman sign") karena pertumbuhannya yang terjepit oleh anatomi tulang dan selaput saraf mata di sekitarnya.
              </p>
            </div>
          </motion.div>

          {/* No Tumor */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUpVariant}
            className="flex flex-col md:flex-row bg-card border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border-green-500/20"
          >
            <div className="w-full md:w-2/5 h-48 md:h-auto relative bg-black/90">
              <Image 
                src="/sample_notumor.jpg" 
                alt="Contoh Normal" 
                fill 
                className="object-contain"
              />
            </div>
            <div className="p-6 w-full md:w-3/5 space-y-3">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-500">Normal (No Tumor)</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Ciri Visual:</strong> Struktur otak tampak simetris tanpa adanya massa asing (lesi). Ventrikel (ruang cairan di dalam otak) terlihat normal ukurannya, garis tengah otak sejajar di tengah, dan batas antar lobus terlihat wajar.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
