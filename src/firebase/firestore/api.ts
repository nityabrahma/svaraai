'use client';

import {
  Firestore,
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { errorEmitter } from '../error-emitter';
import { FirestorePermissionError } from '../errors';
import { Lead, ScrapeJob } from '@/lib/types';

type LeadData = Omit<Lead, 'id' | 'createdAt' | 'updatedAt'>;

export async function createLead(firestore: Firestore, leadData: LeadData): Promise<boolean> {
  try {
    const leadsCollection = collection(firestore, 'leads');
    addDoc(leadsCollection, {
      ...leadData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }).catch(async (error) => {
        const permissionError = new FirestorePermissionError({
            path: leadsCollection.path,
            operation: 'create',
            requestResourceData: leadData,
        });
        errorEmitter.emit('permission-error', permissionError);
    });
    return true;
  } catch (error) {
    console.error('Error creating lead:', error);
    return false;
  }
}

export async function deleteLead(firestore: Firestore, leadId: string): Promise<boolean> {
  try {
    const leadDoc = doc(firestore, 'leads', leadId);
    deleteDoc(leadDoc).catch(async (error) => {
        const permissionError = new FirestorePermissionError({
            path: leadDoc.path,
            operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
    });
    return true;
  } catch (error) {
    console.error('Error deleting lead:', error);
    return false;
  }
}

export async function createScrapingJob(firestore: Firestore, targetUrl: string): Promise<boolean> {
    try {
        const jobsCollection = collection(firestore, 'scrapingJobs');
        addDoc(jobsCollection, {
            targetUrl: targetUrl,
            status: 'queued',
            attempts: 0,
            scheduledAt: serverTimestamp(),
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        }).catch(async (error) => {
            const permissionError = new FirestorePermissionError({
                path: jobsCollection.path,
                operation: 'create',
                requestResourceData: { targetUrl },
            });
            errorEmitter.emit('permission-error', permissionError);
        });
        return true;
    } catch(error) {
        console.error('Error creating job:', error);
        return false;
    }
}

export async function deleteScrapingJob(firestore: Firestore, jobId: string): Promise<boolean> {
    try {
        const jobDoc = doc(firestore, 'scrapingJobs', jobId);
        deleteDoc(jobDoc).catch(async (error) => {
            const permissionError = new FirestorePermissionError({
                path: jobDoc.path,
                operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
        });
        return true;
    } catch(error) {
        console.error('Error deleting job:', error);
        return false;
    }
}

export async function updateScrapingJobStatus(firestore: Firestore, jobId: string, status: ScrapeJob['status']): Promise<boolean> {
    try {
        const jobRef = doc(firestore, 'scrapingJobs', jobId);
        updateDoc(jobRef, { status: status, updatedAt: serverTimestamp() }).catch(async (error) => {
            const permissionError = new FirestorePermissionError({
                path: jobRef.path,
                operation: 'update',
                requestResourceData: { status },
            });
            errorEmitter.emit('permission-error', permissionError);
        });
        return true;
    } catch (error) {
        console.error('Error updating job:', error);
        return false;
    }
}

export async function rerunScrapingJob(firestore: Firestore, jobId: string): Promise<boolean> {
    try {
        const jobRef = doc(firestore, 'scrapingJobs', jobId);
        updateDoc(jobRef, {
            status: 'queued',
            attempts: 0,
            updatedAt: serverTimestamp(),
            scheduledAt: serverTimestamp(),
        }).catch(async (error) => {
            const permissionError = new FirestorePermissionError({
                path: jobRef.path,
                operation: 'update',
                requestResourceData: { status: 'queued' },
            });
            errorEmitter.emit('permission-error', permissionError);
        });
        return true;
    } catch(error) {
        console.error('Error rerunning job:', error);
        return false;
    }
}