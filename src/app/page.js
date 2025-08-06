// src/app/page.js

import ProductCard from '@/components/ProductCard';

async function getProducts() {
  // 这里的 fetch 地址是关键！
  // 它是一个相对路径，直接调用我们项目内部的 API
  // 这样做不会有任何网络超时或 CORS 问题！
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/products`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    // 这个错误会显示在 Next.js 的错误覆盖层上
    throw new Error('Failed to fetch products data.');
  }

  return response.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="container mx-auto px-4 py-12 md:py-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            全球股票指标商城
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
            用专业量化指标，驱动您的交易决策
          </p>
        </header>

        <div className="space-y-12">
          {products && products.length > 0 ? (
            products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center text-gray-500">当前没有产品。</p>
          )}
        </div>
      </main>
    </div>
  );
}