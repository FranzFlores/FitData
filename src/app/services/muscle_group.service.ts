import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MuscleGroup } from "../models/muscle_group";

@Injectable({
    providedIn: 'root'
})
export class MuscleGroupService {

    muscle_groups: MuscleGroup[];
    readonly URL_API = 'http://localhost:3000/api/muscle_group';

    constructor(private http: HttpClient) { }

    //Obtener todos los grupos musculares
    fetchMuscleGroups() {
        return this.http.get<MuscleGroup[]>(`${this.URL_API}/all`);
    }
}