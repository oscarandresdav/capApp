import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../../core/models/product';
import { ProductService } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'stock_warehouse', 'cost', 'price', 'actions'];
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products: Product[] = [];

  constructor(private catalogoService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  fetchProducts() {
    this.catalogoService.getAllProducts().subscribe((products) => {
      this.products = products;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
