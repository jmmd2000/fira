export interface User {
  id: string;
  google_id: string;
  first_name: string | undefined;
  last_name: string | undefined;
  profile_picture_url: string | undefined;
  created_at: Date;
  updated_at: Date;
}
