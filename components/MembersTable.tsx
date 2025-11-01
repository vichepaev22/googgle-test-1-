import React, { useState, useMemo } from 'react';
import { Membership, MembershipStatus } from '../types';
import PencilIcon from './icons/PencilIcon';
import InformationCircleIcon from './icons/InformationCircleIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

interface MembersTableProps {
  memberships: Membership[];
  onExtend: (membership: Membership) => void;
  onInfo: (membership: Membership) => void;
}

const MembersTable: React.FC<MembersTableProps> = ({ memberships, onExtend, onInfo }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Membership | 'name', direction: 'asc' | 'desc' } | null>({ key: 'joined_at_utc', direction: 'desc'});

    const filteredMemberships = useMemo(() => {
        return memberships.filter(m => {
            const search = searchTerm.toLowerCase();
            return (
                m.member.first_name.toLowerCase().includes(search) ||
                (m.member.last_name && m.member.last_name.toLowerCase().includes(search)) ||
                (m.member.username && m.member.username.toLowerCase().includes(search)) ||
                m.member.tg_user_id.toString().includes(search)
            );
        });
    }, [memberships, searchTerm]);
    
    const sortedMemberships = useMemo(() => {
        let sortableItems = [...filteredMemberships];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                let aValue, bValue;
                if(sortConfig.key === 'name'){
                    aValue = `${a.member.first_name} ${a.member.last_name || ''}`;
                    bValue = `${b.member.first_name} ${b.member.last_name || ''}`;
                } else {
                    aValue = a[sortConfig.key as keyof Membership];
                    bValue = b[sortConfig.key as keyof Membership];
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [filteredMemberships, sortConfig]);

    const requestSort = (key: keyof Membership | 'name') => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };
    
    const getSortIndicator = (key: keyof Membership | 'name') => {
        if (!sortConfig || sortConfig.key !== key) return null;
        return <span className={`ml-1 transform ${sortConfig.direction === 'desc' ? 'rotate-180' : ''}`}><ChevronDownIcon className="w-3 h-3 inline"/></span>;
    };
    
    const TableHeader: React.FC<{ sortKey: keyof Membership | 'name'; children: React.ReactNode }> = ({ sortKey, children }) => (
        <th className="p-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer" onClick={() => requestSort(sortKey)}>
            {children} {getSortIndicator(sortKey)}
        </th>
    );

    return (
        <div className="bg-slate-800/50 rounded-lg shadow-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                <h2 className="text-xl font-bold text-white">Group Members</h2>
                <input
                    type="text"
                    placeholder="Search by name, @username, or ID..."
                    className="w-full sm:w-64 bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-sm text-white focus:ring-cyan-500 focus:border-cyan-500"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-700">
                    <thead className="bg-slate-800">
                        <tr>
                            <TableHeader sortKey="name">Member</TableHeader>
                            <TableHeader sortKey="status">Status</TableHeader>
                            <TableHeader sortKey="joined_at_utc">Joined (UTC)</TableHeader>
                            <TableHeader sortKey="expires_at_utc">Expires (UTC)</TableHeader>
                            <th className="p-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-slate-900/50 divide-y divide-slate-800">
                        {sortedMemberships.map(m => (
                            <tr key={m.id} className="hover:bg-slate-800/60">
                                <td className="p-3 whitespace-nowrap">
                                    <div className="text-sm font-medium text-white">{m.member.first_name} {m.member.last_name || ''}</div>
                                    <div className="text-xs text-slate-400">{m.member.username ? `@${m.member.username}` : `ID: ${m.member.tg_user_id}`}</div>
                                </td>
                                <td className="p-3 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        m.status === MembershipStatus.Active ? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'
                                    }`}>
                                        {m.status}
                                    </span>
                                </td>
                                <td className="p-3 whitespace-nowrap text-sm text-slate-300">{new Date(m.joined_at_utc).toLocaleDateString()}</td>
                                <td className="p-3 whitespace-nowrap text-sm text-slate-300 font-medium">{new Date(m.expires_at_utc).toLocaleDateString()}</td>
                                <td className="p-3 whitespace-nowrap text-sm font-medium">
                                    <div className="flex items-center space-x-3">
                                        <button onClick={() => onExtend(m)} className="text-slate-400 hover:text-cyan-400" title="Extend/Set Access">
                                            <PencilIcon className="w-5 h-5"/>
                                        </button>
                                        <button onClick={() => onInfo(m)} className="text-slate-400 hover:text-amber-400" title="View Info">
                                            <InformationCircleIcon className="w-5 h-5"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {sortedMemberships.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                    No members found.
                </div>
            )}
        </div>
    );
};

export default MembersTable;
