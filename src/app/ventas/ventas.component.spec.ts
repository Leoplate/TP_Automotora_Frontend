import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { VentasComponent } from './ventas.component';
import { VentasComponent } from './ventas.component';
describe('ClientesComponent', () => {
  let component: VentasComponent;
  let fixture: ComponentFixture<VentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
