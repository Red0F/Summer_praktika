import './App.css';
import { OrderProvider } from "./Components/OrderContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header'

function App() {
  return (
    <OrderProvider>
      <Header />
    
    </OrderProvider>
  )
}

export default App;
