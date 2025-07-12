import React, { useState } from 'react';
import star from './star.png';
import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NewRecipe from './NewRecipe';


function App() {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      const res = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login successful!');
        setShowSignInModal(false);
        setIsSignedIn(true);
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
      alert(err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if(!email || !password) {
      alert('Please enter both email and password.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5001/api/signup', {
        method: 'POST',
        mode: 'cors',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration Successful!');
        setShowRegisterModal(false);
        setShowSignInModal(true);
      } else {
        alert(data.error || 'Registration failed');
      }
    } catch (err) {
      alert('Network error');
      alert(err);
    }
  };

  const changeModal = () => { 
    setShowRegisterModal((prev) => !prev);
    setShowSignInModal((prev) => !prev);
  };

  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/RecipeWebsite" className="inria-serif-light Title">Recipes</Link>
          <button className="SignInRegister_Button" onClick={() => setShowSignInModal(true)}>
            sign in/register
          </button>
        </header>

        <div className="MainContent">
          <Routes>
            <Route path="/RecipeWebsite" element= {
              <>
                <div className="Menu">
                  <h3 className="RecipeList">Recipe List</h3>
                  <div className="Line"></div>
                  <div className="Item">
                    <p className="Default">
                      {isSignedIn ? "No Recipes Yet!" : "Please Sign In/Register to Begin"}
                    </p>
                    {/* <img className='star' src={star} alt="star"></img>
                    <div className='Content'>
                      <h4 className="RecipeName"></h4>
                      <h5 className="Description"></h5>
                    </div> */}
                  </div>
                </div>
                <div className="Options">
                  <button className='Option'>Random Pick</button>
                  <a className='Option'>Search</a>
                  <Link className='Option' to="/new-recipe">New Recipe</Link>
                  <a className='Option'>Settings</a>

                </div>
              </>
            } />
            <Route path="/new-recipe" element={<NewRecipe />}/>
          </Routes>
          {/* <div className="Options">
            <a className='Option'>Random Pick</a>
            <a className='Option'>Search</a>
            <a className='Option' href="/new-recipe">New Recipe</a>
            <a className='Option'>Settings</a>
          </div> */}
        </div>

        {showSignInModal && (
          <div className='modal'>
            <span className='close' style={{cursor: 'pointer'}} onClick={() => setShowSignInModal(false)}>&times;</span>
            <h2 className="ModalTitle">Sign In</h2>
            <form className='ModalForm' onSubmit={handleSignIn}>
              <input type="email" className='field' placeholder="Email"/>
              <input type="password" className='field' placeholder="Password" />
              <div className='SwitchModal'>
                Not Yet Registered? <button className='ChangeModal' onClick={()=>changeModal()}>Register Now</button>
              </div>
              <button type="submit" className='submit'>Sign In</button>
            </form>
          </div>
        )}

        {showRegisterModal && (
          <div className='modal'>
            <span className='close' onClick={() => setShowRegisterModal(false)}>&times;</span>
            <h2 className="ModalTitle">Register</h2>
            <form className='ModalForm' onSubmit={handleRegister}>
              <input type="email" className='field' placeholder="Email"/>
              <input type="password" className='field' placeholder="Password" />
              <div className='SwitchModal'>
                Already Signed up? <button className='ChangeModal' onClick={()=>changeModal()}>Sign In Now</button>
              </div>
              <button type="submit" className='submit'>Register</button>
            </form>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
