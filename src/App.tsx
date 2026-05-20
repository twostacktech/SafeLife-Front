import Clientes from "./pages/clientes/Clientes"
import Apolices from "./pages/apolices/Apolices"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Relatorios from "./pages/relatorios/Relatorio";

function App() {

  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Apolices />} />
          <Route path="/apolices" element={<Apolices />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;