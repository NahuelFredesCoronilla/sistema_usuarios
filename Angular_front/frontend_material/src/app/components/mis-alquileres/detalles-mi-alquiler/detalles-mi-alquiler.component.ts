import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlquilerService } from 'src/app/services/alquiler.service';

@Component({
  selector: 'app-detalles-mi-alquiler',
  templateUrl: './detalles-mi-alquiler.component.html',
  styleUrls: ['./detalles-mi-alquiler.component.css']
})
export class DetallesMiAlquilerComponent {
  idAlquiler!:number;
  alquiler:any;
  constructor(private aRouter: ActivatedRoute,
    private alquilerService: AlquilerService){

  }
ngOnInit():void{
  this.idAlquiler = Number(this.aRouter.snapshot.paramMap.get('id'));
  console.log(this.idAlquiler)
  this.alquilerService.obtenerAlquilerPorId(this.idAlquiler).subscribe(resp=>{
    this.alquiler=resp;
    
   },
   error => {
    console.error('Error al obtener historial de alquileres:', error);
  }
   );
}

}
