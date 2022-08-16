import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
    const { systemTheme, setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const handleToggleTheme = (sliderValue: HTMLInputElement) => {
        const isChecked = sliderValue.checked;
        setTheme(isChecked ? "dark" : "light");
    };

    useEffect(() => {
        setMounted(true);
    }, [systemTheme]);

    if (!mounted) {
        return null;
    }

    return (
        <section className="flex items-center justify-between pt-4">
            <label htmlFor="darkMode" className="label">
                Dark Mode
            </label>
            <input
                onChange={(e) => handleToggleTheme(e.target)}
                id="darkMode"
                type="checkbox"
                className="toggle"
                checked={theme === "dark"}
            />
        </section>
    );
};

export default ThemeSwitcher;
