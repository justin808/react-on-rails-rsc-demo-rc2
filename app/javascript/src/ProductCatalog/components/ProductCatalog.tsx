import React, { Suspense } from 'react';

interface ProductCatalogProps {
  category?: string;
}

interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  priceCents: number;
  inventory: number;
}

interface ReviewSummaryData {
  rating: number;
  highlights: string[];
}

const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchProducts(category: string): Promise<Product[]> {
  await delay(80);

  return [
    {
      id: 'p-1',
      sku: 'RSC-LAMP',
      name: 'Server-Rendered Desk Lamp',
      description: `Curated in the ${category} collection with zero client JS for listing render.`,
      priceCents: 12900,
      inventory: 17,
    },
    {
      id: 'p-2',
      sku: 'RSC-CHAIR',
      name: 'Async Lounge Chair',
      description: 'Streams its review summary after first paint to keep TTFB fast.',
      priceCents: 24900,
      inventory: 9,
    },
    {
      id: 'p-3',
      sku: 'RSC-DESK',
      name: 'Flight Payload Desk',
      description: 'Designed to demonstrate server-only formatting and nested suspense.',
      priceCents: 38900,
      inventory: 4,
    },
  ];
}

async function fetchReviewSummary(productId: string): Promise<ReviewSummaryData> {
  // Stagger response times to make streaming visible in the browser.
  const waitMs = productId === 'p-1' ? 120 : productId === 'p-2' ? 320 : 540;
  await delay(waitMs);

  return {
    rating: productId === 'p-3' ? 4.9 : 4.7,
    highlights: [
      'Ships without hydrating the parent server component.',
      'Review query executed server-side during render.',
      'Rendered progressively with nested suspense boundaries.',
    ],
  };
}

const ReviewSummary = async ({ productId }: { productId: string }) => {
  const data = await fetchReviewSummary(productId);

  return (
    <div
      style={{
        borderTop: '1px dashed #cbd5e1',
        marginTop: 12,
        paddingTop: 10,
        color: '#334155',
      }}
    >
      <p style={{ margin: '0 0 8px' }}>Average rating: {data.rating.toFixed(1)} / 5</p>
      <ul style={{ margin: 0, paddingLeft: 18 }}>
        {data.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
};

const ProductCatalog = async ({ category = 'featured' }: ProductCatalogProps) => {
  const products = await fetchProducts(category);

  return (
    <section style={{ display: 'grid', gap: 16, marginTop: 18 }}>
      {products.map((product) => (
        <article
          key={product.id}
          style={{
            border: '1px solid #cbd5e1',
            borderRadius: 12,
            padding: 16,
            background: '#f8fafc',
          }}
        >
          <header style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem' }}>{product.name}</h2>
            <span style={{ fontWeight: 600 }}>{money.format(product.priceCents / 100)}</span>
          </header>

          <p style={{ margin: '10px 0', color: '#1e293b' }}>{product.description}</p>
          <p style={{ margin: 0, color: '#475569', fontSize: '0.9rem' }}>Inventory: {product.inventory}</p>
          <Suspense fallback={<p style={{ marginTop: 10, color: '#64748b' }}>Streaming review summary...</p>}>
            <ReviewSummary productId={product.id} />
          </Suspense>
        </article>
      ))}
    </section>
  );
};

export default ProductCatalog;
