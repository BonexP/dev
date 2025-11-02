<template>
  <div class="card">
    <div class="mb-6">
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        输入配置
      </h2>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        输入要处理的内容，选择编码类型，结果将实时显示
      </p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- 输入文本框 - v-model双向绑定 -->
      <div class="form-group">
        <label for="inputText" class="form-label">
          输入内容
          <span class="ml-2 text-xs text-gray-500">(实时编码)</span>
        </label>
        <textarea
          id="inputText"
          v-model="localInput"
          class="form-textarea"
          rows="4"
          placeholder="请输入要处理的内容..."
          :disabled="isProcessing"
          maxlength="10000"
        ></textarea>
        <div class="mt-1 flex items-center justify-between text-xs">
          <span :class="characterCountClass">
            字符数: {{ localInput.length }}/10000
          </span>
          <span v-if="isProcessing" class="text-blue-500 flex items-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            正在处理...
          </span>
        </div>
      </div>

      <!-- 编码类型选择 - v-model双向绑定 -->
      <div class="form-group">
        <label for="encoderType" class="form-label">
          编码类型
          <span class="ml-2 text-xs text-gray-500">
            ({{ selectedEncoderInfo?.description || '选择编码方式' }})
          </span>
        </label>
        <select
          id="encoderType"
          v-model="localEncoderType"
          class="form-select"
          :disabled="isProcessing"
        >
          <option value="base64">Base64 编码/解码</option>
          <option value="url-encode">URL 编码/解码</option>
          <option value="json-format">JSON 格式化</option>
        </select>
      </div>

      <!-- 快捷操作按钮 -->
      <div class="flex flex-wrap gap-2">
        <button
          type="button"
          @click="clearInput"
          class="btn btn-secondary text-xs px-3 py-1"
          :disabled="isProcessing || !localInput"
        >
          清空输入
        </button>
        <button
          type="button"
          @click="pasteFromClipboard"
          class="btn btn-secondary text-xs px-3 py-1"
          :disabled="isProcessing"
        >
          从剪贴板粘贴
        </button>
        <button
          type="button"
          @click="loadExample"
          class="btn btn-secondary text-xs px-3 py-1"
          :disabled="isProcessing"
        >
          加载示例
        </button>
      </div>

      <!-- 状态指示器 -->
      <div v-if="inputError" class="alert alert-error">
        <svg class="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
        </svg>
        {{ inputError }}
      </div>

      <!-- 输入提示 -->
      <div v-if="showHints && localInput && !inputError" class="bg-blue-50 border border-blue-200 rounded-md p-3">
        <div class="flex">
          <svg class="h-5 w-5 text-blue-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
          </svg>
          <div class="text-sm text-blue-700">
            <p class="font-medium">提示</p>
            <p>选择 "URL解码" 可以对Base64编码的结果进行URL编码</p>
            <p>JSON格式化需要有效的JSON格式输入</p>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useClipboard } from '../composables/useClipboard.js'

// Props
const props = defineProps({
  input: {
    type: String,
    default: ''
  },
  encoderType: {
    type: String,
    default: 'base64'
  },
  isProcessing: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits([
  'update:input',
  'update:encoder-type',
  'submit',
  'error'
])

// 本地状态
const localInput = ref(props.input)
const localEncoderType = ref(props.encoderType)
const inputError = ref('')
const showHints = ref(true)

// 组合式函数
const { copyToClipboard } = useClipboard()

// 编码器信息
const selectedEncoderInfo = computed(() => {
  const encoders = {
    'base64': {
      description: '将文本转换为Base64编码格式，适用于URL、Cookie等场景'
    },
    'url-encode': {
      description: '将特殊字符编码为%开头的URL安全格式'
    },
    'json-format': {
      description: '美化JSON格式，提高可读性'
    }
  }
  return encoders[localEncoderType.value]
})

// 字符数颜色类
const characterCountClass = computed(() => {
  const length = localInput.value.length
  if (length > 9000) return 'text-red-500'
  if (length > 5000) return 'text-yellow-500'
  return 'text-gray-500'
})

// 监听props变化
watch(() => props.input, (newValue) => {
  localInput.value = newValue
})

watch(() => props.encoderType, (newValue) => {
  localEncoderType.value = newValue
})

// 同步到父组件 - v-model机制
watch(localInput, (newValue) => {
  // 清除错误状态
  inputError.value = ''
  emit('update:input', newValue)
})

watch(localEncoderType, (newValue) => {
  emit('update:encoder-type', newValue)
})

// 处理提交
const handleSubmit = () => {
  validateInput()
  if (!inputError.value) {
    emit('submit')
  }
}

// 输入验证
const validateInput = () => {
  const input = localInput.value.trim()
  
  if (!input) {
    inputError.value = '请输入要处理的内容'
    return false
  }
  
  if (input.length > 10000) {
    inputError.value = '输入内容过长，最大支持10000字符'
    return false
  }
  
  // JSON格式检查
  if (localEncoderType.value === 'json-format') {
    try {
      JSON.parse(input)
    } catch (error) {
      inputError.value = '输入内容不是有效的JSON格式'
      return false
    }
  }
  
  inputError.value = ''
  return true
}

// 清空输入
const clearInput = () => {
  localInput.value = ''
  inputError.value = ''
}

// 从剪贴板粘贴
const pasteFromClipboard = async () => {
  try {
    const text = await copyToClipboard.paste() // 这是一个假设的方法，实际需要实现
    localInput.value = text
  } catch (error) {
    inputError.value = '从剪贴板粘贴失败：' + error.message
  }
}

// 加载示例
const loadExample = () => {
  const examples = {
    'base64': 'Hello World! 这是一个示例文本。',
    'url-encode': 'Hello 世界! 特殊字符: @#$%^&*()',
    'json-format': '{"name":"示例","value":123,"enabled":true,"tags":["测试","示例"]}'
  }
  
  const example = examples[localEncoderType.value]
  if (example) {
    localInput.value = example
  }
}
</script>