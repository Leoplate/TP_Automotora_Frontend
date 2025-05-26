import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  readonly apiUrl = 'https://localhost:6026/api/venta/';
  readonly apiUrlvehiculo = 'https://localhost:6026/api/venta/vehiculo';
  readonly apiUrlCliente = 'https://localhost:6026/api/cliente';
  readonly apiUrlProducto = 'https://localhost:6026/api/producto';
  readonly apiUrlListCliente = 'https://localhost:6026/api/venta/cliente';
  
  
  usuarios: any[];
  

  constructor(private http: HttpClient) {
    this.usuarios = [];
  }



  getVentas() {
    return this.http.get<any[]>(this.apiUrl);
  }

  getClientes() {
    return this.http.get<any[]>(this.apiUrlCliente);
  }

  getProducto() {
    return this.http.get<any[]>(this.apiUrlProducto);
  }

  saveVentas(venta: any) {
    console.log(venta)
    return this.http.post<any>(this.apiUrl, venta);
  
  }

  editVentas(venta: any) {
    
    var ruta = this.apiUrl+venta.id;
    
    return this.http.put<any>(ruta, venta);
  
  }

  deleteVentas(id: any) {
    
    
    var ruta = this.apiUrl+id.toString();
    
  console.log('URL de eliminación:', ruta); // Verifica la URL antes de la petición
  return this.http.delete<any>(ruta);
    
  }

getListadoVehiculo() {
    var ruta = this.apiUrlvehiculo;
    console.log(ruta);
    return this.http.get<any[]>(ruta);
}

getListadocliente() {
    var ruta = this.apiUrlListCliente;
    console.log(ruta);
    return this.http.get<any[]>(ruta);
}

}

