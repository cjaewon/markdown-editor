export default function detectIOS() {
  if (process.env.REACT_APP_SSR === 'enabled') return false;

  // checkAgent for Chrome Developer Menu
  const checkAgent =
    /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const checkPlatform =
    (/iPad|iPhone|iPod/.test(navigator.platform) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
    !window.MSStream;

  return checkAgent || checkPlatform;
}
