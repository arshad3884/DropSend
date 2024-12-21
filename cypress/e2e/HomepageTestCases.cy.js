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

describe('Homepage test cases', () => {
    const loginEmail = Cypress.config('users').user1.username
    const loginPassword = Cypress.config('users').user1.password
    const accountUrl = Cypress.env('accountUrl')

    beforeEach(() => {
        loginPage.goToLogin()
        loginPage.login(loginEmail, loginPassword)
        homePage.validateHomePage()
    })
    it('TC-Home-001 - Validate recent files are displayed correctly', () => {
        homePage.validateRecentFiles()
    })
    it('TC-Home-002 - Validate storage usage updates accurately', () => {
        homePage.validateStorageUsed()
    })
    it('TC-Home-003 - Validate file send usage updates correctly', () => {
        homePage.getFileSentCount().then((fileSentCount) => {
            cy.wrap(fileSentCount).as('OldCount')
        })
        const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const emailSubject = 'Validate file send usage updates correctly - TC-Home-003'
        sendFiles.openSendFilesModal()
        sendFiles.uploadFile('testImage.jpeg')
        sendFiles.addRecipient(recipientEmail)
        sendFiles.addSubject(emailSubject)
        sendFiles.clickSend()
        sendFiles.validateSendingStatus()
        //Validate File Send Count (after sending a file)
        cy.visit(`${accountUrl}`)
        homePage.getFileSentCount().then(fileSentCount => {
            cy.get('@OldCount').then(OldCount => {
                expect(fileSentCount).to.be.eq(parseInt(OldCount) + 1)
            })
        })
    })
    it('TC-Home-004 - Verify user plan details are displayed', () => {
        homePage.getCurrentPlanDetail()
    })
    it('TC-Home-005 - Verify "Edit Payment Information" functionality', () => {
        const ccHolderName = "Drew Berg"
        const ccType = 'Visa'
        const ccNumber = '4242424242424242'
        const expiryMonth = '12'
        const expiryYear = '2028'
        const zipCode = '45000'
        const country = 'Pakistan'
        homePage.editPaymentMethod(ccHolderName, ccType, ccNumber, expiryMonth, expiryYear, zipCode, country)
    })
    it('TC-Home-006 - Verify storage usage graph updates dynamically', () => {
        homePage.validateStorageUsed()
    })
    it('TC-Home-007 - Update the payment details using valid 3DS credit card', () => {
        const ccHolderName = "Drew Berg"
        const ccType = 'Visa'
        const ccNumber = '4000000000003220' //3ds card
        const expiryMonth = '12'
        const expiryYear = '2028'
        const zipCode = '45000'
        const country = 'Pakistan'
        homePage.editPaymentMethod(ccHolderName, ccType, ccNumber, expiryMonth, expiryYear, zipCode, country)
        homePage.clickConfirmChanges()
        homePage.validateSuccessMessage('Your card details were successfully changed. Thank you!')
    })
    it('TC-Home-008 - Update the payment details using invalid credit card', () => {
        const ccHolderName = "Drew Berg"
        const ccType = 'Visa'
        const ccNumber = '4242424242424243' //invalid card
        const expiryMonth = '12'
        const expiryYear = '2028'
        const zipCode = '45000'
        const country = 'Pakistan'
        homePage.editPaymentMethod(ccHolderName, ccType, ccNumber, expiryMonth, expiryYear, zipCode, country)
        homePage.clickConfirmChanges()
        homePage.validateCCError(`We're sorry, but your credit card was declined. Please check your details and try again`)
    })
})