export class PlansPage {

    goToPlans() {
        cy.get('.list-item [href*="dropsend.com/account"]').should('be.visible').and('contain.text', 'My Account').click()
        cy.url().should('include', '/account')
        cy.get('[class="h3 file-title font-weight-600"]').eq(0).should('be.visible').and('contain.text', 'Your Details') //heading
        cy.get('.list-item a[href="/landing_pricing"]').should('be.visible').and('contain.text', 'Plans').click() //Plans
        cy.url().should('include', '/landing_pricing')
        cy.get('[class="main-content"] [class="h3 plans-title font-weight-600 mb-2"]').should('be.visible').and('contain.text', 'Plans') //heading
    }
    getCurrentPlan() {
        cy.get('[class="h3 font-weight-600 d-none d-sm-block mb-3"]').should('be.visible').invoke('text').then(text => {
            const currentName = text.match(/Current Plan:\s*(.+)/)[1].trim() // Extract the full plan name
            cy.log(`Extracted Plan Name: ${currentName}`)
            cy.wrap(currentName).as('currentName')
        })
    }
    getCurrentPlanPrice() {
        cy.get('[class="h3 d-none d-sm-block mb-2"]').should('be.visible').invoke('text').then(planPrice => { cy.wrap(planPrice).as('planPrice') })
    }
    validateStorageUsed(plan) {
        cy.get('[class="h5 mb-2 font-weight-500"]').should('be.visible').and('contain.text', 'Files Sent this Month:')

        cy.log(`Current plan is: ${plan}`)
        if (plan === 'Lite') {
            cy.get('[class="h4 secondary-text mb-2 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
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
        }
        else if (plan === 'Basic') {
            cy.get('[class="h4 secondary-text mb-2 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
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
            cy.get('[class="h4 secondary-text mb-2 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
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
            cy.get('[class="h4 secondary-text mb-2 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
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
            cy.get('[class="h4 secondary-text mb-2 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
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
            cy.get('[class="h4 secondary-text mb-2 font-weight-600"]').should('be.visible').invoke('text').then(availableText => {
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
    }
    validatePlanCard(planName) {
        cy.get('[class="font-weight-600 mt--10"]').should('be.visible').and('contain.text', 'Change Your Plan') //heading
        //LITE
        if (planName == 'LITE') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(0).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(0).should('exist').and('contain.text', '$0.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(0).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(0).should('exist').and('contain.text', '250.0MB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(0).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(0).should('exist').and('contain.text', 'Yes') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(0).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(0).should('exist').and('contain.text', '1') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(0).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                }
            })
        }
        //BASIC
        if (planName == 'BASIC') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(1).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(1).should('exist').and('contain.text', '$5.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(1).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(1).should('exist').and('contain.text', '1.0GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(1).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(1).should('exist').and('contain.text', 'Yes') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(1).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(1).should('exist').and('contain.text', '1') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(1).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                }
            })
        }
        //STANDARD
        if (planName == 'STANDARD') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(2).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(2).should('exist').and('contain.text', '$9.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(2).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(2).should('exist').and('contain.text', '10GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(2).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(2).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(2).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(2).should('exist').and('contain.text', '1') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(2).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                }
            })
        }
        //PRO
        if (planName == 'PRO') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(3).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(3).should('exist').and('contain.text', '$19.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(3).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(3).should('exist').and('contain.text', '25GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(3).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(3).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(3).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(3).should('exist').and('contain.text', '1') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(3).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                }
            })
        }
        //BUSINESS LITE
        if (planName == 'BUSINESS LITE') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(4).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(4).should('exist').and('contain.text', '$45.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(4).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(4).should('exist').and('contain.text', '25GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(4).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(4).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(4).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(4).should('exist').and('contain.text', '10') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(4).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                }
            })
        }
        //BUSINESS
        if (planName == 'BUSINESS') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(5).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(5).should('exist').and('contain.text', '$99.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(5).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(5).should('exist').and('contain.text', '500GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(5).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(5).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(5).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(5).should('exist').and('contain.text', '100') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(5).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                }
            })
        }
    }
    addPaymentMethod(cardNumber, cvc, month, year) {
        cy.get('[id="cc_number"]').should('exist').clear().type(cardNumber)
        cy.get('[id="cc_verif_code"]').should('exist').clear().type(cvc)
        cy.get('[id="cc_expiry_month"]').should('exist').select(month)
        cy.get('[id="cc_expiry_year"]').should('exist').select(year)
    }
    upgradePlan(planName, coupon = null, subDomain = null) {
        const accountUrl = Cypress.env('accountUrl')
        //BASIC
        if (planName == 'BASIC') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(1).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(1).should('exist').and('contain.text', '$5.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(1).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(1).should('exist').and('contain.text', '1.0GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(1).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(1).should('exist').and('contain.text', 'Yes') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(1).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(1).should('exist').and('contain.text', '1') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(1).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                    cy.log('The user is already on ' + planName)
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist')
                        .and('contain.text', 'Upgrade').then(() => {
                            cy.visit(`${accountUrl}/account/regrade?landing=1&plan_id=2`)
                            cy.get('h1').should('be.visible').and('contain.text', 'Upgrade your plan')
                            cy.get('[id="upgrade_info"]:nth-child(2) h2').should('be.visible').and('contain.text', 'You are upgrading from the ').and('contain.text', 'Basic Plan')
                            if (coupon != null) {
                                cy.get('[id="promo_code"]').should('be.visible').clear().type(coupon)
                                cy.get('[id="button_apply"]').should('be.visible').and('contain.value', 'Apply').click() //apply coupon
                                cy.get('[id="discount_info"]').should('be.visible').and('contain.text', ' Your discount with promo code is $1.13')
                            }
                            this.addPaymentMethod('4242424242424242', '123', '01', '2028')
                            cy.get('[id="cc_zip_postcode"]').should('exist').clear().type('45000')
                            cy.get('[id="cc_country"]').should('exist').select('Pakistan')
                            cy.get('[id="form_confirm"]').should('exist').click() //Continue
                            cy.get('[id="cc_form_t"]').should('exist') //next step
                            cy.get('[id="please_confirm"]').should('be.visible').and('contain.text', 'Please click Upgrade below to confirm your upgrade')
                            cy.get('[id="confirm_upgrade"]').should('be.visible').and('contain.value', 'Upgrade').click() //Upgrade
                            cy.get('[id="sent_file_success_basic"]').should('be.visible').and('contain.text', 'Upgrade successful. Thank you!') //success
                        })
                }
            })
        }
        //STANDARD
        if (planName == 'STANDARD') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(2).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(2).should('exist').and('contain.text', '$9.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(2).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(2).should('exist').and('contain.text', '10GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(2).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(2).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(2).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(2).should('exist').and('contain.text', '1') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(2).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                        .and('contain.text', 'Upgrade').then(() => {
                            cy.visit(`${accountUrl}/account/regrade?landing=1&plan_id=3`)
                            cy.get('h1').should('be.visible').and('contain.text', 'Upgrade your plan')
                            cy.get('[id="upgrade_info"]:nth-child(2) h2').should('be.visible').and('contain.text', 'You are upgrading from the ').and('contain.text', 'Standard Plan')
                            if (coupon != null) {
                                cy.get('[id="promo_code"]').should('be.visible').clear().type(coupon)
                                cy.get('[id="button_apply"]').should('be.visible').and('contain.value', 'Apply').click() //apply coupon
                                cy.get('[id="discount_info"]').should('be.visible').and('contain.text', ' Your discount with promo code is $2.03')
                            }
                            this.addPaymentMethod('4242424242424242', '123', '01', '2028')
                            cy.get('[id="cc_zip_postcode"]').should('exist').clear().type('45000')
                            cy.get('[id="cc_country"]').should('exist').select('Pakistan')
                            cy.get('[id="form_confirm"]').should('exist').click() //Continue
                            cy.get('[id="cc_form_t"]').should('exist') //next step
                            cy.get('[id="please_confirm"]').should('be.visible').and('contain.text', 'Please click Upgrade below to confirm your upgrade')
                            cy.get('[id="confirm_upgrade"]').should('be.visible').and('contain.value', 'Upgrade').click() //Upgrade
                            cy.get('[id="sent_file_success_basic"]').should('be.visible').and('contain.text', 'Upgrade successful. Thank you!') //success
                        })
                }
            })
        }
        //PRO
        if (planName == 'PRO') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(3).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(3).should('exist').and('contain.text', '$19.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(3).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(3).should('exist').and('contain.text', '25GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(3).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(3).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(3).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(3).should('exist').and('contain.text', '1') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(3).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                        .and('contain.text', 'Upgrade').then(() => {
                            cy.visit(`${accountUrl}/account/regrade?landing=1&plan_id=4`)
                            cy.get('h1').should('be.visible').and('contain.text', 'Upgrade your plan')
                            cy.get('[id="upgrade_info"]:nth-child(2) h2').should('be.visible').and('contain.text', 'You are upgrading from the ').and('contain.text', 'Pro Plan')
                            if (coupon != null) {
                                cy.get('[id="promo_code"]').should('be.visible').clear().type(coupon)
                                cy.get('[id="button_apply"]').should('be.visible').and('contain.value', 'Apply').click() //apply coupon
                                cy.get('[id="discount_info"]').should('be.visible').and('contain.text', ' Your discount with promo code is $4.29')
                            }
                            this.addPaymentMethod('4242424242424242', '123', '01', '2028')
                            cy.get('[id="cc_zip_postcode"]').should('exist').clear().type('45000')
                            cy.get('[id="cc_country"]').should('exist').select('Pakistan')
                            cy.get('[id="form_confirm"]').should('exist').click() //Continue
                            cy.get('[id="cc_form_t"]').should('exist') //next step
                            cy.get('[id="please_confirm"]').should('be.visible').and('contain.text', 'Please click Upgrade below to confirm your upgrade')
                            cy.get('[id="confirm_upgrade"]').should('be.visible').and('contain.value', 'Upgrade').click() //Upgrade
                            cy.get('[id="sent_file_success_basic"]').should('be.visible').and('contain.text', 'Upgrade successful. Thank you!') //success
                        })
                }
            })
        }
        //BUSINESS LITE
        if (planName == 'BUSINESS LITE') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(4).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(4).should('exist').and('contain.text', '$45.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(4).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(4).should('exist').and('contain.text', '25GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(4).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(4).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(4).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(4).should('exist').and('contain.text', '10') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(4).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                        .and('contain.text', 'Upgrade').then(() => {
                            cy.visit(`${accountUrl}/account/regrade?landing=1&plan_id=15`)
                            cy.get('h1').should('be.visible').and('contain.text', 'Upgrade your plan')
                            cy.get('[id="upgrade_info"]:nth-child(2) h2').should('be.visible').and('contain.text', 'You are upgrading from the ').and('contain.text', 'Business Lite Plan')
                            //Adding sub-domain
                            if (subDomain != null) {
                                cy.get('[id="subdomain"]').should('be.visible').clear().type(subDomain).and('contain.value', subDomain)
                            }
                            if (coupon != null) {
                                cy.get('[id="promo_code"]').should('be.visible').clear().type(coupon)
                                cy.get('[id="button_apply"]').should('be.visible').and('contain.value', 'Apply').click() //apply coupon
                                cy.get('[id="discount_info"]').should('be.visible').and('contain.text', ' Your discount with promo code is $10.16')
                            }
                            this.addPaymentMethod('4242424242424242', '123', '01', '2028')
                            cy.get('[id="cc_zip_postcode"]').should('exist').clear().type('45000')
                            cy.get('[id="cc_country"]').should('exist').select('Pakistan')
                            cy.get('[id="form_confirm"]').should('exist').click() //Continue
                            //Create an alias for Domain 
                            cy.get('#domain_for_ds').should('be.visible').invoke('text').as('domain')
                            cy.get('[id="cc_form_t"]').should('exist') //next step
                            cy.get('[id="please_confirm"]').should('be.visible').and('contain.text', 'Please click Upgrade below to confirm your upgrade')
                            cy.get('[id="confirm_upgrade"]').should('be.visible').and('contain.value', 'Upgrade').click() //Upgrade
                            cy.get('[id="sent_file_success_basic"]').should('be.visible').and('contain.text', 'Upgrade successful. Thank you!') //success
                        })
                }
            })
        }
        //BUSINESS
        if (planName == 'BUSINESS') {
            cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(5).should('exist').and('contain.text', planName) //Plan Name
            cy.get('.plan-card .price-text').eq(5).should('exist').and('contain.text', '$99.00')  //Price

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(4)').eq(5).should('exist').and('contain.text', 'Online Storage')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(5)').eq(5).should('exist').and('contain.text', '500GB') //Storage

            cy.get('.plan-card [class="h5 d-block mb--5"]:nth-child(6)').eq(5).should('exist').and('contain.text', 'Ads')
            cy.get('.plan-card [class="h5 d-block mb--5 font-weight-600"]:nth-child(7)').eq(5).should('exist').and('contain.text', 'No') //Ads

            cy.get('.plan-card [class="h5 mb--5"]').eq(5).should('exist').and('contain.text', 'Maximum users per account')
            cy.get('.plan-card [class="h5 font-weight-600"]').eq(5).should('exist').and('contain.text', '100') //Max users per account

            cy.get('.plan-card [class="font-weight-600 mb--4"]').eq(5).invoke('text').then(text => {
                if (text.includes('Your Current Plan')) {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist') //Upgrade downgrade button should not be shown
                } else {
                    cy.get('.plan-card').contains(planName).parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('exist') //button
                        .and('contain.text', 'Upgrade').then(() => {
                            cy.visit(`${accountUrl}/account/regrade?landing=1&plan_id=10`)
                            cy.get('h1').should('be.visible').and('contain.text', 'Upgrade your plan')
                            cy.get('[id="upgrade_info"]:nth-child(2) h2').should('be.visible').and('contain.text', 'You are upgrading from the ').and('contain.text', 'Business Plan')
                            //Adding sub-domain
                            if (subDomain != null) {
                                cy.get('[id="subdomain"]').should('be.visible').clear().type(subDomain).and('contain.value', subDomain)
                            }
                            if (coupon != null) {
                                cy.get('[id="promo_code"]').should('be.visible').clear().type(coupon)
                                cy.get('[id="button_apply"]').should('be.visible').and('contain.value', 'Apply').click() //apply coupon
                                cy.get('[id="discount_info"]').should('be.visible').and('contain.text', ' Your discount with promo code is $22.35')
                            }
                            this.addPaymentMethod('4242424242424242', '123', '01', '2028')
                            cy.get('[id="cc_zip_postcode"]').should('exist').clear().type('45000')
                            cy.get('[id="cc_country"]').should('exist').select('Pakistan')
                            cy.get('[id="form_confirm"]').should('exist').click() //Continue
                            //Create an alias for Domain 
                            cy.get('#domain_for_ds').should('be.visible').invoke('text').as('domain')
                            cy.get('[id="cc_form_t"]').should('exist') //next step
                            cy.get('[id="please_confirm"]').should('be.visible').and('contain.text', 'Please click Upgrade below to confirm your upgrade')
                            cy.get('[id="confirm_upgrade"]').should('be.visible').and('contain.value', 'Upgrade').click() //Upgrade
                            cy.get('[id="sent_file_success_basic"]').should('be.visible').and('contain.text', 'Upgrade successful. Thank you!') //success
                        })
                }
            })
        }
    }
    downgradeToLite() {
        const accountUrl = Cypress.env('accountUrl')
        //visit Confirmation modal
        cy.visit(`${accountUrl}/account/regrade?landing=1&plan_id=1`)
        cy.get('h1').should('be.visible').and('contain.text', 'Downgrade Your Plan')
        cy.get('h2').should('be.visible').and('contain.text', 'You are downgrading from the ').and('contain.text', 'Free Plan')
        cy.get('[id="confirm_downgrade"]').should('be.visible').and('contain.value', 'Downgrade').click()
        cy.get('[id="main_content_area"] p:nth-child(1)').should('be.visible').and('contain.text', 'Your plan will be changed to Free Plan')
        //API call
        const authToken = 'UQOnSu8ge7ISdcgDfUHVJ2IrKnNbIpOoM4eWcGVm1Qs='
        cy.request({
            method: 'POST',
            url: `${accountUrl}/api/admin/downgrade`,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data').and.to.be.an('array')

            // Validate each object in the 'data' array
            response.body.data.forEach((item) => {
                expect(item).to.have.property('account_id').and.to.be.a('string')
                expect(item).to.have.property('downgraded').and.to.eq(true)
            })
        })
        cy.visit(`${accountUrl}/landing_pricing`)
        cy.get('.plan-card [class="h4 d-block mb--5 font-weight-600"]').eq(0).should('exist').and('contain.text', 'LITE') //Plan Name
        cy.get('.plan-card').contains('LITE').parents('.plan-card').find('button[class="btn primary-btn circular w-100"]').should('not.exist')
    }
    downgradeToLiteFromBusiness(URL) {
        const accountUrl = Cypress.env('accountUrl')
        //visit Confirmation modal
        cy.visit(`${URL}/account/regrade?landing=1&plan_id=1`)
        cy.get('h1').should('be.visible').and('contain.text', 'Downgrade Your Plan')
        cy.get('h2').should('be.visible').and('contain.text', 'You are downgrading from the ').and('contain.text', 'Free Plan')
        cy.get('[id="confirm_downgrade"]').should('be.visible').and('contain.value', 'Downgrade').click()
        //cy.get('.row > :nth-child(1) > .heading-1').should('be.visible').and('contain.text', 'Plan: Free')
        //API call
        const authToken = 'UQOnSu8ge7ISdcgDfUHVJ2IrKnNbIpOoM4eWcGVm1Qs='
        cy.request({
            method: 'POST',
            url: `${accountUrl}/api/admin/downgrade`,
            headers: {
                Authorization: `Bearer ${authToken}`
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('data').and.to.be.an('array')

            // Validate each object in the 'data' array
            response.body.data.forEach((item) => {
                expect(item).to.have.property('account_id').and.to.be.a('string')
                expect(item).to.have.property('downgraded').and.to.eq(true)
            })
        })

    }
    validateErrorAlert(message) {
        cy.on('window:alert', (alertText) => {
            // Assert the alert message
            expect(alertText).to.include('Please check the following:')
            expect(alertText).to.include(message)
        })
    }
}