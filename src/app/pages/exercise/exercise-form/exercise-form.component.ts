import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from 'src/app/models/exercise';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {

  formExercise: FormGroup;
  exercise: Exercise = {};
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef;
  myfilename = 'Select File';

  constructor(
    private formBuilder: FormBuilder,
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
    console.log(this.formExercise.value);
  }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      console.log(fileInput);
    }
  }

}
