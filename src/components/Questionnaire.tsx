'use client';

import { useFormContext, Controller } from 'react-hook-form';
import { useLanguage } from '@/context/language-context';
import type { Question as QuestionType } from '@/lib/questions';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';

interface QuestionnaireProps {
  questions: QuestionType[];
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
}

export default function Questionnaire({ questions, onSubmit }: QuestionnaireProps) {
  const { control, formState: { isSubmitting } } = useFormContext();
  const { language, t } = useLanguage();

  const dimensions = questions.reduce((acc, q) => {
    const dim = language === 'en' ? q.dimension_en : q.dimension_zh;
    if (!acc[dim]) {
      acc[dim] = [];
    }
    acc[dim].push(q);
    return acc;
  }, {} as Record<string, QuestionType[]>);

  const ratingLabels = [
    { value: 1, label: t('rating-1') },
    { value: 2, label: t('rating-2') },
    { value: 3, label: t('rating-3') },
    { value: 4, label: t('rating-4') },
    { value: 5, label: t('rating-5') },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {Object.entries(dimensions).map(([dimension, questionsInDimension], index) => (
        <div key={dimension}>
          <h2 className="font-headline text-xl md:text-2xl font-bold mb-6 text-primary/90">
            {index + 1}. {dimension}
          </h2>
          <div className="space-y-6">
            {questionsInDimension.map((q) => (
              <Controller
                key={q.id}
                name={String(q.id)}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="p-4 border rounded-lg bg-card/50">
                    <p className="font-medium mb-1">
                      {language === 'en' ? q.question_en : q.question_zh}
                    </p>
                    {language === 'en' && q.question_zh && (
                      <p className="text-sm text-muted-foreground mb-4 hidden">
                        {q.question_zh}
                      </p>
                    )}
                     {language === 'zh' && q.question_en && (
                      <p className="text-sm text-muted-foreground mb-4 hidden">
                        {q.question_en}
                      </p>
                    )}
                    <RadioGroup
                      onValueChange={(value) => field.onChange(parseInt(value))}
                      defaultValue={field.value?.toString()}
                      className="flex flex-wrap gap-4"
                    >
                      {ratingLabels.map(({ value, label }) => (
                        <div key={value} className="flex items-center space-x-2">
                          <RadioGroupItem value={value.toString()} id={`${q.id}-${value}`} />
                          <Label htmlFor={`${q.id}-${value}`}>{label}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              />
            ))}
          </div>
          {index < Object.keys(dimensions).length - 1 && <Separator className="my-10" />}
        </div>
      ))}
      <div className="flex justify-center pt-6">
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t('submitting')}
            </>
          ) : (
            t('submit-assessment')
          )}
        </Button>
      </div>
    </form>
  );
}
