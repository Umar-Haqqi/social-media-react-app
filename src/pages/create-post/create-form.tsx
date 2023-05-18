import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// addDoc function is to add a document to DB, it will create a new entry
// collection function is reference and used to specify which collection to add a document 
import { addDoc, collection } from 'firebase/firestore';

// this will merge both libraries
import { yupResolver } from '@hookform/resolvers/yup';

// grabbing logged in user info to send it to db
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import { useNavigate } from 'react-router-dom';

// only nessesery for TS not for JS
interface createFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {
    // grabbing logged in user info
    const [user] = useAuthState(auth);

    // to redirect to home after creating a post
    const navigate = useNavigate();

    // form validations with yup
    const schema = yup.object().shape({
        title: yup.string().required("Please, set a title."),
        description: yup.string().required("Please, add something.")
    });

    const { register, handleSubmit, formState: { errors }, } = useForm<createFormData>({
        resolver: yupResolver(schema),
    })

    // a reference to collection of database
    const postsRef = collection(db, "posts");

    const onCreatePost = async (data: createFormData) => {
        // sending data to firebase database
        await addDoc(postsRef, {
            title: data.title,
            description: data.description,
            // works same as above
            // ...data,
            username: user?.displayName,
            userId: user?.uid,
        });

        // to redirect to home after creating a post
        navigate('/');
    }

    return (
        <>
            <div className="form-container">
                <form onSubmit={handleSubmit(onCreatePost)} className="create-post-form">
                    <p className='heading'>Create your Post</p>
                    <input placeholder="Title..." {...register("title")} className="post-input" />
                    <p style={{ color: "#fff" }}>{errors.title?.message}</p>
                    <textarea placeholder="Description..." {...register("description")} className="post-input" rows={6} />
                    <p style={{ color: "#fff" }}>{errors.description?.message}</p>
                    <input type="submit" value="Post Now" className="post-btn"/>
                </form>
            </div>
        </>

    )
}