describe('Workmark', () => {
    it('find product name', () => {
       cy.visit('/');

       cy
           .get('.ant-card-meta-title')
           .contains('Nintendo Switch - Neon Red/Neon Blue');
    });
});

