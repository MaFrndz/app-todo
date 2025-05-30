import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { State } from '../models/state/state.model';

@Injectable({ providedIn: 'root' })
export class StateService {
    private readonly apiUrl = environment.apiUrl;

    constructor(private readonly http: HttpClient) { }

    getStates(): Observable<State[]> {
        return this.http.get<State[]>(this.apiUrl + '/state');
    }
}
