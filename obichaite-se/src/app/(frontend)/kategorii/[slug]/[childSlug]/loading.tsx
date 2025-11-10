import GlobalLoader from '@/components/Loader/GlobalLoader'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[20] bg-brown">
      <GlobalLoader color={'#FFFFFF'} />
    </div>
  )
}
