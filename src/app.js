import { inject } from "aurelia-dependency-injection";
import { AccountService } from "services/account";
import { Redirect } from "aurelia-router";

@inject(AccountService)
export class App {
  constructor(account) {
    this.account = account;
  }
  configureRouter(config, router) {
    config.addAuthorizeStep(AuthorizeStep);
    config.map([
      {route: ['', 'home'], name: 'home', moduleId: 'routes/home/home', title: 'Home', nav: true, auth: true},
      {route: 'login', name: 'login', moduleId: 'routes/login/login', title: 'Login'},
      {route: 'register', name: 'register', moduleId: 'routes/register/register', title: 'Register'},
      {route: 'users', name: 'users', moduleId: 'routes/users/users', title: 'Users', auth: true, nav: true}
    ]);
    router.title = "Apiko Aurelia App"
    this.router = router;
  }
  activate() {
    return this.account.checkLogin();
  }
  logout() {
    return this.account.logout();
  }
}
@inject(AccountService)
export class AuthorizeStep {
  constructor(account) {
    this.account = account;
  }

  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      if (this.account.isAuthenticated) {
        return next();
      }
      return next.cancel(new Redirect('login'));
    }
    return next();
  }
}
