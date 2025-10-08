import { Given, When, Then, Before, After } from '@wdio/cucumber-framework';

import { ForgotPasswordPage } from '../../po/pages/forgotPasswordPage';
import { LoginPage } from '../../po/pages/loginPage';
import { AccountPage } from '../../po/pages/accountPage';
import { PAGE_PATHS, DUMMY_CREDENTIALS, ERROR_MESSAGES, TYPES, TITLES } from '../../test-data/data';
import { expect } from 'chai';

let loginPage;
let forgotPasswordPage;
let accountPage;

Before({ tags: '@auth' }, async () => {
    loginPage = new LoginPage(PAGE_PATHS.LOGIN);
    forgotPasswordPage = new ForgotPasswordPage(PAGE_PATHS.FORGOT_PASSWORD);
    accountPage = new AccountPage(PAGE_PATHS.MY_ACCOUNT);
    await loginPage.open();
})

After({ tags: '@auth' }, () => {
    loginPage = null;
    forgotPasswordPage = null;
    accountPage = null;
})

Given('I am on the login page', async () => {
    const currentUrl = await loginPage.getUrl();
    expect(currentUrl).to.equal(PAGE_PATHS.MY_LOGIN_FULL);
})

Given('the email field is empty', async () => {
    await loginPage.emailField.waitForExist()
    const emailFieldValue = await loginPage.getInputValue(loginPage.emailField)
    expect(emailFieldValue).to.equal('')
})

Given('the password field is empty', async () => {
    await loginPage.passwordField.waitForExist()
    const passwordFieldValue = await loginPage.getInputValue(loginPage.passwordField)
    expect(passwordFieldValue).to.equal('')
})

When('I click the "Log in" button', async () => {
    await loginPage.login()
})

Then('I should see the error message "Email is required"', async () => {
    await loginPage.waitForElementsToAppear(loginPage.emailErrorBox, loginPage.passwordErrorBox);
    const emailErrorText = await loginPage.getElementText(loginPage.emailErrorBox);
    expect(emailErrorText).to.equal(ERROR_MESSAGES.EMAIL_REQUIRED);
})

Then('I should see the error message "Password is required"', async () => {
    const passwordErrorText = await loginPage.getElementText(loginPage.passwordErrorBox);
    expect(passwordErrorText).to.equal(ERROR_MESSAGES.PASSWORD_REQUIRED);
})

When('I enter an invalid email', async () => {
    await loginPage.typeInEmail(DUMMY_CREDENTIALS.EMAIL);
})

When('I enter a valid password', async () => {
    await loginPage.typeInPassword(process.env.CORRECT_PASSWORD)
})

Then('I should see an error message "Invalid Email or Password"', async () => {
    await loginPage.waitForElementsToAppear(loginPage.loginErrorBox);
    const loginErrorText = await loginPage.getElementText(loginPage.loginErrorBox);
    loginErrorText.should.equal(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD);
})

When('I enter a valid email', async () => {
    await loginPage.typeInEmail(process.env.CORRECT_EMAIL);
})

When('I enter an invalid password', async () => {
    await loginPage.typeInPassword(DUMMY_CREDENTIALS.PASSWORD);
})

Then('I should be redirected to "My account" page', async () => {
    await accountPage.waitForElementsToAppear(accountPage.pageTitle);
    const currentUrl = await accountPage.getUrl();
    expect(currentUrl).to.equal(PAGE_PATHS.MY_ACCOUNT_FULL);
})

Then('I should see my Account details', async () => {
    const pageTitleText = await accountPage.pageTitleText;
    pageTitleText.should.equal(TITLES.MY_ACCOUNT);
})

When('I enter a dummy password', async () => {
    await loginPage.typeInPassword(DUMMY_CREDENTIALS.PASSWORD);
})

When('the password is masked with asterisks', async () => {
    let inputType = await loginPage.emailFieldType;
    expect(inputType).to.equal(TYPES.PASSWORD);
})

When('I click the "Eye" icon', async () => {
    await loginPage.unmaskPassword();
})

Then('the password should be displayed as plain text', async () => {
    let inputType = await loginPage.emailFieldType;
    assert.strictEqual(inputType, TYPES.TEXT);
})

When('I click the "Forgot your password" link', async () => {
    await loginPage.goToForgotPasswordPage();
})

When('I am redirected to "Forgot your password" page', async () => {
    await forgotPasswordPage.waitForElementsToAppear(forgotPasswordPage.setNewPasswordBtn);
})

When('I leave the email field empty', async () => {
    let value = await forgotPasswordPage.emailField.getValue()
    expect(value).to.equal('')
})

When('I click the "Set new password" button', async () => {
    await forgotPasswordPage.submitNewPassword();
})

Then('I should see an error "Email is required"', async () => {
    await forgotPasswordPage.waitForElementsToAppear(forgotPasswordPage.errorBox);
    const errorText = await forgotPasswordPage.getElementText(forgotPasswordPage.errorBox);
    assert.strictEqual(errorText, ERROR_MESSAGES.EMAIL_REQUIRED);
})