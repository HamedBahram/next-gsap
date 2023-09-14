import { useRef } from 'react'
import { gsap } from 'gsap/dist/gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useIsomorphicLayoutEffect } from '@/hooks/useIsomorphicLayoutEffect'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const main = useRef()

  useIsomorphicLayoutEffect(() => {
    // using a context to clean up the animation
    // const ctx = gsap.context(context => {
    //   gsap.to('.box', {
    //     x: '25vw',
    //     stagger: 0.2,
    //     duration: 1,
    //     scrollTrigger: {
    //       trigger: '.box',
    //       start: 'bottom bottom',
    //       end: 'top top',
    //       scrub: true,
    //       markers: true
    //     }
    //   })
    // }, main)

    // only run on mobile
    const mm = gsap.matchMedia(main)
    mm.add('(max-width: 500px)', context => {
      gsap.to('.box', {
        x: '25vw',
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: '.box',
          start: 'bottom bottom',
          end: 'top top',
          scrub: true,
          markers: true
        }
      })
    })
    return () => {
      // ctx.revert()
      mm.revert()
    }
  }, [])

  return (
    <main>
      <section className='flex h-screen items-center justify-center bg-sky-500 text-white'>
        <div>
          <h1 className='text-3xl font-semibold'>
            Basic ScrollTrigger with React
          </h1>
          <h2 className='text-lg'>Scroll down to see the magic happen!!</h2>
        </div>
      </section>

      <section
        className='flex h-screen items-center justify-center bg-white text-black'
        ref={main}
      >
        <div>
          <h1 className='text-3xl font-semibold'>
            This boxes animates as you scroll!
          </h1>
          <div className='mt-16 flex flex-col gap-6 text-sm font-light tracking-wide text-white'>
            <div className='box flex h-32 w-32 items-center justify-center rounded-md bg-black uppercase'>
              box
            </div>
            <div className='box flex h-32 w-32 items-center justify-center rounded-md bg-black uppercase'>
              box
            </div>
            <div className='box flex h-32 w-32 items-center justify-center rounded-md bg-black uppercase'>
              box
            </div>
          </div>
        </div>
      </section>

      <section className='flex h-screen items-center justify-center bg-emerald-500 text-white'>
        <div>
          <h1 className='text-3xl font-semibold'>The End!</h1>
          <h2 className='text-lg'>Scroll up to see the magic again!!</h2>
        </div>
      </section>
    </main>
  )
}
