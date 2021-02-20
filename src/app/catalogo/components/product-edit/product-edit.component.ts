import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MyValidators } from 'src/utils/validators';
import { CatalogoService } from '../../services/catalogo.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string;

  constructor(
    private formBuilder: FormBuilder,
    private catalogoService: CatalogoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.catalogoService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue(product);
      })
    })
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.catalogoService.updateProduct(this.id, product)
      .subscribe((newProduct) => {
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
