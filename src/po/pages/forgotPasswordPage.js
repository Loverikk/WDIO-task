import { BasePage } from './basePage';

export class ForgotPasswordPage extends BasePage {
  constructor(path) {
    super(path);
  }

  get emailField() {
    return $('input[data-test="email"]');
  }
  get setNewPasswordBtn() {
    return $('input[data-test="forgot-password-submit"]');
  }
  get errorBox() {
    return $('div[data-test="email-error"]');
  }

  async submitNewPassword() {
    await this.setNewPasswordBtn.click();
  }
}
