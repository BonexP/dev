<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8 max-w-4xl">
      <!-- 应用头部 -->
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          订阅转换器
          <a href="https://github.com/sub-converter" target="_blank" class="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </h1>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          订阅链接转换与管理工具
        </div>
      </header>

      <!-- 主要内容区域 -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <!-- 模式设置 -->
        <div class="mb-6">
          <label class="text-base font-medium text-gray-900 dark:text-white block mb-3">模式设置:</label>
          <div class="flex flex-col sm:flex-row gap-4">
            <label class="flex items-center">
              <input
                v-model="isAdvanced"
                :value="false"
                type="radio"
                class="form-radio h-4 w-4 text-blue-600"
              >
              <span class="ml-2 text-gray-700 dark:text-gray-300">基础模式</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="isAdvanced"
                :value="true"
                type="radio"
                class="form-radio h-4 w-4 text-blue-600"
              >
              <span class="ml-2 text-gray-700 dark:text-gray-300">进阶模式</span>
            </label>
          </div>
        </div>

        <!-- 订阅链接输入 -->
        <div class="mb-6">
          <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">订阅链接:</label>
          <textarea
            v-model="form.sourceSubUrl"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="支持订阅或ss/ssr/vmess链接，多个链接每行一个或用 | 分隔"
            @blur="saveSubUrl"
          ></textarea>
        </div>

        <!-- 客户端选择 -->
        <div class="mb-6">
          <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">客户端:</label>
          <select
            v-model="form.clientType"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option v-for="(value, key) in clientTypes" :key="key" :value="value">{{ key }}</option>
          </select>
        </div>

        <!-- 进阶模式配置 -->
        <div v-if="isAdvanced" class="space-y-6">
          <!-- 后端地址 -->
          <div>
            <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">后端地址:</label>
            <div class="flex gap-2">
              <input
                v-model="form.customBackend"
                type="text"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="动动小手，（建议）自行搭建后端服务。例：http://127.0.0.1:25500/sub?"
              >
              <a
                href="https://github.com/sub-converter"
                target="_blank"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                前往项目仓库
              </a>
            </div>
          </div>

          <!-- 远程配置 -->
          <div>
            <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">远程配置:</label>
            <div class="flex gap-2">
              <select
                v-model="form.remoteConfig"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">请选择</option>
                <optgroup v-for="group in remoteConfigs" :key="group.label" :label="group.label">
                  <option v-for="item in group.options" :key="item.value" :value="item.value">{{ item.label }}</option>
                </optgroup>
              </select>
              <a
                href="#"
                class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
                配置示例
              </a>
            </div>
          </div>

          <!-- Include/Exclude -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">Include:</label>
              <input
                v-model="form.includeRemarks"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="节点名包含的关键字，支持正则"
              >
            </div>
            <div>
              <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">Exclude:</label>
              <input
                v-model="form.excludeRemarks"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="节点名不包含的关键字，支持正则"
              >
            </div>
          </div>

          <!-- 文件名 -->
          <div>
            <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">FileName:</label>
            <input
              v-model="form.filename"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="返回的订阅文件名"
            >
          </div>

          <!-- 自定义参数 -->
          <div>
            <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">自定义参数:</label>
            <div v-for="(param, index) in customParams" :key="index" class="flex gap-2 mb-2">
              <input
                v-model="param.name"
                type="text"
                placeholder="参数名"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
              <span class="px-2 py-2 text-gray-500">:</span>
              <input
                v-model="param.value"
                type="text"
                placeholder="参数值"
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
              >
              <button
                @click="removeCustomParam(index)"
                class="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
            <button
              @click="addCustomParam"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd"></path>
              </svg>
              添加自定义参数
            </button>
          </div>

          <!-- 更多选项 -->
          <div class="space-y-4">
            <div class="flex flex-wrap gap-4">
              <label class="flex items-center">
                <input v-model="form.nodeList" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                <span class="ml-2 text-gray-700 dark:text-gray-300">输出为 Node List</span>
              </label>
              
              <!-- 更多选项下拉菜单 -->
              <div class="relative">
                <button
                  @click="showMoreOptions = !showMoreOptions"
                  class="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  更多选项
                  <svg class="w-4 h-4 ml-1 inline" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </button>
                <div v-if="showMoreOptions" class="absolute z-10 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-600">
                  <div class="py-2 space-y-2">
                    <label class="flex items-center px-3">
                      <input v-model="form.emoji" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                      <span class="ml-2 text-gray-700 dark:text-gray-300">Emoji</span>
                    </label>
                    <label class="flex items-center px-3">
                      <input v-model="form.scv" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                      <span class="ml-2 text-gray-700 dark:text-gray-300">跳过证书验证</span>
                    </label>
                    <label class="flex items-center px-3">
                      <input v-model="form.udp" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                      <span class="ml-2 text-gray-700 dark:text-gray-300">启用 UDP</span>
                    </label>
                    <label class="flex items-center px-3">
                      <input v-model="form.appendType" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                      <span class="ml-2 text-gray-700 dark:text-gray-300">节点类型</span>
                    </label>
                    <label class="flex items-center px-3">
                      <input v-model="form.sort" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                      <span class="ml-2 text-gray-700 dark:text-gray-300">排序节点</span>
                    </label>
                    <label class="flex items-center px-3">
                      <input v-model="form.fdn" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                      <span class="ml-2 text-gray-700 dark:text-gray-300">过滤非法节点</span>
                    </label>
                    <label class="flex items-center px-3">
                      <input v-model="form.expand" type="checkbox" class="form-checkbox h-4 w-4 text-blue-600">
                      <span class="ml-2 text-gray-700 dark:text-gray-300">规则展开</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分隔线 -->
        <div class="my-8 border-t border-gray-300 dark:border-gray-600 flex items-center justify-center">
          <div class="bg-white dark:bg-gray-800 px-4 -mt-2 text-gray-500 dark:text-gray-400">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>

        <!-- 生成结果 -->
        <div class="space-y-4">
          <div>
            <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">定制订阅:</label>
            <div class="flex gap-2">
              <input
                v-model="customSubUrl"
                type="text"
                readonly
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="生成的订阅链接将在此显示"
              >
              <button
                @click="copyToClipboard(customSubUrl)"
                :disabled="!customSubUrl"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
                复制
              </button>
            </div>
          </div>

          <div>
            <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">订阅短链:</label>
            <div class="flex gap-2">
              <input
                v-model="shortSubUrl"
                type="text"
                readonly
                class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="生成的短链接将在此显示"
              >
              <button
                @click="copyToClipboard(shortSubUrl)"
                :disabled="!shortSubUrl"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
              >
                <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                  <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                </svg>
                复制
              </button>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            @click="generateUrl"
            :disabled="!form.sourceSubUrl"
            class="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 font-medium"
          >
            生成订阅链接
          </button>
          <button
            @click="generateShortUrl"
            :loading="loading"
            :disabled="!customSubUrl"
            class="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-red-500 font-medium flex items-center"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            生成短链接
          </button>
          <button
            @click="showUploadDialog = true"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
            </svg>
            上传配置
          </button>
          <button
            @click="importToClash"
            :disabled="!customSubUrl"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
            </svg>
            一键导入 Clash
          </button>
          <button
            @click="showParseDialog = true"
            class="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            从 URL 解析
          </button>
        </div>
      </div>

      <!-- 上传配置对话框 -->
      <div v-if="showUploadDialog" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showUploadDialog = false"></div>
          <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    Remote config upload
                  </h3>
                  <div class="mt-4">
                    <textarea
                      v-model="uploadConfig"
                      rows="15"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="请输入配置文件内容..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="uploadConfigAndClose"
                :disabled="!uploadConfig"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                确定
              </button>
              <button
                @click="showUploadDialog = false; uploadConfig = ''"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 解析URL对话框 -->
      <div v-if="showParseDialog" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showParseDialog = false"></div>
          <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
            <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    解析 Subconverter 链接
                  </h3>
                  <div class="mt-4">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">订阅链接：</label>
                    <input
                      v-model="loadConfig"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="请输入要解析的订阅链接..."
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                @click="confirmParseConfig"
                :disabled="!loadConfig"
                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                确定
              </button>
              <button
                @click="showParseDialog = false; loadConfig = ''"
                class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-600 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 通知提示 -->
      <div
        v-if="toast.show"
        class="fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300"
        :class="toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
      >
        {{ toast.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useSubscriptionConverter } from '../composables/useSubscriptionConverter.js'
import { useClipboard } from '../composables/useClipboard.js'

// 使用订阅转换器组合式函数
const {
  isAdvanced,
  loading,
  customSubUrl,
  shortSubUrl,
  form,
  customParams,
  clientTypes,
  remoteConfigs,
  makeUrl,
  makeShortUrl,
  addCustomParam,
  removeCustomParam,
  parseSubscriptionUrl,
  uploadRemoteConfig,
  clashInstall,
  surgeInstall
} = useSubscriptionConverter()

// 使用剪贴板组合式函数
const { copyToClipboard } = useClipboard()

// 本地状态
const showMoreOptions = ref(false)
const showUploadDialog = ref(false)
const showParseDialog = ref(false)
const uploadConfig = ref('')
const loadConfig = ref('')

// Toast通知
const toast = ref({
  show: false,
  message: '',
  type: 'success'
})

// 显示通知
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

// 生成订阅链接
const generateUrl = () => {
  try {
    const url = makeUrl()
    showToast('定制订阅已复制到剪贴板', 'success')
  } catch (error) {
    showToast(error.message, 'error')
  }
}

// 生成短链接
const generateShortUrl = async () => {
  try {
    await makeShortUrl()
    showToast('短链接已复制到剪贴板', 'success')
  } catch (error) {
    showToast(error.message, 'error')
  }
}

// 解析配置
const parseConfig = async () => {
  try {
    await parseSubscriptionUrl()
    showParseDialog.value = false
    showToast('长/短链接已成功解析为订阅信息', 'success')
  } catch (error) {
    showToast(error.message, 'error')
  }
}

// 上传远程配置
const uploadConfigAndClose = async () => {
  try {
    await uploadRemoteConfig()
    showUploadDialog.value = false
    uploadConfig.value = ''
    showToast('远程配置上传成功，配置链接已复制到剪贴板，有效期三个月望知悉', 'success')
  } catch (error) {
    showToast(error.message, 'error')
  }
}

// 导入到Clash
const importToClash = () => {
  try {
    clashInstall()
  } catch (error) {
    showToast(error.message, 'error')
  }
}

// 导入到Surge
const importToSurge = () => {
  try {
    surgeInstall()
  } catch (error) {
    showToast(error.message, 'error')
  }
}

// 保存订阅URL（模拟本地存储）
const saveSubUrl = () => {
  // 这里可以实现本地存储功能
  console.log('保存订阅URL:', form.value.sourceSubUrl)
}
</script>

<style scoped>
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

/* 动画效果 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>