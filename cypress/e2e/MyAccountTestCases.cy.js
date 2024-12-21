/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { MyAccountPage } from "../pageObjects/MyAccountPage";

const loginPage = new LoginPage
const homePage = new HomePage
const myAccountPage = new MyAccountPage

describe('My Account Functionality test cases', () => {
    const loginEmail = Cypress.config('users').user1.username
    const loginPassword = Cypress.config('users').user1.password

    beforeEach(() => {
        loginPage.goToLogin()
        loginPage.login(loginEmail, loginPassword)
        homePage.validateHomePage()
    })
    it('TC_Account_001 - Save updates to user details', () => {
        const firstName = 'Drew'
        const lastName = 'Berg'
        const company = 'Test Company'
        const email = loginEmail
        const invoicesEmail = loginEmail
        const newPassword = loginPassword
        const confPassword = loginPassword
        const billingAddress = 'SJA Enterprises, Inc. 2896 Crescent Avenue, Suite 201 Eugene, OR 97408'
        myAccountPage.goToMyAccount()
        myAccountPage.UpdateMyAccount(firstName, lastName, company, email, invoicesEmail, newPassword, confPassword, billingAddress)
        myAccountPage.clickConfirmChanges()
        myAccountPage.validateSuccessMessage('Your details were successfully updated')
    })
    it('TC_Account_002 - Update password in My Account', () => {
        const firstName = 'Drew'
        const lastName = 'Berg'
        const company = 'Test Company'
        const email = loginEmail
        const invoicesEmail = loginEmail
        const newPassword = loginPassword
        const confPassword = loginPassword
        const billingAddress = 'SJA Enterprises, Inc. 2896 Crescent Avenue, Suite 201 Eugene, OR 97408'
        myAccountPage.goToMyAccount()
        myAccountPage.UpdateMyAccount(firstName, lastName, company, email, invoicesEmail, newPassword, confPassword, billingAddress)
        myAccountPage.clickConfirmChanges()
        myAccountPage.validateSuccessMessage('Your details were successfully updated')
    })
    it('TC_Account_003 - Update time zone', () => {
        myAccountPage.goToMyAccount()
        myAccountPage.updateTimeZone('Asia/Karachi')
        myAccountPage.validateSuccessMessage('Your settings were successfully updated.')
    })
    it('TC_Account_004 - Enable/Disable email notifications', () => {
        myAccountPage.goToMyAccount()
        myAccountPage.setEnableNotification('disable')
        myAccountPage.validateSuccessMessage('Your settings were successfully updated.')
        myAccountPage.setEnableNotification('enable')
        myAccountPage.validateSuccessMessage('Your settings were successfully updated.')
    })
    it('TC_Account_005 - Enable/Disable newsletter subscription', () => {
        myAccountPage.goToMyAccount()
        myAccountPage.setNewsletterSubscription('disable')
        myAccountPage.validateSuccessMessage('Your settings were successfully updated.')
        myAccountPage.setNewsletterSubscription('enable')
        myAccountPage.validateSuccessMessage('Your settings were successfully updated.')
    })
    it('TC_Account_006 - Account cancellation from My Account', () => {
        myAccountPage.goToMyAccount()
        myAccountPage.validateAccountCancelation()
    })
})