import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

// Mobile optimization utilities
export function getMobileClasses(isMobile: boolean) {
  return {
    container: isMobile ? 'px-4 py-6' : 'px-8 py-8',
    card: isMobile ? 'p-4' : 'p-6',
    text: isMobile ? 'text-sm' : 'text-base',
    heading: isMobile ? 'text-2xl' : 'text-4xl',
    button: isMobile ? 'h-12 text-base' : 'h-10 text-sm',
    grid: isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-2 lg:grid-cols-4 gap-6'
  }
}
