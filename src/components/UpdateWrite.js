import React, { useState, useEffect } from "react";
import { db } from "../firebase"; // Ensure the path to your Firebase configuration is correct
import { ref, get, update } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

function UpdateWrite() {
  const [inputValue1, setInputValue1] = useState(""); // State for fruit name input
  const [inputValue2, setInputValue2] = useState(""); // State for fruit definition input
  const [message, setMessage] = useState(""); // State for feedback message
  const [error, setError] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State to manage loading state

  const navigate = useNavigate(); // Hook for navigation
  const { firebaseId } = useParams(); // Extracting firebaseId from URL parameters

  // Effect to fetch data from Firebase when the component mounts or firebaseId changes
  useEffect(() => {
    const fetchData = async () => {
      const dbRef = ref(db, "nature/fruits/" + firebaseId); // Reference to the specific fruit in the database
      try {
        const snapShot = await get(dbRef); // Get the data snapshot
        if (snapShot.exists()) {
          const targetObject = snapShot.val(); // Extract the data
          setInputValue1(targetObject.fruitName); // Set inputValue1 with the fetched fruit name
          setInputValue2(targetObject.fruitDefinition); // Set inputValue2 with the fetched fruit definition
          setError(""); // Clear any previous error messages
        } else {
          setError("No data found."); // Set error message if no data exists
        }
      } catch (err) {
        setError("Error fetching data: " + err.message); // Handle errors
      }
    };

    fetchData(); // Call the function inside useEffect
  }, [firebaseId]);

  // Function to handle the update button click
  const handleBtn = async () => {
    setLoading(true); // Set loading state to true
    const dbRef = ref(db, "nature/fruits/" + firebaseId); // Reference to the specific fruit

    try {
      await update(dbRef, {
        fruitName: inputValue1, // Update fruit name
        fruitDefinition: inputValue2, // Update fruit definition
      });
      setMessage("Data updated successfully!"); // Set success message
      setError(""); // Clear any previous error messages

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
      <h1>UPDATE</h1>
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
        {loading ? "Updating..." : "UPDATE"} {/* Change button text based on loading state */}
      </button>

      <br />
      <br />
      <button className="button1" onClick={() => navigate("/read")}>
        GO TO READ PAGE
      </button>
      <button className="button1" onClick={() => navigate("/update")}>
        GO TO UPDATE PAGE
      </button>
      {/* Display messages to the user */}
      {message && <p style={{ color: "green" }}>{message}</p>} {/* Success message */}
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Error message */}
    </div>
  );
}

export default UpdateWrite;
