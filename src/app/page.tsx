'use client';

import { LanguageProvider, useLanguage } from '@/context/language-context';
import Header from '@/components/Header';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Introduction from '@/components/Introduction';
import Assessment from '@/components/Assessment';

const AppContent = () => {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const version = searchParams.get('version');

  const startAssessment = (version: 'concise' | 'complete') => {
    router.push(`/?version=${version}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto w-full">
          {version ? (
            <Assessment version={version as 'concise' | 'complete'} />
          ) : (
            <Introduction onStart={startAssessment} />
          )}
        </div>
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} {t('app-title')}. {t('footer-note')}</p>
      </footer>
    </div>
  );
};

const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <AppContent />
  </Suspense>
)


export default function Home() {
  return (
    <LanguageProvider>
      <App />
    </LanguageProvider>
  );
}
