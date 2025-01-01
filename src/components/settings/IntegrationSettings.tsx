import React from 'react';
import { SettingsSection } from './SettingsSection';
import { SettingsInput } from './SettingsInput';
import { SettingsSelect } from './SettingsSelect';
import { useIntegrations } from '../../hooks/useIntegrations';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export function IntegrationSettings() {
  const { integrations, updateIntegration, testConnection, status } = useIntegrations();

  const handleSave = async (platform: string, key: string, value: string) => {
    await updateIntegration(platform, key, value);
  };

  const handleTest = async (platform: string) => {
    await testConnection(platform);
  };

  return (
    <div className="space-y-6">
      <SettingsSection title="TCGPlayer Integration">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Connection Status:</h4>
            {status.tcgplayer === 'connected' ? (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Connected
              </span>
            ) : status.tcgplayer === 'error' ? (
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" />
                Error
              </span>
            ) : (
              <span className="flex items-center gap-1 text-gray-500">
                <AlertCircle className="h-4 w-4" />
                Not Connected
              </span>
            )}
          </div>
          
          <SettingsInput
            label="API Key"
            type="password"
            defaultValue={integrations.tcgplayer?.apiKey || ''}
            description="Your TCGPlayer API key"
            onBlur={(value) => handleSave('tcgplayer', 'apiKey', value)}
          />
          
          <SettingsSelect
            label="Price Source"
            options={[
              { value: 'market', label: 'Market Price' },
              { value: 'low', label: 'Low Price' },
              { value: 'median', label: 'Median Price' },
            ]}
            defaultValue={integrations.tcgplayer?.priceSource || 'market'}
            description="Default price source for TCGPlayer data"
            onChange={(value) => handleSave('tcgplayer', 'priceSource', value)}
          />

          <button
            onClick={() => handleTest('tcgplayer')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Test Connection
          </button>
        </div>
      </SettingsSection>

      <SettingsSection title="eBay Integration">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Connection Status:</h4>
            {status.ebay === 'connected' ? (
              <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                Connected
              </span>
            ) : status.ebay === 'error' ? (
              <span className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <XCircle className="h-4 w-4" />
                Error
              </span>
            ) : (
              <span className="flex items-center gap-1 text-gray-500">
                <AlertCircle className="h-4 w-4" />
                Not Connected
              </span>
            )}
          </div>

          <SettingsInput
            label="Client ID"
            type="password"
            defaultValue={integrations.ebay?.clientId || ''}
            description="Your eBay application client ID"
            onBlur={(value) => handleSave('ebay', 'clientId', value)}
          />
          
          <SettingsInput
            label="Client Secret"
            type="password"
            defaultValue={integrations.ebay?.clientSecret || ''}
            description="Your eBay application client secret"
            onBlur={(value) => handleSave('ebay', 'clientSecret', value)}
          />

          <SettingsSelect
            label="Environment"
            options={[
              { value: 'sandbox', label: 'Sandbox (Testing)' },
              { value: 'production', label: 'Production' },
            ]}
            defaultValue={integrations.ebay?.environment || 'sandbox'}
            description="eBay API environment"
            onChange={(value) => handleSave('ebay', 'environment', value)}
          />

          <button
            onClick={() => handleTest('ebay')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Test Connection
          </button>
        </div>
      </SettingsSection>
    </div>
  );
}