import { type ReportHandler } from 'web-vitals'

const reportWebVitals = async (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    try {
      const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import(
        'web-vitals'
      )
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    } catch (error) {
      console.error('Error importing web-vitals:', error)
    }
  }
}

export default reportWebVitals
