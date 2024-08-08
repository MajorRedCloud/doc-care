import React from 'react'
import { Button } from '../ui/button'
import Loader from '../Loader'

declare type ButtonProps = {
    isLoading: boolean
    className?: string
    children: React.ReactNode
}

const SubmitButton = ({isLoading, className, children,} : ButtonProps) => {

  return (
    <Button 
        type="submit" 
        disabled={isLoading} 
        className={className ?? 'shad-primary-btn w-full'}
    >
        {
            isLoading ? (<Loader />)
                      : children
        }
    </Button>
  )
}

export default SubmitButton