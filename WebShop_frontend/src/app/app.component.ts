import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatInputModule ,MatInput} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { LoginComponent } from './layout/login/login.component';
import { HomeComponent } from './layout/home/home.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './TokenInterceptor';
import { JwtConfigModule } from './jwt-config.module';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterComponent } from './layout/register/register.component';
import { ShowServicesPackagesComponent } from './servicesAndPackages/show-services-packages/show-services-packages.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ErrorComponent } from './layout/response/error/error.component';
import { FailedComponent } from './layout/response/failed/failed.component';
import { SuccessComponent } from './layout/response/success/success.component';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,

    JwtConfigModule,
    



    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ShowServicesPackagesComponent,
    //socket config for root
    SocketIoModule,
    ErrorComponent,
    FailedComponent,
    SuccessComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    SocketIoModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'WebShop';
  private webSocket!: WebSocket;
  private webSocketClient!: WebSocket;
  private webSocketResponse!: WebSocket;

  constructor(private router:Router){
    this.initializeWebSockets();
  }

  initializeWebSockets(){
    this.setupWebSocket("success")
    this.setupWebSocket("error")
    this.setupWebSocket("failed")
  }

  private setupWebSocket(endpoint: string) {
    const url = `ws://localhost:8080/${endpoint}`;
    const webSocket = new WebSocket(url);

    webSocket.onopen = () => {
      console.log(`WebSocket connection to ${endpoint} established.`);
    };

    webSocket.onclose = (event) => {
      console.log(`WebSocket connection to ${endpoint} closed. Reconnecting...`);
      setTimeout(() => this.setupWebSocket(endpoint), 1000); // Ponovni pokušaj nakon 5 sekundi
    };

    webSocket.onerror = (error) => {
      console.error(`WebSocket error on ${endpoint}:`, error);
      webSocket.close(); // Zatvori konekciju da bi se pokrenuo onclose handler
    };

    webSocket.onmessage = (event) => {
      console.log(`Message from ${endpoint}:`, event.data);
      // Obradi poruku na osnovu endpoint-a
      if (endpoint === 'success') {
        this.handleSuccess(event);
      }else if(endpoint==='failed'){
          this.handleFailed(event)
      }else if(endpoint==='error'){
          this.handleError(event)
      }
    };

    // Sačuvaj referencu na WebSocket
    if (endpoint === 'transactions') {
      this.webSocket = webSocket;
    } else if (endpoint === 'clients') {
      this.webSocketClient = webSocket;
    } else if (endpoint === 'responses') {
      this.webSocketResponse = webSocket;
    }
  }

  private handleSuccess(event: MessageEvent) {
    console.log(event.data);
    this.router.navigate(['/success']);
  }

  private handleError(event: MessageEvent) {
    console.log(event.data);
    this.router.navigate(['/error']);
  }

  private handleFailed(event: MessageEvent) {
    console.log(event.data);
    this.router.navigate(['/failed']);
  }
}
