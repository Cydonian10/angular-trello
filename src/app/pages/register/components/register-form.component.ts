import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '@/shared/button.component';
import { InputComponent } from '@/shared/input.component';
import { AuthService } from '@/services/auth.service';
import { SpinnerComponent } from '@/shared/spinner.component';
import { AsyncPipe, NgIf } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    SpinnerComponent,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
  ],
  template: `
    <ng-container *ngIf="!(showRegister$ | async)">
      <div class="mb-7">
        <app-input [control]="inputEmailValidate" label="Email"></app-input>
      </div>
      <app-button (click)="handleEmailValid()">
        <div class="flex items-center gap-3">
          <app-spinner></app-spinner>
          <span>Validar Email</span>
        </div>
      </app-button>
    </ng-container>

    <ng-container *ngIf="showRegister$ | async">
      <form novalidate [formGroup]="registerForm">
        <!-- Input group -->
        <div class="mb-3">
          <app-input [control]="email" label="Email" type="text"></app-input>
        </div>

        <div class="mb-3">
          <app-input
            [control]="password"
            label="Password"
            type="password"
          ></app-input>
        </div>

        <div class="mb-8">
          <app-input [control]="name" label="Name" type="text"></app-input>
        </div>

        <!-- Button -->
        <app-button (click)="handleForm()" color="primary" padding="py-3">
          <div class="flex items-center gap-3">
            <app-spinner></app-spinner>
            <span>Registro</span>
          </div>
        </app-button>
      </form>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterFormComponent {
  private fb = inject(FormBuilder);
  private authSrv = inject(AuthService);
  private router = inject(Router);

  public registerForm = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  public inputEmailValidate = new FormControl('', {
    nonNullable: true,
    validators: [Validators.email],
  });

  public showRegister$ = new BehaviorSubject<boolean>(false);

  get email() {
    return this.registerForm.controls.email;
  }
  get password() {
    return this.registerForm.controls.password;
  }
  get name() {
    return this.registerForm.controls.name;
  }

  handleForm() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.invalid) {
      this.registerForm.errors;
      return;
    }

    this.authSrv.register(this.registerForm.getRawValue()).subscribe({
      next: () => {
         this.router.navigateByUrl("/boards")
      },
    });
  }

  handleEmailValid() {
    if (this.inputEmailValidate.invalid) {
      this.inputEmailValidate.markAllAsTouched();
      return;
    }

    this.authSrv.isAvailable(this.inputEmailValidate.getRawValue()).subscribe({
      next: (resp) => {
        if (resp.isAvailable) {
          this.showRegister$.next(true);
          this.email.setValue(this.inputEmailValidate.getRawValue())
        } else {
          this.router.navigate(['/'], {
            queryParams: { email: this.inputEmailValidate.getRawValue() },
          });
        }
      },
    });
  }
}
