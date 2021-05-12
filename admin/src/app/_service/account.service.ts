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

  getAccount(id:number){
    return this.http.get(this.baseUrl + "/" + id);
  }

  getAccountList() {
    return this.http.get(this.baseUrl);
  }
  
  putUser(val: User){
    return this.http.put(this.baseUrl1 + '/admin/users/' + val.id, val);
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
  getUsersWithRoles(page?: number, itemPerPage?: number, search?: string) {
    let params = new HttpParams();

    if (page !== null && itemPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemPerPage.toString());
    }

    if (search !== "") {
      params = params.append('search', search);
    }

    return this.http.get<any>(this.baseUrl1 + '/admin/pagination/users-with-roles', { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
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

  setMainPhoto(photoId: number, id: number) {
    // let params = new HttpParams();
    // params = params.append('id', id.toString())
    
    return this.http.put(this.baseUrl1 + '/admin/set-main-photo/' + photoId + '?' + 'id=' + id,{});
  }

  deletePhoto(photoId: number, id: number) {
    let params = new HttpParams();
    if(id!==null){
      params = params.append('id', id.toString())
    }
    return this.http.delete(this.baseUrl1 + '/admin/delete-photo/' + photoId, {params});
  }
}
