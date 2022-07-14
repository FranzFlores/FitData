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
    @Inject(MAT_DIALOG_DATA) public data: Exercise,
  ) { }

  ngOnInit(): void {
    this.exercise = (this.data) ? this.data : {};
    this.formExercise = this.formBuilder.group({
      _id: [this.exercise._id],
      name: [this.exercise.name, [Validators.required]],
      description: [this.exercise.description],
      multimedia: [this.exercise.multimedia],
      muscle_group: [this.exercise.muscle_group],
      url: [this.exercise.url],
    });
  }

  onSubmit() {
  
    if (this.uploadFileInput.fileUploads.length > 0) {
      this.uploadFileInput.fileUploads.forEach(element => {
        this.formExercise.patchValue({
          multimedia: element.file,
          _id: this.exercise._id
        });
      });
    } else {
      this.formExercise.patchValue({
        multimedia: null,
        _id: this.exercise._id
      });
    }
    console.log(this.formExercise.value);
    

    if (this.data) {
      this.exerciseService.updateExercise(this.formExercise.value).pipe(first()).subscribe({
        next: res => {
          this.dialogRef.close(res);
          this.snackBar.open("Ejercicio actualizado correctamente", null, { duration: 3000 });
          this.formExercise.reset();
        },
        error: err => {
          console.log('Error' + err);
          this.snackBar.open("Error al actualizar el ejercicio", null, { duration: 3000 });
          this.dialogRef.close(false);
        }
      });
    } else {
      this.exerciseService.createExercise(this.formExercise.value).pipe(first()).subscribe({
        next: res => {
          this.dialogRef.close(res);
          this.snackBar.open("Ejercicio creado correctamente", null, { duration: 3000 });
          this.formExercise.reset();
        }, error: err => {
          console.log('Error' + err);
          this.snackBar.open("Error al crear el ejercicio", null, { duration: 3000 });
          this.dialogRef.close(false);
        }
      });
    }
  }

}
