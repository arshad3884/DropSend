///<reference types="cypress"/>


import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { InboxPage } from "../pageObjects/InboxPage";

const loginPage = new LoginPage
const homePage = new HomePage
const inboxPage = new InboxPage

describe('My Files > Inbox test cases', () => {
    const loginEmail = Cypress.config('users').user1.username
    const loginPassword = Cypress.config('users').user1.password


    beforeEach(() => {
        loginPage.goToLogin()
        loginPage.login(loginEmail, loginPassword)
        //homePage.closeaddModal()
        homePage.validateHomePage()
    })
    it('TC_Inbox_001 - Test file listing with correct details', () => {
        inboxPage.goToInbox()
        inboxPage.validateInbox()
        inboxPage.validatePagination()
    })
    it('TC_Inbox_002 - Test file download from the Inbox', () => {
        inboxPage.goToInbox()
        inboxPage.validateInbox()
        inboxPage.selectFile(0) //download first available file
        inboxPage.clickDownload()
    })
    it('TC_Inbox_003 - Test downloading multiple files', () => {
        inboxPage.goToInbox()
        inboxPage.validateInbox()
        //download multiple files
        inboxPage.selectFile(0)
        inboxPage.selectFile(1)
        inboxPage.selectFile(2)
        inboxPage.clickDownload()
    })
    it('TC_Inbox_004 - Test removing a file from the Inbox', () => {
        inboxPage.goToInbox()
        inboxPage.validateInbox()
        inboxPage.selectFile(0) //first file in table
        inboxPage.clickRemove()
    })
    it('TC_Inbox_005 - Test saving a file to Online Storage', () => {
        inboxPage.goToInbox()
        inboxPage.validateInbox()
        inboxPage.selectFile(0) //first file in table
        inboxPage.clickOnlineStorage()
        inboxPage.addFileInOnlineStorage('Dropbox') //storage
    })
    it('TC_Inbox_006 - Test navigation across multiple pages in the Inbox', () => {
        inboxPage.goToInbox()
        inboxPage.validateInbox()
        inboxPage.validatePagination()
    })
})