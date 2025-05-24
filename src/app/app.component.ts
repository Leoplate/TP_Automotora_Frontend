import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientesComponent } from '../clientes/clientes.component';
import { VentasComponent } from './ventas/ventas.component';
import { ProductosComponent } from './productos/productos.component';
import { PosventasComponent } from './posventas/posventas.component';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './Menu/menu.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,ClientesComponent,ReactiveFormsModule,VentasComponent,ProductosComponent,MenuComponent,PosventasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})
export class AppComponent implements OnInit {
  clienteForm: FormGroup;
  id: FormControl;
  name: FormControl;
  apellido: FormControl;
  email: FormControl;
  telefono: FormControl

  constructor(){
    this.id = new FormControl('');
    this.apellido = new FormControl('');
    this.name = new FormControl('');
    this.email = new FormControl('');
    this.telefono = new FormControl('');
    this.clienteForm = new FormGroup({
        id: this.id,
        apellido: this.apellido,
        name: this.name,
        email: this.email,
        telefono: this.telefono,
    });
  }

  ngOnInit(): void {
    
  }
}
