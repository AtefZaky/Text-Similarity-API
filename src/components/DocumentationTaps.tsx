'use client'
import { FC } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/ui/Tabs'
import Code from '@/components/Code'
import SimpleBar from 'simplebar-react';
import { nodejs, python } from '@/helpers/documentation-code'
import 'simplebar-react/dist/simplebar.min.css'

const DocumentationTaps: FC = () => {
  return (
    <Tabs defaultValue='nodejs' className='max-w-2xl w-full'>
      <TabsList>
        <TabsTrigger value='nodejs'>NodeJS</TabsTrigger>
        <TabsTrigger value='python'>Python</TabsTrigger>
      </TabsList>
      <TabsContent value='nodejs'>
        <SimpleBar>
          <Code animated language='javascript' code={nodejs} show/>
        </SimpleBar>
      </TabsContent>
      <TabsContent value='python'>
        <SimpleBar>
          <Code animated language='python' code={python} show/>
        </SimpleBar>
      </TabsContent>
    </Tabs>
  )
}

export default DocumentationTaps