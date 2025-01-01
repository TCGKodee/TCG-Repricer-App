import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsSelect } from './SettingsSelect';

export function ListingSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Condition Rules">
        <SettingsSelect
          label="Near Mint Pricing"
          options={[
            { value: 'market', label: 'Market Price' },
            { value: 'tcglow', label: 'TCG Low' },
            { value: 'custom', label: 'Custom Multiplier' },
          ]}
          defaultValue="market"
          description="Pricing strategy for Near Mint cards"
        />
      </SettingsSection>

      <SettingsSection title="Format Settings">
        <SettingsSelect
          label="Default Format"
          options={[
            { value: 'standard', label: 'Standard' },
            { value: 'modern', label: 'Modern' },
            { value: 'commander', label: 'Commander' },
          ]}
          defaultValue="standard"
          description="Default format for new listings"
        />
      </SettingsSection>
    </div>
  );
}