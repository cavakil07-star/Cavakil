'use client';
// app/(main website)/talk-to-lawyer/page.jsx
import React from 'react'
import TTLClient from './components/TTLClient';
import { useWebsiteLayout } from '@/hooks/useWebsiteData';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Page() {
  const { services, categories } = useWebsiteLayout();

  const callPlansQuery = useQuery({
    queryKey: ['public-call-plans'],
    queryFn: () => axios.get('/api/call-plans').then(res => res.data),
    staleTime: 1000 * 60 * 5,
  });
  const callPlans = callPlansQuery.data || [];

  return <TTLClient services={services} categories={categories} callPlans={callPlans} />
}
