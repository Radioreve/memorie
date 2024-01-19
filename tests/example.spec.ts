import { test, expect } from "@playwright/test";

test("Lorsque je démarre le jeu, j’ai bien une grille 4x4 de cartes retournées", async ({
  page,
}) => {
  // Navigate to memory game URL
  await page.goto("http://localhost:5173/");

  // 16 Cards
  const cards = await page.$$(".memori > li");
  expect(cards.length).toBe(16);

  // Cards are upturned
  for (const card of cards) {
    const cardState = await card.getAttribute("class");
    expect(cardState).toBe("masked");
  }
});
