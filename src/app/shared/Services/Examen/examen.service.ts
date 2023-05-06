import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroItilExamenDTO, RegistroItilExamenRespuestaDTO } from 'src/app/Models/ExamenDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  public urlBase=environment.url_api+'Examen';
  constructor(private http: HttpClient) { }

  public Registrar(Json:RegistroItilExamenDTO):Observable<any>{
    return this.http.post<any>(this.urlBase+'/Registrar',Json);
  }
  public ObtenerExamenDetallePreguntaPorId(IdSimulacion:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerExamenDetallePreguntaPorId/'+IdSimulacion);
  }

  public RegistrarRespuestaSeleccion(Json:RegistroItilExamenRespuestaDTO):Observable<any>{
    return this.http.post<any>(this.urlBase+'/RegistrarRespuestaSeleccion',Json);
  }
  public ObtenerExamenReporteResultadosPorId(IdExamen:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerExamenReporteResultadosPorId/'+IdExamen);
  }
  public ObtenerMejorExamenPorUsuario():Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerMejorExamenPorUsuario');
  }
  public ObtenerNivelUsuario():Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerNivelUsuario');
  }
  public ListaExamenesPorModo(IdModo:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ListaExamenesPorModo/'+IdModo);
  }
  public ListaExamenesIncompletos():Observable<any>{
    return this.http.get<any>(this.urlBase+'/ListaExamenesIncompletos');
  }
  public ListaExamenesConcluidos():Observable<any>{
    return this.http.get<any>(this.urlBase+'/ListaExamenesConcluidos');
  }
  public ObtenerListaRankingExamenPorIntento(Intento:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerListaRankingExamenPorIntento/'+Intento);
  }
  // public ObtenerPromedioDominioPorModo(Modo:number):Observable<any>{
  //   return this.http.get<any>(this.urlBase+'/ObtenerPromedioDominioPorModo/'+Modo);
  // }
  public ObtenerRespuestaExamenDetallePreguntaPorId(id:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerRespuestaExamenDetallePreguntaPorId/'+id);
  }
  public ObtenerPromedioIntento():Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerPromedioIntento');
  }
  public ObtenerPromedioDominioPorModo(Modo:number, Take:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ObtenerPromedioDominioPorModoV2/'+Modo+"/"+Take);
  }
  public ResumenSimulacionesPorModo(IdModo:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ResumenSimulacionesPorModo/'+IdModo);
  }
  public ListaExamenesPorModoResumen(IdModo:number):Observable<any>{
    return this.http.get<any>(this.urlBase+'/ListaExamenesPorModoResumen/'+IdModo);
  }
}
