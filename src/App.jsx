import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Chess } from "./components/Chess";
import { TTT } from "./components/TTT";

function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chess/:gameId" element={<Chess />} />
        <Route path="/ttt/:matchId" element={<TTT />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  )
 
}

export default App
