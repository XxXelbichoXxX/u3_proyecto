import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private users: User[] = [];
  private userLog: User | null = null;

  constructor() {
    this.users.push({
      username: "admin",
      password: "admin"
    });
    this.users.push({
      username: "admin2",
      password: "admin2"
    });
    this.users.push({
      username: "admin3",
      password: "admin3"
    });
    this.users.push({
      username: "admin4",
      password: "admin4"
    });
  }

  public validateUser(user: User): boolean {
    for (let u of this.users) {
      if (u.username == user.username && u.password == user.password) {
        this.userLog = u;
        return true;
      }
    }
    return false;
  }
  public getUsername(): string {
    return this.userLog?.username ?? 'Usuario no disponible';
  }
}
