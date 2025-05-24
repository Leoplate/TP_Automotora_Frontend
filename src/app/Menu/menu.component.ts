import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ClientesComponent } from '../../clientes/clientes.component';
import { VentasComponent }  from '../ventas/ventas.component';
import { ProductosComponent } from '../productos/productos.component';
import { PosventasComponent }  from '../posventas/posventas.component'; 

@Component({
  selector: 'app-menu',
  imports: [ReactiveFormsModule,FormsModule,TableModule,CommonModule,ButtonModule,ClientesComponent,ProductosComponent,VentasComponent,PosventasComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  standalone: true,
})
export class MenuComponent implements OnInit{
   isClienteVisible= false;
   isProductoVisible= false;
   isVentaVisible= false;
   isPosventaVisible= false;
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
   
   
  
  first = 0; 
  rows = 10; 
  totalRecords = 120; 

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }



   constructor(){
     this.usuarios = [];
     this.todosLosUsuarios = [];
     this.usuariosFiltrados = [];
     
     
   }

   ngOnInit(): void {
     
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



   



showDialogDelete() {
    this.visibleDelete = true;
  }


showDialogEdit(usuario: any) {
    this.abrirModalEditar(usuario);
    this.visibleEditar = true;
  }



   

   abrirModalEditar(usuario: any) {
    this.id = usuario.id;
    this.username = usuario.nombre;
    this.surname = usuario.apellido;
    this.phone = usuario.telefono;
    this.modalEmail = usuario.email;
    this.visibleEditar = true;
  }

showCliente() {
     this.isClienteVisible = !this.isClienteVisible;  
     this.isProductoVisible= false;
     this.isVentaVisible= false;
     this.isPosventaVisible= false;
}

showProducto() {
     this.isProductoVisible = !this.isProductoVisible;  
     this.isClienteVisible= false;
     this.isVentaVisible= false;
     this.isPosventaVisible= false;
}

showVenta() {
     this.isVentaVisible = !this.isVentaVisible;  
     this.isClienteVisible= false;
     this.isProductoVisible= false;
     this.isPosventaVisible= false;
}     

showPosventa() {
     this.isPosventaVisible = !this.isPosventaVisible;  
     this.isClienteVisible= false;
     this.isProductoVisible= false;
     this.isVentaVisible= false;
}     
  

}
