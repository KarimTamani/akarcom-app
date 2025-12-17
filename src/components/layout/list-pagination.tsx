

import { PaginationState, RowPagination, Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import React from 'react'

interface ListPaginationProps {
    pagination: PaginationState,
    pageCount: number,
    setPagination: (pagination: PaginationState) => void
}

const ListPagination: React.FC<ListPaginationProps> = ({ pagination, pageCount, setPagination }) => {

    const t = useTranslations("users.pagination");

    const getCanPreviousPage = pagination.pageIndex + 1 != 1;
    const getCanNextPage = pagination.pageIndex + 1 != pageCount;


    return (
        <div
            className='flex items-center justify-between overflow-clip px-2'
            style={{ overflowClipMargin: 1 }}
        >
            <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
                {t("page", { page: pagination.pageIndex + 1, total: pageCount })}
            </div>
            <div className='flex items-center sm:space-x-6 lg:space-x-8'>

                <div className='flex w-[100px] items-center justify-center text-sm font-medium'>

                </div>
                <div className='flex items-center space-x-2'>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        disabled={!getCanPreviousPage}
                        onClick={() => {
                            setPagination ({
                                ...pagination , 
                                pageIndex : 0
                            })
                        }}
                    >
                        
                        <ChevronsLeft className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        disabled={!getCanPreviousPage}
                        onClick={() => {
                            setPagination ({
                                ...pagination , 
                                pageIndex : pagination.pageIndex - 1
                            })
                        }}
                    >

                        <ChevronLeft className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='h-8 w-8 p-0'
                        disabled={!getCanNextPage}
                         onClick={() => {
                            setPagination ({
                                ...pagination , 
                                pageIndex : pagination.pageIndex + 1
                            })
                        }}
                    >

                        <ChevronRight className='h-4 w-4' />
                    </Button>
                    <Button
                        variant='outline'
                        className='hidden h-8 w-8 p-0 lg:flex'
                        disabled={!getCanNextPage}
                         onClick={() => {
                            setPagination ({
                                ...pagination , 
                                pageIndex : pageCount -1 
                            })
                        }}

                    >

                        <ChevronsRight className='h-4 w-4' />
                    </Button>
                </div>
            </div>
        </div>
    )
}


export default React.memo(ListPagination)