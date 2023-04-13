import { ActivatedRoute, Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonComponent } from '@/shared/button.component';
import { InputComponent } from '@/shared/input.component';
import { AuthService } from '@/services/auth.service';
import { SpinnerComponent } from "@/shared/spinner.component";
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
    selector: 'app-login-form',
    standalone: true,
    template: ` 
    <form novalidate [formGroup]="loginForm">
      <!-- Input group -->
      <div class="mb-3">
        <app-input [control]="email" label="Email" type="text"></app-input>
      </div>

      <div class="mb-8">
        <app-input [control]="password" label="Password" type="password"></app-input>
      </div>

      <!-- Button -->
      <app-button (click)="handleForm()" color="primary" padding="py-3"> 
      <div class="flex items-center gap-3">
        <app-spinner></app-spinner>
        <span>Sing In</span>
      </div>    
    </app-button>

    
    </form>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, ButtonComponent, SpinnerComponent, AsyncPipe,NgIf,ReactiveFormsModule]
})
export class LoginFormComponent {

  private fb = inject(FormBuilder)
  private authSrv = inject(AuthService)
  private router = inject(Router)

  public loginForm =  this.fb.nonNullable.group({
    email:["",[Validators.required]],
    password:["",[Validators.required,Validators.minLength(4)]]
  })

  get email() {return this.loginForm.controls.email}
  get password() {return this.loginForm.controls.password}

  private route = inject(ActivatedRoute)

  ngOnInit() {
    this.route.queryParamMap.subscribe( resp => {
      if(resp.get("email")) {
        this.email.setValue(resp.get("email")!)
      }
    })
  }

  handleForm() {
    if(this.loginForm.invalid) {
      return
    }

    this.authSrv.login(this.loginForm.getRawValue()).subscribe({
      next:()=> {
        this.router.navigateByUrl("/boards")
      },
    })
    
  }
}
