import React from 'react';
import { Membership } from '../types';
import UserGroupIcon from './icons/UserGroupIcon';
import UserPlusIcon from './icons/UserPlusIcon';
import ClockIcon from './icons/ClockIcon';

interface DashboardProps {
    memberships: Membership[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-slate-800/50 p-6 rounded-lg flex items-center space-x-4 shadow-lg">
        <div className="bg-slate-700 p-3 rounded-full">
            {icon}
        </div>
        <div>
            <p className="text-slate-400 text-sm">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ memberships }) => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const joinedToday = memberships.filter(m => new Date(m.joined_at_utc) >= today).length;
    
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    const expiringSoon = memberships.filter(m => {
        const expiresAt = new Date(m.expires_at_utc);
        return expiresAt > new Date() && expiresAt <= sevenDaysFromNow;
    }).length;

    const totalActiveMembers = memberships.filter(m => m.status === 'active').length;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Total Active Members" value={totalActiveMembers} icon={<UserGroupIcon className="w-6 h-6 text-cyan-400" />} />
            <StatCard title="Joined Today (UTC)" value={joinedToday} icon={<UserPlusIcon className="w-6 h-6 text-green-400" />} />
            <StatCard title="Expiring in 7 Days" value={expiringSoon} icon={<ClockIcon className="w-6 h-6 text-amber-400" />} />
        </div>
    );
};

export default Dashboard;
