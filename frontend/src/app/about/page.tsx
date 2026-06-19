import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, BrainCircuit } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 space-y-8">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Tentang Proyek</h1>
        <p className="text-lg text-muted-foreground">
          NeuroVision diciptakan untuk mempermudah identifikasi jenis tumor otak menggunakan bantuan kecerdasan buatan.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <BrainCircuit className="w-6 h-6 mr-2 text-primary" />
            Latar Belakang
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Diagnosis dini dan akurat dari tumor otak sangat penting dalam menentukan rencana pengobatan pasien. Proses analisis manual citra MRI oleh ahli radiologi terkadang memakan waktu yang lama dan rentan terhadap *human error* karena kompleksitas struktur otak manusia.
          </p>
          <p>
            Oleh karena itu, proyek ini memanfaatkan <strong>Convolutional Neural Network (CNN)</strong>—sebuah arsitektur Deep Learning yang sangat handal dalam mendeteksi pola pada gambar—untuk membantu dokter dalam memberikan tebakan (*second opinion*) secara instan.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Code2 className="w-6 h-6 mr-2 text-primary" />
            Teknologi yang Digunakan
          </CardTitle>
          <CardDescription>Tech Stack di balik layar NeuroVision</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2 border rounded-lg p-4 bg-muted/20">
              <h3 className="font-semibold text-lg">Frontend</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Next.js (App Router)</li>
                <li>React 19</li>
                <li>Tailwind CSS</li>
                <li>Shadcn UI</li>
                <li>Lucide Icons</li>
              </ul>
            </div>
            <div className="space-y-2 border rounded-lg p-4 bg-muted/20">
              <h3 className="font-semibold text-lg">Backend API & AI</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Python 3.13</li>
                <li>Flask & Flask-CORS</li>
                <li>TensorFlow / Keras</li>
                <li>NumPy & Pillow</li>
                <li>Model CNN (H5)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center pt-8">
        {/* <a 
          href="#" 
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <Github className="w-4 h-4 mr-2" />
          Lihat Source Code di GitHub
        </a> */}
      </div>
    </div>
  );
}
