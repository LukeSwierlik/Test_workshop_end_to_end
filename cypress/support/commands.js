// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('addIndexProductToCart', (index) => {
    cy
        .get(`[data-test-id=products-list]`)
        .get(`[data-test-id=product-item]:nth(${index})`)
        .contains('Buy')
        .click();
});

Cypress.Commands.add('addProductToCart', () => {
    cy
        .get('button.ant-btn.ant-btn-primary.ant-btn-lg')
        .contains('Buy')
        .parent()
        .click()
});

Cypress.Commands.add('checkItems', (count) => {
    cy
        .get('.ant-menu-item')
        .contains(`Cart: ${count} items`);
});

Cypress.Commands.add('moveToCart', () => {
    cy
        .get('ul.ant-menu.ant-menu-dark.ant-menu-root.ant-menu-horizontal')
        .contains('a')
        .click();
});

Cypress.Commands.add('nextStep', () => {
        cy
            .get('.ant-form-item-control')
            .contains('Next')
            .click();
});

Cypress.Commands.add('fillInput', (input, text) => {
    cy
        .get(input)
        .type(text);
});


Cypress.Commands.add('allFilledInputs', () => {
    cy
        .fillInput('#fullname', 'Luke')
        .fillInput('#street', 'Andersa 20')
        .fillInput('#city', 'Warsaw');
});

Cypress.Commands.add('chooseDeliveryMethod', () => {
    cy.addProductToCart();
    cy.moveToCart();
    cy.nextStep();

    cy.allFilledInputs();

    cy.nextStep();

    cy
        .get('#deliveryMethod')
        .click()
        .get('.ant-select-dropdown-menu')
        .contains('Courier Express')
        .click();
});