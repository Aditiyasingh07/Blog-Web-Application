import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../componenets/index";
import appwriteService from "../Appwrite/config";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex items-center flex-wrap flex-col xl:flex-row xl:justify-evenly">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 xl:w-1/4 w-1/1">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPosts;
