import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Exercise } from '../models/exercise';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  exercise: Exercise;
  exercises: Exercise[];

  readonly URL_API = 'http://localhost:3000/api/exercise';


  constructor(private http:HttpClient) { }

  //Obtener todos los ejercicios ingresados
  fetchExercises() {
    return this.http.get<Exercise[]>(`${this.URL_API}/all`);
  }


}
