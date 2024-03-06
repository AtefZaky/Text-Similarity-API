'use client'

import { ThemeProvider, createTheme } from '@mui/material'
import { type GridColDef , GridColumnHeaderParams, DataGrid } from '@mui/x-data-grid'
import { ApiRequest } from '@prisma/client'
import { useTheme } from 'next-themes'
const columnsDraft: GridColDef[] = [
  {
    field: 'col1',
    headerName: 'API key uesd',
    width: 400,
    renderHeader(params) {
      return (
        <strong>{params.colDef.headerName}  🔑</strong>
      )
    },
  },
  {field: 'col2', headerName: 'Path', width: 250},
  {field: 'col3', headerName: 'Recency', width: 250},
  {field: 'col4', headerName: 'Duration', width: 150},
  {field: 'col5', headerName: 'Status', width: 150}
]

const columns = columnsDraft.map((col) => {
  if (col.field === 'col1') {
    return col
  }
  return {
    ...col,
    renderHeader(params: GridColumnHeaderParams<any, any, any>) {
      return (
        <strong>{params.colDef.headerName} </strong>
      )
    },
  }
})

import { FC } from 'react'

type ModifiedRequestType<k extends keyof ApiRequest> = Omit<ApiRequest, k> & {
  timestamp: string
}

interface TableProps {
  userRequests: ModifiedRequestType<'timestamp'>[]
}

const Table: FC<TableProps> = ({userRequests}) => {
  const {theme: applicationTheme} = useTheme()

  const theme = createTheme({
    palette: {
      mode: applicationTheme === 'light' ? 'light' : 'dark',
    }
  })

  const rows = userRequests.map((req) => ({
    id: req.id,
    col1: req.usedApiKey,
    col2: req.path,
    col3: `${req.timestamp} ago`,
    col4: `${req.duration} ms`,
    col5: req.status
  }))
  return (
    <ThemeProvider theme={theme}>
      <DataGrid
      columns={columns}
      rows = {rows}
      style={{
        backgroundColor: applicationTheme === 'light' ? '#ffffff' : '#152238',
        fontSize: '1rem'
      }}
      pageSizeOptions={[5]}
      disableRowSelectionOnClick
      autoHeight
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          }
        }
      }}/>
    </ThemeProvider>
  )
}

export default Table