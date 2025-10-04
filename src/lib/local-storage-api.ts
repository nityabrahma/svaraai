'use client';
import { Lead, ScrapeJob, UserProfile } from './types';

// This file contains functions to interact with localStorage,
// simulating a backend API for prototyping purposes.

export const LOCAL_STORAGE_USER_KEY = 'leadpilot-user';
const LEADS_KEY = 'leads';
const SCRAPING_JOBS_KEY = 'scrapingJobs';
const USERS_KEY = 'users';

// --- Utility Functions ---

const readCollection = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  } catch (error) {
    console.error(`Error reading "${key}" from localStorage`, error);
    return [];
  }
};

const writeCollection = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
    // Dispatch a custom event to notify other hooks/components of the data change
    window.dispatchEvent(new Event('storage_update'));
  } catch (error) {
    console.error(`Error writing to "${key}" in localStorage`, error);
  }
};

// --- User Functions ---

export async function getUser(email: string): Promise<UserProfile | null> {
  const users = readCollection<UserProfile>(USERS_KEY);
  return users.find(u => u.email === email) || null;
}

export async function createUser(displayName: string, email: string): Promise<UserProfile> {
  const users = readCollection<UserProfile>(USERS_KEY);
  const newUser: UserProfile = {
    uid: `user_${Date.now()}`,
    orgId: `org_${Date.now()}`,
    email,
    displayName,
    role: 'admin',
    photoURL: `https://i.pravatar.cc/150?u=${email}`,
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    id: `user_${Date.now()}`
  };
  writeCollection<UserProfile>(USERS_KEY, [...users, newUser]);
  return newUser;
}

export async function updateUserProfile(uid: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const users = readCollection<UserProfile>(USERS_KEY);
    const userIndex = users.findIndex(u => u.uid === uid);
    if (userIndex === -1) throw new Error("User not found");

    const updatedUser = { ...users[userIndex], ...updates, updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } };
    users[userIndex] = updatedUser;
    writeCollection<UserProfile>(USERS_KEY, users);

    // Also update the currently logged-in user if they are the one being updated
    const currentUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_KEY) || '{}');
    if (currentUser.uid === uid) {
        localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));
    }
    
    return updatedUser;
}


// --- Lead Functions ---

type LeadData = Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>;

export async function createLead(leadData: LeadData) {
  const leads = readCollection<Lead>(LEADS_KEY);
  const newLead: Lead = {
    ...leadData,
    id: `lead_${Date.now()}`,
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  };
  writeCollection<Lead>(LEADS_KEY, [...leads, newLead]);
  return true;
}

export async function deleteLead(leadId: string) {
  const leads = readCollection<Lead>(LEADS_KEY);
  const filteredLeads = leads.filter(lead => lead.id !== leadId);
  writeCollection<Lead>(LEADS_KEY, filteredLeads);
  return true;
}

// --- Scraping Job Functions ---

export async function createScrapingJob(targetUrl: string) {
  const jobs = readCollection<ScrapeJob>(SCRAPING_JOBS_KEY);
  const newJob: ScrapeJob = {
    id: `job_${Date.now()}`,
    targetUrl,
    status: 'queued',
    attempts: 0,
    scheduledAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
  };
  writeCollection<ScrapeJob>(SCRAPING_JOBS_KEY, [...jobs, newJob]);
  return true;
}

export async function deleteScrapingJob(jobId: string) {
  const jobs = readCollection<ScrapeJob>(SCRAPING_JOBS_KEY);
  const filteredJobs = jobs.filter(job => job.id !== jobId);
  writeCollection<ScrapeJob>(SCRAPING_JOBS_KEY, filteredJobs);
  return true;
}

export async function updateScrapingJobStatus(jobId: string, status: ScrapeJob['status']) {
  const jobs = readCollection<ScrapeJob>(SCRAPING_JOBS_KEY);
  const updatedJobs = jobs.map(job =>
    job.id === jobId ? { ...job, status, updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 } } : job
  );
  writeCollection<ScrapeJob>(SCRAPING_JOBS_KEY, updatedJobs);
  return true;
}

export async function rerunScrapingJob(jobId: string) {
    const jobs = readCollection<ScrapeJob>(SCRAPING_JOBS_KEY);
    const updatedJobs = jobs.map(job =>
      job.id === jobId ? { 
          ...job, 
          status: 'queued' as const,
          attempts: 0,
          updatedAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
          scheduledAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
        } : job
    );
    writeCollection<ScrapeJob>(SCRAPING_JOBS_KEY, updatedJobs);
    return true;
}
