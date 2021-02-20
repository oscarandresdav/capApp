import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css'],
})
export class ProductDeleteComponent implements OnInit {
  product: Product;
  id: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private catalogoService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;
      this.fetchProduct(this.id);
    });
  }

  fetchProduct(id: string): void {
    this.catalogoService.getProduct(id).subscribe((product) => {
      this.product = product;
    });
  }

  onBack(): void {
    this.router.navigate(['/catalogo']);
  }

  onDelete(): void {
    this.catalogoService.deleteProduct(this.id).subscribe((res) => {
      console.log(res);
    });
    this.router.navigate(['/catalogo']);
  }
}
