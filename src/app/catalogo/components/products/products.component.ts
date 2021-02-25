import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Product } from 'src/app/core/models/product';
import { ProductFirebaseService } from 'src/app/core/services/product.firebase.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'cost',
    'stock_warehouse',
    'stock_office',
    'actions',
  ];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public form: FormGroup;
  private productList: Product[] = [];
  public productDetail: Product;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private firebaseService: ProductFirebaseService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProducts(): void {
    this.firebaseService.getProducts().subscribe((res) => {
      this.productList = res.map((product) => {
        return {
          ...(product.payload.doc.data() as Product),
          id: product.payload.doc.id,
        } as Product;
      });

      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openModal(content: TemplateRef<any>, productId: string): void {
    this.productDetail = this.productList.find(
      (product: Product) => product.id === productId
    );
    this.formInit(this.productDetail);
    this.modalService.open(content, { backdrop: 'static', centered: true });
  }

  formInit(data: Product): void {
    this.form = this.fb.group({
      name: [data ? data.name : '', Validators.required],
      detail: [data ? data.detail : ''],
      stock_office: [data ? data.stock_office : '', Validators.required],
      stock_warehouse: [data ? data.stock_warehouse : '', Validators.required],
      cost: [data ? data.cost : '', Validators.required],
      price: [data ? data.price : ''],
    });
  }

  addProduct(): void {
    this.firebaseService.addProduct(this.form.value).then();
  }

  updateProduct(productId: string): void {
    this.firebaseService.updateProduct(productId, this.form.value).then();
  }

  deleteProduct(productId: string): void {
    this.firebaseService.deleteProduct(productId).then();
  }
}
