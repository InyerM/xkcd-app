import { NextPage } from 'next'
import Image from 'next/image'
import { readFile, stat, readdir } from 'fs/promises'
import { basename } from 'path'
import Link from 'next/link'
import Layout from 'components/Layout'
import { xkcd_result } from 'types'
import { useI18N } from 'context/i18n'

type Props = xkcd_result

type Context = {
  params: {
    id: number
  }
}

const Comic: NextPage<Props> = ({ img, alt, title, width, height, hasPrevious, hasNext, prevId, nextId }: Props) => {
  const { t } = useI18N()

  return (
    <>
      <Layout title={`xkcd - ${t('comics_for_developers')}`} description={t('comics_for_developers')}>
        <main>
          <section className='max-w-md m-auto'>
            <h1 className='mb-4 text-xl font-bold text-center'>{title}</h1>
            <section className='max-w-xs m-auto mb-4'>
              <Image 
                layout='responsive'
                width={width} 
                height={height} 
                src={img} 
                alt={alt} 
              />
            </section>
            <p className='text-center'>{alt}</p>
            <section className='flex justify-between my-4 font-bold'>
              {
                hasPrevious && (
                  <Link href={`/comic/${prevId}`}>
                    <a className='p-2 text-sm font-semibold transition-all duration-200 rounded-md shadow-sm hover:bg-opacity-10 hover:bg-gray-400'>⬅ {t('previous')}</a>
                  </Link>
                )
              }
              {
                hasNext && (
                  <Link href={`/comic/${nextId}`}>
                    <a className='p-2 text-sm font-semibold transition-all duration-200 rounded-md shadow-sm hover:bg-opacity-10 hover:bg-gray-400'>{t('next')} ➡</a>
                  </Link>
                )
              }
            </section>
          </section>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const files = await readdir('./comics')
  let paths: any = []

  locales.forEach(locale => {
    paths = paths.concat(files.map(file => {
      const id = basename(file, '.json')
      return { params: { id }, locale }
    }))
  })
  
  return { 
    paths,
    fallback: false 
  }
}

export async function getStaticProps({ params }: Context) {
  const { id } = params
  
  const content = await readFile(`./comics/${id}.json`, 'utf8')
  const comic = JSON.parse(content)

  const idNumber = + id
  const prevId = idNumber - 1
  const nextId = idNumber + 1

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ])

  const hasPrevious = prevResult.status === 'fulfilled'
  const hasNext = nextResult.status === 'fulfilled'

  return {
    props: {
      ...comic,
      hasPrevious,
      hasNext,
      nextId,
      prevId
    }
  }
}

export default Comic