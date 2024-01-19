import "./App.css";
import Memori from "./Memori";

function App() {
  return (
    <Memori
      symbols={["💅", "🥺", "🔥", "✨", "💣", "👏", "🍰", "😇"]}
      sort={(arr) => arr.sort(() => Math.random() - 0.5)}
    />
  );
}

export default App;
