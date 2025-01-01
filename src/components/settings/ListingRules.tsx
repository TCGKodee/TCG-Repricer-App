import React from 'react';
import { SettingsSection } from './SettingsSection';
import { CustomRuleBuilder } from './CustomRuleBuilder';
import { useRuleStore } from '../../store/rules';
import { RuleCard } from '../rules/RuleCard';

export function ListingRules() {
  const { rules, addRule, updateRule, deleteRule } = useRuleStore();

  return (
    <div className="space-y-6">
      <SettingsSection title="Custom Rules">
        <CustomRuleBuilder onSave={addRule} />
      </SettingsSection>

      <SettingsSection title="Active Rules">
        <div className="grid grid-cols-1 gap-4">
          {rules.map((rule) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              onEdit={(rule) => updateRule(rule.id, rule)}
              onDelete={deleteRule}
              onToggle={(id, enabled) => updateRule(id, { enabled })}
            />
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}