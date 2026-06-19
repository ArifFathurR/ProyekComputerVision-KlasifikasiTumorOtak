"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadCloud, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function KlasifikasiPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    prediction: string;
    confidence: string;
    all_scores: Record<string, number>;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Buat URL untuk preview gambar
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleKlasifikasi = async () => {
    if (!selectedFile) {
      setError("Silakan unggah gambar terlebih dahulu.");
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:8080/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        setResult(data);
        setIsModalOpen(true);
      } else {
        setError(data.message || "Terjadi kesalahan pada server.");
      }
    } catch (err) {
      console.error(err);
      setError("Gagal terhubung ke server API. Pastikan server Flask sedang berjalan di port 8080.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Klasifikasi Tumor Otak</CardTitle>
          <CardDescription>
            Unggah citra MRI (Magnetic Resonance Imaging) otak pasien untuk dianalisis oleh AI.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="image">Pilih Gambar X-Ray / MRI</Label>
            <Input 
              id="image" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              disabled={isLoading}
            />
            {error && (
              <p className="text-sm text-destructive flex items-center mt-2">
                <AlertCircle className="w-4 h-4 mr-1" /> {error}
              </p>
            )}
          </div>

          {previewUrl && (
            <div className="border rounded-lg p-2 bg-muted/20 flex flex-col items-center justify-center min-h-[300px]">
              <p className="text-xs text-muted-foreground mb-2 w-full text-left">Preview Citra:</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={previewUrl} 
                alt="Preview MRI" 
                className="max-w-full max-h-[400px] object-contain rounded-md shadow-sm"
              />
            </div>
          )}

          {!previewUrl && (
            <div className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center h-48 bg-muted/10 text-muted-foreground">
              <UploadCloud className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm">Belum ada gambar yang dipilih</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={resetForm} disabled={!selectedFile || isLoading}>
            Reset
          </Button>
          <Button onClick={handleKlasifikasi} disabled={!selectedFile || isLoading} className="w-32">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Proses...
              </>
            ) : (
              "Klasifikasi"
            )}
          </Button>
        </CardFooter>
      </Card>

      {/* Modal Hasil Klasifikasi */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <CheckCircle2 className="w-6 h-6 mr-2 text-green-500" /> 
              Hasil Analisis
            </DialogTitle>
            <DialogDescription>
              Model AI telah selesai memproses citra MRI. Berikut adalah hasil prediksinya:
            </DialogDescription>
          </DialogHeader>
          
          {result && (
            <div className="space-y-4 py-4">
              <div className="bg-primary/5 p-4 rounded-lg border flex flex-col items-center justify-center text-center space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Prediksi Kelas:</p>
                <h3 className="text-3xl font-bold uppercase tracking-wider text-primary">
                  {result.prediction}
                </h3>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                  Confidence: {result.confidence}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground">Detail Skor Probabilitas:</Label>
                <div className="space-y-2">
                  {Object.entries(result.all_scores)
                    .sort(([, a], [, b]) => b - a)
                    .map(([className, score]) => (
                    <div key={className} className="flex flex-col gap-1 text-sm">
                      <div className="flex justify-between">
                        <span className="capitalize">{className}</span>
                        <span>{(score * 100).toFixed(2)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${className === result.prediction ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                          style={{ width: `${score * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end pt-4">
            <Button onClick={() => setIsModalOpen(false)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
