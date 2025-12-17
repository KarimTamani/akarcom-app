import { Property } from "@/lib/property"
import { useProperty } from "../context/property-context"
import { PropertyDeleteDialog } from "./property-delete-dialog"



export function PropertyDialogs() {
    const { open, setOpen, currentRow, setCurrentRow } = useProperty()
    return (
        <>
            {currentRow && (
                <PropertyDeleteDialog
                    key={`user-delete-${currentRow?.id}`}
                    open={open === 'delete'}
                    onOpenChange={() => {
                        setOpen('delete')
                        setTimeout(() => {
                            setCurrentRow(null)
                        }, 500)
                    }}
                    currentRow={currentRow as Property}
                />
            )}
        </>
    )
}
