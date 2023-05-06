export interface RegistroItilExamenDetalleDTO{
  id:number,
  idSimuladorItilExamen:number,
  idSimuladorItilDominio:number,
  idSimuladorItilTarea?:number,
  idSimuladorItilPregunta:number,
  ejecutado:boolean,
  idSimuladorItilPreguntaRespuesta?:number,
  puntaje?:number,
  idAspNetUsers:string,
  usuario:string
}
