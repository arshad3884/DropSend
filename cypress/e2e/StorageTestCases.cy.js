/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { SendFiles } from "../pageObjects/SendFiles";
import { LandingPage } from "../pageObjects/LandingPage";
import { ReuseableCode } from "../support/ReuseableCode";
import { StoragePage } from "../pageObjects/StoragePage";

const loginPage = new LoginPage
const homePage = new HomePage
const sendFiles = new SendFiles
const landingPage = new LandingPage
const reuseableCode = new ReuseableCode
const storagePage = new StoragePage

describe('Files > Storage Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password


  beforeEach(() => {
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
    //homePage.closeaddModal()
    homePage.validateHomePage()
  })
  it('TC_Storage_001 - Verify adding a new storage folder', () => {
    const folderName = reuseableCode.generateRandomString('6')
    const description = 'Test Storage Folder Creation'
    storagePage.goToStorage()
    storagePage.addNewStorageFolder(folderName, description)
    storagePage.goToStorage()
    storagePage.removeStorageFolder(folderName)
  })
  it('TC_Storage_002 - Verify editing a storage folder', () => {
    const folderName = reuseableCode.generateRandomString('6')
    const description = 'Test Storage Folder Editing'
    const newName = reuseableCode.generateRandomString('6')
    const newDescp = 'Test Storage Folder Editing Updated'
    storagePage.goToStorage()
    storagePage.addNewStorageFolder(folderName, description)
    storagePage.goToStorage()
    storagePage.editStorageFolder(folderName, newName, newDescp)
    storagePage.goToStorage()
    storagePage.removeStorageFolder(newName)
  })
})
