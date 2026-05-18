'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext({
    theme: 'dark',
    toggleTheme: () => { },
    setTheme: () => { },
});

const THEMES = ['dark', 'light', 'hacker', 'creative'];

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('portfolio-theme');
        if (THEMES.includes(stored)) {
            setTheme(stored);
        } else if (typeof window !== 'undefined') {
            const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
            setTheme(prefersLight ? 'light' : 'dark');
        }
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const root = document.documentElement;
        root.setAttribute('data-theme', theme);
        document.body?.setAttribute('data-theme', theme);
        localStorage.setItem('portfolio-theme', theme);

        // Set font family for hacker theme
        if (theme === 'hacker') {
            document.body.style.fontFamily = "'Fira Code', 'JetBrains Mono', 'Source Code Pro', 'Cascadia Code', 'Consolas', monospace";
        } else {
            document.body.style.fontFamily = '';
        }
    }, [theme, mounted]);

    const toggleTheme = () => {
        setTheme(prev => {
            const idx = THEMES.indexOf(prev);
            return THEMES[(idx + 1) % THEMES.length];
        });
    };

    // Prevent flash of wrong theme
    if (!mounted) {
        return <div style={{ visibility: 'hidden' }}>{children}</div>;
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export default ThemeContext;
