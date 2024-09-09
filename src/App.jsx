import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Fetch the initial session
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        return;
      }
      console.log('Initial session:', session);
      setSession(session);
    };
    
    fetchSession();

    // Subscribe to auth state changes
    const { data: authListener, error } = supabase.auth.onAuthStateChange((_event, session) => {
      if (error) {
        console.error('Error in auth state change:', error);
        return;
      }
      console.log('Auth state changed, new session:', session);
      setSession(session);
    });

    // Cleanup subscription on unmount
    return () => {
      // Check the structure of authListener and handle accordingly
      if (authListener && typeof authListener === 'object' && authListener.unsubscribe) {
        authListener.unsubscribe();
      }
    };
  }, []);

  // If session is null, show sign-up and login forms
  if (!session) {
    return (
      <div>
        <h2>Please Sign Up or Login</h2>
        <SignUp />
        <Login />
      </div>
    );
  }

  // If session exists, show welcome message and sign-out button
  return (
    <div>
      <p>Welcome, {session.user.email}</p>
      <button onClick={() => supabase.auth.signOut()}>Sign Out</button>
    </div>
  );
}

export default App;
