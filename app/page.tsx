import Image from "next/image";
import { Button } from "@/components/ui/button";
import PatientForm from "@/components/forms/PatientForm";
import Link from "next/link";
import PasskeyModal from "@/components/PasskeyModal";

const home = ({searchParams} : SearchParamProps) => {

  const isAdmin = searchParams?.admin == "true"

  return (
    <div className="flex h-screen max-h-screen">
      {isAdmin && <PasskeyModal />}

      <section className="remove-scrollbar container  my-auto">
        <div className="mx-auto flex  flex-col py-10 max-w-[496px]">
          <Image 
            src={"/assets/icons/logo-full.svg"}
            alt="Logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />

          <PatientForm />

          <div className="mt-20 text-14-regular flex justify-between">
            <p className=" text-dark-600 xl:text-left">
            © DocCare 2024
            </p>

            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>

          
      </section>
      <Image
        src={'/assets/images/onboarding-img.png'}
        alt="Onboarding Image"
        width={1000}
        height={1000}
        className="hidden h-full object-cover md:block max-w-[50%]"
        />
    </div>
  );
}

export default home;
