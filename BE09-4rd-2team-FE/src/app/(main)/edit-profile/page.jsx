'use client';
import React from 'react';
import BlogInfo from './BlogInfo';
import Sidebar from '../(neighbor)/component/Sidebar';
import '../(neighbor)/style.css';

export default function Page() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <BlogInfo />
    </div>
  );
}
