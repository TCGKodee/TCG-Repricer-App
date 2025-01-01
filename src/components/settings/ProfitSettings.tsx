import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsInput } from './SettingsInput';

export function ProfitSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Profit Margins">
        <SettingsInput
          label="Minimum Profit Margin (%)"
          type="number"
          defaultValue={15}
          description="Minimum profit margin percentage for all listings"
        />
        <SettingsInput
          label="Maximum Markup (%)"
          type="number"
          defaultValue={200}
          description="Maximum allowed price markup percentage"
        />
      </SettingsSection>

      <SettingsSection title="Cost Basis">
        <SettingsInput
          label="Default Acquisition Cost Markup (%)"
          type="number"
          defaultValue={30}
          description="Default markup percentage for calculating cost basis"
        />
      </SettingsSection>
    </div>
  );
}