export class Collaborate {
    openCollaborateModal() {
        cy.get(`[id="navbarNav"] [onclick="callServer('/request');return false;"]`).should('be.visible').and('contain.text', 'Request').click() // menu
        cy.get('[id="pills-request-file-tab"]').scrollIntoView().should('be.visible').and('contain.text', 'Request Files') //tab on modal

        cy.get('[id="pills-request-collaboration-tab"]').should('be.visible').and('contain.text', 'Collaborate').click() //Collaborate tab
    }
    validateCollaborateRequestFields(loginEmail) {
        cy.get('[id="pills-request-collaboration-tab"]').scrollIntoView().should('be.visible').and('contain.text', 'Collaborate') //tab on modal
        // Send Request to
        cy.get('[id="to_field"]').should('be.visible').and('contain.text', 'Send Request to').click()
        cy.get('[id="childModal1"] .h3').should('be.visible').and('contain.text', 'Dropsend Address Book') //child modal heading
        cy.get('[id="childModal1"] .h6.mb--1').should('be.visible').and('contain.text', 'Please select your recipients to add then click the “Add Recipients” button')
        cy.get('[id="childModal1"] [class="h6 mb--7"]').should('be.visible').and('contain.text', 'To edit or delete these contacts, please click the “Contacts” tab on the main navigation menu, once you have finished sending.')
        cy.get('input.btn-checkbox-select-row-input').should('exist').its('length').then(recipientCount => { cy.wrap(recipientCount).as('recipientCount') })
        cy.get('[id="add_selection"]').should('be.visible').and('contain.text', 'Add Recipients') //Add Recipients button
        cy.get('[id="childModal1"] [data-dismiss="modal"]').should('be.visible').click() //close the child modal

        cy.get('[for="request_subject"]').should('be.visible').and('contain.text', 'Subject') //label
        cy.get('[id="request_subject"]').should('be.visible') //input

        cy.get('[for="request_message"]').should('exist').and('contain.text', 'Message') //label
        cy.get('textarea[id="request_message"]').should('be.visible') //textatea message input

        //Click here to preview the email
        cy.get('[onclick="preview_request_message(); return false;"]').should('be.visible').and('contain.text', 'Click here to preview the email').click()
        cy.get('[class="upload-files-modal-content mt--10"] td[background*="/email_center_middle.png"]').should('be.visible').and('contain.text', 'Hello,')
            .and('contain.text', 'I would like to collaborate,').and('contain.text', 'To collaborate, click here: ').and('contain.text', 'Thank you,')
        cy.get('[id="childModal1"] [data-dismiss="modal"]').should('be.visible').click() //close the child modal

        cy.get('[id="collaboration_folder"] [for="request_site_url"]').should('exist').and('contain.text', 'Collaboration Folder Name') //label
        cy.get('[id="request_collaboration_folder"]').should('be.visible') //collaboration folder name

        cy.get('[for="notifications_email"]').should('be.visible').and('contain.text', 'Your Email (for notifications)') //label
        cy.get('[id="notifications_email"]').should('be.visible').and('have.value', loginEmail) //label
    }
    validateErrorAlert(message) {
        cy.on('window:alert', (alertText) => {
            // Assert the alert message
            expect(alertText).to.include('Please check the following:')
            expect(alertText).to.include(message)
        })
    }
    clickSend() {
        cy.get('[id="request_button"]').scrollIntoView().should('be.visible').and('contain.text', 'Send').click() //Send
    }
    validateRequestConfirmation(recipientEmail){
        cy.get('[id="myModal"] img[alt="success-icon"]').should('be.visible') //tick
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text','Request Confirmation')
        cy.get('[id="myModal"] [id="status_heading"]').should('be.visible').and('contain.text','Collaboration request was successfully sent to '+recipientEmail+'!')

        cy.get('.request-another-button').should('be.visible').and('contain.text','Request Another') //Request Another button
        cy.get('[id="myModal"] [onclick="closeModal();"]').should('be.visible').and('contain.text','Okay').click() //OKay
    }
    addRecipient(recipientEmail) {
        cy.get('[id="request_to"]').should('be.visible').clear().type(recipientEmail)
    }
    addCollaborationFolderName(folderName){
        cy.get('[id="collaboration_folder"] [for="request_site_url"]').should('exist').and('contain.text', 'Collaboration Folder Name') //label
        cy.get('[id="request_collaboration_folder"]').should('be.visible').type(folderName) //collaboration folder name
    }
}