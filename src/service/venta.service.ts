import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  readonly apiUrl = 'https://localhost:6026/api/venta/vehiculo';
  readonly apiUrlvehiculo = 'https://localhost:6026/api/venta/vehiculo';
  
  usuarios: any[];
  

  constructor(private http: HttpClient) {
    this.usuarios = [];
  }



  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveUsers(usuario: any) {
    console.log(usuario)
    return this.http.post<any>(this.apiUrl, usuario);
  
  }

  editUsers(usuario: any) {
    
    var ruta = this.apiUrl+"/"+usuario.id;
    return this.http.put<any>(ruta, usuario);
  
  }

  deleteUsers(id: any) {
    
    
    var ruta = this.apiUrl+"/"+id;
    
  console.log('URL de eliminación:', ruta); // Verifica la URL antes de la petición
  return this.http.delete<any>(ruta);
    
  }

getListadoVehiculo() {
    var ruta = this.apiUrlvehiculo;
    console.log(ruta);
    return this.http.get<any[]>(this.apiUrl);
}


}

