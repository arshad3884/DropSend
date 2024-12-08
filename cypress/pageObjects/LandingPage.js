export class LandingPage {
    validateLandingPage() {
        cy.get('[class="large-files-text"] h1').should('be.visible').and('contain.text', 'Over 100 Million large files securely sent.') //heading
        cy.get('img[src*="dlogo.png"]').should('be.visible') //company logo

        cy.get('[class="free-send-container"]').should('be.visible').and('contain.text', 'Send files for  free now!').and('contain.text', 'No sign-up or credit card required')
        cy.get('[class="upload-file-input"]').should('be.visible').and('contain.text', 'Click to upload ').and('contain.text', ' or drag and drop')
            .and('contain.text', 'PDF, JPG or Doc (max size allowed ').and('contain.text', '250 MB').and('contain.text', 'To send larger files create an account')
    }
    addEmailsDetails(recipientEmail, senderEmail, emailSubject, emailMessage) {
        cy.get('[class="form-md"] [for="send-to"]').should('be.visible').and('contain.text', 'Send To') //label
        cy.get('[class="form-md"] [id="receiver-email-input"]').should('be.visible').type(recipientEmail)

        cy.get('[class="form-md"] [for="sender-email"]').should('be.visible').and('contain.text', 'Your Email') //label
        cy.get('[class="form-md"] [id="sender-email"]').should('be.visible').type(senderEmail)

        cy.get('[class="form-md"] [for="mail-subject"]').should('be.visible').and('contain.text', 'Title') //label
        cy.get('[class="form-md"] [id="mail-subject"]').should('be.visible').type(emailSubject)

        cy.get('[class="form-md"] [for="mail-message"]').should('be.visible').and('contain.text', 'Message') //label
        cy.get('[class="form-md"] [id="mail-message"]').should('be.visible').type(emailMessage)

        cy.get('[class="remember-check"]').should('be.visible').and('contain.text', 'I have read and agree to ').and('contain.text', 'terms & services') //T & C text
        cy.get('[class="remember-check"] [name="i_agree_to_terms"]').should('be.visible').check() //terms and conditions
    }
    addrecipient(recipientEmail) {
        cy.get('[class="form-md"] [for="send-to"]').should('exist').and('contain.text', 'Send To') //label
        cy.get('[class="form-md"] [id="receiver-email-input"]').should('be.visible').type(recipientEmail).type('{enter}')
    }

    clickUpload() {
        cy.get('[id="send-uploaded-files"]').should('be.visible').and('contain.text', 'Upload').click()
    }
    validateError(message) {
        cy.get('.error-msg').should('be.visible').and('contain.text', message)
    }
    validateErrorText(message) {
        cy.get('.error-text').should('be.visible').and('contain.text', message)
    }
    verifySenderEmailOnYopmail(maxRetries = 15) {
        let retryCount = 0

        const findEmail = () => {
            cy.getIframeBody('iframe[name="ifinbox"]').then(body => {
                if (!body.text().includes('Confirm your email address with DropSend')) {  //not found
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
                        cy.wrap(body).find('a[style*="background-color: rgba(21, 165, 240, 1)"][href*="http://link.dropsend.com/ls/click"]')
                            .should('be.visible').and('contain.text', 'Confirm your email address').then(button => {
                                const href = button.attr('href')
                                cy.log('Navigating to:', href)
                                cy.visit(href); // Verify link
                                cy.get('[class="alert-box success"]').should('be.visible').and('contain.text', 'Email verified successfully. You can now finish sending your file')
                            })
                    })
                }
            })
        }
        findEmail()
    }
    getFileDownloadLinkFromYopmail(maxRetries = 15) {
        let retryCount = 0

        const findEmail = () => {
            cy.getIframeBody('iframe[name="ifinbox"]').then(body => {
                if (!body.text().includes('Guest Account testing File')) {  //not found
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
                        cy.wrap(body).find('a[href*="http://link.dropsend.com/ls/click?"][style*="color: rgba(0, 66, 255, 1);"]')
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
    verifyFileDownloadPage(senderEmail, recipientEmail, emailSubject, emailMessage, fileCount) {
        cy.get('img[src="/softobiz-styles/imgs/logo.png"]').should('be.visible') //company logo
        if (fileCount == 1) {
            cy.get('[class="top-bar-section"] .button').should('be.visible').and('contain.text', 'Download') //Download
        } if (fileCount > 1) {
            cy.get('[class="top-bar-section"] .button').should('be.visible').and('contain.text', 'Download zip') //Download zip
        }

        cy.get('[class="row from"] .details').should('be.visible').and('contain.text', senderEmail)
        cy.get('[class="row to"] .details').should('be.visible').and('contain.text', recipientEmail)
        cy.get('[class="row subject"] .details').should('be.visible').and('contain.text', emailSubject)
        cy.get('[class="row message"] .details').should('be.visible').and('contain.text', emailMessage)
        // validate file download buttons count if multiple
        cy.get('.file-information [href*="/pickup/file/"]').should('be.visible').and('contain.text', 'Download').and('have.length', fileCount)
    }
    uploadFile(fileName, index) {
        cy.get('input[id="files-to-send"]').should('exist').attachFile(('Files/' + fileName)).wait(1000)
        cy.get('[id="uploaded-file-index-' + index + '"]').should('be.visible').and('contain.text', fileName) //validate uploading
        cy.wait(1000)
    }
    validateUploading() {
        cy.get('[class="sending-files-box-header"] .h3').should('be.visible').and('contain.text', 'Uploaded') //heading
        cy.get('#allFilesSize')
            .invoke('text')
            .then((text) => {
                // Parse the maximum file size from the text (e.g., "3.22 MB of 10.61 MB")
                const expectedFileSize = text.split('of')[1].trim()

                // Wait for the upload to complete
                cy.get('#totalUploadedFileSize', { timeout: 60000 }) // Allow sufficient time for upload
                    .should(($span) => {
                        // Assert that the uploaded size equals the expected size
                        expect($span.text().trim()).to.eq(expectedFileSize)
                    })

                // Additional assertions if needed
                cy.log(`Upload completed successfully with total size: ${expectedFileSize}`)
            })

        cy.get('.cancelAllFileUpload').should('be.visible').and('contain.text', 'Cancel') //Cancel
        cy.get('[id*="sent-file-index"]').then(($files) => {
            const fileCount = $files.length; // Count the number of uploaded files

            // Validate that the number of tick icons matches the file count
            cy.get('[alt="tick"]:visible').should('have.length', fileCount)  // Ensure only visible ticks are counted
        })
    }
    clickSend() {
        cy.get('.sendAllUploadedFile').should('be.visible').and('contain.text', 'Send').click() //Send
    }
    validateFileSendingConfirmation(emailSubject, emailMessage, recipientEmail) {
        cy.get('.success-files-box .h3').should('be.visible').and('contain.text', 'Sent Successfully') //heading
        cy.get('[src="./scss/img/success-check.gif"]').should('be.visible') //tick icon
        cy.get('.success-files-box .success-info').should('be.visible').and('contain.text', 'Your files have successfully been sent! Downloads will expire within a week.')

        //View sent files details
        cy.get('[id="view-details"]').should('be.visible').and('contain.text', 'View sent files details').click().wait(1000)
        cy.get('.heading-1').contains('Your DropSend Details:').should('be.visible')
        cy.get('[class="file-detail-info-section"] .h4').should('be.visible').and('contain.text', emailSubject)
        cy.get('[class="file-detail-info-section"] p[class="title"]').should('be.visible').and('contain.text', emailMessage)
        cy.get('[class="recipents-mail"]').should('be.visible').and('contain.text', recipientEmail)

        cy.get(`[onclick="$('#startFreeTrial').trigger('click');"]`).should('be.visible').and('contain.text', 'Start a free trial to keep your files.')
        cy.get('.primary-btn.mb-3').contains('Send Another File').should('be.visible')  //Send Another File
        cy.get('[id="startFreeTrial"]').should('be.visible').and('contain.text', 'Start a Free Trial') //Start a Free Trial
    }
    validateErrorPage() {
        cy.url().should('include', '/errors/404.htm')
        cy.get('h2').should('be.visible').and('contain.text', "The page you were looking for doesn't exist")
    }

    //header links
    validateHeaderLinks() {
        cy.get('.login-register-nav [id="supportfaqnav"]').should('exist').and('contain.text', 'Help')
        cy.get('.login-register-nav [href*="dropsend.com/pricingsignup.php"]').should('be.visible').and('contain.text', 'Pricing')
        cy.get('.login-register-nav [href*=".dropsend.com/dropshare"]').should('be.visible').and('contain.text', 'DropShare')
        cy.get('.login-register-nav [href*="dropsend.com/updates"]').should('exist').and('contain.text', 'Blog')
    }
    validateFooterLinks() {
        cy.get('[id="footer-php"] [href*=".dropsend.com/privacy.php"]').eq(0).should('exist').and('contain.text', ' Privacy Policy ') //Privacy Policy
        cy.get('[id="footer-php"] [href*="dropsend.com/privacy-dmca.php/"]').eq(0).should('exist').and('contain.text', ' DMCA ') // DMCA 
        cy.get('[id="footer-php"] [href*="dropsend.com/privacy-gdpr.php/"]').eq(0).should('exist').and('contain.text', ' GDPR Policy ') //  GDPR Policy  
        cy.get('[id="footer-php"] [href*="dropsend.com/termsconditions.php"]').eq(0).should('exist').and('contain.text', ' Terms of Service ') // Terms of Service 

        cy.get('[id="footer-php"] [href="https://www.facebook.com/DropSend"]').should('be.visible') //facebook
        cy.get('[id="footer-php"] [href="https://twitter.com/dropsend"]').should('be.visible') //twitter
    }
    validateHelpPage() {
        cy.get('.login-register-nav [id="supportfaqnav"]').should('exist').and('contain.text', 'Help').click({ force: true }) //help menu

        cy.get('[id="mySidepanel"] h1').should('be.visible').and('contain.text', 'Helpful Links') //heading on modal
        cy.get('[id="mySidepanel"] .search-help').should('be.visible') //search field
        cy.get('[id="mySidepanel"] .btn-primary').should('be.visible').and('contain.text', 'Search') // button

        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(1) h3').scrollIntoView().should('be.visible').and('contain.text', 'Sending Files')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(1) p').scrollIntoView().should('be.visible').and('contain.text', 'Learn more about sending files with DropSend here')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(1) .btn-warning').scrollIntoView().should('be.visible').and('contain.text', 'Learn more')

        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(2) h3').scrollIntoView().should('be.visible').and('contain.text', 'Downloading Files')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(2) p').scrollIntoView().should('be.visible').and('contain.text', 'Information, tips, and tricks about downloading files')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(2) .btn-warning').scrollIntoView().should('be.visible').and('contain.text', 'Learn more')

        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(3) h3').scrollIntoView().should('be.visible').and('contain.text', 'Online Storage')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(3) p').scrollIntoView().should('be.visible').and('contain.text', 'Information and tips on using your online storage')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(3) .btn-warning').scrollIntoView().should('be.visible').and('contain.text', 'Learn more')

        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(4) h3').scrollIntoView().should('be.visible').and('contain.text', 'General Questions')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(4) p').scrollIntoView().should('be.visible').and('contain.text', `Other Common FAQ’s`)
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(4) .btn-warning').scrollIntoView().should('be.visible').and('contain.text', 'Learn more')

        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(5) h3').scrollIntoView().should('be.visible').and('contain.text', 'Subscriptions & Billing')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(5) p').scrollIntoView().should('be.visible').and('contain.text', 'Payment info, account upgrades and downgrades')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(5) .btn-warning').scrollIntoView().should('be.visible').and('contain.text', 'Learn more')

        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(6) h3').scrollIntoView().should('be.visible').and('contain.text', 'Sharing Files & Folders')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(6) p').scrollIntoView().should('be.visible').and('contain.text', 'Learn how to share files and folders')
        cy.get('[id="mySidepanel"] [class="col-md-6 col-sm-12 col-12"]:nth-child(6) .btn-warning').scrollIntoView().should('be.visible').and('contain.text', 'Learn more')

        cy.get('[id="mySidepanel"] [class="closebtn"]').scrollIntoView().should('be.visible').click() //close
    }
    validatePricingPage() {
        cy.get('.login-register-nav [href*="dropsend.com/pricingsignup.php"]').should('be.visible').and('contain.text', 'Pricing').click()
        cy.url().should('include', '/pricingsignup')
        cy.get('h1[class="transparent-text"]').should('be.visible').and('contain.text', 'Simple, transparent pricing') //h1

        cy.get('[class="row pricing-mobile-view"] .col-sm-4:nth-child(1)').should('be.visible').and('contain.text', 'Basic').and('contain.text', '$5 / month')
        cy.get('[class="row pricing-mobile-view"] .col-sm-4:nth-child(2)').should('be.visible').and('contain.text', 'Standard').and('contain.text', '$9 / month')
        cy.get('[class="row pricing-mobile-view"] .col-sm-4:nth-child(3)').should('be.visible').and('contain.text', 'Professional').and('contain.text', '$19 / month')

    }
    validateDropSharePage() {
        cy.get('.login-register-nav [href*=".dropsend.com/dropshare"]').should('be.visible').and('contain.text', 'DropShare').click() //menu
        cy.url().should('include', '/dropshare')
        cy.get('.drop-share-sec .container h1').should('be.visible').and('contain.text', 'DropShare') //h1
        cy.get('.drop-share-sec .container p').should('be.visible').and('contain.text', 'DropShare allows users to collaborate and share files back and forth— even if they do not have their own DropSend account.')
        cy.get('.drop-share-sec .col-sm-6 [href*=".dropsend.com/register"]').should('be.visible').and('contain.text', 'Sign Up Today')

        cy.get('[class="easy-step-sec"] h1').should('be.visible').and('contain.text', 'Start Sharing in 3 Easy Steps')
        cy.get('[class="easy-step-sec"] [class="col-sm-4"]').eq(0).should('contain.text', 'Login to Your Account')
        cy.get('[class="easy-step-sec"] [class="col-sm-4"]').eq(1).should('contain.text', 'Request to Collaborate')
        cy.get('[class="easy-step-sec"] [class="col-sm-4"]').eq(2).should('contain.text', 'Upload and Share')

        cy.get('[class="maintain-folder-sec"] [class="col-sm-6 order-1"]').should('be.visible').and('contain.text', 'Maintain Shared Files & Folders')
        cy.get('[class="maintain-folder-sec"] [class="col-sm-6 order-4"]').should('be.visible').and('contain.text', 'Collaborate with Anyone & Everyone')

    }
    validateBlogPage() {
        cy.get('.login-register-nav [href*="dropsend.com/updates"]').should('exist').and('contain.text', 'Blog').click({ force: true })
        cy.url().should('include', '/updates')
        cy.get('.dib-homepage-title').should('be.visible').and('contain.text', 'Blog')
        cy.get('[class="dib-post "]').should('be.visible') //multiple blogs should be visible on the page
    }
    sendSupportChat(message) {
        cy.getIframeBody('[id="launcher"]').find('[aria-label="Open messaging window"]').should('be.visible').click() //chat icon
        cy.wait(5000)
        cy.getIframeBody('[name="Messaging window"]').find('[role="presentation"] h2').should('be.visible').and('contain.text', 'DropSend Support') //modal heading
        cy.getIframeBody('[name="Messaging window"]').find('textarea[id="1--input"]').should('be.visible').type(message) //message input field
        cy.getIframeBody('[name="Messaging window"]').find('[title="Send message"]').should('be.visible').click() //arrow send icon

    }
}