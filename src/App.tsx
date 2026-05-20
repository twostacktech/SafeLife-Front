import Clientes from "./pages/clientes/Clientes"
import Apolices from "./pages/apolices/Apolices"
import Relatorios from "./pages/relatorios/Relatorio"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import About from "./components/About"
import Benefits from "./components/Benefits"
import CTA from "./components/CTA"
import FAQ from "./components/FAQ"
import Footer from "./components/Footer"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import "./App.css"
import "react-toastify/dist/ReactToastify.css"

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Benefits />
      <CTA />
      <FAQ />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apolices" element={<Apolices />} />
        <Route path="/relatorios" element={<Relatorios />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>

      <Footer />
      <ToastContainer autoClose={3000} position="top-right" />
    </BrowserRouter>
  )
}

export default App
