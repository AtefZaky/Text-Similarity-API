import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { ButtonVariants } from '@/ui/Button';
import SigninButton from '@/components/SigninButton';
import SignOutButton from '@/components/SignOutButton';
import ThemeToggle from './ThemeToggle';
import { authOptions } from '@/libs/auth';
import ProfileDropdown from '@/components/ProfileDropdown';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className=' container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link href='/' className={ButtonVariants({variant: 'link'})}>
          Text Similarity
        </Link>
        <div className='md:hidden flex items-center gap-2'>
          <ThemeToggle />
            <Link href='/documentation' className={ButtonVariants({ variant: 'ghost' })}>
              Docs
            </Link>
          <ProfileDropdown session={session} />
        </div>
        <div className='hidden md:flex gap-4'>
          <ThemeToggle />
          {session ? (
            <>
              <Link href='/documentation' className={ButtonVariants({ variant: 'ghost' })}>
                Documentation
              </Link>
              <ProfileDropdown session={session}/>
            </>
          ) : (
            <>
              <Link href='/documentation' className={ButtonVariants({ variant: 'ghost' })}>
                Documentation
              </Link>
              <SigninButton />
            </>
          )} 
        </div>
      </div>
    </div>
  )
}

export default Navbar