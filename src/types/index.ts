export interface Distribution {
  id: string;
  label: string;
  cname: string;
  origin: string;
  status: 'active' | 'inactive' | 'pending';
  created_at: string;
}
