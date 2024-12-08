export class Request {
    openRequestFileModal() {
        cy.get(`[id="navbarNav"] [onclick="callServer('/request');return false;"]`).should('be.visible').and('contain.text', 'Request').click() // menu
        cy.get('[id="pills-request-file-tab"]').scrollIntoView().should('be.visible').and('contain.text', 'Request Files') //tab on modal
        cy.get('[id="to_field"]').should('be.visible').and('contain.text', 'Send Request to') // Send Request to link
    }
    validateRequestFileFields(loginEmail) {
        cy.get('[id="pills-request-file-tab"]').scrollIntoView().should('be.visible').and('contain.text', 'Request Files') //tab on modal
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
            .and('contain.text', 'Please send me a file,').and('contain.text', 'To send it click here: ').and('contain.text', 'Thank you,')
        cy.get('[id="childModal1"] [data-dismiss="modal"]').should('be.visible').click() //close the child modal

        cy.get('[id="upload_folder"]').should('be.visible').and('contain.text', 'Upload Files to') //label
        cy.get('[id="upload_folder"] select[name="folder_id"]').should('be.visible').and('have.value', '0'); // '0' is the value of the "Inbox" option

        cy.get('[for="notifications_email"]').should('be.visible').and('contain.text', 'Your Email (for notifications)') //label
        cy.get('[id="notifications_email"]').should('be.visible').and('have.value', loginEmail) //label
    }
    clickSend() {
        cy.get('[id="request_button"]').scrollIntoView().should('be.visible').and('contain.text', 'Send').click() //Send
    }
    validateErrorAlert(message) {
        cy.on('window:alert', (alertText) => {
            // Assert the alert message
            expect(alertText).to.include('Please check the following:')
            expect(alertText).to.include(message)
        })
    }
    addRecipient(recipientEmail) {
        cy.get('[id="request_to"]').should('be.visible').clear().type(recipientEmail)
    }
    validateRequestConfirmation(recipientEmail){
        cy.get('[id="myModal"] img[alt="success-icon"]').should('be.visible') //tick
        cy.get('[id="myModal"] h3').should('be.visible').and('contain.text','Request Confirmation')
        cy.get('[id="myModal"] [id="status_heading"]').should('be.visible').and('contain.text','File request was successfully sent to '+recipientEmail+'!')

        cy.get('.request-another-button').should('be.visible').and('contain.text','Request Another') //Request Another button
        cy.get('[id="myModal"] [onclick="closeModal();"]').should('be.visible').and('contain.text','Okay').click() //OKay
    }
    getFileDownloadLinkFromYopmail(maxRetries = 15) {
        let retryCount = 0

        const findEmail = () => {
            cy.getIframeBody('iframe[name="ifinbox"]').then(body => {
                if (!body.text().includes('File request')) {  //not found
                    if (retryCount < maxRetries) {
                        cy.get('button#refresh').should('be.visible').click() // Refresh
                        cy.wait(7000)
                        cy.log('Retry Count: ' + retryCount)
                        retryCount++
                        findEmail()
                    } else {
                        throw new Error('Max retries reached. No email is received yet!!!')
                    }
                } else { //when we found it
                    cy.getIframeBody('iframe[name="ifmail"]').then(body => {
                        cy.wrap(body).find('[bgcolor="#ffffff"] a[href*="http://link.dropsend.com/ls/click"]')
                            .should('be.visible').then(link => {
                                const href = link.attr('href')
                                cy.log('Navigating to:', href)
                                cy.visit(href); // Verify link
                            })
                    })
                }
            })
        }
        findEmail()
    }
    verifyFileRequestPage(senderName, senderEmail, message){
        cy.get('h2[class="upload-header"]').should('be.visible').and('contain.text','Upload Requested Files') //h2
        cy.get('.sender-name').should('be.visible').and('contain.text','Name') //label
        cy.get('.sender-name [name="sender_name"]').should('be.visible').type(senderName)
        cy.get('.sender-email').should('be.visible').and('contain.text','Email') //label
        cy.get('.sender-email [name="sender_email"]').should('be.visible').type(senderEmail)

        cy.get('.upload-section label').contains('File(s) to send:').should('be.visible') //label
        cy.get('.upload-section [id="send_upload"]').should('exist').attachFile('Files/back.pdf') //upload file

        cy.get('.message-field label').should('be.visible').and('contain.text','Message') //label
        cy.get('textarea[name="message"]').should('be.visible').type(message)

        cy.get('.captcha-container').should('be.visible').and('contain.text','Enter CAPTCHA code:') //Enter CAPTCHA code
        cy.get('[id="send_button"]').should('be.visible').and('have.value','Send') //Send
    }
}