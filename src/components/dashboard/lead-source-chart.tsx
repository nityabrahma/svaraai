'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Lead } from '@/lib/types';
import { useMemo } from 'react';

const chartConfig = {
    leads: {
      label: "Leads",
    },
    'web-scrape': {
      label: "Web Scrape",
      color: "hsl(var(--chart-1))",
    },
    'linkedin-crawl': {
      label: "LinkedIn",
      color: "hsl(var(--chart-2))",
    },
    'user-upload': {
        label: "Uploads",
        color: "hsl(var(--chart-3))",
    },
    api: {
        label: "API",
        color: "hsl(var(--chart-4))",
    }
}

const COLORS = Object.values(chartConfig).map(c => c.color).filter(Boolean) as string[];

export default function LeadSourceChart({ leads }: { leads: Lead[] }) {
  const chartData = useMemo(() => {
    if (!leads) return [];
    const sourceCounts = leads.reduce((acc, lead) => {
      const source = lead.source || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(sourceCounts).map(([name, value]) => ({
      name: chartConfig[name as keyof typeof chartConfig]?.label || name,
      value,
      fill: chartConfig[name as keyof typeof chartConfig]?.color,
    }));
  }, [leads]);


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Lead Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent />}
              />
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                paddingAngle={5}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                  index,
                }) => {
                  const RADIAN = Math.PI / 180
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
                  const x = cx + radius * Math.cos(-midAngle * RADIAN)
                  const y = cy + radius * Math.sin(-midAngle * RADIAN)
                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  )
                }}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
