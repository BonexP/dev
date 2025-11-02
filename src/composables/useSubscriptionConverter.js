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
        { label: 'ssrCloud', value: 'https://cdn.jsdelivr.net/gh/SleepyHeeead/subconverter-config@master/remote-config/customized/ssrcloud.ini' }
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

  /**
   * 生成订阅链接
   */
  const makeUrl = () => {
    if (!form.value.sourceSubUrl || !form.value.clientType) {
      throw new Error('订阅链接与客户端为必填项')
    }

    let backend = form.value.customBackend || defaultBackend
    
    let sourceSub = form.value.sourceSubUrl
    sourceSub = sourceSub.replace(/(\n|\r|\n\r)/g, '|')

    let url = backend + 'target=' + form.value.clientType + '&url=' + encodeURIComponent(sourceSub) + '&insert=' + form.value.insert

    // 进阶模式参数
    if (isAdvanced.value) {
      if (form.value.remoteConfig) {
        url += '&config=' + encodeURIComponent(form.value.remoteConfig)
      }
      if (form.value.excludeRemarks) {
        url += '&exclude=' + encodeURIComponent(form.value.excludeRemarks)
      }
      if (form.value.includeRemarks) {
        url += '&include=' + encodeURIComponent(form.value.includeRemarks)
      }
      if (form.value.filename) {
        url += '&filename=' + encodeURIComponent(form.value.filename)
      }
      if (form.value.appendType) {
        url += '&append_type=' + form.value.appendType.toString()
      }

      url += '&emoji=' + form.value.emoji.toString() + '&list=' + form.value.nodeList.toString() + '&tfo=' + form.value.tfo.toString() + '&scv=' + form.value.scv.toString() + '&fdn=' + form.value.fdn.toString() + '&expand=' + form.value.expand.toString() + '&sort=' + form.value.sort.toString()

      if (needUdp.value) {
        url += '&udp=' + form.value.udp.toString()
      }

      if (form.value.tpl.surge.doh === true) {
        url += '&surge.doh=true'
      }

      if (form.value.clientType === 'clash') {
        if (form.value.tpl.clash.doh === true) {
          url += '&clash.doh=true'
        }
        url += '&new_name=' + form.value.new_name.toString()
      }

      // 添加自定义参数
      customParams.value.filter(param => param.name && param.value).forEach(param => {
        url += `&${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`
      })
    }

    customSubUrl.value = url
    return url
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
   * 解析订阅链接
   */
  const parseSubscriptionUrl = async () => {
    if (!loadConfig.value.trim()) {
      throw new Error('订阅链接不能为空')
    }

    loading.value = true
    try {
      let url = loadConfig.value

      // 检查是否是短链接
      if (!loadConfig.value.includes('target')) {
        try {
          const response = await fetch(loadConfig.value, {
            method: 'GET',
            redirect: 'follow'
          })
          url = response.url
        } catch (error) {
          throw new Error('解析短链接失败，请检查短链接服务端是否配置跨域：' + error.message)
        }
      }

      const urlObj = new URL(url)
      
      // 设置自定义后端
      form.value.customBackend = urlObj.origin + urlObj.pathname + '?'
      
      // 解析参数
      const params = new URLSearchParams(urlObj.search)
      
      // 获取目标客户端
      const target = params.get('target')
      
      // 设置客户端类型
      if (target === 'surge') {
        const ver = params.get('ver') || '4'
        form.value.clientType = target + '&ver=' + ver
      } else {
        form.value.clientType = target
      }

      // 设置其他参数
      form.value.sourceSubUrl = (params.get('url') || '').replace(/\|/g, '\n')
      form.value.insert = params.get('insert') === 'true'
      form.value.remoteConfig = params.get('config') || ''
      form.value.excludeRemarks = params.get('exclude') || ''
      form.value.includeRemarks = params.get('include') || ''
      form.value.filename = params.get('filename') || ''
      form.value.appendType = params.get('append_type') === 'true'
      form.value.emoji = params.get('emoji') === 'true'
      form.value.nodeList = params.get('list') === 'true'
      form.value.tfo = params.get('tfo') === 'true'
      form.value.scv = params.get('scv') === 'true'
      form.value.fdn = params.get('fdn') === 'true'
      form.value.sort = params.get('sort') === 'true'
      form.value.udp = params.get('udp') === 'true'
      form.value.expand = params.get('expand') === 'true'
      form.value.tpl.surge.doh = params.get('surge.doh') === 'true'
      form.value.tpl.clash.doh = params.get('clash.doh') === 'true'
      form.value.new_name = params.get('new_name') === 'true'

      // 解析自定义参数
      const excludeParams = new Set(['target', 'url', 'insert', 'config', 'exclude', 'include', 'filename', 'append_type', 'emoji', 'list', 'tfo', 'scv', 'fdn', 'sort', 'udp', 'expand', 'surge.doh', 'clash.doh', 'new_name'])
      customParams.value = Array.from(params.entries())
        .filter(([key]) => !excludeParams.has(key))
        .map(([name, value]) => ({ name, value }))

      dialogLoadConfigVisible.value = false
      return true
    } catch (error) {
      throw new Error('请输入正确的订阅地址!')
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
    backendOptions,
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
    resetForm
  }
}