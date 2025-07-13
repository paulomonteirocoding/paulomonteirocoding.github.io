import { AuthService } from './../../services/auth-service';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  fb = new FormBuilder();
  authService: AuthService;
  loginFormGroup: FormGroup;
  router: Router;

  constructor(authService: AuthService, router: Router) {
    this.router = router;
    this.authService = authService;
    this.loginFormGroup = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    const { email, password } = this.loginFormGroup.value;

    this.authService.login(email, password).subscribe({
      next: (token: string) => {
        console.log('Token recebido:', token);
        sessionStorage.setItem('token', token); // ou sessionStorage
        // redirecionar, por exemplo:
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro no login:', err.message);
        // opcional: mostrar erro ao utilizador
      },
    });
  }
}
