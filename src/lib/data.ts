import type { Lead, ScrapeJob, User } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const mockUser: User = {
  id: 'user_1',
  orgId: 'org_1',
  email: 'sonny@leadpilot.ai',
  name: 'Sonny',
  role: 'admin',
  avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || '',
};

export const mockLeads: Lead[] = [
  { id: 'lead_1', orgId: 'org_1', type: 'company', name: 'Innovate Inc.', domain: 'innovate.com', source: 'web-scrape', status: 'verified', score: 92, summary: 'Leading provider of cloud-based AI solutions.' },
  { id: 'lead_2', orgId: 'org_1', type: 'company', name: 'DataDriven Co.', domain: 'datadriven.co', source: 'web-scrape', status: 'verified', score: 88, summary: 'Big data analytics and business intelligence platform.' },
  { id: 'lead_3', orgId: 'org_1', type: 'person', name: 'Jane Doe', title: 'CTO', domain: 'techcorp.com', source: 'linkedin-crawl', status: 'new', score: 75, summary: 'CTO at TechCorp, responsible for technology strategy.' },
  { id: 'lead_4', orgId: 'org_1', type: 'company', name: 'QuantumLeap', domain: 'quantumleap.ai', source: 'user-upload', status: 'invalid', score: 23, summary: 'Early-stage quantum computing startup.' },
  { id: 'lead_5', orgId: 'org_1', type: 'company', name: 'Synergy Solutions', domain: 'synergy.com', source: 'web-scrape', status: 'verified', score: 95, summary: 'Enterprise software for supply chain management.' },
  { id: 'lead_6', orgId: 'org_1', type: 'person', name: 'John Smith', title: 'VP of Sales', domain: 'globalnet.com', source: 'linkedin-crawl', status: 'verified', score: 85, summary: 'VP of Sales at GlobalNet, managing a team of 50.' },
  { id: 'lead_7', orgId: 'org_1', type: 'company', name: 'NextGen Med', domain: 'nextgenmed.com', source: 'web-scrape', status: 'new', score: 68, summary: 'Biotechnology research firm.' },
  { id: 'lead_8', orgId: 'org_1', type: 'company', name: 'EcoPower', domain: 'ecopower.com', source: 'user-upload', status: 'converted', score: 98, summary: 'Renewable energy solutions provider.' },
  { id: 'lead_9', orgId: 'org_1', type: 'person', name: 'Emily White', title: 'Marketing Director', domain: 'creative.io', source: 'web-scrape', status: 'verified', score: 82, summary: 'Marketing Director at Creative.io.' },
  { id: 'lead_10', orgId: 'org_1', type: 'company', name: 'Fintech Group', domain: 'fintechgroup.com', source: 'linkedin-crawl', status: 'new', score: 71, summary: 'Financial technology and services.' },
];

export const mockScrapeJobs: ScrapeJob[] = [
    { id: 'job_1', targetUrl: 'https://innovate.com', status: 'done', attempts: 1, scheduledAt: new Date(Date.now() - 3600000).toISOString(), finishedAt: new Date(Date.now() - 3540000).toISOString() },
    { id: 'job_2', targetUrl: 'https://techcrunch.com/startups', status: 'running', attempts: 1, scheduledAt: new Date(Date.now() - 600000).toISOString() },
    { id: 'job_3', targetUrl: 'https://ycombinator.com/companies', status: 'queued', attempts: 0, scheduledAt: new Date().toISOString() },
    { id: 'job_4', targetUrl: 'https://brokenlink.com', status: 'failed', attempts: 3, scheduledAt: new Date(Date.now() - 86400000).toISOString(), finishedAt: new Date(Date.now() - 86300000).toISOString() },
    { id: 'job_5', targetUrl: 'https://paused-scrape.com', status: 'paused', attempts: 1, scheduledAt: new Date(Date.now() - 172800000).toISOString() },
];
