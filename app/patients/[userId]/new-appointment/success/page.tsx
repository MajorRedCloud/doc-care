import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAppointment } from '@/lib/actions/appointment.actions'
import { Doctors } from '@/constants'
import { formatDateTime } from '@/lib/utils'


const page = async ({params:{userId}, searchParams}: SearchParamProps) => {

  const appointmentId = (searchParams?.appointmentId as string)
  const appointment = await getAppointment(appointmentId)
  
  const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)
  
  return (
    <section className='h-screen flex max-h-screen px-[5%]'>
      <div className='m-auto flex flex-1 flex-col items-center justify-between gap-10 py-10'>
        <Link href={'/'}>
          <Image 
            src={'/assets/icons/logo-full.svg'}
            alt='logo'
            width={500}
            height={500}
            className='h-10 cursor-pointer w-fit'
          />
        </Link>

        <section className='flex flex-col items-center'>
          <Image 
            src={'/assets/gifs/success.gif'}
            alt='success'
            width={500}
            height={500}
            className='h-24 w-fit'
          />
        <h2 className='text-32-bold md:text-36-bold mb-6 max-w-[600px] text-center'>
        Your <span className='text-green-500'>appointment request</span> has been successfully submitted!
        </h2> 
        <p>We will be in touch shortly to confirm.</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details: </p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image!}
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p> {formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>
      </div>
    </section>
  )
}

export default page