export class HomePage {
    closeaddModal() {
        const checkAndCloseModal = (retryCount = 0, maxRetries = 5, interval = 1000) => {
            // Wait for a specified interval
            cy.wait(interval)
            // Check if the modal is present
            cy.get('body').then(($body) => {
                if ($body.find('.ui-button-icon-primary').length > 0) {
                    cy.get('.ui-button-icon-primary').should('be.visible').click() // Close the modal
                    cy.log('Ad modal appeared and was closed.')
                } else if (retryCount < maxRetries) {
                    cy.log(`Ad modal not found, retrying... (${retryCount + 1}/${maxRetries})`)
                    checkAndCloseModal(retryCount + 1, maxRetries, interval) // Retry
                } else {
                    cy.log('Ad modal did not appear within the maximum retries.')
                }
            })
        }
        // Start the recursive check
        checkAndCloseModal()
    }

    goToHome() {
        cy.get('.list-item a[href*=".dropsend.com/"]').eq(0).should('be.visible').and('contain.text', 'Home').click()
    }
    validateHomePage() {
        cy.get('.navbar-brand > img').should('be.visible') //logo
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Send').should('be.visible') //SEND
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Upload').should('be.visible') //Upload
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Request').should('be.visible') //Request
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Collaborate').if().should('be.visible') //Collaborate
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Logout').should('be.visible') //Logout

        this.closeaddModal() //If any

        cy.get(`[class="upload-more-files"] [onclick="account.open_upload('send');"]`).should('be.visible').and('contain.text', 'Send Files') //Send Files
        cy.get('li[class*="list-item"]').contains('Home').should('be.visible') //Home
        cy.get('a[href="#allMyFiles"]').should('be.visible').and('contain.text', 'My Files').click().wait(1000) //My Files
        cy.get('li[class*="list-item"] [id="inbox_nav"]').should('be.visible').and('contain.text', 'Inbox') //Inbox
        cy.get('li[class*="list-item"] [id="sentitems_nav"]').should('be.visible').and('contain.text', 'Sent') //Sent
        cy.get('li[class*="list-item"]').contains('Storage').should('be.visible') //Storage
        cy.get('li[class*="list-item"]').contains('Shared Items').if().should('be.visible') //Shared Items
        cy.get('li[class*="list-item"] [href*="/contacts"]').should('be.visible').and('contain.text', 'Contacts') //Contacts
        cy.get('li[class*="list-item"] [href*="/help-detail"]').should('be.visible').and('contain.text', 'Help') //Help
        cy.get('li[class*="list-item"] [href*="/account"]').should('be.visible').and('contain.text', 'My Account') //My Account
    }
    logout() {
        cy.get('[id="navbarNav"] [class="nav-link"]').contains('Logout').should('be.visible').click() //Logout
    }
    validateRecentFiles() {
        cy.get('[class="main-content"] [class="h3 file-title font-weight-600"]').should('be.visible').and('contain.text', 'Recent Files') //h3
        cy.get('[class="recent-file"]').if().then(files => {
            const fileCount = files.length // Get the count of files
            cy.wrap(fileCount).as('fileCount')
            cy.log('Total numbers of recent files is: ' + fileCount)
            // Iterate over each element and log the file name
            cy.get('[class="recent-file"] [class="title mb-2 text-truncate"]').each(($el, index) => {
                const fileName = $el.text().trim()
                cy.log(`File ${index + 1}: ${fileName}`)
            })
        }).else().then(() => {
            cy.log('No files under Recent Files section')
        })
    }
    validateStorageUsed() {
        cy.get('[class="details-sec"] .h3.storage-title').should('be.visible').and('contain.text', 'Storage Usage')
        cy.get('[class="h5 mb-2 font-weight-500"]').should('be.visible').and('contain.text', 'Files Sent this Month:')

        cy.get('[class="h5 font-weight-600 plan-title"]').should('be.visible').and('contain.text', 'Your Plan Details:')
        cy.get('[class="details-plan-sec"] p[class="heading-1"]').eq(0).should('exist').invoke('text').then(text => {
            // Extract the plan name using a regular expression
            const planMatch = text.match(/Plan:\s*(\w+)/)
            const plan = planMatch ? planMatch[1] : null // Get the plan name or null if not found

            cy.log(`Current plan is: ${plan}`)
            if (plan === 'Lite') {
                cy.get('[class="h4 secondary-text mb-3 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
                    // Extract numeric value from "24GB Available"
                    const available = parseFloat(availableText.match(/(\d+\.?\d*)/)[1])
                    cy.log(`Available storage: ${available}MB`)
                    cy.get('[class="plan-value storage-value block"]').should('be.visible').invoke('text').then(usedText => {
                        // Extract numeric value
                        const used = parseFloat(usedText.match(/(\d+\.?\d*)/)[1])
                        cy.log(`Used storage: ${used}MB`)

                        // Calculate the sum
                        const total = available + used
                        cy.log(`Total storage: ${total}MB`)
                        // Round the total to the nearest integer
                        const roundedTotal = Math.round(total);
                        expect(roundedTotal).to.eq(250) //Validate the total space with plan available total space
                    })
                })
            } else if (plan === 'Basic') {
                cy.get('[class="h4 secondary-text mb-3 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
                    // Extract numeric value from "24GB Available"
                    const available = parseFloat(availableText.match(/(\d+\.?\d*)/)[1])
                    cy.log(`Available storage: ${available}GB`)
                    cy.get('[class="plan-value storage-value block"]').should('be.visible').invoke('text').then(usedText => {
                        // Extract numeric value
                        const used = parseFloat(usedText.match(/(\d+\.?\d*)/)[1])
                        cy.log(`Used storage: ${used}GB`)

                        // Calculate the sum
                        const total = available + used
                        cy.log(`Total storage: ${total}GB`)
                        // Round the total to the nearest integer
                        const roundedTotal = Math.round(total);
                        expect(roundedTotal).to.eq(1) //Validate the total space with plan available total space
                    })
                })
            }
            else if (plan === 'Standard') {
                cy.get('[class="h4 secondary-text mb-3 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
                    // Extract numeric value from "24GB Available"
                    const available = parseFloat(availableText.match(/(\d+\.?\d*)/)[1])
                    cy.log(`Available storage: ${available}GB`)
                    cy.get('[class="plan-value storage-value block"]').should('be.visible').invoke('text').then(usedText => {
                        // Extract numeric value
                        const used = parseFloat(usedText.match(/(\d+\.?\d*)/)[1])
                        cy.log(`Used storage: ${used}GB`)

                        // Calculate the sum
                        const total = available + used
                        cy.log(`Total storage: ${total}GB`)
                        // Round the total to the nearest integer
                        const roundedTotal = Math.round(total);
                        expect(roundedTotal).to.eq(10) //Validate the total space with plan available total space
                    })
                })
            }
            else if (plan === 'Pro') {
                cy.get('[class="h4 secondary-text mb-3 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
                    // Extract numeric value from "24GB Available"
                    const available = parseFloat(availableText.match(/(\d+\.?\d*)/)[1])
                    cy.log(`Available storage: ${available}GB`)
                    cy.get('[class="plan-value storage-value block"]').should('be.visible').invoke('text').then(usedText => {
                        // Extract numeric value
                        const used = parseFloat(usedText.match(/(\d+\.?\d*)/)[1])
                        cy.log(`Used storage: ${used}GB`)

                        // Calculate the sum
                        const total = available + used
                        cy.log(`Total storage: ${total}GB`)
                        // Round the total to the nearest integer
                        const roundedTotal = Math.round(total);
                        expect(roundedTotal).to.eq(25) //Validate the total space with plan available total space
                    })
                })
            }
            else if (plan === 'Business Lite') {
                cy.get('[class="h4 secondary-text mb-3 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
                    // Extract numeric value from "24GB Available"
                    const available = parseFloat(availableText.match(/(\d+\.?\d*)/)[1])
                    cy.log(`Available storage: ${available}GB`)
                    cy.get('[class="plan-value storage-value block"]').should('be.visible').invoke('text').then(usedText => {
                        // Extract numeric value
                        const used = parseFloat(usedText.match(/(\d+\.?\d*)/)[1])
                        cy.log(`Used storage: ${used}GB`)

                        // Calculate the sum
                        const total = available + used
                        cy.log(`Total storage: ${total}GB`)
                        // Round the total to the nearest integer
                        const roundedTotal = Math.round(total);
                        expect(roundedTotal).to.eq(25) //Validate the total space with plan available total space
                    })
                })
            }
            else if (plan === 'Business') {
                cy.get('[class="h4 secondary-text mb-3 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
                    // Extract numeric value from "24GB Available"
                    const available = parseFloat(availableText.match(/(\d+\.?\d*)/)[1])
                    cy.log(`Available storage: ${available}GB`)
                    cy.get('[class="plan-value storage-value block"]').should('be.visible').invoke('text').then(usedText => {
                        // Extract numeric value
                        const used = parseFloat(usedText.match(/(\d+\.?\d*)/)[1])
                        cy.log(`Used storage: ${used}GB`)

                        // Calculate the sum
                        const total = available + used
                        cy.log(`Total storage: ${total}GB`)
                        // Round the total to the nearest integer
                        const roundedTotal = Math.round(total);
                        expect(roundedTotal).to.eq(500) //Validate the total space with plan available total space
                    })
                })
            }
        })
    }
    getFileSentCount() {
        return cy.get('div.h5.mb-2.font-weight-500').should('be.visible').invoke('text').then((text) => {
            const fileSentCount = parseInt(text.match(/(\d+)/)[1]); // Extract the numeric value
            cy.log(`Files Sent this Month: ${fileSentCount}`)
            return cy.wrap(fileSentCount)
        })
    }
    getCurrentPlanDetail() {
        cy.get('[class="h5 font-weight-600 plan-title"]').should('exist').and('contain.text', 'Your Plan Details:') //heading
        cy.get('[class="details-plan-sec"] [class="heading-1"]').eq(0).should('exist').invoke('text').then(text => {
            const planName = text.match(/Plan:\s*([a-zA-Z]+)/)[1]
            const paymentType = text.match(/Payment type:\s*([a-zA-Z\s]+)/)[1]
            cy.log(`Plan Name: ${planName}`)
            cy.log(`Payment Type: ${paymentType}`)

            // Store the extracted values in variables
            cy.wrap(planName).as('planName')
            cy.wrap(paymentType).as('paymentType')
        })
    }
    editPaymentMethod(ccHolderName, ccType, ccNumber, expiryMonth, expiryYear, zipCode, country, verificationCode = null) {
        cy.get('div a[href="/account/change_payment_details"]').should('exist').and('contain.text', 'Edit Payment').click() //Edit Payment info link
        cy.url().should('include', '/account/change_payment_details')
        cy.get('[class="h3 file-title font-weight-600"]').should('be.visible').and('contain.text', 'Please enter your new credit card details below') //heading
        cy.get('[for="cc_holder_name"]').should('exist').and('contain.text', 'Card Holder Name') //Card holder name
        cy.get('[id="cc_holder_name"]').should('be.visible').clear().type(ccHolderName)
        cy.get('[for="cc_type"]').should('be.visible').and('contain.text', 'Card Type') //Card Type
        cy.get('select[id="cc_type"]').should('exist').select(ccType)
        cy.get('[for="cc_number"]').should('be.visible').and('contain.text', 'Card Number') //Card Number
        cy.get('[id="cc_number"]').should('be.visible').clear().type(ccNumber)
        cy.get('[for="cc_verif_code"]').should('be.visible').and('contain.text', 'Verification Code') //Verification Code
        if (verificationCode != null) {
            cy.get('[id="cc_verif_code"]').should('be.visible').clear().type(verificationCode)
        }
        cy.get('[for="cc_expiry_month"]').should('be.visible').and('contain.text', 'Expire Month') //Expire Month
        cy.get('[id="cc_expiry_month"]').should('exist').select(expiryMonth)
        cy.get('[for="cc_expiry_year"]').should('be.visible').and('contain.text', 'Expiry Year') //Expiry Year
        cy.get('[id="cc_expiry_year"]').should('exist').select(expiryYear)
        cy.get('[for="cc_zip_postcode"]').should('be.visible').and('contain.text', 'Zip/Postal Code') //Zip/Postal Code
        cy.get('[id="cc_zip_postcode"]').should('exist').clear().type(zipCode)
        cy.get('[for="cc_country"]').should('be.visible').and('contain.text', 'Country') //Country
        cy.get('[id="cc_country"]').should('exist').select(country)

        cy.get('[class="btn secondary-btn circular mt--2 padded-btn medium mr--5"]').should('exist').and('contain.text', 'Cancel')
        cy.get('[id="confirm_changes"]').should('be.visible').and('contain.text', 'Confirm Changes') //Confirm Changes
    }
    clickConfirmChanges() {
        cy.get('[id="confirm_changes"]').should('be.visible').and('contain.text', 'Confirm Changes').click() //Confirm Changes
    }
    validateSuccessMessage(msg) {
        cy.get('[class="alert-box success"]').should('be.visible').and('contain.text', msg)
    }
    validateCCError(message) {
        cy.get('#cc_errormsg').should('be.visible').and('contain.text', message)
    }
}