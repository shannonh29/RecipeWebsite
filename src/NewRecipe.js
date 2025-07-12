import './css/NewRecipe.css';
import { React, useState } from "react";

function NewRecipe() {
    const [name, setName] = useState("");
    const [author, setAuthor] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [directions, setDirections] = useState("");
    return (
        <fieldset className="Main_Content">
            <form action="#" method="get">
                <label for="name">Recipe Name*</label>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    required 
                />
                <label for="author">Author</label>
                <input 
                    type="text"
                    name="author"
                    id="author"
                    value={author}
                    onChange={(e) =>
                        setAuthor(e.target.value)
                    }
                />
                <label for="ingredients">Ingredients*</label>
                <textarea
                    name="ingredients"
                    id="ingredients"
                    value={ingredients}
                    onChange={(e) =>
                        setIngredients(e.target.value)
                    }
                    required
                />
                <label for="directions">Directions*</label>
                <textarea
                    name="directions"
                    id="directiions"
                    value={directions}
                    onChange={(e) =>
                        setDirections(e.target.value)
                    }
                />
            </form>
        </fieldset>
    );
}
export default NewRecipe;