import { useState } from 'react'
import { supabase } from '../../supabaseClient'


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    setError(null);  // Clear any previous error

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        setError(error.message);  // Display error if login fails
      } else {
        alert('Login successful!');
      }
    } catch (error) {
      console.error('Unexpected error:', error);  // Catch unexpected errors
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}  {/* Display error if login fails */}
    </form>
  );
}

export default Login;
