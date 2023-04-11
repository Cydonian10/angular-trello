import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { InputComponent } from '@/shared/input.component';
import { ButtonComponent } from "@/shared/button.component";

@Component({
    selector: 'app-login',
    standalone: true,
    template: `
    <section class="min-h-screen">
      <!-- Imagenes -->
      <div class="relative w-full h-full z-20">
        <img
          class="w-64 fixed bottom-0 left-0"
          src="assets/img/undraw_well_done_re_3hpo.svg"
          alt="rigth"
        />
        <img
          class="w-64 fixed bottom-0 right-0"
          src="assets/img/undraw_blooming_re_2kc4.svg"
          alt="lefth"
        />
      </div>

      <div
        class="w-full min-h-screen bg-gray-100 flex justify-center items-start"
      >
        <header class="pt-20 w-[400px]">
          <!-- Logo -->
          <div class="flex items-center justify-center gap-2">
            <img class="w-14" src="assets/img/trello.png" alt="" />
            <h3 class="font-bold text-5xl text-slate-700">Trello</h3>
          </div>
          <!-- Card Formulario -->
          <article class="bg-white shadow-md rounded-md p-6 mt-4">
            <h3 class="text-center font-semibold pb-4">Log In to trello</h3>

            <!-- Form -->
            <form novalidate>
              <!-- Input group -->
              <div class="mb-3">
                <app-input label="Email" type="text"></app-input>
              </div>

              <div class="mb-3">
                <app-input label="Password" type="password"></app-input>
              </div>

              <!-- Button -->
              <app-button color="primary" padding="py-3">
                Sing In
              </app-button>
            </form>
          </article>
        </header>
      </div>
    </section>
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [InputComponent, ButtonComponent]
})
export class LoginPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
