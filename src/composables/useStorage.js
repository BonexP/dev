/**
 * 本地存储功能组合式函数
 * 提供配置保存和加载功能
 */
export function useStorage() {
  const STORAGE_KEY = 'subscription-tool-config'
  const VERSION = '1.0.0'

  /**
   * 默认配置
   */
  const getDefaultConfig = () => ({
    version: VERSION,
    autoCopy: false,
    theme: 'light',
    lastUsedEncoder: 'base64',
    maxInputLength: 10000,
    autoSave: true
  })

  /**
   * 保存配置
   */
  const saveConfig = async (config) => {
    try {
      if (typeof config !== 'object' || config === null) {
        throw new Error('无效的配置对象')
      }

      // 验证和清理配置
      const sanitizedConfig = {
        ...getDefaultConfig(),
        ...config
      }

      // 保存到localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitizedConfig))
      
      // 返回保存的配置
      return sanitizedConfig
    } catch (error) {
      console.error('保存配置失败:', error)
      throw new Error('保存配置失败：' + error.message)
    }
  }

  /**
   * 加载配置
   */
  const loadConfig = async () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      
      if (!saved) {
        // 没有保存的配置，返回默认值
        return getDefaultConfig()
      }

      const parsed = JSON.parse(saved)
      
      // 验证配置格式
      if (!parsed || typeof parsed !== 'object') {
        console.warn('保存的配置格式错误，使用默认配置')
        return getDefaultConfig()
      }

      // 检查版本兼容性
      if (parsed.version !== VERSION) {
        console.info('配置版本不匹配，使用默认配置')
        return getDefaultConfig()
      }

      // 合并默认配置，确保所有字段都存在
      return {
        ...getDefaultConfig(),
        ...parsed
      }
    } catch (error) {
      console.error('加载配置失败:', error)
      // 发生错误时返回默认配置
      return getDefaultConfig()
    }
  }

  /**
   * 清除保存的配置
   */
  const clearConfig = async () => {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('清除配置失败:', error)
      throw new Error('清除配置失败：' + error.message)
    }
  }

  /**
   * 获取存储状态信息
   */
  const getStorageStatus = async () => {
    try {
      const config = await loadConfig()
      const saved = localStorage.getItem(STORAGE_KEY)
      
      return {
        hasConfig: !!saved,
        config,
        storageSize: saved ? saved.length : 0,
        storageQuota: getStorageQuota(),
        storageUsed: getStorageUsed(),
        lastSaved: getLastSavedTime(),
        version: VERSION
      }
    } catch (error) {
      return {
        hasConfig: false,
        error: error.message,
        version: VERSION
      }
    }
  }

  /**
   * 估算存储配额
   */
  const getStorageQuota = () => {
    try {
      if (navigator.storage && navigator.storage.estimate) {
        return navigator.storage.estimate().then(estimate => estimate.quota || 0)
      }
      return Promise.resolve(5 * 1024 * 1024) // 估算5MB
    } catch (error) {
      return Promise.resolve(5 * 1024 * 1024)
    }
  }

  /**
   * 计算已使用的存储空间
   */
  const getStorageUsed = () => {
    try {
      let total = 0
      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          total += localStorage[key].length + key.length
        }
      }
      return total
    } catch (error) {
      return 0
    }
  }

  /**
   * 获取最后保存时间
   */
  const getLastSavedTime = () => {
    try {
      const config = localStorage.getItem(STORAGE_KEY)
      if (config) {
        const parsed = JSON.parse(config)
        return parsed.lastUpdated || null
      }
      return null
    } catch (error) {
      return null
    }
  }

  /**
   * 导出配置
   */
  const exportConfig = async () => {
    try {
      const config = await loadConfig()
      config.lastUpdated = new Date().toISOString()
      
      const dataStr = JSON.stringify(config, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      
      // 创建下载链接
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `subscription-tool-config-${new Date().toISOString().slice(0, 10)}.json`
      
      // 触发下载
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // 清理URL对象
      URL.revokeObjectURL(url)
      
      return true
    } catch (error) {
      throw new Error('导出配置失败：' + error.message)
    }
  }

  /**
   * 导入配置
   */
  const importConfig = async (file) => {
    try {
      if (!file) {
        throw new Error('未选择文件')
      }
      
      if (!file.type.includes('json')) {
        throw new Error('请选择JSON格式的配置文件')
      }

      const fileContent = await readFileAsText(file)
      const config = JSON.parse(fileContent)
      
      // 验证配置格式
      if (!config || typeof config !== 'object') {
        throw new Error('配置文件格式无效')
      }
      
      // 保存配置
      await saveConfig(config)
      
      return true
    } catch (error) {
      throw new Error('导入配置失败：' + error.message)
    }
  }

  /**
   * 读取文件内容
   */
  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target.result)
      reader.onerror = (e) => reject(new Error('文件读取失败'))
      reader.readAsText(file)
    })
  }

  return {
    saveConfig,
    loadConfig,
    clearConfig,
    getStorageStatus,
    exportConfig,
    importConfig,
    getDefaultConfig
  }
}