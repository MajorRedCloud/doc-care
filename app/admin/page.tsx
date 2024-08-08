import StatCard from '@/components/StatCard'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getLatestAppointments } from '@/lib/actions/appointment.actions'
import {DataTable} from '@/components/table/DataTable'
import {columns, Payment} from '@/components/table/columns'


const Admin = async () => {

    const appointments = await getLatestAppointments()

  return (
    <div className='mx-auto flex flex-col max-w-7xl space-y-14'>
        <header className='sticky top-3 z-20 mx-10 flex items-center justify-between rounded-2xl bg-dark-200 px-[5%] py-5 shadow-lg xl:px-12'>
            <Link href={'/'} className='cursor-pointer'>
                <Image 
                    src='/assets/icons/logo-full.svg' 
                    alt='Logo' 
                    height={32}
                    width={162} 
                    className='h-8 w-fit'/>
            </Link>

            <p className='text-16-semibold'>Admin Dashboard</p>
        </header>

        <main className='flex flex-col items-center space-y-6 px-[5%] pb-12 xl:space-y-12 xl:px-12'>
            <section className='w-full space-y-4'>
                <h1 className='header'>Welcome</h1>
                <p className='text-dark-700'>Start the day with managing new appointments.</p>
            </section>
            <section className='flex w-full flex-col justify-between gap-5 sm:flex-row xl:gap-10;'>
                {/* three cards for scheduled, pending and cancelled */}
                <StatCard 
                    type="appointments"
                    count={appointments.scheduledCounts}
                    label="Scheduled"
                    icon="/assets/icons/appointments.svg"
                />
                <StatCard 
                    type="pending"
                    count={appointments.pendingCounts}
                    label="Pending"
                    icon="/assets/icons/pending.svg"
                />
                <StatCard 
                    type="cancelled"
                    count={appointments.cancelledCounts}
                    label="Cancelled"
                    icon="/assets/icons/cancelled.svg"
                />
            </section>

            <DataTable data={appointments.documents} columns={columns}/>
        </main>

    </div>
  )
}

export default Admin