import { Session } from "@supabase/supabase-js";

export type Seat = {
  id: string;
  created_at: Date;
  number: number;
  name: string;
  headcount: number;
  storeId: string;
};

export type ManagementPageProps = {
  initialSession: Session;
  user: Session;
  seats: Seat[];
};
