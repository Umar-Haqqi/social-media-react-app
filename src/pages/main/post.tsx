import { addDoc, collection, query, where, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useState, useEffect } from 'react';

// in TS we have define props in interface
import { Post as interfacePost } from './main';
interface Props {
    post: interfacePost;
}
interface Like {
    likeId: string;
    userId: string;
}

export const Post = (props: Props) => {
    const { post } = props;
    // this give info of current logged in user
    const [user] = useAuthState(auth);

    // like or dislike
    const [likes, setLikes] = useState<Like[] | null>(null);

    // connecting to likes collection in db
    const likesRef = collection(db, "likes");

    const addLike = async () => {
        // try and catch will prevent failing
        try {
            const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id, });
            // automatic rendering without refreshing the page
            if (user) {
                setLikes((prev) =>
                    prev ? [...prev,
                    { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const removeLike = async () => {
        try {
            // to get specific like to delete with the help of query
            const likeToDeleteQuery = query(likesRef,
                where("postId", "==", post.id),
                where("userId", "==", user?.uid),
            );
            // to get the specfic like to delete 
            const likeToDeleteData = await getDocs(likeToDeleteQuery);
            // likeToDeleteData now has one element with specfic like

            // reference to which document or like to delete
            const likeId = likeToDeleteData.docs[0].id;
            const likeToDelete = doc(db, "likes", likeId);

            await deleteDoc(likeToDelete);
            // automatic rendering without refreshing the page  
            if (user) {
                setLikes(
                    (prev) => prev && prev.filter((like) => like.likeId !== likeId)
                );
            }
        } catch (err) {
            console.log(err);
        }
    };

    // update likes in ui
    const likesDoc = query(likesRef, where("postId", "==", post.id));

    const getLikes = async () => {
        const data = await getDocs(likesDoc);
        // console.log(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
    }

    const hasUserliked = likes?.find((like) => like.userId === user?.uid)

    useEffect(() => {
        getLikes();
    }, [])

    return (
        <>
            <div className="post-container">
                <div className="post-display">
                    <div className="post-title">
                        <p>{post.title}</p>
                    </div>
                    <div className="post-body">
                        <p>{post.description}</p>
                    </div>
                    <div className="post-footer">
                        <p>@{post.username}</p>
                        <button onClick={hasUserliked ? removeLike : addLike}> {hasUserliked ? <> &#128078;</> : <>&#128077;</>} </button>
                        {/* if life exists then show else hide */}
                        {likes && <p>Likes: {likes?.length}</p>}
                    </div>
                </div>
            </div>
        </>
    )
}