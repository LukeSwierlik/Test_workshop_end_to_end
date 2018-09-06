describe('scenerio 1', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('add item to basket', () => {
        cy.addProductToCart();
        cy.checkItems(1);
    });

    it('check exist product in Cart', () => {
        cy.addProductToCart();

        cy
            .get('ul.ant-menu.ant-menu-dark.ant-menu-root.ant-menu-horizontal')
            .contains('a')
            .click()
            .get('h4.ant-list-item-meta-title')
            .contains('Nintendo Switch - Neon Red/Neon Blue');
    });

    it('add count product in Cart', () => {
       cy.addProductToCart();
       cy.moveToCart();

       cy
           .get('[data-test-id=add-more]')
           .click()
           .get('strong')
           .contains('2')
    });

    it('fill delivery address', () => {
        cy.addProductToCart();
        cy.moveToCart();
        cy.nextStep();

        cy.allFilledInputs();
    });

    it('fill delivery method', () => {
        cy.chooseDeliveryMethod();
    });

    it('summary', () => {
        cy.chooseDeliveryMethod();

        cy.nextStep();

        cy
            .get('h4.ant-list-item-meta-title')
            .contains('Nintendo Switch - Neon Red/Neon Blue')
            .get('[data-test-id=deliveryAddressFullname]')
            .contains('Luke')
            .get('[data-test-id=deliveryAddressStreet]')
            .contains('Andersa 20')
            .get('[data-test-id=deliveryAddressCity]')
            .contains('Warsaw')
            .get('[data-test-id=deliveryAddressContry]')
            .contains('United Kingdom')
            .get('[data-test-id=deliveryAddressDeliveryMethod]')
            .contains('Courier Express')
    });
});