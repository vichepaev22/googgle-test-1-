import React from 'react';
import { Page } from '../types';
import UserGroupIcon from './icons/UserGroupIcon';
import Cog6ToothIcon from './icons/Cog6ToothIcon';

interface HeaderProps {
    setCurrentPage: (page: Page) => void;
    currentPage: Page;
}

const Header: React.FC<HeaderProps> = ({ setCurrentPage, currentPage }) => {
    const navItemClasses = (page: Page) => `cursor-pointer px-3 py-2 text-sm font-medium rounded-md flex items-center gap-2 transition-colors ${currentPage === page ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`;
    
    return (
        <header className="bg-slate-900/70 backdrop-blur-lg sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-white font-bold text-lg flex items-center gap-2">
                           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-cyan-400">
                              <path d="M11.933 2.11a1.5 1.5 0 0 1 .134 0l8.25 2.115a1.5 1.5 0 0 1 1.083 1.458V18a1.5 1.5 0 0 1-1.5 1.5h-3.375a1.5 1.5 0 0 1-1.5-1.5v-3.75a.75.75 0 0 0-.75-.75h-1.5a.75.75 0 0 0-.75.75v3.75a1.5 1.5 0 0 1-1.5 1.5H3a1.5 1.5 0 0 1-1.5-1.5V5.683a1.5 1.5 0 0 1 1.083-1.458l8.25-2.115ZM12 6a.75.75 0 0 0-.75.75v3a.75.75 0 0 0 .75.75h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-.75-.75h-3Z" />
                           </svg>
                            Group Guard
                        </div>
                    </div>
                    <nav className="flex space-x-4">
                        <a onClick={() => setCurrentPage(Page.Dashboard)} className={navItemClasses(Page.Dashboard)}>
                            <UserGroupIcon className="w-5 h-5"/> Dashboard
                        </a>
                        <a onClick={() => setCurrentPage(Page.Settings)} className={navItemClasses(Page.Settings)}>
                            <Cog6ToothIcon className="w-5 h-5"/> Settings
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
