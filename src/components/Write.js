import React, { useState } from "react";
import { db } from "../firebase"; // Ensure the path to your Firebase configuration is correct
import { ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Write() {
  const [inputValue1, setInputValue1] = useState(""); // State for fruit name input
  const [inputValue2, setInputValue2] = useState(""); // State for fruit definition input
  const [message, setMessage] = useState(""); // State for feedback message
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State to manage loading state

  const navigate = useNavigate(); // Hook for navigation

  // Function to handle the save button click
  const handleBtn = async () => {
    setLoading(true); // Set loading state to true
    const newDocRef = push(ref(db, "nature/fruits")); // Create a new reference for the new fruit

    try {
      await set(newDocRef, {
        fruitName: inputValue1, // Save the fruit name
        fruitDefinition: inputValue2, // Save the fruit definition
      });
      setMessage("Data saved successfully!"); // Set success message
      setError(""); // Clear any previous error messages
      
      // Clear input fields after saving
      setInputValue1("");
      setInputValue2("");

      // Automatically clear the success message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000); // 3000 milliseconds = 3 seconds

    } catch (err) {
      setError("Error: " + err.message); // Set error message
      setMessage(""); // Clear any previous success messages
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1>WRITE DATA</h1>
      <input
        type="text"
        value={inputValue1}
        onChange={(e) => setInputValue1(e.target.value)} // Update state on input change
        placeholder="Enter fruit name"
      />
      <input
        type="text"
        value={inputValue2}
        onChange={(e) => setInputValue2(e.target.value)} // Update state on input change
        placeholder="Enter fruit definition"
      />
      <button onClick={handleBtn} disabled={loading}> {/* Disable button while loading */}
        {loading ? "Saving..." : "SAVE DATA"} {/* Change button text based on loading state */}
      </button>
      
      <br />
      <br />
      <button className="button1" onClick={() => navigate("/read")}>GO READ PAGE</button>
      <button className="button1" onClick={() => navigate("/update")}>GO UPDATE PAGE</button>

      {/* Display messages to the user */}
      {message && <p style={{ color: "green" }}>{message}</p>} {/* Success message */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
    </div>
  );
}

export default Write;
