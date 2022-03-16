export interface TabProps {
  children: React.ReactNode;
  defaultTab?: number;
  height?: string;
}

export interface TabItemProps {
  title: string;
  children: React.ReactNode;
}
