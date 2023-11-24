import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Maquinaria } from 'src/app/interfaces/Maquinaria';
import { MaquinariaService } from 'src/app/services/maquinaria.service';

@Component({
  selector: 'app-edit-maquinaria',
  templateUrl: './edit-maquinaria.component.html',
  styleUrls: ['./edit-maquinaria.component.css']
})
export class EditMaquinariaComponent {
  form: FormGroup;
  id: number;
  maquinariaData!: Maquinaria;

  constructor(
    private fb: FormBuilder,
    private maquinariaService: MaquinariaService,
    private router: Router,
    private snackBar: MatSnackBar,
    private aRouter: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      patente: ['', Validators.required],
      anio: ['', Validators.required],
      tipo: ['', Validators.required],
      capacidad: ['', Validators.required],
      precio:['', Validators.required], 

    });
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.maquinariaService.getMaquinaria(this.id).subscribe(
      (data) => {
        this.maquinariaData = data;
        this.populateForm(); 
      },
      (error) => {
        console.error('Error al obtener datos de maquinaria:', error);
        this.snackBar.open('Error al obtener datos de maquinaria: ' + error.message, '', { duration: 5000 });
      }
    );
  }
  private populateForm() {
    this.form.setValue({
      marca: this.maquinariaData.marca,
      modelo: this.maquinariaData.modelo,
      patente: this.maquinariaData.patente,
      anio: this.maquinariaData.anio,
      tipo: this.maquinariaData.tipo,
      capacidad: this.maquinariaData.capacidad,
      precio: this.maquinariaData.precio,
    });
  }




  update_maquinaria() {

    if (this.form.valid) {

      const updatedMaquinaria = this.form.value;


      this.maquinariaService
        .updateMaquinaria(this.id, updatedMaquinaria).subscribe(
          (response) => {
            console.log('Maquinaria actualizada con éxito:', response);
            this.snackBar.open("maquinaria actualizada con exito", '', { duration: 5000 });
            this.router.navigate(['maquinaria']);
          },
          (error) => {
            console.error('Error al actualizar la maquinaria:', error);
            this.snackBar.open("Error al añadir maquinaria", 'Error', { duration: 5000 });
          }
        );
    }
  }
}

