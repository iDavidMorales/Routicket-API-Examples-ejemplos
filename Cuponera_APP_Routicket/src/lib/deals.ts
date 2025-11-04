import { Deal, DealWithStatus, DealStatus } from './types'

export function getDealStatus(fecha: string): { status: DealStatus; daysRemaining: number } {
  if (!fecha || fecha === '') {
    return { status: 'active', daysRemaining: 999 }
  }

  try {
    const expirationDate = new Date(fecha)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    expirationDate.setHours(0, 0, 0, 0)

    const diffTime = expirationDate.getTime() - today.getTime()
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (daysRemaining < 0) {
      return { status: 'expired', daysRemaining }
    } else if (daysRemaining <= 7) {
      return { status: 'expiring', daysRemaining }
    } else {
      return { status: 'active', daysRemaining }
    }
  } catch {
    return { status: 'active', daysRemaining: 999 }
  }
}

export function enhanceDeals(deals: Deal[]): DealWithStatus[] {
  return deals.map(deal => {
    const { status, daysRemaining } = getDealStatus(deal.fecha)
    return { ...deal, status, daysRemaining }
  })
}

export function sortDealsByExpiration(deals: DealWithStatus[]): DealWithStatus[] {
  return [...deals].sort((a, b) => {
    if (a.status === 'expired' && b.status !== 'expired') return 1
    if (a.status !== 'expired' && b.status === 'expired') return -1
    
    if (a.status === 'expiring' && b.status === 'active') return -1
    if (a.status === 'active' && b.status === 'expiring') return 1
    
    return a.daysRemaining - b.daysRemaining
  })
}

export function filterDeals(
  deals: DealWithStatus[],
  searchQuery: string,
  showOnlyFavorites: boolean,
  favoriteIds: number[],
  statusFilter: 'all' | 'active' | 'expiring'
): DealWithStatus[] {
  let filtered = deals

  if (showOnlyFavorites) {
    filtered = filtered.filter(deal => favoriteIds.includes(deal.id))
  }

  if (statusFilter === 'active') {
    filtered = filtered.filter(deal => deal.status === 'active')
  } else if (statusFilter === 'expiring') {
    filtered = filtered.filter(deal => deal.status === 'expiring')
  }

  if (searchQuery.trim() !== '') {
    const query = searchQuery.toLowerCase()
    filtered = filtered.filter(deal =>
      deal.text.toLowerCase().includes(query)
    )
  }

  return filtered
}

export function getStatusBadgeConfig(status: DealStatus, t?: (key: string) => string) {
  const defaultLabels = {
    expired: 'Expired',
    expiring: 'Expiring Soon',
    active: 'Active'
  }
  
  switch (status) {
    case 'expired':
      return {
        label: t ? t('deal.status.expired') : defaultLabels.expired,
        className: 'bg-muted text-muted-foreground'
      }
    case 'expiring':
      return {
        label: t ? t('deal.status.expiring') : defaultLabels.expiring,
        className: 'bg-warning text-warning-foreground animate-pulse'
      }
    case 'active':
      return {
        label: t ? t('deal.status.active') : defaultLabels.active,
        className: 'bg-secondary text-secondary-foreground'
      }
  }
}

export function formatExpirationDate(
  fecha: string, 
  daysRemaining: number, 
  status: DealStatus,
  t?: (key: string, options?: any) => string,
  locale?: string
): string {
  if (!fecha || fecha === '') {
    return t ? t('deal.expiration.noExpiration') : 'No expiration'
  }

  if (status === 'expired') {
    return t ? t('deal.expiration.expired') : 'Expired'
  }

  if (daysRemaining === 0) {
    return t ? t('deal.expiration.expiresToday') : 'Expires today'
  }

  if (daysRemaining === 1) {
    return t ? t('deal.expiration.expiresTomorrow') : 'Expires tomorrow'
  }

  if (daysRemaining <= 7) {
    return t ? t('deal.expiration.daysLeft', { count: daysRemaining }) : `${daysRemaining} days left`
  }

  try {
    const date = new Date(fecha)
    return date.toLocaleDateString(locale || 'en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return t ? t('deal.expiration.noExpiration') : 'No expiration'
  }
}
