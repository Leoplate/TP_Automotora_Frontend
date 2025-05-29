import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../service/cliente.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { VentaService } from '../service/venta.service';

@Component({
  selector: 'app-clientes',
  imports: [ReactiveFormsModule,FormsModule,TableModule,CommonModule,ButtonModule,DialogModule,PaginatorModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
  standalone: true,
})
export class ClientesComponent implements OnInit{
    
   //clienteForm: FormGroup;
   //id: FormControl;
   
   //nombre:FormControl;
   //apellido:FormControl;
   //email:FormControl;
   //telefono:FormControl;
   //filtro:FormControl;
   leyenda = '-Listado de clientes:';
   filtroSeleccionado = "";
   usuarios: any[];
   todosLosUsuarios: any[];
   usuariosFiltrados: any[];
   visible: boolean = false;
   visibleDelete: boolean = false;
   visibleEditar: boolean = false;
   id = 0;
   username: string = "";
   surname: string = "";
   phone: string = "";
   modalEmail: string = "";
   usuario: any;
   nombreFiltro="";
   apellidoFiltro="";
   msgError= "";
   
  
  first = 0; 
  rows = 10; 
  totalRecords = 120; 

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }



   constructor(public userService: ClienteService ){
     this.usuarios = [];
     this.todosLosUsuarios = [];
     this.usuariosFiltrados = [];
     
     
   }

   ngOnInit(): void {
     this.obtenerUsuariosInicial();
   }

   obtenerUsuariosInicial() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.todosLosUsuarios = data;
        this.todosLosUsuarios.sort((a, b) => a.id - b.id);
        this.usuarios = data;
        this.usuariosFiltrados = [...this.todosLosUsuarios]; 
      },
      error: (e) => {
        console.log("Error al obtener usuarios:", e);
      }
    });
  }

  
  
  
  
  
  filtrarUsuarios() {
  if (!this.nombreFiltro && !this.apellidoFiltro) {
    this.usuariosFiltrados = [...this.todosLosUsuarios]; 
  } else {
    this.usuariosFiltrados = this.todosLosUsuarios.filter(usuario =>
      usuario.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase()) &&
      usuario.apellido.toLowerCase().includes(this.apellidoFiltro.toLowerCase())
    );
  }
}

showDialog() {
    this.visible = true;
  }

   
crearUsuario() {
  this.visible = false;
  
  this.usuario = {
  nombre: this.username,
  apellido: this.surname,
  telefono: this.phone,
  email: this.modalEmail
  };
  this.userService.saveUsers(this.usuario).subscribe({
    next: (response) => {
        //this.todosLosUsuarios = response.body;
        this.ngOnInit();
      },
      error: (e) => {
        if(e.error.status == 400){
           this.msgError= "Datos erroneos";
        }
       
        
      }
  });
  window.location.reload();
  this.ngOnInit();
}


showDialogDelete() {
    this.visibleDelete = true;
  }


showDialogEdit(usuario: any) {
    this.abrirModalEditar(usuario);
    this.visibleEditar = true;
  }


eliminarUsuario(usuarioHtml: any){
        this.visibleDelete = false;
  
  this.usuario = {  
  nombre: usuarioHtml.nombre,
  apellido: usuarioHtml.apellido,
  telefono: usuarioHtml.telefono,
  email: usuarioHtml.email
  };
  
  let id = usuarioHtml ;
  this.userService.deleteUsers(id).subscribe({});
  this.ngOnInit();
  window.location.reload();
  
   }

   

   abrirModalEditar(usuario: any) {
    this.id = usuario.id;
    this.username = usuario.nombre;
    this.surname = usuario.apellido;
    this.phone = usuario.telefono;
    this.modalEmail = usuario.email;
    this.visibleEditar = true;
  }


  editarUsuario(){
      this.visibleEditar = false;
  
      this.usuario = {
      id: this.id,  
      nombre: this.username,
      apellido: this.surname,
      telefono: this.phone,
      email: this.modalEmail
      };
      

      this.userService.editUsers(this.usuario).subscribe({
        next: (response) => {
        this.todosLosUsuarios = response.body;
        this.ngOnInit();
      },
      error: (e) => {
        console.log("Error al modificar usuarios:", e);
      }
      });
         window.location.reload();
         this.ngOnInit();
  }

  

}
