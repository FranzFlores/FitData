import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./helpers/auth.guard";

const routes: Routes = [
    {
        path: 'signup',
        loadChildren: () => import('./pages/signup/signup.module').then(s => s.SignupModule)
    }, 
    {
        path: '',
        loadChildren: () => import('./pages/signin/signin.module').then(l => l.SigninModule)
    },
    {
        path: 'manager',
        loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        paramsInheritanceStrategy: 'always'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
