import React from 'react';

const PlusIcon = ({ color="#fff" }) => {
  return (
    <svg width={20} height={20} fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 19a1 1 0 102 0v-8h8a1 1 0 100-2h-8V1a1 1 0 10-2 0v8H1a1 1 0 100 2h8v8z"
      fill={color}
    />
  </svg>
  )
}

export default PlusIcon;