/**
 * 编码功能组合式函数
 * 提供各种编码算法的实现
 */
export function useEncoder() {
  // 编码器映射
  const encoders = {
    base64: {
      name: 'Base64',
      description: 'Base64编码和解码',
      encode: (text) => {
        try {
          if (!text) return ''
          return btoa(unescape(encodeURIComponent(text)))
        } catch (error) {
          throw new Error('Base64编码失败：输入内容包含非法字符')
        }
      },
      decode: (text) => {
        try {
          if (!text) return ''
          return decodeURIComponent(escape(atob(text)))
        } catch (error) {
          throw new Error('Base64解码失败：输入内容不是有效的Base64格式')
        }
      }
    },
    'url-encode': {
      name: 'URL编码',
      description: 'URL编码，将特殊字符转换为%开头的编码',
      encode: (text) => {
        try {
          if (!text) return ''
          return encodeURIComponent(text)
        } catch (error) {
          throw new Error('URL编码失败')
        }
      },
      decode: (text) => {
        try {
          if (!text) return ''
          return decodeURIComponent(text)
        } catch (error) {
          throw new Error('URL解码失败：输入内容包含非法编码')
        }
      }
    },
    'json-format': {
      name: 'JSON格式化',
      description: 'JSON字符串的格式化（美化）',
      encode: (text) => {
        try {
          if (!text) return ''
          const parsed = JSON.parse(text)
          return JSON.stringify(parsed, null, 2)
        } catch (error) {
          throw new Error('JSON格式化失败：输入内容不是有效的JSON格式')
        }
      },
      decode: (text) => {
        // JSON格式化是双向操作
        return text
      }
    }
  }

  /**
   * 验证输入内容
   */
  const validateInput = (input, encoderType) => {
    if (!input || !input.trim()) {
      throw new Error('输入内容不能为空')
    }
    
    if (input.length > 10000) {
      throw new Error('输入内容过长，最大支持10000字符')
    }

    const encoder = encoders[encoderType]
    if (!encoder) {
      throw new Error('不支持的编码类型')
    }

    return true
  }

  /**
   * 处理文本编码
   */
  const processText = async (input, encoderType) => {
    if (!input || !input.trim()) {
      return ''
    }

    // 模拟异步处理，提供更好的用户体验
    await new Promise(resolve => setTimeout(resolve, 150))

    validateInput(input, encoderType)
    const encoder = encoders[encoderType]
    
    try {
      return encoder.encode(input)
    } catch (error) {
      // 重新抛出业务错误
      throw error
    }
  }

  /**
   * 获取编码器信息
   */
  const getEncoderInfo = (encoderType) => {
    return encoders[encoderType] || null
  }

  /**
   * 获取所有可用的编码器列表
   */
  const getAvailableEncoders = () => {
    return Object.keys(encoders).map(key => ({
      key,
      ...encoders[key]
    }))
  }

  return {
    processText,
    getEncoderInfo,
    getAvailableEncoders,
    encoders
  }
}