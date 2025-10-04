'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { source: 'Web Scrape', leads: 450, fill: 'var(--color-web)' },
  { source: 'LinkedIn', leads: 300, fill: 'var(--color-linkedin)' },
  { source: 'Uploads', leads: 200, fill: 'var(--color-uploads)' },
  { source: 'API', leads: 278, fill: 'var(--color-api)' },
];

const chartConfig = {
    leads: {
      label: "Leads",
    },
    web: {
      label: "Web Scrape",
      color: "hsl(var(--chart-1))",
    },
    linkedin: {
      label: "LinkedIn",
      color: "hsl(var(--chart-2))",
    },
    uploads: {
        label: "Uploads",
        color: "hsl(var(--chart-3))",
    },
    api: {
        label: "API",
        color: "hsl(var(--chart-4))",
    }
  }

export default function LeadSourceChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -10, bottom: 0 }}>
                <XAxis
                dataKey="source"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
                />
                <Bar dataKey="leads" radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
