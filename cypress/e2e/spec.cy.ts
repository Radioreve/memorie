describe('template spec', () => {

  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('passes', () => {
    cy.get('.memori').children().should('have.length', 16);
    cy.get('.memori').children().should('not.have.class', 'flipped');
  });


  it('flips and add class', () => {
    const rand = Math.floor(Math.random() * 16);
    cy.get('.memori').children().eq(rand).click();
    cy.get('.memori').children().eq(rand).should('have.class', 'flipped');

  });
  
  it('flips backs if not equal', () => {
    const firstTile = cy.get('.memori').children().eq(1).click().invoke('text');
    const secondTile = cy.get('.memori').children().eq(2).click().invoke('text');
    
    if (firstTile === secondTile) {
      assert(firstTile === secondTile, 'equal');
    } else {
      cy.get('.memori').children().eq(1).wait(3000).should('not.have.class', 'flipped');
    }
  });

  it('is different when realoaded', () => {
    cy.get('.memori').children().eq(1).click().invoke('text').then((firstTile) => {
      cy.reload();
      cy.get('.memori').children().eq(1).click().invoke('text').then((secondTile) => {
        assert(firstTile !== secondTile, 'not equal');
      });
    });
  });

  it('all tiles are paired', () => { 
    const tiles = [];
    cy.get('.memori').children().each((tile) => {
      tiles.push(tile.trigger("click").text());
    }).then(() => {
      // tiles.find((tile) => tiles.includes(tile));
      
    });
  });
  
})