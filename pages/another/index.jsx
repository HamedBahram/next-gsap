import { useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

import first from '@/public/images/first.jpg'
import second from '@/public/images/second.jpg'
import third from '@/public/images/third.jpg'
import fourth from '@/public/images/fourth.jpg'

gsap.registerPlugin(ScrollTrigger)

export default function Another() {
  const main = useRef()

  useIsomorphicLayoutEffect(() => {
    const ctx = gsap.context(context => {
      const cards = context.selector('.card')
      const stackHeight = window?.innerHeight * 0.1
      cards.forEach((card, i) => {
        gsap.fromTo(
          card.querySelector('.img'),
          {
            scale: 1,
            transformOrigin: 'center top',
            // filter: 'blur(0px)'
            filter: 'opacity(100%)'
          },
          {
            y: gsap.utils.mapRange(
              1,
              cards.length,
              -20,
              -stackHeight + 20,
              cards.length - i
            ),
            scale: gsap.utils.mapRange(1, cards.length, 0.4, 0.9, i),
            // filter:
            //   'blur(' +
            //   gsap.utils.mapRange(1, cards.length, 4, 25, cards.length - i) +
            //   'px)',
            filter: 'opacity(0%)',
            scrollTrigger: {
              trigger: card,
              markers: true,
              scrub: true,
              start: 'top ' + stackHeight,
              end: '+=' + window.innerHeight * 2,
              invalidateOnRefresh: true
            }
          }
        )
        // pin separately because we want the pinning to last the whole length of the page.
        ScrollTrigger.create({
          trigger: card,
          pin: true,
          start: 'top ' + stackHeight,
          endTrigger: '.following-content', // when the last card finishes its animation, unpin everything
          end: 'top ' + (stackHeight + 100),
          pinSpacing: false
        })
      })
    }, main)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={main} className='py-48'>
      <div className='container flex items-start justify-center'>
        <div className='relative mx-auto w-4/5'>
          <div className='card relative mx-auto my-12 h-auto w-full'>
            <Image src={first} className='img w-full max-w-full' />
          </div>
          <div className='card relative mx-auto my-12 h-auto w-full'>
            <Image src={second} className='img w-full max-w-full' />
          </div>
          <div className='card relative mx-auto my-12 h-auto w-full'>
            <Image src={third} className='img w-full max-w-full' />
          </div>
          <div className='card relative mx-auto my-12 h-auto w-full'>
            <Image src={fourth} className='img w-full max-w-full' />
          </div>
        </div>
      </div>

      <div className='following-content h-screen'>More content here</div>
    </section>
  )
}
