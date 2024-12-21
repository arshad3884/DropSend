/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";

const loginPage = new LoginPage
const homePage = new HomePage

describe('Login Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password
  beforeEach(() => {
    loginPage.goToLogin()
  })
  it('TC_LOGIN_001 - Verify login with valid credentials', () => {
    loginPage.login(loginEmail, loginPassword)
    homePage.validateHomePage()
  })
  it('TC_LOGIN_002 - Verify login with invalid credentials', () => {
    loginPage.login('incorrectemail@yopmail.com', '123')
    loginPage.validateError('The username and/or password you entered is invalid')
    loginPage.validateError('click here to get a new one')
    loginPage.validateError('Or you can')
    loginPage.validateError('create a new account here')
  })
  it('TC_LOGIN_003 - Verify login without entering any credentials', () => {
    loginPage.login(null, null)
    loginPage.validateErrorText('This field is required!', 0) //login field error
    loginPage.validateErrorText('This field is required!', 1) // password field error
  })
  it('TC_LOGIN_004 - Verify the "Remember Me" option', () => {
    loginPage.login(loginEmail, loginPassword)
    homePage.validateHomePage()
    homePage.logout()
    //cy.get('[action="/login"] h1').should('be.visible').and('contain.text', 'Welcome back.') //heading
    //cy.get('[action="/login"] [id="mainformuseremail"]').should('be.visible').and('contain.value', loginEmail)
    //cy.get('[action="/login"] [id="mainformpassword"]').should('be.visible').and('contain.value', loginPassword)
  })
})
