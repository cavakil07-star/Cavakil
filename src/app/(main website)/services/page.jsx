'use client';
// app/(main website)/services/page.jsx
import React from 'react'
import ServicesClient from './components/ServicesClient'
import { useWebsiteLayout } from '@/hooks/useWebsiteData';

export default function Page() {
  const { services, categories } = useWebsiteLayout();

  return <ServicesClient services={services} categories={categories} />
}
