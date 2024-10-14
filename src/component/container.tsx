import React from 'react';

export default function container({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="border border-gray-300 rounded-lg flex items-center justify-center overflow-auto"
        style={{
          width: '75vw',
          height: '75vh',
          maxWidth: 'min(75vw, 75vh)',
          maxHeight: 'min(75vw, 75vh)',
        }}
      >
        {children}
      </div>
    </div>
  );
}
