import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ToastService } from './toast.service';

export type StorageBucket = 'course-assets' | 'project-assets' | 'avatars' | 'student-documents';

export interface UploadResult {
  url: string;
  path: string;
  fileName: string;
  bucket: StorageBucket;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private toastService: ToastService) {}

  uploadFile(file: File, bucket: StorageBucket): Observable<UploadResult> {
    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${bucket}/${timestamp}_${cleanName}`;
    const mockUrl = URL.createObjectURL(file);

    return of({
      url: mockUrl,
      path,
      fileName: file.name,
      bucket
    }).pipe(
      delay(700),
      // Dispatches confirmation
    );
  }
}
