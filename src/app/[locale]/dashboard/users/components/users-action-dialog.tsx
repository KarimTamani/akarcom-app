'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { SelectDropdown } from '@/components/select-dropdown'
import { User, UserType } from '@/lib/user'
import { showSubmittedData } from '@/utils/show-submitted-data'
import { useUserTypes } from '../data/users-data'
import useCreateUserFormSchema from '../data/use-create-user-form-schema'
import { useTranslations } from 'next-intl'
import { DatePicker } from '@/components/date-picker'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useUsers } from '../context/users-context'
import api from '@/services/api'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'sonner'


interface Props {
  currentRow?: User
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UsersActionDialog({ currentRow, open, onOpenChange }: Props) {

  const userTypes = useUserTypes();
  const { onRefresh } = useUsers();
  const createUserSchema = useCreateUserFormSchema();
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      full_name: "",
      email: "",
      birthday: undefined,
      gender: true,
      phone_number: "",
      user_type: UserType.individual,
      password: "",
      confirm_password: ""
    },
  });

  const onSubmit = async (values: z.infer<typeof createUserSchema>) => {
    setLoading(true)
    try {
      const response = await api.post('/users', values);
      toast(t("users.success.user_created.title"), {
        description: t("users.success.user_created.description"),
        className: "!text-primary",
        descriptionClassName: "!text-primary/80"
      });
      onRefresh && onRefresh();
      form.reset();
      onOpenChange(false);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;

        if (response?.status == 401) {
          const errors = response.data.errors;
          if (errors.code == "P2002") {
            if (errors.meta.target.includes("email")) {
              toast(t("users.errors.duplicate_email.title"), {
                description: t("users.errors.duplicate_email.description"),
                className: "!text-destructive",
                descriptionClassName: "!text-destructive"
              })
            }
            if (errors.meta.target.includes("phone_number")) {
              toast(t("users.errors.duplicate_phone_number.title"), {
                description: t("users.errors.duplicate_phone_number.description"),
                className: "!text-destructive",
                descriptionClassName: "!text-destructive"
              })
            }
            return;
          }
        }
      }
      toast(t("users.errors.failed_to_create_user.title"), {
        description: t("users.errors.failed_to_create_user.description"),
        className: "!text-destructive",
        descriptionClassName: "!text-destructive"
      })
    } finally {
      setLoading(false);
    }

  }

  const isPasswordTouched = !!form.formState.dirtyFields.password

  const t = useTranslations();

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset()
        onOpenChange(state)
      }}

    >
      <DialogContent className='sm:max-w-lg'>
        <DialogHeader className='text-left'>
          <DialogTitle>{t("users.dialogs.add_new_user")} </DialogTitle>
          <DialogDescription>
            {t("users.dialogs.add_new_user_header")}
          </DialogDescription>
        </DialogHeader>
        <div className='-mr-4  h-fit   w-full overflow-y-auto py-1 pr-4'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 p-0.5'
            >
              <FormField
                control={form.control}
                name='full_name'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t("account.form.fullname")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("account.form.fullname_placeholder")}
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t("account.form.email")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("account.form.email_placeholder")}
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone_number'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t("account.form.phone_number")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("account.form.phone_number_placeholder")}
                        className='col-span-4'
                        type='phone'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name='birthday'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1 '>
                    <FormLabel className='col-span-2 text-right '>
                      {t("account.form.birthday")}
                    </FormLabel>
                    <FormControl >
                      <div className='col-span-4 '>

                        <DatePicker
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='gender'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1 '>
                    <FormLabel className='col-span-2 text-right'>
                      {t("account.form.gender")}
                    </FormLabel>
                    <FormControl >
                      <div className='col-span-4 '>
                        <Select
                          onValueChange={(value: string) => field.onChange(value == "true")}
                          value={String(field.value)}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger className="!w-full">
                            <SelectValue placeholder={t("account.form.gender_placeholder")} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value={"true"}>{t("account.form.male")}</SelectItem>
                              <SelectItem value={"false"}>{t("account.form.female")}</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='user_type'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t("users.columns.user_type")}
                    </FormLabel>
                    <div className='col-span-4 '>
                      <SelectDropdown
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Select a role'
                        className='col-span-4 w-full'
                        items={userTypes.map(({ label, value }) => ({
                          label,
                          value,
                        }))}
                      />
                    </div>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t("auth.password")}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='e.g., S3cur3P@ssw0rd'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='confirm_password'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      {t("auth.confirm_password")}
                    </FormLabel>
                    <FormControl>
                      <PasswordInput
                        disabled={!isPasswordTouched}
                        placeholder='e.g., S3cur3P@ssw0rd'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit' form='user-form' disabled={loading}>
            {t("users.dialogs.save_changes")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



/*


    <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='John'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Doe'
                        className='col-span-4'
                        autoComplete='off'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john_doe'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='john.doe@gmail.com'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder='+123456789'
                        className='col-span-4'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='grid grid-cols-6 items-center space-y-0 gap-x-4 gap-y-1'>
                    <FormLabel className='col-span-2 text-right'>
                      Role
                    </FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a role'
                      className='col-span-4'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4 col-start-3' />
                  </FormItem>
                )}
              />
            


*/

