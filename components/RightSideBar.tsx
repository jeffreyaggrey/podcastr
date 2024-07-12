'use client';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Header from './Header';
import Carousel from './Carousel';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import LoaderSpinner from './LoaderSpinner';

const RightSideBar = () => {
  const router = useRouter();

  const { user } = useUser();
  const topPodcasters = useQuery(api.users.getTopUserByPodcastCount);

  if (!topPodcasters) return <LoaderSpinner />;

  return (
    <section className='right_sidebar text-white-1'>
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className='flex gap-3 pb-12'>
          <UserButton />
          <div className='flex w-full items-center justify-between'>
            <p className='text-16 truncate font-semibold text-white-1'>
              {user?.firstName} {user?.lastName}
            </p>
            <Image
              src='/icons/right-arrow.svg'
              width={24}
              height={24}
              alt='arrow'
            />
          </div>
        </Link>
      </SignedIn>

      <section>
        <Header headerTitle='Fans Like You' />
        <Carousel fansLikeDetail={topPodcasters!} />
      </section>
      <section className='flex flex-col gap-8 pt-12'>
        <Header headerTitle='Top Podcasters' />
        <div className='flex flex-col gap-6'>
          {topPodcasters?.slice(0, 5).map((podcaster) => (
            <div
              className='flex cursor-pointer justify-between'
              key={podcaster._id}
              onClick={() => router.push(`/profile/${podcaster.clerkId}`)}
            >
              <figure className='flex items-center gap-2'>
                <Image
                  src={podcaster.imageUrl}
                  width={44}
                  height={44}
                  alt={podcaster.name}
                  className='aspect-square rounded-lg'
                />
                <h2 className='text-14 font-semibold text-white-1'>
                  {podcaster.name}
                </h2>
              </figure>
              <div className='flex items-center'>
                <p className='text-12 font-normal'>
                  {podcaster.totalPodcasts}{' '}
                  {podcaster.totalPodcasts <= 1 ? 'podcast' : 'podcasts'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};

export default RightSideBar;
