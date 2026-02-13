# Voterax UX/UI Components - Quick Reference Guide

## 🎯 Quick Start

All new components are located in `src/components/ui/` and follow consistent patterns for easy integration.

---

## 📦 Available Components

### 1. Tooltips

#### Basic Tooltip
```tsx
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent>
      <p>Helpful information appears here</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

#### Predefined Term Tooltips (Recommended)
```tsx
import { CPTooltip, RPTooltip, BurnTooltip, VotingPowerTooltip, QuadraticFundingTooltip } from '@/components/ui/tooltip-term';

// Use anywhere in your JSX
<p>Earn <CPTooltip>CP</CPTooltip> by participating</p>
<p>Build <RPTooltip>RP</RPTooltip> over time</p>
<p><BurnTooltip>Burn</BurnTooltip> points to vote</p>
<p>Your <VotingPowerTooltip>voting power</VotingPowerTooltip> = CP + (0.2 × RP)</p>
<p>Uses <QuadraticFundingTooltip>Quadratic Funding</QuadraticFundingTooltip></p>
```

---

### 2. Point Badges

#### Single Point Display
```tsx
import { PointBadge } from '@/components/ui/point-badge';

// Campaign Points
<PointBadge type="CP" amount={1250} size="md" variant="solid" />

// Reputation Points
<PointBadge type="RP" amount={450} size="md" variant="solid" />

// Sizes: 'sm' | 'md' | 'lg'
// Variants: 'default' | 'outline' | 'solid'
```

#### Both Points Together
```tsx
import { PointDisplay } from '@/components/ui/point-badge';

<PointDisplay 
  cp={1250} 
  rp={450} 
  size="md" 
  orientation="horizontal" 
/>
```

#### Point Change Indicator
```tsx
import { PointChange } from '@/components/ui/point-badge';

<PointChange type="CP" amount={1250} change={+100} />
<PointChange type="RP" amount={450} change={-50} />
```

---

### 3. Alerts & Error States

#### Basic Alert
```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

<Alert variant="info">
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This is an informational message.
  </AlertDescription>
</Alert>
```

#### All Variants
```tsx
// Info (blue)
<Alert variant="info">...</Alert>

// Success (green)
<Alert variant="success">...</Alert>

// Warning (yellow)
<Alert variant="warning">...</Alert>

// Error (red)
<Alert variant="error">...</Alert>
```

#### Dismissible Alert
```tsx
<Alert variant="warning" dismissible onDismiss={() => console.log('dismissed')}>
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>This can be dismissed</AlertDescription>
</Alert>
```

#### Common Error States

**Insufficient RP:**
```tsx
{user.rp < minRP && (
  <Alert variant="warning">
    <AlertTitle>Insufficient Reputation</AlertTitle>
    <AlertDescription>
      You need at least {minRP} <RPTooltip>RP</RPTooltip> to join this campaign.
      You currently have {user.rp} RP.
    </AlertDescription>
  </Alert>
)}
```

**Insufficient CP:**
```tsx
{user.cp < requiredCP && (
  <Alert variant="error">
    <AlertTitle>Insufficient Campaign Points</AlertTitle>
    <AlertDescription>
      You need {requiredCP} <CPTooltip>CP</CPTooltip> but only have {user.cp} CP.
    </AlertDescription>
  </Alert>
)}
```

**Missed Deadline:**
```tsx
{isExpired && (
  <Alert variant="error">
    <AlertTitle>Campaign Ended</AlertTitle>
    <AlertDescription>
      This campaign ended {daysAgo} days ago. Submissions are no longer accepted.
    </AlertDescription>
  </Alert>
)}
```

---

### 4. Loading States

#### Skeleton Loaders
```tsx
import { 
  Skeleton, 
  SkeletonCard, 
  SkeletonCampaignCard, 
  SkeletonTable, 
  SkeletonStats 
} from '@/components/ui/skeleton';

// Basic skeleton
<Skeleton className="h-4 w-full" />

// Card skeleton
<SkeletonCard />

// Campaign card skeleton
<SkeletonCampaignCard />

// Table skeleton (5 rows by default)
<SkeletonTable rows={3} />

// Stats skeleton (3 cards by default)
<SkeletonStats count={4} />
```

#### Spinners
```tsx
import { Spinner, LoadingOverlay, ButtonSpinner } from '@/components/ui/spinner';

// Basic spinner
<Spinner size="md" label="Loading..." />

// Full-page overlay
<LoadingOverlay message="Loading campaigns..." />

// Button spinner
<Button disabled={isLoading}>
  {isLoading && <ButtonSpinner className="mr-2" />}
  Submit
</Button>
```

#### Loading Pattern
```tsx
{isLoading ? (
  <SkeletonCampaignCard />
) : (
  <CampaignCard {...campaign} />
)}
```

---

### 5. Empty States

```tsx
import { EmptyState } from '@/components/ui/empty-state';
import { Inbox } from 'lucide-react';

<EmptyState
  icon={Inbox}
  title="No Campaigns Found"
  description="There are no active campaigns at the moment. Check back later."
  action={{
    label: "Create Campaign",
    onClick: () => navigate('/create')
  }}
/>
```

---

## 🎨 Visual Identity Guide

### CP (Campaign Points)
- **Color**: Orange/Amber (`text-orange-400`, `bg-orange-500/10`)
- **Icon**: `Flame` from lucide-react
- **Usage**: Short-term participation rewards, burned when voting

### RP (Reputation Points)
- **Color**: Blue/Purple (`text-blue-400`, `bg-blue-500/10`)
- **Icon**: `Shield` from lucide-react
- **Usage**: Long-term credibility, persistent across campaigns

### Color Palette
```css
/* Campaign Points */
--cp-color: #fb923c; /* orange-400 */
--cp-bg: rgba(249, 115, 22, 0.1); /* orange-500/10 */
--cp-border: rgba(249, 115, 22, 0.2); /* orange-500/20 */

/* Reputation Points */
--rp-color: #60a5fa; /* blue-400 */
--rp-bg: rgba(59, 130, 246, 0.1); /* blue-500/10 */
--rp-border: rgba(59, 130, 246, 0.2); /* blue-500/20 */

/* Alert Variants */
--alert-info: #60a5fa; /* blue-400 */
--alert-success: #4ade80; /* green-400 */
--alert-warning: #facc15; /* yellow-400 */
--alert-error: #f87171; /* red-400 */
```

---

## 📋 Common Patterns

### Campaign Details Page
```tsx
import { CPTooltip, RPTooltip } from '@/components/ui/tooltip-term';
import { PointBadge } from '@/components/ui/point-badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

function CampaignDetails() {
  const userRP = 450;
  const minRP = 10;
  const hasEnoughRP = userRP >= minRP;

  return (
    <>
      {/* Show CP Pool with tooltip */}
      <div>
        Reward Pool: {campaign.budget} <CPTooltip>CP</CPTooltip>
      </div>

      {/* Error state for insufficient RP */}
      {!hasEnoughRP && (
        <Alert variant="warning">
          <AlertTitle>Insufficient Reputation</AlertTitle>
          <AlertDescription>
            You need at least {minRP} <RPTooltip>RP</RPTooltip> to join.
          </AlertDescription>
        </Alert>
      )}

      {/* Display user points */}
      <PointBadge type="CP" amount={userCP} size="lg" variant="solid" />
      <PointBadge type="RP" amount={userRP} size="lg" variant="solid" />
    </>
  );
}
```

### Voting Interface
```tsx
import { BurnTooltip, VotingPowerTooltip } from '@/components/ui/tooltip-term';
import { Alert } from '@/components/ui/alert';

function VotingInterface() {
  return (
    <>
      <p>
        <BurnTooltip>Burn</BurnTooltip> CP to generate{' '}
        <VotingPowerTooltip>voting power</VotingPowerTooltip>
      </p>

      {/* Insufficient CP warning */}
      {userCP < burnAmount && (
        <Alert variant="error">
          <AlertTitle>Insufficient CP</AlertTitle>
          <AlertDescription>
            You need {burnAmount} CP but only have {userCP} CP.
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
```

### Loading List
```tsx
import { SkeletonCampaignCard } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Inbox } from 'lucide-react';

function CampaignList() {
  if (isLoading) {
    return (
      <>
        <SkeletonCampaignCard />
        <SkeletonCampaignCard />
        <SkeletonCampaignCard />
      </>
    );
  }

  if (campaigns.length === 0) {
    return (
      <EmptyState
        icon={Inbox}
        title="No Campaigns"
        description="No active campaigns at the moment."
      />
    );
  }

  return campaigns.map(campaign => (
    <CampaignCard key={campaign.id} {...campaign} />
  ));
}
```

---

## ✅ Best Practices

### 1. Always Use Tooltips for Technical Terms
```tsx
// ❌ Bad
<p>Earn CP by participating</p>

// ✅ Good
<p>Earn <CPTooltip>CP</CPTooltip> by participating</p>
```

### 2. Consistent Point Display
```tsx
// ❌ Bad
<div>{amount} CP</div>

// ✅ Good
<PointBadge type="CP" amount={amount} />
```

### 3. Provide Clear Error Messages
```tsx
// ❌ Bad
<Alert variant="error">Error</Alert>

// ✅ Good
<Alert variant="error">
  <AlertTitle>Insufficient CP</AlertTitle>
  <AlertDescription>
    You need 100 <CPTooltip>CP</CPTooltip> but only have 50 CP.
    Complete more tasks to earn CP.
  </AlertDescription>
</Alert>
```

### 4. Show Loading States
```tsx
// ❌ Bad
{campaigns.map(...)}

// ✅ Good
{isLoading ? <SkeletonCampaignCard /> : campaigns.map(...)}
```

### 5. Handle Empty States
```tsx
// ❌ Bad
{campaigns.length === 0 && <p>No campaigns</p>}

// ✅ Good
{campaigns.length === 0 && (
  <EmptyState
    icon={Inbox}
    title="No Campaigns"
    description="Check back later for new campaigns."
  />
)}
```

---

## 🚀 Next Steps

1. **Add tooltips** to all CP/RP mentions across the app
2. **Replace** plain text point displays with `PointBadge`
3. **Add error states** to all forms and actions
4. **Implement loading states** for all async operations
5. **Use empty states** when lists are empty

---

## 📚 Component Files Reference

| Component | File Path | Purpose |
|-----------|-----------|---------|
| Tooltip | `src/components/ui/tooltip.tsx` | Base tooltip component |
| TooltipTerm | `src/components/ui/tooltip-term.tsx` | Predefined term tooltips |
| Alert | `src/components/ui/alert.tsx` | Error/info/warning/success alerts |
| PointBadge | `src/components/ui/point-badge.tsx` | CP/RP display badges |
| Skeleton | `src/components/ui/skeleton.tsx` | Loading skeletons |
| Spinner | `src/components/ui/spinner.tsx` | Loading spinners |
| EmptyState | `src/components/ui/empty-state.tsx` | Empty state displays |

---

## 🎓 Examples in Codebase

See these files for working examples:
- `src/components/CombustionVoting.tsx` - Tooltips and PointBadge usage
- `src/pages/CampaignDetails.tsx` - Error states and tooltips

---

**Last Updated:** 2026-01-31
**Version:** 1.0.0
