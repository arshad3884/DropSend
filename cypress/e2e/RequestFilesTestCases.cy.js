/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { ReuseableCode } from "../support/ReuseableCode";
import { Request } from "../pageObjects/Request";

const loginPage = new LoginPage
const homePage = new HomePage
const reuseableCode = new ReuseableCode
const request = new Request

describe('Request Files Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password


  beforeEach(() => {
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
    //homePage.closeaddModal()
    homePage.validateHomePage()
  })
  it('TC_Request_001 - Validate "Request File" Form Navigation', () => {
    request.openRequestFileModal()
  })
  it('TC_Request_002 - Validate Fields in "Request File" Form', () => {
    request.openRequestFileModal()
    request.clickSend()
    request.validateErrorAlert('You should enter one recipient')
    request.validateRequestFileFields(loginEmail)
  })
  it('TC_Request_003 - Validate Adding Recipients to Request Form', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    request.openRequestFileModal()
    request.addRecipient(recipientEmail)
    request.clickSend()
    request.validateRequestConfirmation(recipientEmail)
  })
  it('TC_Request_004 - Validate Error for Invalid Email Address', () => {
    const recipientEmail = 'invalidEmail'
    request.openRequestFileModal()
    request.addRecipient(recipientEmail)
    request.clickSend()
    request.validateErrorAlert('"'+recipientEmail+'" is not a valid email address (Example: name@yoursite.com)')
  })
  it('TC_Request_005 - Validate Email Preview Feature', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    request.openRequestFileModal()
    request.addRecipient(recipientEmail)
    request.validateRequestFileFields(loginEmail)
  })
  it('TC_Request_006 - Validate Successful File Request Sending', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    request.openRequestFileModal()
    request.addRecipient(recipientEmail)
    request.clickSend()
    request.validateRequestConfirmation(recipientEmail)
  })
  it('TC_Request_007 - Validate that recepient can upload and send desired file using that link', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const senderName = "Noman QA"
    const senderEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const message = "Sending this file as per your request please acknowledge once received!"
    request.openRequestFileModal()
    request.addRecipient(recipientEmail)
    request.clickSend()
    request.validateRequestConfirmation(recipientEmail)
    //Verify file download link and request page
    loginPage.goToYopmail(recipientEmail)
    request.getFileDownloadLinkFromYopmail()
    request.verifyFileRequestPage(senderName, senderEmail, message)
  })
})
