describe('scenerio 5', () => {
    const count = 2;

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
            .contains(count)
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

    // it('summary', () => {
    //     cy.chooseDeliveryMethod();
    //
    //     cy.nextStep();
    //
    //     const default_price =
    //         cy
    //             .contains('Price per unit:')
    //             .then((orderTotal) => {
    //                 const orderTotalText = orderTotal.text();
    //
    //                 return new Cypress.Promise((resolve, reject) => {
    //                     resolve(parseFloat(orderTotalText));
    //                 });
    //             });
    //
    //     console.log('price', default_price);
    //
    //
    //     const delivery_cost =
    //         cy
    //             .get('[data-test-id=deliveryAddressDeliveryCost]')
    //             .then($response => (
    //                 parseFloat($response.text())
    //             ));
    //
    //
    //     const sum =
    //         cy
    //             .get('[data-test-id=sum]')
    //             .then($response => (
    //                 parseFloat($response.text())
    //             ));
    //
    //     // console.log('sum', sum);
    //     // console.log('delivery_cost', delivery_cost);
    //     // console.log('default_price', default_price);
    //
    //     const result = (sum - delivery_cost) / default_price;
    //
    //     expect(result).to.equal(count);
    // });
});