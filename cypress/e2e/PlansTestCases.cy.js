/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegisterPage } from "../pageObjects/RegisterPage";
import { PlansPage } from "../pageObjects/PlansPage";
import { ReuseableCode } from "../support/ReuseableCode"

const loginPage = new LoginPage
const homePage = new HomePage
const registerPage = new RegisterPage
const plansPage = new PlansPage
const reuseableCode = new ReuseableCode

describe('Plans subscriptions test cases', () => {
    const loginEmail = Cypress.config('users').user2.username
    const loginPassword = Cypress.config('users').user2.password
    const accountUrl = Cypress.env('accountUrl')

    beforeEach(() => {
        loginPage.goToLogin()
        loginPage.login(loginEmail, loginPassword)
        homePage.validateHomePage()
    })
    it('TC_Plans_001 - Display current plan and available plans', () => {
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            plansPage.validateStorageUsed(currentPlan)
        })
        plansPage.getCurrentPlanPrice()
        plansPage.validatePlanCard('LITE')
        plansPage.validatePlanCard('BASIC')
        plansPage.validatePlanCard('STANDARD')
        plansPage.validatePlanCard('PRO')
        plansPage.validatePlanCard('BUSINESS LITE')
        plansPage.validatePlanCard('BUSINESS')
    })
    it('TC_Plans_002 - Upgrade to a Basic plan', () => {
        //Upgrade to Basic plan
        plansPage.goToPlans()
        plansPage.downgradeToLite()
        plansPage.upgradePlan('BASIC')

        cy.visit(`${accountUrl}/landing_pricing`)
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Basic')
        })
    })
    it('TC_Plans_003 - Upgrade to a Standard plan', () => {
        //Upgrade to Basic plan
        plansPage.goToPlans()
        plansPage.downgradeToLite()
        plansPage.upgradePlan('STANDARD')

        cy.visit(`${accountUrl}/landing_pricing`)
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Standard')
        })
    })
    it('TC_Plans_004 - Upgrade to a Pro plan', () => {
        //Upgrade to PRO plan
        plansPage.goToPlans()
        plansPage.downgradeToLite()
        plansPage.upgradePlan('PRO')

        cy.visit(`${accountUrl}/landing_pricing`)
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Pro')
        })
    })
    it('TC_Plans_005 - Upgrade plan with invalid card details', () => {
        //Upgrade to Basic plan
        plansPage.goToPlans()
        plansPage.downgradeToLite()
        //Try to Upgrade to Basic using invalid card details
        cy.visit(`${accountUrl}/account/regrade?landing=1&plan_id=2`)
        cy.get('h1').should('be.visible').and('contain.text', 'Upgrade your plan')
        cy.get('[id="upgrade_info"]:nth-child(2) h2').should('be.visible').and('contain.text', 'You are upgrading from the ').and('contain.text', 'Basic Plan')
        plansPage.addPaymentMethod('1234567890123456', '123', '01', '2028')  //Invalid card details
        cy.get('[id="cc_zip_postcode"]').should('exist').clear().type('45000')
        cy.get('[id="cc_country"]').should('exist').select('Pakistan')
        cy.get('[id="form_confirm"]').should('exist').click() //Continue

        plansPage.validateErrorAlert('The card number you have entered is not valid')

        cy.visit(`${accountUrl}/landing_pricing`)
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Free')
        })
    })
    it('TC_Plans_006 - Upgrade to a Pro plan by applying valid coupon code', () => {
        //Upgrade to PRO plan
        plansPage.goToPlans()
        plansPage.downgradeToLite()
        plansPage.upgradePlan('PRO', 'test1') //Coupon code

        cy.visit(`${accountUrl}/landing_pricing`)
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Pro')
        })
    })
})