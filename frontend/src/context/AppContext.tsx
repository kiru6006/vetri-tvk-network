import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserRole, Language, Member } from '../types';
import { MOCK_MEMBERS } from '../mock/data';

interface AppContextType {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  currentUser: Member;
  canViewPhone: (member: Member) => boolean;
  canViewAddress: (member: Member) => 'FULL' | 'LIMITED' | 'NONE';
  canViewLegal: (member: Member) => boolean;
  canVerifyMember: () => boolean;
  canExportData: () => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [language, setLanguage] = useState<Language>('en');
  
  // Simulated logged-in member
  const currentUser = MOCK_MEMBERS[0];

  // RBAC Permission logic matching 06-RBAC-MATRIX.md
  const canViewPhone = (member: Member): boolean => {
    if (member.id === currentUser.id) return true;
    if (['BOOTH_COORDINATOR', 'CONSTITUENCY_ADMIN', 'DISTRICT_ADMIN', 'WING_COORDINATOR', 'STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole)) {
      return true;
    }
    // Regular member can only view if target member gave consent
    return member.phoneConsent;
  };

  const canViewAddress = (member: Member): 'FULL' | 'LIMITED' | 'NONE' => {
    if (member.id === currentUser.id) return 'FULL';
    if (['CONSTITUENCY_ADMIN', 'DISTRICT_ADMIN', 'STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole)) {
      return 'FULL';
    }
    if (currentRole === 'BOOTH_COORDINATOR' || currentRole === 'WARD_COORDINATOR') {
      return 'LIMITED';
    }
    return 'NONE';
  };

  const canViewLegal = (member: Member): boolean => {
    if (member.id === currentUser.id) return true;
    if (currentRole === 'SUPER_ADMIN' || currentRole === 'STATE_ADMIN') return true;
    if (['CONSTITUENCY_ADMIN', 'DISTRICT_ADMIN'].includes(currentRole)) return true;
    return false;
  };

  const canVerifyMember = (): boolean => {
    return ['BOOTH_COORDINATOR', 'WARD_COORDINATOR', 'CONSTITUENCY_ADMIN', 'DISTRICT_ADMIN', 'WING_COORDINATOR', 'STATE_ADMIN', 'SUPER_ADMIN'].includes(currentRole);
  };

  const canExportData = (): boolean => {
    return currentRole === 'SUPER_ADMIN';
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        language,
        setLanguage,
        currentUser,
        canViewPhone,
        canViewAddress,
        canViewLegal,
        canVerifyMember,
        canExportData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
