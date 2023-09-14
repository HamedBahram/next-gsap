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

export default function Project() {
  const main = useRef()

  useIsomorphicLayoutEffect(() => {
    // only run the animation on mobile
    // const mm = gsap.matchMedia(main)
    // mm.add('(max-width: 500px)', context => {
    //   const panels = context.selector('.panel')
    //   panels.forEach(panel => {
    //     ScrollTrigger.create({
    //       trigger: panel,
    //       start: 'top top',
    //       end: 'bottom top',
    //       pinSpacing: false,
    //       markers: true,
    //       scrub: true,
    //       pin: true,
    //       onUpdate: self => {
    //         const progress = self.progress.toFixed(2)

    //         if (progress > 0.3) {
    //           panel.classList.add('opacity-25', 'duration-[1500ms]')
    //         } else {
    //           panel.classList.remove('opacity-25', 'duration-[1500ms]')
    //         }

    //         if (progress > 0.85) {
    //           panel.classList.remove('opacity-25', 'duration-[1500ms]')
    //           panel.classList.add('opacity-0', 'duration-500')
    //         } else {
    //           panel.classList.remove('opacity-0', 'duration-500')
    //         }
    //       }
    //     })
    //   })
    // })

    // using a context to clean up the animation
    const ctx = gsap.context(context => {
      const panels = context.selector('.panel')
      panels.forEach(panel => {
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          end: 'bottom top',
          pinSpacing: false,
          markers: true,
          scrub: true,
          pin: true,
          onUpdate: self => {
            const progress = self.progress.toFixed(2)

            if (progress > 0.3) {
              panel.classList.add('opacity-25', 'duration-[1500ms]')
            } else {
              panel.classList.remove('opacity-25', 'duration-[1500ms]')
            }

            if (progress > 0.85) {
              panel.classList.remove('opacity-25', 'duration-[1500ms]')
              panel.classList.add('opacity-0', 'duration-500')
            } else {
              panel.classList.remove('opacity-0', 'duration-500')
            }
          }
        })
      })
    }, main)

    return () => {
      // mm.revert()
      ctx.revert()
    }
  }, [])

  return (
    <main ref={main} className='py-48'>
      <div className='container'>
        {/* single image section - right aligned */}
        <section>
          <div className='panel ml-auto w-3/4 border py-24 transition-opacity sm:w-1/2 sm:py-48'>
            <Image src={first} alt='' />
          </div>
        </section>

        {/* single image section – left aligned */}
        <section>
          <div className='panel w-3/4 border py-24 transition-opacity sm:w-1/2 sm:py-48'>
            <Image src={second} alt='' />
          </div>
        </section>

        {/* two images section */}
        <section>
          <div className='panel grid grid-cols-2 border py-24 transition-opacity sm:py-48'>
            <Image src={third} alt='' className='col-span-1' />
            <Image src={fourth} alt='' className='col-span-1' />
          </div>
        </section>

        {/* three images section */}
        <section>
          <div className='panel w-3/4 border py-24 transition-opacity sm:w-1/2 sm:py-48'>
            <Image src={first} alt='' />
          </div>
          <div className='panel w-3/4 border py-24 transition-opacity sm:w-1/2 sm:py-48'>
            <Image src={second} alt='' />
          </div>
          <div className='panel w-3/4 border py-24 transition-opacity sm:w-1/2 sm:py-48'>
            <Image src={third} alt='' />
          </div>
        </section>
      </div>
    </main>
  )
}
