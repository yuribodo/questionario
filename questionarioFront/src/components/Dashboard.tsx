import  { useState } from 'react';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleTabChange = (tab: any) => {
    setSelectedTab(tab);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="bg-gray-800 w-1/4 h-screen p-8">
        <h2 className="text-white text-lg font-bold mb-4">Dashboard</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => handleTabChange('overview')}
                className={`text-white w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'overview' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Overview
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('analytics')}
                className={`text-white w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'analytics' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => handleTabChange('settings')}
                className={`text-white w-full py-2 px-4 rounded mb-2 ${
                  selectedTab === 'settings' ? 'bg-gray-700' : 'hover:bg-gray-700'
                }`}
              >
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="bg-gray-200 w-3/4 p-8">
        {selectedTab === 'overview' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p>Here is the overview content...</p>
          </>
        )}
        {selectedTab === 'analytics' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Analytics</h2>
            <p>Here is the analytics content...</p>
          </>
        )}
        {selectedTab === 'settings' && (
          <>
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
            <p>Here are the settings...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
