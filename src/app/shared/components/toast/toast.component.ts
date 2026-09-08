import { Component, OnInit } from '@angular/core';
import { ToastService, ToastMessage } from '../../../core/services/toast.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  toasts$!: Observable<ToastMessage[]>;

  constructor(private toastService: ToastService) {}

  ngOnInit(): void {
    this.toasts$ = this.toastService.toasts$;
  }

  close(id: string): void {
    this.toastService.remove(id);
  }
}
