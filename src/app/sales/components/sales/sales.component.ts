import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product';
import { Sale } from 'src/app/core/models/sale';
import { ProductFirebaseService } from 'src/app/core/services/product.firebase.service';
import { SalesService } from 'src/app/core/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = [
    'productName',
    'quantity',
    'productPrice',
    'createDate',
    'actions',
  ];
  productCtrl: FormControl = new FormControl();
  filteredProducts: Observable<Product[]>;
  dataSource: MatTableDataSource<Sale>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public formProduct: FormGroup;
  public formSales: FormGroup;

  private productList: Product[] = [];
  public productDetail: Product;

  private saleList: Sale[] = [];
  public saleDetail: Sale;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private productFirebaseService: ProductFirebaseService,
    private salesService: SalesService
  ) {
    this.formProduct = new FormGroup({
      productCtrl: new FormControl()
    });
    this.formSales = new FormGroup({
      quantity: new FormControl(),
      productId: new FormControl(),
      productName: new FormControl(),
      productPrice: new FormControl(),
    });
  }

  ngOnInit(): void {
    this.getSales();
    this.getProducts();

    this.filteredProducts = this.productCtrl.valueChanges.pipe(
      startWith(''),
      map((product) =>
        product ? this._filterProducts(product) : this.productList.slice()
      )
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getProducts(): void {
    this.productFirebaseService.getProducts().subscribe((res) => {
      this.productList = res.map((product) => {
        return {
          ...(product.payload.doc.data() as Product),
          id: product.payload.doc.id,
        } as Product;
      });
    });
  }

  getSales(): void {
    this.salesService.getSales().subscribe((res) => {
      this.saleList = res.map((item) => {
        return {
          ...(item.payload.doc.data() as Sale),
          id: item.payload.doc.id,
        } as Sale;
      });

      this.dataSource = new MatTableDataSource(this.saleList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });
  }

  loadProduct(productId: string) {
    this.productDetail = this.productList.find(
      (product: Product) => product.id === productId
    );
    this.formInitsales(this.productDetail);
  }


  formInitProduct(data: Product): void {
    this.formProduct = this.fb.group({
      productId: [data ? data.id : ''],
      name: [data ? data.name : '', Validators.required],
      detail: [data ? data.detail : ''],
      stock_office: [data ? data.stock_office : '', Validators.required],
      stock_warehouse: [data ? data.stock_warehouse : '', Validators.required],
      cost: [data ? data.cost : '', Validators.required],
      price: [data ? data.price : ''],
    });
  }

  formInitsales(data: any): void {
    this.formSales = this.fb.group({
      quantity: [1, [Validators.required, Validators.min(1)]],
      productId: [data ? data.id : '', Validators.required],
      productName: [data ? data.name : '', Validators.required],
      productPrice: [data ? data.price : '', Validators.required],
      createDate: [new Date()],
      modifiedDate: [new Date()],
    });
  }

  private _filterProducts(value: string): Product[] {
    const filterValue = value.toLowerCase();

    return this.productList.filter((product) =>
      product.name.toLowerCase().includes(filterValue)
    );
  }

  openModal(content: TemplateRef<any>, saleId: string): void {
    this.saleDetail = this.saleList.find(
      (sale: Sale) => sale.id === saleId
    );
    this.modalService.open(content, { backdrop: 'static', centered: true });
  }

  addSale(event: Event): void {
    event.preventDefault();
    if (this.formSales.valid) {
      this.salesService.addSale(this.formSales.value).then();
    }
    this.productCtrl.reset();
    this.formSales.reset();
  }

  updateProduct(productId: string): void {
    this.productFirebaseService.updateProduct(productId, this.formProduct.value).then();
  }

  deleteSale(saleId: string): void {
    this.salesService.deleteSale(saleId).then();
  }
}
