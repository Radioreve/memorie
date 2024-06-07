import { FunctionComponent, useState } from "react";
import _ from "lodash";

type MemoryItemState = "hidden" | "flipped" | "found";
type MemoriItem = {
  id: number;
  symbol: string;
  state: MemoryItemState;
};

interface MemoriItemProps {
  symbol: string;
  onClick: (string: string) => void;
}

const MemoriItem: FunctionComponent<MemoriItemProps> = ({
  symbol,
  onClick,
}) => (
  <div onClick={() => onClick(symbol)}>
    <span></span>
  </div>
);

type MemoriProps = {
  symbols?: string[];
  sort?: (s: MemoriItem[]) => MemoriItem[];
};

const findById = (items: MemoriItem[], memoryItemId: number) =>
  items.find((itm) => itm.id == memoryItemId) as MemoriItem;

const updateItemStateById = (
  items: MemoriItem[],
  memoryItemId: number,
  newState: MemoryItemState,
) => {
  const memoryItemSelected = findById(items, memoryItemId);
  memoryItemSelected.state = newState;
  const index = _.findIndex(items, (itm) => itm.id === memoryItemId);
  items[index] = memoryItemSelected;
};

export default function Memori({
  symbols = ["💅", "🥺", "🔥", "✨", "💣", "👏", "🍰", "😇"],
  sort = (arr) => arr.sort(() => Math.random() - 0.5),
}: MemoriProps) {
  const unsortedInit = _(symbols)
    .map((s): Omit<MemoriItem, "id"> => ({ state: "hidden", symbol: s }))
    .flatMap((s) => [s, s])
    .map((s, i) => ({ ...s, id: i }))
    .value();

  const init = sort(unsortedInit);

  const [memoryItems, setMemoryItems] = useState<MemoriItem[]>(init);

  const handleClicked = (memoryItem: MemoriItem) => {
    const memoryItemSelected = findById(memoryItems, memoryItem.id);

    if (_.filter(memoryItems, { state: "flipped" }).length === 2) {
      return console.log("Wait a little bit...");
    }

    if (memoryItemSelected.state !== "hidden") {
      return console.log("Already flipped or found, doing nothing...");
    }
    const updatedMemoryItems = [...memoryItems];
    updateItemStateById(memoryItems, memoryItem.id, "flipped");

    const flippedItems = _.filter<MemoriItem>(updatedMemoryItems, {
      state: "flipped",
    });

    if (flippedItems.length === 1) {
      console.log("Flipped one item, waiting for second one...");
      return setMemoryItems(updatedMemoryItems);
    }

    const flippedCardsIdentical =
      flippedItems.length === 2 &&
      flippedItems[0].symbol === flippedItems[1].symbol;

    if (flippedCardsIdentical) {
      updateItemStateById(memoryItems, flippedItems[0].id, "found");
      updateItemStateById(memoryItems, flippedItems[1].id, "found");
      return setMemoryItems(updatedMemoryItems);
    }

    setMemoryItems(updatedMemoryItems);

    setTimeout(() => {
      console.log("Flipping back the two...");
      const updatedMemoryItems = [...memoryItems];
      flippedItems[0].state = "hidden";
      const index1 = _.findIndex(
        memoryItems,
        (itm) => itm.id === flippedItems[0].id,
      );
      updatedMemoryItems[index1] = flippedItems[0];
      flippedItems[1].state = "hidden";
      const index2 = _.findIndex(
        memoryItems,
        (itm) => itm.id === flippedItems[1].id,
      );
      updatedMemoryItems[index2] = flippedItems[1];
      setMemoryItems(updatedMemoryItems);
    }, 1000);
  };

  return (
    <ul className="memori">
      {memoryItems.map((memoryItem: MemoriItemType) => {
        if (memoryItem.state === "hidden") {
          return (
            <li
              className="masked"
              data-testid={"item-masked-" + i}
              key={memoryItem.id}
            >
              <MemoriItem
                symbol={Number(memoryItem.symbol)}
                onClick={() => {
                  handleClicked(memoryItem);
                }}
              />
            </li>
          );
        }
        if (memoryItem.state === "flipped" || memoryItem.state === "found") {
          return (
            <li
              className="flipped"
              key={memoryItem.id}
              data-testid={"item-flipped-" + i}
            >
              <span>{memoryItem.symbol}</span>
            </li>
          );
        }
      })}
    </ul>
  );
}
