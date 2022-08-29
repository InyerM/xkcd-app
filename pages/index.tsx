import type { NextPage } from 'next'
import fs from 'node:fs/promises'
import Link from 'next/link'
import Image from 'next/image'
import { ImageList } from '@mui/material'
import Layout from 'components/Layout'
import { xkcd_result } from 'types'
import { useI18N } from 'context/i18n'

type Props = {
  latestComics: Array<xkcd_result>
}

const Home: NextPage<Props> = ({ latestComics }: Props) => {
  const { t } = useI18N()
  return (
    <>
      <Layout title={`xkcd - ${t('comics_for_developers')}`} description={t('comics_for_developers')}>
        <main>
          <h2 className='text-3xl font-bold text-center'>{t('latest_comics')}</h2>
          <ImageList variant='masonry' cols={3} gap={10} className='max-w-2xl m-auto mt-3'>
            {
              latestComics && latestComics.map(comic => {
                return (
                  <Link href={`/comic/${comic.id}`} key={comic.id}>
                    <a className='m-auto'>
                      <Image 
                        width={comic.width} 
                        height={comic.height} 
                        src={comic.img} 
                        alt={comic.alt} 
                      />
                    </a>
                  </Link>
                )
              })
            }
          </ImageList>
        </main>
      </Layout>
    </>
  )
}

export async function getStaticProps(context: any) {
  const files = await fs.readdir('./comics')
  const latestComicsFiles = files.slice(-8, files.length)

  const promisesReadFiles = latestComicsFiles.map(async (file) => {
    const content = await fs.readFile(`./comics/${file}`, 'utf8')
    return JSON.parse(content)
  })

  const latestComics = await Promise.all(promisesReadFiles)

  return {
    props: {
      latestComics,
    },
  }
}


export default Home
