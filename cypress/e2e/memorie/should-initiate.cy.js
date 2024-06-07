describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display my app", () => {
    cy.get("li").should("have.length", 16);
  });

  it.only("should flip a card if it is hidden", () => {
    cy.get("[data-testid='item-masked-1'").first().click();
    cy.get("[data-testid='item-flipped-1'").should("have.length", 1);
  });
  it("should not flip a hidden during the memorization phase", () => {});
  it("should not hide a flipped card until another hidden card is flipped", () => {});
  it("should let a memorization time when 2 flipped cards are different", () => {});
  it("should let 2 identical flipped cards, remain permanently flipped", () => {});
});
