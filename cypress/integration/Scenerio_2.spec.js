describe('scenerio 2', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it('add items to basket', () => {
        cy.addIndexProductToCart(1);
        cy.addIndexProductToCart(2);
        cy.addIndexProductToCart(3);

        cy.checkItems(3);
    });
})