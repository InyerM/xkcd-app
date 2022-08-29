import Layout from "components/Layout"
import { useI18N } from "context/i18n"

const NotFound = () => {
  const { t } = useI18N()
  return (
    <div className="min-h-screen">
      <Layout title={`xkcd - ${t('page_not_found')}`} description={t('page_not_found')}>
        <main className='text-xl flex flex-row m-auto max-w-full justify-center items-center py-56'>
          <h1 className='font-bold m-2'>404</h1>
          <div className=''>|</div>
          <p className='font-bold m-2'>{t('page_not_found')}</p>
        </main>
      </Layout>
    </div>
  )
}

export default NotFound