import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsInput } from './SettingsInput';
import { SettingsSelect } from './SettingsSelect';

export function NotificationSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Price Alerts">
        <SettingsInput
          label="Price Change Threshold (%)"
          type="number"
          defaultValue={10}
          description="Notify when price changes by this percentage"
        />
      </SettingsSection>

      <SettingsSection title="Notification Methods">
        <SettingsSelect
          label="Preferred Method"
          options={[
            { value: 'email', label: 'Email' },
            { value: 'push', label: 'Push Notifications' },
            { value: 'both', label: 'Both' },
          ]}
          defaultValue="email"
          description="How you want to receive notifications"
        />
      </SettingsSection>
    </div>
  );
}