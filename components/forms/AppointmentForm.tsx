"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import SubmitButton from "./SubmitButton";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getAppointmentSchema } from "@/lib/Validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.action";
import { SelectItem } from "../ui/select";
import Image from "next/image";
import { Doctors } from "@/constants";
import { FormFieldType } from "./PatientForm";
import { createAppointment } from "@/lib/actions/appointment.actions";
import { Appointment } from "@/types/appwrite.types";
import {updateAppointment} from "@/lib/actions/appointment.actions";
import { set } from "date-fns";


export const AppointmentForm = ({ type, userId, patientId, appointment, setOpen }: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "delete";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const schema = getAppointmentSchema(type);

  // 1. Define your form. (shadcn docs)
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  // 2. Define a submit handler. (shadcn docs)
  async function onSubmit(values: z.infer<typeof schema>) {
    setIsLoading(true);

    let status:Status;
    switch (type) {
        case 'schedule':
            status = 'scheduled'
            break;
        case 'delete':
            status = 'cancelled'
            break;
        default:
            status = 'pending'
            break;
    }

    try {
      if(type === 'create' && patientId){
        const appointmentData = {
            userId : userId,
            patientId : patientId,
            primaryPhysician : values.primaryPhysician,
            schedule : new Date(values.schedule),
            reason : values.reason,
            note : values.note,
            status : status,
            patients: patientId
        } 
        
        const appointment = await createAppointment(appointmentData)
        
        if(appointment){
            form.reset()
            router.push(`/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`)
        }
        
        } else {
          const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment : {
            primaryPhysician : values?.primaryPhysician,
            schedule : new Date(values?.schedule),
            status : status,
            cancellationReason : values?.cancellationReason
          },type
        }

        const updatedAppointment = await updateAppointment(appointmentToUpdate)
        if(updatedAppointment){
          form.reset()
          setOpen && setOpen(false)
      }
    } 
  }
    catch (error) {
      console.log(error, "error while creating/cancelling the appointment");
    }
    setIsLoading(false);
  }
  
// eslint-disable-next-line 
  const [buttonLabel, setButtonLabel] = useState('')

  // eslint-disable-next-line 
  useEffect(() => {
    switch (type) {
        case 'delete':
            setButtonLabel('Cancel Appointment')
            break;
        case "create":
            setButtonLabel('Create Appointment')
            break;
        case "schedule":
            setButtonLabel('Schedule Appointment')
            break;
        default:
            break;
      }
  }, [type])

  return (
    // shad-cn forms, can refer to its docs for the following code
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        {type === 'create' && <section className="mb-12 space-y-4">
          <h1 className="header">New Appointment</h1>
          <p className="text-dark-700">Schedule your first Appointment.</p>
        </section>}

        {type !== "delete" && (
          <>
            {/* PRIMARY CARE PHYSICIAN */}
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a Doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Reason for appointment"
                placeholder="ex: Regular Checkup, Follow-Up"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Additional Notes"
                placeholder="ex: Any specific symptoms, allergies, or concerns"
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected Appointment Date"
              showTimeSelect
              dateFormat="dd/mm/yyyy - h:mm aa"
            />
          </>
        )}

        {type === 'delete' && (
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="cancellationReason"
              label="Reason for Cancellation"
              placeholder="Enter Reason"
            />
        )}

        <SubmitButton 
            isLoading={isLoading}
            className={`w-full ${type==='delete' ? 'shad-danger-btn' : 'shad-primary-btn'}`}
            >
            {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};


export default AppointmentForm
