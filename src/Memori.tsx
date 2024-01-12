import { FunctionComponent, useState } from "react";
import _ from "lodash";

type MemoriItemType = {
  id: number;
  symbol: string;
  state: "hidden" | "flipped" | "found";
};

interface MemoriItemProps {
  symbol: number;
  onClick: (number: number) => void;
}

const MemoriItem: FunctionComponent<MemoriItemProps> = ({
  symbol,
  onClick,
}) => <div onClick={() => onClick(symbol)}></div>;

export default function Memori({ symbols }: { symbols: string[] }) {
  const init = _(symbols)
    .map((s): Omit<MemoriItemType, "id"> => ({ state: "hidden", symbol: s }))
    .flatMap((s) => [s, s])
    .map((s, i) => ({ ...s, id: i }))
    .sortBy(() => Math.random() > 0.5)
    .value();

  console.log(init);

  const [memoryItems, setMemoryItems] = useState<MemoriItemType[]>(init);

  const handleClicked = (memoryItem: MemoriItemType) => {
    console.log(memoryItems);

    const memoryItemSelected = memoryItems.find(
      (itm) => itm.id === memoryItem.id,
    ) as MemoriItemType;

    if (memoryItemSelected.state !== "hidden") {
      return console.log("Already flipped or found, doing nothing...");
    }

    const updatedMemoryItems = [...memoryItems];
    memoryItemSelected.state = "flipped";
    const index = _.findIndex(memoryItems, (itm) => itm.id === memoryItem.id);
    updatedMemoryItems[index] = memoryItemSelected;

    const flippedItems = updatedMemoryItems.filter(
      (itm) => itm.state === "flipped",
    );

    if (flippedItems.length === 1) {
      console.log("Flipped one item, waiting for second one...");
      return setMemoryItems(updatedMemoryItems);
    }

    setMemoryItems(updatedMemoryItems);

    if (
      flippedItems.length === 2 &&
      flippedItems[0].symbol === flippedItems[1].symbol
    ) {
      flippedItems[0].state = "found";
      const index1 = _.findIndex(
        memoryItems,
        (itm) => itm.id === flippedItems[0].id,
      );
      updatedMemoryItems[index1] = flippedItems[0];
      flippedItems[1].state = "found";
      const index2 = _.findIndex(
        memoryItems,
        (itm) => itm.id === flippedItems[1].id,
      );
      updatedMemoryItems[index2] = flippedItems[1];
      console.log("Found a match!");
      return setMemoryItems(updatedMemoryItems);
    }

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
      {memoryItems.map((memoryItem, i) => {
        if (memoryItem.state === "hidden") {
          return (
            <li className="masked" key={memoryItem.id}>
              <MemoriItem
                symbol={memoryItem.symbol}
                onClick={() => {
                  handleClicked(memoryItem);
                }}
              />
            </li>
          );
        }
        if (memoryItem.state === "flipped" || memoryItem.state === "found") {
          return (
            <li className="flipped" key={memoryItem.id}>
              {memoryItem.symbol}
            </li>
          );
        }
      })}
    </ul>
  );
}
