import React from 'react'

type Props = {
  link: number | string,
  title: string | undefined,
  onClick: (link: number | string) => void
}

const Item = ({ link, title, onClick }: Props) => {
  return (
    <li className='transition-all rounded-lg cursor-pointer hover:bg-zinc-100 hover:opacity-60'>
      <div className='flex items-center justify-between p-2' onClick={() => onClick(link)}>
        <div>
          {
            link && isNaN(link as number) ? (
              <h2 className='italic text-gray-500 text-md'>{title}</h2>
            ) : (
              <h2 className='text-sm font-semibold'>{title}</h2>
            )
          }
        </div>
        <div className='text-sm'>
          {
            link && !isNaN(link as number) && (
              <p className='text-sm font-semibold'>{link}</p>
            )
          }
        </div>
      </div>
    </li>
)
}

export default Item