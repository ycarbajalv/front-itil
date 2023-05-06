import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistroItilExamenDTO } from 'src/app/Models/ExamenDTO';
import { ExamenService } from 'src/app/shared/Services/Examen/examen.service';

@Component({
  selector: 'app-modo-entrenamiento',
  templateUrl: './modo-entrenamiento.component.html',
  styleUrls: ['./modo-entrenamiento.component.scss']
})
export class ModoEntrenamientoComponent implements OnInit {

  constructor(
    private _router: Router,
    private _ExamenService:ExamenService
  ) { }
  public migaPan = [
    {
      titulo: 'Simulador ITIL-F',
      urlWeb: '/',
    },
    {
      titulo: 'Modo entrenamiento',
      urlWeb: '/ModoEntrenamiento',
    },
  ];
  public RegistrarExamenEnvio:RegistroItilExamenDTO={
    id:0,
    idSimuladorItilModo:0,
    nombreExamen:'',
    tiempo:0,
    idSimuladorItilDominio:0
  }
  public IdExamen=0;
  public userForm :UntypedFormGroup=new UntypedFormGroup({
    NombreSimulacion: new UntypedFormControl('',Validators.required),
  })
  public DominioSeleccionado=0;
  public SimulacionesTotales=0;
  public SimulacionesInconclusas=0;
  public CantMEntrenamiento=0;
  public ListaEntrenamiento:any;
  public TiempoTotalEstudio=0;
  public Hora=0;
  public Minuto=0;
  public HoraMostrar='';
  public MinutoMostrar='';
  public SimulacionesIncompletas:any;
  public ContSimulacionesIncompletas=0;
  public SimulacionesCompletadas:any;
  public ContSimulacionesCompletadas=0;
  public PromedioDominio=0
  public ContEntrenamiento=0;
  public Promedio=0;
  public BotonResgistrar=false;
  public ResultadosPorDominio:any;
  public Take=0;


  ngOnInit(): void {
    this.ListaExamenesIncompletos();
    this.ListaExamenesConcluidos();
    this.ListaExamenesPorModo();
    this.ObtenerPromedioDominioPorModo()
  }
  RegistrarExamen(){
    if(this.userForm.valid){
      this.BotonResgistrar=true;
      this.RegistrarExamenEnvio.id=0,
      this.RegistrarExamenEnvio.idSimuladorItilModo=2,
      this.RegistrarExamenEnvio.nombreExamen=this.userForm.get('NombreSimulacion')?.value;
      this.RegistrarExamenEnvio.tiempo=0,
      this.RegistrarExamenEnvio.idSimuladorItilDominio=0
      this._ExamenService.Registrar(this.RegistrarExamenEnvio).subscribe({
        next:(x)=>{
          this.IdExamen=x.id
          this._router.navigate(['/ModoEntrenamiento/EntrenamientoPregunta/'+this.IdExamen]);
        }
      })
    }
  }
  ListaExamenesPorModo(){
    this.TiempoTotalEstudio=0;
    this.SimulacionesInconclusas=0;
    this._ExamenService.ResumenSimulacionesPorModo(2).subscribe({
      next:(x)=>{
        this.SimulacionesTotales=x.simulacionesTotales
        this.SimulacionesInconclusas=x.simulacionesInconclusas
        this.TiempoTotalEstudio=x.tiempoPromedio
      },
      complete: () => {
        this.Hora = Math.floor(this.TiempoTotalEstudio / 3600);
        this.HoraMostrar = (this.Hora < 10) ? '0' + this.Hora : this.Hora.toString();
        this.Minuto = Math.floor((this.TiempoTotalEstudio / 60) % 60);
        this.MinutoMostrar = (this.Minuto < 10) ? '0' + this.Minuto : this.Minuto.toString();
      }
    });
  }

  ListaExamenesIncompletos(){
    this._ExamenService.ListaExamenesIncompletos().subscribe({
      next:(x)=>{
        this.SimulacionesIncompletas=x;
        this.SimulacionesIncompletas.forEach((y:any)=>{
          if(y.idEstadoExamen!=3 && y.idSimuladorItilModo==2){
            this.ContSimulacionesIncompletas=x.length;
          }
        })
      }
    })
  }
  ListaExamenesConcluidos(){
    this.ContEntrenamiento=0;
    this.PromedioDominio=0;
    this.Promedio=0;
    this._ExamenService.ListaExamenesConcluidos().subscribe({
      next:(x)=>{
        this.SimulacionesCompletadas=x;
        this.SimulacionesCompletadas.forEach((y:any)=>{
          if(y.idEstadoExamen==3 && y.idSimuladorItilModo==2){
            this.ContSimulacionesCompletadas=x.length;
            this.ContEntrenamiento=this.ContEntrenamiento+1;
            this.PromedioDominio=this.PromedioDominio+y.desempenio;
          }

        })
        this.Promedio=Math.floor(this.PromedioDominio/this.ContEntrenamiento);
        if(this.Promedio>=0){
          this.Promedio=this.Promedio;
        }
        else{
          this.Promedio=0;
        }
      }
    })
  }
  ObtenerPromedioDominioPorModo(){
    this._ExamenService.ObtenerPromedioDominioPorModo(2,this.Take).subscribe({
      next:(x)=>{
        this.ResultadosPorDominio=x
      }
    })
  }
}
