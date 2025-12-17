import React, { useCallback, useState } from 'react'

import { User } from '@/lib/user'
import useDialogState from '@/hooks/use-dialog-state'
import { Property } from '@/lib/property'
import { PaginationState } from '@tanstack/react-table'
import useFetchProperties, { PropertyFetchFilters } from '../hooks/use-fetch-properties'


type PropertyDialogType = 'approuve' | 'reject' | 'edit' | 'delete'

interface UsersContextType {
  open: PropertyDialogType | null
  setOpen: (str: PropertyDialogType | null) => void
  currentRow: Property | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Property | null>>,
  refresh: () => void;
  properties: Property[],
  setFilters: (filters: PropertyFilters) => void;
  updateProperty: (id: number, property: Property) => void;
  pageCount : number | undefined ; 
  isLoading : boolean; 
  favorite?: boolean 
}

const PropertyContext = React.createContext<UsersContextType | null>(null)

interface Props {
  children: React.ReactNode;
  favorite?: boolean 
}

const PAGE_SIZE = 10
export const defaultPagination = {
  pageIndex: 0, // starts at 0
  pageSize: PAGE_SIZE,
}
export interface PropertyFilters {
  pagination: PaginationState , 
  filters?: PropertyFetchFilters
}

export default function PropertiesProvider({ children , favorite = false }: Props) {
  const [open, setOpen] = useDialogState<PropertyDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Property | null>(null)
  const [filters, setFilters] = useState<PropertyFilters | undefined>();

  const { properties, setProperties , pageCount , isLoading } = useFetchProperties(filters?.pagination , filters?.filters , favorite)

  const updateProperty = useCallback((id: number, property: Property) => {
    setProperties((prev) => prev.map((prevProperty: Property) => (prevProperty.id != id ? prevProperty : { ...prevProperty, ...property })) as Property[])
  }, [properties])


  const refresh = useCallback(() => {
    setFilters({
      pagination: {...defaultPagination}
    })
  }, [])
  return (
    <PropertyContext value={{ open, setOpen, currentRow, setCurrentRow, properties, setFilters, updateProperty, refresh , pageCount , isLoading , favorite}}>
      {children}
    </PropertyContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProperty = () => {
  const propertyContext = React.useContext(PropertyContext)

  if (!propertyContext) {
    throw new Error('useUsers has to be used within <UsersContext>')
  }

  return propertyContext
}
