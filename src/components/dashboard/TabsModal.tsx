import { PresentationChartLineIcon, QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import React, { EventHandler, useEffect } from "react";
import { TTab } from "../../interfaces";

type TTabsModal = {
  modalRef: React.RefObject<HTMLDivElement>;
  hiddenTabs: TTab[];
  showModal: boolean;
  closeModal: () => void;
  setViewTabs: (newTab: TTab) => void;
};

export const TabsModal = ({
  modalRef,
  hiddenTabs,
  showModal,
  closeModal,
  setViewTabs,
}: TTabsModal) => {
  const [helpIcon, setHelpIcon] = React.useState(0);

  useEffect(() => {
    const listener = (e: any) => {
      if (modalRef.current && !modalRef.current.contains(e.target))
        closeModal()
    };

    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, []);

  if (!showModal) return null;
  return (
    <div
      className="absolute top-[125%] right-0 z-50 w-60 rounded-lg bg-zinc-50 shadow-lg py-2 px-3 space-y-1"
    >
      {hiddenTabs.map(tab => (
        <div
          key={tab.id}
          className="flex justify-between items-center rounded-lg hover:bg-gray-200 px-2 py-1"
          onMouseEnter={() => setHelpIcon(prev => tab.id)}
          onMouseLeave={() => setHelpIcon(prev => 0)}
          onClick={(e) => {
            e.stopPropagation();
            setViewTabs(tab);
          }}
        >
          <div className="flex items-center space-x-3">
            <PresentationChartLineIcon className="h-3 w-3" />
            <p className="text-sm">{tab.label}</p>
          </div>
          <div>
            {tab.id == helpIcon ? (
              <QuestionMarkCircleIcon className="h-3 w-3" />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};
