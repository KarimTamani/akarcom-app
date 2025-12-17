"use client"

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher: React.FC = ({ }) => {


    const [mounted, setMounted] = useState(false)

    const { resolvedTheme, setTheme } = useTheme();
    const toggleTheme = () => {
        setTheme(resolvedTheme == "dark" ? "light" : "dark")
    }

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        // Prevent mismatch by not rendering icons until we know the actual theme
        return (
            <button className="p-2 rounded-md">
                <Sun className="size-4 opacity-0" /> {/* invisible placeholder */}
            </button>
        )
    }


    return (

        <Button size="icon" variant="outline" onClick={toggleTheme}>
            {
                resolvedTheme != "dark" ?
                    <Moon className="size-4" /> :
                    <Sun className="size-4" />
            }
        </Button>
    )

}


export default ThemeSwitcher; 