'use client';

import React from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

import EmptyState from '@/components/EmptyState';
import LoaderSpinner from '@/components/LoaderSpinner';
import PodcastCard from '@/components/PodcastCard';
import Searchbar from '@/components/Searchbar';

const Discover = ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  const podcastsData = useQuery(api.podcasts.getPodcastBySearch, {
    search: search || '',
  });

  return (
    <div className='flex flex-col gap-9'>
      <Searchbar />
      <div className='flex flex-col gap-9'>
        <h1 className='text-20 font-bold text-white-1'>Discover</h1>
      </div>
      {podcastsData ? (
        <>
          {podcastsData.length > 0 ? (
            <div className='podcast_grid'>
              {podcastsData?.map(
                ({ _id, podcastTitle, podcastDescription, imageUrl }) => {
                  return (
                    <PodcastCard
                      key={_id}
                      imgUrl={imageUrl!}
                      title={podcastTitle}
                      description={podcastDescription}
                      podcastId={_id}
                    />
                  );
                }
              )}
            </div>
          ) : (
            <EmptyState title='No results found.' />
          )}
        </>
      ) : (
        <LoaderSpinner />
      )}
    </div>
  );
};

export default Discover;
