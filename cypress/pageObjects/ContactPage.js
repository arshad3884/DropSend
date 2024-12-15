export class ContactPage {
    goToContactPage() {
        cy.get('.list-item [href*="dropsend.com/contacts"]').should('be.visible').and('contain.text', 'Contacts').click() //Contact
        cy.url().should('include', '/contacts')
        cy.get('.h3.file-title').should('be.visible').and('contain.text', 'Contacts') //heading
    }
    selectEmail(index) {
        if (index == 'All') {
            cy.get('input[name="contact_ids[]"]').should('exist').check({ force: true, multiple: true }) //select all
        } else {
            cy.get('input[name="contact_ids[]"]').eq(index).should('exist').check({ force: true }) //select email
        }
    }
    addContact(firstName, lastName, email) {
        cy.get(`[onclick="return add_contact('contacts');"]`).should('be.visible').and('contain.text', 'Contacts').click() //Add Contacts
        cy.url().should('include', '/contacts/add')
        cy.get('[class="h3 file-title font-weight-600 mt--6"]').should('be.visible').and('contain.text', 'Add Contacts to your Address Book')
        cy.get('tr[id="main_headings"]').should('contain.text', 'First Name (optional)').and('contain.text', 'Last Name (optional)').and('contain.text', 'Email') //table columns
        cy.get('[name="contacts[0][firstname]"]').should('exist').type(firstName).and('contain.value', firstName)
        cy.get('[name="contacts[0][lastname]"]').should('exist').type(lastName).and('contain.value', lastName)
        cy.get('[name="contacts[0][email]"]').should('exist').type(email).and('contain.value', email)

        cy.get('[id="add_contacts_button"]').should('be.visible').and('contain.text', 'Add Contacts').click()
    }
    editContact(firstName, lastName, email) {
        cy.get('[onclick="return editContacts(this);"]').should('be.visible').and('contain.text', 'Edit').click()//Edit
        cy.url().should('include', '/contacts/edit')
        cy.get('[class="h3 file-title font-weight-600"]').should('be.visible').and('contain.text', 'Edit Contacts') //heading

        cy.get('[id="edit_contacts_form"] tr:nth-child(1)').should('be.visible').and('contain.text', 'First Name').and('contain.text', 'Last Name').and('contain.text', 'Email') //columns names
        cy.get('td input[class*="mb-0 w-100"]').eq(0).should('exist').clear().type(firstName)
        cy.get('td input[class*="mb-0 w-100"]').eq(1).should('exist').clear().type(lastName)
        cy.get('td input[class*="mb-0 w-100"]').eq(2).should('exist').clear().type(email)

        cy.get('[id="cancel_button"]').should('be.visible').and('contain.text', 'Back') //Back
        cy.get('[id="edit_contacts_button"]').should('be.visible').and('contain.text', 'Edit contacts').click() //Edit Contacts
    }
    deleteContact() {
        cy.get('[onclick="return deleteContacts(this);"]').should('be.visible').and('contain.text', 'Remove').and('contain.text', 'Contacts').click() //Remove Contact
        cy.get('[id="areYouSureToDeleteDialog"] [class="h3 text-center font-weight-600"]').should('be.visible').and('contain.text', 'Are you sure you want to delete').and('contain.text', 'these contacts?')
        cy.get('[id="areYouSureToDeleteDialog"] [onclick="delete_contacts();"]').should('be.visible').and('contain.text', 'Yes').click().wait(1000) //Yes
    }
    importContactUsingCSV(fileName) {
        cy.get('h6[class="heading-1 font-weight-500"]').should('be.visible').and('contain.text', 'Choose a file to import contacts from:')
        cy.get('input[id="csv"]').attachFile(fileName) //csv file
        cy.get('p[class="title mt--3"]').should('be.visible').and('contain.text', 'Please see ').and('contain.text', 'Example CSV')
        cy.get('[id="import_contacts_button"]').should('be.visible').and('contain.text', 'Import Contacts').click() //Import Contacts
        cy.url().should('include', '/contacts/import_csv')

        cy.get('[id="list_address_book"] tr').eq(0).should('be.visible').and('contain.text', 'First Name').and('contain.text', 'Last Name').and('contain.text', 'Email') //Columns names
        cy.get('[id="select_all"]').should('exist') //select all
        cy.get('[value="Import selected"]').should('be.visible').and('contain.text', 'Import selected').click().wait(1000) //Import selected
    }
    movePagination(direction) {
        if (direction = 'Next') {
            cy.get('[class="prev-btn"] span').eq(1).should('contain.text', 'Next').click().wait(1000)
        }
        if (direction = 'Prev') {
            cy.get('[class="prev-btn"] span').eq(0).should('contain.text', 'Prev').click().wait(1000)
        }
    }
    sortByEmail(){
        cy.get('[onclick="reverse_order(); return false;"]').should('be.visible').click().wait(1000) //Sort icon
    }
}