import React, { useState } from 'react';
import star from './star.png';
import './css/App.css';


function App() {
  const [showModal, setShowModal] = useState(false);

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
        setShowModal(false);
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      alert('Network error');
      alert(err);
    }
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="inria-serif-light Title">Recipes</h1>
        <button className="SignUp" onClick={() => setShowModal(true)}>
          sign in/register
        </button>
      </div>

      <div className="MainContent">
        <div className="Menu">

          <h3 className="RecipeList">Recipe List</h3>
          <div className="Line"></div>
          <div className="Item">
            <p className="Default">Please Sign In/Register to Begin</p>
            {/* <img className='star' src={star} alt="star"></img>
            <div className='Content'>
              <h4 className="RecipeName"></h4>
              <h5 className="Description"></h5>
            </div> */}

          </div>
        </div>

        <div className="Options">
          <button className='Option'>Random Pick</button>
          <button className='Option'>Search</button>
          <button className='Option'>New Recipe</button>
          <button className='Option'>Settings</button>
        </div>
      </div>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' style={{cursor: 'pointer'}} onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="SignUpTitle">Sign In</h2>
            <form className='SignUpForm' onSubmit={handleSignIn}>
              <input type="email" className='field' placeholder="Email"/>
              <input type="password" className='field' placeholder="Password" />
              <div className='NotYet'>
                Not Yet Registered? <a>Sign Up Now</a>
              </div>
              <button type="submit" className='submit'>Sign In</button>
            </form>
          </div>
        </div>
      )}
    </div>

  );
}

export default App;
