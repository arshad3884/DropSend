/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { SendFiles } from "../pageObjects/SendFiles";
import { LandingPage } from "../pageObjects/LandingPage";
import { ReuseableCode } from "../support/ReuseableCode";

const loginPage = new LoginPage
const homePage = new HomePage
const sendFiles = new SendFiles
const landingPage = new LandingPage
const reuseableCode = new ReuseableCode

describe('Send Files Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password


  beforeEach(() => {
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
    homePage.validateHomePage()
  })
  it('TC_SF_001 - Test "Send Files" modal visibility', () => {
    sendFiles.openSendFilesModal()
  })
  it('TC_SF_002 - Test uploading a file in "Send Files" modal', () => {
    sendFiles.openSendFilesModal()
    sendFiles.uploadFile('testImage.jpeg')
  })
  it('TC_SF_003 - Test removing an uploaded file', () => {
    sendFiles.openSendFilesModal()
    sendFiles.uploadFile('testImage.jpeg')
    sendFiles.removeFile('testImage.jpeg')
  })
  it('TC_SF_004 - Test "Subject" field input validation', () => {
    const emailSubject = 'Test "Subject" field input validation - TC_SF_004'
    sendFiles.openSendFilesModal()
    sendFiles.addSubject(null) //not adding any subject
    sendFiles.clickSend()
    sendFiles.validateErrorAlert('You must enter a subject')
    sendFiles.addSubject(emailSubject)
    sendFiles.clickSend()
  })
  it('TC_SF_005 - Test email field for validation', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    sendFiles.openSendFilesModal()
    sendFiles.addRecipient(null) //no email recipient
    sendFiles.clickSend()
    sendFiles.validateErrorAlert('You must enter some recipients')
    sendFiles.addRecipient(recipientEmail)
  })
  it('TC_SF_006 - Test sending to multiple recipients', () => {
    const recipientEmail1 = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const recipientEmail2 = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    sendFiles.openSendFilesModal()
    sendFiles.addRecipient(null) //no email recipient
    sendFiles.clickSend()
    sendFiles.validateErrorAlert('You must enter some recipients')
    sendFiles.addRecipient(recipientEmail1)
    sendFiles.addRecipient(recipientEmail2)
  })
  it('TC_SF_007 - Send by uploading multiple files', () => {
    const recipientEmail = Cypress.config('users').user1.username
    const emailSubject = 'Test "Subject" Send by uploading multiple files - TC_SF_007'
    sendFiles.openSendFilesModal()
    sendFiles.uploadFile('testImage.jpeg')
    sendFiles.uploadFile('back.pdf')
    sendFiles.uploadFile('front.pdf')
    sendFiles.addRecipient(recipientEmail)
    sendFiles.addSubject(emailSubject)
    sendFiles.clickSend()
    sendFiles.validateSendingStatus()
  })
  it('TC_SF_008 - Test adding files from storage', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Test "Subject" STest adding files from storage - TC_SF_008'
    sendFiles.openSendFilesModal()
    sendFiles.addFileFromStorage()
    sendFiles.addRecipient(recipientEmail)
    sendFiles.addSubject(emailSubject)
    sendFiles.clickSend()
    sendFiles.validateSendingStatus()
  })
  it('TC_SF_009 - Test confirmation message after file is sent', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Test "Subject" Test confirmation message after file is sent - TC_SF_009'
    sendFiles.openSendFilesModal()
    sendFiles.uploadFile('testImage.jpeg')
    sendFiles.addRecipient(recipientEmail)
    sendFiles.addSubject(emailSubject)
    sendFiles.clickSend()
    sendFiles.validateSendingStatus()
  })
  it('TC_SF_010 - Test file download link for recipients', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Guest Account testing File - TC_SF_010'
    const emailMessage = "TC_SF_010 - Test file download link for recipients using Send File"
    sendFiles.openSendFilesModal()
    sendFiles.uploadFile('testImage.jpeg')
    sendFiles.addRecipient(recipientEmail)
    sendFiles.addSubject(emailSubject)
    sendFiles.addMessage(emailMessage)
    sendFiles.clickSend()
    sendFiles.validateSendingStatus()
    //Verify file download link and download page
    loginPage.goToYopmail(recipientEmail)
    landingPage.getFileDownloadLinkFromYopmail()
    landingPage.verifyFileDownloadPage(loginEmail, recipientEmail, emailSubject, emailMessage, 1) //file count
  })
  it('TC_SF_011 - Verify the "preview the email" functionality', () => {
    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Verify the "preview the email" functionality - TC_SF_010'
    const emailMessage = "TC_SF_011 - Verify email preview"
    sendFiles.openSendFilesModal()
    sendFiles.uploadFile('testImage.jpeg')
    sendFiles.addRecipient(recipientEmail)
    sendFiles.addSubject(emailSubject)
    sendFiles.addMessage(emailMessage)
    sendFiles.validateEmailPreview(emailMessage)
  })
})
