'use client'

import { FC, useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/ui/DropdownMenu'
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import Button from '@/ui/Button'
import { Loader2 } from 'lucide-react'
import { toast } from '@/ui/Toast'
import { createApiKey } from '@/helpers/createApiKey'
import { useRouter } from 'next/navigation'
import { revokeApiKey } from '@/helpers/revokeApiKey'

interface ApiKeyOptionsProps {
  apiKeyId: string,
  apiKeyT: string
}

const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({ apiKeyId, apiKeyT }) => {
  const [isCreatingNew, setIsCreatingNew] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)
  const router = useRouter()

  const createNewApiKey = async () =>{
    setIsCreatingNew(true) 

    try {
      await revokeApiKey({keyId: apiKeyId})
      await createApiKey()
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error creating API key',
        message: 'Please try again later.',
        type: 'error'
      })
    } finally {
      setIsCreatingNew(false)
    }
  }

  const revokeCurrentApiKey = async () => {
    setIsRevoking(true)

    try {
      await revokeApiKey({keyId: apiKeyId})
      router.refresh()
    } catch (error) {
      toast({
        title: 'Error revoking API key',
        message: 'Please try again later.',
        type: 'error'
      })
    } finally {
      setIsRevoking(false)
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
      disabled= {isCreatingNew || isRevoking} asChild>
        <Button variant='ghost' className='flex gap-2 items-center'>
          <p>
            {isCreatingNew 
            ? 'Creating new key'
            : isRevoking 
            ? 'Revoking key'
            : 'Options'}
          </p>
          {isCreatingNew || isRevoking ? (
            <Loader2 className='animate-spin h-4 w-4' />
          ) : null}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => {
          navigator.clipboard.writeText(apiKeyT)

          toast({
            title: 'Copied',
            message: 'API key copied to clipboard',
            type: 'success'
          })
        }}>Copy</DropdownMenuItem>
        <DropdownMenuItem onClick={createNewApiKey}>Create new key</DropdownMenuItem>
        <DropdownMenuItem onClick={revokeCurrentApiKey}>Revoke key</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions