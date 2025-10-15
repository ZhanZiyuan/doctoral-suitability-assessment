'use client';

import type { FC } from 'react';
import { useState, useMemo, useCallback } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useLanguage } from '@/context/language-context';
import { questions, dimensions } from '@/lib/questions';
import Questionnaire from '@/components/Questionnaire';
import Results, { type ResultsData } from '@/components/Results';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';

type Version = 'concise' | 'complete';
type Answers = Record<string, number>;

interface AssessmentProps {
    version: Version;
}

const Assessment: FC<AssessmentProps> = ({ version: initialVersion }) => {
  const [version, setVersion] = useState<Version>(initialVersion);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resultsData, setResultsData] = useState<ResultsData | null>(null);

  const { t, language } = useLanguage();
  const router = useRouter();

  const methods = useForm<Answers>({
    defaultValues: {},
  });

  const questionsForVersion = useMemo(
    () => (version === 'concise' ? questions.filter((q) => q.in_concise) : questions),
    [version]
  );
  
  const handleVersionChange = (v: string) => {
    const newVersion = v as Version;
    setVersion(newVersion);
    router.push(`/?version=${newVersion}`);
    // Reset form state when version changes
    setIsSubmitted(false);
    setResultsData(null);
    methods.reset();
  };

  const handleFormSubmit = (data: Answers) => {
    const answeredQuestions = questionsForVersion.filter((q) => data[q.id] !== undefined && data[q.id] !== null);
    
    if (answeredQuestions.length < questionsForVersion.length) {
      alert(t('alert-unanswered'));
      return;
    }

    let rawScore = 0;
    const dimensionScores: Record<string, { score: number; count: number }> = {};

    for (const q of answeredQuestions) {
      const score = Number(data[q.id]);
      rawScore += score;
      if (!dimensionScores[q.dimension_key]) {
        dimensionScores[q.dimension_key] = { score: 0, count: 0 };
      }
      dimensionScores[q.dimension_key].score += score;
      dimensionScores[q.dimension_key].count += 1;
    }

    const minScore = questionsForVersion.length * 1;
    const maxScore = questionsForVersion.length * 5;
    const normalizedScore = Math.round(((rawScore - minScore) / (maxScore - minScore)) * 100);

    const dimensionAverages = dimensions.map(d => {
        const key = d.key;
        const average = dimensionScores[key] ? dimensionScores[key].score / dimensionScores[key].count : 0;
        return {
            dimension: language === 'en' ? d.en : d.zh,
            score: parseFloat(average.toFixed(2)),
            fullMark: 5,
        };
    });

    const aiInput = Object.fromEntries(
        dimensions.map(d => [
            d.key,
            dimensionScores[d.key] ? dimensionScores[d.key].score / dimensionScores[d.key].count : 0
        ])
    );
    
    setResultsData({
      normalizedScore,
      dimensionAverages,
      aiInput: {
          totalScore: normalizedScore,
          ...aiInput
      } as ResultsData['aiInput']
    });

    setIsSubmitted(true);
    window.scrollTo(0, 0);
  };
  
  const handleRetake = useCallback(() => {
    setIsSubmitted(false);
    setResultsData(null);
    methods.reset();
    router.push('/');
  }, [methods, router]);

  return (
    <>
        {!isSubmitted ? (
        <Card>
            <CardHeader className="text-center">
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t('app-title')}</h1>
            </CardHeader>
            <CardContent>
            <div className="flex justify-center mb-6">
                <Tabs value={version} onValueChange={handleVersionChange}>
                <TabsList>
                    <TabsTrigger value="concise">{t('concise-version')}</TabsTrigger>
                    <TabsTrigger value="complete">{t('complete-version')}</TabsTrigger>
                </TabsList>
                </Tabs>
            </div>
            <FormProvider {...methods}>
                <Questionnaire
                questions={questionsForVersion}
                onSubmit={methods.handleSubmit(handleFormSubmit)}
                />
            </FormProvider>
            </CardContent>
        </Card>
        ) : (
        resultsData && <Results results={resultsData} onRetake={handleRetake} />
        )}
    </>
  );
};

export default Assessment;
