import { MagnifyingGlass, Heart } from '@phosphor-icons/react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  type: 'search' | 'favorites'
  onClearFilters?: () => void
}

export function EmptyState({ type, onClearFilters }: EmptyStateProps) {
  const { t } = useTranslation()
  
  if (type === 'search') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
          <MagnifyingGlass weight="regular" className="w-12 h-12 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{t('search.noResults')}</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          {t('search.noResultsDescription')}
        </p>
        {onClearFilters && (
          <Button onClick={onClearFilters}>
            {t('search.clearFilters')}
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6">
        <Heart weight="regular" className="w-12 h-12 text-accent" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{t('favorites.empty')}</h3>
      <p className="text-muted-foreground max-w-sm">
        {t('favorites.emptyDescription')}
      </p>
    </div>
  )
}
