import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Products from './Pages/Products';
import History from './Pages/History';
import Support from './Pages/Support';
import Payment from './Pages/Payment';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'
import Footer from './Components/Footer'

function App() {
  return (
    <div>
      <Header />
      <Footer />
    </div>
  )
}

export default App;
