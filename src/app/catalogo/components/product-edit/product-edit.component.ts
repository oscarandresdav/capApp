import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MyValidators } from 'src/utils/validators';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  image$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private catalogoService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private storage: AngularFireStorage
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.catalogoService.getProduct(this.id).subscribe((product) => {
        this.form.patchValue(product);
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.catalogoService
        .updateProduct(this.id, product)
        .subscribe((newProduct) => {
          console.log(newProduct);
          this.router.navigate(['./catalogo']);
        });
    }
    console.log(this.form.value);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const name = file.name;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.image$ = fileRef.getDownloadURL();
          this.image$.subscribe((url) => {
            console.log(url);
            this.form.get('image').setValue(url);
          });
        })
      )
      .subscribe();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      detail: '',
      stock_office: ['', [Validators.required]],
      stock_warehouse: ['', [Validators.required]],
      cost: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      image: [''],
    });
  }

  get priceField() {
    return this.form.get('price');
  }
}
