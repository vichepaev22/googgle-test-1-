import React, { useState, useEffect } from 'react';
import { Membership } from '../types';
import Modal from './Modal';

interface ExtendModalProps {
  membership: Membership | null;
  onClose: () => void;
  onSave: (membershipId: number, days: number, mode: 'add' | 'set') => void;
}

const ExtendModal: React.FC<ExtendModalProps> = ({ membership, onClose, onSave }) => {
  const [days, setDays] = useState<string>('30');
  const [mode, setMode] = useState<'add' | 'set'>('add');

  useEffect(() => {
    if (membership) {
      setDays('30');
      setMode('add');
    }
  }, [membership]);

  if (!membership) return null;

  const handleSave = () => {
    const numDays = parseInt(days, 10);
    if (!isNaN(numDays) && numDays >= 1) {
      onSave(membership.id, numDays, mode);
    }
  };

  const memberName = membership.member.username ? `@${membership.member.username}` : `${membership.member.first_name} ${membership.member.last_name || ''}`.trim();

  return (
    <Modal isOpen={!!membership} onClose={onClose} title={`Manage Access for ${memberName}`}>
      <div className="space-y-4">
        <div>
            <p className="text-sm text-slate-400">Current expiry: <span className="font-semibold text-slate-200">{new Date(membership.expires_at_utc).toLocaleString()}</span></p>
        </div>
        <div className="flex bg-slate-700 rounded-md p-1">
          <button
            onClick={() => setMode('add')}
            className={`w-1/2 py-2 text-sm font-semibold rounded ${mode === 'add' ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-600'}`}
          >
            Extend (+N days)
          </button>
          <button
            onClick={() => setMode('set')}
            className={`w-1/2 py-2 text-sm font-semibold rounded ${mode === 'set' ? 'bg-cyan-500 text-white' : 'text-slate-300 hover:bg-slate-600'}`}
          >
            Set (N days from now)
          </button>
        </div>
        <div>
          <label htmlFor="days" className="block text-sm font-medium text-slate-300 mb-1">
            {mode === 'add' ? 'Days to add:' : 'Set total days from now:'}
          </label>
          <input
            type="number"
            id="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            min="1"
            className="w-full bg-slate-900 border border-slate-600 rounded-md px-3 py-2 text-white focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
        <div className="flex justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-500 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-500 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExtendModal;
