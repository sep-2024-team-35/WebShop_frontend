import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpClientModule} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Environment } from '../env/environment';
import { User } from '../model/user.model';
import { LoginRequest } from '../model/loginRequest.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  apiUrl: string=Environment.apiUrl;
  private access_token = null;
  userClaims: any = null;
 jwtHelper = new JwtHelperService ();

  private loginSource = new BehaviorSubject<boolean>(false);
  public loginObserver = this.loginSource.asObservable();

  public passChangeSource = new BehaviorSubject<boolean>(false);
  public passChangeObserver = this.passChangeSource.asObservable();

  constructor(private http: HttpClient) {
    const token= localStorage.getItem('token')
    this.userClaims = this.jwtHelper.decodeToken();
    if (this.userClaims) this.loginSource.next(true);
  }



  login(loginRequest: LoginRequest): Observable<boolean> {
    console.log('u servisu',loginRequest)
    return this.http
      .post<any>(this.apiUrl+'auth/login', loginRequest)
      .pipe(
        map((res) => {
          console.log('Login success');
          console.log(res);
          localStorage.setItem('token', res.token);
          this.userClaims = this.jwtHelper.decodeToken(res.token);
          console.log('claims',this.userClaims)
          this.access_token = res.token;
          this.loginSource.next(true);
          return true;
        })
      );
  }

  register(user:User):Observable<String>{
    localStorage.setItem('token','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuaW5hQGdtYWlsLmNvbSIsImlhdCI6MTczMjIxOTk1NiwiZXhwIjoxNzMyMzA2MzU2fQ.JS_OpVlIUA_7xlqdIa60Ucxy5npJDnAVsTTPSKf6Brv2pKe0v1oCTCT1WAjp41xmAGCoM5kXlmC7VpXo8VLF5w');
    console.log("USER",user)
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    });
    console.log("TOKEN",token)
    return this.http.post<String>(this.apiUrl + 'auth/register',user,{headers});
  }

  logout(): void {
    localStorage.clear();
    this.loginSource.next(false);
  }

  isLogged(): boolean {
    if (!this.jwtHelper.tokenGetter()) return false;
    return true;
  }

  getUserRole(): string {
    return this.userClaims.role;
  }
  tokenIsPresent() {
    return this.access_token != undefined && this.access_token != null;
  }

  getToken() {
    return this.access_token;
  }

  getUserId(): number {
    console.log('id',this.userClaims.id)
    return this.userClaims.id;
  }

  getUsername(): string {
    console.log("ooooo",this.userClaims.username);
    return this.userClaims.username;

  }
}
