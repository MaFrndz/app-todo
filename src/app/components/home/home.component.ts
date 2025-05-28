import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

export interface Product {
  id: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  styles: [
    `:host ::ng-deep {
            [pDraggable] {
                cursor: move;
            }
        }`
  ],
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

  ngOnInit() {
    this.selectedProducts = [];
    this.availableProducts = [
      { id: '1', name: 'Black Watch' },
      { id: '2', name: 'Bamboo Watch' }
    ];
  }

  drop(event: CdkDragDrop<Product[]>) {
    console.log('Drop event:', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
