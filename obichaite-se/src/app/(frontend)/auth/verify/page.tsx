'use client'

import { useEffect, useRef, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { verifyUser } from '@/action/auth/verify'
import { GenericImage, GenericParagraph } from '@/components/Generic'
import Link from 'next/link'

export default function VerifyPage() {
  const params = useSearchParams()
  const router = useRouter()
  const ran = useRef(false)
  const [status, setStatus] = useState<'idle' | 'verifying' | 'ok' | 'error' | 'missing'>('idle')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (ran.current) return
    ran.current = true
    const token = params.get('token')
    if (!token) {
      setStatus('missing')
      setMessage('Линкът е навалиден или изтекъл')
      return
    }
    ;(async () => {
      try {
        setStatus('verifying')
        await verifyUser(token)
        setStatus('ok')
        setMessage('Верификацията е завършена...')
        setTimeout(() => router.replace('/auth/login'), 800)
      } catch (err) {
        console.error(err)
        setStatus('error')
        setMessage('Линкът е навалиден или изтекъл')
      }
    })()
  }, [params, router])

  return (
    <section className="w-full relative py-10 md:py-20 flex mt-[52px] md:mt-[140px]">
      <GenericImage
        src="/static/auth-background.png"
        alt="auth-background"
        wrapperClassName="w-full h-full absolute top-0 left-0 z-[0]"
        imageClassName="w-full h-full object-cover"
        fill={true}
        sizes="100vw"
        fetchPriority="high"
      />
      <div className="m-auto white_background_bubble w-fit md:py-10 relative z-[1] rounded-[24px] flex flex-col-reverse md:flex-row">
        <div className="px-4 py-8 m-auto flex flex-col gap-4 items-center justify-center w-full">
          <h2 className="text-xl font-semibold">Потвърди Имейл</h2>
          <p className="mt-3">
            {status === 'idle' && 'Подготвя се…'}
            {status === 'verifying' && 'Верификация на имейл…'}
            {(status === 'ok' || status === 'error' || status === 'missing') && message}
          </p>
          {status === 'error' ||
            (status === 'missing' && (
              <p className="mt-3 text-sm text-black max-w-[300px] text-center">
                Можете да попълните формата за регистрация, но имейлът трябва да бъде валиден.
              </p>
            ))}
        </div>

        <div className="w-full md:w-[300px] aspect-[3/4] md:aspect-[2.5/4] md:translate-x-[50%] h-[calc(100%-96px)] z-[2] rounded-tr-[12px] rounded-tl-[12px] md:rounded-[12px] overflow-hidden relative">
          <div className="absolute z-[2] bg-black/20 py-2 left-0 right-0 top-[28px] border-t-[1px] border-b-[1px] border-white/20">
            <GenericParagraph
              pType="regular"
              textColor="text-white"
              fontStyle="font-sansation font-[700]"
              extraClass="uppercase w-full text-center"
            >
              <span>Верификация</span>
            </GenericParagraph>
          </div>
          <GenericImage
            src="/static/auth-inner.jpg"
            alt="auth-inner"
            wrapperClassName="w-full h-full absolute top-0 left-0 z-[0]"
            imageClassName="w-full h-full object-cover"
            fill={true}
            sizes="400px"
          />

          <div className="absolute z-[2] bg-black/20 py-[2px] left-0 right-0 bottom-[0px] border-t-[1px] flex justify-center items-center border-b-[1px] border-white/20">
            <Link href="/terms" className="w-full text-white text-center">
              <span className="font-kolka font-[400] text-white text-center text-[14px] w-full">
                Политика за поверителност
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
