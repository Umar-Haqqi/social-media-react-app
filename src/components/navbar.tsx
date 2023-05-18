import { Link } from 'react-router-dom'

// auth contains the info of the logged in user
import { auth } from '../config/firebase';    // now can access current user's info

import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';


export const Navbar = () => {
    // this hook will automatic update user to prevent lacking when logging with different account
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="navbar">
            <div className="brand-name">Social now.</div>
            <div className="nav-items">
                <div className="links">
                    <Link className="link" to="/">Home</Link>

                    {/* if user is not logged in then show login link else hide login link and show create post link */}
                    {!user ? (
                        <Link className="link" to="/login">Login</Link>
                    ) : (
                        <Link className="link" to="/createpost">Create Post</Link>
                    )}
                </div>

                {/* display current username */}
                <div className="currentUserName">
                    {/* if user is login then display else hide even the elements(p,img tags) --- user && */}
                    {user && (
                        <>
                            {/* logout button */}
                            <button onClick={signUserOut}>Logout</button>
                            <p className="displayCurrentUserName">{user?.displayName}</p>
                            {/* if user has no profile img then show a empty string __ || ""  */}
                            <img src={user?.photoURL || ""} width="50px" height="50px" alt="" />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}