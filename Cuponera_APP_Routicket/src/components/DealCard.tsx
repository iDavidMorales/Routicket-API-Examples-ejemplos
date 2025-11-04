import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, MapPin, Clock, Tag } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DealWithStatus } from '@/lib/types'
import { getStatusBadgeConfig, formatExpirationDate } from '@/lib/deals'
import { cn } from '@/lib/utils'

interface DealCardProps {
  deal: DealWithStatus
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
  onViewDetails: (deal: DealWithStatus) => void
}

export function DealCard({ deal, isFavorite, onToggleFavorite, onViewDetails }: DealCardProps) {
  const { t, i18n } = useTranslation()
  const [imageLoaded, setImageLoaded] = useState(false)
  const statusConfig = getStatusBadgeConfig(deal.status, t)
  const expirationText = formatExpirationDate(deal.fecha, deal.daysRemaining, deal.status, t, i18n.language)

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(deal.id)
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow duration-300"
        onClick={() => onViewDetails(deal)}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary/30">
                {deal.text.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <img
            src={deal.foto_post}
            alt={deal.text}
            className={cn(
              'w-full h-full object-cover transition-all duration-500',
              imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105',
              'group-hover:scale-105'
            )}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />
          
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110 transition-all z-10"
            onClick={handleFavoriteClick}
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              animate={isFavorite ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart
                weight={isFavorite ? 'fill' : 'regular'}
                className={cn(
                  'w-5 h-5 transition-colors',
                  isFavorite ? 'text-accent' : 'text-foreground'
                )}
              />
            </motion.div>
          </Button>

          <div className="absolute top-3 left-3">
            <Badge className={statusConfig.className}>
              {statusConfig.label}
            </Badge>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <h3 className="font-semibold text-lg line-clamp-2 leading-tight">
            {deal.text}
          </h3>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Clock weight="regular" className="w-4 h-4" />
              <span>{expirationText}</span>
            </div>
            {deal.code && (
              <div className="flex items-center gap-1.5">
                <Tag weight="regular" className="w-4 h-4" />
                <span className="font-medium">{t('deal.code')}</span>
              </div>
            )}
          </div>

          {deal.url_tienda && (
            <div className="flex items-center gap-1.5 text-sm text-secondary">
              <MapPin weight="fill" className="w-4 h-4" />
              <span className="font-medium">{t('deal.location')}</span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  )
}
