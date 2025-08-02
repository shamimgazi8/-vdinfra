// src/data/distributions.ts
export interface Distribution {
  label: string;
  domain: string;
  status: 'Provisioning' | 'Active' | 'Suspended' | 'Inactive';
  dateModified: string;
  time: string;
}

export const initialData: Distribution[] = [
    {
        label: 'Global Video Delivery',
        domain: '6jt3m4k.tbcdn.net',
        status: 'Provisioning',
        dateModified: 'May 11, 2025',
        time: '11:15 AM',
    },
    {
        label: 'Edge-Optimized Streaming',
        domain: '5mtsn47q8v.tbcdn.net',
        status: 'Active',
        dateModified: 'May 11, 2025',
        time: '2:00 PM',
    },
    {
        label: 'High-Speed Content Distribution',
        domain: '4j2k1l3.tbcdn.net',
        status: 'Suspended',
        dateModified: 'May 10, 2025',
        time: '9:30 AM',
    },      
  {
    label: 'Global Video Delivery',
    domain: '6jt3m4k.tbcdn.net',
    status: 'Provisioning',
    dateModified: 'May 11, 2025',
    time: '11:15 AM',
  },
  {
    label: 'Edge-Optimized Streaming',
    domain: '5mtsn47q8v.tbcdn.net',
    status: 'Active',
    dateModified: 'May 11, 2025',
    time: '2:00 PM',
  },
  // ... and so on
];