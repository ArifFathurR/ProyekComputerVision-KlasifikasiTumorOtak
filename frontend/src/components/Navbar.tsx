"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrainCircuit } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

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
          <nav className="flex items-center space-x-2 text-sm font-medium">
            <Link
              href="/"
              className={`transition-colors px-3 py-2 rounded-md ${
                pathname === '/' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-primary/10 hover:text-primary text-foreground'
              }`}
            >
              Home
            </Link>
            <Link
              href="/klasifikasi"
              className={`transition-colors px-3 py-2 rounded-md ${
                pathname === '/klasifikasi' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-primary/10 hover:text-primary text-foreground'
              }`}
            >
              Klasifikasi
            </Link>
            <Link
              href="/about"
              className={`transition-colors px-3 py-2 rounded-md ${
                pathname === '/about' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-primary/10 hover:text-primary text-foreground'
              }`}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </nav>
  );
}
