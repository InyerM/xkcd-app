import algoliasearch from 'algoliasearch'

const clientId = process.env.CLIENT_ID as string
const apiKey = process.env.API_KEY as string
const clientIndex = process.env.CLIENT_INDEX as string

const client = algoliasearch(clientId, apiKey)
const index = client.initIndex(clientIndex)

const Cache: any = {}

type Param = {
  query: string
}

export const search = async ({query}: Param) => {
  if (Cache[query]) {
    return { results: Cache[query] } 
  }

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt'],
    hitsPerPage: 10
  })

  Cache[query] = hits

  return { results: hits }
}