import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { Exercise } from 'src/app/models/exercise';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {

  formExercise: FormGroup;
  exercise: Exercise = {};
  @ViewChild('fileUploadExercise') uploadFileInput;

  constructor(
    private formBuilder: FormBuilder,
    private exerciseService: ExerciseService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ExerciseFormComponent>,
  ) { }

  ngOnInit(): void {
    this.formExercise = this.formBuilder.group({
        name: [this.exercise.name, [Validators.required]],
        description: [this.exercise.description],
        multimedia: [this.exercise.multimedia],
        muscle_group: [this.exercise.muscle_group],
        url: [this.exercise.url],
    });
  }

  onSubmit() {
    this.uploadFileInput.fileUploads.forEach(element => {
      this.formExercise.patchValue({
        multimedia: element.file
      });
     });

    this.exerciseService.createExercise(this.formExercise.value).pipe(first()).subscribe({
      next: res => {
        this.snackBar.open('Ejercicio creado correctamente', 'X', { duration: 3000 });
        this.formExercise.reset();
        this.dialogRef.close(true);
      },
      error: err => {
        console.log('Error' + err);
        this.snackBar.open("Error al crear el ejercicio", null, { duration: 3000 });
        this.dialogRef.close(false);
      }
    });
  }

}
