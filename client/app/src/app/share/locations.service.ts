import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http: HttpClient) {}

  getProvinces(): Promise<any> {
    const url = 'https://ubicaciones.paginasweb.cr/provincias.json';
    return this.http.get(url).toPromise();
  }

  getCantons(province: string): Promise<any> {
    const url = `https://ubicaciones.paginasweb.cr/provincia/${province}/cantones.json`;
    return this.http.get(url).toPromise();
  }

  getDistritos(province: string, canton: string): Promise<any> {
    const url = `https://ubicaciones.paginasweb.cr/provincia/${province}/canton/${canton}/distritos.json`;
    return this.http.get(url).toPromise();
  }
  
}

// async loadProvincias() {
//   try {
//     const data: any = await this.locationService.getProvinces();
//     for (const key in data) {
//       this.provinces.push({ id: key, name: data[key] });
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// async onProvinceChange() {
//   this.cantons = [];
//   this.districts = [];
//   this.selectedCanton = '';
//   this.selectedProvince = this.signupForm.value.province;

//   if (this.selectedProvince) {
//     try {
//       const data: any = await this.locationService.getCantons(
//         this.selectedProvince
//       );
//       for (const key in data) {
//         this.cantons.push({ id: key, name: data[key] });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
// }

// async onCantonChange() {
//   this.districts = [];
//   this.selectedCanton = this.signupForm.value.canton;
//   if (this.selectedProvince && this.selectedCanton) {
//     try {
//       const data: any = await this.locationService.getDistritos(
//         this.selectedProvince,
//         this.selectedCanton
//       );
//       for (const key in data) {
//         this.districts.push({ id: key, name: data[key] });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
// }