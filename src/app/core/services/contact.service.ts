import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { delay, tap, catchError, map } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { SupabaseService } from './supabase.service';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'resolved';
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private readonly STORAGE_KEY = 'hasura_contacts_db';
  private submissionsSubject = new BehaviorSubject<ContactSubmission[]>([]);
  public submissions$ = this.submissionsSubject.asObservable();

  constructor(
    private toastService: ToastService,
    private supabase: SupabaseService
  ) {
    this.initSubmissions();
    this.fetchRemoteSubmissions();
  }

  private initSubmissions(): void {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        try {
          this.submissionsSubject.next(JSON.parse(stored));
          return;
        } catch (e) {
          console.error('Failed to parse contact submissions', e);
        }
      }
    }

    const seedLeads: ContactSubmission[] = [
      {
        id: 'cnt_101',
        name: 'Sarah Chen',
        email: 'sarah.chen@fintechscale.io',
        phone: '+1 415 892 3400',
        company: 'FinTechScale',
        service: 'AI & Generative AI',
        message: 'Looking to integrate customized RAG pipeline with enterprise compliance controls for our financial analytics engine.',
        status: 'new',
        createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
      },
      {
        id: 'cnt_102',
        name: 'David Miller',
        email: 'dmiller@cloudcore.tech',
        phone: '+1 206 555 0192',
        company: 'CloudCore Systems',
        service: 'Cloud & DevOps',
        message: 'Seeking multi-region Kubernetes migration & automated Terraform deployment pipeline consulting.',
        status: 'contacted',
        createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString()
      },
      {
        id: 'cnt_103',
        name: 'Ananya Sharma',
        email: 'ananya@healthpulse.ai',
        phone: '+91 98450 12345',
        company: 'HealthPulse AI',
        service: 'Software Development',
        message: 'Need high-concurrency patient portal with strict HIPAA/SOC2 compliance built with Angular & Java Spring Boot.',
        status: 'resolved',
        createdAt: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
      }
    ];

    this.saveSubmissions(seedLeads);
  }

  private fetchRemoteSubmissions(): void {
    if (this.supabase.isLive) {
      this.supabase.from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .then(
          ({ data, error }) => {
            if (!error && data && data.length > 0) {
              const mapped: ContactSubmission[] = data.map((item: any) => ({
                id: item.id,
                name: item.name,
                email: item.email,
                phone: item.phone,
                company: item.company,
                service: item.service,
                message: item.message,
                status: item.status || 'new',
                createdAt: item.created_at
              }));
              this.saveSubmissions(mapped);
            }
          },
          () => {}
        );
    }
  }

  private saveSubmissions(list: ContactSubmission[]): void {
    this.submissionsSubject.next(list);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error('Failed to write contacts to localStorage', e);
      }
    }
  }

  submit(data: Omit<ContactSubmission, 'id' | 'status' | 'createdAt'>): Observable<{ success: boolean; submission: ContactSubmission }> {
    const newSubmission: ContactSubmission = {
      ...data,
      id: 'cnt_' + Math.random().toString(36).substring(2, 9),
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Attempt live Supabase insert
    if (this.supabase.isLive) {
      this.supabase.from('contact_submissions').insert([{
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        service: data.service,
        message: data.message,
        status: 'new'
      }]).then(({ error }) => {
        if (error) {
          console.warn('Supabase contact insert note (table may not be created yet):', error.message);
        }
      });
    }

    return of({ success: true, submission: newSubmission }).pipe(
      delay(600),
      tap(res => {
        const updated = [res.submission, ...this.submissionsSubject.value];
        this.saveSubmissions(updated);
        this.toastService.success(
          'Message Transmitted',
          `Thank you ${res.submission.name}! Our engineering team will connect with you shortly.`
        );
      })
    );
  }

  updateStatus(id: string, status: 'new' | 'contacted' | 'resolved'): void {
    const list = this.submissionsSubject.value;
    const item = list.find(s => s.id === id);
    if (item) {
      item.status = status;
      this.saveSubmissions([...list]);

      // Sync to Supabase if connected
      if (this.supabase.isLive) {
        this.supabase.from('contact_submissions')
          .update({ status })
          .eq('id', id)
          .then();
      }

      this.toastService.info('Lead Updated', `Inquiry status changed to "${status}".`);
    }
  }

  getAllSubmissions(): Observable<ContactSubmission[]> {
    return this.submissions$;
  }
}
