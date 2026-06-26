import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prediction } = await request.json();

    if (!prediction) {
      return NextResponse.json(
        { error: 'Prediction parameter is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY is not configured in the environment' },
        { status: 500 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `Anda adalah asisten AI medis untuk memberikan penjelasan edukasi sekunder terkait hasil MRI.
Sebuah sistem CNN (Convolutional Neural Network) baru saja memprediksi gambar MRI otak pengguna dengan hasil: "${prediction}".

Berikan penjelasan singkat dan profesional mengenai:
1. Apa itu ${prediction} (dalam konteks tumor otak/jaringan sehat).
2. Langkah-langkah atau edukasi singkat apa yang sebaiknya dipertimbangkan.

SANGAT PENTING:
- Gunakan bahasa Indonesia yang profesional, menenangkan, dan klinis.
- Selalu tambahkan catatan dengan tegas di bagian akhir bahwa hasil AI ini BUKAN diagnosis medis resmi dan pasien WAJIB berkonsultasi dengan dokter Spesialis Saraf atau Bedah Saraf untuk evaluasi klinis lanjutan.
- Pastikan jawaban ringkas, maksimal 2-3 paragraf.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return NextResponse.json({ suggestion: response.text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    return NextResponse.json(
      { error: `Failed to fetch suggestion from AI. Error: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}
