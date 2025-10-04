import { FileUp, Target, Users, Zap } from 'lucide-react';
import KpiCard from '@/components/dashboard/kpi-card';
import LeadSourceChart from '@/components/dashboard/lead-source-chart';
import RecentLeads from '@/components/dashboard/recent-leads';

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's a summary of your lead generation activity.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Leads"
          value="1,254"
          description="+20.1% from last month"
          icon={Users}
        />
        <KpiCard
          title="Verified Leads"
          value="982"
          description="78% validity rate"
          icon={Zap}
        />
        <KpiCard
          title="Scraping Jobs"
          value="5 Active"
          description="23 jobs completed this week"
          icon={Target}
        />
        <KpiCard
          title="CSV Imports"
          value="12"
          description="+5 since last month"
          icon={FileUp}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <RecentLeads />
        <LeadSourceChart />
      </div>
    </div>
  );
}
