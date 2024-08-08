"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, 
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import { decryptKey, encryptKey } from "@/lib/utils";
  
  
export function PasskeyModal() {

    const [open, setOpen] = useState(true)
    const [passkey, setPasskey] = useState('')
    const [error, setError] = useState('')
    const path = usePathname()

    const router = useRouter()
    const closeModal = () => {
        setOpen(false)
        router.push("/")
    }

    const encryptedKey = typeof window !== 'undefined' ? localStorage.getItem('accessKey') : null

    useEffect(() => {
      const accessKey = encryptedKey && decryptKey(encryptedKey)

      if(path){
          if(accessKey === process.env.NEXT_PUBLIC_PASSKEY){
            setOpen(false)
            router.push("/admin")
          } else {
              setOpen(true)  
        }
      }
    }, [encryptedKey])

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        
        if(passkey === process.env.NEXT_PUBLIC_PASSKEY){
          const encryptedKey = encryptKey(passkey)

          localStorage.setItem('accessKey', encryptedKey)

          setOpen(false)
        } else {
            setError("Invalid Passkey")
        }
    }

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="space-y-5 bg-dark-400 border-dark-500 outline-none">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex justify-between">
                Access Verification
                <Image 
                    src={'/assets/icons/close.svg'}
                    alt="Close Icon"
                    width={20}
                    height={20}
                    onClick={() => closeModal()}
                    className="cursor-pointer"
                />
            </AlertDialogTitle>
            <AlertDialogDescription>
              To access the admin panel, please enter the passkey....
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div >
          <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
            <InputOTPGroup className="w-full flex justify-between">
                <InputOTPSlot className="shad-otp-slot" index={0} />
                <InputOTPSlot className="shad-otp-slot" index={1} />
                <InputOTPSlot className="shad-otp-slot" index={2} />
                <InputOTPSlot className="shad-otp-slot" index={3} />
                <InputOTPSlot className="shad-otp-slot" index={4} />
                <InputOTPSlot className="shad-otp-slot" index={5} /> 
            </InputOTPGroup>
            </InputOTP>

            {error && <p className="flex justify-center shad-error text-14-regular mt-4">
                {error}</p>}
          </div>

          <AlertDialogFooter>
            <AlertDialogAction 
                onClick={(e) => validatePasskey(e)}
                className="shad-primary-btn w-full"
            >
                Enter Admin Passkey
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  
export default PasskeyModal;