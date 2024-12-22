import { Databases, Storage, Client, Query, ID } from "appwrite";
import conf from "../../config/conf";


class Service {
    client = new Client()
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteURL)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({ content, featuredImage, userID , status}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                ID.unique(),
                {
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while creating post " + error);
        }
    }

    async updatePost(slug, { content, featuredImage }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    content,
                    featuredImage
                }
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while updating post " + error);
        }
    }

    async deletePost(slug) {
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while deleting post " + error);
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while getting a post " + error);
        }
    }

    async getAllPosts(queries = [Query.equal("status", "public")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while showing all posts " + error);
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while uploading file " + error);
            return false
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while deleting file " + error);
        }
    }

    filePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketID,
                fileId
            )
        } catch (error) {
            console.log("Appwrite Error :: Error occured while previewing file " + error);
        }
    }
    async getUserFromDB(userId) {
        try {
          const response = await this.databases.listDocuments(
            conf.appwriteCollectionID, // Replace with your collection ID
            [`userID=${userId}`] // Filter by userId
          );
      
          if (response.total > 0) {
            return response.documents[0]; // Return the first matching document
          }
          throw new Error('User not found in the database');
        } catch (error) {
          console.error('Error fetching user from database:', error);
          throw error;
        }
      }
      
}

const appwriteService = new Service()

export default appwriteService