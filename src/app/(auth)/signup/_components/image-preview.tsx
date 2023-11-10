import { FileWithPreview } from '@/types/file-with-preview';
import Image from 'next/image';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImagePreviewProps {
  files: FileWithPreview[];
  onSetFiles: (files: FileWithPreview[]) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ onSetFiles, files }) => {
  useEffect(() => {
    // revoke uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach((file: FileWithPreview) =>
        URL.revokeObjectURL(file.preview),
      );
  }, [files]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file: File) => {
        return Object.assign(file, {
          preview: URL.createObjectURL(file),
        });
      }) as FileWithPreview[];

      onSetFiles(newFiles);
    },
  });

  const thumbs = files.map((file: FileWithPreview) => (
    <div
      key={file.name}
      className="flex flex-row border border-gray-300 rounded mb-8 mr-8 p-4 box-border"
    >
      <div className="flex min-w-0 overflow-hidden">
        <Image
          src={file.preview}
          className="block h-auto"
          alt={file.name}
          width={100}
          height={50}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drop some files here, or click to select files</p>
      </div>
      <aside className="flex flex-row flex-wrap mt-4">{thumbs}</aside>
    </section>
  );
};

export default ImagePreview;
