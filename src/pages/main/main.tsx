import { useState, useEffect } from 'react';
import { getDocs, collection, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Post } from './post';

export interface Post {
    id: string,
    userId: string,
    username: string,
    title: string,
    description: string,
}

export const Main = () => {
    const postsRef = collection(db, "posts");

    // state to keep track of data getting from db
    const [postsList, setPostsList] = useState<Post[] | null>(null);

    const getPosts = async () => {
        // data we get back from getDocs function
        const data = await getDocs(postsRef);
        setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]);
    };

    // calling it every time when component rendered
    useEffect(() => {
        getPosts();
    }, []);

    return (
        // looping through to render posts
        <div>{postsList?.map((post) => (
            <Post post={post} />
        ))}</div>
    )
}