import conf from "../conf/conf";
import {Client, Account, ID} from "appwrite"

export class AuthService {
    clinet = new Client()
    account;

    constructor() {
        this.clinet
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.account = new Account(this.clinet)
    }

    async createAccount(email, password, name){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login(email, password)
            } else {
                return userAccount
            }
        } 
        catch (error) {
            console.log("CreateAccount error", error);
        }
    }

    async login (email, password){
        try{
            return await this.account.createEmailSession(email, password)
        }
        catch(error){
            console.log("login error", error);
        }
    }

    async getCurrentUser () {
        try{
            return await this.account.get()
        }
        catch(error){
            console.log("getCurrentUser error", error);
        }

        return null;
    }

    async logout () {
        try{
            await this.account.deleteSession()
        }
        catch(error){
            console.log("logout error", error);
        }
    }
}

const authService = new AuthService()

export default authService;
