//Variables used   
    const myEmail = 'aurevoir@ipanema.ee'
    let password = 'Cerebrumhub123'

beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')

})

//Assignement 4 by Sajib Sharma

describe('Section 1: Functional tests', () => {

    it('User can use same password for both first and validation passwords', ()=>{
        cy.get('#username').type('Sajib')
        cy.get('input[name="email"]').type(myEmail)
        cy.get('input[name="name"]').type('Sajib')
        cy.get('input[name="lastName"]').type('Sharma')
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type(password)
        cy.get('[name="confirm"]').type('Cerebrumhub')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        //Test changed to same passwords 
        cy.get('[name="confirm"]').clear().type(password)
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })
    
    it('User can submit form with all fields added', ()=>{
        inputValidData('Username25')
        cy.get('#htmlFavLanguage').check()
        cy.get('#htmlFavLanguage').should('be.checked')
        cy.get('#vehicle1').check()
        cy.get('#vehicle1').should('be.checked')
        cy.get('#cars').select('audi')
        cy.get('#animal').select('snake') 
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })

    it('User can submit form with valid data and only mandatory fields added', ()=>{
        inputValidData('Username25')
        cy.get('.submit_button').should('be.enabled').click()
        cy.get('#success_message').should('be.visible').should('contain', "User successfully submitted registration")
    })

    it('User cannot submit form if some mandatory fields are absent', ()=>{
        inputValidData('Username25')
        cy.get('[name="lastName"]').clear()
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')   
    })
})

/*
Assignement 5: Create more visual tests by Sajib Sharma
*/

describe('Section 2: Visual tests', () => {
    it('Check that the Cerebrumhub logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').eq('0').invoke('height')
            .should('be.lessThan', 178)
            .and('be.greaterThan', 100) 
    })

    it('Check that the Cypress logo is correct and has correct size', () => {
        cy.log("Check Cypress logo source and size");
        cy.get('[data-cy="cypress_logo"]').should("have.attr", "src").should("include", "cypress_logo");
        cy.get('[data-cy="cypress_logo"]').invoke('height')
            .should('be.lessThan', 116)
            .and('be.greaterThan', 80)  
    })

    it('Check navigation part, registration form 1', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check navigation part, registration form 3', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)
        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')
        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')
        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)
        
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')
        
        cy.get('input[type="checkbox"]').eq(0).should("not.be.checked");
        cy.get('input[type="checkbox"]').eq(1).should("not.be.checked");
        cy.get('input[type="checkbox"]').eq(2).should("not.be.checked");
    
        cy.get('input[type="checkbox"]').eq(0).check().should("be.checked");
        cy.get('input[type="checkbox"]').eq(1).check().should("be.checked");
        cy.get('input[type="checkbox"]').eq(0).should("be.checked");
        cy.get('input[type="checkbox"]').eq(1).should("be.checked");
        cy.get('input[type="checkbox"]').eq(2).should("not.be.checked");

    })

    it('Car dropdown is correct', () => {
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })

    it('Animal dropdown is correct', () => {
        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

    })

    it('Animal dropdown is correct in an alternative method', () => {
        cy.get('#animal').find('option').should('have.length', 6)
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })

})


function inputValidData(Username25) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type('Sajib')
    cy.get('#email').type(myEmail)
    cy.get('[data-cy="name"]').type('Sajib')
    cy.get('#lastName').type('Sharma')
    cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
    cy.get('#password').type(password)
    cy.get('#confirm').type(password)
    cy.get('h2').contains('Password').click()
    }


    