import { ComponentFixture, TestBed } from '@angular/core/testing';

//import { VentasComponent } from './ventas.component';
import { PosventasComponent } from '../posventas/posventas.component';
describe('PosventasComponent', () => {
  let component: PosventasComponent;
  let fixture: ComponentFixture<PosventasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosventasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PosventasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
