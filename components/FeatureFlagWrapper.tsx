"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for feature flags and the context value
interface FeatureFlags {
  featureWatchlist: boolean;
}

interface FeatureFlagContextType {
  featureFlags: FeatureFlags;
  setFeatureFlags: React.Dispatch<React.SetStateAction<FeatureFlags>>;
}

// Create a context with a default value of `undefined`
const FeatureFlagContext = createContext<FeatureFlagContextType | undefined>(undefined);

interface FeatureFlagProviderProps {
  children: ReactNode;
}

export const FeatureFlagProvider: React.FC<FeatureFlagProviderProps> = ({ children }) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({
    featureWatchlist: false,
  });

  return (
    <FeatureFlagContext.Provider value={{ featureFlags, setFeatureFlags }}>
      {children}
    </FeatureFlagContext.Provider>
  );
};

export const useFeatureFlags = () => {
  const context = useContext(FeatureFlagContext);

  if (!context) {
    throw new Error("useFeatureFlags must be used within a FeatureFlagProvider");
  }

  return context;
};
