import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import MyLoader from "../components/UI/Loader/MyLoader";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostById, isLoading, error] = useFetching( async (id) => {
       const responce = await PostService.getById(id);
       setPost(responce.data);
    })
    const [fetchComments, isComLoading, errorCom] = useFetching( async (id) => {
        const responce = await PostService.getCommentsByPostId(id);
        setComments(responce.data);
    })

    useEffect(() => {
        fetchPostById(params.id);
        fetchComments(params.id);
    }, [])
    console.log(comments);
    return (
        <div>
            <h2>Пост {params.id}</h2>
            {isLoading
                ? <MyLoader/>
                : <div>{post.id}. {post.title}</div>
            }
            <h2>Комментарии</h2>
            {isComLoading
                ? <MyLoader/>
                : comments.map(comment =>
                    <div key={comment.id} style={{marginTop: 15}}>
                        <h5>{comment.email}</h5>
                        <p>{comment.body}</p>
                    </div>
                )}
        </div>
    )
}

export default PostIdPage;