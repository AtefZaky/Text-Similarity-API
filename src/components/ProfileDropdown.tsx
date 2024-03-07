'use client'

import { FC } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/ui/DropdownMenu'
import Button, { ButtonVariants } from '@/ui/Button'
import { Session } from 'next-auth'
import Image from 'next/image'
import Icons from '@/components/Icons'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { toast } from '@/ui/Toast'
import SigninButton from '@/components/SigninButton'
import { useRouter } from 'next/navigation'

interface ProfileDropdownProps {
  session: Session | null
}

const ProfileDropdown: FC<ProfileDropdownProps> = ({session}) => {
  const router = useRouter()

  const signUserOut = async () => {
    try {
      await signOut()
    } catch (error) {
      toast({
        title: 'Error signing out',
        message: 'Please try again later',
        type: 'error',
      })
    }
  }
  return (
    <>
      {session ? (
        <>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
              <Image src={session?.user.image!} alt='user-image' width={25} height={25} className='md:h-8 md:w-8'/>
              <Icons.ChevronDown width={20} height={20} className=' pl-1'/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' forceMount>
            <DropdownMenuItem disabled>
              {session.user.email}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push('dashboard')}>
              Dashboard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={signUserOut}>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
      ) :(
        <>
          <SigninButton />
        </>
      )}
      
    </>
  )
}

export default ProfileDropdown