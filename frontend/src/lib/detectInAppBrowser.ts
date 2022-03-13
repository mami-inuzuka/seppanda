/* eslint-disable no-nested-ternary */
export const detectInAppBrowser = (ua: string) => {
  const userAgent = ua.toLowerCase().trim()

  // iOS Chrome
  if (userAgent.includes('crios')) {
    return 'is_chrome_ios'
  }

  const isIOS = ua.includes('iphone') || ua.includes('ipod') || ua.includes('ipad')
  const isAndroid = ua.includes('android')

  // Facebook
  if (userAgent.includes('fbios') || ua.includes('fb_iab')) {
    return isIOS ? 'is_facebook_ios' : isAndroid ? 'is_facebook_android' : 'is_facebook_unknown'
  }

  // Instagram
  if (userAgent.includes('instagram')) {
    return isIOS ? 'is_instagram_ios' : isAndroid ? 'is_instagram_android' : 'is_instagram_unknown'
  }

  // LINE
  if (userAgent.includes(' line/')) {
    return isIOS ? 'is_line_ios' : isAndroid ? 'is_line_android' : 'is_line_unknown'
  }

  // iOS Safari|Twitter|Slack|Discord|etc
  if (isIOS && /safari\/[0-9.]+$/.test(userAgent)) {
    return 'maybe_safari_ios'
  }

  // Android Chrome|Twitter|Slack|Discord|etc
  if (isAndroid && userAgent.includes('chrome') && /safari\/[0-9.]+$/.test(userAgent)) {
    return 'maybe_chrome_android'
  }

  return null
}
