import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  getClient(): SupabaseClient {
    return this.supabase;
  }

  // Convenient accessors for Angular services
  get client(): SupabaseClient {
    return this.supabase;
  }

  get isLive(): boolean {
    return !!this.supabase;
  }

  from(table: string) {
    return this.supabase.from(table);
  }

  storage(bucket: string) {
    return this.supabase.storage.from(bucket);
  }
}
