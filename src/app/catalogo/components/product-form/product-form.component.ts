import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MyValidators } from 'src/utils/validators';
import { ProductService } from '../../../core/services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  image$: Observable<string>;

  constructor(
    private formBuilder: FormBuilder,
    private catalogoService: ProductService,
    private router: Router,
    private storage: AngularFireStorage
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

  uploadFile(event) {
    const file = event.target.files[0];
    const name = file.name;
    const fileRef = this.storage.ref(name);
    const task = this.storage.upload(name, file);

    task.snapshotChanges()
    .pipe(
      finalize(() => {
        this.image$ = fileRef.getDownloadURL();
        this.image$.subscribe(url => {
          console.log(url);
          this.form.get('image').setValue(url);
        })
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
