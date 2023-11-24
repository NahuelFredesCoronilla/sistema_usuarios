import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl = 'http://localhost:8080/api/fileManager';

  constructor(private http: HttpClient) { }

  uploadFile(file: File, alquilerId: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('alquilerId', alquilerId.toString());

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    
    return this.http.post(`${this.baseUrl}/upload`, formData, { headers });
  }

  getFile(fileId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/files/${fileId}`, { responseType: 'arraybuffer' as 'json' });
  }

  getAllFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  uploadFileWithAlquiler(file: File, alquilerId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('alquilerId', alquilerId.toString());

    return this.http.post(`${this.baseUrl}/uploadWithAlquiler`, formData);
  }
}