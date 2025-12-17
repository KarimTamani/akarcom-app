import { redirect } from "next/navigation";

// app/[locale]/dashboard/page.tsx
export default function DashboardPage() {
    return redirect("/dashboard/statistics") 
}