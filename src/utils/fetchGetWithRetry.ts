type FetchParams = number | string | null | undefined | unknown

export default async function fetchGetWithRetry(url: string, retries = 5, timeout = 100): Promise<FetchParams> {
  try {
    const response = await fetch(url, { mode: 'cors' })
    return await response.json()
  } catch (error: any) {
    if (retries > 0) {
      console.error(`Failed to fetch data: ${error.message}. Retrying...`)
      await new Promise((resolve) => setTimeout(resolve, timeout))
      return await fetchGetWithRetry(url, retries - 1)
    } else {
      throw error
    }
  }
}
