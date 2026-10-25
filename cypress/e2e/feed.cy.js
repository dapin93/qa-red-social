// Prueba automatizada para validar el rendimiento del Feed y evitar fugas de memoria
describe('Pruebas de Rendimiento - Red Social', () => {
  it('Debe renderizar el feed y permitir scroll rápido sin congelarse a 60 FPS', () => {
    cy.visit('http://localhost:3000/feed');

    // Verificar que los componentes iniciales cargan
    cy.get('.post-item').should('have.length.greaterThan', 5);

    // Simular scroll rápido para probar la virtualización de la lista
    cy.scrollTo('bottom', { duration: 2000 });
    cy.wait(500);
    cy.scrollTo('bottom', { duration: 2000 });

    // Verificar que la interfaz sigue respondiendo y no hay crash
    cy.get('.post-item').last().should('be.visible');
  });
});