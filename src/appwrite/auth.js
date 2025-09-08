import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectID);

    this.account = new Account(this.client);
  }

  // ✅ Create new account and login
  async createAccount({ email, password, name }) {
    try {
      // Clear any active session before creating a new account
      await this.account.deleteSession("current").catch(() => {});

      // Create a new account
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );

      if (!userAccount) return null;

      // ✅ Auto login after account creation
      await this.login({ email, password });

      // ✅ Fetch and return the logged-in user details
      return await this.getCurrentUser();
    } catch (error) {
      console.error("❌ AuthService :: createAccount :: error", error);
      throw error;
    }
  }

  // ✅ Login user
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      console.error("❌ AuthService :: login :: error", error);
      throw error;
    }
  }

  // ✅ Get current logged-in user
  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("❌ AuthService :: getCurrentUser :: error", error);
      return null;
    }
  }

  // ✅ Logout all sessions
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.error("❌ AuthService :: logout :: error", error);
    }
  }
}

const authService = new AuthService();
export default authService;
