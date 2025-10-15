'use client';

import { useLanguage } from '@/context/language-context';
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  PolarRadiusAxis,
} from 'recharts';
import { useEffect, useState } from 'react';

type RadarChartData = {
  dimension: string;
  score: number;
  fullMark: number;
};

interface RadarChartProps {
  data: RadarChartData[];
}

export default function RadarChart({ data }: RadarChartProps) {
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#0969da');

  useEffect(() => {
    setIsClient(true);
    // We need to get the CSS variable value at runtime on the client
    const color = getComputedStyle(document.documentElement).getPropertyValue('--primary');
    if (color) {
      // recharts expects a hex code, but the variable is HSL.
      // This is a simplified conversion, assuming we will get something like "211 90% 45%"
      const hslParts = color.trim().split(' ');
      if (hslParts.length >= 3) {
        const h = parseInt(hslParts[0]);
        const s = parseInt(hslParts[1]);
        const l = parseInt(hslParts[2]);
        setPrimaryColor(`hsl(${h}, ${s}%, ${l}%)`);
      }
    }
  }, []);
  
  if (!isClient) {
    // Render a skeleton or placeholder on the server and during initial client render
    return <div style={{width: '100%', height: 400}} className="animate-pulse rounded-md bg-muted" />;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <defs>
          <radialGradient id="radar-fill">
            <stop offset="0%" stopColor={primaryColor} stopOpacity={0.4}/>
            <stop offset="100%" stopColor={primaryColor} stopOpacity={0.1}/>
          </radialGradient>
        </defs>
        <PolarGrid />
        <PolarAngleAxis 
            dataKey="dimension" 
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            tickLine={false}
        />
        <PolarRadiusAxis angle={30} domain={[0, 5]} tickCount={6} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            borderColor: 'hsl(var(--border))',
            borderRadius: 'var(--radius)',
          }}
        />
        <Radar name={t('your-score')} dataKey="score" stroke={primaryColor} fill="url(#radar-fill)" fillOpacity={0.8} />
      </RechartsRadarChart>
    </ResponsiveContainer>
  );
}
