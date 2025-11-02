<template>
  <div class="card">
    <div class="mb-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            配置选项
          </h2>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            自定义应用行为和外观设置
          </p>
        </div>
        <button
          @click="resetToDefaults"
          class="btn btn-secondary text-xs px-3 py-1"
          title="重置所有配置"
        >
          重置配置
        </button>
      </div>
    </div>
    
    <div class="space-y-6">
      <!-- 自动复制设置 -->
      <div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex-1">
          <label for="autoCopy" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            自动复制结果
          </label>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            编码完成后自动将结果复制到剪贴板
          </p>
        </div>
        <div class="ml-4">
          <input
            id="autoCopy"
            type="checkbox"
            v-model="localConfig.autoCopy"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
      </div>

      <!-- 主题设置 -->
      <div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex-1">
          <label for="theme" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            深色主题
          </label>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            切换到深色模式，保护眼睛并在夜间更舒适
          </p>
        </div>
        <div class="ml-4 flex items-center">
          <button
            @click="toggleTheme"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            :class="isDarkMode ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-700'"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200"
              :class="isDarkMode ? 'translate-x-6' : 'translate-x-1'"
            />
          </button>
          <svg 
            v-if="isDarkMode" 
            class="ml-2 h-4 w-4 text-yellow-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
          </svg>
          <svg 
            v-else 
            class="ml-2 h-4 w-4 text-gray-500" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
          </svg>
        </div>
      </div>

      <!-- 最后使用的编码器 -->
      <div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex-1">
          <label for="lastEncoder" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            默认编码类型
          </label>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            应用启动时默认选择的编码类型
          </p>
        </div>
        <div class="ml-4">
          <select
            id="lastEncoder"
            v-model="localConfig.lastUsedEncoder"
            class="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="base64">Base64</option>
            <option value="url-encode">URL编码</option>
            <option value="json-format">JSON格式化</option>
          </select>
        </div>
      </div>

      <!-- 最大输入长度 -->
      <div class="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
        <div class="flex-1">
          <label for="maxLength" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            最大输入长度
          </label>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            限制输入文本的最大字符数，防止性能问题
          </p>
        </div>
        <div class="ml-4">
          <select
            id="maxLength"
            v-model.number="localConfig.maxInputLength"
            class="text-sm border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option :value="5000">5,000 字符</option>
            <option :value="10000">10,000 字符</option>
            <option :value="50000">50,000 字符</option>
            <option :value="100000">100,000 字符</option>
          </select>
        </div>
      </div>

      <!-- 自动保存 -->
      <div class="flex items-center justify-between py-3">
        <div class="flex-1">
          <label for="autoSave" class="text-sm font-medium text-gray-700 dark:text-gray-300">
            自动保存设置
          </label>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            配置更改后自动保存到本地存储
          </p>
        </div>
        <div class="ml-4">
          <input
            id="autoSave"
            type="checkbox"
            v-model="localConfig.autoSave"
            class="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
          />
        </div>
      </div>
    </div>

    <!-- 配置状态信息 -->
    <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>配置版本: {{ configVersion }}</span>
        <span>存储状态: {{ storageStatus }}</span>
        <span>最后保存: {{ lastSaved }}</span>
      </div>
    </div>

    <!-- 导入导出功能 -->
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap gap-2">
        <button
          @click="exportConfig"
          class="btn btn-secondary text-xs px-3 py-2"
          title="导出配置"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          导出
        </button>
        <label
          for="importConfig"
          class="btn btn-secondary text-xs px-3 py-2 cursor-pointer"
          title="导入配置"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
          </svg>
          导入
          <input
            id="importConfig"
            type="file"
            accept=".json"
            @change="handleImport"
            class="hidden"
          />
        </label>
        <button
          @click="clearAllData"
          class="btn btn-danger text-xs px-3 py-2 text-red-600 hover:text-red-700"
          title="清除所有数据"
        >
          <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
          </svg>
          清除数据
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useStorage } from '../composables/useStorage.js'

// Props
const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      autoCopy: false,
      theme: 'light',
      lastUsedEncoder: 'base64',
      maxInputLength: 10000,
      autoSave: true
    })
  }
})

// Emits
const emit = defineEmits(['update:config', 'reset', 'export', 'import', 'clear'])

// 本地状态
const localConfig = ref({ ...props.config })
const isDarkMode = ref(props.config.theme === 'dark')
const storageStatus = ref('就绪')
const lastSaved = ref('刚刚')

// 组合式函数
const { saveConfig, loadConfig, clearConfig, exportConfig: exportConfigFile, importConfig: importConfigFile } = useStorage()

// 计算属性
const configVersion = computed(() => '1.0.0')

// 监听配置变化
watch(localConfig, (newConfig) => {
  emit('update:config', newConfig)
  
  // 自动保存
  if (newConfig.autoSave) {
    handleAutoSave()
  }
}, { deep: true })

// 监听props变化
watch(() => props.config, (newConfig) => {
  localConfig.value = { ...newConfig }
  isDarkMode.value = newConfig.theme === 'dark'
}, { deep: true })

// 主题切换
const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  localConfig.value.theme = isDarkMode.value ? 'dark' : 'light'
  
  // 直接应用主题变化
  document.documentElement.classList.toggle('dark', isDarkMode.value)
}

// 重置到默认值
const resetToDefaults = () => {
  if (confirm('确定要重置所有配置为默认值吗？此操作不可撤销。')) {
    localConfig.value = {
      autoCopy: false,
      theme: 'light',
      lastUsedEncoder: 'base64',
      maxInputLength: 10000,
      autoSave: true
    }
    isDarkMode.value = false
    document.documentElement.classList.remove('dark')
    emit('reset')
  }
}

// 自动保存
const handleAutoSave = async () => {
  try {
    storageStatus.value = '保存中...'
    await saveConfig(localConfig.value)
    storageStatus.value = '已保存'
    lastSaved.value = new Date().toLocaleTimeString()
    
    // 2秒后重置状态
    setTimeout(() => {
      storageStatus.value = '就绪'
    }, 2000)
  } catch (error) {
    storageStatus.value = '保存失败'
    console.error('自动保存失败:', error)
  }
}

// 导出配置
const exportConfig = async () => {
  try {
    storageStatus.value = '导出中...'
    await exportConfigFile()
    storageStatus.value = '导出完成'
    emit('export')
    
    setTimeout(() => {
      storageStatus.value = '就绪'
    }, 2000)
  } catch (error) {
    storageStatus.value = '导出失败'
    console.error('导出配置失败:', error)
  }
}

// 导入配置
const handleImport = async (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  try {
    storageStatus.value = '导入中...'
    await importConfigFile(file)
    
    // 重新加载配置
    const newConfig = await loadConfig()
    localConfig.value = newConfig
    isDarkMode.value = newConfig.theme === 'dark'
    
    storageStatus.value = '导入完成'
    emit('import')
    
    setTimeout(() => {
      storageStatus.value = '就绪'
    }, 2000)
  } catch (error) {
    storageStatus.value = '导入失败'
    console.error('导入配置失败:', error)
    alert('导入配置失败：' + error.message)
  } finally {
    // 清除文件输入
    event.target.value = ''
  }
}

// 清除所有数据
const clearAllData = async () => {
  if (confirm('确定要清除所有保存的数据吗？这将删除所有配置和历史记录。此操作不可撤销。')) {
    try {
      storageStatus.value = '清除中...'
      await clearConfig()
      
      // 重置配置
      localConfig.value = {
        autoCopy: false,
        theme: 'light',
        lastUsedEncoder: 'base64',
        maxInputLength: 10000,
        autoSave: true
      }
      isDarkMode.value = false
      document.documentElement.classList.remove('dark')
      
      storageStatus.value = '已清除'
      emit('clear')
      
      setTimeout(() => {
        storageStatus.value = '就绪'
      }, 2000)
    } catch (error) {
      storageStatus.value = '清除失败'
      console.error('清除数据失败:', error)
    }
  }
}
</script>

<style scoped>
.btn-danger {
  @apply border border-red-300 text-red-600 hover:bg-red-50 focus:ring-red-500;
}

.dark .btn-danger {
  @apply border-red-600 text-red-400 hover:bg-red-900/20;
}
</style>