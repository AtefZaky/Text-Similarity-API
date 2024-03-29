import { FC } from 'react'

import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import { notFound } from 'next/navigation'
import { db } from '@/libs/db'
import ApiDashboard from '@/components/ApiDashboard'
import RequestApiKey from '@/components/RequestApiKey'

export const metadata: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Free & open-source text similarity API',
}

const page: FC = async ({}) => {
  const user = await getServerSession(authOptions);
  if(!user) return notFound()
  const apiKey = await db.apiKey.findFirst({
    where: {userId: user.user.id, enabled: true},
  })
  return (
    <div className='max-w-7xl mx-auto mt-16'>
      {apiKey ? <ApiDashboard /> : <RequestApiKey />} 
    </div>
  )
}

export default page