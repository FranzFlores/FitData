import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { ExerciseComponent } from './exercise/exercise.component';

const routes: Routes = [
  {
    path: '',
    component: ExerciseComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExerciseRoutingModule { }
