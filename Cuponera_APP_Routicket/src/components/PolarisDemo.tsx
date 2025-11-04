/**
 * Shopify Polaris Web Components Demo
 * 
 * This component demonstrates the integration of Shopify Polaris web components
 * into a React application. Polaris web components are standard custom HTML elements
 * that provide Shopify's official design system styling and behavior.
 * 
 * Reference: https://shopify.dev/docs/api/app-home/using-polaris-components
 */

import { Card } from '@/components/ui/card'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      's-section': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { heading?: string }, HTMLElement>
      's-text-field': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { 
        name?: string
        placeholder?: string
        label?: string
        value?: string
      }, HTMLElement>
      's-paragraph': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
      's-box': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        padding?: string
        background?: string
        border?: string
        borderRadius?: string
      }, HTMLElement>
      's-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        variant?: 'primary' | 'secondary' | 'tertiary'
        size?: 'small' | 'medium' | 'large'
      }, HTMLElement>
      's-banner': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        title?: string
        tone?: 'success' | 'info' | 'warning' | 'critical'
      }, HTMLElement>
    }
  }
}

export function PolarisDemo() {
  return (
    <Card className="p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Shopify Polaris Web Components</h3>
        <p className="text-sm text-muted-foreground mb-4">
          This section demonstrates the integration of Shopify Polaris design system using web components.
        </p>
      </div>

      {/* Polaris Section Component */}
      <s-section heading="Example Form Section">
        <s-text-field 
          name="example" 
          placeholder="Enter some text..."
          label="Example Input Field"
        />
        <s-paragraph>
          This is a Polaris paragraph component. Polaris web components provide consistent styling
          and behavior across Shopify apps and extensions.
        </s-paragraph>
      </s-section>

      {/* Polaris Box Component */}
      <s-box 
        padding="base" 
        background="subdued" 
        border="base" 
        borderRadius="base"
      >
        <s-paragraph>
          This content is inside a Polaris Box component with subdued background and base padding.
        </s-paragraph>
      </s-box>

      {/* Polaris Banner Component */}
      <s-banner 
        title="Integration Successful" 
        tone="success"
      >
        Shopify Polaris web components are now available throughout the application.
        You can use them alongside your existing React components.
      </s-banner>

      <div className="pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> Polaris web components are loaded via CDN and work seamlessly with React.
          They provide automatic theming, accessibility features, and consistent Shopify design patterns.
        </p>
      </div>
    </Card>
  )
}
