export class HomePage{
    closeaddModal(){
        cy.get('.ui-button-icon-primary').should('be.visible').click() //close the ad modal
    }
    validateHomePage(){
        cy.get('.navbar-brand > img').should('be.visible') //logo
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Send').should('be.visible') //SEND
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Upload').should('be.visible') //Upload
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Request').should('be.visible') //Request
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Collaborate').if().should('be.visible') //Collaborate
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Logout').should('be.visible') //Logout

        cy.get(`[class="upload-more-files"] [onclick="account.open_upload('send');"]`).should('be.visible').and('contain.text','Send Files') //Send Files
        cy.get('li[class*="list-item"]').contains('Home').should('be.visible') //Home
        cy.get('a[href="#allMyFiles"]').should('be.visible').and('contain.text','My Files').click().wait(1000) //My Files
        cy.get('li[class*="list-item"] [id="inbox_nav"]').should('be.visible').and('contain.text','Inbox') //Inbox
        cy.get('li[class*="list-item"] [id="sentitems_nav"]').should('be.visible').and('contain.text','Sent') //Sent
        cy.get('li[class*="list-item"]').contains('Storage').should('be.visible') //Storage
        cy.get('li[class*="list-item"]').contains('Shared Items').if().should('be.visible') //Shared Items
        cy.get('li[class*="list-item"] [href*="/contacts"]').should('be.visible').and('contain.text','Contacts') //Contacts
        cy.get('li[class*="list-item"] [href*="/help-detail"]').should('be.visible').and('contain.text','Help') //Help
        cy.get('li[class*="list-item"] [href*="/account"]').should('be.visible').and('contain.text','My Account') //My Account
    }
    logout(){
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Logout').should('be.visible').click() //Logout
    }
}