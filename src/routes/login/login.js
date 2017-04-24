import { AccountService } from "services/account";
import { inject } from "aurelia-dependency-injection";
import { ValidationControllerFactory, ValidationController, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from 'resources/bootstrap-form-renderer';

@inject(AccountService, ValidationControllerFactory)
export class Login {
  email = "";
  password = "";
  alert = false;
  alertMessage = "";
  alertType = "";

  constructor(account, controllerFactory) {
    this.account = account;
    this.controller = controllerFactory.createForCurrentScope();
    this.controller.addRenderer(new BootstrapFormRenderer());
  }
  activate(params, routeConfig, navigationInstruction) {
  }

  login() {
    this.account.login(this.email, this.password)
    .catch(error => {
      console.log(error);
      if (error.stauts === 401 || error.status === 404 || error.status === 400) {
        this.alert = true;
        this.alertType = "danger";
        this.alertMessage = "The username/password is incorrect. Please try again."
      } else {
        this.alert = true;
        this.alertType = "danger";
        this.alertMessage = "There was an issue logging in. Please try again."
      }
    })
  }
}
ValidationRules
.ensure(a => a.email).required().email()
.ensure(a => a.password).required()
.on(Login)
