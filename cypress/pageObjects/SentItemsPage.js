export class SentItemsPage {
    goToSentItems() {
        cy.get('[class="list-items"] [href="#allMyFiles"].collapsed').if().should('be.visible').and('contain.text', 'My Files').click() //My Files
        cy.get('[class="list-items"] .show [id="sentitems_nav"]').should('be.visible').and('contain.text', 'Sent').click() //Sent
        cy.url().should('include', '/sentitems')
        cy.get('.h3.file-title').should('be.visible').and('contain.text', 'Sent') //heading
    }
    validateSentItems() {
        cy.get('.h3.file-title').should('be.visible').and('contain.text', 'Sent').wait(1000) //heading
        cy.get('[class="links-text font-weight-600 text-center"]').if().then((messageElement) => { //when Sent item is blank
            cy.wrap(messageElement).should('contain.text', 'This is where we store a record of your sent items')
            cy.log('Sent item is blank');
            throw new Error('Sent item is blank!')
        }).else().then(() => { //when Sent item is not blank
            //Action icons
            cy.get('[onclick="return delete_sentitems_files(this);"]').should('be.visible').and('contain.text', 'Remove')  //Remove
            cy.get('[onclick="return resend_files(this);"]').should('be.visible').and('contain.text', 'Send again') //Send again
            cy.get('[onclick="store_files(this) ; return false;"]').should('be.visible').and('contain.text', 'Online Storage') //Put in online storage
            cy.get('[onclick="csv_export(this) ; return false;"]').should('be.visible').and('contain.text', 'Export to CSV')  //Export to CSV

            //Columns names
            cy.get('[id="files_table"] thead tr:nth-child(1)').should('contain.text', 'Type').and('contain.text', 'Name').and('contain.text', 'Size')
                .and('contain.text', 'Check delivery').and('contain.text', 'Recipient').and('contain.text', 'Expires')
                .and('contain.text', 'Sent').and('contain.text', 'Downloaded')
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
    acceptConfirmation(confMessage) {
        cy.on('window:confirm', (message) => {
            // Optionally, you can check the message text
            expect(message).to.eq(confMessage);
            return true; // Return true to accept
        });
    }
    clickRemove() {
        cy.get('[onclick="return delete_sentitems_files(this);"]').scrollIntoView().should('be.visible').and('contain.text', 'Remove').click().wait(1000) //remove
    }
    clickPutInOnlineStorage() {
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
    sendAgain(recipientEmail, emailSubject, message) {
        cy.get('[onclick="return resend_files(this);"]').should('be.visible').and('contain.text', 'Send again').click() //Send again
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text', 'Send') //h3
        cy.get('[id="myModal"] [class="mt--3 d-block"]').should('be.visible').and('contain.text', 'Advanced options') //Advanced options
        cy.get('[id="myModal"] [id="send_to"]').should('be.visible').type(recipientEmail) //recipient email
        cy.get('[id="myModal"] [id="send_subject"]').should('be.visible').type(emailSubject)
        cy.get('[id="myModal"] [id="send_message"]').should('be.visible').type(message)

        cy.get('[id="myModal"] [id="send_email"]').should('be.visible').and('contain.text', 'Send').click() //Send

        cy.get('h3.text-center').and('not.contain.text', 'There was an error') //error should not be shown
    }
    clickExportToCSV(){
        cy.get('[onclick="csv_export(this) ; return false;"]').should('be.visible').and('contain.text','Export to CSV').click().wait(1000)
    }
    checkDeliveryStatus(index){
        cy.get('td[class="name-td"] a').eq(index).invoke('text').then((fileName)=>{ //file index
            cy.wrap(fileName).as('fileName') //alias file name
        })
        cy.get(`a[onclick*="callServer('/sent_delivery_status"]`).eq(index).should('exist').and('contain.text','Get').and('contain.text','status').click()
        //modal opens
        cy.get('@fileName').then(fileName=>{
            cy.get('[id="storage_search"] h3').contains(fileName).should('exist') //find fileName on modal
        })
        cy.get('[id="storage_search"] tbody tr:nth-child(2) td:nth-child(2)').eq(0).invoke('text').then(status=>{
            cy.wrap(status).as('status')
        })
    }
    changeExpiry(index, duration){
        cy.get('select[class="expiration_limit_select"]').eq(index).should('exist').select(duration)
        cy.get('[id="expirationDateModal"] h4').should('be.visible').and('contain.text','Change expiration date')
        cy.get('[id="expirationDateModal"] [class="reveal-modal poppins-text"]').should('contain.text','File expiration date changed successfully')
        cy.get('[id="expirationDateModal"] [onclick="hideExpirationDateModal(event);"]').eq(1).should('contain.text','Close').click() //close
    }
}