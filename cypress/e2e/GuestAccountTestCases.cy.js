/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LandingPage } from "../pageObjects/LandingPage";
import { LoginPage } from "../pageObjects/LoginPage";
import { ReuseableCode } from "../support/ReuseableCode";

const loginPage = new LoginPage
const homePage = new HomePage
const landingPage = new LandingPage
const reuseableCode = new ReuseableCode

describe('Guest functionality test cases', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('TC_Guest_001 - Email verification File send functionality is working', () => {

    landingPage.validateLandingPage() //validate landing page

    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const senderEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Guest Account testing File TC_Guest_001'
    const emailMessage = 'This is a testing email from a DropSend guest account'
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0) //upload file
    landingPage.clickUpload() //click Upload
    landingPage.validateError("Please verify your email before proceeding. We've sent a verification link to the email address you provided")

    loginPage.goToYopmail(senderEmail)
    landingPage.verifySenderEmailOnYopmail()

    cy.visit('/')
    landingPage.validateLandingPage() //validate landing page
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0)
    landingPage.clickUpload()

    landingPage.validateUploading()//validate uploading
    landingPage.clickSend() //Click Send
    landingPage.validateFileSendingConfirmation(emailSubject, emailMessage, recipientEmail) //Validate File Sending confirmation

  })
  xit('TC_Guest_002 - File size restriction to 250 MB', () => {

    landingPage.validateLandingPage() //validate landing page
    landingPage.uploadFile('250MB-Testfile.zip', 0)//upload file
    landingPage.clickUpload() //click Upload
    landingPage.validateError("Please verify your email before proceeding. We've sent a verification link to the email address you provided")

  })
  it('TC_Guest_003 - Max file upload limit of 5 files', () => {

    landingPage.uploadFile('testImage.jpeg', 0)
    landingPage.uploadFile('idCardBack.jpeg', 1)
    landingPage.uploadFile('idCardFront.jpeg', 2)
    landingPage.uploadFile('visaCard.jpeg', 3)
    landingPage.uploadFile('back.pdf', 4)
    cy.get('input[id="files-to-send"]').should('exist').attachFile(('Files/' + 'card.pdf')).wait(1000) //5th file upload
    //validate error page
    landingPage.validateErrorPage()

  })
  it('TC_Guest_004 - Max recipient limit to 5 email addresses', () => {
    landingPage.validateLandingPage() //validate landing page

    landingPage.addrecipient('testrecipient1@yopmail.com')
    landingPage.addrecipient('testrecipient2@yopmail.com')
    landingPage.addrecipient('testrecipient3@yopmail.com')
    landingPage.addrecipient('testrecipient4@yopmail.com')
    landingPage.addrecipient('testrecipient5@yopmail.com')
    landingPage.addrecipient('testrecipient6@yopmail.com')
  
    cy.get('[id="chip-container"]').should('not.contain.text', 'testrecipient6@yopmail.com')   //6th recipient will not be added
  })
  it('TC_Guest_005 - File download link is functional', () => {

    landingPage.validateLandingPage() //validate landing page

    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const senderEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Guest Account testing File TC_Guest_005'
    const emailMessage = 'This is a testing email from a DropSend guest account'
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0) //upload file
    landingPage.clickUpload() //click Upload
    landingPage.validateError("Please verify your email before proceeding. We've sent a verification link to the email address you provided")

    loginPage.goToYopmail(senderEmail)
    landingPage.verifySenderEmailOnYopmail()

    cy.visit('/')
    landingPage.validateLandingPage() //validate landing page
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0)
    landingPage.clickUpload()

    landingPage.validateUploading()//validate uploading
    landingPage.clickSend() //Click Send
    landingPage.validateFileSendingConfirmation(emailSubject, emailMessage, recipientEmail) //Validate File Sending confirmation

    //Verify file download link and download page
    loginPage.goToYopmail(recipientEmail)
    landingPage.getFileDownloadLinkFromYopmail()
    landingPage.verifyFileDownloadPage(senderEmail, recipientEmail, emailSubject, emailMessage, 1) //file count
  })
  it('TC_Guest_006 - Zip folder download works for multiple files', () => {

    landingPage.validateLandingPage() //validate landing page

    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const senderEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Guest Account testing File TC_Guest_006 - Zip folder download works for multiple files'
    const emailMessage = 'This is a testing email from a DropSend guest account'
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0) //upload file
    landingPage.clickUpload() //click Upload
    landingPage.validateError("Please verify your email before proceeding. We've sent a verification link to the email address you provided")

    loginPage.goToYopmail(senderEmail)
    landingPage.verifySenderEmailOnYopmail()

    cy.visit('/')
    landingPage.validateLandingPage() //validate landing page
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0) //upload file
    landingPage.uploadFile('back.pdf', 1) //upload file
    landingPage.uploadFile('visaCard.jpeg', 2) //upload file
    landingPage.uploadFile('card.pdf', 3) //upload file
    landingPage.clickUpload()

    landingPage.validateUploading()//validate uploading
    landingPage.clickSend() //Click Send
    landingPage.validateFileSendingConfirmation(emailSubject, emailMessage, recipientEmail) //Validate File Sending confirmation

    //Verify file download link and download page
    loginPage.goToYopmail(recipientEmail)
    landingPage.getFileDownloadLinkFromYopmail()
    landingPage.verifyFileDownloadPage(senderEmail, recipientEmail, emailSubject, emailMessage, 4) //File count
  })
  it('TC_Guest_007 - File send success page is displayed and functional', () => {

    landingPage.validateLandingPage() //validate landing page

    const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const senderEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    const emailSubject = 'Guest Account testing File TC_Guest_007'
    const emailMessage = 'This is a testing email from a DropSend guest account'
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0) //upload file
    landingPage.clickUpload() //click Upload
    landingPage.validateError("Please verify your email before proceeding. We've sent a verification link to the email address you provided")

    loginPage.goToYopmail(senderEmail)
    landingPage.verifySenderEmailOnYopmail()

    cy.visit('/')
    landingPage.validateLandingPage() //validate landing page
    landingPage.addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) //Add email details
    landingPage.uploadFile('testImage.jpeg', 0)
    landingPage.clickUpload()

    landingPage.validateUploading()//validate uploading
    landingPage.clickSend() //Click Send
    landingPage.validateFileSendingConfirmation(emailSubject, emailMessage, recipientEmail) //Validate File Sending confirmation
  })
})
