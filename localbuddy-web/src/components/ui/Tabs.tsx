// components/ui/Tabs.tsx
import React, { useState } from 'react';
import { clsx } from 'clsx';

export interface TabItem {
  id: string;
  label: string;
  badge?: number | string;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={clsx('flex border-b border-[#D6E2D9] overflow-x-auto gap-2', className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={clsx(
              'px-4 py-2.5 text-[14px] font-semibold whitespace-nowrap border-b-2 transition-colors flex items-center gap-1.5',
              isActive
                ? 'border-[#15803D] text-[#15803D]'
                : 'border-transparent text-[#4B5B50] hover:text-[#14231A]'
            )}
          >
            {tab.label}
            {tab.badge !== undefined && (
              <span className={clsx(
                'text-[12px] px-1.5 py-0.5 rounded-full font-medium',
                isActive ? 'bg-[#DCFCE7] text-[#15803D]' : 'bg-[#E5E7EB] text-[#374151]'
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

