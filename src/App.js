import "./App.css"
import { Routes } from "./Routes/Routes.js"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <div className="app">
      <Routes/>
      <ToastContainer/>
    </div>
  )
}

 
