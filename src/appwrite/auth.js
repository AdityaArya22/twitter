import { Client , Account , ID , Avatars} from "appwrite";
import conf from "../../config/conf"
class Auth {
    client = new Client()
    account;
    avatars;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.account = new Account(this.client);
        this.avatars = new Avatars(this.client)
    }

    async signUpUser({email,password,name}){
        try {
            const response = await this.account.create(ID.unique(),email,password,name)
            if(response){
                return this.loginUser({email , password})
            }
            else{
                return response
            }
        } catch (error) {
            console.log("Appwrite Error :: Error occured while signing up "+error);
        }
    }
    
    async loginUser({email,password}){
        try {
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            console.log("Appwrite Error :: Error occured while logging in "+error);
        }
    }

    async getCurrentuser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Error :: Error occured while getting current user "+error);
        }
    }

    async logoutUser(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Error :: Error occured while logging out "+error);
        }
    }

    createAvatars(name){
        try {
            return this.avatars.getInitials(name)
        } catch (error) {
            console.log("Appwrite Error :: Error occured while creating avatar "+error);
        }
    }


}

const authService = new Auth();

export default authService