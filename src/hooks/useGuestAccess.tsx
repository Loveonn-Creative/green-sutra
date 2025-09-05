import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GuestAccessContextType {
  isGuestMode: boolean;
  enableGuestMode: () => void;
  disableGuestMode: () => void;
}

const GuestAccessContext = createContext<GuestAccessContextType | undefined>(undefined);

export const useGuestAccess = () => {
  const context = useContext(GuestAccessContext);
  if (context === undefined) {
    throw new Error('useGuestAccess must be used within a GuestAccessProvider');
  }
  return context;
};

interface GuestAccessProviderProps {
  children: ReactNode;
}

export const GuestAccessProvider = ({ children }: GuestAccessProviderProps) => {
  const [isGuestMode, setIsGuestMode] = useState(false);

  const enableGuestMode = () => {
    setIsGuestMode(true);
  };

  const disableGuestMode = () => {
    setIsGuestMode(false);
  };

  return (
    <GuestAccessContext.Provider value={{ isGuestMode, enableGuestMode, disableGuestMode }}>
      {children}
    </GuestAccessContext.Provider>
  );
};