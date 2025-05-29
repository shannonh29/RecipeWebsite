import React, { useState } from 'react';
import star from './star.png';
import './css/App.css';


function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="inria-serif-light Title">Recipes</h1>
        <button className="SignUp" onClick={() => setShowModal(true)}>
          sign up/register
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
            <span className='close' onClick={() => setShowModal(false)}>&times;</span>
            <h2>SignUp</h2>
            <form>
              <input type="email" placeholder="Email"/>
              <input type="password" placeholder="Password" />
              <button type="submit">Sign Up</button>
            </form>
          </div>
        </div>
      )}
    </div>

  );
}

export default App;
