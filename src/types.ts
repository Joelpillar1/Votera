export enum UserRole {
  CONTRIBUTOR = 'Contributor',
  ORGANIZER = 'Organizer',
  SYSTEM_ADMIN = 'System Admin',
}

export interface User {
  id: number;
  name: string;
  role: UserRole;
  RP_balance: number;
}

export enum CampaignStatus {
  DRAFT = 'draft',
  ACTIVE = 'active',
  VOTING = 'voting',
  COMPLETED = 'completed',
}

export interface Campaign {
  id: number;
  title: string;
  objective: string;
  organizer_id: number;
  timeline: {
    start: string;
    end: string;
  };
  status: CampaignStatus;
  coverImage?: string;
  budget?: number;
  verified?: boolean;
  organizer?: {
    name: string;
    avatar: string;
  };
}

export interface Task {
  id: number;
  campaign_id: number;
  description: string;
  CP_value: number;
}

export enum ContributionStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface Contribution {
  id: number;
  task_id: number;
  user_id: number;
  submission_proof: string;
  status: ContributionStatus;
  timestamp: string;
}

export interface PointsLedger {
  user_id: number;
  source: string; // 'task' or 'vote'
  CP_delta: number;
  RP_delta: number;
  burn_flag: boolean;
  timestamp: string;
}

export interface Vote {
  campaign_id: number;
  user_id: number;
  voting_power_used: number;
  timestamp: string;
}

export type Page =
  | { name: 'landing' }
  | { name: 'dashboard' }
  | { name: 'campaign'; campaignId: number }
  | { name: 'createCampaign' }
  | { name: 'profile' };
