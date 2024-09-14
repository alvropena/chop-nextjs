import React from 'react';
import Image from 'next/image';

interface ReadingContentProps {
  passage: string;
  imageUrl?: string;
}

const ReadingContent: React.FC<ReadingContentProps> = ({ passage, imageUrl }) => {
  return (
    <div>
      <p className="p-4 rounded">{passage}</p>
      {imageUrl && (
        <div className="mt-4 w-full relative overflow-hidden rounded" style={{ height: "200px" }}>
          <Image src={imageUrl} alt="Reading content image" layout="fill" objectFit="cover" />
        </div>
      )}
    </div>
  );
};

export default ReadingContent;
