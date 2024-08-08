import Image from "next/image";
import { Button } from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import AppointmentForm from "@/components/forms/AppointmentForm";
import { getPatient } from "@/lib/actions/patient.action";

export default async function NewAppointment({params : {userId}} : SearchParamProps) {
  
  const patient = await getPatient(userId)

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container  my-auto">
        <div className="mx-auto flex flex-col py-10 max-w-[860px] flex-1 justify-between">
          <Image 
            src={"/assets/icons/logo-full.svg"}
            alt="Logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <AppointmentForm 
            type="create"
            userId={userId}
            patientId = {patient.$id}
          />

          <div className="mt-20 text-14-regular flex justify-between">
            <p className=" text-dark-600 xl:text-left">
            © DocCare 2024
            </p>
          </div>
        </div>

          
      </section>
      <Image
        src={'/assets/images/appointment-img.png'}
        alt="appointment Image"
        width={1000}
        height={1000}
        className="side-img max-w-[390px] bg-bottom"
        />
    </div>
  );
}
