'use client';

import React, { useState } from 'react';
import RegisterForm from './RegisterForm';
import './RegisterForm.css';

export default function Page() {
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
      <RegisterForm />
    </div>
  );
}
