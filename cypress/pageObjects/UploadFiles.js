const accountUrl = Cypress.env('accountUrl')
export class UploadFiles {
    openUploadModal() {
        cy.get(`[id="navbarNav"] [onclick="account.open_upload('storage');"]`).should('be.visible').and('contain.text', 'Upload')
        cy.visit(`${accountUrl}/storage/upload`)
        cy.url().should('include', '/storage/upload')
        cy.get('[id="upload_storage_button"]').should('be.visible').and('contain.text', 'Upload') //Upload button
    }
    uploadFile(fileName, storageName) {
        cy.get('.clickable-text-upload').should('be.visible').and('contain.text', 'Click to upload or drag & drop')
        cy.get('[id="send_file"]').should('exist').attachFile('/Files/' + fileName).wait(1000)  //file upload

        cy.get('.upload-file').should('be.visible').and('contain.text', fileName)

        cy.get('[for="exampleFormControlSelect1"]').should('be.visible').and('contain.text', 'Folder to place files in')
        cy.get('[id="upload_folder"]').should('exist').select(storageName)

    }
    removeUpload(fileName) {
        cy.get('.clickable-text-upload').should('be.visible').and('contain.text', 'Click to upload or drag & drop')
        cy.get('[id*="ch_file_name_"]').contains(fileName).parents('.upload-file').find('[onclick*="remove_file_from_multiple"]').should('be.visible').click()
    }
    clickUpload() {
        cy.get('[id="upload_storage_button"]').should('be.visible').and('contain.text', 'Upload').click() //Upload button
    }
    validateErrorAlert(message) {
        cy.on('window:alert', (alertText) => {
            // Assert the alert message
            expect(alertText).to.include('Please check the following:')
            expect(alertText).to.include(message)
        })
    }
    validateFileUploadCompletion(fileCount) {
        cy.get('#status_heading').should('be.visible').and('contain.text', 'Uploading to Storage...')

        cy.get('#resumable-result > :nth-child(1) > :nth-child(1) > .mb--10').should('be.visible')
        if (fileCount == 'single') {
            cy.get('#upload-message').should('be.visible').and('contain.text', 'Your file has been successfully uploaded!')
        }
        if (fileCount == 'multiple') {
            cy.get('#upload-message').should('be.visible').and('contain.text', 'Your files have been successfully uploaded!')
        }

        cy.get('.okay-button').should('be.visible').and('contain.text', 'Okay')
    }
}