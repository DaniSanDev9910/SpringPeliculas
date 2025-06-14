import React from 'react';
import { Outlet } from 'react-router';
import { Navigation } from './Navigation';

export function Layout() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navigation />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}