import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl + "/accounts";
  baseUrl1 = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();
  paginatedResult: PaginatedResult<any> = new PaginatedResult<any>();

  constructor(private http: HttpClient) { }

  getAccountList() {
    return this.http.get(this.baseUrl);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + '/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + '/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }
  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl1 + '/admin/users-with-roles');
  }

  updateUserRoles(id: number, roles: string[]) {
    return this.http.post(this.baseUrl1 + '/admin/edit-roles/' + id + '?roles=' + roles, {});
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    this.currentUserSource.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  resetList(page?: number, itemPerPage?: number, search?: string) {
    let params = new HttpParams();

    if (page !== null && itemPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }

    if (search !== "") {
      params = params.append('search', search);
    }

    return this.http.get<any>(this.baseUrl + '/pagination', { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }
}
