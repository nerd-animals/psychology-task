import React from 'react';

export default function button({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button className="border p-1" type="button" onClick={onClick}>
      {label}
    </button>
  );
}
