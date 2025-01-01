import React from 'react';
import { ProfitSettings } from '../components/settings/ProfitSettings';
import { AutomationSettings } from '../components/settings/AutomationSettings';
import { ListingRules } from '../components/settings/ListingRules';
import { CompetitorSettings } from '../components/settings/CompetitorSettings';
import { IntegrationSettings } from '../components/settings/IntegrationSettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { AccessSettings } from '../components/settings/AccessSettings';
import { AdvancedSettings } from '../components/settings/AdvancedSettings';

const TABS = [
  { id: 'profit', label: 'Profit & Margins', component: ProfitSettings },
  { id: 'automation', label: 'Automation', component: AutomationSettings },
  { id: 'listing', label: 'Listing Rules', component: ListingRules },
  { id: 'competitor', label: 'Competitor Rules', component: CompetitorSettings },
  { id: 'integration', label: 'Integrations', component: IntegrationSettings },
  { id: 'notifications', label: 'Notifications', component: NotificationSettings },
  { id: 'access', label: 'Access Control', component: AccessSettings },
  { id: 'advanced', label: 'Advanced', component: AdvancedSettings },
];

export default function Settings() {
  const [activeTab, setActiveTab] = React.useState(TABS[0].id);
  const ActiveComponent = TABS.find(tab => tab.id === activeTab)?.component || TABS[0].component;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          <ActiveComponent />
        </div>
      </div>
    </div>
  );
}