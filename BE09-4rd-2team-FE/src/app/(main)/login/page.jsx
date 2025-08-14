'use client';

import React, { useState } from 'react';
import LoginForm from './LoginForm';
import './AuthForm.css';

export default function Page() {
  const [mode, setMode] = useState('login');
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f8f9fa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LoginForm />
    </div>
  );
}
