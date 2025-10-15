'use client';

import { Github, Languages, GraduationCap, Home } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print-hidden">
      <div className="container flex h-14 items-center">
        <div className="flex items-center justify-start flex-1">
          <Link href="/" className="flex items-center">
            <GraduationCap className="h-6 w-6 mr-2 text-primary" />
            <span className="font-bold font-headline">{t('app-title')}</span>
          </Link>
        </div>

        <div className="flex items-center justify-end flex-1 space-x-1">
          <Link href="/">
            <Button variant="ghost" size="icon" aria-label="Home">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} disabled={language === 'en'}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('zh')} disabled={language === 'zh'}>
                简体中文 (Simplified Chinese)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <a
            href="https://github.com/ZhanZiyuan/doctoral-suitability-assessment"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub Repository</span>
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
