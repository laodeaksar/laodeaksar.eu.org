import React from 'react';
import * as Tabs from '@radix-ui/react-tabs';

import ScrollArea from './ScrollArea';

import { styles } from './Styles';

import type { TabProps, TabItemProps } from './types';

const Tab = ({
  children,
  defaultTab = 0,
  height = 'fit-content'
}: TabProps) => {
  if (!Array.isArray(children)) {
    return <div className="Tabs">{children}</div>;
  }

  return (
    <Tabs.Root defaultValue={defaultTab.toString()}>
      <Tabs.List className={styles.tabList}>
        {React.Children.map(
          children,
          (child: React.ReactElement<TabItemProps>, i: number) => {
            return (
              <Tabs.Trigger value={i.toString()} className={styles.tabTrigger}>
                {child.props.title}
              </Tabs.Trigger>
            );
          }
        )}
      </Tabs.List>

      {React.Children.map(
        children,
        (child: React.ReactElement<TabItemProps>, i: number) => {
          return (
            <Tabs.Content
              value={i.toString()}
              key={i}
              className={styles.tabContent}
            >
              <ScrollArea height={height}>{child.props.children}</ScrollArea>
            </Tabs.Content>
          );
        }
      )}
    </Tabs.Root>
  );
};

const TabItem = ({ title, children }: TabItemProps) => {
  return children;
};

Tab.Item = TabItem;

export default Tab;
