import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsSelect } from './SettingsSelect';

export function AccessSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="User Roles">
        <SettingsSelect
          label="Default Role"
          options={[
            { value: 'viewer', label: 'Viewer' },
            { value: 'editor', label: 'Editor' },
            { value: 'admin', label: 'Administrator' },
          ]}
          defaultValue="viewer"
          description="Default role for new team members"
        />
      </SettingsSection>
    </div>
  );
}