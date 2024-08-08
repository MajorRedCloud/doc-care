"use server"

import { ID, Query } from "node-appwrite"
import { APPOINTMENT_COLLECTION_ID, DATABASE_ID, databases } from "../appwrite.config"
import { parseStringify } from "../utils"
import { Appointment } from "@/types/appwrite.types"
import { revalidatePath } from "next/cache"

export const createAppointment = async (appointmentData : CreateAppointmentParams) => {
    try {
        const appointment = await databases.createDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            ID.unique(),
            appointmentData
        )

        return parseStringify(appointment)
    } catch (error) {
        console.log(error, "error while creating appointment")
    }
}

export const getAppointment = async (appointmentId:string) => {
    try {
        const response = await databases.getDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId
        )
        
        return parseStringify(response)
    } catch (error) {
        console.log(error, "error while fetching appointment")
    }
}

export const getLatestAppointments = async () => {
    try {
        const result = await databases.listDocuments(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            [Query.orderDesc('$createdAt')]
        )

        const initialCounts = {
            scheduledCounts : 0,
            pendingCounts : 0,
            cancelledCounts: 0
        }

        const count = (result.documents as Appointment[]).reduce((acc, appointment) => {
            if(appointment.status === "scheduled") {
                acc.scheduledCounts += 1
            } else if(appointment.status === "pending") {
                acc.pendingCounts += 1
            } else if(appointment.status === "cancelled") {
                acc.cancelledCounts += 1
            }
            return acc
        }, initialCounts)

        const data = {
            totalCounts: result.total,
            ...count,
            documents: result.documents
        }

        return parseStringify(data)

    } catch (error) {
        console.log(error, "error while fetching latest appointments")
    }
}
export const updateAppointment = async ({appointmentId, userId, appointment, type}: UpdateAppointmentParams) => {
    try {
        const updatedAppointment = await databases.updateDocument(
            DATABASE_ID!,
            APPOINTMENT_COLLECTION_ID!,
            appointmentId,
            appointment        
        )
        if (!updatedAppointment) {
            throw new Error("Appointment not found")
        }

        // SMS notif
        revalidatePath('/admin')
        return parseStringify(updatedAppointment)
    } catch (error) {
        console.log(error, "error while updating appointment")  
    }
}