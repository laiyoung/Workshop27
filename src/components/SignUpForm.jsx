import { useState, useEffect } from "react";


function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    error: null,
  });

  useEffect(() => {
    console.log(formData)
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
        {formData.error && <p>{formData.error}</p>}

        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username:{" "}
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="password">
            Password:{" "}
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {/* The type=password is obfuscation */}
          </label>

          <input type="submit" value="Submit"/>
        </form>
      </div>
    </>
  );
}
export default SignUpForm;
