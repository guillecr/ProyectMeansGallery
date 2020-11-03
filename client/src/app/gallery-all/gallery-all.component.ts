import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Gallery } from '../gallery';

@Component({
  selector: 'app-gallery-all',
  templateUrl: './gallery-all.component.html',
  styleUrls: ['./gallery-all.component.scss']
})
export class GalleryAllComponent implements OnInit {
  isLoadingResults = true;
  gallery: Gallery[] = [{ _id: '', imageUrl: '', imageTitle: '', imageDesc: '', uploaded: null }];
  constructor(
    private api: ApiService // Para la petición
  ) { }


  getAll(): void{
    this.api.getGallery()
    .subscribe((data: any) => {
      console.log(data);
      this.gallery = data;
      this.isLoadingResults = false;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }
    
}
