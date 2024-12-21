/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { SendFiles } from "../pageObjects/SendFiles";
import { LandingPage } from "../pageObjects/LandingPage";
import { ReuseableCode } from "../support/ReuseableCode";
import { ContactPage } from "../pageObjects/ContactPage";

const loginPage = new LoginPage
const homePage = new HomePage
const sendFiles = new SendFiles
const landingPage = new LandingPage
const reuseableCode = new ReuseableCode
const contactPage = new ContactPage

describe('Contacts Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password

  beforeEach(() => {
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
    homePage.validateHomePage()
  })
  it('TC-Contacts-001 - Verify adding a new contact', () => {
    const firstName = (reuseableCode.getRandomFirstName())
    const lastName = (reuseableCode.getRandomLastName())
    const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    contactPage.goToContactPage()
    contactPage.addContact(firstName, lastName, email)
  })
  it('TC-Contacts-002 - Verify editing a contact', () => {
    const firstName = (reuseableCode.getRandomFirstName())
    const lastName = (reuseableCode.getRandomLastName())
    const email = (reuseableCode.generateRandomString(10) + '@yopmail.com')
    contactPage.goToContactPage()
    contactPage.selectEmail(0) //first contact
    contactPage.editContact(firstName, lastName, email)
  })
  it('TC-Contacts-003 - Verify deleting a contact', () => {
    contactPage.goToContactPage()
    contactPage.selectEmail(0) //first contact
    contactPage.deleteContact()
  })
  it('TC-Contacts-004 - Verify importing contacts via CSV', () => {
    contactPage.goToContactPage()
    contactPage.importContactUsingCSV('example.csv')
  })
  it('TC-Contacts-005 - Verify navigation through pagination', () => {
    contactPage.goToContactPage()
    contactPage.movePagination('Next')
    contactPage.movePagination('Prev')
  })
  it('TC-Contacts-006 - Verify deleting multiple contacts', () => {
    contactPage.goToContactPage()
    contactPage.selectEmail(0) //first contact
    contactPage.selectEmail(1) //2nd contact
    contactPage.deleteContact()
  })
  it('TC-Contacts-007 - Verify sorting contacts by email', () => {
    contactPage.goToContactPage()
    contactPage.sortByEmail()
    contactPage.sortByEmail()
  })
})
