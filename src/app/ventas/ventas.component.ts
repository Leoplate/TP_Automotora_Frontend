import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../service/venta.service';


import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-ventas',
  imports: [ReactiveFormsModule,FormsModule,TableModule,CommonModule,ButtonModule,DialogModule,PaginatorModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css',
  standalone: true,
})
export class VentasComponent implements OnInit{
   //clienteForm: FormGroup;
   //id: FormControl;
   
   //nombre:FormControl;
   //apellido:FormControl;
   //email:FormControl;
   //telefono:FormControl;
   //filtro:FormControl;
   leyenda = '-Listado de ventas:';
   filtroSeleccionado = "";
   ventas: any[];
   todasLasVentas: any[];
   ventasFiltradas: any[];
   listadoVentas: any[];
   listadoClientes: any[];
   foraneos: any[];
   productos: any[];
   visible: boolean = false;
   visibleDelete: boolean = false;
   visibleEditar: boolean = false;
   visibleListado: boolean = false;
   visibleListadoCliente: boolean = false;

   id = 0;
   clienteId: string = "";
   vehiculoId: string = "";
   total: string = "";
   hoy: string = new Date().toISOString().slice(0, 10);
   fecha: string = this.hoy;
   venta: any;
   nombreFiltro="";
   apellidoFiltro="";
   msgError="";
   
  first = 0; 
  rows = 10; 
  totalRecords = 120; 

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }



   constructor(public ventaService: VentaService ){
     this.ventas = [];
     this.todasLasVentas = [];
     this.ventasFiltradas = [];
     this.listadoVentas = [];
     this.listadoClientes = [];
     this.foraneos = [];
     this.productos = [];
     
   }

   ngOnInit(): void {
     this.obtenerVentasInicial();
     this.obtenerVentasInicialListado();
     this.obtenerVentasInicialListadoCliente();
     this.obtenerClientes();
     this.obtenerProducto();
   }

  obtenerVentasInicial() {
    this.ventaService.getVentas().subscribe({
      next: (data) => {
        this.todasLasVentas = data;
        this.ventas = data;
        this.ventasFiltradas = [...this.todasLasVentas]; 
        console.log(data);
        
      },
      error: (e) => {
        console.log("Error al obtener usuarios:", e);
      }
    });
  }

  obtenerVentasInicialListado() {
    this.ventaService.getListadoVehiculo().subscribe({
      next: (data) => {
        this.listadoVentas = data;
        //this.ventas = data;
        //this.ventasFiltradas = [...this.listadoVentas]; 
        console.log(data);
      },
      error: (e) => {
        console.log("Error al obtener ventas:", e);
      }
    });
  }

  obtenerVentasInicialListadoCliente() {
    this.ventaService.getListadocliente().subscribe({
      next: (data) => {
        this.listadoClientes = data;
        //this.ventas = data;
        //this.ventasFiltradas = [...this.listadoVentas]; 
        console.log(data);
      },
      error: (e) => {
        console.log("Error al obtener clientes:", e);
      }
    });
  }



  obtenerClientes() {
    this.ventaService.getClientes().subscribe({
      next: (data) => {
        this.foraneos = data;
        console.log(this.foraneos)
      },
      error: (e) => {
        console.log("Error al obtener usuarios:", e);
      }
    });
  
  }

  obtenerProducto() {
    this.ventaService.getProducto().subscribe({
      next: (data) => {
        this.productos = data;
        
      },
      error: (e) => {
        console.log("Error al obtener usuarios:", e);
      }
    });
  
  }
  
  
  filtrarVentas() {
  if (!this.nombreFiltro) {
    this.ventasFiltradas = [...this.todasLasVentas]; 
  } else {
    this.ventasFiltradas = this.todasLasVentas.filter(ventas =>
      ventas.clienteApellido.toLowerCase().includes(this.nombreFiltro.toLowerCase())
      
    );
    console.log(this.ventasFiltradas);
  }
  }
  
  
  
  

showDialog() {
    this.visible = true;
  }


hideDialog() {
    this.visible = false;
  }  



eliminarVentas(venta: any){
    this.visibleDelete = false;
    this.venta = {
      id: this.id,  
      clienteId: this.clienteId,
      vehiculoId: this.vehiculoId,
      fecha: this.fecha,
      total: this.total,
      
     }
  
  
  let id = venta ;
  this.ventaService.deleteVentas(id).subscribe({});
  window.location.reload();
  //this.showDialog();
  
}

editarVenta(){
     this.visibleEditar = false;
  
      this.venta = {
      id: this.id,  
      clienteId: this.clienteId,
      vehiculoId: this.vehiculoId,
      fecha: this.fecha,
      total: this.total,
      
     }
    this.ventaService.editVentas(this.venta).subscribe({
        next: (data) => {
        this.todasLasVentas = data;
      },
      error: (e) => {
        console.log("Error al modificar venta:", e);
      }
      });
      
         window.location.reload();
         //this.showDialog();
         
  }


crearVenta(){
   this.visible = false;
  
  this.venta = {
      id: this.id,  
      clienteId: this.clienteId,
      vehiculoId: this.vehiculoId,
      fecha: this.fecha,
      total: this.total,
      
     }
  this.ventaService.saveVentas(this.venta).subscribe({
    next: (data) => {
        this.todasLasVentas = data;
        
      },      
      error: (e) => {
        this.msgError="No hay stock del producto";
        alert("NO HAY STOCK DEL PRODUCTO!");
        console.log("Error al crear venta:", this.msgError);
      }
  });
  window.location.reload();
  //this.showDialog();

}


showDialogEdit(venta: any) {
    this.abrirModalEditar(venta);
    this.visibleEditar = true;
  }


abrirModalEditar(venta: any) {
    this.id = venta.id;
    this.clienteId = venta.clienteId;
    this.vehiculoId = venta.productoId;
    this.fecha = venta.fecha;
    this.total = venta.total;
    this.visibleEditar = true;
  }  


  showDialogListado(){
    this.visibleListado = true;
  }

  showDialogListadoCliente(){
    this.visibleListadoCliente = true;
    
  }
}


