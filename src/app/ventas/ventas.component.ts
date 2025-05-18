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



   constructor(public userService: VentaService ){
     this.ventas = [];
     this.todasLasVentas = [];
     this.ventasFiltradas = [];
     
     
   }

   ngOnInit(): void {
     this.obtenerVentasInicial();
   }

   obtenerVentasInicial() {
    this.userService.getListadoVehiculo().subscribe({
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

  
  
  
  
  
  

showDialog() {
    this.visible = true;
  }

   

}
