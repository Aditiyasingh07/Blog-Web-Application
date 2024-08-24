import React, { useEffect, useState } from "react";
import appwriteService from "../Appwrite/config.js";
import { Container, PostCard } from "../componenets/index.js";
import Loader from "./Loader.jsx";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length == 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 flex justify-center w-full">
              <Loader/>
              {/* <h1 className="xl:text-2xl text-xl font-bold hover:text-gray-500">
                Login to read posts
              </h1> */}
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap flex-col xl:flex-row">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 xl:w-1/4 w-full">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
