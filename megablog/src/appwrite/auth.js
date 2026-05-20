import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name,
      );
      if (userAccount) {
        //call another method
        this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (e) {
     console.log("Appwrite Error:", e);
    }
  }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        }
         catch (e) {
            console.log("Appwrite Error:", e);
        }
    }

    async currentUser() {
        try {
            return await this.account.get();
        } catch(e){
            console.log("Appwrite Error:", e);
        }
        return null;
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        }
         catch (e){
            console.log("Error",e)
        }
    }

}
const authService = new AuthService();

export default authService;
