export enum MembershipStatus {
  Active = 'active',
  Expired = 'expired',
  Removed = 'removed',
}

export interface Member {
  id: number;
  tg_user_id: number;
  username?: string;
  first_name: string;
  last_name?: string;
}

export enum ExtensionMode {
  Set = 'set',
  Add = 'add',
}

export interface Extension {
  id: number;
  delta_days: number;
  mode: ExtensionMode;
  by_admin_id: number;
  created_at: string; // ISO string
}

export interface Membership {
  id: number;
  member: Member;
  joined_at_utc: string; // ISO string
  expires_at_utc: string; // ISO string
  status: MembershipStatus;
  invite_link?: string;
  extensions: Extension[];
}

export enum Page {
    Dashboard,
    Settings,
}
