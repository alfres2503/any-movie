import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  // https://web.archive.org/web/20230330004601/https://programando.paginasweb.cr/2016/04/29/lista-de-provincias-cantones-y-distritos-de-costa-rica-en-formato-json/

  // Los observables son una colección de valores que pueden ser emitidos de forma asíncrona.
  // Son mejores que las promesas porque permiten operadores como map, filter, reduce, etc.

  getProvinces(): Observable<any> {
    const url = 'https://ubicaciones.paginasweb.cr/provincias.json';
    return this.http.get<any>(url);
  }

  getCantons(province: string): Observable<any> {
    const url = `https://ubicaciones.paginasweb.cr/provincia/${province}/cantones.json`;
    return this.http.get<any>(url);
  }

  getDistricts(province: string, canton: string): Observable<any> {
    const url = `https://ubicaciones.paginasweb.cr/provincia/${province}/canton/${canton}/distritos.json`;
    return this.http.get<any>(url);
  }
}
