import React from 'react'

export const WheelchairIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="12" cy="12" r="3"/>
    <path d="M7 12h10M12 7v10"/>
  </svg>
)

export const BicycleIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="5.5" cy="17.5" r="3.5"/>
    <circle cx="18.5" cy="17.5" r="3.5"/>
    <path d="M15 6a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
    <path d="M12 17.5V14l-3-3 4-3 2 3h3"/>
  </svg>
)

export const CaneIcon = ({ width = 24, height = 24, className = '' }) => (
  <svg width={width} height={height} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="8" r="3"/>
    <path d="M12 11v11"/>
    <path d="M8 21l4-4 4 4"/>
  </svg>
)

