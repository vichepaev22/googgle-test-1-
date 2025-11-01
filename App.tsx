import React, { useState, useCallback, useEffect } from 'react';
import { Membership, MembershipStatus, ExtensionMode, Page } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import MembersTable from './components/MembersTable';
import ExtendModal from './components/ExtendModal';
import InfoModal from './components/InfoModal';
import SettingsPage from './components/SettingsPage';
import UserPlusIcon from './components/icons/UserPlusIcon';

// Mock Data Generation
const createMockMemberships = (): Membership[] => {
    const now = new Date();
    const memberships: Membership[] = [];
    const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Edward', 'Fiona', 'George'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];

    for (let i = 1; i <= 15; i++) {
        const joinedDate = new Date(now.getTime() - Math.random() * 60 * 24 * 60 * 60 * 1000);
        const expiresDate = new Date(joinedDate.getTime() + (20 + Math.random() * 20) * 24 * 60 * 60 * 1000);
        const status = new Date() > expiresDate ? MembershipStatus.Expired : MembershipStatus.Active;
        
        memberships.push({
            id: i,
            member: {
                id: i,
                tg_user_id: 100000000 + Math.floor(Math.random() * 900000000),
                username: `user_${i}`,
                first_name: firstNames[i % firstNames.length],
                last_name: lastNames[i % lastNames.length],
            },
            joined_at_utc: joinedDate.toISOString(),
            expires_at_utc: expiresDate.toISOString(),
            status: status,
            invite_link: i % 3 === 0 ? 'https://t.me/joinchat/ABCDEFGHIJKL' : undefined,
            extensions: [],
        });
    }
    return memberships;
};

const App: React.FC = () => {
    const [memberships, setMemberships] = useState<Membership[]>(createMockMemberships());
    const [selectedForExtend, setSelectedForExtend] = useState<Membership | null>(null);
    const [selectedForInfo, setSelectedForInfo] = useState<Membership | null>(null);
    const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);

    const updateMemberStatus = useCallback(() => {
        setMemberships(prev => prev.map(m => {
            const isExpired = new Date() > new Date(m.expires_at_utc);
            const newStatus = isExpired ? MembershipStatus.Expired : MembershipStatus.Active;
            if (m.status !== newStatus) {
                return { ...m, status: newStatus };
            }
            return m;
        }));
    }, []);

    useEffect(() => {
        const interval = setInterval(updateMemberStatus, 60000); // Check statuses every minute
        return () => clearInterval(interval);
    }, [updateMemberStatus]);

    const handleSaveExtension = (membershipId: number, days: number, mode: 'add' | 'set') => {
        setMemberships(prev => prev.map(m => {
            if (m.id === membershipId) {
                const now = new Date();
                const currentExpires = new Date(m.expires_at_utc);
                
                const newExpiresDate = mode === 'add' 
                    ? new Date(Math.max(now.getTime(), currentExpires.getTime()) + days * 24 * 60 * 60 * 1000)
                    : new Date(now.getTime() + days * 24 * 60 * 60 * 1000);

                const newExtension = {
                    id: Date.now(),
                    delta_days: days,
                    mode: mode === 'add' ? ExtensionMode.Add : ExtensionMode.Set,
                    by_admin_id: 1, // Mock admin ID
                    created_at: now.toISOString(),
                };
                
                return {
                    ...m,
                    expires_at_utc: newExpiresDate.toISOString(),
                    status: MembershipStatus.Active,
                    extensions: [...m.extensions, newExtension]
                };
            }
            return m;
        }));
        setSelectedForExtend(null);
    };

    const simulateNewJoin = () => {
        const newId = Math.max(...memberships.map(m => m.id), 0) + 1;
        const now = new Date();
        const expires = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        
        const newMember: Membership = {
            id: newId,
            member: {
                id: newId,
                tg_user_id: 200000000 + Math.floor(Math.random() * 800000000),
                username: `new_user_${newId}`,
                first_name: 'New',
                last_name: 'Member',
            },
            joined_at_utc: now.toISOString(),
            expires_at_utc: expires.toISOString(),
            status: MembershipStatus.Active,
            extensions: [],
        };
        setMemberships(prev => [newMember, ...prev]);
    };

    return (
        <div className="min-h-screen bg-slate-900">
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {currentPage === Page.Dashboard ? (
                    <div className="space-y-8">
                         <div className="flex justify-between items-center">
                            <div>
                                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                                <p className="text-slate-400 mt-1">Overview of your Telegram group.</p>
                            </div>
                            <button 
                                onClick={simulateNewJoin}
                                className="bg-cyan-600 text-white font-semibold rounded-md hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-cyan-500 transition-colors px-4 py-2 flex items-center gap-2"
                            >
                                <UserPlusIcon className="w-5 h-5"/>
                                Simulate Join
                            </button>
                        </div>
                        <Dashboard memberships={memberships} />
                        <MembersTable 
                            memberships={memberships} 
                            onExtend={setSelectedForExtend}
                            onInfo={setSelectedForInfo}
                        />
                    </div>
                ) : (
                    <SettingsPage />
                )}
            </main>

            <ExtendModal 
                membership={selectedForExtend} 
                onClose={() => setSelectedForExtend(null)}
                onSave={handleSaveExtension}
            />
            <InfoModal 
                membership={selectedForInfo}
                onClose={() => setSelectedForInfo(null)}
            />
        </div>
    );
};

export default App;
