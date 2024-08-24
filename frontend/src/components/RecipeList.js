import React, { useState, useEffect } from "react";

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`/api/recipes/search/?title=${search}`);
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        setError(error);
      }
    };

    fetchRecipes();
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Recipe Finder</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={search}
        onChange={handleSearchChange}
      />
      <ul>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          recipes.map((recipe) => (
            <li key={recipe.id}>
              <h2>{recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(recipe.created_at).toLocaleString()}
              </p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecipeList;
