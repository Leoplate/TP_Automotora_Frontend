import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  readonly apiUrl = 'https://localhost:6026/api/producto';
  
  productos: any[];
  

  constructor(private http: HttpClient) {
    this.productos = [];
  }



  getProducts() {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveProducts(producto: any) {
    console.log(producto)
    return this.http.post<any>(this.apiUrl, producto, {observe: 'response' });
  
  }

  editProducts(producto: any) {
    
    var ruta = this.apiUrl+"/"+producto.id;
    return this.http.put<any>(ruta, producto, {observe: 'response' });
  
  }

  deleteProducts(id: any) {
    
    
    var ruta = this.apiUrl+"/"+id;
    
  console.log('URL de eliminación:', ruta); // Verifica la URL antes de la petición
  return this.http.delete<any>(ruta);
    
  }
}

