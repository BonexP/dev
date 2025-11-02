<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 py-8 max-w-7xl">
      <!-- 应用头部 -->
      <header class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-4 flex items-center justify-center">
          订阅转换编辑器
          <a href="https://github.com/sub-converter" target="_blank" class="ml-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        </h1>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          订阅链接转换与管理工具 - 实时编码 • 智能解析 • 双向同步
        </div>
      </header>

      <!-- 左右分栏布局 -->
      <div class="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
        <!-- 左侧：配置选项区域 -->
        <div class="space-y-4 lg:space-y-6">
          <!-- 模式设置 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-6">
            <h2 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4 flex items-center">
              <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>
              </svg>
              模式设置
            </h2>
            <div class="flex flex-col sm:flex-row gap-3 lg:gap-4">
              <label class="flex items-center">
                <input
                  v-model="isAdvanced"
                  :value="false"
                  type="radio"
                  class="form-radio h-3 w-3 lg:h-4 lg:w-4 text-blue-600"
                >
                <span class="ml-2 text-sm lg:text-base text-gray-700 dark:text-gray-300">基础模式</span>
              </label>
              <label class="flex items-center">
                <input
                  v-model="isAdvanced"
                  :value="true"
                  type="radio"
                  class="form-radio h-3 w-3 lg:h-4 lg:w-4 text-blue-600"
                >
                <span class="ml-2 text-sm lg:text-base text-gray-700 dark:text-gray-300">进阶模式</span>
              </label>
            </div>
          </div>

          <!-- 核心配置 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-6">
            <h2 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4 flex items-center">
              <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                <path d="M12.243 2.818a.75.75 0 0 0-1.06 1.06l-3.41 3.41a.75.75 0 0 0 0 1.06l3.41 3.41a.75.75 0 0 0 1.06-1.06l-3.41-3.41a.75.75 0 0 0 0-1.06l3.41-3.41a.75.75 0 0 0-1.06-1.06z"/>
              </svg>
              核心配置
            </h2>
            
            <!-- 订阅链接输入 -->
            <div class="mb-4 lg:mb-6">
              <label class="text-sm lg:text-base font-medium text-gray-900 dark:text-white block mb-2">订阅链接:</label>
              <textarea
                v-model="form.sourceSubUrl"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm lg:text-base"
                placeholder="支持订阅或ss/ssr/vmess链接，多个链接每行一个或用 | 分隔"
                @blur="saveSubUrl"
              ></textarea>
            </div>

            <!-- 客户端选择 -->
            <div class="mb-4 lg:mb-6">
              <label class="text-sm lg:text-base font-medium text-gray-900 dark:text-white block mb-2">客户端:</label>
              <select
                v-model="form.clientType"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm lg:text-base"
              >
                <option v-for="(value, key) in clientTypes" :key="key" :value="value">{{ key }}</option>
              </select>
            </div>

            <!-- 智能解析按钮 -->
            <div class="flex flex-col sm:flex-row gap-2 lg:gap-3">
              <button
                @click="showParseDialog = true"
                class="px-3 lg:px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 font-medium flex items-center justify-center flex-1 text-sm lg:text-base"
              >
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                智能解析
              </button>
              <button
                @click="resetForm"
                class="px-3 lg:px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 font-medium flex items-center justify-center text-sm lg:text-base"
              >
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd"></path>
                </svg>
                重置
              </button>
            </div>
          </div>

          <!-- 进阶模式配置 -->
          <div v-if="isAdvanced" class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
              </svg>
              高级配置
            </h2>
            
            <!-- 后端地址 -->
            <div class="mb-6">
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
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>

            <!-- 远程配置 -->
            <div class="mb-6">
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
                <button
                  @click="showUploadDialog = true"
                  class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center"
                >
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Include/Exclude -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
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
            <div class="mb-6">
              <label class="text-base font-medium text-gray-900 dark:text-white block mb-2">FileName:</label>
              <input
                v-model="form.filename"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="返回的订阅文件名"
              >
            </div>

            <!-- 自定义参数 -->
            <div class="mb-6">
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
        </div>

        <!-- 右侧：实时输出区域 -->
        <div class="space-y-4 lg:space-y-6">
          <!-- 实时输出面板 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-6">
            <h2 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4 flex items-center">
              <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1zm1-4a1 1 0 100 2h.01a1 1 0 100-2H7zm2 0a1 1 0 100 2h.01a1 1 0 100-2H9zm2 0a1 1 0 100 2h.01a1 1 0 100-2H11z" clip-rule="evenodd"></path>
              </svg>
              实时输出
            </h2>

            <!-- 定制订阅 -->
            <div class="mb-4 lg:mb-6">
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm lg:text-base font-medium text-gray-900 dark:text-white">定制订阅</label>
                <span v-if="customSubUrl" class="text-xs text-green-600 dark:text-green-400 flex items-center">
                  <svg class="w-2 h-2 lg:w-3 lg:h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                  </svg>
                  已生成
                </span>
              </div>
              <div class="flex flex-col sm:flex-row gap-2">
                <input
                  v-model="customSubUrl"
                  type="text"
                  readonly
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xs lg:text-sm"
                  placeholder="实时生成订阅链接..."
                >
                <button
                  @click="copyToClipboard(customSubUrl)"
                  :disabled="!customSubUrl"
                  class="px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center text-xs lg:text-sm whitespace-nowrap"
                >
                  <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                  复制
                </button>
              </div>
              <div v-if="customSubUrl" class="mt-2 text-xs text-gray-500 dark:text-gray-400">
                链接长度: {{ customSubUrl.length }} 字符
              </div>
            </div>

            <!-- 订阅短链 -->
            <div class="mb-4 lg:mb-6">
              <div class="flex items-center justify-between mb-2">
                <label class="text-sm lg:text-base font-medium text-gray-900 dark:text-white">订阅短链</label>
                <button
                  @click="generateShortUrl"
                  :loading="loading"
                  :disabled="!customSubUrl"
                  class="text-xs text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ loading ? '生成中...' : '生成短链' }}
                </button>
              </div>
              <div class="flex flex-col sm:flex-row gap-2">
                <input
                  v-model="shortSubUrl"
                  type="text"
                  readonly
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white text-xs lg:text-sm"
                  placeholder="点击生成短链接..."
                >
                <button
                  @click="copyToClipboard(shortSubUrl)"
                  :disabled="!shortSubUrl"
                  class="px-3 lg:px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center text-xs lg:text-sm whitespace-nowrap"
                >
                  <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-1 lg:mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                  复制
                </button>
              </div>
            </div>

            <!-- 快速操作 -->
            <div class="space-y-2 lg:space-y-3">
              <button
                @click="importToClash"
                :disabled="!customSubUrl"
                class="w-full px-3 lg:px-4 py-2 lg:py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium flex items-center justify-center text-sm lg:text-base"
              >
                <svg class="w-3 h-3 lg:w-4 lg:h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd"></path>
                </svg>
                一键导入 Clash
              </button>
            </div>
          </div>

          <!-- 配置状态 -->
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 lg:p-6">
            <h2 class="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4 flex items-center">
              <svg class="w-4 h-4 lg:w-5 lg:h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
              </svg>
              配置摘要
            </h2>
            <div class="space-y-2 text-xs lg:text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">模式:</span>
                <span class="text-gray-900 dark:text-white font-medium">{{ isAdvanced ? '进阶模式' : '基础模式' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">客户端:</span>
                <span class="text-gray-900 dark:text-white font-medium">{{ getClientName(form.clientType) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">状态:</span>
                <span class="text-gray-900 dark:text-white font-medium">
                  <span v-if="customSubUrl" class="text-green-600 dark:text-green-400">✓ 已生成</span>
                  <span v-else class="text-yellow-600 dark:text-yellow-400">⏳ 待生成</span>
                </span>
              </div>
              <div v-if="isAdvanced && form.remoteConfig" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">远程配置:</span>
                <span class="text-blue-600 dark:text-blue-400 text-xs">已配置</span>
              </div>
              <div v-if="isAdvanced && customParams.length > 0" class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">自定义参数:</span>
                <span class="text-purple-600 dark:text-purple-400">{{ customParams.length }} 个</span>
              </div>
            </div>
          </div>
        </div>
      </div>

// 智能解析对话框
<div v-if="showParseDialog" class="fixed inset-0 z-50 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showParseDialog = false"></div>
    <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
      <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              智能解析订阅链接
            </h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">订阅链接：</label>
              <input
                v-model="loadConfig"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="粘贴现有订阅链接进行智能解析..."
              >
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p>支持解析以下格式：</p>
              <ul class="list-disc list-inside mt-1 space-y-1">
                <li>完整的订阅转换链接</li>
                <li>短链接服务链接</li>
                <li>原始订阅链接</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          @click="confirmParseConfig"
          :disabled="!loadConfig || loading"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? '解析中...' : '开始解析' }}
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

<!-- 远程配置上传对话框 -->
<div v-if="showUploadDialog" class="fixed inset-0 z-50 overflow-y-auto">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showUploadDialog = false"></div>
    <div class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
      <div class="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3 class="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">
              上传远程配置
            </h3>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">配置文件内容：</label>
              <textarea
                v-model="uploadConfig"
                rows="12"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="请输入或粘贴配置文件内容..."
              ></textarea>
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              <p>支持格式：.ini 配置文件</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          @click="uploadConfigAndClose"
          :disabled="!uploadConfig.trim() || loading"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ loading ? '上传中...' : '确认上传' }}
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
import { ref, watch, onMounted, computed } from 'vue'
import { useSubscriptionConverter } from '../composables/useSubscriptionConverter.js'
import { useClipboard } from '../composables/useClipboard.js'
import { useStorage } from '../composables/useStorage.js'

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
  resetForm
} = useSubscriptionConverter()

// 使用剪贴板组合式函数
const { copyToClipboard } = useClipboard()

// 使用存储组合式函数
const { saveConfig, loadConfig: loadSavedConfig } = useStorage()

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

// 实时生成订阅链接
const autoGenerateUrl = ref(false)
const lastGeneratedUrl = ref('')

// 获取客户端名称
const getClientName = (value) => {
  for (const [name, val] of Object.entries(clientTypes.value)) {
    if (val === value) {
      return name
    }
  }
  return value
}

// 实时更新订阅链接
const updateSubscriptionUrl = () => {
  if (!form.value.sourceSubUrl.trim() || !form.value.clientType) {
    return
  }
  
  try {
    const url = makeUrl()
    if (url !== lastGeneratedUrl.value) {
      lastGeneratedUrl.value = url
      // 如果启用了自动生成，则复制到剪贴板
      if (autoGenerateUrl.value) {
        copyToClipboard(url).catch(() => {
          // 忽略复制失败错误
        })
      }
    }
  } catch (error) {
    console.error('实时生成订阅链接失败:', error)
  }
}

// 监听表单变化，实时生成订阅链接
watch([
  () => form.value.sourceSubUrl,
  () => form.value.clientType,
  () => form.value.customBackend,
  () => form.value.remoteConfig,
  () => form.value.excludeRemarks,
  () => form.value.includeRemarks,
  () => form.value.filename,
  () => form.value.appendType,
  () => form.value.emoji,
  () => form.value.nodeList,
  () => form.value.tfo,
  () => form.value.scv,
  () => form.value.fdn,
  () => form.value.sort,
  () => form.value.udp,
  () => form.value.expand,
  isAdvanced,
  customParams
], updateSubscriptionUrl, {
  deep: true,
  immediate: true
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

// 手动生成订阅链接
const generateUrl = () => {
  try {
    const url = makeUrl()
    copyToClipboard(url)
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

// 增强的智能解析功能
const confirmParseConfig = async () => {
  if (!loadConfig.value.trim()) {
    showToast('请输入要解析的链接', 'error')
    return
  }
  
  try {
    // 调用增强的解析函数
    await parseSubscriptionUrl(loadConfig.value)
    showParseDialog.value = false
    loadConfig.value = ''
    showToast('链接解析完成！配置已自动填入左侧面板', 'success')
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
    showToast('远程配置上传成功，配置链接已复制到剪贴板', 'success')
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

// 保存配置到本地存储
const saveCurrentConfig = async () => {
  try {
    const config = {
      form: form.value,
      isAdvanced: isAdvanced.value,
      customParams: customParams.value,
      timestamp: Date.now()
    }
    await saveConfig('subscription-converter-config', config)
    showToast('配置已自动保存', 'success')
  } catch (error) {
    console.error('保存配置失败:', error)
  }
}

// 保存订阅URL
const saveSubUrl = () => {
  if (form.value.sourceSubUrl.trim()) {
    saveCurrentConfig()
  }
}

// 初始化加载保存的配置
const loadSavedConfigData = async () => {
  try {
    const savedConfig = await loadSavedConfig('subscription-converter-config')
    if (savedConfig) {
      // 这里可以根据需要加载保存的配置
      console.log('找到保存的配置:', savedConfig)
    }
  } catch (error) {
    console.error('加载配置失败:', error)
  }
}

// 组件挂载时加载保存的配置
onMounted(() => {
  loadSavedConfigData()
})

// 监听配置变化，自动保存
watch([
  form,
  isAdvanced,
  customParams
], saveCurrentConfig, {
  deep: true,
  immediate: false
})
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