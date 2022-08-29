import Link from 'next/link'
import { useRef, useState, MutableRefObject } from 'react'
import { xkcd_result } from 'types'
import axios from 'axios'
import { useRouter } from 'next/router'
import Item from './search/Item'
import { useI18N } from 'context/i18n'

const Header = () => {
  const [results, setResults] = useState<Array<xkcd_result>>([])
  const searchRef = useRef() as MutableRefObject<HTMLInputElement>
  const router = useRouter()

  const { t } = useI18N()

  const getValue = () => searchRef.current.value

  const handleChange = async () => {
    const q = getValue()
    
    const { data } = await axios.get(`/api/search?q=${q}`)
    setResults(data)
  }

  const handleClick = (link: number | string) => {
    isNaN(link as number) ? router.push(`/${link}?q=${getValue()}`) : router.push(`/comic/${link}`)
    searchRef.current.value = ''
    setResults([])
  }

  const restOfLocales = router.locales?.filter(l => l !== router.locale)
  return (
    <header className='flex items-center justify-between max-w-2xl p-4 m-auto'>
      <h1 className='font-bold'>
        <Link href='/'>
          <a className='transition-all hover:opacity-80'>
            Next <span className='font-light'>xkcd</span>
          </a>
        </Link>
      </h1>
      <nav>
        <ul className='flex flex-row items-center gap-4 mt-2'>
          <li className='transition-all hover:opacity-70'>
            <Link href="/">
              <a className='py-2 text-sm font-semibold'>{t('home')}</a>
            </Link>
          </li>
          {
            restOfLocales && restOfLocales.length > 0 && (
              <li className='transition-all hover:opacity-70'>
                <Link href={`${router.asPath}`} locale={restOfLocales[0]}>
                  <a className='py-2 text-sm font-semibold'>{restOfLocales[0]}</a>
                </Link>
              </li>
            )
          }
          <li className='max-w-lg'>
            <input 
              type='search' 
              placeholder={t('search_comics')} 
              onChange={handleChange} 
              ref={searchRef}
              className='min-w-full px-4 py-2 text-sm font-semibold text-gray-900 border-none rounded-md shadow-md bg-zinc-300 opacity-30 focus:outline-none focus:border-none'
            />
            {
              <div className='relative'>
              {
                results && results.length > 0 && (
                  <ul className='absolute top-0 z-10 w-full p-2 bg-white rounded shadow-md'>
                    <Item title={t('search_results_title', results.length, getValue())} link='search' onClick={handleClick}/>
                    {
                      results.map(result => (
                        <Item key={result.id} title={result.title} link={result.id} onClick={handleClick}/>
                      ))
                    }
                  </ul>
                )
              }
              </div>
            }
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header