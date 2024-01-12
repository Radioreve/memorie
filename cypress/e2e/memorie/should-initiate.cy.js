describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("should display my app", () => {
    cy.get("li").should("have.length", 16);
  });
});
