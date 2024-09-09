import { useState } from 'react'
import { supabase } from '../../supabaseClient'

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)

    const handleSignUp = async (e) => {
        e.preventDefault();  // Prevent the default form submission behavior
        console.log('Sign-up form submitted');  // Add this line to verify that the form is submitted
        setError(null);
      
        try {
          const { error } = await supabase.auth.signUp({
            email,
            password,
          });
      
          if (error) {
            console.error('Sign-up error:', error);  // Log error if sign-up fails
            setError(error.message);
          } else {
            alert('Sign-up successful! Check your email for the confirmation link.');
          }
        } catch (error) {
          console.error('Unexpected error:', error);
          setError('Something went wrong. Please try again.');
        }
      };
      


  return (
    <form onSubmit={handleSignUp}>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type='submit'>Submit</button>
        {error && <p>error</p>}
    </form>
    
  )
}

export default SignUp