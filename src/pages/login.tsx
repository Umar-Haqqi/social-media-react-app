import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';

// importing a hook to redirect to home after login with google
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    // function to redirect after login
    const navigate = useNavigate();

    // to sign in with google in to our app
    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);

        //it will redirect to home page after login
        navigate('/');
    }

    return (
        <div>
            <p>Sign In with Google to continue</p>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    );
}