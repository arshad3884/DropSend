
export class MyAccountPage {
    goToMyAccount() {
        cy.get('.list-item [href*="dropsend.com/account"]').should('be.visible').and('contain.text', 'My Account').click()
        cy.url().should('include', '/account')
        cy.get('[class="h3 file-title font-weight-600"]').eq(0).should('be.visible').and('contain.text', 'Your Details') //heading
    }
    UpdateMyAccount(firstName, lastName, company, email, invoicesEmail, newPassword, confPassword, billingAddress) {
        cy.get('[class="h3 file-title font-weight-600"]').eq(0).should('be.visible').and('contain.text', 'Your Details') //heading
        cy.get('[for="account_first_name"]').should('exist').and('contain.text', 'First Name') //First Name
        cy.get('[id="account_first_name"]').should('be.visible').clear().type(firstName).should('have.value', firstName)
        cy.get('[for="account_last_name"]').should('exist').and('contain.text', 'Last Name') //Last Name
        cy.get('[id="account_last_name"]').should('be.visible').clear().type(lastName).should('have.value', lastName)
        cy.get('[for="account_company"]').should('exist').and('contain.text', 'Company') //Company
        cy.get('[id="account_company"]').should('be.visible').clear().type(company).should('have.value', company)
        cy.get('[for="account_email"]').should('exist').and('contain.text', 'Email') //Email
        cy.get('[id="account_email"]').should('be.disabled').and('contain.value', email) //Validate email 
        cy.get('[for="account_email_for_invoices"]').should('exist').and('contain.text', 'Email For').and('contain.text', 'Invoices') //Email For Invoices
        cy.get('[id="account_email_for_invoices"]').should('be.visible').clear().type(invoicesEmail).should('have.value', invoicesEmail)
        cy.get('[for="account_new_pass"]').should('exist').and('contain.text', 'New Password') //New Password
        cy.get('[id="account_new_pass"]').should('be.visible').clear().type(newPassword)
        cy.get('[for="account_confirm_new_pass"]').should('exist').and('contain.text','Confirm').and('contain.text','Password') //Confirm Password
        cy.get('[id="account_confirm_new_pass"]').should('be.visible').clear().type(confPassword)
        cy.get('[for="account_remember_value"]').should('exist').and('contain.text', 'Password Hint') //Password Hint
        cy.get('[id="account_remember_value"]').should('be.visible') //Password Hint input field
        cy.get('[for="address_for_invoices"]').should('exist').and('contain.text', 'Billing Address For').and('contain.text', 'Invoices') //Billing Address For Invoices
        cy.get('[id="account_billing_address_for_invoices"]').should('be.visible').clear().type(billingAddress)

        cy.get('[class="btn primary-btn circular mt--8 px--10 padded-btn medium"]').eq(0).should('contain.text', 'Confirm').and('contain.text', 'Changes')//Confirm Changes
    }
    clickConfirmChanges(){
        cy.get('[class="btn primary-btn circular mt--8 px--10 padded-btn medium"]').eq(0).should('contain.text', 'Confirm').and('contain.text', 'Changes').click() //Confirm Changes
    }
    validateSuccessMessage(message){
        cy.get('[class="alert-box success"]').should('be.visible').and('contain.text', message).wait(1000)
    }
    updateTimeZone(timeZone){
        cy.get('[class="h3 file-title font-weight-600"]').should('be.visible').and('contain.text','Your Settings') //heading
        cy.get('[for="timezone"]').should('be.visible').and('contain.text','Time Zone') //Time Zone
        cy.get('[id="timezone"]').should('be.visible').select(timeZone)
        cy.get('[class="btn primary-btn circular mt--8 px--10 padded-btn medium"]').eq(1).should('exist').and('contain.text','Confirm').and('contain.text','Changes').click({force:true}) //Confirm Changes
    }
    setEnableNotification(status){
        cy.get('[class="h3 file-title font-weight-600"]').should('be.visible').and('contain.text','Your Settings') //heading
        cy.get('.ml--3 [class="heading-1 font-weight-500"]').eq(0).should('be.visible').and('contain.text','Email Notifications') //label
        cy.get('.ml--3 [class="title"]').eq(0).should('be.visible').and('contain.text','Receive an email notification when sent files have been picked up')
        if(status == 'enable'){
            cy.get('[id="account_email_notification"]').should('exist').check({force:true})
        }
        if(status == 'disable'){
            cy.get('[id="account_email_notification"]').should('exist').uncheck({force:true})
        }
        cy.get('[class="btn primary-btn circular mt--8 px--10 padded-btn medium"]').eq(1).should('exist').and('contain.text','Confirm').and('contain.text','Changes').click({force:true}) //Confirm Changes
    }
    setNewsletterSubscription(status){
        cy.get('[class="h3 file-title font-weight-600"]').should('be.visible').and('contain.text','Your Settings') //heading
        cy.get('.ml--3 [class="heading-1 font-weight-500"]').eq(1).should('be.visible').and('contain.text','DropSend Newsletter') //label
        cy.get('.ml--3 [class="title"]').eq(1).should('be.visible').and('contain.text','Yes, I want to receive news and updates from')
            .and('contain.text','the Dropsend team. Please subscribe me to').and('contain.text','the Newsletter')
        if(status == 'enable'){
            cy.get('[id="account_newsletter"]').should('exist').check({force:true})
        }
        if(status == 'disable'){
            cy.get('[id="account_newsletter"]').should('exist').uncheck({force:true})
        }
        cy.get('[class="btn primary-btn circular mt--8 px--10 padded-btn medium"]').eq(1).should('exist').and('contain.text','Confirm').and('contain.text','Changes').click({force:true}) //Confirm Changes
    }
    deleteAccount() {
        cy.get('.list-item [href*="dropsend.com/account"]').should('be.visible').and('contain.text', 'My Account').click() //menu
        cy.get('[href="/account/cancel"]').scrollIntoView().should('be.visible').and('contain.text', 'Please cancel my account').click() // link

        cy.url().should('include', '/account/cancel')
        cy.get('[href="/account/cancel2"]').should('be.visible').and('contain.text', 'Cancel my account and delete all files').click()

        cy.url().should('include', '/account/cancel_confirm?account_id')
        cy.get('[class="alert-box secondary"]').should('be.visible').and('contain.text', 'Your account has been cancelled') //confirmation msg at top left
        cy.get('[class="button warning"]').should('be.visible').and('contain.value', 'Submit').click() //submit feed back

        cy.url().should('include', '/account/exit_survey_thanks')
        cy.get('[id="container"] .alert-box.secondary h2').should('be.visible').and('contain.text', 'Thank you')
    }
    validateAccountCancelation(){
        cy.get('[href="/account/cancel"]').scrollIntoView().should('be.visible').and('contain.text', 'Please cancel my account').click() // link

        cy.url().should('include', '/account/cancel')
        cy.get('[href="/account/cancel2"]').should('be.visible').and('contain.text', 'Cancel my account and delete all files')
        cy.get('[class="emphasis"] a[href="/account"]').should('be.visible').and('contain.text','Back to my account').click() //Back to my account
    }
}