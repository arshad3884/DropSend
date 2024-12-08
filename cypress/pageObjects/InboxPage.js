export class InboxPage {
    goToInbox() {
        cy.get('[class="list-items"] [href="#allMyFiles"].collapsed').if().should('be.visible').and('contain.text', 'My Files').click() //My Files
        cy.get('[class="list-items"] .show [href*="/inbox"]').should('be.visible').and('contain.text', 'Inbox').click() //Inbox
        cy.url().should('include', '/inbox')
        cy.get('.h3.file-title').should('be.visible').and('contain.text', 'Inbox') //heading
    }
    validateInbox() {
        cy.get('.h3.file-title').should('be.visible').and('contain.text', 'Inbox') //heading
        cy.get('[class="links-text font-weight-600 text-center"]').if().then((messageElement) => { //when inbox is blank
            cy.wrap(messageElement).should('contain.text', 'When other DropSend users send you a file, it will appear here')
            cy.log('Inbox is blank');
            throw new Error('Inbox is blank!')
        }).else().then(() => { //when inbox is not blank
            //Action icons
            cy.get('[onclick*="download_files(this)"]').should('be.visible').and('contain.text', 'Download')
            cy.get('[onclick="return delete_files(this);"]').should('be.visible').and('contain.text', 'Remove')
            cy.get('[onclick="store_files(this) ; return false;"]').should('be.visible').and('contain.text', 'Online Storage')

            //Columns names
            cy.get('[id="files_table"] thead tr:nth-child(1)').should('contain.text', 'Type').and('contain.text', 'Name').and('contain.text', 'Size')
                .and('contain.text', 'Description').and('contain.text', 'Sent By').and('contain.text', 'Date').and('contain.text', 'Expires')
        })
    }
    validatePagination() {
        //Pagination
        cy.get('[class="items-per-page"]').should('be.visible').and('contain.text', 'Show')
        
        cy.get('#num_per_page').select('100').should('have.value', '100').wait(2000)
        cy.get('#num_per_page').select('50').should('have.value', '50').wait(2000)
        cy.get('#num_per_page').select('20').should('have.value', '20').wait(2000)
        cy.get('#num_per_page').select('10').should('have.value', '10').wait(2000)

        cy.get('[class="prev-btn"] span').eq(1).should('contain.text','Next').click().wait(1000)
        cy.get('[class="prev-btn"] span').eq(0).should('contain.text','Prev').click().wait(1000)
    }
    selectFile(index) {
        cy.get('[id="files_table"] tbody tr td .btn-checkbox').eq(index).should('be.visible').check({ force: true }) //select file
    }
    clickDownload() {
        cy.get('[onclick*="download_files(this)"]').should('be.visible').and('contain.text', 'Download').click().wait(1000) //download
    }
    clickRemove() {
        cy.get('[onclick="return delete_files(this);"]').should('be.visible').and('contain.text', 'Remove').click().wait(1000) //remove
    }
    clickOnlineStorage() {
        cy.get('[onclick="store_files(this) ; return false;"]').should('be.visible').and('contain.text', 'Online Storage').click() //Online Storage
    }
    addFileInOnlineStorage(storage) {
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Online Storage') //h3
        cy.get('[id="myModal"] [class="h6 mt-3"]').should('be.visible').and('contain.text', 'Please choose a folder to place your files or folders in.') //h6
        cy.get('[id="myModal"] span').contains(storage).find('input[name="folder_id"]').should('exist').check({ force: true })
        cy.get('[id="myModal"] [class="new-folder-box"] .h6').should('be.visible').and('contain.text', 'Or Create a New Folder') //heading

        cy.get('[id="myModal"] [for="new_folder_name"]').should('exist').and('contain.text', 'Folder name') //label
        cy.get('[id="myModal"] [id="new_folder_name"]').should('exist') //Folder Name

        cy.get('[id="myModal"] [for="subfolder_of"]').should('exist').and('contain.text', 'Select Parent Folder') //label
        cy.get('[id="myModal"] [id="subfolder_of"]').should('exist') //Select Parent Folder

        cy.get('[id="myModal"] [id="ok_folder"]').scrollIntoView().should('be.visible').and('contain.text', 'Okay').click() //Okay
        //Success Message
        cy.get('[id="myModal"] [class="upload-files-modal-content"] h3').should('be.visible').and('contain.text', 'Online Storage System Message')
        cy.get('[id="myModal"] [class="upload-files-modal-content"] p').should('be.visible').and('contain.text', 'Files successfully copied to your Online Storage')
        cy.get('[id="myModal"] [onclick="closeModal();"]').should('be.visible').and('contain.text', 'Okay').click() //Okay
    }
}