'use client';
import { ThemeProvider as NextThemeProvider, useTheme } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

function SyncDarkClass() {
    const { resolvedTheme } = useTheme();
    useEffect(() => {
        const root = document.documentElement;
        if (resolvedTheme !== 'dark') root.classList.remove('dark');
        else root.classList.add('dark');
    }, [resolvedTheme]);
    return null;
}
export function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="theme"
            disableTransitionOnChange
        >

            {children}
        </NextThemeProvider>
    );
}



