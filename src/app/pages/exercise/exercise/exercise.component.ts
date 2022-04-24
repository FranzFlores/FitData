import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from "../../../services/exercise.service";
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {

  exercises:Exercise[] = [];

  constructor(
    private excersiceService:ExerciseService,
    private snackBar: MatSnackBar, 
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.fetchExercises();
  }

  //Obtener listado de ejercicios
  fetchExercises() {
    this.excersiceService.fetchExercises().pipe(first()).subscribe({
      next: res => {
        this.exercises = res;
      },
      error: err => {
        console.log(err);
        this.snackBar.open("Ocurrió un error al obtener ejercicios", null, { duration: 3000 });
      }
    }
    );
  }

  openDialog() {
    const dialogExercise = this.dialog.open(ExerciseFormComponent, {
      height: '500px',
      width: '700px',
    });
  }

}
