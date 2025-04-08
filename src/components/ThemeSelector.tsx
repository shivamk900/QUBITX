
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Monitor, Bolt, Moon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ThemeSelector = () => {
  const { theme, setTheme } = useTheme();

  const themes = [
    { name: 'cyber', icon: <Monitor className="h-5 w-5 mr-2" />, label: 'Cyber' },
    { name: 'neon', icon: <Bolt className="h-5 w-5 mr-2" />, label: 'Neon' },
    { name: 'midnight', icon: <Moon className="h-5 w-5 mr-2" />, label: 'Midnight' },
  ];

  const activeTheme = themes.find(t => t.name === theme);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="border-neon-blue">
          {activeTheme?.icon || <Monitor className="h-5 w-5" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-cyber-dark border border-neon-blue">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.name}
            onClick={() => setTheme(t.name as any)}
            className={`flex items-center cursor-pointer ${
              theme === t.name ? 'text-neon-cyan' : 'text-white'
            } hover:text-neon-cyan`}
          >
            {t.icon}
            <span>{t.label}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;
