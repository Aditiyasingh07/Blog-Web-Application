import React, { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, postformlogo, RTE, Select } from "../index";
import appwriteService from "../../Appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import gsap from "gsap";
import '/src/App.css'

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

    const postanimepng = useRef(null)

    useEffect(()=>{
      gsap.to(postanimepng.current, {     
      scale: 1.3,
      duration: 12,
      repeat: -1,
      yoyo: true,
      })
    })

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    console.log("Form data", data);
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);


  return (
    <form onSubmit={handleSubmit(submit)} className="flex xl:gap-0 gap-y-5 my-10 flex-wrap">
      <div className=" absolute bottom-[180px] right-[100px] z-0">
        <img
        ref={postanimepng}
        className="h-[150px] w-[150px] rotate-12"
        src={postformlogo} alt="" />
        </div>
      <div className="xl:w-2/3 w-full text-center px-2 xl:text-xl text-sm font-bold">
        <div className="flex w-full flex-col gap-y-2 items-center">
          <label>Title</label>
          <Input
            // label="Title :"
            placeholder="Title"
            className="mb-4 bg-[#ECF0F1] text-slate-800 w-[80%] h-10 rounded-2xl text-center"
            {...register("title", { required: true })}
          />
        </div>
        <div className="flex w-full flex-col gap-y-2 items-center">
          <label>Slug</label>
          <Input
            // label="Slug :"
            placeholder="Slug"
            className="mb-7 bg-[#ECF0F1] w-[80%] h-10 text-slate-800 rounded-2xl text-center"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
          />
        </div>
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <div className="flex flex-col gap-y-2">
          <label className="font-bold">Featured Image</label>
          <Input
            // label="Featured Image :"
            type="file"
            className="mb-4 bg-[#ECF0F1] text-black rounded-xl"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
        </div>
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4 bg-[#ECF0F1] text-black h-10 w-28"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-900" : undefined}
          className=" md:w-[80%] relative login-class bg-transparent shadow-blue-800 mt-5 shadow-2xl py-5 z-50 w-full text-xl rounded-2xl font-bold"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
