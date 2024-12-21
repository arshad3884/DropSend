/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LandingPage } from "../pageObjects/LandingPage";
import { LoginPage } from "../pageObjects/LoginPage";
import { ReuseableCode } from "../support/ReuseableCode";

const loginPage = new LoginPage
const homePage = new HomePage
const landingPage = new LandingPage
const reuseableCode = new ReuseableCode

describe('Landing Page Validation test cases', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('TC_Landing_001 - Test all header link on the homepage', () => {
    landingPage.validateLandingPage() //validate landing page
    landingPage.validateHeaderLinks()

  })
  it('TC_Landing_002 - Test all footer links on the homepage', () => {
    landingPage.validateLandingPage() //validate landing page
    landingPage.validateFooterLinks()

  })
  it('TC_Landing_003 - Test help page functionality', () => {
    landingPage.validateLandingPage() //validate landing page
    landingPage.validateHelpPage()

  })
  it('TC_Landing_004 - Test Pricing page loads properly', () => {
    landingPage.validateLandingPage() //validate landing page
    landingPage.validatePricingPage()

  })
  it('TC_Landing_005 - Test DropShare page loads properly', () => {
    landingPage.validateLandingPage() //validate landing page
    landingPage.validateDropSharePage()

  })
  it('TC_Landing_006 - Test Blogs page loads properly', () => {
    landingPage.validateLandingPage() //validate landing page
    landingPage.validateBlogPage()

  })
  it('TC_Landing_007 - Test support chat functionality', () => {
    landingPage.validateLandingPage() //validate landing page
    landingPage.sendSupportChat('Testing Automation')
  })

})
