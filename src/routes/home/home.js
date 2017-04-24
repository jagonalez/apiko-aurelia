import { inject } from "aurelia-dependency-injection";
import { ApiService } from "services/api"
import { Router } from "aurelia-router"

@inject(ApiService, Router)
export class Home {
  constructor(api, router) {
    this.router = router;
    this.api = api;
    api.get("users")
    .then(response => response.json())
    .then(data => {
      console.log(data)
    })
  }

}
