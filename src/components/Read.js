import React, { useState } from "react";
import { db } from "../firebase"; // Ensure the path to your Firebase configuration is correct
import { ref, get } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Read() {
  const [fruitArray, setFruitArray] = useState([]); // State to hold the array of fruits
  const [error, setError] = useState(""); // State to manage error messages

  const navigate = useNavigate(); // Hook for navigation

  // Function to fetch and display fruit data from Firebase
  const handleBtn = async () => {
    const dbRef = ref(db, "nature/fruits"); // Reference to the fruits node in the database
    try {
      const snapShot = await get(dbRef); // Get the data snapshot
      if (snapShot.exists()) {
        // Use Object.values to get the array of fruit data
        setFruitArray(Object.values(snapShot.val())); // Convert object to array and set state
        setError(""); // Clear any previous error messages
      } else {
        setError("No data found."); // Set error message if no data exists
      }
    } catch (err) {
      setError("Error fetching data: " + err.message); // Handle errors
    }
  };

  return (
    <div>
      <h1>READ DATA</h1>
      <button onClick={handleBtn}>Display data</button> {/* Button to fetch data */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error messages */}

      <ul>
        {fruitArray.map((item, index) => (
          <li key={index}> {/* Use index as key; consider using a unique identifier if available */}
            {item.fruitName}: {item.fruitDefinition} {/* Display fruit name and definition */}
          </li>
        ))}
      </ul>

      <br />
      <br />
      <br />
      <button className="button1" onClick={() => navigate("/")}>GO HOMEPAGE</button>
      <button className="button1" onClick={() => navigate("/update")}>UPDATE</button>
    </div>
  );
}

export default Read;
