/// <reference types ="cypress"/>

import { HomePage } from "../pageObjects/HomePage";
import { LoginPage } from "../pageObjects/LoginPage";
import { ReuseableCode } from "../support/ReuseableCode";
import { StoragePage } from "../pageObjects/StoragePage";

const loginPage = new LoginPage
const homePage = new HomePage
const reuseableCode = new ReuseableCode
const storagePage = new StoragePage

describe('Files > Storage Functionality test cases', () => {
  const loginEmail = Cypress.config('users').user1.username
  const loginPassword = Cypress.config('users').user1.password


  beforeEach(() => {
    loginPage.goToLogin()
    loginPage.login(loginEmail, loginPassword)
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
  it('TC_Storage_003 - Verify sharing a file or folder', () => {
    const downloadLimit = '5' //times
    const expireAfter = '14' //days
    storagePage.goToStorage()
    storagePage.selectFile(0) //first file/folder
    storagePage.shareFolderORFile(downloadLimit, expireAfter)
  })
  it('TC_Storage_004 - Verify Sending a file or folder', () => {
    const recipientEmail = 'testemail@yopmail.com'
    const emailSubject = 'Send File OR Folder'
    const message = "Verify Sending a file or folder - TC_Storage_004"
    storagePage.goToStorage()
    storagePage.selectFile(0) //first file/folder
    storagePage.sendFileORFolder(recipientEmail, emailSubject, message)
  })
  it('TC_Storage_005 - Verify downloading a file or folder', () => {
    storagePage.goToStorage()
    storagePage.selectFile(0) //first file/folder
    storagePage.downloadFileORFolder()
  })
  it('TC_Storage_006 - Verify removing a file or folder', () => {
    const folderName = reuseableCode.generateRandomString('6')
    const description = 'Test Storage Folder Deletion'
    storagePage.goToStorage()
    storagePage.addNewStorageFolder(folderName, description)
    storagePage.goToStorage()
    storagePage.removeStorageFolder(folderName)
  })
  it('TC_Storage_007 - Verify moving a file to a folder', () => {
    const folderName = reuseableCode.generateRandomString('6')
    const description = 'Test Storage Folder Moving'
    storagePage.goToStorage()
    storagePage.addNewStorageFolder(folderName, description)
    storagePage.goToStorage()
    storagePage.selectFile(0)
    storagePage.moveFileORFolder()
    storagePage.goToStorage()
    storagePage.removeStorageFolder(folderName)
  })
  it('TC_Storage_008 - Verify copying a file to a folder', () => {
    storagePage.goToStorage()
    storagePage.selectFile(0) //first file/folder
    storagePage.copyFileORFolder()
  })
  it('TC_Storage_009 - Verify searching for files or folders', () => {
    storagePage.goToStorage()
    storagePage.searchFileORFolder('Dropbox')
  })
})
