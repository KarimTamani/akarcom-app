"use client"
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { User, UserType } from "@/lib/user";
import api from "@/services/api";
import axios from "axios";
import { toast } from "sonner";
import { UsersPrimaryButtons } from "./components/user-primary-buttons";
import UsersProvider from "./context/users-context";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersTable } from "./components/users-table";
import { usersColumns } from "./components/users-columns";
import { PaginationState } from "@tanstack/react-table";

const PAGE_SIZE = 10;

const UsersPage: React.FC = ({ }) => {
    const t = useTranslations("users");

    const [loading, setLoading] = useState<boolean>(true);
    const [users, setUsers] = useState<User[]>([]);
    const [pageCount, setPageCount] = useState<number | undefined>(undefined);
    const tableRef = useRef<{ reset: () => void }>(null)

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0, // starts at 0
        pageSize: PAGE_SIZE,
    });

    const [filters, setFilters] = useState({
        query: undefined,
        user_type: [] as UserType[]
    })
    const fetchUsers = async (offset: number, limit: number) => {

        setLoading(true);
        try {
            const response = await api.get(`/users`, {
                params: {
                    query: filters.query,
                    offset,
                    limit,
                    user_type: filters.user_type.length > 0 ? JSON.stringify(filters.user_type) : []
                }
            });
            const { data } = response.data;
            setPageCount(Math.ceil(response.data.count / limit))
            setUsers(data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast(t("errors.failed_to_load"), {
                    description: t("errors.failed_to_load_description"),
                    className: "!text-destructive",
                    descriptionClassName: "!text-destructive"
                })
            }
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        const offset = pagination.pageIndex * pagination.pageSize;
        const limit = pagination.pageSize;
        fetchUsers(offset, limit);
    }, [pagination]);

    const onFiltersChange = async (filters: any[]) => {

        const params = {
            query: undefined,
            user_type: []
        };

        for (const filter of filters) {
            if (filter.id == "full_name") {
                params.query = filter.value
            }
            if (filter.id == "user_type") {
                params.user_type = filter.value;
            }
        }
        setFilters(params);
        setPagination({
            pageIndex: 0,
            pageSize: PAGE_SIZE
        })
    }

    const columns = usersColumns();
    const onRefresh = () => {
        tableRef.current?.reset();
    }
    return (
        <UsersProvider onRefresh={onRefresh}>
            <div className=" h-full p-4" >
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>{t("user_list")} </h2>
                        <p className='text-muted-foreground'>
                            {t("user_list_header")}
                        </p>
                    </div>
                    <UsersPrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12 overflow-auto'>
                    <UsersTable
                        data={users}
                        columns={columns}
                        pagination={pagination}
                        setPagination={setPagination}
                        pageCount={pageCount}
                        onFiltersChange={onFiltersChange}
                        isLoading={loading}
                        ref={tableRef}
                    />

                </div>
            </div >
            <UsersDialogs />
        </UsersProvider>
    )
}


export default UsersPage; 