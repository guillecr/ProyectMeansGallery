import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Gallery } from '../gallery';

/*
* No  es habitual pero en un mismo archivo se puede tener 2 o mas clases. En java igual pero no es habitual.
*/

// Clase de manejo de errores
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/**
 * Componentes que usará nuestro componente:
 * selector:
 * templateUrl: El archivo html de nuestro componente
 * styleUrls: Los archivos de estilos que usa nuestro componente
*/ 
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})

/**
 * Clase principal del componente Gallery
 */
export class GalleryComponent implements OnInit {
  // Declaración de variables globales de esta clase. Parecido a JS inializamos las variables que usaremos
  galleryForm: FormGroup;
  imageFile: File = null;
  imageTitle = '';
  imageDesc = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  constructor
    (
      private api: ApiService, // Recordar que es nuestra API de Angular donde tenemos definido las funciones para la conexión con nuestro servidor Express
      private formBuilder: FormBuilder,
      private router: Router
    ) 
    { }

  // ngOnInit() => Parecido al Main de Java
  ngOnInit(): void {
    this.galleryForm = this.formBuilder.group({
      imageFile : [null, Validators.required],
      imageTitle : [null, Validators.required],
      imageDesc : [null, Validators.required]
    });
  }

  onFormSubmit(): void {
    this.isLoadingResults = true; // Indicamos que estamos cargando los resultados
    /**
     * Esta funcion esta definida en nuestra api.services. Llamamos a la función addGallery que recibe 2 parametros,
     * uno de ellos es un objeto Gallery (definido la clase en gallery.ts) y la otra es el archivo de la imagen.
     * Le entregamos 2 parametros, uno es todo los datos del formulario (galleryForm.value), el segundo solo el archivo 
     * (galleryForm.get('imageFile').value._files[0])
     */
    this.api.addGallery(this.galleryForm.value, this.galleryForm.get('imageFile').value._files[0])
      .subscribe((res: any) => { // Recibimos cualquier cambio en la base de datos. 
        console.log(res);
        this.isLoadingResults = false;
        // Si nos devuelve el cuerpo, rederigimos al componente gallery-detail con el parametro del id
        if (res.body) {
          this.router.navigate(['/gallery-details', res.body._id]); 
        }
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  testGet(): void{
    this.router.navigate(['/gallery-all']);
  }
}
