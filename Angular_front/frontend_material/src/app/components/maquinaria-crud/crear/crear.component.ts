import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MaquinariaService } from 'src/app/services/maquinaria.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private maquinariaService: MaquinariaService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      patente: ['', Validators.required],
      anio: ['', Validators.required],
      tipo: ['', Validators.required],
      capacidad: ['', Validators.required],
      precio:['', Validators.required]
      
    });
  }

  public crear_maquinaria() {
    if (this.form.valid) {
      const nuevaMaquinaria = this.form.value;

      this.maquinariaService.createMaquinaria(nuevaMaquinaria).subscribe(
        (response) => {
          console.log('Maquinaria creada con éxito:', response);
          this.snackBar.open('Maquinaria creada con éxito', '', { duration: 5000 });
          
          this.router.navigate(['/maquinaria']);
        },
        (error) => {
          console.error('Error al crear maquinaria:', error);
          this.snackBar.open('Error al crear maquinaria', '', { duration: 5000 });
        }
      );
    } else {
      this.snackBar.open('Completa el formulario correctamente', '', { duration: 5000 });
    }
  }
}
