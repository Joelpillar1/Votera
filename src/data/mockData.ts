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
    title: 'Uniswap V4 Hookathon',
    objective: 'Build innovative hooks for Uniswap V4 to enhance liquidity provision and trading strategies.',
    organizer_id: 2,
    timeline: { start: '2026-01-01', end: '2026-02-20' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    organizer: {
      name: "Uniswap Labs",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png"
    }
  },
  {
    id: 2,
    title: 'Binance Listing Vote',
    objective: 'Community voting for the next token listing on Binance Spot market.',
    organizer_id: 2,
    timeline: { start: '2026-01-15', end: '2026-03-01' },
    status: CampaignStatus.VOTING,
    verified: true,
    organizer: {
      name: "Binance",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png"
    }
  },
  {
    id: 3,
    title: 'GHO Stablecoin Integration',
    objective: 'Propose and implement new integrations for GHO stablecoin across DeFi protocols.',
    organizer_id: 2,
    timeline: { start: '2026-01-10', end: '2026-02-15' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    organizer: {
      name: "Aave DAO",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png"
    }
  },
  {
    id: 4,
    title: 'Gitcoin Grants 19: Climate',
    objective: 'Support projects focused on climate solutions and regenerative finance.',
    organizer_id: 2,
    timeline: { start: '2026-10-01', end: '2026-11-01' },
    status: CampaignStatus.DRAFT,
    verified: true,
    organizer: {
      name: "Gitcoin",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xDe30da39c46104798bB5aA3fe8B9e0e1F348163F/logo.png"
    }
  },
  {
    id: 5,
    title: 'Retroactive Public Goods Funding 3',
    objective: 'Distribute 30M OP to projects that have provided public goods to the Optimism Collective.',
    organizer_id: 3,
    timeline: { start: '2026-02-01', end: '2026-02-28' },
    status: CampaignStatus.VOTING,
    verified: true,
    budget: 30000000,
    organizer: {
      name: "Optimism Collective",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/optimism/info/logo.png"
    }
  },
  {
    id: 6,
    title: 'Arbitrum DAO Constitution',
    objective: 'Ratify the initial Constitution of the Arbitrum DAO to set governance rules.',
    organizer_id: 4,
    timeline: { start: '2025-12-01', end: '2026-01-15' },
    status: CampaignStatus.COMPLETED,
    verified: true,
    budget: 0,
    organizer: {
      name: "Arbitrum DAO",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/arbitrum/info/logo.png"
    }
  },
  {
    id: 7,
    title: 'ENS Stewardship Election',
    objective: 'Elect the next term of stewards for the ENS DAO Meta-Governance working group.',
    organizer_id: 5,
    timeline: { start: '2026-01-20', end: '2026-02-10' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    budget: 10000,
    organizer: {
      name: "ENS DAO",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72/logo.png"
    }
  },
  {
    id: 8,
    title: 'Polygon 2.0 Upgrade',
    objective: 'Upgrade the Polygon PoS chain to a zkEVM validium as part of Polygon 2.0 roadmap.',
    organizer_id: 6,
    timeline: { start: '2026-03-01', end: '2026-04-01' },
    status: CampaignStatus.DRAFT,
    verified: true,
    organizer: {
      name: "Polygon Labs",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polygon/info/logo.png"
    }
  },
  {
    id: 24, // Assigned a new unique ID
    title: "DeFi Educational Series",
    objective: "Create comprehensive tutorials for new DeFi users to onboard the next million users.",
    organizer_id: 1,
    timeline: { start: "2024-03-01", end: "2024-03-30" },
    status: CampaignStatus.COMPLETED,
    coverImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
    budget: 5000,
    verified: true,
    organizer: {
      name: "DeFi Alliance",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alliance"
    }
  },
  {
    id: 9,
    title: 'StarkNet Ecosystem Grant',
    objective: 'Develop privacy-preserving dApps on StarkNet using Cairo.',
    organizer_id: 3,
    timeline: { start: '2026-02-01', end: '2026-04-15' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    budget: 50000,
    organizer: {
      name: "StarkWare",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766/logo.png"
    }
  },
  {
    id: 10,
    title: 'Cosmos Hub Rho Upgrade',
    objective: 'Vote on the Rho upgrade specifications for the Cosmos Hub mainnet.',
    organizer_id: 4,
    timeline: { start: '2026-01-25', end: '2026-02-05' },
    status: CampaignStatus.VOTING,
    verified: true,
    organizer: {
      name: "Cosmos Hub",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/cosmos/info/logo.png"
    }
  },
  {
    id: 11,
    title: 'MakerDAO DAI Savings Rate',
    objective: 'Adjust the DAI Savings Rate (DSR) to align with current market conditions.',
    organizer_id: 5,
    timeline: { start: '2025-12-10', end: '2025-12-25' },
    status: CampaignStatus.COMPLETED,
    verified: true,
    organizer: {
      name: "MakerDAO",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2/logo.png"
    }
  },
  {
    id: 12,
    title: 'Celestia Data Availability Challenge',
    objective: 'Build high-throughput rollers using Celestia as the DA layer.',
    organizer_id: 6,
    timeline: { start: '2026-01-28', end: '2026-03-30' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    budget: 25000,
    organizer: {
      name: "Celestia",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/celestia/info/logo.png"
    }
  },
  {
    id: 13,
    title: 'Compound V3 Market Addition',
    objective: 'Vote to add a new USDC market on the Base L2 network.',
    organizer_id: 2,
    timeline: { start: '2026-02-01', end: '2026-02-14' },
    status: CampaignStatus.VOTING,
    verified: true,
    organizer: {
      name: "Compound",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xc00e94Cb662C3520282E6f5717214004A7f26888/logo.png"
    }
  }
  ,
  {
    id: 14,
    title: 'Aave V3 Deployment on Scroll',
    objective: 'Proposal to deploy Aave V3 on the Scroll zkEVM mainnet to expand liquidity reach.',
    organizer_id: 2, // Aave reuse or new
    timeline: { start: '2026-02-05', end: '2026-03-05' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    budget: 15000,
    organizer: {
      name: "Aave DAO",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9/logo.png"
    }
  },
  {
    id: 15,
    title: 'Lido Node Operator Increase',
    objective: 'Vote to increase the number of active Node Operators in the Lido set to 50.',
    organizer_id: 3,
    timeline: { start: '2026-01-20', end: '2026-02-03' },
    status: CampaignStatus.VOTING,
    verified: true,
    organizer: {
      name: "Lido DAO",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32/logo.png"
    }
  },
  {
    id: 16,
    title: 'Filecoin Storage Quest',
    objective: 'Incentivized program for storage providers to seal 1PiB of data for public goods.',
    organizer_id: 7,
    timeline: { start: '2026-02-10', end: '2026-04-10' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    budget: 75000,
    organizer: {
      name: "Filecoin Foundation",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/filecoin/info/logo.png"
    }
  },
  {
    id: 17,
    title: 'Gnosis Chain Validator Expansion',
    objective: 'Recruiting independent validators to further decentralize the Gnosis Chain network.',
    organizer_id: 8,
    timeline: { start: '2026-03-01', end: '2026-03-31' },
    status: CampaignStatus.DRAFT,
    verified: true,
    organizer: {
      name: "Gnosis Chain",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x655A59247c94EeD0445d3148F47898495A2df308/logo.png"
    }
  },
  {
    id: 18,
    title: 'Polkadot Parachain Auction #42',
    objective: 'Crowdloan campaign for the upcoming parachain slot auction.',
    organizer_id: 9,
    timeline: { start: '2025-11-01', end: '2025-12-01' },
    status: CampaignStatus.COMPLETED,
    verified: true,
    organizer: {
      name: "Polkadot",
      avatar: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/polkadot/info/logo.png"
    }
  }
  ,
  {
    id: 19,
    title: 'Green City Initiative',
    objective: 'Community-led effort to plant 500 trees in urban areas and set up community gardens.',
    organizer_id: 10,
    timeline: { start: '2026-03-15', end: '2026-06-01' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    budget: 10000,
    organizer: {
      name: "Urban Greenworks",
      avatar: "https://images.unsplash.com/photo-1497250681960-ef04820a38c2?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: 20,
    title: 'Tech4All Youth Mentorship',
    objective: 'Volunteer program to teach coding and digital literacy to high school students.',
    organizer_id: 11,
    timeline: { start: '2026-02-01', end: '2026-05-30' },
    status: CampaignStatus.ACTIVE,
    verified: true,
    budget: 5000,
    organizer: {
      name: "Future Builders Foundation",
      avatar: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: 21,
    title: 'Downtown Art Mural Project',
    objective: 'Select and fund local artists to paint murals on designated downtown buildings.',
    organizer_id: 12,
    timeline: { start: '2026-01-10', end: '2026-02-15' },
    status: CampaignStatus.VOTING,
    verified: true,
    budget: 8000,
    organizer: {
      name: "City Arts Council",
      avatar: "https://images.unsplash.com/photo-1560421683-6856ea585c78?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: 22,
    title: 'Annual Food Drive Logistics',
    objective: 'Coordinate volunteers and logistics for the city-wide holiday food drive.',
    organizer_id: 13,
    timeline: { start: '2025-11-01', end: '2025-12-31' },
    status: CampaignStatus.COMPLETED,
    verified: true,
    budget: 2000,
    organizer: {
      name: "Community Food Bank",
      avatar: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: 23,
    title: 'Safe Streets Survey',
    objective: 'Collect data on pedestrian safety and propose traffic calming measures.',
    organizer_id: 10,
    timeline: { start: '2026-02-20', end: '2026-04-01' },
    status: CampaignStatus.DRAFT,
    verified: true,
    organizer: {
      name: "Urban Greenworks",
      avatar: "https://images.unsplash.com/photo-1497250681960-ef04820a38c2?q=80&w=200&auto=format&fit=crop"
    }
  }
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
