"use client";

import { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UploadCloud, Loader2, AlertCircle, CheckCircle2, Info, ShieldAlert, Sparkles, BrainCircuit } from "lucide-react";

const CLASS_NAMES = ["glioma", "meningioma", "notumor", "pituitary"];

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

  // Model & Image Refs
  const [model, setModel] = useState<tf.LayersModel | tf.GraphModel | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  // Gemini State
  const [geminiAdvice, setGeminiAdvice] = useState<string | null>(null);
  const [isGeminiLoading, setIsGeminiLoading] = useState(false);

  // Load Model on Mount
  useEffect(() => {
    const loadModel = async () => {
      setIsModelLoading(true);
      try {
        // Load the converted TF.js model from public folder
        const loadedModel = await tf.loadGraphModel("/tfjs_model/model.json");
        setModel(loadedModel);
        // Warmup the model
        const warmupResult = loadedModel.predict(tf.zeros([1, 150, 150, 3])) as tf.Tensor;
        warmupResult.dataSync();
        warmupResult.dispose();
      } catch (e) {
        console.error("Failed to load model:", e);
        setError("Gagal memuat model AI. Pastikan file model.json tersedia di public/tfjs_model.");
      } finally {
        setIsModelLoading(false);
      }
    };
    loadModel();
  }, []);

  const fetchGeminiAdvice = async (prediction: string) => {
    setIsGeminiLoading(true);
    setGeminiAdvice(null);
    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prediction }),
      });
      const data = await res.json();
      if (res.ok) {
        setGeminiAdvice(data.suggestion);
      } else {
        setGeminiAdvice("Gagal memuat opini AI: " + (data.error || "Server error"));
      }
    } catch (e) {
      setGeminiAdvice("Koneksi ke asisten AI terputus.");
    } finally {
      setIsGeminiLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleKlasifikasi = async () => {
    if (!selectedFile || !imageRef.current || !model) {
      setError("Silakan unggah gambar MRI dan pastikan model AI telah dimuat.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Simulate slight delay for UI feedback
      await new Promise(r => setTimeout(r, 500));

      // TFJS Browser Inference
      // 1. Read image to tensor and convert to float
      let tensor = tf.browser.fromPixels(imageRef.current).toFloat();

      // 2. Resize to 150x150
      tensor = tf.image.resizeBilinear(tensor, [150, 150]);

      // 3. Normalisasi manual ke rentang [-1, 1] karena layer Rescaling hilang saat konversi ke TFJS GraphModel
      tensor = tensor.div(tf.scalar(127.5)).sub(tf.scalar(1));

      // 4. Expand dims to match batch size: [1, 150, 150, 3]
      const inputTensor = tensor.expandDims(0);

      // 4. Predict
      const predictionsTensor = model.predict(inputTensor) as tf.Tensor;
      const predictions = await predictionsTensor.data();

      // Memory management
      tensor.dispose();
      inputTensor.dispose();
      predictionsTensor.dispose();

      // Find max class
      const maxIndex = predictions.indexOf(Math.max(...Array.from(predictions)));
      const predictedClassName = CLASS_NAMES[maxIndex];
      const confidence = predictions[maxIndex];

      const allScores: Record<string, number> = {};
      CLASS_NAMES.forEach((name, i) => {
        allScores[name] = predictions[i];
      });

      const data = {
        status: "success",
        prediction: predictedClassName,
        confidence: `${(confidence * 100).toFixed(2)}%`,
        all_scores: allScores
      };

      setResult(data);
      setIsModalOpen(true);

      // Fetch Gemini
      fetchGeminiAdvice(data.prediction);

    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat memproses gambar dengan AI (Client-side error).");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setGeminiAdvice(null);
  };

  return (
    <div className="max-w-5xl mx-auto py-12 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analisis MRI</h1>
        <p className="text-muted-foreground mt-2">
          Sistem Client-Side Inference. Proses pendeteksian dilakukan 100% di perangkat Anda.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-6 md:col-span-1">
          {/* Status Model */}
          <Card className={`${isModelLoading ? "bg-amber-500/10 border-amber-500/20" : "bg-green-500/10 border-green-500/20"}`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <BrainCircuit className={`w-5 h-5 mr-2 ${isModelLoading ? "text-amber-500 animate-pulse" : "text-green-500"}`} />
                Status AI Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {isModelLoading ? (
                <span className="flex items-center text-amber-600 dark:text-amber-400">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengunduh Model AI (±13MB)...
                </span>
              ) : (
                <span className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle2 className="w-4 h-4 mr-2" /> Model Siap Digunakan
                </span>
              )}
            </CardContent>
          </Card>

          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <Info className="w-5 h-5 mr-2 text-primary" />
                Cara Penggunaan
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-4">
              <ol className="list-decimal pl-4 space-y-2">
                <li>Siapkan file citra MRI otak berformat gambar (seperti <span className="font-semibold text-foreground">.jpg</span> atau <span className="font-semibold text-foreground">.png</span>).</li>
                <li>Klik area <span className="font-semibold text-foreground">"Pilih Gambar"</span> atau seret file Anda ke kotak unggahan.</li>
                <li>Pastikan gambar yang muncul di area pratinjau (preview) sudah benar dan jelas.</li>
                <li>Tekan tombol <span className="font-semibold text-foreground">"Klasifikasi"</span> untuk mengirim gambar ke AI.</li>
                <li>Tunggu beberapa saat hingga modal hasil prediksi dan saran Gemini AI muncul.</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-green-500" />
                Privasi 100% Terjamin
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Sistem ini menggunakan arsitektur <strong>Client-Side Inference (TensorFlow.js)</strong>. Citra MRI yang Anda unggah <strong>tidak pernah dikirim ke server mana pun</strong>. Semua analisis dilakukan secara lokal di perangkat yang Anda gunakan saat ini.
            </CardContent>
          </Card>
        </div>

        {/* Kolom Utama: Upload & Proses */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Area Pindai Citra</CardTitle>
              <CardDescription>
                Sistem AI kami dilatih untuk mendeteksi: Glioma, Meningioma, Pituitary, dan Otak Normal (No Tumor).
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
                  disabled={isLoading || isModelLoading}
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
                    ref={imageRef}
                    src={previewUrl}
                    alt="Preview MRI"
                    className="max-w-full max-h-[400px] object-contain rounded-md shadow-sm"
                    crossOrigin="anonymous"
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
              <Button onClick={handleKlasifikasi} disabled={!selectedFile || isLoading || isModelLoading} className="w-32">
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
        </div>
      </div>

      {/* Modal Hasil Klasifikasi */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <CheckCircle2 className="w-6 h-6 mr-2 text-green-500" />
              Hasil Analisis & Opini AI
            </DialogTitle>
            <DialogDescription>
              Laporan komprehensif dari Neural Network dan analisis sekunder Gemini AI.
            </DialogDescription>
          </DialogHeader>

          {result && (
            <div className="space-y-4 py-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-primary/5 p-4 rounded-lg border flex flex-col items-center justify-center text-center space-y-2 h-full">
                  <p className="text-sm font-medium text-muted-foreground">Prediksi Kelas CNN:</p>
                  <h3 className="text-3xl font-bold uppercase tracking-wider text-primary">
                    {result.prediction}
                  </h3>
                  <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    Confidence: {result.confidence}
                  </div>
                </div>

                <div className="space-y-2 border p-4 rounded-lg bg-card">
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

              {/* Integrasi Gemini */}
              <div className="mt-6 border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/20 rounded-xl p-5 shadow-sm">
                <div className="flex items-center mb-3 font-semibold text-indigo-700 dark:text-indigo-400">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Insight Klinis dari Gemini AI
                </div>

                {isGeminiLoading ? (
                  <div className="flex flex-col items-center justify-center py-6 space-y-3">
                    <Loader2 className="w-6 h-6 animate-spin text-indigo-500" />
                    <span className="text-sm text-muted-foreground animate-pulse">Menyusun konteks edukasi dan saran medis...</span>
                  </div>
                ) : (
                  <div className="text-sm text-foreground/90 leading-relaxed space-y-3">
                    {geminiAdvice ? (
                      geminiAdvice.split('\n').map((line, i) => {
                        if (!line.trim()) return null;

                        const parts = line.split(/(\*\*.*?\*\*)/g);

                        return (
                          <p key={i}>
                            {parts.map((part, j) => {
                              if (part.startsWith('**') && part.endsWith('**')) {
                                return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
                              }
                              return part;
                            })}
                          </p>
                        );
                      })
                    ) : (
                      <p className="text-destructive flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Gagal mendapatkan insight dari AI.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-2 border-t mt-2">
            <Button onClick={() => setIsModalOpen(false)}>Tutup</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
