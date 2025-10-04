// A mock Timestamp for localStorage to mimic Firestore's structure
export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface BaseDocument {
  id: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Organization extends BaseDocument {
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  seats: number;
}

export interface UserProfile extends BaseDocument {
  uid: string;
  orgId: string;
  email: string;
  displayName?: string;
  role: 'admin' | 'member';
  photoURL?: string;
}

export interface Lead extends BaseDocument {
  orgId: string;
  type: 'company' | 'person';
  name: string;
  domain?: string;
  title?: string;
  summary?: string;
  source: string;
  status: 'new' | 'verified' | 'invalid' | 'converted';
  score: number;
}

export interface ScrapeJob extends BaseDocument {
  targetUrl: string;
  status: 'queued' | 'running' | 'done' | 'failed' | 'paused';
  attempts: number;
  scheduledAt: Timestamp;
  finishedAt?: Timestamp;
}

export interface Webhook extends BaseDocument {
  orgId: string;
  url: string;
  active: boolean;
  events: string[];
}
