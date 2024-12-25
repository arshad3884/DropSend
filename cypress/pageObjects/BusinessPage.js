export class BusinessPage {
    gotoUsers() {
        cy.get('[class="list-item "] [href*="/users"]').should('be.visible').and('contain.text', 'Users').click() //Users
        cy.url().should('include', '/users')
        cy.get('[class="h3 file-title font-weight-600"]').should('be.visible') //heading
    }
    addUser(firstName, lastName, email, companyName, userType, subject) {
        cy.get(`[onclick="return add_contact('users');"]`).should('be.visible').and('contain.text', 'Users').click() //Add Users
        cy.url().should('include', '/users/add')
        cy.get('[class="h3 file-title font-weight-600"]').should('be.visible').and('contain.text', 'Add Users') //heading
        cy.get('input[id*="_first_name"]').should('exist').clear().type(firstName)
        cy.get('input[id*="_last_name"]').should('exist').clear().type(lastName)
        cy.get('input[id*="_email"]').should('exist').clear().type(email)
        cy.get('input[id*="_company_name_new"]').should('exist').clear().type(companyName)

        cy.get('[class="heading-1 mb--4 font-weight-600"]').contains('User Type').should('be.visible') //User Type
        if (userType == 'Internal') {
            cy.get('[class="radio-wrapper mr--10"]').contains('Internal').should('be.visible') //label
            cy.get('[name*="[is_internal]"]').eq(0).should('exist').check() //Internal
        }
        else if (userType == 'External') {
            cy.get('[class="radio-wrapper mr--10"]').contains('External').should('be.visible') //label
            cy.get('[name*="[is_internal]"]').eq(1).should('exist').check() //External
        }
        else if (userType == 'Admin') {
            cy.get('[class="radio-wrapper mr--10"]').contains('Admin').should('be.visible') //label
            cy.get('[name*="[is_internal]"]').eq(2).should('exist').check() //Admin
        }

        cy.get('[class="heading-1 mb--4 mt--4 font-weight-600"]').should('be.visible').and('contain.text', 'Welcome Email Message') //Welcome Email Message
        cy.get('[id="subject"]').should('exist').clear().type(subject)

        cy.get(`[onclick="preview_user_message(); return false;"]`).should('be.visible').and('contain.text', 'Click here to preview the email')
        cy.get(`[onclick="location.href='/users';"]`).should('be.visible').and('contain.text', 'Cancel') //cancel
        cy.get('[id="add_users_button"]').should('be.visible').and('contain.text', 'Add').click() //Add
        cy.url().should('include', 'success_message=Users+successfully+added.')
    }
    deleteUser(userName) {
        cy.get('td[class="type-td text-center name-td"]').contains(userName).parents('tr').find('td a[onclick*="delete_contact"]').should('contain.text', 'Delete').click()
        cy.get('[id="areYouSureToDeleteThisDialog"] h3').should('be.visible').and('contain.text', 'Are you sure you want to delete this') //modal
        cy.get('[onclick="delete_contact_now();"]').should('be.visible').click() //Yes
        cy.url().should('include','success_message=Users+successfully+deleted')
    }
    updateSettings() {
        cy.get('.list-item [href*="/group"]').should('be.visible').and('contain.text', 'Settings').click() //Settings
        cy.get('[class="h3 file-title font-weight-600 mb--6"]').should('be.visible').and('contain.text', 'Your Group Settings') //heading

        cy.get('[class="d-block heading-1 font-weight-500"]').eq(0).should('be.visible').and('contain.text', 'External users may send files to any')
        cy.get('[class="d-block title"]').eq(0).should('be.visible').and('contain.text', 'I would like to allow external users to send files to any addressee not').and('contain.text', 'limited to the contact list')
        cy.get('[id="account_is_able_to_send_anyone"]').should('exist').check()  //External users may send files to any

        cy.get('[class="d-block heading-1 font-weight-500"]').eq(1).should('be.visible').and('contain.text', 'Delete inactive users')
        cy.get('[class="d-block title"]').eq(1).should('be.visible').and('contain.text', 'I would like to delete users (both internal and external) from myaccount if they are not logged in within')
        cy.get('[id="account_delete_externals_after_days"]').should('exist').uncheck()  //Delete inactive users

        cy.get('[class="d-block heading-1 font-weight-500"]').eq(2).should('be.visible').and('contain.text', 'User type and contacts visibility')
        cy.get('[class="d-block title"]').eq(2).should('be.visible').and('contain.text', 'Select which contact groups you want to allow your users to see in their')
            .and('contain.text', 'address book. To check this go to edit a user and click “inspect contact visibility')

        cy.get('[id="list_address_book"] thead').should('be.visible').and('contain.text', 'Contacts:').and('contain.text', 'Admin')
            .and('contain.text', 'Internal users').and('contain.text', 'External users').and('contain.text', 'All Other Contacts')  //Columns names

        cy.get('[id="list_address_book"] tbody tr:nth-child(1)').should('be.visible').and('contain.text', 'Allow Internal users to view:')  //Internal user settings
        cy.get('[name="internal_visibility[]"]').eq(0).should('exist').check()  //Admin
        cy.get('[name="internal_visibility[]"]').eq(1).should('exist').check()  //Internal Users
        cy.get('[name="internal_visibility[]"]').eq(2).should('exist').check()  //External Users
        cy.get('[name="internal_visibility[]"]').eq(3).should('exist').check()  //All other Contacts

        cy.get('[id="list_address_book"] tbody tr:nth-child(2)').should('be.visible').and('contain.text', 'Allow External users to view:')  //External user settings
        cy.get('[name="external_visibility[]"]').eq(0).should('exist').check()  //Admin
        cy.get('[name="external_visibility[]"]').eq(1).should('exist').check()  //Internal Users
        cy.get('[name="external_visibility[]"]').eq(2).should('exist').check()  //External Users
        cy.get('[name="external_visibility[]"]').eq(3).should('exist').check()  //All other Contacts

        cy.get('button[title="Confirm Changes"]').should('be.visible').click() //Confirm Changes
        cy.url().should('include','success_message=Your+group+settings+were+successfully+updated')
    }
}