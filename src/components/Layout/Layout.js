import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="container mx-auto px-4 py-8 max-w-2xl">
                {children}
            </main>
        </div>
    );
};

export default Layout;