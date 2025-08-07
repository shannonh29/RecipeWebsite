import './css/NewRecipe.css';
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";

function NewRecipe() {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [directions, setDirections] = useState("");

    const navigate = useNavigate();

    function getUserIdFromToken() {
        const token = localStorage.getItem('token');
        if(!token) return null;
        try {
            // decodes the token
            return JSON.parse(atob(token.split('.')[1])).userId;
        } catch {
            return null;
        }
    }

    const handleSubmit = async (e) => {

        //prevents a possible quick refresh that might automatically happen
        e.preventDefault();

        const userId = getUserIdFromToken();

        if(!userId) {
            alert("You must be logged in to add a recipe");
            return;
        }

        // create a recipe object
        const recipe = {
            name,
            author,
            ingredients,
            directions,
            userId
        };

        try {
            const res = await fetch('http://localhost:5001/api/recipes', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(recipe)
            });

            if(res.ok) {
                alert('Recipe added!');
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to add recipe.');
            }
        } catch(err) {
            alert('Network error');
        }
    };


    return (
        <fieldset className="Main_Content">
            <span 
                className='close'
                onClick={() => navigate('/RecipeWebsite')}>&times;</span>
            <form onSubmit={handleSubmit}>
                <label for="name" id="RecipeName">Recipe Name*</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                />
                <label for="author">Author</label>
                <input 
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
                <label for="ingredients">Ingredients*</label>
                <textarea
                    name="ingredients"
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value) }
                    required
                />
                <label for="directions">Directions*</label>
                <textarea
                    name="directions"
                    id="directions"
                    value={directions}
                    onChange={(e) => setDirections(e.target.value) }
                    required
                />

                <button type="submit" value="submit">Submit</button>
            </form>
        </fieldset>
    );
}
export default NewRecipe;