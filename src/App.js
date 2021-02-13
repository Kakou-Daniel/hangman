import Squarewords from "./Components/Squarewords/index";

function App() {
  return (
    <div className="App">
      <h1>Jeu du pendu</h1>
      <Squarewords nbOfLives={10} />
    </div>
  );
}

export default App;
