// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { search } from 'services/search';
import { xkcd_result } from 'types';

type Data = {
  name?: string
  error?: string
  results?: Array<xkcd_result>
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req
  const { q } = query

  if(q && !Array.isArray(q)) {
    const { results } = await search({query: q})
    return res.status(200).json(results)
  }

  res.status(200).json({
    error: 'No query provided'
  })
}
