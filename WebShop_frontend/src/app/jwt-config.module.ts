import { NgModule } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  imports: [
    JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('token'),
        },
      })
  ],
})
export class JwtConfigModule { }
