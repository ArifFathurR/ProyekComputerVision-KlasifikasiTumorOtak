import Link from 'next/link';
import { BrainCircuit } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link href="/" className="mr-8 flex items-center space-x-2">
          <BrainCircuit className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            NeuroVision
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Home
            </Link>
            <Link
              href="/klasifikasi"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Klasifikasi
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
