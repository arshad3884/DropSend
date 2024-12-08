export class RegisterPage {
    goToRegister() {
        cy.get('.login-register-nav [class="home-register-link"]').should('be.visible').and('contain.text', 'Register').click()
    }
    addNewUserDetails(fullName, email, companyName, password, confPassword) {
        cy.get('[id="register_form"] h1').should('be.visible').and('contain.text', 'Welcome in') //heading
        cy.get('[id="register_form"] .h6.mt-3').should('be.visible').and('contain.text', 'Already have an account?')
        cy.get('[id="register_form"] .h6.mt-3 [href="/login"]').should('be.visible') //login link

        cy.get('[id="register_form"] [for="mainformfullname"]').should('be.visible').and('contain.text', 'Full Name') //label
        cy.get('[id="register_form"] [id="mainformfullname"]').should('be.visible').type(fullName)
        cy.get('[id="register_form"] [for="mainformemail"]').should('be.visible').and('contain.text', 'Email') //Label
        cy.get('[id="register_form"] [id="mainformemail"]').should('be.visible').type(email)
        cy.get('[id="register_form"] [for="mainformcompanyname"]').should('be.visible').and('contain.text', 'Company (optional)') //label
        if (companyName != null) {
            cy.get('[id="register_form"] [id="mainformcompanyname"]').should('be.visible').type(companyName)
        }
        cy.get('[id="register_form"] [for="mainformpassword"]').should('be.visible').and('contain.text', 'Password') //label
        cy.get('[id="register_form"] [id="mainformpassword"]').should('be.visible').type(password)
        cy.get('[id="register_form"] [for="mainformpassword_confirm"]').should('be.visible').and('contain.text', 'Password Confirmation') //label
        cy.get('[id="register_form"] [id="mainformpassword_confirm"]').should('be.visible').type(confPassword)

        cy.get('[id="register_form"] [class="remember-check"]').should('be.visible').and('contain.text', 'I have read and agree to ').and('contain.text', 'terms & services') //temrs and conditions
        cy.get('[id="register_form"] [class="remember-check"] [name="i_agree_to_terms"]').should('exist').check()
    }
    unCheckTermsCOndition() {
        cy.get('[id="register_form"] [class="remember-check"]').should('be.visible').and('contain.text', 'I have read and agree to ').and('contain.text', 'terms & services') //temrs and conditions
        cy.get('[id="register_form"] [class="remember-check"] [name="i_agree_to_terms"]').should('exist').uncheck()
    }
    clickRegister() {
        cy.get('[id="register_form"] .sign-btn').should('be.visible').and('contain.text', 'Register').click()
    }
    validateError(message) {
        cy.get('[id="errormsg"]').should('be.visible').and('contain.text', message)
    }
    validateErrorText(message, index) {
        cy.get('[class="error-text"]').eq(index).should('exist').and('contain.text', message)
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
}