import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Gallery } from './gallery';

const apiUrl = 'http://localhost:3000/gallery'; // Direccion de nuestra api

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Zona de variables globales

  constructor(private http:HttpClient) { }

  // METODOS
  // === [START] Manejador de errores ===
  private handleError(error: HttpErrorResponse): any{
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred:',error.error.message);
    }else{
      console.error(
        `Backend returned code ${error.status},`+
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
  // [END] Manejador errores

  // [START] Metodo de obtención de datos
  getGalleryById(id: string): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Gallery>(url).pipe(
      catchError(this.handleError)
    );
  }
  //[END]

  //[STAR] Metodo de añadir foto
  addGallery(gallery: Gallery, file: File): Observable<any> { // Los obtenemos del Front
    // Montamos nuestros datos que enviaremos en una clase formData. Con la función .append() vamos añadiendo mas elementos
    const formData = new FormData();
    formData.append('file', file);
    formData.append('imageTitle', gallery.imageTitle);
    formData.append('imageDesc', gallery.imageDesc);
    const header = new HttpHeaders();
    const params = new HttpParams();

    // Opciones
    const options = {
      params,
      reportProgress: true,
      headers: header
    };

    /**  Montamos los parametros a enviar a nuestra API con el constructor HttpRequest. En ella indicamos
     *  - Method: En este caso es POST
     *  - Dirección de la API
     *  - Datos a enviar, en formato formData
     *  - Opciones
     * 
     * Al final, devolvemos al componente que ha llamado a la función la respuesta de la API
     */
    const req = new HttpRequest('POST', apiUrl, formData, options); 
    return this.http.request(req); // Enviamos el resultado de la petición.
  }
  //[END]
}
