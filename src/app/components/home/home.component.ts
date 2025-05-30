import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { State } from '../../models/state/state.model';
import { StateService } from '../../services/state.service';


export interface Product {
  id: string;
  titulo: string;
  descripcion: string;
  idState: number;
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
  states: State[] = [];
  tasksByState: { [idState: number]: Product[] } = {};
  draggedTask: Product | null = null;

  constructor(private readonly stateService: StateService) {}

  ngOnInit() {
    this.stateService.getStates().subscribe(states => {
      this.states = states;
      // Inicializar tareas de ejemplo por estado
      for (const state of states) {
        this.tasksByState[state.idState] = [];
      }
      // Ejemplo: asignar tareas a estados
      this.tasksByState[states[0]?.idState]?.push({
        id: '1', titulo: 'Tarea 1', descripcion: 'Descripcion tarea 1', idState: states[0]?.idState
      });
      this.tasksByState[states[1]?.idState]?.push({
        id: '2', titulo: 'Tarea 2', descripcion: 'Descripcion tarea 2', idState: states[1]?.idState
      });
    });
  }

  dragStart(task: Product) {
    this.draggedTask = task;
  }

  drop(targetState: State) {
    if (this.draggedTask && this.draggedTask.idState !== targetState.idState) {
      // Remover de la lista de origen
      const originStateId = this.draggedTask.idState;
      this.tasksByState[originStateId] = this.tasksByState[originStateId].filter(t => t.id !== this.draggedTask!.id);
      // Cambiar el estado de la tarea
      this.draggedTask.idState = targetState.idState;
      // Agregar a la lista de destino
      this.tasksByState[targetState.idState].push(this.draggedTask);
      this.draggedTask = null;
    }
  }

  dragEnd() {
    this.draggedTask = null;
  }
}
