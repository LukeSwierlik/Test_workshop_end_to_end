describe('scenerio 3', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('check errors', () => {
        cy.addIndexProductToCart(1);
        cy.addIndexProductToCart(2);
        cy.addIndexProductToCart(3);

        cy.checkItems(3);

        cy
            .get('ul.ant-menu.ant-menu-dark.ant-menu-root.ant-menu-horizontal')
            .contains('a')
            .click();

        cy.nextStep();
        cy.nextStep();

        cy
            .get('.ant-form-item-control.has-error')
            .should(($errors) => {
                expect($errors).to.have.length(3);
            });
    });
});