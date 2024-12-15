
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
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Edit Online Storage Folder') //heading on modal
        cy.get('[id="myModal"] [for="new_folder_name"]').should('exist').and('contain.text', 'Name of your folder')
        cy.get('[id="myModal"] [id="folder_name"]').should('exist').clear().type(newName).and('contain.value', newName) //add new name
        cy.get('[id="myModal"] [for="new_folder_description"]').should('exist').and('contain.text', 'Description of your folder')
        cy.get('[id="myModal"] textarea[id="new_folder_description"]').should('exist').clear().type(newDescp).and('contain.value', newDescp)
        cy.get('[id="myModal"] [id="ok_folder"]').should('be.visible').and('contain.text', 'Okay').click().wait(1000) //Okay
    }
    shareFolderORFile(downloadLimit, expireAfter, password = false) {
        cy.get('[onclick="return share_files(this);"]').should('be.visible').and('contain.text', 'Share').click() //Share

        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Share Options For Sharing Items').click() //h3
        cy.get('[id="myModal"] [class="file-text"]').should('be.visible').and('contain.text', 'Files:')
        cy.get('[id="myModal"] [class="folders-text"]').should('be.visible').and('contain.text', 'Folders:')
        cy.get('[id="myModal"] [class="heading-1 font-weight-600"]').should('be.visible').and('contain.text', 'Download Limit ')
        cy.get('[id="myModal"] input[id="download_limit"]').should('exist').type(downloadLimit).and('contain.value', downloadLimit)
        cy.get('[id="myModal"] p.heading-1').should('contain.text', 'Expires After:')
        cy.get('[id="myModal"] [id="day"]').should('exist').type(expireAfter, { force: true }).should('contain.value', expireAfter)

        cy.get('[id="myModal"] label[for="use_password"]').should('contain.text', 'Add Password Protection')
        if (password == false) {
            cy.get('[id="myModal"] [id="use_password"]').should('exist').uncheck()
        } else if (password == true) {
            cy.get('[id="myModal"] [id="use_password"]').should('exist').check()
        }
        cy.get('[id="myModal"] [id="ok_folder"]').should('contain.text', 'Copy Files').click() //Copy Files
        //Validate Success modal
        cy.get('[id="myModal"] img[alt="success-icon"]').should('be.visible') //Tick icon
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Your storage objects has been successfully shared')
        cy.get('[id="myModal"] p').should('be.visible').and('contain.text', 'User can access the shared item by going to the following links')
        cy.get('[id="myModal"] strong').should('be.visible').and('contain.text', 'Links to this items for users:')
        cy.get('[id="myModal"] a[href*="dropsend.com/share"]').should('exist').invoke('text').then(sharelink => {
            cy.wrap(sharelink).as('shareLink')
        })
        cy.get('[id="myModal"] [onclick="closeModal();"]').should('be.visible').and('contain.text', 'Okay').click().wait(1000) //Okay
    }
    sendFileORFolder(recipientEmail, emailSubject, message) {
        cy.get('[onclick="return send_files(this);"]').should('be.visible').and('contain.text', 'Send').click() //Send
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Send') //Heading on modal
        cy.get('[id="myModal"] [class="h6 mt-3"]').should('be.visible').and('contain.text', 'Folders:')
        cy.get('[id="myModal"] [class="mt--3 d-block"]').should('be.visible').and('contain.text', 'Advanced options') //Advanced options
        cy.get('[id="myModal"] [id="send_to"]').should('be.visible').type(recipientEmail).should('have.value', recipientEmail) //To
        cy.get('[id="myModal"] [id="send_subject"]').should('be.visible').type(emailSubject).should('have.value', emailSubject) //Subject
        cy.get('[id="myModal"] [id="send_message"]').should('be.visible').type(message).should('have.value', message) //Message
        cy.get('[id="myModal"] a[rel="external"]').should('be.visible').and('contain.text', 'Click here to preview the email') //Click here to preview the email
        cy.get('[id="myModal"] [id="send_email"]').should('be.visible').and('contain.text', 'Send').click() //Send
        //Success modal
        cy.get('[id="myModal"] img[src*="success-icon.svg"]').should('be.visible') //Tick icon
        cy.get('[id="myModal"] [class="h3 text-center font-weight-600"]').should('be.visible').and('contain.text', 'files were  successfully sent')
        cy.get('[id="myModal"] p').should('exist').and('contain.text', 'Download: ')
    }
    downloadFileORFolder() {
        cy.get('[onclick="return download_files(this);"]').should('be.visible').and('contain.text', 'Download').click()
        //Success modal
        cy.get('#filePrepare > .modal-dialog > .modal-content > .upload-files-modal-content > :nth-child(1) > .d-flex > .mb--10').should('be.visible') //Tick icon
        cy.get('.lead').should('be.visible').and('contain.text', 'Thank you for your patience')
        cy.get('[style="margin: 0 auto; max-width: 380px;"] > div').should('contain.text', "DropSend® is now compiling the files you've selected to download into one convenient zip file for you")
    }
    moveFileORFolder(storage = 'Storage') { //bedefault will select 'Storage'
        cy.get('[onclick="return move_files(this);"]').should('be.visible').and('contain.text', 'Move').click() //Move
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Online Storage') //modal heading
        cy.get('[id="myModal"] [class="h6 mt-3"]').should('be.visible').and('contain.text', 'Please choose a folder to place your files or folders in.')
        cy.get('[id="myModal"] [name="folder_id"]').parent().contains(storage).find('input').check() //Select Storage
        cy.get('[id="myModal"] [id="ok_folder"]').should('be.visible').and('contain.text', 'Okay').click().wait(1000) //Okay
    }
    copyFileORFolder() {
        cy.get('[onclick="return copy_files(this);"]').should('be.visible').and('contain.text', 'Copy').click() //Copy
        //Success modal
        cy.get('[id="myModal"] img[src*="success-icon.svg"]').should('be.visible') //Tick icon
        cy.get('[id="myModal"] [class="h3 text-center font-weight-600"]').should('be.visible').and('contain.text', 'files were  successfully copied')
    }
    searchFileORFolder(keyword) {
        cy.get('[onclick="return search_files();"]').should('be.visible').and('contain.text', 'Search').click() //Search
        cy.get('[id="myModal"] [id="storage_search"] h3').should('be.visible').and('contain.text','Search Files In Your Storage') //heading on modal
        cy.get('[id="myModal"] [id="storage_search"] [id="show-files"]').should('be.visible').and('contain.text','Files') //Files button
        cy.get('[id="myModal"] [id="storage_search"] [id="show-folders"]').should('be.visible').and('contain.text','Folders') //Folders button
        
        cy.get('[id="myModal"] [id="storage_search"] [name="query"]').should('exist').type(keyword)
        cy.get('[id="myModal"] [id="storage_search"] [id="button_search"]').should('be.visible').and('contain.text','Search').click() //Search
        
    }
}