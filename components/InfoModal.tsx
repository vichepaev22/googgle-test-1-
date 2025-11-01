import React from 'react';
import { Membership, ExtensionMode } from '../types';
import Modal from './Modal';

interface InfoModalProps {
  membership: Membership | null;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ membership, onClose }) => {
  if (!membership) return null;
  
  const memberName = membership.member.username ? `@${membership.member.username}` : `${membership.member.first_name} ${membership.member.last_name || ''}`.trim();

  return (
    <Modal isOpen={!!membership} onClose={onClose} title={`Details for ${memberName}`}>
        <div className="space-y-4 text-sm">
            <div className="grid grid-cols-3 gap-2">
                <span className="text-slate-400">User ID:</span>
                <span className="col-span-2 text-white font-mono">{membership.member.tg_user_id}</span>

                <span className="text-slate-400">Status:</span>
                <span className={`col-span-2 font-semibold ${
                    membership.status === 'active' ? 'text-green-400' : 'text-red-400'
                }`}>{membership.status.charAt(0).toUpperCase() + membership.status.slice(1)}</span>

                <span className="text-slate-400">Joined at (UTC):</span>
                <span className="col-span-2 text-white">{new Date(membership.joined_at_utc).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>

                <span className="text-slate-400">Expires at (UTC):</span>
                <span className="col-span-2 text-white font-bold">{new Date(membership.expires_at_utc).toLocaleString('en-GB', { timeZone: 'UTC' })}</span>
                
                {membership.invite_link && <>
                    <span className="text-slate-400">Invite Link:</span>
                    <span className="col-span-2 text-cyan-400 truncate">{membership.invite_link}</span>
                </>}
            </div>

            <div>
                <h3 className="text-md font-semibold text-white mb-2 border-b border-slate-700 pb-1">Extension History</h3>
                {membership.extensions.length > 0 ? (
                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                        {membership.extensions.map(ext => (
                            <li key={ext.id} className="p-2 bg-slate-900/50 rounded-md">
                                <p className="font-semibold text-slate-200">
                                    {ext.mode === ExtensionMode.Add ? `Added +${ext.delta_days} days` : `Set to ${ext.delta_days} days`}
                                </p>
                                <p className="text-xs text-slate-400">
                                    On {new Date(ext.created_at).toLocaleDateString()} by Admin ID: {ext.by_admin_id}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-slate-500 italic">No extensions recorded.</p>
                )}
            </div>
        </div>
    </Modal>
  );
};

export default InfoModal;
