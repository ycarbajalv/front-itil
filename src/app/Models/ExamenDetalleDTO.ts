export interface RegistroAdsaExamenDetalleDTO{
  id:number,
  idSimuladorAdsaExamen:number,
  idSimuladorAdsaDominio:number,
  idSimuladorAdsaTarea?:number,
  idSimuladorAdsaPregunta:number,
  ejecutado:boolean,
  idSimuladorAdsaPreguntaRespuesta?:number,
  puntaje?:number,
  idAspNetUsers:string,
  usuario:string
}
