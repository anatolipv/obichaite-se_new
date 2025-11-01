'use client'

import Link from 'next/link'
import React from 'react'
import type { Category, SubCategory } from '@/payload-types'

type Props = {
  subCategories: SubCategory[]
  durationSec?: number // loop duration in seconds
  className?: string
}

const SubCategorySlider: React.FC<Props> = ({
  subCategories,
  durationSec = 28,
  className = '',
}) => {
  const [paused, setPaused] = React.useState(false)

  const Row = () => (
    <ul className="flex items-center whitespace-nowrap gap-3 md:gap-4 mr-3 md:mr-4">
      {subCategories.map((sub) => {
        const parent = sub.parentCategory as Category | undefined
        const href = parent?.slug
          ? `/kategorii/${parent.slug}/${sub.slug}`
          : `/kategorii/${sub.slug}`
        return (
          <li key={sub.id} className="shrink-0">
            <Link
              href={href}
              prefetch={false}
              className="inline-flex items-center justify-center rounded-full border border-white/35 px-4 py-2 text-sm md:text-base text-white/90 hover:text-white hover:border-white/60 transition-colors duration-200 select-none"
            >
              {sub.title}
            </Link>
          </li>
        )
      })}
    </ul>
  )

  return (
    <nav
      aria-label="Подкатегории"
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      // onPointerDown={() => setPaused(true)}
      // onPointerUp={() => setPaused(false)}
      // onTouchStart={() => setPaused(true)}
      // onTouchEnd={() => setPaused(false)}
      // onTouchCancel={() => setPaused(false)}
    >
      <div
        className={`flex w-max will-change-transform motion-reduce:animate-none`}
        style={{
          animationName: 'subcategory-marquee',
          animationDuration: `${durationSec}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationPlayState: (paused ? 'paused' : 'running') as 'paused' | 'running',
        }}
      >
        <Row />
        <Row />
      </div>

      <style jsx global>{`
        @keyframes subcategory-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-reduce\\:animate-none {
            animation: none !important;
          }
        }
      `}</style>
    </nav>
  )
}

export default SubCategorySlider
