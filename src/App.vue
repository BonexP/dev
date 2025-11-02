<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div class="container mx-auto px-4 py-8">
      <!-- 应用头部 -->
      <header class="text-center mb-8 fade-in">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          订阅转换器
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-4">
          订阅链接转换与管理工具
        </p>
        <div class="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <span class="inline-flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
            实时双向绑定
          </span>
          <span class="mx-3">•</span>
          <span class="inline-flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            安全可靠
          </span>
          <span class="mx-3">•</span>
          <span class="inline-flex items-center">
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
            轻量高效
          </span>
        </div>
      </header>

      <!-- 订阅转换器内容 -->
      <div class="fade-in">
        <SubscriptionConverter />
      </div>

      <!-- 页脚信息 -->
      <footer class="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>基于 Vue 3 + Vite + Tailwind CSS 构建</p>
        <p class="mt-1">
          支持多种订阅客户端格式转换和高级配置选项
        </p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SubscriptionConverter from './components/SubscriptionConverter.vue'

// Toast 提示状态
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})
</script>

<style scoped>
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 模式切换按钮动画 */
.mode-button {
  transition: all 0.2s ease-in-out;
}

.mode-button:hover {
  transform: translateY(-1px);
}

/* 自定义滚动条 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 暗色模式滚动条 */
.dark ::-webkit-scrollbar-track {
  background: #374151;
}

.dark ::-webkit-scrollbar-thumb {
  background: #6b7280;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>