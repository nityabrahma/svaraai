'use client';

import { FileUp, Target, Users, Zap } from 'lucide-react';
import KpiCard from '@/components/dashboard/kpi-card';
import LeadSourceChart from '@/components/dashboard/lead-source-chart';
import RecentLeads from '@/components/dashboard/recent-leads';
import { useCollection } from '@/firebase/firestore/use-collection';
import { collection, getFirestore } from 'firebase/firestore';
import { useFirebase } from '@/firebase/provider';

export default function DashboardPage() {
  const { app } = useFirebase();
  const firestore = getFirestore(app);

  const { data: leads } = useCollection(collection(firestore, 'leads'));
  const { data: scrapingJobs } = useCollection(collection(firestore, 'scrapingJobs'));

  const totalLeads = leads?.length ?? 0;
  const verifiedLeads = leads?.filter(lead => lead.status === 'verified').length ?? 0;
  const validityRate = totalLeads > 0 ? ((verifiedLeads / totalLeads) * 100).toFixed(0) : 0;

  const activeScrapingJobs = scrapingJobs?.filter(job => job.status === 'running').length ?? 0;
  const completedScrapingJobs = scrapingJobs?.filter(job => job.status === 'done').length ?? 0;

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your lead generation activity.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Leads"
          value={totalLeads.toString()}
          description="All time"
          icon={Users}
        />
        <KpiCard
          title="Verified Leads"
          value={verifiedLeads.toString()}
          description={`${validityRate}% validity rate`}
          icon={Zap}
        />
        <KpiCard
          title="Scraping Jobs"
          value={`${activeScrapingJobs} Active`}
          description={`${completedScrapingJobs} jobs completed`}
          icon={Target}
        />
        <KpiCard
          title="CSV Imports"
          value="0"
          description="Feature coming soon"
          icon={FileUp}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentLeads leads={leads ?? []} />
        <LeadSourceChart leads={leads ?? []} />
      </div>
    </div>
  );
}
