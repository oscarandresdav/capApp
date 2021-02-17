import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Catalogo } from '../catalogo/catalogo';
import { CatalogoService } from '../catalogo/catalogo.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: Catalogo;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catalogoService: CatalogoService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.fetchProduct(id);
    })
  }

  fetchProduct(id: string){
    this.catalogoService.getProduct(id)
    .subscribe(product => {
      this.product = product;
    })
  }

  onBack(): void {
    this.router.navigate(['/catalogo']);
  }

}
