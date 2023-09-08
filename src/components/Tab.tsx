'use client';
import {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from '@radix-ui/react-tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dvider } from './ui/Dvider';
import React from 'react';
import { cn } from '@/lib/utils';

interface tabType extends TabsProps {}
const Tab = ({ children, ...props }: tabType) => {
  return <Tabs {...props}>{children}</Tabs>;
};

const TabList = ({ children, className, ...props }: TabsListProps) => {
  return (
    <div className="sticky top-0">
      <div className="container bg-background">
        <TabsList
          className={cn(
            'bg-transparent w-full justify-start dark:bg-transparent gap-[19px] container',
            className
          )}
          {...props}
        >
          {children}
        </TabsList>
      </div>
      <Dvider />
    </div>
  );
};

interface tabTrigger extends Omit<TabsTriggerProps, 'value'> {
  menus: { value: string; label: string }[];
}

const TabTrigger = ({ menus, className, ...props }: tabTrigger) => {
  return (
    <>
      {menus?.map((item, idx) => (
        <React.Fragment key={idx}>
          <div className="relative">
            <TabsTrigger
              className={cn(
                'group outline-none text-md px-0 data-[state=active]:bg-transparent data-[state=active]:text-primary dark:bg-transparent',
                className
              )}
              {...props}
              value={item.value}
            >
              {item.label}
              <div className="absolute group-data-[state=active]:bg-primary bottom-0 w-full h-[2px] translate-y-1"></div>
            </TabsTrigger>
          </div>
        </React.Fragment>
      ))}
    </>
  );
};

interface contentProps extends TabsContentProps {}
const TabContent = ({ children, className, ...props }: contentProps) => {
  return (
    <TabsContent className={cn('container mt-[32px]', className)} {...props}>
      {children}
    </TabsContent>
  );
};

export { Tab, TabList, TabContent, TabTrigger };
