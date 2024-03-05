import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { ButtonVariants } from '@/ui/Button';
import SigninButton from '@/components/SigninButton';
import SignOutButton from '@/components/SignOutButton';
import ThemeToggle from './ThemeToggle';
import { authOptions } from '@/libs/auth';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='fixed backdrop-blur-sm bg-white/75 dark:bg-slate-900 z-50 top-0 left-0 right-0 h-20 border-b border-slate-300 dark:border-slate-700 shadow-sm flex items-center justify-between'>
      <div className=' container max-w-7xl mx-auto w-full flex justify-between items-center'>
        <Link href='/' className={ButtonVariants({variant: 'link'})}>
          Text Similarity
        </Link>
        <div className='md:hidden'>
          <ThemeToggle />
        </div>
        <div className='hidden md:flex gap-4'>
          <ThemeToggle />
          <Link href='/documentation' className={ButtonVariants({ variant: 'ghost' })}>
            Documentation
          </Link>
          {session ? (
            <>
              <Link 
                className={ButtonVariants({ variant: 'ghost'})}
                href='/dashboard'>
                  Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : <SigninButton />} 
        </div>
      </div>
    </div>
  )
}

export default Navbar