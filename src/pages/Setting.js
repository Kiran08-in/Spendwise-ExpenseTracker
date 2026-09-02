import { useState } from 'react';
import './Setting.css';

const tabs = ["Profile", "Preferences", "Security", "Notifications", "Data & Privacy", "Appearance"];

function Setting({ theme, setTheme }) {
  const [activeTab, setActiveTab] = useState("Preferences");
  const [currency, setCurrency] = useState('INR');
  const [notifications, setNotifications] = useState(true);
  const [saved, setSaved] = useState(false);

  function handleSave(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings</p>
      </div>

      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`settings-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="settings-panel">
          {activeTab === "Preferences" ? (
            <form onSubmit={handleSave}>
              <h2>Preferences</h2>

              <div className="settings-field">
                <label>Currency</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                </select>
              </div>

              <div className="settings-field">
                <label>Date Format</label>
                <select>
                  <option>DD/MM/YYYY</option>
                  <option>MM/DD/YYYY</option>
                </select>
              </div>

              <div className="settings-field">
                <label>Theme</label>
                <div className="theme-options">
                  <label className="theme-option">
                    <input type="radio" name="theme" checked={theme === 'light'} onChange={() => setTheme('light')} />
                    Light
                  </label>
                  <label className="theme-option">
                    <input type="radio" name="theme" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
                    Dark
                  </label>
                  <label className="theme-option">
                    <input type="radio" name="theme" checked={theme === 'system'} onChange={() => setTheme('system')} />
                    System
                  </label>
                </div>
              </div>

              <div className="settings-field toggle-field">
                <label>Enable Notifications</label>
                <button
                  type="button"
                  className={`toggle-switch ${notifications ? 'on' : 'off'}`}
                  onClick={() => setNotifications(!notifications)}
                >
                  <span className="toggle-knob" />
                </button>
              </div>

              <button type="submit" className="save-btn">
                {saved ? "Saved ✓" : "Save Changes"}
              </button>
            </form>
          ) : (
            <p className="settings-placeholder">{activeTab} settings coming soon.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Setting;