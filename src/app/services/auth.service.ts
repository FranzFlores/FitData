import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    /*
        BehaviorSubject: Es un tipo especial de observable que permite enviar valores
        y suscribirse al sujeto. Se puede obtener un observable con asObservable() 
        Observable: Se usan para manejar operaciones asíncronas. Como para realizar operaciones Ajax.
    */
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    readonly URL_API = 'http://localhost:3000/api/user';

    //Obtener información del usuario
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    //Iniciar Sesión
    signin(email: string, password: string) {
        return this.http.post<any>(`${this.URL_API}/signin`, { email, password })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    //Cerrar Sesión
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}