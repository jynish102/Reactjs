import conf from "../conf/conf";

import { Client, ID, Databases, Query, Storage } from "appwrite";

export class dbService {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, feturedimg, content, status, userId }) {
    try {
      return await this.databases.createDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: { title, featuredImage: feturedimg, content, status, userId },
      });
    } catch (e) {
      console.log("Appwrite Error:", e);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries,
      );
    } catch (e) {
      console.log("Appwrite Error:", e);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
    } catch (e) {
      console.log("Appwrite Error:", e);
      return false;
    }
  }

  async updatePost(slug, { title, feturedimg, content, status }) {
    try {
      return await this.databases.updateDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
        data: { title, featuredImage: feturedimg, content, status },
      });
    } catch (e) {
      console.log("Appwrite Error:", e);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument({
        databaseId: conf.appwriteDatabaseId,
        collectionId: conf.appwriteCollectionId,
        documentId: slug,
      });
      return true;
    } catch (e) {
      console.log("Appwrite Error:", e);
      return false;
    }
  }

  //upload image to appwrite storage and return fileId
  async uploadImage(file) {
    try {
      return await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
      );
    } catch (e) {
      console.log("Appwrite Error:", e);
      return false;
    }
  }

  async deleteImage(fileId) {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (e) {
      console.log("Appwrite Error:", e);
      return false;
    }
  }

  getImagePreview(fileId) {
    return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const dbservice = new dbService();

export default dbservice;
