import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Catalogo } from './catalogo';
import { CatalogoService } from './catalogo.service';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.css'],
})
export class CatalogoComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'stock', 'cost', 'actions'];
  dataSource: MatTableDataSource<Catalogo>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  products: Catalogo[] = [];

  constructor(private catalogoService: CatalogoService) {
  }

  ngOnInit() {
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
