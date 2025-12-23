import React, { useCallback, useState } from 'react'

import { User } from '@/lib/user'
import useDialogState from '@/hooks/use-dialog-state'
import { Property } from '@/lib/property'
import { PaginationState } from '@tanstack/react-table'
import useGetSubscriptionPlans from '../componenets/subscription-plan-table/hooks/use-get-subscription-plans'
import { SubscriptionPlan } from '@/lib/subscriptions'
import CreatePlanDialog from '../componenets/create-plan-dialog'
import EditPlanDialog from '../componenets/edit-plan-dialog'


interface SubscriptionPlanContextType {
    open: boolean
    setOpen: (value: boolean) => void
    currentRow: SubscriptionPlan | null
    setCurrentRow: React.Dispatch<React.SetStateAction<SubscriptionPlan | null>>,

    plans: SubscriptionPlan[],

    updatePlan: (id: number, plan: SubscriptionPlan) => void;
    isLoading: boolean;
    fetch : () => void ; 
}

const SubscriptionPlanContext = React.createContext<SubscriptionPlanContextType | null>(null)

interface Props {
    children: React.ReactNode;

}



export default function SubscriptionPlansProvider({ children }: Props) {
    const [open, setOpen] = useState<boolean>(false)
    const [currentRow, setCurrentRow] = useState<SubscriptionPlan | null>(null)

    const { plans, isLoading, setPlans , fetch} = useGetSubscriptionPlans();

    const updatePlan = useCallback((id: number, plan: SubscriptionPlan) => {
        setPlans((prev) => prev.map((prevPlan: SubscriptionPlan) => (prevPlan.id != id ? prevPlan : { ...prevPlan, ...plan })) as SubscriptionPlan[])
    }, [plans])



    return (
        <SubscriptionPlanContext value={{ open, setOpen, currentRow, setCurrentRow, plans, updatePlan, isLoading , fetch}}>
            {children}
            {
                open &&
                <EditPlanDialog
                    open={open}
                    setOpen={setOpen}
                    defaultValue={currentRow as SubscriptionPlan | undefined }
                />
            }
        </SubscriptionPlanContext>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSubscriptionPlan = () => {
    const subscripitonPlanContext = React.useContext(SubscriptionPlanContext)

    if (!subscripitonPlanContext) {
        throw new Error('useUsers has to be used within <UsersContext>')
    }

    return subscripitonPlanContext
}
