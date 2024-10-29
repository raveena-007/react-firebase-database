import React, { useState } from "react";
import { db } from "../firebase"; // Ensure the path to your Firebase configuration is correct
import { ref, get, remove } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Update() {
  const [fruitArray, setFruitArray] = useState([]); // State to hold the array of fruits
  const [error, setError] = useState(""); // State to manage error messages

  const navigate = useNavigate(); // Hook for navigation

  // Function to fetch and display fruit data from Firebase
  const handleBtn = async () => {
    const dbRef = ref(db, "nature/fruits"); // Reference to the fruits node in the database
    try {
      const snapShot = await get(dbRef); // Get the data snapshot
      if (snapShot.exists()) {
        const myData = snapShot.val(); // Extract the data
        // Map through the data and create an array of fruit objects
        const temporaryArray = Object.keys(myData).map((myFireId) => ({
          ...myData[myFireId],
          fruitId: myFireId, // Add the fruitId to each fruit object
        }));

        setFruitArray(temporaryArray); // Set the fruit array after mapping
        setError(""); // Clear any previous error messages
      } else {
        setError("No data found."); // Set error message if no data exists
      }
    } catch (err) {
      setError("Error fetching data: " + err.message); // Handle errors
    }
  };

  // Function to delete a fruit based on its ID
  const deleteFruit = async (fruitIdParam) => {
    const dbRef = ref(db, "nature/fruits/" + fruitIdParam); // Correct the path to include a forward slash
    try {
      await remove(dbRef); // Remove the fruit from the database
      // Update the state to remove the deleted fruit from the display
      setFruitArray((prevArray) => prevArray.filter((fruit) => fruit.fruitId !== fruitIdParam));
      setError(""); // Clear any previous error messages
    } catch (err) {
      setError("Error deleting fruit: " + err.message); // Handle deletion errors
    }
  };

  return (
    <div>
      <h1>UPDATE DATA</h1>
      <button onClick={handleBtn}>DISPLAY DATA</button> {/* Button to fetch and display data */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}

      <ul>
        {fruitArray.map((item) => (
          <li key={item.fruitId}> {/* Use fruitId as the key for better identification */}
            {item.fruitName}: {item.fruitDefinition} (ID: {item.fruitId})
            <button className="button1" onClick={() => navigate(`/updatewrite/${item.fruitId}`)}>UPDATE</button>
            <button className="button1" onClick={() => deleteFruit(item.fruitId)}>DELETE</button>
          </li>
        ))}
      </ul>
      <button className="button1" onClick={() => navigate("/")}>GO HOMEPAGE</button>
      <button className="button1" onClick={() => navigate("/read")}>GO READPAGE</button>
    </div>
  );
}

export default Update;
