import { Client, Account, ID } from "appwrite";

class Authentication{
   client = new Client()
   account;

   constructor(){
      this.client
          .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
          .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
      this.account = new Account(this.client)     
   }

   async createAccount({email,password,name}){
    try{
      const user = await this.account.create(ID.unique(),email,password,name)
      return user
   }
    catch (error){
       throw error;
    }
   }

   async userlogin({email,password}){
      const user =  await this.account.createEmailPasswordSession(email,password)
      return user
   }

   async getCurrentuser(){
      try {
         const user = await this.account.get()
         return user
      } catch (error) {
         console.log("Error in getting user",error)
         return null
      }
       
    }
   
   async logout(){
      await this.account.deleteSessions()
   }
}
const Auth_services = new Authentication()

export default Auth_services