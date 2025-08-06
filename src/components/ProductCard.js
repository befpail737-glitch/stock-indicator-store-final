// 'use client' 指令是必须的，因为它告诉Next.js这个组件需要在用户的浏览器中运行，
// 这样我们才能使用 useState (用于处理点击) 等交互功能。
'use client';

import { useState } from 'react';
import Image from 'next/image'; // 使用Next.js优化的Image组件，可以自动处理图片大小和加载

// 这就是我们的产品卡片组件
// 它接收一个名为 product 的 "prop" (属性)，其中包含了单个产品的所有信息
export default function ProductCard({ product }) {
  // 使用 useState 来创建一个状态变量，追踪二维码是否应该被放大显示
  // 初始值为 false (不显示)
  const [showQr, setShowQr] = useState(false);

  return (
    // 卡片的根容器，使用Tailwind CSS设置边框、圆角、内边距、阴影和背景色
    <div className="border rounded-lg p-6 shadow-lg bg-white">
      {/* 产品名称和描述 */}
      <h2 className="text-2xl font-bold mb-2 text-gray-800">{product.name}</h2>
      <p className="text-gray-600 mb-6">{product.description}</p>
      
      {/* 使用flex布局，让左右两栏并排显示，并在移动端变为垂直堆叠 */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* 左侧栏：指标效果图 */}
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-3">指标效果图</h3>
          <div className="relative w-full h-80 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
            {product.mainImage ? (
              // 如果产品有主图，就使用Next.js的Image组件显示它
              <Image 
                src={product.mainImage} 
                alt={product.name + " 效果图"} 
                fill // 使用 fill 属性自动填充父容器
                style={{ objectFit: 'contain' }} // 保持图片比例
                className="rounded-md" 
              />
            ) : (
              // 如果没有图片 (mainImage为null)，则显示一个占位提示
              <span className="text-gray-500">请上传产品效果图</span>
            )}
          </div>
        </div>

        {/* 右侧栏：购买信息和联系方式 */}
        <div className="w-full md:w-80 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-3">联系与购买</h3>
            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium">扫码咨询:</p>
              {/* 二维码缩略图，点击后会触发 setShowQr(true) 来显示放大的弹窗 */}
              <Image 
                src={product.qrCode} 
                alt="联系二维码" 
                width={64} // 明确指定宽高
                height={64}
                className="cursor-pointer transform hover:scale-110 transition-transform duration-200"
                onClick={() => setShowQr(true)}
              />
            </div>

            <form className="space-y-4">
              <p className="font-medium">或留下您的联系方式，我们会主动联系您:</p>
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">微信号 / WhatsApp / Telegram</label>
                <input type="text" id="contact" name="contact" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="您的联系号码"/>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                提交联系方式
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* 点击后放大的二维码弹窗 */}
      {/* 只有在 showQr 为 true 时，这个弹窗才会渲染 */}
      {showQr && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setShowQr(false)} // 点击弹窗背景任意位置，都会关闭它
        >
          {/* 添加一个内层div来防止点击图片本身也关闭弹窗 */}
          <div className="relative" onClick={(e) => e.stopPropagation()}> 
            <Image 
              src={product.qrCode} 
              alt="放大的联系二维码" 
              width={400} 
              height={400} 
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}