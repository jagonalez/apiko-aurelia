import { inject } from "aurelia-dependency-injection";
import { ApiService } from "services/api"


@inject(ApiService)
export class Users {
  constructor(api) {
    this.api = api;
  }
  activate(params, routeConfig, navigationInstruction) {
    return this.api.get("users")
    .then(r => r.json())
    .then(users => this.users = users)
    .catch(error => {
      console.log(error)
    })
  }
}
