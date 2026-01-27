import { User, UserRole, Campaign, CampaignStatus, Task, Contribution, ContributionStatus } from '../types';

export const mockUsers: User[] = [
  { id: 1, name: 'Alice Contributor', role: UserRole.CONTRIBUTOR, RP_balance: 1250 },
  { id: 2, name: 'Bob Organizer', role: UserRole.ORGANIZER, RP_balance: 3000 },
  { id: 3, name: 'Charlie Admin', role: UserRole.SYSTEM_ADMIN, RP_balance: 0 },
  { id: 4, name: 'David Builder', role: UserRole.CONTRIBUTOR, RP_balance: 850 },
  { id: 5, name: 'Eve Designer', role: UserRole.CONTRIBUTOR, RP_balance: 2100 },
  { id: 6, name: 'Frank Critic', role: UserRole.CONTRIBUTOR, RP_balance: 420 },
  { id: 7, name: 'Grace Writer', role: UserRole.CONTRIBUTOR, RP_balance: 1600 },
  { id: 8, name: 'Heidi Mod', role: UserRole.CONTRIBUTOR, RP_balance: 2800 },
];

export const mockCampaigns: Campaign[] = [
  {
    id: 1,
    title: 'Community Park Redesign',
    objective: 'Decide on the new layout and features for the central community park.',
    organizer_id: 2,
    timeline: { start: '2024-08-01', end: '2024-09-30' },
    status: CampaignStatus.ACTIVE,
    verified: true,
  },
  {
    id: 2,
    title: 'Annual Charity Fund Allocation',
    objective: 'Vote on which local charities will receive funding from this year\'s drive.',
    organizer_id: 2,
    timeline: { start: '2024-09-01', end: '2024-09-15' },
    status: CampaignStatus.VOTING,
    verified: true,
  },
  {
    id: 3,
    title: 'Open Source Toolkit Feature Prioritization',
    objective: 'Determine the development priorities for the next quarter.',
    organizer_id: 2,
    timeline: { start: '2024-07-01', end: '2024-07-31' },
    status: CampaignStatus.COMPLETED,
    verified: false,
  },
  {
    id: 4,
    title: 'New Mascot Design Contest',
    objective: 'Select the new official mascot for the university.',
    organizer_id: 2,
    timeline: { start: '2024-10-01', end: '2024-11-01' },
    status: CampaignStatus.DRAFT,
    verified: false,
  },
];

export const mockTasks: Task[] = [
  { id: 1, campaign_id: 1, description: 'Submit a park layout sketch', CP_value: 100 },
  { id: 2, campaign_id: 1, description: 'Research and present playground equipment options', CP_value: 150 },
  { id: 3, campaign_id: 1, description: 'Conduct a survey of 10 community members', CP_value: 50 },
  { id: 4, campaign_id: 2, description: 'Vet a local charity organization', CP_value: 200 },
  { id: 5, campaign_id: 2, description: 'Analyze last year\'s funding impact report', CP_value: 80 },
];

export const mockContributions: Contribution[] = [
  { id: 1, task_id: 1, user_id: 1, submission_proof: 'park_layout_v1.pdf', status: ContributionStatus.APPROVED, timestamp: '2024-08-05T10:00:00Z' },
  { id: 2, task_id: 3, user_id: 1, submission_proof: 'community_survey_results.csv', status: ContributionStatus.APPROVED, timestamp: '2024-08-07T14:30:00Z' },
  { id: 3, task_id: 2, user_id: 1, submission_proof: 'playground_research.docx', status: ContributionStatus.PENDING, timestamp: '2024-08-10T11:20:00Z' },
];
