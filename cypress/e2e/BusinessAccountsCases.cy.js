/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { RegisterPage } from "../pageObjects/RegisterPage";
import { PlansPage } from "../pageObjects/PlansPage";
import { ReuseableCode } from "../support/ReuseableCode"
import { BusinessPage } from "../pageObjects/BusinessPage";

const loginPage = new LoginPage
const homePage = new HomePage
const registerPage = new RegisterPage
const plansPage = new PlansPage
const reuseableCode = new ReuseableCode
const businessPage = new BusinessPage

describe('Business Accounts Plans subscriptions test cases', () => {

    const businessEmail = Cypress.config('users').user4.username 
    const businessPassword = Cypress.config('users').user4.password
    
    const accountUrl = Cypress.env('accountUrl')
    const businessURL = Cypress.env('businessURL')
    const businessLiteURL = Cypress.env('businessLiteURL')

    beforeEach(() => {
    })
    it('TC_BUSINESS_001 - Upgrade to BUSINESS LITE Plan using Credit card', () => {   
        //Register a new User
        registerPage.goToRegister()

        const fullName = (reuseableCode.getRandomFirstName()) + ' ' + (reuseableCode.getRandomLastName())
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestQACompany'
        const password = 'Boring123'
        registerPage.addNewUserDetails(fullName, email, companyName, password, password)
        registerPage.clickRegister()

        loginPage.login(email, password)
        homePage.validateHomePage()
    
        //Upgrade to BUSINESS LITE plan
        plansPage.goToPlans()
        plansPage.upgradePlan('BUSINESS LITE', null, 'businesslite1')  //planName, Coupon, sub-domain
        cy.get('@domain').then(domain => {
            cy.visit(domain)
        })
        loginPage.login(email, password)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business Lite')
        })
        
        //Delete the created account
        loginPage.login(email, password)
        homePage.validateHomePage()
        registerPage.deleteAccount()
        
    })
    it('TC_BUSINESS_002 - Upgrade to BUSINESS LITE Plan using Promo Code', () => {
        //Register a new User
        registerPage.goToRegister()

        const fullName = (reuseableCode.getRandomFirstName()) + ' ' + (reuseableCode.getRandomLastName())
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestQACompany'
        const password = 'Boring123'
        registerPage.addNewUserDetails(fullName, email, companyName, password, password)
        registerPage.clickRegister()

        loginPage.login(email, password)
        homePage.validateHomePage()
        
        //Upgrade to BUSINESS LITE plan
        plansPage.goToPlans()
        plansPage.upgradePlan('BUSINESS LITE', 'test1', 'businesslite')  //planName, Coupon, sub-domain
        cy.get('@domain').then(domain => {
            cy.visit(domain)
        })
        loginPage.login(email, password)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business Lite1')
        })
        
        //Delete the created account
        loginPage.login(email, password)
        homePage.validateHomePage()
        registerPage.deleteAccount()
    })
    it('TC_BUSINESS_003 - Upgrade to BUSINESS Plan using Credit card', () => {
        //Register a new User
        registerPage.goToRegister()

        const fullName = (reuseableCode.getRandomFirstName()) + ' ' + (reuseableCode.getRandomLastName())
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestQACompany'
        const password = 'Boring123'
        registerPage.addNewUserDetails(fullName, email, companyName, password, password)
        registerPage.clickRegister()

        loginPage.login(email, password)
        homePage.validateHomePage()
    
        //Upgrade to BUSINESS LITE plan
        plansPage.goToPlans()
        plansPage.upgradePlan('BUSINESS', null, 'business1')  //planName, Coupon, sub-domain
        cy.get('@domain').then(domain => {
            cy.visit(domain)
        })
        loginPage.login(email, password)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business')
        })
        
        //Delete the created account
        loginPage.login(email, password)
        homePage.validateHomePage()
        registerPage.deleteAccount()
    })
    it('TC_BUSINESS_004 - Upgrade to BUSINESS Plan using Promo Code', () => {
        //Register a new User
        registerPage.goToRegister()

        const fullName = (reuseableCode.getRandomFirstName()) + ' ' + (reuseableCode.getRandomLastName())
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestQACompany'
        const password = 'Boring123'
        registerPage.addNewUserDetails(fullName, email, companyName, password, password)
        registerPage.clickRegister()

        loginPage.login(email, password)
        homePage.validateHomePage()
        
        //Upgrade to BUSINESS LITE plan
        plansPage.goToPlans()
        plansPage.upgradePlan('BUSINESS', 'test1', 'business1')  //planName, Coupon, sub-domain
        cy.get('@domain').then(domain => {
            cy.visit(domain)
        })
        loginPage.login(email, password)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business')
        })
        
        //Delete the created account
        loginPage.login(email, password)
        homePage.validateHomePage()
        registerPage.deleteAccount()
    })
    it('TC_BUSINESS_005 - BUSINESS account Login attempt shows a message that redirects to business domain', () => {
        loginPage.goToLogin()
        loginPage.login(businessEmail, businessPassword)
        cy.get('[id="errormsg"]').if().should('be.visible').then(errorMsg => {  //If error shows on login find the domain
            cy.wrap(errorMsg).should('contain.text', 'Make sure to use this domain to login to your account')
            cy.get('[id="errormsg"] a').should('be.visible').invoke('text').then((domain) => { //extract and visit the domain link 
                cy.visit(domain)
                loginPage.login(businessEmail, businessPassword)
                homePage.validateHomePage()
            })
        }).else().then(() => {
            homePage.validateHomePage()
        })
        cy.log('The meesage validation is handled!')
    })

    //Using Business account user 4 for login
    it('TC_BUSINESS_006 - Add internal user on a Business account', () => {
        cy.visit(`${businessLiteURL}`)
        loginPage.login(businessEmail, businessPassword)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business Lite')
        })


        const firstName = reuseableCode.getRandomFirstName()
        const lastName = reuseableCode.getRandomLastName()
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestCompany'
        const userType = 'Internal' //Internal, External, Admnin
        const subject = 'Test Subject TC_BUSINESS_006'
        businessPage.gotoUsers()
        businessPage.addUser(firstName, lastName, email, companyName, userType, subject)
        //Remove user
        businessPage.deleteUser((firstName + ' ' + lastName))
    })
    it('TC_BUSINESS_007 - Add external user on a Business account', () => {
        cy.visit(`${businessLiteURL}`)
        loginPage.login(businessEmail, businessPassword)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business Lite')
        })

        const firstName = reuseableCode.getRandomFirstName()
        const lastName = reuseableCode.getRandomLastName()
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestCompany'
        const userType = 'External' //Internal, External, Admnin
        const subject = 'Test Subject TC_BUSINESS_006'
        businessPage.gotoUsers()
        businessPage.addUser(firstName, lastName, email, companyName, userType, subject)
        //Remove user
        businessPage.deleteUser((firstName + ' ' + lastName))
    })
    it('TC_BUSINESS_008 - Add Admin user on a Business account', () => {
        cy.visit(`${businessLiteURL}`)
        loginPage.login(businessEmail, businessPassword)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business Lite')
        })

        const firstName = reuseableCode.getRandomFirstName()
        const lastName = reuseableCode.getRandomLastName()
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestCompany'
        const userType = 'Admin' //Internal, External, Admnin
        const subject = 'Test Subject TC_BUSINESS_006'
        businessPage.gotoUsers()
        businessPage.addUser(firstName, lastName, email, companyName, userType, subject)

        //Remove user
        businessPage.deleteUser((firstName + ' ' + lastName))
    })
    it('TC_BUSINESS_009 - Remove employee users from business account', () => {
        cy.visit(`${businessLiteURL}`)
        loginPage.login(businessEmail, businessPassword)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business Lite')
        })

        const firstName = reuseableCode.getRandomFirstName()
        const lastName = reuseableCode.getRandomLastName()
        const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
        const companyName = 'TestCompany'
        const userType = 'Internal' //Internal, External, Admnin
        const subject = 'Test Subject TC_BUSINESS_006'
        businessPage.gotoUsers()
        businessPage.addUser(firstName, lastName, email, companyName, userType, subject)

        //Remove user
        businessPage.deleteUser((firstName + ' ' + lastName))
    })
    it('TC_BUSINESS_010 - Update Group settings on business account', () => {
        cy.visit(`${businessLiteURL}`)
        loginPage.login(businessEmail, businessPassword)
        plansPage.goToPlans()
        plansPage.getCurrentPlan()
        cy.get('@currentName').then(currentPlan => {
            expect(currentPlan).to.be.eq('Business Lite')
        })
        businessPage.updateSettings()
    })
})