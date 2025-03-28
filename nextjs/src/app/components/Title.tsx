import { PropsWithChildren } from 'react'

export type TitleProps = {
  className?: string
}

export function Title(props: PropsWithChildren<TitleProps>) {
  return (
    <h2 className={`text-2xl md:text-3xl font-bold text-sympla-dark ${props.className || ''}`}>
      {props.children}
    </h2>
  )
}
