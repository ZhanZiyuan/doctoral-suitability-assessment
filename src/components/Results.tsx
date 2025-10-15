'use client';

import { useEffect, useState, useRef } from 'react';
import RadarChart from './RadarChart';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Download, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/context/language-context';
import type { InterpretAssessmentResultsInput } from '@/ai/flows/interpret-assessment-results';
import { Progress } from './ui/progress';

interface DimensionAverage {
  dimension: string;
  score: number;
  fullMark: number;
}

export interface ResultsData {
  normalizedScore: number;
  dimensionAverages: DimensionAverage[];
  aiInput: InterpretAssessmentResultsInput;
}

interface ResultsProps {
  results: ResultsData;
  onRetake: () => void;
}

export default function Results({ results, onRetake }: ResultsProps) {
  const { t } = useLanguage();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-center">{t('results-title')}</CardTitle>
          <CardDescription className="text-center">{t('results-description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button onClick={onRetake} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              {t('retake-assessment')}
            </Button>
            <Button onClick={handlePrint} >
              <Download className="mr-2 h-4 w-4" />
              {t('download-report')}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div ref={printRef} className="print-p-0 print-m-0">
        <Card className="print-shadow-none print-border-none">
          <CardHeader>
              <h2 className="font-headline text-2xl font-bold text-center">{t('summary-title')}</h2>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center space-y-4">
              <p className="text-lg text-muted-foreground">{t('your-score')}</p>
              <div className='relative'>
                <p className={`font-bold text-7xl ${getScoreColor(results.normalizedScore)}`}>
                  {results.normalizedScore}
                  <span className="text-muted-foreground text-3xl">/ 100</span>
                </p>
              </div>
              <Progress value={results.normalizedScore} className="h-4" />
            </div>
            <div>
              <RadarChart data={results.dimensionAverages} />
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
