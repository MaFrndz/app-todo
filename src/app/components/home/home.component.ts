import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { State } from '../../models/state/state.model';
import { StateService } from '../../services/state.service';


export interface Product {
  id: string;
  titulo: string;
  descripcion: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    DragDropModule,
    CardModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stateService = inject(StateService);

  availableProducts: Product[] = [];
  selectedProducts: Product[] = [];
  draggedProduct: Product | null = null;
  states: State[] = [];


  ngOnInit() {
    this.selectedProducts = [];
    this.availableProducts = [
      { id: '1', titulo: 'Tarea 1', descripcion: 'Descripcion tarea 1' },
      { id: '2', titulo: 'Tarea 2', descripcion: 'Descripcion tarea 2' },
    ];
    this.stateService.getStates().subscribe(
      states => {
      this.states = states;
    });
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
