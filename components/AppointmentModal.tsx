"use client"

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/types/appwrite.types";
import {AppointmentForm} from "./forms/AppointmentForm";

const AppointmentModal = ({type, patientId, userId,appointment,title, description}:
  {  type:"create" | "delete" | 'schedule',
    patientId: string,
    userId: string,
    appointment: Appointment,
    title: string,
    description: string
}) => {

    const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button variant={"ghost"} className={`capitalize ${type==='schedule'&& 'text-green-500'}`}>
        {type === 'delete' ? 'cancel' : type}
      </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog sm:max-w-md">
        <DialogHeader className="mb-4 space-y-3">
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>

        <AppointmentForm 
            type={type}
            patientId={patientId}
            userId={userId}
            appointment={appointment}
            setOpen={setOpen}
        />

      </DialogContent>
    </Dialog>
  );
};

export default AppointmentModal;
