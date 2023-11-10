'use client';
import React, { memo, useState } from 'react';
import Image from 'next/image';
import { wrap } from 'framer-motion';
import { Environment } from '@/environment';
import Slider from './slider';

const staticFilesUrl = Environment.STATIC_BASE_URL;

type Photo = {
  id: number;
  url: string;
  name: string;
};

type PhotoGalleryProps = {
  photos: Photo[];
};

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [selectedId, setSelectedId] = useState<number>(0);
  const [[page, direction], setPage] = useState([0, 0]);
  const photoIndex = wrap(0, photos.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const onClickNext = () => {
    paginate(-1);
  };

  const onClickPrevious = () => {
    paginate(1);
  };

  const onCloseSlider = () => {
    setSelectedId(0);
  };

  const onClickOutside = () => {
    setSelectedId(0);
  };

  const photo = photos[photoIndex];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map(({ id, url, name }) => (
          <div key={id} className="grid gap-4">
            <div>
              <Image
                src={`${staticFilesUrl}/${url}`}
                alt={name}
                className="h-auto max-w-full rounded-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
                width={300}
                height={200}
                onClick={() => setSelectedId(id)}
              />
            </div>
          </div>
        ))}
      </div>

      {selectedId > 0 && (
        <Slider
          photo={photo}
          page={page}
          direction={direction}
          staticFilesUrl={staticFilesUrl}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          onClickOutside={onClickOutside}
          onCloseSlider={onCloseSlider}
        />
      )}
    </>
  );
};

export default memo(PhotoGallery);
