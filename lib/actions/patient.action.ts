"use server"

import { BUCKET_ID, DATABASE_ID, databases, ENDPOINT, PATIENT_COLLECTION_ID, PROJECT_ID, storage, users } from "../appwrite.config"
import { ID, Query } from "node-appwrite";
import {InputFile} from "node-appwrite/file";
import { parseStringify } from "../utils"

export const createUser = async (userData:CreateUserParams) => {
    try {
        const result = await users.create(ID.unique(), userData.email, userData.phone,undefined, userData.name)
        return result
        
    } catch (error : any) {
        console.log(error, "error while creating user")
    }
}

export const getUser = async (userId:string) => {
    try {
        const user = await users.get(userId)
        return parseStringify(user)
    } catch (error : any) {
        console.log(error, "error while fetching user")
    }
}

export const registerUser = async ({identificationDocument,...patient} : RegisterUserParams) => {
    try {
        let file;
        if (identificationDocument) {
          const inputFile =
            InputFile.fromBuffer(
              identificationDocument?.get("blobFile") as Blob,
              identificationDocument?.get("fileName") as string
            );
    
          file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
        }

        const newPatient = await databases.createDocument(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            ID.unique(),
            {
                identificationDocumentId: file?.$id || null,
                identificationDocumentUrl: file?.$id
                ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
                : null,
                ...patient,
            }
        )

        return parseStringify(patient)
    
        
    } catch (error : any) {
        console.log(error, "error while registering user")
    }
}

export const getPatient = async (userId:string) => {
    try {
        const patient = await databases.listDocuments(
            DATABASE_ID!,
            PATIENT_COLLECTION_ID!,
            [
                Query.equal("userid", userId)
            ]
        )

        return parseStringify(patient.documents[0])
    } catch (error) {
        console.log(error, 'Error while fetching patient')
    }
}