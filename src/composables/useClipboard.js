/**
 * 剪贴板功能组合式函数
 * 提供统一的复制功能实现
 */
export function useClipboard() {
  /**
   * 复制文本到剪贴板
   */
  const copyToClipboard = async (text) => {
    if (!text || typeof text !== 'string') {
      throw new Error('无效的复制内容')
    }

    // 优先使用现代Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text)
        return true
      } catch (error) {
        console.warn('Clipboard API复制失败，尝试降级方案:', error)
      }
    }

    // 降级方案：使用传统execCommand
    return fallbackCopy(text)
  }

  /**
   * 传统复制方法（降级方案）
   */
  const fallbackCopy = (text) => {
    return new Promise((resolve, reject) => {
      try {
        // 创建临时文本域
        const textArea = document.createElement('textarea')
        textArea.value = text
        textArea.style.position = 'fixed'
        textArea.style.top = '-9999px'
        textArea.style.left = '-9999px'
        textArea.style.opacity = '0'
        textArea.setAttribute('readonly', '')
        
        // 添加到DOM并选中
        document.body.appendChild(textArea)
        textArea.select()
        textArea.setSelectionRange(0, text.length)
        
        // 执行复制
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (successful) {
          resolve(true)
        } else {
          reject(new Error('execCommand复制失败'))
        }
      } catch (error) {
        reject(new Error('复制失败：' + error.message))
      }
    })
  }

  /**
   * 检查剪贴板权限
   */
  const checkClipboardPermission = async () => {
    if (!navigator.permissions) {
      return { status: 'unknown', supported: false }
    }

    try {
      const permission = await navigator.permissions.query({ name: 'clipboard-read' })
      return {
        status: permission.state,
        supported: true
      }
    } catch (error) {
      return { status: 'unknown', supported: false }
    }
  }

  /**
   * 检查是否支持现代剪贴板API
   */
  const isClipboardSupported = () => {
    return !!(navigator.clipboard && window.isSecureContext)
  }

  /**
   * 获取复制状态信息
   */
  const getCopyCapabilities = async () => {
    const modernAPI = isClipboardSupported()
    const permission = await checkClipboardPermission()
    
    return {
      modernAPI,
      permission: permission.status,
      fallbackSupported: true, // execCommand在所有现代浏览器中都有支持
      recommended: modernAPI ? 'modern' : 'fallback'
    }
  }

  return {
    copyToClipboard,
    fallbackCopy,
    checkClipboardPermission,
    isClipboardSupported,
    getCopyCapabilities
  }
}