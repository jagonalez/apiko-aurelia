import { AccountService } from "services/account";
import { inject } from "aurelia-dependency-injection";
import { ValidationControllerFactory, ValidationController, ValidationRules } from 'aurelia-validation';
import { BootstrapFormRenderer } from 'resources/bootstrap-form-renderer';

@inject(AccountService, ValidationControllerFactory)
export class Register {
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

  register() {
    this.controller.validate()
    .then(response => {
      if (response.valid) {
        this.account.register(this.email, this.password)
        .then(() => {
          this.alert = true;
          this.alertType = "success"
          this.alertMessage= "Your account has been successfully created. You can now login."
        })
        .catch(error => {
          if (error.message === "exists") {
            this.alert = true;
            this.alertType = "info"
            this.alertMessage = "An account already exists for this user. Please try a different one."
          } else {
            this.alert = true;
            this.alertType = "danger"
            this.alertMessage = "There was an Error registering your account. Please try again."
          }
        })
      }
    })
  }
}
ValidationRules
.ensure(a => a.email).required().email()
.ensure(a => a.password).required().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,18}$/).withMessage("Passwords need to be 8 to 18 characters and have 1 number, upper and lowercase character.")
.on(Register)
