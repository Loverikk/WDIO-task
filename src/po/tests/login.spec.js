import { ForgotPasswordPage } from "../pages/forgotPasswordPage"
import { LoginPage } from "../pages/loginPage"

const DUMMY_CREDENTIALS = {
    EMAIL: "test@test.com",
    PASSWORD: '1234'
}

describe('Login page', async () => {
    const loginPage = new LoginPage('/auth/login')
    const forgotPasswordPage = new ForgotPasswordPage('auth/forgot-password')

    beforeEach(async () => {
        loginPage.open()
    })

    it('Should show the error when login with empty fields', async () => {
        await loginPage.loginBtn.click()

        await loginPage.emailErrorBox.waitForDisplayed()
        await loginPage.passwordErrorBox.waitForDisplayed()

        const emailErrorText = await loginPage.getErrorText(loginPage.emailErrorBox)
        const passwordErrorText = await loginPage.getErrorText(loginPage.passwordErrorBox)

        await expect(emailErrorText).toBe('Email is required')
        await expect(passwordErrorText).toBe('Password is required')
    })

    it('Should show the errro when login with the invalid email', async () => {
        await loginPage.emailField.setValue(DUMMY_CREDENTIALS.EMAIL)
        await loginPage.passwordField.setValue(process.env.CORRECT_PASSWORD)
        await loginPage.loginBtn.click()

        await loginPage.loginErrorBox.waitForDisplayed()
        const loginErrorText = await loginPage.getErrorText(loginPage.loginErrorBox)
        await expect(loginErrorText).toBe('Invalid email or password')
    })

    it('Should show the error when login with the invalid password', async () => {
        await loginPage.emailField.setValue(process.env.CORRECT_EMAIL)
        await loginPage.passwordField.setValue(DUMMY_CREDENTIALS.PASSWORD)

        await loginPage.loginBtn.click()

        await loginPage.loginErrorBox.waitForDisplayed()
        const errorText = await loginPage.getErrorText(loginPage.loginErrorBox)
        await expect(errorText).toBe('Invalid email or password')
    })

    it('Should login with the valid credentials', async () => {
        await loginPage.emailField.setValue(process.env.CORRECT_EMAIL)
        await loginPage.passwordField.setValue(process.env.CORRECT_PASSWORD)
        await loginPage.loginBtn.click()

        const myAccountPageTitle = await $('h1[data-test="page-title"]')
        const pageTitleText = await myAccountPageTitle.getText()

        await expect(browser).toHaveUrl('https://practicesoftwaretesting.com/account')
        await expect(pageTitleText).toBe('My account')
    })

    it('Should reveal the password when click the "Eye" icon', async () => {
        await loginPage.passwordField.setValue(DUMMY_CREDENTIALS.PASSWORD)
        let inputType = await loginPage.passwordField.getAttribute('type')
        await expect(inputType).toBe('password')
        await loginPage.eyeIcon.click()

        inputType = await loginPage.passwordField.getAttribute('type')
        await expect(inputType).toBe('text')
    })

    it('Should show the error message when restoring the password without the email', async () => {
        await loginPage.forgotPaswordLink.click()

        await forgotPasswordPage.setNewPasswordBtn.click()
        await forgotPasswordPage.errorBox.waitForDisplayed()
        const errorText = await forgotPasswordPage.errorBox.getText()
        await expect(errorText).toBe('Email is required')
    })
})  