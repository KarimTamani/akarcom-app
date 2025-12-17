


import { UserType } from '@/lib/user';
import { BanknoteIcon,  BriefcaseBusinessIcon, BuildingIcon, GroupIcon, HammerIcon, ShieldIcon, UserIcon  } from 'lucide-react'
import { useTranslations } from 'next-intl';

const useUserTypes = () => {
  const t = useTranslations("users") ; 

const userTypes = [
  {
    label: t("user_types.admin"),
    value: UserType.admin,
    icon: ShieldIcon,
  },
  {
    label: t("user_types.employee"),
    value: UserType.employee,
    icon: BriefcaseBusinessIcon,
  },
  {
    label: t("user_types.developer"),
    value: UserType.developer,
    icon: HammerIcon,
  },
  {
    label: t("user_types.agency"),
    value: UserType.agency,
    icon: BuildingIcon,
  },
  {
    label: t("user_types.individual"),
    value: UserType.individual,
    icon: UserIcon,
  },
] as const;
  return userTypes;
}


export {
  useUserTypes
}