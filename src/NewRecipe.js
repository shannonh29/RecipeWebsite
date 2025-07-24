import './css/NewRecipe.css';
import { React, useState } from "react";

function NewRecipe() {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [directions, setDirections] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Recipe Name: ", name);
        if(author) {
            console.log("Author: ", author);
        }
        console.log("Ingredients: ", ingredients);
        console.log("Directions: ", directions);
    };


    return (
        <fieldset className="Main_Content">
            <span className='close'>&times;</span>
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