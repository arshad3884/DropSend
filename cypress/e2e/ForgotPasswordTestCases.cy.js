/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";

const loginPage = new LoginPage
const homePage = new HomePage

describe('Forgot password Functionality test cases', () => {
  beforeEach(() => {
    loginPage.goToLogin()
  })
  //FORGOT PASSWORD
  it('TC_FORGOT_001 - Verify forgot password request', () => {
    const testEmail = 'testresetpassword@yopmail.com'
    loginPage.forgotPassword(testEmail)
    loginPage.verifyPasswordResetMessage()
    loginPage.goToYopmail(testEmail)
    loginPage.getPasswordFromYopmail()
    loginPage.goToLogin()
    cy.get('@newPassword').then(newPassword => {
      loginPage.login(testEmail, newPassword)
      homePage.validateHomePage()
    })
  })
  it('TC_FORGOT_002 - Verify forgot password with unregistered email', () => {
    const testEmail = 'unregistered@yopmail.com'
    loginPage.forgotPassword(testEmail)
    loginPage.validateErrorOnForgotPassword('There is no user in our database with this email address. Please check if you mistyped the email and try again.')
    loginPage.validateErrorOnForgotPassword('Otherwise, you can')
    loginPage.validateErrorOnForgotPassword('create a new account here')
  })
  it('TC_FORGOT_003 - Verify forgot password with empty email field', () => {
    loginPage.forgotPassword(null)
    loginPage.validateErrorOnForgotPassword('There is no user in our database with this email address. Please check if you mistyped the email and try again.')
    loginPage.validateErrorOnForgotPassword('Otherwise, you can')
    loginPage.validateErrorOnForgotPassword('create a new account here')
  })
  it('TC_FORGOT_004 - Verify the content of the password reset email', () => {
    const testEmail = 'testresetpassword@yopmail.com'
    loginPage.forgotPassword(testEmail)
    loginPage.verifyPasswordResetMessage()
    loginPage.goToYopmail(testEmail)
    loginPage.verifyEmailContentOnYopmail()

  })
})
