<template>
  <div class="card">
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        结果预览
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        编码结果将在这里实时显示
      </p>
    </div>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="mb-4">
      <div class="flex items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
        <div class="text-center">
          <svg class="animate-spin h-8 w-8 text-blue-500 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p class="text-gray-600 dark:text-gray-400">正在编码处理...</p>
        </div>
      </div>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="mb-4">
      <div class="alert alert-error">
        <svg class="h-5 w-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        <div class="flex-1">
          <p class="font-medium">编码失败</p>
          <p class="text-sm">{{ error }}</p>
        </div>
        <button 
          @click="clearError" 
          class="text-red-500 hover:text-red-700 ml-4"
          title="清除错误"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- 结果显示 -->
    <div v-else-if="result" class="mb-4">
      <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
        <!-- 结果头部 -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <div class="flex items-center">
            <svg class="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span class="text-sm font-medium text-gray-700 dark:text-gray-300">编码结果</span>
          </div>
          <div class="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <span>{{ result.length }} 字符</span>
            <span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
              实时更新
            </span>
          </div>
        </div>
        
        <!-- 结果内容 -->
        <div class="p-4">
          <pre class="whitespace-pre-wrap text-sm text-gray-900 dark:text-gray-100 break-words overflow-auto max-h-64 font-mono">{{ result }}</pre>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="mb-4">
      <div class="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
        <svg class="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">等待输入</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          在左侧输入内容，结果将实时显示在这里
        </p>
        <div class="text-xs text-gray-500 dark:text-gray-500 space-y-1">
          <p>• 输入文本将自动编码</p>
          <p>• 选择不同编码类型可获得不同结果</p>
          <p>• 支持长文本自动换行显示</p>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="space-y-3">
      <!-- 主要操作按钮 -->
      <button
        v-if="result && !isLoading"
        @click="handleCopy"
        :disabled="isCopying"
        class="w-full btn btn-success relative overflow-hidden"
      >
        <span v-if="!isCopying" class="flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          复制结果
        </span>
        <span v-else class="flex items-center justify-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          复制中...
        </span>
      </button>

      <!-- 辅助操作按钮 -->
      <div v-if="result && !isLoading" class="grid grid-cols-3 gap-2">
        <button
          @click="selectAll"
          class="btn btn-secondary text-xs py-2 px-3"
          title="全选结果"
        >
          全选
        </button>
        <button
          @click="downloadResult"
          class="btn btn-secondary text-xs py-2 px-3"
          title="下载结果"
        >
          下载
        </button>
        <button
          @click="clearResult"
          class="btn btn-secondary text-xs py-2 px-3"
          title="清除结果"
        >
          清除
        </button>
      </div>
    </div>

    <!-- 复制成功提示 -->
    <div 
      v-if="copySuccess" 
      class="mt-3 alert alert-success"
    >
      <svg class="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
      </svg>
      <span class="text-sm">已复制到剪贴板</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

// Props
const props = defineProps({
  result: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  isLoading: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['copy', 'clear', 'download'])

// 本地状态
const isCopying = ref(false)
const copySuccess = ref(false)

// 监听结果变化，清除复制成功状态
watch(() => props.result, () => {
  copySuccess.value = false
})

// 处理复制
const handleCopy = async () => {
  if (!props.result) return
  
  isCopying.value = true
  try {
    emit('copy')
    // 模拟复制延迟
    await new Promise(resolve => setTimeout(resolve, 200))
    copySuccess.value = true
    
    // 3秒后自动清除成功提示
    setTimeout(() => {
      copySuccess.value = false
    }, 3000)
  } finally {
    isCopying.value = false
  }
}

// 全选结果
const selectAll = () => {
  // 创建一个临时textarea来选择文本
  const textArea = document.createElement('textarea')
  textArea.value = props.result
  textArea.style.position = 'fixed'
  textArea.style.opacity = '0'
  document.body.appendChild(textArea)
  textArea.select()
  document.execCommand('selectAll')
  document.body.removeChild(textArea)
}

// 下载结果
const downloadResult = () => {
  if (!props.result) return
  
  const blob = new Blob([props.result], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `encoded-result-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.txt`
  
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  emit('download')
}

// 清除结果
const clearResult = () => {
  emit('clear')
}

// 清除错误
const clearError = () => {
  // 这里应该通过父组件来清除错误
  // emit('clear-error')
}
</script>

<style scoped>
.btn-success {
  position: relative;
  overflow: hidden;
}

.btn-success::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: width 0.3s, height 0.3s;
  transform: translate(-50%, -50%);
  z-index: 1;
}

.btn-success:active::after {
  width: 300px;
  height: 300px;
}

.btn-success span {
  position: relative;
  z-index: 2;
}
</style>