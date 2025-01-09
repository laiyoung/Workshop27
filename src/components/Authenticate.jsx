import React from "react";
import { useState } from "react";

function Authenticate({ token, setUsername }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      // setUsername(result.data.username);
      setSuccessMessage(result.message);
      setError(null);
      console.log(result);

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Authenticate!</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      {/* The 2 lines above are conditional renders */}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
export default Authenticate;
