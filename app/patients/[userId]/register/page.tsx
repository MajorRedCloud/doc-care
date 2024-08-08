import React from 'react'
import Image from 'next/image'

import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.action'


const Register = async ({params:{userId}}: SearchParamProps) => {

    const user = await getUser(userId)

  return (
    <div className="flex h-screen max-h-screen">
    <section className="remove-scrollbar container">
      <div className="mx-auto flex flex-col py-10 max-w-[860px] flex-1">
        <Image 
          src={"/assets/icons/logo-full.svg"}
          alt="Logo"
          width={1000}
          height={1000}
          className="mb-12 h-10 w-fit"
        />

        <RegisterForm user={user}/>

        <div className="mt-20 text-14-regular flex justify-between">
          <p className=" text-dark-600 xl:text-left">
          © DocCare 2024
          </p>
        </div>
      </div>
    </section>

    
    <Image
      src={'/assets/images/register-img.png'}
      alt="register Image"
      width={1000}
      height={1000}
      className="hidden h-full object-cover md:block max-w-[390px]"
      />
  </div>
  )
}

export default Register