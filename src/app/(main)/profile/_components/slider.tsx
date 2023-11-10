import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import Image from 'next/image';
import { Photo } from '@/types/photo';

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

interface SliderProps {
  photo: Photo;
  page: number;
  direction: number;
  staticFilesUrl: string;
  onClickOutside: () => void;
  onClickNext: () => void;
  onClickPrevious: () => void;
  onCloseSlider: () => void;
}

const Slider: React.FC<SliderProps> = ({
  photo,
  page,
  direction,
  staticFilesUrl,
  onClickNext,
  onClickPrevious,
  onClickOutside,
  onCloseSlider,
}) => {
  return (
    <>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          className="items-center justify-center flex w-full h-full fixed top-0 left-0 bg-black bg-opacity-50"
          key={page}
          custom={direction}
          variants={variants}
          onClick={onClickOutside}
        >
          <motion.div
            className="flex flex-col items-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.1 },
            }}
          >
            <Image
              className="rounded"
              src={`${staticFilesUrl}/${photo.url}`}
              alt={photo.name}
              width={400}
              height={400}
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
          <motion.button
            className="absolute top-[100px] right-[50px]"
            onClick={onCloseSlider}
          >
            <X />
          </motion.button>
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="top-1/2 absolute cursor-pointer rounded-[30px] z-[2] w-[50px] h-[50px] left-[10px] justify-center items-center flex"
        onClick={onClickPrevious}
        whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowLeft />
      </motion.div>
      <motion.div
        className="top-1/2 absolute cursor-pointer rounded-[30px] z-[2] w-[50px] h-[50px] right-[10px] justify-center items-center flex"
        onClick={onClickNext}
        whileHover={{ scale: 1.2, transition: { duration: 0.5 } }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowRight />
      </motion.div>
    </>
  );
};

export default memo(Slider);
