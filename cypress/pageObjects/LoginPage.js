
export class LoginPage {
    setCookiesinDropSend() {
        cy.clearAllCookies()
        const cookies = `_ga=GA1.1.792418524.1732166521; _gcl_au=1.1.725033355.1732166651; _vwo_uuid_v2=D6B06AC482D8AF47A62BB4A081D650625|3561a95b50d8d6f68f888caf47386ea1; _vis_opt_s=1%7C; _vis_opt_test_cookie=1; _vwo_uuid=D6B06AC482D8AF47A62BB4A081D650625; _vwo_ds=3%241732638092%3A38.1148446%3A%3A; SessionID=v1b6jvhfaa5cii53p0ma3db0s8; _htr=S%25BD%2528g%25E4%2584v8%257E%25EA%2586%2512%255E%25C2%25D9%25AB%25A7%25C2%25FAV%25E2%25E5%25C3%25E3l%2540%25BD%25EF%25C1%2522d%25CA; plan=4; _clck=1c9nmhv%7C2%7Cfrq%7C0%7C1786; _hp2_ses_props.2481380113=%7B%22ts%22%3A1734257663410%2C%22d%22%3A%22myaccount-dev2.dropsend.com%22%2C%22h%22%3A%22%2F%22%7D; dslogin[c]=92c4e574; HAPcookie=devel-web02|Z162q; _hp2_id.2481380113=%7B%22userId%22%3A%224189946565274548%22%2C%22pageviewId%22%3A%221634478121564250%22%2C%22sessionId%22%3A%226667008798472685%22%2C%22identity%22%3Anull%2C%22trackerVersion%22%3A%224.0%22%7D; _ga_Q556NK9K39=GS1.1.1734257808.49.1.1734260391.57.0.0; _clsk=1m68lpb%7C1734260391958%7C13%7C1%7Cs.clarity.ms%2Fcollect`;
        cookies.split('; ').forEach(cookie => {
            const [name, value] = cookie.split('=')
            cy.setCookie(name, value)
        })
    }
    goToLogin() {
        cy.visit('/')
        cy.get('.m-menu-pb a[class="home-login-link"]').should('be.visible').and('contain.text', 'Login').click()
        //cy.url().should('include', '/login')
        cy.get('[action="/login"] h1').should('be.visible').and('contain.text', 'Welcome back.') //heading

        //this.setCookiesinDropSend()
        //cy.visit('https://myaccount-dev2.dropsend.com/login')
    }
    login(email, password) {

        cy.get('[action="/login"] .h6.mt-2').should('be.visible').and('contain.text', "Don't have an account yet?")
        cy.get('[action="/login"] [href*="/register?"]').should('be.visible') //Register link

        cy.get('[action="/login"] [for="mainformuseremail"]').should('be.visible').and('contain.text', 'Username') //label
        if (email != null) {
            cy.get('[action="/login"] [id="mainformuseremail"]').should('be.visible').type(email) //input
        }

        cy.get('[action="/login"] [for="mainformpassword"]').should('be.visible').and('contain.text', 'Password') //Label
        if (password != null) {
            cy.get('[action="/login"] [id="mainformpassword"]').should('be.visible').type(password) //input
        }

        cy.get('[action="/login"] .remember-check [id="rememberme"]').should('exist') //Remember me

        cy.get('[action="/login"] [id="loginbutton"]').should('be.visible').and('contain.text', 'Sign in').click().wait(1000) //Signin
    }
    validateError(message) {
        cy.get('[id="errormsg"]').should('be.visible').and('contain.text', message)
    }
    validateErrorText(message, index) {
        cy.get('[class="error-text"]').eq(index).should('exist').and('contain.text', message)
    }
    forgotPassword(email) {
        cy.get('[class="forgot-pass"]').should('be.visible').and('contain.text', 'Forgotten password?').click() //Forgotten password?
        cy.url().should('include', '/login/send_password')

        cy.get('[class="login-side-info"]').should('be.visible').and('contain.text', 'Over 100 Million large files securely sent') // right banner main heading
        cy.get('[class="login-container forgot-password-container"] h1').should('be.visible').and('contain.text', 'Forgotten your').and('contain.text', 'password?') //main heading
        cy.get('[class="login-container forgot-password-container"] .h6.mt-3').should('be.visible').and('contain.text', "Don't worry - enter your email address and we'll send")
        if (email != null) {
            cy.get('[class="login-container forgot-password-container"] [id="mainformemail"]').should('be.visible').type(email)
        }

        cy.get('[class="news-support-section"] h5').eq(0).should('be.visible').and('contain.text', 'Need help or support?') //Need help or support?
        cy.get('[class="news-support-section"] .h6').eq(0).should('be.visible')
            .and('contain.text', 'Find answers to all your questions at ').and('contain.text', 'www.dropsend.com/support')
            .and('contain.text', 'e-mail us').and('contain.text', 'happytohelp@dropsend.com')

        cy.get('[class="news-support-section"] h5').eq(1).should('exist').and('contain.text', 'Newsletter')  //Newsletter
        cy.get('[class="news-support-section"] .h6').eq(1).should('exist').and('contain.text', 'Keep up to date with the latest news on DropSend')
        cy.get('.sign-btn.mt-4').eq(1).should('exist').and('contain.text', 'Sign up') //Sign up

        cy.get('[action="/login/send_password"] .sign-btn').should('be.visible').and('contain.text', 'Get new').and('contain.text', 'password').click() //Get new password
    }
    validateErrorOnForgotPassword(message) {
        cy.get('.forgot-password-container .alert-box').should('contain.text', message)
    }
    verifyPasswordResetMessage() {
        cy.url().should('include', '/login/send_password_confirm')
        cy.get('[id="full_login_form"] legend').should('be.visible').and('contain.text', 'Your new password has been sent') //heading
        cy.get('[id="full_login_form"] p').eq(0).should('be.visible').and('contain.text', 'You should receive this in your email shortly.')
            .and('contain.text', 'Once you have this, please log in and change your').and('contain.text', 'password as soon as possible.')
        cy.get('[id="full_login_form"] p').eq(1).should('be.visible').and('contain.text', 'Click here to log in to your account')

    }
    goToYopmail(clientEmail) {
        cy.visit('https://yopmail.com/')
        cy.get('.titinput').should('be.visible').and('contain.text', 'Type the Email name of your choice')
        cy.wait(2000)
        cy.get('[placeholder="Enter your inbox here"]').should('exist').clear().type(clientEmail)
        cy.wait(5000)
        cy.get('[title="Check Inbox @yopmail.com"]').should('be.visible').click({ force: true })
        cy.get('.wminbox').should('be.visible').wait(3000)
    }
    getPasswordFromYopmail(maxRetries = 15) {
        let retryCount = 0

        const findEmail = () => {
            cy.getIframeBody('iframe[name="ifinbox"]').then(body => {
                if (!body.text().includes('Your DropSend login')) {  //not found
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
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(3)').should('be.visible').should('contain.text', 'Your new password is:')
                            .invoke('text').then(text => {
                                cy.log(text)
                                const password = text.split(":")[1].trim()
                                cy.wrap(password).as('newPassword')
                            })
                    })
                    //Delete this email
                    cy.on("window:confirm", (message) => {
                        // Validate the confirmation message
                        expect(message).to.equal("Are you sure you want to delete all messages?")
                        return true // Simulates clicking "OK"
                    })
                    cy.get('[id="delall"]').should('contain.text', 'Empty Inbox').click({ force: true }) //Empty Inbox
                    cy.wait(5000)
                }
            })
        }
        findEmail()
    }
    verifyEmailContentOnYopmail(maxRetries = 15) {
        let retryCount = 0
        const findEmail = () => {
            cy.getIframeBody('iframe[name="ifinbox"]').then(body => {
                if (!body.text().includes('Your DropSend login')) {  //not found
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
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(1)').should('be.visible').should('contain.text', 'Dear')
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(2)').should('be.visible').should('contain.text', 'As requested, we have created a new password for you.')
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(3)').should('be.visible').should('contain.text', 'Your new password is:')
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(4)').should('be.visible').should('contain.text', 'Login here: ')
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(5)').should('be.visible').should('contain.text', 'Feel free to change this password to something more memorable. You can change your password by clicking on the My Account tab at the top of your DropSend')
                            .and('contain.text', 'interface and entering your new password in the space provided.')
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(6)').should('be.visible').should('contain.text', 'Please contact us at ')
                            .and('contain.text', 'happytohelp@dropsend.com').and('contain.text', 'if you have any queries')
                        cy.wrap(body).find('[id="mail"] table tr:nth-child(3) td p:nth-child(7)').should('be.visible').should('contain.text', 'Regards,')
                            .and('contain.text', 'The DropSend team')
                    })
                    //Delete this email
                    cy.on("window:confirm", (message) => {
                        // Validate the confirmation message
                        expect(message).to.equal("Are you sure you want to delete all messages?")
                        return true // Simulates clicking "OK"
                    })
                    cy.get('[id="delall"]').should('contain.text', 'Empty Inbox').click({ force: true }) //Empty Inbox
                    cy.wait(5000)
                }
            })
        }
        findEmail()
    }
    logout(){
        cy.get('[id="navbarNav"] [href="/login/logout"]').should('be.visible').and('contain.text','Logout').click()
    }
}