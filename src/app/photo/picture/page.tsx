"use client"

import React, { Suspense, } from 'react';
import AuthPicture from './components/AuthPicture';

export default function Picture() {

  return (
    <>
      <Suspense>
        <AuthPicture />
      </Suspense>
    </>
  );
}

