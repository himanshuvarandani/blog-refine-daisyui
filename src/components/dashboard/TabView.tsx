import React from "react";
import { TabItem } from "./TabItem";
import { TabPanel } from "./TabPanel";
import { TTab } from "../../interfaces";

type TTabViewProps = {
  tabs: TTab[];
};

export const TabView = ({ tabs }: TTabViewProps) => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [viewTabs, setViewTabs] = React.useState<TTab[]>([]);

  React.useEffect(() => {
    setViewTabs(tabs.slice(0, 4));
    if (tabs.length) setActiveTab(1);
  }, [tabs])

  return (
    <div className="mx-auto py-4 px-2 bg-slate-50 border rounded-lg drop-shadow-md">
      <div className="tabs px-2">
        {viewTabs?.map((tab: TTab) => (
          <TabItem
            key={tab.id}
            label={tab.label}
            desc={tab.desc}
            total={tab.total}
            trend={tab.trend}
            formatTotal={tab.formatTotal}
            isActive={tab.id === activeTab}
            setActiveTab={() => setActiveTab(tab.id)}
            hiddenTabs={tabs.filter(t => !viewTabs.includes(t))}
            setViewTabs={(newTab: TTab) => {
              setViewTabs(prev => prev.map(t => t.id === tab.id ? newTab : t))
              setActiveTab(newTab.id)
            }}
          />
        ))}
      </div>
      <div className="mx-auto">
        {tabs?.map((tab: TTab) => (
          <TabPanel key={tab.id} isActive={tab.id === activeTab}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};
