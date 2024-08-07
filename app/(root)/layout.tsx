import LeftSideBar from '@/components/LeftSideBar';
import MobileNav from '@/components/MobileNav';
import PodcastPlayer from '@/components/PodcastPlayer';
import RightSideBar from '@/components/RightSideBar';
import { Toaster } from '@/components/ui/toaster';
import Image from 'next/image';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex flex-col'>
      <main className='relative flex bg-black-3'>
        <LeftSideBar />

        <section className='flex flex-col flex-1 px-4 sm:px-14 min-h-screen'>
          <div className='mx-auto flex w-full max-w-5xl max-sm:px-4'>
            <div className='flex h-16 items-center justify-between md:hidden'>
              <Image
                src='icons/logo.svg'
                alt='menu icon'
                width={30}
                height={30}
              />
              <MobileNav />
            </div>
            <div className='flex flex-col md:pb-14 w-full'>
              <Toaster />
              {children}
            </div>
          </div>
        </section>

        <RightSideBar />
      </main>
      <PodcastPlayer />
    </div>
  );
}
