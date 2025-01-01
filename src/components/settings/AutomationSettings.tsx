import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsInput } from './SettingsInput';
import { SettingsSelect } from './SettingsSelect';

export function AutomationSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Update Frequency">
        <SettingsSelect
          label="Price Check Frequency"
          options={[
            { value: '5', label: 'Every 5 minutes' },
            { value: '15', label: 'Every 15 minutes' },
            { value: '30', label: 'Every 30 minutes' },
            { value: '60', label: 'Every hour' },
          ]}
          defaultValue="15"
          description="How often to check for price changes"
        />
      </SettingsSection>

      <SettingsSection title="Scheduling">
        <SettingsInput
          label="Start Time"
          type="time"
          defaultValue="09:00"
          description="Daily start time for automated repricing"
        />
        <SettingsInput
          label="End Time"
          type="time"
          defaultValue="21:00"
          description="Daily end time for automated repricing"
        />
      </SettingsSection>
    </div>
  );
}