import React, { useCallback } from 'react';
import { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel';
import { DotButton, useDotButton } from './EmblaCarousleDotButton';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { CarouselProps } from '@/types';
import { useRouter } from 'next/router';

const EmblaCarousel = ({ fansAlsolikeDetails }: CarouselProps) => {
  //   const router = useRouter();

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay || !('stopOnInteraction' in autoplay.options)) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick
  );

  const slides =
    fansAlsolikeDetails &&
    fansAlsolikeDetails?.filter((item: any) => item.totalPodcasts > 0);

  return (
    <section className='embla'>
      <div className='embla__viewport' ref={emblaRef}>
        <div className='embla__container'>
          {slides.map((index) => (
            <div className='embla__slide' key={index}>
              <div className='embla__slide__number'>{index + 1}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='embla__controls'>
        <div className='embla__dots'>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
