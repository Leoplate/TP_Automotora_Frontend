import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
  
})


export class ClienteService {

  readonly apiUrl = 'https://localhost:6026/api/cliente';
  
  usuarios: any[];


  constructor(private http: HttpClient) {
    this.usuarios = [];
  }



  getUsers() {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveUsers(usuario: any) {
    console.log(usuario)
    return this.http.post<any>(this.apiUrl, usuario, {observe: 'response' });
  
  }

  editUsers(usuario: any) {
    
    var ruta = this.apiUrl+"/"+usuario.id;
    return this.http.put<any>(ruta, usuario, {observe: 'response' });
  
  }

  deleteUsers(id: any) {
    
    
    var ruta = this.apiUrl+"/"+id;
    
  console.log('URL de eliminación:', ruta); // Verifica la URL antes de la petición
  return this.http.delete<any>(ruta);
    
  }
}

