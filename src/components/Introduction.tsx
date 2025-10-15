'use client';

import { useLanguage } from '@/context/language-context';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { dimensions } from '@/lib/questions';
import { CheckCircle2 } from 'lucide-react';

interface IntroductionProps {
  onStart: (version: 'concise' | 'complete') => void;
}

const InfoSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8">
        <h2 className="font-headline text-2xl font-bold text-primary mb-4">{title}</h2>
        <div className="space-y-4 text-foreground/90">{children}</div>
    </div>
);

export default function Introduction({ onStart }: IntroductionProps) {
  const { t, language } = useLanguage();

  return (
    <Card>
      <CardHeader className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
          {t('app-title')}
        </h1>
        <p className="text-muted-foreground mt-2 md:text-lg">{t('app-description')}</p>
      </CardHeader>
      <CardContent className="space-y-12 px-4 md:px-8 py-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button size="lg" onClick={() => onStart('concise')} className="w-full font-bold text-lg py-6">
                {t('start-concise-assessment')}
            </Button>
            <Button size="lg" variant="outline" onClick={() => onStart('complete')} className="w-full font-bold text-lg py-6">
                {t('start-complete-assessment')}
            </Button>
        </div>
        
        <InfoSection title={t('intro-brief-title')}>
            <p>{t('intro-brief-p1')}</p>
        </InfoSection>

        <InfoSection title={t('intro-detailed-title')}>
            <p>{t('intro-detailed-p1')}</p>
        </InfoSection>

        <InfoSection title={t('intro-problem-title')}>
            <p>{t('intro-problem-p1')}</p>
        </InfoSection>

        <InfoSection title={t('intro-versions-title')}>
            <p>{t('intro-versions-p1')}</p>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
                <Card className='bg-accent/50'>
                    <CardHeader>
                        <CardTitle className="text-lg text-primary">{t('intro-versions-concise')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t('intro-versions-concise-desc')}</p>
                    </CardContent>
                </Card>
                <Card className='bg-accent/50'>
                    <CardHeader>
                        <CardTitle className="text-lg text-primary">{t('intro-versions-complete')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>{t('intro-versions-complete-desc')}</p>
                    </CardContent>
                </Card>
            </div>
        </InfoSection>

        <InfoSection title={t('intro-dimensions-title')}>
          <p>{t('intro-dimensions-p1')}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 mt-4">
            {dimensions.map((dim) => (
              <li key={dim.key} className="flex items-start">
                 <CheckCircle2 className="h-5 w-5 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>{language === 'en' ? dim.en : dim.zh}</span>
              </li>
            ))}
          </ul>
        </InfoSection>

        <InfoSection title={t('intro-scoring-title')}>
            <p>{t('intro-scoring-p1')}</p>
            <div className="mt-4 p-4 border-l-4 border-primary bg-accent/50 rounded-r-lg">
                <h4 className="font-bold mb-2">{t('intro-scoring-p2')}</h4>
                <ul className="list-disc list-inside space-y-1">
                    <li><span className="font-semibold">{t('intro-scoring-high')}</span></li>
                    <li><span className="font-semibold">{t('intro-scoring-medium')}</span></li>
                    <li><span className="font-semibold">{t('intro-scoring-low')}</span></li>
                </ul>
            </div>
        </InfoSection>

        <InfoSection title={t('intro-references-title')}>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Levecque, K., Anseel, F., De Beuckelaer, A., Van der Heyden, J., & Gisle, L. (2017). Work organization and mental health in PhD students. *Research Policy, 46*(4), 868-879.</li>
                <li>Luthans, F., Youssef, C. M., & Avolio, B. J. (2007). *Psychological capital: Developing the human competitive edge*. Oxford University Press.</li>
                <li>Ryan, R. M., & Deci, E. L. (2000). Self-determination theory and the facilitation of intrinsic motivation, social development, and well-being. *American Psychologist, 55*(1), 68-78.</li>
                <li>Stubb, J., Pyhältö, K., & Lonka, K. (2011). Balancing between inspiration and exhaustion: PhD students' experienced socio-psychological well-being. *Studies in Continuing Education, 33*(1), 33-50.</li>
            </ul>
        </InfoSection>
        
        <InfoSection title={t('intro-disclaimer-title')}>
            <ul className="list-decimal list-inside space-y-2 text-sm">
                <li>{t('intro-disclaimer-p1')}</li>
                <li>{t('intro-disclaimer-p2')}</li>
                <li>{t('intro-disclaimer-p3')}</li>
            </ul>
        </InfoSection>

      </CardContent>
    </Card>
  );
}
