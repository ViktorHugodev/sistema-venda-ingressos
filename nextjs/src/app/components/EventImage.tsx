import Image from 'next/image'

export type EventImageProps = {
  src: string
  alt: string
  className?: string
}

export function EventImage(props: EventImageProps) {
  return (
    <Image
      src={props.src}
      alt={props.alt}
      width={500}
      height={300}
      priority
      className={props.className || 'rounded-lg'}
    />
  )
}
