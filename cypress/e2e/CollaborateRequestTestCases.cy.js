/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { ReuseableCode } from "../support/ReuseableCode";
import { Collaborate } from "../pageObjects/Collaborate";

const loginPage = new LoginPage
const homePage = new HomePage
const reuseableCode = new ReuseableCode
const collaborate = new Collaborate

describe('Collaborate Request Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password

  beforeEach(() => {
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
    homePage.validateHomePage()
  })
  it('TC_COL_001 - Validate Navigation to "Collaborate" Form', () => {
    collaborate.openCollaborateModal()
  })
  it('TC_COL_002 - Validate Fields in the "Collaborate" Form', () => {
    const folderName = (reuseableCode.generateRandomString(10))
    collaborate.openCollaborateModal()
    collaborate.validateCollaborateRequestFields(loginEmail)
    collaborate.addCollaborationFolderName(folderName)
    collaborate.clickSend()
    collaborate.validateErrorAlert('You should enter one recipient')
  })
  it('TC_COL_003 - Validate Sending Collaboration Request', () => {
    const folderName = (reuseableCode.generateRandomString(10))
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    collaborate.openCollaborateModal()
    collaborate.validateCollaborateRequestFields(loginEmail)
    collaborate.addCollaborationFolderName(folderName)
    collaborate.addRecipient(recipientEmail)
    collaborate.clickSend()
    collaborate.validateRequestConfirmation(recipientEmail)
  })
  it('TC_COL_004 - Validate Error for Invalid Recipient Email', () => {
    const folderName = (reuseableCode.generateRandomString(10))
    const recipientEmail = 'invalidEmail'
    collaborate.openCollaborateModal()
    collaborate.validateCollaborateRequestFields(loginEmail)
    collaborate.addCollaborationFolderName(folderName)
    collaborate.addRecipient(recipientEmail)
    collaborate.clickSend()
    collaborate.validateErrorAlert('"'+recipientEmail+'" is not a valid email address (Example: name@yoursite.com)')
  })
  it('TC_COL_005 - Validate Email Preview Feature', () => {
    collaborate.openCollaborateModal()
    collaborate.validateCollaborateRequestFields(loginEmail) //Email Preview
  })
})
