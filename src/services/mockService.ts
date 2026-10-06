let mockDelay = (min: number = 300, max: number = 700): Promise<void> => {
  const delay = min + Math.random() * (max - min)
  return new Promise(resolve => setTimeout(resolve, delay))
}

let errorSimulated = false
let triggerError: (() => void) | null = null

export const simulateError = (): void => {
  errorSimulated = true
}

export const clearError = (): void => {
  errorSimulated = false
}

export const getWithError = async <T>(data: T): Promise<T> => {
  await mockDelay()
  if (errorSimulated) {
    errorSimulated = false
    throw new Error('Simulated error for testing')
  }
  return data
}

export const delay = mockDelay