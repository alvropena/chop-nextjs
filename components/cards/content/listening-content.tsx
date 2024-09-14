import React from 'react';
import Image from 'next/image';

interface ListeningContentProps {
  audioUrl: string;
  imageUrl?: string;
}

const ListeningContent: React.FC<ListeningContentProps> = ({ audioUrl, imageUrl }) => {
  return (
    <div>
      <audio controls src={audioUrl} className="w-full mt-4">
        Your browser does not support the audio element.
      </audio>
      {imageUrl && (
        <div className="mt-4 w-full relative overflow-hidden rounded" style={{ height: "200px" }}>
          <Image src={imageUrl} alt="Listening content image" layout="fill" objectFit="cover" />
        </div>
      )}
    </div>
  );
};

export default ListeningContent;
