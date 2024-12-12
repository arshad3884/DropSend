export class StoragePage {
    goToStorage() {
        cy.get('[class="list-items"] [href="#allMyFiles"].collapsed').if().should('be.visible').and('contain.text', 'My Files').click() //My Files
        cy.get('[class="list-items"] .show [href*="/storage"]').should('be.visible').and('contain.text', 'Storage').click() //Storage
        cy.url().should('include', '/storage')
        cy.get('.h3.file-title').should('be.visible').and('contain.text', 'Storage').wait(1000) //heading
    }
    validateStoragePage() {
        cy.get('.h3.file-title').should('be.visible').and('contain.text', 'Storage').wait(1000) //heading
        cy.get('[class="links-text font-weight-600 text-center"]').if().then((messageElement) => { //when Sent item is blank
            cy.wrap(messageElement).should('contain.text', 'Would you like to upload files to your Online Storage now?')
            cy.log('Storage Page is Blank!');
            throw new Error('Storage Page is Blank!')
        }).else().then(() => { //when Storage page is not blank
            //Action icons
            cy.get('[onclick="return create_folder();"]').should('be.visible').and('contain.text', 'Add') //Add
            cy.get('[onclick="return rename_folder();"]').should('be.visible').and('contain.text', 'Edit') //Edit
            cy.get('[onclick="return share_files(this);"]').should('be.visible').and('contain.text', 'Share') //Share
            cy.get('[onclick="return send_files(this);"]').should('be.visible').and('contain.text', 'Send') //Send
            cy.get('[onclick="return download_files(this);"]').should('be.visible').and('contain.text', 'Download') //Download
            cy.get('[onclick="return delete_files(this);"]').should('be.visible').and('contain.text', 'Remove') //Remove
            cy.get('[onclick="return move_files(this);"]').should('be.visible').and('contain.text', 'Move') //Move
            cy.get('[onclick="return copy_files(this);"]').should('be.visible').and('contain.text', 'Copy') //Copy
            cy.get('[onclick="return search_files();"]').should('be.visible').and('contain.text', 'Search') //Search
            cy.get('[onclick="return set_dropbox_folders(1);"]').should('be.visible').and('contain.text', 'Set Dropbox') //Set Dropbox
            cy.get('[onclick="return set_dropbox_folders(0);"]').should('be.visible').and('contain.text', 'Unset Dropbox') //Unset Dropbox

            //Columns names
            cy.get('[id="files_table"] thead tr:nth-child(1)').should('contain.text', 'Type').and('contain.text', 'Name').and('contain.text', 'Info')
                .and('contain.text', 'Uploaded').and('contain.text', 'Size')
        })
    }
    validatePagination() {
        //Pagination
        cy.get('[class="items-per-page"]').should('be.visible').and('contain.text', 'Show')

        cy.get('#num_per_page').select('100').should('have.value', '100').wait(2000)
        cy.get('#num_per_page').select('50').should('have.value', '50').wait(2000)
        cy.get('#num_per_page').select('20').should('have.value', '20').wait(2000)
        cy.get('#num_per_page').select('10').should('have.value', '10').wait(2000)

        cy.get('[class="prev-btn"] span').eq(1).should('contain.text', 'Next').click().wait(1000)
        cy.get('[class="prev-btn"] span').eq(0).should('contain.text', 'Prev').click().wait(1000)
    }
    selectFile(index) {
        cy.get('[id="files_table"] tbody tr td .btn-checkbox').eq(index).should('be.visible').check({ force: true }) //select file
    }
    addNewStorageFolder(folderName, description) {
        cy.get('[onclick="return create_folder();"]').should('be.visible').and('contain.text', 'Add').click() //Add

        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Add Online Storage Folder') //h3 on modal
        cy.get('[id="myModal"] [for="new_folder_name"]').should('exist').and('contain.text', 'Please type in the name of your new folder')
        cy.get('[id="myModal"] [id="new_folder_name"]').should('be.visible').type(folderName).should('contain.value', folderName)
        cy.get('[id="myModal"] [for="new_folder_description"]').should('exist').and('contain.text', 'Please type in the description of your new')
        cy.get('[id="myModal"] [id="new_folder_description"]').should('be.visible').type(description).should('contain.value', description)
        cy.get('[id="myModal"] [for="subfolder_of"]').should('be.visible').and('contain.text', 'Where would you like the folder to be created?')

        cy.get('[id="myModal"] [id="ok_folder"]').should('be.visible').and('contain.text', 'Okay').click().wait(1000)
        cy.get('#myModal > .modal-dialog > .modal-content > .upload-files-modal-content').should('not.exist') //modal should be closed
        //Validate the Storage folder
        cy.get('[id="show-folders-storage"]').should('be.visible').and('contain.text', 'Folders').click() //Folder filter
        cy.get('#num_per_page').select('100').should('have.value', '100').wait(2000) //select 100 per page
        cy.get('a[title="' + folderName + '"]').should('exist').and('contain.text', folderName)
    }
    removeStorageFolder(folderName) {
        cy.get('[id="show-folders-storage"]').should('be.visible').and('contain.text', 'Folders').click() //Folder filter
        cy.get('#num_per_page').select('100').should('have.value', '100').wait(2000) //select 100 per page
        cy.get('a[title="' + folderName + '"]').should('exist').and('contain.text', folderName).parents('tr').find('td .btn-checkbox').check({ force: true }) //select folder
        cy.get('[onclick="return delete_files(this);"]').should('be.visible').and('contain.text', 'Remove').click().wait(2000)
        //validate deletion
        cy.get('#num_per_page').select('100').should('have.value', '100').wait(2000) //select 100 per page
        cy.get('a[title="' + folderName + '"]').should('not.exist')
    }
    editStorageFolder(folderName, newName, newDescp) {
        cy.get('[id="show-folders-storage"]').should('be.visible').and('contain.text', 'Folders').click() //Folder filter
        cy.get('#num_per_page').select('100').should('have.value', '100').wait(2000) //select 100 per page
        cy.get('a[title="' + folderName + '"]').should('exist').and('contain.text', folderName).parents('tr').find('td .btn-checkbox').check({ force: true }) //select folder
        cy.get('[onclick="return rename_folder();"]').should('be.visible').and('contain.text', 'Edit').click()
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text','Edit Online Storage Folder') //heading on modal
        cy.get('[id="myModal"] [for="new_folder_name"]').should('exist').and('contain.text','Name of your folder')
        cy.get('[id="myModal"] [id="folder_name"]').should('exist').clear().type(newName).and('contain.value', newName) //add new name
        cy.get('[id="myModal"] [for="new_folder_description"]').should('exist').and('contain.text','Description of your folder')
        cy.get('[id="myModal"] textarea[id="new_folder_description"]').should('exist').clear().type(newDescp).and('contain.value', newDescp)
        cy.get('[id="myModal"] [id="ok_folder"]').should('be.visible').and('contain.text','Okay').click() //Okay
    }
}