export interface Distribution {
  id: string;
  name: string;
  cname: string;
  status: string;
  created_at: string;
  updated_at: string;
  description: string;
  origin_type: string;
  cdn_type: string;
  enable_ssl: boolean;
  is_http2: boolean;
  is_http3: boolean;
  is_redirect_http_to_https: boolean;
}
