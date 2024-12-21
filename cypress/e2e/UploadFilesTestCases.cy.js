/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { SendFiles } from "../pageObjects/SendFiles";
import { LandingPage } from "../pageObjects/LandingPage";
import { ReuseableCode } from "../support/ReuseableCode";
import { UploadFiles } from "../pageObjects/UploadFiles";

const loginPage = new LoginPage
const homePage = new HomePage
const sendFiles = new SendFiles
const landingPage = new LandingPage
const reuseableCode = new ReuseableCode
const uploadFiles = new UploadFiles

describe('Upload Files Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password


  beforeEach(() => {
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
    homePage.validateHomePage()
  })

  it('TC_SF_001 - Validate "Upload" Button Visibility and Clickability', () => {
    uploadFiles.openUploadModal()
  })
  it('TC_SF_002 - Validate File Upload error validation', () => {
    uploadFiles.openUploadModal()
    uploadFiles.clickUpload()
    uploadFiles.validateErrorAlert('You must choose at least one item to upload')
  })
  it('TC_SF_003 - Validate File Upload functionality', () => {
    uploadFiles.openUploadModal()
    uploadFiles.clickUpload()
    uploadFiles.uploadFile('testImage.jpeg', 'Storage')
    uploadFiles.clickUpload()
    uploadFiles.validateFileUploadCompletion('single')
  })
  it('TC_SF_004 - Validate File Upload functionality', () => {
    uploadFiles.openUploadModal()
    uploadFiles.clickUpload()
    uploadFiles.uploadFile('testImage.jpeg', 'Storage')
    uploadFiles.removeUpload('testImage.jpeg')
  })
  it('TC_SF_005 - Validate File Upload Completion by uploading multiple files', () => {
    uploadFiles.openUploadModal()
    uploadFiles.clickUpload()
    uploadFiles.uploadFile('testImage.jpeg', 'Storage')
    uploadFiles.uploadFile('card.pdf', 'Storage')
    uploadFiles.clickUpload()
    uploadFiles.validateFileUploadCompletion('multiple')
  })

})
