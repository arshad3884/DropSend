/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegisterPage } from "../pageObjects/RegisterPage";
import { ReuseableCode } from "../support/ReuseableCode";

const loginPage = new LoginPage
const homePage = new HomePage
const registerPage = new RegisterPage
const reuseableCode = new ReuseableCode

describe('Register Functionality test cases', () => {

  beforeEach(() => {
    cy.visit('/')
  })
  it('TC_SIGNUP_001 - Verify signup with valid data', () => {
    //Go to Register
    registerPage.goToRegister()

    const fullName = (reuseableCode.getRandomFirstName())+ ' ' + (reuseableCode.getRandomLastName())
    const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const companyName = 'TestQACompany'
    const password = 'Boring123'
    registerPage.addNewUserDetails(fullName, email, companyName, password, password)
    registerPage.clickRegister()
    
    //Delete the created account
    loginPage.login(email, password)
    homePage.validateHomePage()
    registerPage.deleteAccount()
  })
  it('TC_SIGNUP_002 - Verify error when password and confirmation do not match', () => {
    //Go to Register
    registerPage.goToRegister()

    const fullName = (reuseableCode.getRandomFirstName())+ ' ' + (reuseableCode.getRandomLastName())
    const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const companyName = 'TestQACompany'
    const password = 'Boring123'
    const confPassword = 'Boring321'
    registerPage.addNewUserDetails(fullName, email, companyName, password, confPassword)
    registerPage.clickRegister()
    
    registerPage.validateErrorText('Your passwords do not match.', 4)
    registerPage.validateErrorText('Please check above errors!!!!', 5)
  })
  it('TC_SIGNUP_003 - Verify error when required fields are empty', () => {
    //Go to Register
    registerPage.goToRegister()
    //Without adding user details
    registerPage.clickRegister()
    
    registerPage.validateErrorText('Enter Full name, (Example: ABC XYZ)!', 0)
    registerPage.validateErrorText('This field is required!', 1)
    registerPage.validateErrorText('This field is required!', 3)
    registerPage.validateErrorText('This field is required!', 4)
    registerPage.validateErrorText('Please check above errors!!!!', 5)
  })
  it('TC_SIGNUP_004 - Verify error for invalid email format', () => {
    //Go to Register
    registerPage.goToRegister()

    const fullName = (reuseableCode.getRandomFirstName())+ ' ' + (reuseableCode.getRandomLastName())
    const email = 'invalidEmail'
    const companyName = 'TestQACompany'
    const password = 'Boring123'
    registerPage.addNewUserDetails(fullName, email, companyName, password, password)
    registerPage.clickRegister()
    
    registerPage.validateErrorText('"invalidEmail" is not a valid email address (Example: name@yoursite.com).', 1)
    registerPage.validateErrorText('Please check above errors!!!!', 5)
  })
  it('TC_SIGNUP_005 - Verify error for weak password', () => {
    //Go to Register
    registerPage.goToRegister()

    const fullName = (reuseableCode.getRandomFirstName())+ ' ' + (reuseableCode.getRandomLastName())
    const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const companyName = 'TestQACompany'
    const password = '123' //weak password
    registerPage.addNewUserDetails(fullName, email, companyName, password, password)
    registerPage.clickRegister()
    
    registerPage.validateErrorText('Please choose a password without spaces, of between 7 and 50 characters.', 3)
    registerPage.validateErrorText('Please check above errors!!!!', 5)
  })
  it('TC_SIGNUP_006 - Verify error when terms checkbox is not checked', () => {
    //Go to Register
    registerPage.goToRegister()

    const fullName = (reuseableCode.getRandomFirstName())+ ' ' + (reuseableCode.getRandomLastName())
    const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const companyName = 'TestQACompany'
    const password = 'Boring123'
    registerPage.addNewUserDetails(fullName, email, companyName, password, password)
    registerPage.unCheckTermsCOndition() //uncheck
    registerPage.clickRegister()
    
    registerPage.validateErrorText('Please tick the box to agree to our Terms and Conditions to continue.', 5)
  })
  it('TC_SIGNUP_007 - Verify error when signing up with an existing email', () => {
    //Go to Register
    registerPage.goToRegister()

    const fullName = (reuseableCode.getRandomFirstName())+ ' ' + (reuseableCode.getRandomLastName())
    const email = 'dropsendtest1@yopmail.com' //Existing account
    const companyName = 'TestQACompany'
    const password = 'Boring123'
    registerPage.addNewUserDetails(fullName, email, companyName, password, password)
    registerPage.clickRegister()
    
    registerPage.validateError('Looks like you already have an account with Drop Send. You can now')
    registerPage.validateError('by entering your email address and password.')
    registerPage.validateError('Please note that your account could have been created for you automatically while you')
    registerPage.validateError('have received a file sent to you by a DropSend user. You should have received your')
    registerPage.validateError('login')
    registerPage.validateError('information via email.')
    registerPage.validateError('If you have forgot your password please ')
    registerPage.validateError('click here')
    registerPage.validateError('to get a new one.')
  })
  it('TC_SIGNUP_008 - Verify that the Company field is optional', () => {
    //Go to Register
    registerPage.goToRegister()

    const fullName = (reuseableCode.getRandomFirstName())+ ' ' + (reuseableCode.getRandomLastName())
    const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const companyName = null //blank
    const password = 'Boring123'
    registerPage.addNewUserDetails(fullName, email, companyName, password, password)
    registerPage.clickRegister()
    
    //Delete the created account
    loginPage.login(email, password)
    homePage.validateHomePage()
    registerPage.deleteAccount()

  })
  
})
