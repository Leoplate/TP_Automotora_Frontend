import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { ProductoService } from '../../service/producto.service';

@Component({
  selector: 'app-productos',
  imports: [ReactiveFormsModule,FormsModule,TableModule,CommonModule,ButtonModule,DialogModule,PaginatorModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css',
  standalone: true,
})
export class ProductosComponent implements OnInit{
   //clienteForm: FormGroup;
   //id: FormControl;
   
   //nombre:FormControl;
   //apellido:FormControl;
   //email:FormControl;
   //telefono:FormControl;
   //filtro:FormControl;
   leyenda = '-Listado de productos:';
   filtroSeleccionado = "";
   productos: any[];
   todosLosProductos: any[];
   productosFiltrados: any[];
   visible: boolean = false;
   visibleDelete: boolean = false;
   visibleEditar: boolean = false;
   id = 0;
   name: string = "";
   price: number = 0 ;
   stock: number = 0;
   
   producto: any;
   nombreFiltro="";
   apellidoFiltro="";
   
   
  
  first = 0; 
  rows = 10; 
  totalRecords = 120; 

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }



   constructor(public productService: ProductoService ){
     this.productos = [];
     this.todosLosProductos = [];
     this.productosFiltrados = [];
     
     
   }

   ngOnInit(): void {
     this.obtenerUsuariosInicial();
   }

   obtenerUsuariosInicial() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.todosLosProductos = data;
        this.productos = data;
        this.productosFiltrados = [...this.todosLosProductos]; 
      },
      error: (e) => {
        console.log("Error al obtener productos:", e);
      }
    });
  }

  
  
  
  
  
  filtrarProductos() {
  if (!this.nombreFiltro) {
    this.productosFiltrados = [...this.todosLosProductos]; 
  } else {
    this.productosFiltrados = this.todosLosProductos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.nombreFiltro.toLowerCase()) 
    );
  }
}

showDialog() {
    this.visible = true;
  }

   
crearProducto() {
  this.visible = false;
  
  this.producto = {
  nombre: this.name,
  precio: this.price,
  stock: this.stock,
  };
  this.productService.saveProducts(this.producto).subscribe({
    next: (data) => {
        this.todosLosProductos = data;
      },
      error: (e) => {
        console.log("Error al crear productos:", e);
      }
  });
  window.location.reload();
}


showDialogDelete() {
    this.visibleDelete = true;
  }


showDialogEdit(producto: any) {
    this.abrirModalEditar(producto);
    this.visibleEditar = true;
  }


eliminarProducto(productoHtml: any){
        this.visibleDelete = false;
  
  this.producto = {  
  nombre: productoHtml.nombre,
  precio: productoHtml.precio,
  stock: productoHtml.stock,
  
  };
  
  let id = productoHtml ;
  this.productService.deleteProducts(id).subscribe({});
  window.location.reload();
  
   }

   

   abrirModalEditar(producto: any) {
    this.id = producto.id;
    this.name = producto.nombre;
    this.price = producto.precio;
    this.stock = producto.stock;
    this.visibleEditar = true;
  }


  editarProducto(){
      this.visibleEditar = false;
  
      this.producto = {
      id: this.id,  
      nombre: this.name,
      precio: this.price,
      stock: this.stock,
      };
      

      this.productService.editProducts(this.producto).subscribe({
        next: (data) => {
        this.todosLosProductos = data;
      },
      error: (e) => {
        console.log("Error al modificar productos:", e);
      }
      });
         window.location.reload();
  }

}
