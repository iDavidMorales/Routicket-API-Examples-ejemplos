import { useState, useMemo } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Funnel, CaretDown } from '@phosphor-icons/react'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DealCard } from '@/components/DealCard'
import { DealDetailModal } from '@/components/DealDetailModal'
import { SearchBar } from '@/components/SearchBar'
import { EmptyState } from '@/components/EmptyState'
import { PolarisDemo } from '@/components/PolarisDemo'
import { Deal, DealWithStatus } from '@/lib/types'
import { enhanceDeals, sortDealsByExpiration, filterDeals } from '@/lib/deals'

const DEALS_DATA: Deal[] = [
  { id: 24, text: "Come Todo x 209", fecha: "2025-12-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=24", url_tienda: "https://goo.gl/maps/548WY17e2mcCMUhK7", foto_post: "https://i.imgur.com/8h1lPVb.jpg", code: "" },
  { id: 168, text: "Mias Home Made Promo", fecha: "2025-12-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=168", url_tienda: "", foto_post: "https://i.imgur.com/aOxlGsx.jpeg", code: "" },
  { id: 157, text: "Acceso a rooftop Be playa", fecha: "2025-12-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=157", url_tienda: "https://maps.app.goo.gl/DtJCzhmfFXQvEn1G9", foto_post: "https://i.imgur.com/F5L4Y5G.jpeg", code: "" },
  { id: 126, text: "2X1 EN CERVEZA", fecha: "2025-12-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=126", url_tienda: "https://maps.app.goo.gl/bcGcfWwLcKPCqiT59", foto_post: "https://i.imgur.com/cD2VWdk.jpg", code: "" },
  { id: 127, text: "Rebel Wings, Miercoles de cometodo por $270", fecha: "2025-11-30", hora: "", link: "https://routicket.com/cupon/?id_cupon=127", url_tienda: "https://routicket.com/tablero/644", foto_post: "https://i.imgur.com/xX0TUjJ.jpg", code: "" },
  { id: 166, text: "2x1 en Ice Pirate kream", fecha: "2025-11-05", hora: "", link: "https://routicket.com/cupon/?id_cupon=166", url_tienda: "https://maps.app.goo.gl/9UvqTypLpGrY2M3d7", foto_post: "https://i.imgur.com/KAvMsNs.jpeg", code: "" },
  { id: 167, text: "Creacion de portadas y Sesiones de fotos", fecha: "2025-12-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=167", url_tienda: "", foto_post: "https://i.imgur.com/eEVfevr.jpeg", code: "" },
  { id: 128, text: "Las Helodias, Miercoles 2x1 en Luchadores", fecha: "2025-11-30", hora: "", link: "https://routicket.com/cupon/?id_cupon=128", url_tienda: "https://maps.app.goo.gl/ptbc7HSSVnhSB8vc6", foto_post: "https://i.imgur.com/zYpMvVd.jpg", code: "" },
  { id: 107, text: "Suerte de Churro Tarjeta Anual", fecha: "2025-12-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=107", url_tienda: "https://maps.app.goo.gl/tRewfqYEVeBXa6nm9", foto_post: "https://i.imgur.com/Z36OFVE.jpg", code: "" },
  { id: 158, text: "Acceso a rooftop en The reef 28", fecha: "2025-11-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=158", url_tienda: "https://maps.app.goo.gl/c9tSZtdqedgg634r6", foto_post: "https://i.imgur.com/blG3zVL.jpeg", code: "" },
  { id: 173, text: "Decolorante y peroxido kuul $219", fecha: "2025-10-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=173", url_tienda: "", foto_post: "https://i.imgur.com/tANeGYS.jpeg", code: "" },
  { id: 170, text: "Come todo Rebel wings ", fecha: "2025-10-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=170", url_tienda: "", foto_post: "https://i.imgur.com/k4JQaHi.jpeg", code: "" },
  { id: 172, text: "4 churros", fecha: "2025-10-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=172", url_tienda: "", foto_post: "https://i.imgur.com/k9QNzTo.jpeg", code: "" },
  { id: 171, text: "Come todo alinfinitas Rebels wings", fecha: "2025-10-31", hora: "", link: "https://routicket.com/cupon/?id_cupon=171", url_tienda: "", foto_post: "https://i.imgur.com/J8CoIsM.jpeg", code: "" }
]

function App() {
  const { t } = useTranslation()
  const [favorites, setFavorites] = useKV<number[]>('deal-favorites', [])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expiring'>('all')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [selectedDeal, setSelectedDeal] = useState<DealWithStatus | null>(null)
  const [showPolarisDemo, setShowPolarisDemo] = useState(false)

  const allDeals = useMemo(() => {
    const enhanced = enhanceDeals(DEALS_DATA)
    return sortDealsByExpiration(enhanced)
  }, [])

  const filteredDeals = useMemo(() => {
    return filterDeals(allDeals, searchQuery, showOnlyFavorites, favorites || [], statusFilter)
  }, [allDeals, searchQuery, showOnlyFavorites, favorites, statusFilter])

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      const currentFavorites = current || []
      if (currentFavorites.includes(id)) {
        return currentFavorites.filter(fid => fid !== id)
      }
      return [...currentFavorites, id]
    })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setStatusFilter('all')
    setShowOnlyFavorites(false)
  }

  const activeFiltersCount = [
    searchQuery !== '',
    statusFilter !== 'all',
    showOnlyFavorites
  ].filter(Boolean).length

  return (
    <div className="min-h-screen bg-background">
      <Toaster />
      
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {t('app.title')}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('app.subtitle')}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Button
                  variant={showOnlyFavorites ? 'default' : 'outline'}
                  size="lg"
                  className="relative"
                  onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                >
                  <Heart weight={showOnlyFavorites ? 'fill' : 'regular'} className="w-5 h-5 md:mr-2" />
                  <span className="hidden md:inline">{t('header.favorites')}</span>
                  {(favorites?.length || 0) > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 bg-accent">
                      {favorites?.length || 0}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <SearchBar value={searchQuery} onChange={setSearchQuery} />
              </div>
              <Tabs value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)} className="w-full sm:w-auto">
                <TabsList className="grid w-full grid-cols-3 h-12">
                  <TabsTrigger value="all">{t('filters.all')}</TabsTrigger>
                  <TabsTrigger value="active">{t('filters.active')}</TabsTrigger>
                  <TabsTrigger value="expiring">{t('filters.expiring')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {activeFiltersCount > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-muted-foreground">
                  {t('header.dealsFound', { count: filteredDeals.length })}
                </span>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <Funnel className="w-4 h-4 mr-2" />
                  {t('header.clearFilters')}
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <AnimatePresence mode="wait">
          {filteredDeals.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EmptyState
                type={showOnlyFavorites && (favorites?.length || 0) === 0 ? 'favorites' : 'search'}
                onClearFilters={activeFiltersCount > 0 ? clearFilters : undefined}
              />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="masonry-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {filteredDeals.map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  isFavorite={(favorites || []).includes(deal.id)}
                  onToggleFavorite={toggleFavorite}
                  onViewDetails={setSelectedDeal}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shopify Polaris Integration Demo */}
        <Collapsible open={showPolarisDemo} onOpenChange={setShowPolarisDemo}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full justify-between"
            >
              <span className="flex items-center gap-2">
                <Badge variant="secondary">New</Badge>
                Shopify Polaris Design System Demo
              </span>
              <motion.div
                animate={{ rotate: showPolarisDemo ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <CaretDown className="w-4 h-4" />
              </motion.div>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4">
            <PolarisDemo />
          </CollapsibleContent>
        </Collapsible>
      </main>

      <DealDetailModal
        deal={selectedDeal}
        isOpen={!!selectedDeal}
        onClose={() => setSelectedDeal(null)}
        isFavorite={selectedDeal ? (favorites || []).includes(selectedDeal.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  )
}

export default App