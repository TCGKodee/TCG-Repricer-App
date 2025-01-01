import React from 'react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}