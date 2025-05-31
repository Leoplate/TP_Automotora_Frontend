import { Component, OnInit } from '@angular/core';
import { VentaService } from '../../service/venta.service';


import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { PosventaService } from '../../service/posventa.service';

@Component({
  selector: 'app-posventas',
  imports: [ReactiveFormsModule,FormsModule,TableModule,CommonModule,ButtonModule,DialogModule,PaginatorModule],
  templateUrl: './posventas.component.html',
  styleUrl: './posventas.component.css',
  standalone: true,
})
export class PosventasComponent implements OnInit{
   //clienteForm: FormGroup;
   //id: FormControl;
   
   //nombre:FormControl;
   //apellido:FormControl;
   //email:FormControl;
   //telefono:FormControl;
   //filtro:FormControl;
   leyenda = '-Listado de ventas:';
   filtroSeleccionado = "";
   posventas: any[];
   todasLasPosventas: any[];
   posventasFiltradas: any[];
   listadoPosventas: any[];
   foraneos: any[];
   tipos: any[];
   estados: any[];
   visible: boolean = false;
   visibleDelete: boolean = false;
   visibleEditar: boolean = false;
   visibleListado: boolean = false;

   id = 0;
   clienteId: string = "";
   tipoid: string = "";
   estadoid: string = "";
   total: string = "";
   hoy: string = new Date().toISOString().slice(0, 10);
   fecha: string =  this.hoy;
   posventa: any;
   nombreFiltro="";
   apellidoFiltro="";
   idFiltro="";
   msgError="";
   
  first = 0; 
  rows = 10; 
  totalRecords = 120; 

    onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
    }



   constructor(public posventaService: PosventaService ){
     this.posventas = [];
     this.todasLasPosventas = [];
     this.posventasFiltradas = [];
     this.listadoPosventas = [];
     this.foraneos = [];
     this.tipos = [];
     this.estados = [];
     
   }

   ngOnInit(): void {
     this.obtenerPosventasInicial();
     this.obtenerClientes();
     this.obtenerTipos();
     this.obtenerEstados();
   }

  obtenerPosventasInicial() {
    this.posventaService.getPosventas().subscribe({
      next: (data) => {
        this.todasLasPosventas = data;
        this.todasLasPosventas.sort((a, b) => a.id - b.id);
        this.posventas = data;
        this.posventasFiltradas = [...this.todasLasPosventas]; 
        console.log(data);
        
      },
      error: (e) => {
        console.log("Error al obtener usuarios:", e);
      }
    });
  }

  


  obtenerClientes() {
    this.posventaService.getClientes().subscribe({
      next: (data) => {
        this.foraneos = data;
        console.log(this.foraneos)
      },
      error: (e) => {
        console.log("Error al obtener usuarios:", e);
      }
    });
  }


  obtenerTipos() {
    this.posventaService.getTipos().subscribe({
      next: (data) => {
        this.tipos = data;
        console.log(this.tipos)
      },
      error: (e) => {
        console.log("Error al obtener tipos:", e);
      }
    });
  
  }

  obtenerEstados() {
    this.posventaService.getEstados().subscribe({
      next: (data) => {
        this.estados = data;
        console.log(this.estados)
      },
      error: (e) => {
        console.log("Error al obtener estados:", e);
      }
    });
  
  }
  
  
  filtrarPosventas() {
  if (!this.nombreFiltro && !this.idFiltro) {
    this.posventasFiltradas = [...this.todasLasPosventas]; 
  } else {
    //this.posventasFiltradas = this.todasLasPosventas.filter(posventas =>
    //  posventas.clienteApellido.toLowerCase().includes(this.nombreFiltro.toLowerCase())
      
    let idString = this.idFiltro.toString();
       
    this.posventasFiltradas = this.todasLasPosventas.filter(posventas =>
      posventas.clienteApellido.toLowerCase().includes(this.nombreFiltro.toLowerCase()) && posventas.id.toString().startsWith(idString))

    //);
    console.log(this.posventasFiltradas);
  }
  }
  
  
  
  

showDialog() {
    this.visible = true;
  }


 



eliminarPosventas(venta: any){
    this.visibleDelete = false;
    this.posventa = {
      id: this.id,  
      clienteId: this.clienteId,
      fecha: this.fecha,
      tipoid: this.tipoid,
      estadoid: this.estadoid,
      
     }
  
  
  let id = venta ;
  this.posventaService.deletePosventas(id).subscribe({});
  this.ngOnInit();
  window.location.reload();
  
}

editarPosventa(){
     this.limpiarPopUpModi();
     //this.visibleEditar = false;
      //id:  
      this.posventa = { 
      id: this.id,
      clienteId: this.clienteId,
      fecha: this.fecha,
      tipoid: parseInt(this.tipoid,10),
      estadoid: parseInt(this.estadoid, 10),
      
     }
     console.log(this.posventa);
    this.posventaService.editPosventas(this.posventa).subscribe({
        next: (response) => {
        this.todasLasPosventas = response.body;
        this.todasLasPosventas.sort((a, b) => a.id - b.id);
        this.hideDialogModi();
        this.ngOnInit();
      },
      error: (e) => {
        this.msgError=e.error;
        if(e.error.status == 400){
           this.msgError= "Datos erroneos";
        }
        
      }
      });
         this.ngOnInit();
         //window.location.reload();
         
  }


crearPosventa(){
   //this.visible = false;
  this.msgError="";
  this.posventa = {
      id: this.id,  
      clienteId: this.clienteId,
      fecha: this.fecha,
      tipoid: this.tipoid,
      estadoid: this.estadoid,
      
     }
  this.posventaService.savePosventas(this.posventa).subscribe({
    next: (response) => {
        //this.todasLasPosventas = response.body;
        //this.todasLasPosventas.sort((a, b) => a.id - b.id);
        this.hideDialog();
        this.ngOnInit();
      },      
      error: (e) => {
        this.msgError=e.error;
        if(e.error.status == 400){
           this.msgError= "Datos erroneos";
        }
        //alert("NO HAY STOCK DEL PRODUCTO!");
        //console.log("Error al crear posventa:", this.msgError);
      }
  });
  //this.limpiarPopUpCarga();
  this.ngOnInit();
  //window.location.reload();

}


showDialogEdit(posventa: any) {
    this.abrirModalEditar(posventa);
    this.visibleEditar = true;
  }


abrirModalEditar(posventa: any) {
    this.id = posventa.id;
    this.clienteId = posventa.clienteId;
    this.fecha = posventa.fecha;
    this.tipoid = posventa.tipoid;
    this.estadoid = posventa.estadoid;
    this.visibleEditar = true;
  }  


  showDialogListado(){
    this.visibleListado = true;
  }

  limpiarPopUpCarga(){
    this.id = 0;
   this.clienteId = "";
   this.tipoid = "";
   this.estadoid="";
   this.hoy = new Date().toISOString().slice(0, 10);
   this.fecha = this.hoy;
   this.msgError = "";
  }

  limpiarPopUpModi(){
  this.msgError="";
  //this.visibleEditar= false;
  
  }

  hideDialogModi() {
    this.visibleEditar = false;
    this.limpiarPopUpModi();
  }  

  hideDialog() {
    this.visible = false;
    this.limpiarPopUpCarga();
  }  

}


