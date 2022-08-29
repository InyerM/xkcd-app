import { useI18N } from "context/i18n"

const Footer = () => {
  const { t } = useI18N()

  return (
    <>
      <footer className="pt-4 pb-4 font-bold text-center">
        <a href='https://xkcd.com' target='_blank' rel='noopener noreferrer'>
          {t('all_comics_by')} xkcd
        </a>
      </footer>
    </>
  )
}

export default Footer