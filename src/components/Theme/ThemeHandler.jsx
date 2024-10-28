import useTheme from "@/store/useTheme";

export default function ThemeHandler() {
  const root = document.documentElement;

  const { theme } = useTheme();
  const updateTheme = (theme) => {
    root.classList.remove('light', 'dark');
    root.classList.add(
      theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme
    );
  };

  // Listen for changes in the system theme and update if needed
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (theme === 'system') {
      updateTheme(e.matches ? 'dark' : 'light');
    }
  });

  updateTheme(theme)
}