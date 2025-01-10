import React from "react";
import { useState, useEffect } from "react";

function SignUpForm({ setToken }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    error: null,
  });

  useEffect(() => {
    // console.log(formData);
    // Activate log if you want to see the dynamic update at work!
  }, [formData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const promise = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const response = await promise.json();
      setToken(response.token);

      console.log(response);

      if (!response.success) {
        throw response.error;
      }
    } catch (error) {
      setFormData((prevData) => ({
        ...prevData,
        error: error.message,
      }));
    }
  }

  return (
    <>
      <div>
        <h2>Sign Up!</h2>
        {formData.username ? <h3>Welcome {formData.username}!</h3> : null}
        {formData.error && <p>{formData.error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:{" "}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              pattern=".{2,}"
              title="Username must be 2 or more characters"
              required
            />
          </label>
          <label htmlFor="password">
            Password :{" "}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Password must contain at least 1 number and 1 uppercase and lowercase letter, and at least 8 or more characters"
              required
            />
            {/* The type=password is for obfuscation */}
          </label>

          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}
export default SignUpForm;
