import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Activity, Target, ShieldAlert } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center space-y-6 pt-12 pb-8">
        <div className="bg-primary/10 p-4 rounded-full mb-4">
          <Brain className="w-16 h-16 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
          Sistem Deteksi Dini <br className="hidden sm:block" />
          <span className="text-primary">Tumor Otak</span>
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Platform pintar berbasis Deep Learning (CNN) untuk membantu menganalisis dan mendeteksi berbagai jenis tumor otak dari citra X-Ray/MRI dengan cepat dan akurat.
        </p>
      </section>

      {/* Info Section: Apa itu Tumor Otak */}
      <section className="space-y-6 bg-muted/50 p-8 rounded-2xl border">
        <h2 className="text-3xl font-bold tracking-tight">Apa Itu Tumor Otak?</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Tumor otak adalah pertumbuhan sel abnormal di dalam atau di sekitar otak. Pertumbuhan sel ini dapat bersifat jinak (non-kanker) atau ganas (kanker). Tumor ini dapat berasal langsung dari jaringan otak (tumor otak primer) atau merupakan penyebaran dari kanker di bagian tubuh lain (tumor otak sekunder/metastasis).
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
          <Card>
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
          <Card>
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
          <Card className="md:col-span-2 lg:col-span-1">
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
        </div>
      </section>

      {/* Tipe Kanker Otak Berdasarkan Model */}
      <section className="space-y-8 pt-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Jenis Klasifikasi Model AI Kami</h2>
          <p className="text-muted-foreground">
            Sistem kami dilatih untuk mendeteksi 4 kategori citra MRI otak berikut:
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="hover:border-primary/50 transition-colors">
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
          <Card className="hover:border-primary/50 transition-colors">
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
          <Card className="hover:border-primary/50 transition-colors">
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
          <Card className="hover:border-primary/50 transition-colors border-green-500/20 bg-green-500/5">
            <CardHeader>
              <CardTitle className="text-green-600 dark:text-green-400">No Tumor</CardTitle>
              <CardDescription>Jaringan Otak Sehat</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Citra MRI yang menunjukkan tidak adanya indikasi pertumbuhan sel tumor atau anomali jaringan kanker.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
