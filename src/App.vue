<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <div class="container mx-auto px-4 py-8">
      <!-- 应用头部 -->
      <header class="text-center mb-8 fade-in">
        <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-3">
          订阅链接处理工具
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400 mb-2">
          简单、快速、优雅的编码处理工具
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

      <!-- 主要内容区 -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- 编码表单 - MVVM绑定 -->
        <div class="fade-in">
          <EncoderForm
            v-model:input="inputText"
            v-model:encoder-type="encoderType"
            :is-processing="isProcessing"
          />
        </div>
        
        <!-- 结果预览 - 自动更新 -->
        <div class="fade-in">
          <ResultPreview
            :result="encodedResult"
            :error="error"
            :is-loading="isProcessing"
            @copy="handleCopy"
          />
        </div>
      </div>

      <!-- 配置面板 -->
      <div class="fade-in">
        <ConfigPanel
          v-model:config="config"
          @reset="handleReset"
        />
      </div>

      <!-- 页脚信息 -->
      <footer class="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>基于 Vue 3 + Vite + Tailwind CSS 构建</p>
        <p class="mt-1">
          支持 Base64 编码、URL 编码、JSON 格式化等常用编码格式
        </p>
      </footer>
    </div>

    <!-- Toast 提示 -->
    <div
      v-if="toast.show"
      class="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300"
      :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useEncoder } from './composables/useEncoder.js'
import { useClipboard } from './composables/useClipboard.js'
import { useStorage } from './composables/useStorage.js'
import EncoderForm from './components/EncoderForm.vue'
import ResultPreview from './components/ResultPreview.vue'
import ConfigPanel from './components/ConfigPanel.vue'

// 响应式数据 - MVVM核心
const inputText = ref('')
const encoderType = ref('base64')
const isProcessing = ref(false)
const error = ref('')

// Toast 提示状态
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

// 组合式函数
const { processText } = useEncoder()
const { copyToClipboard } = useClipboard()
const { saveConfig, loadConfig } = useStorage()

// 计算属性 - 实时编码处理
const encodedResult = ref('')

// 监听输入变化，实时处理编码
watch([inputText, encoderType], async ([newInput, newType]) => {
  if (!newInput.trim()) {
    encodedResult.value = ''
    return
  }
  
  isProcessing.value = true
  error.value = ''
  
  try {
    const result = await processText(newInput, newType)
    encodedResult.value = result
    
    // 如果启用了自动复制
    if (config.value.autoCopy && result) {
      try {
        await copyToClipboard(result)
        showToast('已复制到剪贴板', 'success')
      } catch (err) {
        console.warn('自动复制失败:', err)
      }
    }
  } catch (err) {
    error.value = err instanceof Error ? err.message : '处理失败'
    encodedResult.value = ''
  } finally {
    isProcessing.value = false
  }
}, { immediate: true })

// 配置管理
const config = ref({
  autoCopy: false,
  theme: 'light',
  lastUsedEncoder: 'base64',
  maxInputLength: 10000,
  autoSave: true
})

// 初始化配置
const initializeConfig = async () => {
  try {
    const savedConfig = await loadConfig()
    config.value = savedConfig
    encoderType.value = savedConfig.lastUsedEncoder || 'base64'
    
    // 应用主题
    if (savedConfig.theme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  } catch (error) {
    console.error('初始化配置失败:', error)
    showToast('配置加载失败，使用默认设置', 'error')
  }
}

// 监听配置变化，保存到本地存储
watch(() => config.value, (newConfig) => {
  if (newConfig.autoSave) {
    saveConfig(newConfig).catch(error => {
      console.error('保存配置失败:', error)
    })
  }
  
  // 监听主题变化
  document.documentElement.classList.toggle('dark', newConfig.theme === 'dark')
}, { deep: true })

// 复制功能
const handleCopy = async () => {
  if (encodedResult.value) {
    try {
      await copyToClipboard(encodedResult.value)
      showToast('已复制到剪贴板', 'success')
    } catch (err) {
      showToast('复制失败：' + err.message, 'error')
    }
  }
}

// 重置功能
const handleReset = () => {
  inputText.value = ''
  encoderType.value = 'base64'
  error.value = ''
  encodedResult.value = ''
  showToast('已重置所有输入', 'success')
}

// Toast 提示
const showToast = (message, type = 'success') => {
  toast.value = {
    show: true,
    message,
    type
  }
  
  setTimeout(() => {
    toast.value.show = false
  }, 3000)
}

// 生命周期
onMounted(() => {
  initializeConfig()
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
</style>