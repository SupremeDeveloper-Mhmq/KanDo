import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToDo } from './ToDo.model';

@Injectable({
  providedIn: 'root',
})
export class ToDoService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  onFetchToDo() {
    let username = localStorage.getItem('UserName');
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<{ [key: string]: ToDo }>(
          'https://kandotodo-default-rtdb.asia-southeast1.firebasedatabase.app/' +
            username +
            '.json',
          {
            params: new HttpParams().set('auth', user._token),
          }
        );
      }),
      map((responseData) => {
        const postsArray: ToDo[] = [];
        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    );
  }
  onPostToDo(ToDoForm: {
    name: string;
    desc: string;
    Priority: number;
    Due: number;
    Proggress: number;
  }) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        let username = localStorage.getItem('UserName');
        return this.http.post<{ name: string }>(
          'https://kandotodo-default-rtdb.asia-southeast1.firebasedatabase.app/' +
            username +
            '.json',
          ToDoForm,
          {
            params: new HttpParams().set('auth', user._token),
          }
        );
      })
    );
  }
}
