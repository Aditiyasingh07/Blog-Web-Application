import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject("66474dbe002e80031830");
    this.account = new Account(this.client);
  }

  async createAccount({email, password, name} ) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      console.log("Account created");
      if (userAccount) {
        // call another method
        return this.login(email, password);
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log("CreateAccount error", error);
    }
  }

  async login({email, password}) {
    try {
      await this.account.createEmailSession(email, password);
    } catch (error) {
      console.log("login error", error);
    }
    console.log("Login Complete");
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("getCurrentUser error", error);
    }
    console.log("getCurrentUser");

    return null;
  }

  async logout() {
    try {
      await this.account.deleteSession();
    } catch (error) {
      console.log("logout error", error);
    }
    console.log("Logout Your Account");
  }
}

const authService = new AuthService();

export default authService;
