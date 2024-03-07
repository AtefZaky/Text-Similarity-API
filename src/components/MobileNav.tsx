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

interface MobileNavProps {
  session: Session | null
}

const MobileNav: FC<MobileNavProps> = ({session}) => {
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
          <Link href='/documentation' className={ButtonVariants({ variant: 'ghost' })}>
            Docs.
          </Link>
          <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' size='sm'>
              <Image src={session?.user.image!} alt='user-image' width={25} height={25}/>
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
          <Link href='/documentation' className={ButtonVariants({ variant: 'ghost' })}>
              Docs.
          </Link>
          <SigninButton />
        </>
      )}
      
    </>
  )
}

export default MobileNav