import React from 'react';

export default function button({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="px-2 py-1 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
