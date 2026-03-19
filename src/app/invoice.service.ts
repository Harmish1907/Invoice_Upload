import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  API = 'https://localhost:7263/api/invoice';

  constructor(private http: HttpClient) {}

  upload(file: File) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.API}/upload`, form);
  }

  getAll() {
    return this.http.get<any[]>(this.API);
  }

  view(id: number, type: string) {
    return this.http.get(`${this.API}/view/${id}/${type}`, {
      responseType: 'blob'
    });
  }
  getPassword(id: number) {
  return this.http.get<string>(`${this.API}/password/${id}`);
}
  download(id: number, type: string) {
    return this.http.get(`${this.API}/download/${id}/${type}`, {
      responseType: 'blob',
      
    });
  }
}
