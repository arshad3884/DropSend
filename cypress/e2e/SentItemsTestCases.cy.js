///<reference types="cypress"/>


import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { SentItemsPage } from "../pageObjects/SentItemsPage";
import { LandingPage } from "../pageObjects/LandingPage";
import { ReuseableCode } from "../support/ReuseableCode";
import { InboxPage } from "../pageObjects/InboxPage";

const loginPage = new LoginPage
const homePage = new HomePage
const sentItemsPage = new SentItemsPage
const landingPage = new LandingPage
const reuseableCode = new ReuseableCode
const inboxPage = new InboxPage

describe('My Files > Sent Items test cases', () => {
    const loginEmail = Cypress.config('users').user1.username
    const loginPassword = Cypress.config('users').user1.password

    beforeEach(() => {
        loginPage.goToLogin()
        loginPage.login(loginEmail, loginPassword)
        homePage.validateHomePage()
    })
    it('TC_Sent_001 - Test file listing with correct details', () => {
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.validatePagination()
    })
    it('TC_Sent_002 - Test removing a file from Sent', () => {
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.selectFile(0) //first file
        sentItemsPage.acceptConfirmation('Are you sure you want to delete the selected files?\n\nThis cannot be undone!')
        sentItemsPage.clickRemove()
    })
    it('TC_Sent_003 - Test resending a file from Sent', () => {
        const recipientEmail = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const emailSubject = 'Test resending a file from Sent - TC_Sent_003'
        const message = "Test resending file from Sent items"
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.selectFile(0) //first file
        sentItemsPage.sendAgain(recipientEmail, emailSubject, message)
    })
    it('TC_Sent_004 - Test saving a sent file to Online Storage', () => {
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.selectFile(0) //first file
        sentItemsPage.clickPutInOnlineStorage()
        sentItemsPage.addFileInOnlineStorage('Dropbox')
    })
    it('TC_Sent_005 - Test exporting sent files list to CSV', () => {
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.selectFile(0)
        sentItemsPage.selectFile(1)
        sentItemsPage.selectFile(2)
        sentItemsPage.clickExportToCSV()
    })
    it('TC_Sent_006 - Test checking delivery status of a file', () => {
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.checkDeliveryStatus(0)
    })
    it('TC_Sent_007 - Test changing expiry duration for a sent file', () => {
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.changeExpiry(0, '9 days') //index, duration
        sentItemsPage.selectFile(0) //select that file
        sentItemsPage.clickRemove() //remove it
    })
    it('TC_Sent_008 - Test navigation across multiple pages in Sent', () => {
        sentItemsPage.goToSentItems()
        sentItemsPage.validateSentItems()
        sentItemsPage.validatePagination()
    })
})