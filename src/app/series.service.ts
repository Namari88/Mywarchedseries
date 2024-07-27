import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Nationality {
  label: string;
  value: string;
}

interface Series {
  id: string; // vagy number, attól függően, hogy milyen típusú az id a szerveren
  name: string;
  nationality: Nationality;
  imageUrl?: string;
  dateAdded: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  private apiUrl = 'https://your-api-url.com/api/series'; // Itt add meg a megfelelő API URL-t

  constructor(private http: HttpClient) { }

  getSeries(): Observable<Series[]> {
    return this.http.get<Series[]>(this.apiUrl);
  }

  addSeries(series: Series): Observable<Series> {
    return this.http.post<Series>(this.apiUrl, series);
  }

  updateSeries(id: string, series: Series): Observable<Series> {
    return this.http.put<Series>(`${this.apiUrl}/${id}`, series);
  }

  deleteSeries(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}