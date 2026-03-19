import { Component } from '@angular/core';
import { InvoiceService } from './invoice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  file!: File;
  list: any[] = [];
  pdfPassword: string = '';
  pdfSrc: any = null;
  showPdf = false;

  constructor(private service: InvoiceService) { }
  ngOnInit() {
    this.load();
  }
  selectFile(e: any) {
    this.file = e.target.files[0];
  }

  upload() {
    this.service.upload(this.file).subscribe(() => this.load());
  }

  load() {
    this.service.getAll().subscribe(res =>
      this.list = res);
  }

  viewFile(id: number, type: string) {
    if (type !== 'pdf') return;

    this.service.getPassword(id).subscribe(password => {

      console.log('RAW PASSWORD:', password);

      const cleanPassword = String(password).trim(); // 🔥 FIX

      console.log('CLEAN PASSWORD:', `[${cleanPassword}]`);

      this.service.view(id, type).subscribe(res => {

        const blob = new Blob([res], { type: 'application/pdf' });

        this.showPdf = false;

        this.pdfPassword = cleanPassword;

        this.pdfSrc = URL.createObjectURL(blob);

        setTimeout(() => {
          this.showPdf = true;
        }, 0);

      });

    });
  }

  downloadFile(id: number, type: string) {
    this.service.download(id, type).subscribe(res => {
      const blob = new Blob([res], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice.${type}`;
      a.click();

      URL.revokeObjectURL(url);
    });
  }
}
