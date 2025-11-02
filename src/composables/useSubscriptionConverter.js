/**
 * 订阅转换器核心业务逻辑
 * 基于参考文件 subconverter.vue 的完整功能实现
 */
import { ref, computed } from 'vue'

export function useSubscriptionConverter() {
  // 响应式状态
  const isAdvanced = ref(false)
  const loading = ref(false)
  const customSubUrl = ref('')
  const shortSubUrl = ref('')

  // 表单数据
  const form = ref({
    sourceSubUrl: '',
    clientType: 'clash',
    customBackend: '',
    remoteConfig: '',
    excludeRemarks: '',
    includeRemarks: '',
    filename: '',
    emoji: true,
    nodeList: false,
    sort: false,
    udp: false,
    tfo: false,
    scv: true,
    fdn: false,
    expand: true,
    appendType: false,
    insert: false,
    new_name: true,
    
    // 模板定制功能
    tpl: {
      surge: {
        doh: false
      },
      clash: {
        doh: false
      }
    }
  })

  // 客户端类型选项
  const clientTypes = computed(() => ({
    'Clash': 'clash',
    'Surge': 'surge&ver=4',
    'Quantumult': 'quan',
    'QuantumultX': 'quanx',
    'Mellow': 'mellow',
    'Surfboard': 'surfboard',
    'Loon': 'loon',
    'singbox': 'singbox',
    'ss': 'ss',
    'ssd': 'ssd',
    'sssub': 'sssub',
    'ssr': 'ssr',
    'ClashR': 'clashr',
    'V2Ray': 'v2ray',
    'Trojan': 'trojan',
    'Surge3': 'surge&ver=3'
  }))

  // 远程配置选项
  const remoteConfigs = ref([
    {
      label: 'universal',
      options: [
        {
          label: 'No-Urltest',
          value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/universal/no-urltest.ini'
        },
        {
          label: 'Urltest',
          value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/universal/urltest.ini'
        }
      ]
    },
    {
      label: 'customized',
      options: [
        { label: 'Maying', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/maying.ini' },
        { label: 'Ytoo', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/ytoo.ini' },
        { label: 'FlowerCloud', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/flowercloud.ini' },
        { label: 'Nexitally', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/nexitally.ini' },
        { label: 'SoCloud', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/socloud.ini' },
        { label: 'ARK', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/ark.ini' },
        { label: 'ssrCloud', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/ssrcloud.ini' },
        { label: 'ACL4SSR(CDN)', value: 'https://cdn.jsdelivr.net/gh/ACL4SSR/ACL4SSR@release/Clash/config/ACL4SSR_Online.ini' },
        { label: 'ACL4SSR(GitHub)', value: 'https://raw.githubusercontent.com/ACL4SSR/ACL4SSR/master/Clash/config/ACL4SSR_Online.ini' }
      ]
    },
    {
      label: 'Special',
      options: [
        { label: 'NeteaseUnblock(仅规则，No-Urltest)', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/special/netease.ini' },
        { label: 'Basic(仅GEOIP CN + Final)', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/special/basic.ini' }
      ]
    }
  ])

  // 自定义参数
  const customParams = ref([])

  // 是否需要UDP
  const needUdp = ref(false)

  // 默认后端地址
  const defaultBackend = 'http://127.0.0.1:25500/sub?'

  // 后端选项
  const backendOptions = ref([
    { value: 'http://127.0.0.1:25500/sub?' }
  ])

  // 对话框状态
  const dialogUploadConfigVisible = ref(false)
  const dialogLoadConfigVisible = ref(false)
  const uploadConfig = ref('')
  const loadConfig = ref('')

  // 后端版本
  const backendVersion = ref('')

  // 自定义远程配置列表
  const customRemoteConfigs = ref([])

  // 辅助函数：提取URL域名
  const extractDomainFromUrl = (url) => {
    try {
      const urlObj = new URL(url)
      return urlObj.hostname
    } catch {
      return '未知域名'
    }
  }

  // 获取自定义远程配置列表
  const getCustomRemoteConfigs = () => {
    return customRemoteConfigs.value
  }

  // 添加自定义远程配置
  const addCustomRemoteConfig = (config) => {
    customRemoteConfigs.value.push(config)
  }

  // 合并所有远程配置（包括预设和自定义）
  const allRemoteConfigs = computed(() => {
    const presetConfigs = remoteConfigs.value
    
    // 如果有自定义配置，添加到末尾
    if (customRemoteConfigs.value.length > 0) {
      return [
        ...presetConfigs,
        {
          label: '自定义配置',
          options: customRemoteConfigs.value
        }
      ]
    }
    
    return presetConfigs
  })

  /**
   * 生成订阅链接（增强版）
   */
  const makeUrl = () => {
    // 验证必填项
    if (!form.value.sourceSubUrl?.trim()) {
      throw new Error('请输入订阅链接')
    }
    if (!form.value.clientType) {
      throw new Error('请选择客户端类型')
    }

    try {
      let backend = form.value.customBackend?.trim() || defaultBackend
      
      // 预处理订阅链接
      let sourceSub = form.value.sourceSubUrl.trim()
      sourceSub = sourceSub.replace(/(\n|\r|\n\r)/g, '|')
      
      // 验证URL格式
      try {
        new URL(sourceSub)
      } catch {
        // 如果不是完整的URL，尝试作为base64解码
        if (!sourceSub.startsWith('http')) {
          try {
            const decoded = atob(sourceSub)
            if (decoded.includes('://')) {
              sourceSub = decoded
            }
          } catch (e) {
            // 如果解码失败，使用原始值
          }
        }
      }

      // 构建基础URL
      let url = `${backend}target=${form.value.clientType}&url=${encodeURIComponent(sourceSub)}&insert=${form.value.insert}`

      // 进阶模式参数处理
      if (isAdvanced.value) {
        // 远程配置
        if (form.value.remoteConfig?.trim()) {
          url += `&config=${encodeURIComponent(form.value.remoteConfig.trim())}`
        }
        
        // 过滤条件
        if (form.value.excludeRemarks?.trim()) {
          url += `&exclude=${encodeURIComponent(form.value.excludeRemarks.trim())}`
        }
        if (form.value.includeRemarks?.trim()) {
          url += `&include=${encodeURIComponent(form.value.includeRemarks.trim())}`
        }
        
        // 文件名
        if (form.value.filename?.trim()) {
          url += `&filename=${encodeURIComponent(form.value.filename.trim())}`
        }
        
        // 基础选项
        if (form.value.appendType) {
          url += `&append_type=${form.value.appendType.toString()}`
        }

        // 标准参数组合
        const standardParams = [
          `emoji=${form.value.emoji}`,
          `list=${form.value.nodeList}`,
          `tfo=${form.value.tfo}`,
          `scv=${form.value.scv}`,
          `fdn=${form.value.fdn}`,
          `expand=${form.value.expand}`,
          `sort=${form.value.sort}`
        ]
        
        url += '&' + standardParams.join('&')

        // UDP支持检查
        if (needUdp.value && form.value.udp) {
          url += `&udp=${form.value.udp.toString()}`
        }

        // 模板定制功能
        if (form.value.tpl.surge.doh) {
          url += '&surge.doh=true'
        }

        if (form.value.clientType === 'clash') {
          if (form.value.tpl.clash.doh) {
            url += '&clash.doh=true'
          }
          url += `&new_name=${form.value.new_name}`
        }

        // 自定义参数处理
        const validCustomParams = customParams.value.filter(param =>
          param.name?.trim() && param.value?.trim()
        )
        
        validCustomParams.forEach(param => {
          url += `&${encodeURIComponent(param.name.trim())}=${encodeURIComponent(param.value.trim())}`
        })
      }

      // 更新状态
      customSubUrl.value = url
      return url
      
    } catch (error) {
      console.error('生成订阅链接时发生错误:', error)
      throw new Error('生成订阅链接失败: ' + error.message)
    }
  }

  /**
   * 生成短链接
   */
  const makeShortUrl = async () => {
    if (!customSubUrl.value) {
      throw new Error('请先生成订阅链接，再获取对应短链接')
    }

    loading.value = true
    try {
      const response = await fetch('https://api.myurls.cn/api/set', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body: 'longUrl=' + btoa(customSubUrl.value)
      })

      const data = await response.json()
      if (data.Code === 1 && data.ShortUrl) {
        shortSubUrl.value = data.ShortUrl
        return data.ShortUrl
      } else {
        throw new Error(data.Message || '短链接获取失败')
      }
    } catch (error) {
      throw new Error('短链接获取失败：' + error.message)
    } finally {
      loading.value = false
    }
  }

  /**
   * 添加自定义参数
   */
  const addCustomParam = () => {
    customParams.value.push({
      name: '',
      value: ''
    })
  }

  /**
   * 移除自定义参数
   */
  const removeCustomParam = (index) => {
    customParams.value.splice(index, 1)
  }

  /**
   * 智能解析订阅链接（增强版）
   */
  const parseSubscriptionUrl = async (inputUrl) => {
    if (!inputUrl?.trim()) {
      throw new Error('订阅链接不能为空')
    }

    loading.value = true
    try {
      let url = inputUrl.trim()
      
      // 检测并处理不同类型的输入
      // 1. 短链接处理
      if (!url.includes('target=') && (url.includes('myurls.cn') || url.includes('bit.ly') || url.length < 100)) {
        try {
          const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow',
            headers: {
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
            }
          })
          url = response.url
        } catch (error) {
          console.warn('短链接解析失败，尝试作为普通链接处理:', error)
          // 短链接解析失败时，继续尝试其他解析方式
        }
      }

      // 2. Base64编码检测和解码
      if (!url.startsWith('http') && url.length > 50) {
        try {
          const decoded = atob(url.replace(/\s/g, ''))
          if (decoded.includes('http') && (decoded.includes('target=') || decoded.includes('://'))) {
            url = decoded
          }
        } catch (e) {
          // Base64解码失败，继续使用原始输入
        }
      }

      // 3. 处理百分号编码
      if (url.includes('%')) {
        try {
          const decoded = decodeURIComponent(url)
          if (decoded.includes('target=')) {
            url = decoded
          }
        } catch (e) {
          // URL解码失败
        }
      }

      // 4. 验证URL格式
      let urlObj
      try {
        urlObj = new URL(url)
      } catch (error) {
        // 如果不是完整URL，尝试补全协议
        if (!url.startsWith('http')) {
          url = 'http://' + url
          urlObj = new URL(url)
        } else {
          throw new Error('无效的URL格式')
        }
      }
      
      // 5. 解析查询参数
      const params = new URLSearchParams(urlObj.search)
      
      // 检查是否包含订阅转换相关参数
      if (!params.has('target')) {
        throw new Error('这不是一个有效的订阅转换链接')
      }
      
      // 设置自定义后端
      form.value.customBackend = `${urlObj.origin}${urlObj.pathname}?`
      
      // 获取目标客户端
      const target = params.get('target')
      
      // 设置客户端类型（增强错误处理）
      if (target === 'surge') {
        const ver = params.get('ver') || '4'
        form.value.clientType = `surge&ver=${ver}`
      } else {
        // 验证客户端类型是否有效
        const validClients = ['clash', 'surge', 'quan', 'quanx', 'mellow', 'surfboard', 'loon', 'singbox', 'ss', 'ssd', 'sssub', 'ssr', 'clashr', 'v2ray', 'trojan']
        if (validClients.includes(target)) {
          form.value.clientType = target
        } else {
          throw new Error(`不支持的客户端类型: ${target}`)
        }
      }

      // 解析基础参数
      const urlParam = params.get('url') || ''
      form.value.sourceSubUrl = urlParam.replace(/\|/g, '\n')
      form.value.insert = params.get('insert') === 'true'
      form.value.remoteConfig = params.get('config') || ''
      form.value.excludeRemarks = params.get('exclude') || ''
      form.value.includeRemarks = params.get('include') || ''
      form.value.filename = params.get('filename') || ''

      // 解析布尔参数
      const parseBoolean = (param, defaultValue = false) => {
        const value = params.get(param)
        return value === null ? defaultValue : value === 'true'
      }

      form.value.appendType = parseBoolean('append_type')
      form.value.emoji = parseBoolean('emoji', true)
      form.value.nodeList = parseBoolean('list')
      form.value.tfo = parseBoolean('tfo')
      form.value.scv = parseBoolean('scv', true)
      form.value.fdn = parseBoolean('fdn')
      form.value.sort = parseBoolean('sort')
      form.value.udp = parseBoolean('udp')
      form.value.expand = parseBoolean('expand', true)
      form.value.tpl.surge.doh = parseBoolean('surge.doh')
      form.value.tpl.clash.doh = parseBoolean('clash.doh')
      form.value.new_name = parseBoolean('new_name', true)

      // 解析自定义参数
      const excludeParams = new Set([
        'target', 'url', 'insert', 'config', 'exclude', 'include', 'filename',
        'append_type', 'emoji', 'list', 'tfo', 'scv', 'fdn', 'sort', 'udp',
        'expand', 'surge.doh', 'clash.doh', 'new_name'
      ])
      
      const customParamsArray = Array.from(params.entries())
        .filter(([key]) => !excludeParams.has(key))
        .map(([name, value]) => ({ name, value }))
        .filter(param => param.name && param.value)

      customParams.value = customParamsArray

      // 处理远程配置：检查是否为自定义配置并添加到自定义列表
      const remoteConfigUrl = form.value.remoteConfig
      if (remoteConfigUrl) {
        // 检查是否已经在预设配置中
        const isPresetConfig = remoteConfigs.value.some(group =>
          group.options.some(option => option.value === remoteConfigUrl)
        )
        
        // 如果不是预设配置，检查是否已存在于自定义配置中
        if (!isPresetConfig) {
          const existingCustomConfig = getCustomRemoteConfigs().find(
            config => config.value === remoteConfigUrl
          )
          
          // 如果是新的自定义配置，自动添加到自定义配置列表
          if (!existingCustomConfig) {
            const newCustomConfig = {
              label: extractDomainFromUrl(remoteConfigUrl) + ' (自定义)',
              value: remoteConfigUrl,
              isCustom: true
            }
            addCustomRemoteConfig(newCustomConfig)
          }
        }
      }

      // 自动切换到进阶模式（如果检测到高级参数）
      if (customParamsArray.length > 0 || form.value.remoteConfig) {
        isAdvanced.value = true
      }

      // 清理临时变量
      dialogLoadConfigVisible.value = false
      
      console.log('订阅链接解析成功', {
        clientType: form.value.clientType,
        hasRemoteConfig: !!form.value.remoteConfig,
        customParamsCount: customParamsArray.length,
        isAdvanced: isAdvanced.value
      })
      
      return true
      
    } catch (error) {
      console.error('解析订阅链接失败:', error)
      throw new Error(`解析失败: ${error.message}`)
    } finally {
      loading.value = false
    }
  }

  /**
   * 上传配置
   */
  const uploadRemoteConfig = async () => {
    if (!uploadConfig.value) {
      throw new Error('远程配置不能为空')
    }

    loading.value = true
    try {
      const response = await fetch('https://api.sub-converter.com/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: uploadConfig.value })
      })

      const data = await response.json()
      if (data.code === 0 && data.data.url) {
        form.value.remoteConfig = data.data.url
        dialogUploadConfigVisible.value = false
        return data.data.url
      } else {
        throw new Error(data.msg || '远程配置上传失败')
      }
    } catch (error) {
      throw new Error('远程配置上传失败：' + error.message)
    } finally {
      loading.value = false
    }
  }

  /**
   * 导入到Clash
   */
  const clashInstall = () => {
    if (!customSubUrl.value) {
      throw new Error('请先填写必填项，生成订阅链接')
    }

    const targetUrl = shortSubUrl.value || customSubUrl.value
    const installUrl = 'clash://install-config?url=' + encodeURIComponent(targetUrl)
    window.open(installUrl)
  }

  /**
   * 导入到Surge
   */
  const surgeInstall = () => {
    if (!customSubUrl.value) {
      throw new Error('请先填写必填项，生成订阅链接')
    }

    const installUrl = 'surge://install-config?url=' + customSubUrl.value
    window.open(installUrl)
  }

  /**
   * 重置表单
   */
  const resetForm = () => {
    form.value = {
      sourceSubUrl: '',
      clientType: 'clash',
      customBackend: '',
      remoteConfig: '',
      excludeRemarks: '',
      includeRemarks: '',
      filename: '',
      emoji: true,
      nodeList: false,
      sort: false,
      udp: false,
      tfo: false,
      scv: true,
      fdn: false,
      expand: true,
      appendType: false,
      insert: false,
      new_name: true,
      tpl: {
        surge: { doh: false },
        clash: { doh: false }
      }
    }
    customSubUrl.value = ''
    shortSubUrl.value = ''
    customParams.value = []
    needUdp.value = false
  }

  return {
    // 状态
    isAdvanced,
    loading,
    customSubUrl,
    shortSubUrl,
    form,
    customParams,
    needUdp,
    backendVersion,
    clientTypes,
    remoteConfigs,
    allRemoteConfigs,
    backendOptions,
    customRemoteConfigs,
    dialogUploadConfigVisible,
    dialogLoadConfigVisible,
    uploadConfig,
    loadConfig,

    // 方法
    makeUrl,
    makeShortUrl,
    addCustomParam,
    removeCustomParam,
    parseSubscriptionUrl,
    uploadRemoteConfig,
    clashInstall,
    surgeInstall,
    resetForm,
    extractDomainFromUrl,
    getCustomRemoteConfigs,
    addCustomRemoteConfig
  }
}