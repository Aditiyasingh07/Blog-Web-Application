import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../Appwrite/config";
import { Button, Container } from "../componenets/index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="mb-4 relative rounded-xl">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-3xl w-[80%] m-auto"
                    />

                    {isAuthor && (
                        <div className="flex mt-5 w-1/2 justify-around m-auto">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-800" className="mr-3 h-10 w-28 hover:bg-green-500 duration-500 rounded-xl hover:rounded-2xl font-bold">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-800"
                            className="mr-3 h-10 w-28 hover:bg-red-500 duration-500 rounded-xl hover:rounded-2xl font-bold"
                             onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full my-10 text-center">
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                </div>
                <div className=" bg-slate-800 text-[1.2rem] rounded-3xl p-10 xl:w-[70%] m-auto">
                    {parse(post.content || "")}
                </div>
            </Container>
        </div>
    ) : null;
}
