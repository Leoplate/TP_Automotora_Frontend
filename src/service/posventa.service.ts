import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class PosventaService {

  readonly apiUrl = 'https://localhost:6026/api/posventa/';
  //readonly apiUrlvehiculo = 'https://localhost:6026/api/posventa/vehiculo';
  readonly apiUrlCliente = 'https://localhost:6026/api/cliente';
  readonly apiUrlTipo = 'https://localhost:6026/api/tipo';
  readonly apiUrlEstado = 'https://localhost:6026/api/estado';
  
  
  
  usuarios: any[];
  

  constructor(private http: HttpClient) {
    this.usuarios = [];
  }



  getPosventas() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClientes() {
    return this.http.get<any[]>(this.apiUrlCliente);
  }

  getTipos() {
    return this.http.get<any[]>(this.apiUrlTipo);
  }

  getEstados() {
    return this.http.get<any[]>(this.apiUrlEstado);
  }

  savePosventas(posventa: any) {
    
    return this.http.post<any>(this.apiUrl, posventa, {observe: 'response' });
  
  }

  editPosventas(posventa: any) {
    
    var ruta = this.apiUrl+posventa.id;
    
    return this.http.put<any>(ruta, posventa, {observe: 'response' });
  
  }

  deletePosventas(id: any) {
    
    
    var ruta = this.apiUrl+id;
    
  console.log('URL de eliminación:', ruta); // Verifica la URL antes de la petición
  return this.http.delete<any>(ruta);
    
  }

//getListadoVehiculo() {
//    var ruta = this.apiUrlvehiculo;
//    console.log(ruta);
//    return this.http.get<any[]>(ruta);
//}


}

