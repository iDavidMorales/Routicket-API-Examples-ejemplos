export interface Deal {
  id: number
  text: string
  fecha: string
  hora: string
  link: string
  url_tienda: string
  foto_post: string
  code: string
}

export type DealStatus = 'active' | 'expiring' | 'expired'

export interface DealWithStatus extends Deal {
  status: DealStatus
  daysRemaining: number
}
