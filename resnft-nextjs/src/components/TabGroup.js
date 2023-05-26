import { useState } from "react";

export const TabContent = ({ children }) => {
  return <div className="px-5 py-2 w-full">{children}</div>;
};

const TabTitle = ({ title, setSelectedTab, index, className }) => {
  return (
    <div className="text-center">
      <button className={className + " p-2"} onClick={() => setSelectedTab(index)}>
        {title}
      </button>
    </div>
  );
};

export const TabGroup = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="flex flex-1 flex-col">
      <div className="bg-green flex justify-evenly rounded-t-md">
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
						className={selectedTab === index ? "font-bold" : ""}
          />
        ))}
      </div>
      <div className="flex flex-1">{children[selectedTab]}</div>
    </div>
  );
};
