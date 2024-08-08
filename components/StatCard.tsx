import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

type StatCardProps = {
    type: "appointments" | "pending" | "cancelled"
    count: number
    label: string
    icon: string
}

const StatCard = ({type, count = 0, label, icon}: StatCardProps) => {
  return (
    <div className={clsx('flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg',{
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled',
    })}>
        <div className='flex items-center gap-4'>
            <Image 
                src={icon}
                alt='Icon'
                height={32}
                width={32}
            />
            <h2 className='text-32-bold text-white'>{count}</h2>
        </div>
        <p className='text-14-regular'>Total number of {label} appointments.</p>
    </div>
  )
}

export default StatCard