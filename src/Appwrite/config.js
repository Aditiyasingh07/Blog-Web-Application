// import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint("https://cloud.appwrite.io/v1")
        .setProject("66474dbe002e80031830")
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                "66475a13002742849752",
                "66475a50002cd8197f84",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        }
        catch(error){
            console.log("createPost error", error);
        }
    }

    async updatePost(slug, title, content, featuredImage,status){
        try{
            return await this.databases.updateDocument(
                "66475a13002742849752",
                "66475a50002cd8197f84",
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch(error){
            console.log("updatePost error", error);
        }
    }

    async deletePost (slug){
        try{
            await this.databases.deleteDocument(
                "66475a13002742849752",
                "66475a50002cd8197f84",
                slug
            )
            return true
        }
        catch(error){
            console.log("deletePost error", error);
            return false
        }
    } 

    async getPost(slug){
        try{
            return await this.databases.getDocument(
                "66475a13002742849752",
                "66475a50002cd8197f84",
                slug
            )
        }
        catch(error){
            console.log("getPost error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                "66475a13002742849752",
                "66475a50002cd8197f84",
                queries
            )
        } catch (error) {
            console.log("getPosts error", error);
            return false
        }
    }

    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                "66475beb003889352d81",
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("uploadFile error", error);
            return false
        }
    }
     
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                "66475beb003889352d81",
                fileId
            )
            return true
        } catch (error) {
            console.log("deleteFile error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            "66475beb003889352d81",
            fileId
        )
    }
}

const service = new Service()

export default service