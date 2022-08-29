import Layout from "components/Layout"
import { NextPage } from "next"
import Link from "next/link"
import Image from "next/image"
import { search } from 'services/search';
import { xkcd_result } from 'types';
import { useI18N } from "context/i18n";

type Props = {
  search: string
  query: string
  results: Array<xkcd_result>
}

const Search: NextPage<Props> = ({ query, results }: Props) => {
  const { t } = useI18N()

  return (
    <>
      <Layout title={`xkcd - ${t('results_for')} ${query}`} description={`${t('search_results_for')} ${query}`}>
        <h1 className="ml-4">{results.length} {t('results_for')} &quot;{query}&quot;</h1>
        <section className="grid max-w-2xl grid-cols-1 gap-3 mt-5 sm:grid-cols-2 md:grid-cols-3">
          {
            results.map(result => {
              return (
                <Link href={`/comic/${result.id}`} key={result.id}>
                  <a className='flex flex-col content-center justify-start p-5 transition-all rounded-md hover:bg-neutral-100 hover:shadow-md'>
                    <Image width='200' height='200' src={result.img} alt={result.alt} className='rounded-md' />
                    <div>
                      <h2 className="mt-3 font-semibold text-center text-md">{result.title}</h2>
                    </div>
                  </a>
                </Link>
              )
            })
          }
        </section>
      </Layout>
    </>
  )
}

export async function getServerSideProps(context: any) {
  const { query } = context
  const { q = '' } = query
  const { results } = await search({query: q})
  return {
    props: {
      query: q,
      results
    },
  }
}

export default Search