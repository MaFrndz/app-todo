import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';

export interface Product {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DragDropModule,
    NgFor,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  availableProducts: Product[] = [];
  selectedProducts: Product[] = [];
  draggedProduct: Product | null = null;

  ngOnInit() {
    this.selectedProducts = [];
    this.availableProducts = [
      { id: '1', name: 'Black Watch' },
      { id: '2', name: 'Bamboo Watch' }
    ];
  }

  dragStart(product: Product) {
    this.draggedProduct = product;
  }

  drop() {
    if (this.draggedProduct) {
      const draggedProductIndex = this.findIndex(this.draggedProduct);
      if (draggedProductIndex > -1) {
        this.selectedProducts = [...this.selectedProducts, this.draggedProduct];
        this.availableProducts = this.availableProducts.filter((_, i) => i !== draggedProductIndex);
      }
      this.draggedProduct = null;
    }
  }

  dragEnd() {
    this.draggedProduct = null;
  }

  findIndex(product: Product): number {
    return this.availableProducts.findIndex(p => p.id === product.id);
  }
}
