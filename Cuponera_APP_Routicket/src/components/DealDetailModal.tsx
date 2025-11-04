import { Heart, MapPin, Clock, Tag, ArrowRight, X, ShareNetwork } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DealWithStatus } from '@/lib/types'
import { getStatusBadgeConfig, formatExpirationDate } from '@/lib/deals'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface DealDetailModalProps {
  deal: DealWithStatus | null
  isOpen: boolean
  onClose: () => void
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

export function DealDetailModal({ deal, isOpen, onClose, isFavorite, onToggleFavorite }: DealDetailModalProps) {
  const { t, i18n } = useTranslation()
  
  if (!deal) return null

  const statusConfig = getStatusBadgeConfig(deal.status, t)
  const expirationText = formatExpirationDate(deal.fecha, deal.daysRemaining, deal.status, t, i18n.language)

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: deal.text,
          text: `Check out this deal: ${deal.text}`,
          url: deal.link,
        })
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard()
        }
      }
    } else {
      copyToClipboard()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(deal.link)
    toast.success('Link copied to clipboard!')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 gap-0 max-h-[90vh] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-muted">
            <img
              src={deal.foto_post}
              alt={deal.text}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20" />
            
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="absolute top-4 left-4">
              <Badge className={statusConfig.className}>
                {statusConfig.label}
              </Badge>
            </div>
          </div>

          <ScrollArea className="max-h-[50vh]">
            <div className="p-6 space-y-6">
              <DialogHeader>
                <DialogTitle className="text-2xl leading-tight pr-8">
                  {deal.text}
                </DialogTitle>
              </DialogHeader>

              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Clock weight="regular" className="w-5 h-5 text-muted-foreground" />
                  <span className="font-medium">{expirationText}</span>
                </div>
                {deal.code && (
                  <div className="flex items-center gap-2 text-sm">
                    <Tag weight="regular" className="w-5 h-5 text-muted-foreground" />
                    <code className="font-mono bg-muted px-2 py-1 rounded font-semibold">
                      {deal.code}
                    </code>
                  </div>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                {deal.url_tienda && (
                  <div className="flex items-start gap-3">
                    <MapPin weight="fill" className="w-5 h-5 text-secondary mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-sm mb-1">{t('deal.locationLabel')}</p>
                      <a
                        href={deal.url_tienda}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-secondary hover:underline"
                      >
                        {t('deal.viewOnMap')}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    size="lg"
                    className="flex-1"
                    onClick={() => onToggleFavorite(deal.id)}
                  >
                    <Heart
                      weight={isFavorite ? 'fill' : 'regular'}
                      className={cn('w-5 h-5 mr-2', isFavorite && 'text-accent')}
                    />
                    {isFavorite ? t('deal.saved') : t('deal.save')}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleShare}
                  >
                    <ShareNetwork weight="regular" className="w-5 h-5" />
                  </Button>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  asChild
                >
                  <a href={deal.link} target="_blank" rel="noopener noreferrer">
                    {t('deal.viewDetails')}
                    <ArrowRight weight="bold" className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </ScrollArea>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
