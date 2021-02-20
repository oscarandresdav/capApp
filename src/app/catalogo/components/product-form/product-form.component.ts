import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from 'src/utils/validators';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private catalogoService: ProductService,
    private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.catalogoService.createProduct(product).subscribe((newProduct) => {
        console.log(newProduct);
        this.router.navigate(['./catalogo']);
      });
    }
    console.log(this.form.value);
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      detail: '',
      stock: ['', [Validators.required]],
      minimum_stock_level: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
    });
  }

  get priceField() {
    return this.form.get('price');
  }
}
