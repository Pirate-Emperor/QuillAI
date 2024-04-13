import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Split children into an array
  const tabContents = React.Children.toArray(children);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  // TODO: rewrite more clean, fix crunch
  return (
    <>
      <div className="tabs">
        {tabContents.map((child, index) => (
          <div key={index} className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => handleTabClick(index)}> {child.props.label}
          </div>
        ))}
      </div>
      <div className="tab-content"> {tabContents[activeTab]} </div>
      <div className="tab-controls">
        {tabContents.map((_, index) => (
          <button key={index} onClick={() => setActiveTab(index)}>
            Tab {index + 1} 
          </button>
        ))}
      </div>
    </>);
};

export default Tabs;
