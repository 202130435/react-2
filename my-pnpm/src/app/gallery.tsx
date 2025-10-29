import { useState } from 'react'
import { Carousel } from 'acme-carousel'

export default function Gallery() {

  // 예제용 이미지(public/images에 직접 파일을 두거나 외부 URL 사용)
  const items = [
    { id: '1', src: '[https://picsum.photos/id/1015/600/600](https://picsum.photos/id/1015/600/600)', alt: 'Landscape 1' },
    { id: '2', src: '[https://picsum.photos/id/1018/600/600](https://picsum.photos/id/1018/600/600)', alt: 'Landscape 2' },
    { id: '3', src: '[https://picsum.photos/id/1019/600/600](https://picsum.photos/id/1019/600/600)', alt: 'Landscape 3' },
  ]

  return (
    <Carousel
      items={items}
    />
  )
}