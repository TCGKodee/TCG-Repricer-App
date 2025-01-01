import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsInput } from './SettingsInput';
import { SettingsSelect } from './SettingsSelect';

export function CompetitorSettings() {
  return (
    <div className="space-y-6">
      <SettingsSection title="Market Position">
        <SettingsSelect
          label="Target Position"
          options={[
            { value: 'lowest', label: 'Lowest Price' },
            { value: 'average', label: 'Market Average' },
            { value: 'custom', label: 'Custom Position' },
          ]}
          defaultValue="lowest"
          description="Your desired position in the market"
        />
      </SettingsSection>

      <SettingsSection title="Competitor Filters">
        <SettingsInput
          label="Minimum Seller Rating"
          type="number"
          defaultValue={90}
          description="Minimum seller rating to consider as competition"
        />
      </SettingsSection>
    </div>
  );
}