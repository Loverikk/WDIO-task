import { ForgotPasswordPage } from "../po/pages/forgotPasswordPage"
import { LoginPage } from "../po/pages/loginPage"
import { AccountPage } from "../po/pages/accountPage"
import { PAGE_PATHS, DUMMY_CREDENTIALS, ERROR_MESSAGES, TYPES } from "../data"

describe('Login page', async () => {
    const loginPage = new LoginPage(PAGE_PATHS.LOGIN)
    const forgotPasswordPage = new ForgotPasswordPage(PAGE_PATHS.FORGOT_PASSWORD)
    const accountPage = new AccountPage(PAGE_PATHS.MY_ACCOUNT)

    beforeEach(async () => {
        loginPage.open()
    })

    it('Should show the error when login with empty fields', async () => {
        await loginPage.loginBtn.click()
        await loginPage.emailErrorBox.waitForDisplayed()
        await loginPage.passwordErrorBox.waitForDisplayed()
        const emailErrorText = await loginPage.getErrorText(loginPage.emailErrorBox)
        const passwordErrorText = await loginPage.getErrorText(loginPage.passwordErrorBox)
        await expect(emailErrorText).toBe(ERROR_MESSAGES.EMAIL_REQUIRED)
        await expect(passwordErrorText).toBe(ERROR_MESSAGES.PASSWORD_REQUIRED)
    })

    it('Should show the error when login with the invalid email', async () => {
        await loginPage.typeInEmail(DUMMY_CREDENTIALS.EMAIL)
        await loginPage.typeInPassword(process.env.CORRECT_PASSWORD)
        await loginPage.loginBtn.click()

        await loginPage.loginErrorBox.waitForDisplayed()
        const loginErrorText = await loginPage.getErrorText(loginPage.loginErrorBox)
        await expect(loginErrorText).toBe(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD)
    })

    it('Should show the error when login with the invalid password', async () => {
        await loginPage.typeInEmail(process.env.CORRECT_EMAIL)
        await loginPage.typeInPassword(DUMMY_CREDENTIALS.PASSWORD)
        await loginPage.loginBtn.click()

        await loginPage.loginErrorBox.waitForDisplayed()
        const errorText = await loginPage.getErrorText(loginPage.loginErrorBox)
        await expect(errorText).toBe(ERROR_MESSAGES.INVALID_EMAIL_OR_PASSWORD)
    })

    it('Should login with the valid credentials', async () => {
        await loginPage.typeInEmail(process.env.CORRECT_EMAIL)
        await loginPage.typeInPassword(process.env.CORRECT_PASSWORD)
        await loginPage.loginBtn.click()

        const pageTitleText = await accountPage.pageTitleText

        await expect(browser).toHaveUrl(PAGE_PATHS.MY_ACCOUNT_FULL)
        await expect(pageTitleText).toBe('My account')
    })

    it('Should reveal the password when click the "Eye" icon', async () => {
        await loginPage.typeInPassword(DUMMY_CREDENTIALS.PASSWORD)
        let inputType = await loginPage.emailFieldType
        await expect(inputType).toBe(TYPES.PASSWORD)
        await loginPage.eyeIcon.click()

        inputType = await loginPage.emailFieldType
        await expect(inputType).toBe(TYPES.TEXT)
    })

    it('Should show the error message when restoring the password without the email', async () => {
        await loginPage.forgotPaswordLink.click()

        await forgotPasswordPage.setNewPasswordBtn.click()
        await forgotPasswordPage.errorBox.waitForDisplayed()
        const errorText = await forgotPasswordPage.getErrorMessage()
        await expect(errorText).toBe(ERROR_MESSAGES.EMAIL_REQUIRED)
    })
})  