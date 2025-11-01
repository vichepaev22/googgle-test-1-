import React, { useState } from 'react';

const timezones = [
    'UTC', 'Europe/London', 'Europe/Paris', 'Europe/Moscow', 'America/New_York', 'America/Los_Angeles', 'Asia/Tokyo'
];

const SettingsPage: React.FC = () => {
    const [defaultDuration, setDefaultDuration] = useState(30);
    const [ownerTimezone, setOwnerTimezone] = useState('UTC');
    const [digestTime, setDigestTime] = useState('09:00');
    const [notifications, setNotifications] = useState({ join: true, remove: true, dailyDigest: false });
    
    const handleSave = () => {
        // Here you would typically make an API call to save the settings
        alert('Settings saved (simulation)!');
    };

    return (
        <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            <div className="space-y-6">
                
                <div className="p-4 border border-slate-700 rounded-md">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Membership</h3>
                    <div>
                        <label htmlFor="defaultDuration" className="block text-sm font-medium text-slate-300">Default access duration (days)</label>
                        <input
                            type="number"
                            id="defaultDuration"
                            value={defaultDuration}
                            onChange={(e) => setDefaultDuration(parseInt(e.target.value, 10))}
                            className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            min="1"
                        />
                    </div>
                </div>

                <div className="p-4 border border-slate-700 rounded-md">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Reporting</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="ownerTimezone" className="block text-sm font-medium text-slate-300">Owner's Timezone</label>
                            <select
                                id="ownerTimezone"
                                value={ownerTimezone}
                                onChange={(e) => setOwnerTimezone(e.target.value)}
                                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            >
                                {timezones.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="digestTime" className="block text-sm font-medium text-slate-300">Daily digest time</label>
                            <input
                                type="time"
                                id="digestTime"
                                value={digestTime}
                                onChange={(e) => setDigestTime(e.target.value)}
                                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
                
                <div className="p-4 border border-slate-700 rounded-md">
                    <h3 className="text-lg font-semibold text-slate-200 mb-2">Notifications</h3>
                    <div className="space-y-2">
                         <div className="flex items-center justify-between">
                            <label htmlFor="join-notif" className="text-sm text-slate-300">Notify on new member join</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                               <input type="checkbox" id="join-notif" className="sr-only peer" checked={notifications.join} onChange={e => setNotifications(n => ({...n, join: e.target.checked}))} />
                               <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-cyan-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                         </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="remove-notif" className="text-sm text-slate-300">Notify on member removal</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                               <input type="checkbox" id="remove-notif" className="sr-only peer" checked={notifications.remove} onChange={e => setNotifications(n => ({...n, remove: e.target.checked}))} />
                               <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-cyan-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                         </div>
                         <div className="flex items-center justify-between">
                            <label htmlFor="digest-notif" className="text-sm text-slate-300">Enable daily digest</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                               <input type="checkbox" id="digest-notif" className="sr-only peer" checked={notifications.dailyDigest} onChange={e => setNotifications(n => ({...n, dailyDigest: e.target.checked}))} />
                               <div className="w-11 h-6 bg-slate-600 rounded-full peer peer-focus:ring-4 peer-focus:ring-cyan-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                         </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        className="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors"
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
