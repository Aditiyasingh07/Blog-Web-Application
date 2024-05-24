import React, { useEffect, useState } from "react";
import {Container, PostForm} from "../componenets/index"
import appwriteService from "../Appwrite/config"
import { useNavigate, useParams } from "react-router-dom";

function EditPost(){

    const navigate = useNavigate();
    const [post, setPosts] = useState(null)
    const {slug} = useParams()

    useEffect(()=> {
        if(slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        }else{
            navigate('/')
        }
    }, [slug, navigate])

    return post ? (
        <div className=" py-8">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost