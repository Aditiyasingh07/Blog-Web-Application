import React, { useEffect, useState } from "react";
import {Container, PostCard} from "../componenets/index"
import appwriteService from "../Appwrite/config"

function AllPost() {

    const [posts, setPosts] = useState([])

    useEffect(()=> {}, [])
    appwriteService.getPosts([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })

    return(
        <div className=" w-full py-8">
            <Container>
                <div className=" flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}


export default AllPost