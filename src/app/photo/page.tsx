"use client"

import React, { Suspense, } from 'react';
import SelectScreen from './components/SelectScreen';

export default function Photo() {

  return (
    <>
      <Suspense>
        <SelectScreen />
      </Suspense>
    </>
  );
}
