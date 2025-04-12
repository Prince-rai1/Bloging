import { Client, ID , Databases, Storage, Query, ImageGravity} from "appwrite";

class Services{
    client = new Client()
    database;
    storage;

    constructor(){
        this.client
        .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
        .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async create_post({title, content, featuredimage, status, user_ID}){

        try{
        return await this.database.createDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            ID.unique(),
            {
                title,
                content,
                featuredimage,
                status,
                user_ID
            }
        )
    }
        catch(error){
            console.log("Error in creating the post :: ",error)
        }
    }

    async update_post({title, slug, Id ,content, featuredimage, status}){
        return await this.database.updateDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            Id,
            {
                title,
                content,
                featuredimage,
                status
            }        
        )
    }

    async delete_post(Id){
        return await this.database.deleteDocument(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            import.meta.env.VITE_APPWRITE_COLLECTION_ID,
            Id
        )
    }

    async get_post(Id){
        try {
            return await this.database.getDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                Id
            )
        } catch (error) {
            console.log("Error in getting the post :: ",error)
        }
    }

    async get_allposts(query = [Query.equal('status','active')]){
        try {
            return await this.database.listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID,
                import.meta.env.VITE_APPWRITE_COLLECTION_ID,
                query
            )
        } catch (error) {
            console.log("Error in getting the All post :: ",error)
        }
    }

   // File services

    async upload_file(file){
        try {
            return await this.storage.createFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                ID.unique(),
                file
            )
        } catch (error) {
          console.log("Error in uploading file :: ",error)  
          return null
        }
    }

    async delete_file(fileID){
        try {
            return await this.storage.deleteFile(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                fileID
            )
        } catch (error) {
            console.log("Error in deleting file ::", error)
        }
    }

    async getFilePreview(fileID){
        try {
            return await this.storage.getFilePreview(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                fileID,
                ImageGravity.Center
            )
            
        } catch (error) {
            console.log("Error in file Preview :: ",error)
        }
    }

     getFileview(fileID){
        try {
            return this.storage.getFileView(
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
                fileID
            )
        } catch (error) {
            console.log("Error in file view :: ",error)
            
        }
    }
 
}

const AppwriteServices = new Services()

export default AppwriteServices