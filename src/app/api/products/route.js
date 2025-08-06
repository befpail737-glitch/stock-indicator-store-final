// src/app/api/products/route.js

import { NextResponse } from 'next/server';

// 这段代码定义了当有人访问 /api/products 这个地址时，应该做什么
export async function GET(request) {
  try {
    // process.env.INDICATOR_STORE 是我们在 Cloudflare 上绑定的 KV 数据库
    // 在本地开发时，我们需要一个不同的方式来访问它，但部署后这个代码会生效
    const kv = process.env.INDICATOR_STORE;

    const listResult = await kv.list();
    
    const products = [];
    for (const key of listResult.keys) {
      const productValue = await kv.get(key.name, { type: 'json' });
      if (productValue) {
        products.push(productValue);
      }
    }

    // 使用 NextResponse.json 来返回一个标准的 JSON 响应
    return NextResponse.json(products);

  } catch (error) {
    // 如果出错，在服务器控制台打印错误，并返回一个 500 错误响应
    console.error('API Error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Failed to fetch products', error: error.message }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}