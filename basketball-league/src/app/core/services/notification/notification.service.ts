import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showSuccess(message: string): void {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification success';
    notificationElement.textContent = message;

    document.body.appendChild(notificationElement);

    setTimeout(() => {
      document.body.removeChild(notificationElement);
    }, 3000);
  }

  showError(message: string): void {
    const notificationElement = document.createElement('div');
    notificationElement.className = 'notification error';
    notificationElement.textContent = message;

    document.body.appendChild(notificationElement);

    setTimeout(() => {
      document.body.removeChild(notificationElement);
    }, 3000);
  }

}
