const accountUrl = Cypress.env('accountUrl')

export class SendFiles {

    openSendFilesModal() {
        cy.get(`[class="upload-more-files"] [onclick="account.open_upload('send');"]`).scrollIntoView().should('be.visible').and('contain.text', 'Send Files') //Send Files
        cy.visit(`${accountUrl}/sendfile_flow/send.php`)
        cy.url().should('include', '/sendfile_flow/send.php')
        cy.get('[id="send_button"]').should('be.visible') //send button
    }
    uploadFile(fileName) {
        cy.get('.clickable-text-upload .h4').should('be.visible').and('contain.text', 'Click to upload or drag & drop')
        cy.get('[id="send_file"]').should('exist').attachFile('/Files/' + fileName).wait(1000)  //file upload

        cy.get('[class="upload-from-storage"] [onclick*="find_files();"]').should('be.visible').and('contain.text', 'Add files from your').and('contain.text', 'storage') //Add files from your storage
        cy.get('[id="upload-file-list"]').should('be.visible').and('contain.text', fileName)
    }
    addFileFromStorage(){
        cy.get('[class="upload-from-storage"] a[class="mt--1"]').should('be.visible').click() //Add files from stoarge
        cy.get('[class="modal show"] .modal-dialog [id="storage_finder"] h3').should('be.visible').and('contain.text','Search Files In Your Storage') //h3
        cy.get('[class="modal show"] .modal-dialog [id="storage_finder"] [id="show-files"]').should('be.visible').and('contain.text','Files') //button
        cy.get('[class="modal show"] .modal-dialog [id="storage_finder"] [id="show-folders"]').should('be.visible').and('contain.text','Folders') //button
        cy.get('[class="modal show"] .modal-dialog [id="storage_finder"] [id="files-list"] input').eq(0).should('exist').check({force:true}) //select 1st file
        cy.get('[class="modal show"] .modal-dialog [id="storage_finder"] [id="file-selection-area"] .primary-btn').should('exist').and('contain.text','Add Files').click()
    }
    removeFile(fileName) {
        cy.get('[id="ch_file_name_i"]').contains(fileName).parents('[id="upload-file-list"] .row').find('[class="remove_upload_item"]').should('be.visible').click()
        cy.get('[id="upload-file-list"]').should('be.visible').and('not.contain.text', fileName)
    }
    addSubject(emailSubject) {
        if (emailSubject != null) {
            cy.get('[id="send_subject"]').should('be.visible').type(emailSubject).should('have.value', emailSubject)
        }
    }
    addRecipient(recipientEmail){
        if (recipientEmail != null) {
        cy.get('[id="send_to"]').should('be.visible').type(recipientEmail).type('{enter}')
        cy.get('[id="chip-container"]').should('be.visible').and('contain.text', recipientEmail)
        }
    }
    addMessage(emailMessage){
        cy.get('textarea[id="send_message"]').should('be.visible').type(emailMessage)
    }
    clickSend() {
        cy.get('[id="send_button"]').should('be.visible').and('contain.text', 'Send').click()
    }
    validateSendingStatus(){
        cy.get('#status_heading').should('be.visible').and('contain.text','Sending your files...')
        cy.get(':nth-child(1) > td > center > .step_one').should('be.visible') //Step 1
        cy.get('[style="background: none;"] > td > center > .step_one').should('contain.text','Uploading files...')
        
        cy.get(':nth-child(1) > td > center > .step_two').should('be.visible') //Step 2
        cy.get('[style="background: none;"] > td > center > .step_two').should('contain.text','Sending...')

        cy.get(':nth-child(1) > .mb--10').should('be.visible') //Tick
        cy.get('.h3').should('be.visible').and('contain.text','Your File Was Successfully Sent')
        cy.get('#main_content_area > #status_heading').if().should('be.visible').and('contain.text','It will be available for 14 days')
        cy.get('.text-center > b').should('be.visible') //Download Here
        cy.get('.okay-button').should('be.visible').and('contain.text','Okay').click() //Okay button
    }
    validateErrorAlert(message) {
        cy.on('window:alert', (alertText) => {
            // Assert the alert message
            expect(alertText).to.include('Please check the following:')
            expect(alertText).to.include(message)
        })
    }
    validateEmailPreview(emailMessage){
        cy.get(`[onclick="preview_message('send_files_form');"]`).should('be.visible').and('contain.text','Click here to preview the email').click()
        cy.get('.show .modal-dialog [class="title"][style="font-weight: bold;font-size: 16px;"]').should('be.visible').and('contain.text','Files available for download:')
        cy.get('.show .modal-dialog [class="download"]').should('be.visible').invoke('text').then(link=>{
            cy.wrap(link).as('dowloadLink') //alias the download link
        })
        cy.get('.show .modal-dialog [class="desc"]').should('be.visible').and('contain.text', emailMessage)
        cy.get('.show .modal-dialog [data-dismiss="modal"]').should('be.visible').click() //Close the modal
    }
}