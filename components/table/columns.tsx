"use client"

import { MoreHorizontal } from "lucide-react"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"
// import { StatusBadge } from "../StatusBadge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Appointment>[] = [
    {
        header: 'ID',
        cell: ({row}) => <p className="text-14-medium">{row.index + 1}</p>
    },
    {
        accessorKey: 'patients',
        header: 'Patient',
        cell: ({row}) => ( 
            <p className="text-14-medium">{row.original.patients.name}</p>)
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const appointment = row.original;
          return (
            <div className="min-w-[115px]">
              <StatusBadge status={appointment.status} />
            </div>
          );
        },
      },
    {
        accessorKey: "schedule",
        header: "Appointment Date",
        cell: ({row}) => (
            <p className="text-14-regular min-w-[100px]">
                {formatDateTime(row.original.schedule).dateTime}
            </p>
        )
    },
    {
        accessorKey: "primaryPhysician",
        header: 'Doctor',
        cell: ({ row }) => {
            const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

            return (
                <div className="flex gap-3 items-center">
                    <Image 
                        src={doctor?.image!}
                        alt='doctor'
                        width={32}
                        height={32}
                        className="rounded-full size-6"
                    />
                    <p className="whitespace-normal">Dr. {doctor?.name}</p>
                </div>
            )
    },
  },
  {
    id: "actions",
    header: () => (<div className="pl-4">Actions</div>),
    cell: ({ row:{original:data} }) => {
      return(
        <div className="flex gap-1">
            <AppointmentModal 
                type="schedule"
                patientId = {data.patients.$id}
                userId = {data.userId}
                appointment = {data}
                title="Schedule Appointment"
                description = "Please confirm the following details to schedule"
            />
            <AppointmentModal 
                type="delete"
                patientId = {data.patients.$id}
                userId = {data.userId}
                appointment = {data}
                title="Cancel Appointment"
                description = "Are you sure you want to cancel this appointment!"
            />
        </div>
      )
    },
  },
]

   