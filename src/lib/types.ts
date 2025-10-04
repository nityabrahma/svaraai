export type Organization = {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  seats: number;
};

export type User = {
  id: string;
  orgId: string;
  email: string;
  name: string;
  role: 'admin' | 'member';
  avatarUrl: string;
};

export type Lead = {
  id: string;
  orgId: string;
  type: 'company' | 'person';
  name: string;
  domain?: string;
  title?: string;
  summary?: string;
  source: string;
  status: 'new' | 'verified' | 'invalid' | 'converted';
  score: number;
};

export type ScrapeJob = {
  id: string;
  targetUrl: string;
  status: 'queued' | 'running' | 'done' | 'failed' | 'paused';
  attempts: number;
  scheduledAt: string;
  finishedAt?: string;
};

export type Webhook = {
  id: string;
  url: string;
  active: boolean;
  events: string[];
};
