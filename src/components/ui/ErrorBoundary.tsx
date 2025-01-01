import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.state.error?.message.includes('environment variables')) {
        return (
          <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
              <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Configuration Error</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {this.state.error.message}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Please contact the administrator to resolve this issue.
              </p>
            </div>
          </div>
        );
      }
      
      return this.props.fallback || (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-lg shadow-md p-8">
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong</h2>
            <p className="text-gray-700 dark:text-gray-300">
              Please try refreshing the page or contact support if the problem persists.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}