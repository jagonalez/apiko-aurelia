import { HttpClient, json } from "aurelia-fetch-client";
import { inject } from "aurelia-dependency-injection";

@inject(HttpClient)
export class ApiService {
  constructor(http) {
    this.http = http;
    this.baseUrl = "http://localhost:5000/";
    this.http.configure(config => {
      config
      .useStandardConfiguration()
      .withBaseUrl(this.baseUrl)
    });
  }

  get(url) {
    return this.http.fetch(url)
  }

  post(url, body) {
    return this.http.fetch(url, {
      method: "POST",
      body: json(body)
    })
  }

  put(url, body) {
    return this.http.fetch(url, {
      method: "POST",
      body: json(body)
    })
  }

  delete(url) {
    return this.http.fetch(url, {
      method: "DELETE"
    })
  }

}
