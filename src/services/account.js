import { inject } from "aurelia-dependency-injection";
import { ApiService } from "./api"
import { Router } from "aurelia-router"

@inject(ApiService, Router)
export class AccountService {
  token = "";
  isAuthenticated = false;

  constructor(api, router) {
    this.api = api;
    this.router = router;
    this.api.http.configure(config => {
      config
      .withInterceptor({
        request: request => {
          if (this.isAuthenticated) {
            const req = new Request(request.url + "?token=" + this.token, {
              method: request.method,
              headers: request.headers,
              body: request.body,
              credentials: request.credentials,
              cache: request.cache,
              redirect: request.redirect,
              integrity: request.integrity
            })
            request = req;
          }
          return request
        }
      });
    })
  }

  logout() {
    this.isAuthenticated = false;
    this.router.navigateToRoute("login");
  }

  checkLogin() {
    return this.api.get("users/")
    .then(response => {
      if (response.status === 200) {
        this.isAuthenticated = true;
      }
      return response.status === 200
    })
    .catch(response => {
      return false
    })
  }
  login(username, password) {
    this.isAuthenticated = false;
    const credentials = {
      username: username,
      password: password,
    }
    return this.api.post("users/login", credentials)
    .then(response => {
      if (response.status === 200)
        return response.json();
    })
    .then(data => {
      this.isAuthenticated = true;
      this.token = data.token;
      this.user = data.user;
      this.router.navigateToRoute("home")
    })
  }
  checkUserExists(username) {
    return this.api.get("users/exists/" + username)
    .then(r => r.json())
    .then(data => {
      return "exists" in data && data.exists
    })
  }

  createAccount(username, password) {
    const account = {
      username: username,
      password: password,
      role: "users"
    }
    return this.api.post("users", account)

  }

  register(username, password) {
    return this.checkUserExists(username, password)
    .then(exists => {
      if (exists)
        return Promise.reject(new Error("exists"))
      else
        return this.createAccount(username, password)
    })
  }
}
