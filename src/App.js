import './App.css';
//import React from 'react'; (this should happen automatically with CRA but ANton had  to manually add it to get his to work.  Mine seems to be working without it)
import { useState } from 'react'
// Import the following components
import AuthPage from './pages/AuthPage';
import NewOrderPage from './pages/NewOrderPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import NavBar from './components/NavBar';
// Add the following import
import { Routes, Route } from 'react-router-dom';
//import getUser to set the user state in the function App()
import { getUser } from './utilities/users-service';


//When the page refreshes, set the user state (initialize the user state) with this function:
function App() {
  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      {
        user ?
          <>
            <NavBar name={user.name} />
            <Routes>
              <Route path="/orders/new" element={<NewOrderPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser}/>
      }
    </main>
  );
}

export default App;
