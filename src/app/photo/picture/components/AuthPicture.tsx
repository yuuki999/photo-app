"use client"

import React, { useState } from 'react';
import Conditions from './Conditions';
import Content from './Content';
import Guidelines from './Guidelines';
import { Header } from '../../components/header';

export default function AuthPicture() {
  const [isFormValid, setIsFormValid] = useState(false);
  const [error] = useState('');

  if (error) {
    console.error(error);
  }

  return (
    <>
      <Header />
      <Guidelines />
      <Conditions setIsFormValid={setIsFormValid} />
      <Content isFormValid={isFormValid} />
    </>
  );
}

