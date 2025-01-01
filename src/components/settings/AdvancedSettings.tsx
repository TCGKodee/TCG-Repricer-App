import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsSelect } from './SettingsSelect';
import { SettingsInput } from './SettingsInput';

export function AdvancedSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Bulk Operations">
        <SettingsSelect
          label="Default Bulk Action"
          options={[
            { value: 'update', label: 'Update Prices' },
            { value: 'sync', label: 'Sync Inventory' },
            { value: 'export', label: 'Export Data' },
          ]}
          defaultValue="update"
          description="Default action for bulk operations"
        />
      </SettingsSection>

      <SettingsSection title="System">
        <SettingsInput
          label="Cache Duration (minutes)"
          type="number"
          defaultValue={15}
          description="How long to cache market data"
        />
      </SettingsSection>
    </div>
  );
}