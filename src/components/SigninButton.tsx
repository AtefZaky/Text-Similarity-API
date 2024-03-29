'use client'
import { FC, useState } from 'react'
import Button from '@/ui/Button'
import { signIn } from 'next-auth/react'
import { toast } from '@/ui/Toast'

interface SigninButtonProps {}

const SigninButton: FC<SigninButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const signInWithGoogle = async () => {
    setIsLoading(true)
    try {
      await signIn('google')
    } catch (error) {
      toast({
        title: 'Error signing in',
        message: 'Please try again later',
        type: 'error',
      })
    }
  }

  return (
    <Button onClick={signInWithGoogle} isLoading = {isLoading}>
      Sign in
    </Button>
  )
}

export default SigninButton