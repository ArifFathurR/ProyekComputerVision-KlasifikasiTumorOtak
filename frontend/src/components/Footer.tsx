import Link from "next/link";
import { Mail, Heart } from "lucide-react";

// Custom SVGs for Brands since Lucide removed them
const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/20 mt-12 w-full">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Kolom Kiri: Informasi Sistem */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1">
          <h3 className="font-semibold text-lg text-foreground">NeuroVision AI</h3>
          <p className="text-sm text-muted-foreground">
            Platform Deteksi Dini Tumor Otak Berbasis Deep Learning.
          </p>
          <p className="text-xs text-muted-foreground mt-2 flex items-center">
            &copy; {currentYear} NeuroVision. 2026
          </p>
        </div>

        {/* Kolom Kanan: Pengembang & Sosial */}
        <div className="flex flex-col items-center md:items-end space-y-3">
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-foreground">Pengembang:</p>
            <p className="text-sm text-primary font-bold">Arif Fathur Rahman</p>
            <a 
              href="mailto:arif22ti@mahasiswa.pcr.ac.id" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center justify-center md:justify-end mt-1"
            >
              <Mail className="w-3 h-3 mr-1" />
              arif22ti@mahasiswa.pcr.ac.id
            </a>
          </div>
          
          <div className="flex space-x-4 pt-1">
            <Link 
              href="https://github.com/ArifFathurR" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background border shadow-sm hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-background border shadow-sm hover:bg-primary/10 hover:text-blue-600 transition-colors"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
