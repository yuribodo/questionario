import React from 'react';
import { Switch } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import {  UserProfile } from '@clerk/clerk-react';

interface SettingsProps {
  darkTheme: boolean;
  toggleTheme: () => void;
  themeLabel: string;
}

const Settings: React.FC<SettingsProps> = ({ darkTheme, toggleTheme, themeLabel }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>

      {/* Toggle Theme */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-lg">{themeLabel}</p>
        <FormControlLabel
          control={<Switch checked={darkTheme} onChange={toggleTheme} />}
          label=""
        />
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
};

export default Settings;
