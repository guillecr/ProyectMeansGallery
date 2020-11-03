import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { GalleryDetailsComponent } from './gallery-details/gallery-details.component';
import { GalleryAllComponent } from './gallery-all/gallery-all.component';


// Reglas de enrutamiento
const routes: Routes = [
  {
    path:'gallery',
    component:GalleryComponent,
    data:{title:'List of Sales'}
  },{
    path:'gallery-details/:id',
    component:GalleryDetailsComponent,
    data:{title:'Sales Details'}
  },{
    path:'',
    redirectTo:'/gallery',
    pathMatch:'full'
  },{
    path:'gallery-all',
    component:GalleryAllComponent,
    data:{title:'All'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
