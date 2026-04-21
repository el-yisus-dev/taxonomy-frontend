export const Tabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab ${activeTab === tab.value ? "active" : ""}`}
          onClick={() => onChange(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};