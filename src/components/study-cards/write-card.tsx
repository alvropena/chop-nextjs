import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import Image from 'next/image';

interface WriteCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const WriteCard: React.FC<WriteCardProps> = ({ title, description, imageUrl }) => {
  return (
    <>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
      {imageUrl && (
        <div className="mb-4">
          <Image
            src={imageUrl}
            alt={title}
            width={400}
            height={300}
            className="rounded"
            layout="responsive"
            objectFit="cover"
          />
        </div>
      )}
      <textarea
        className="mt-4 p-2 w-full h-32 border rounded"
        placeholder="Type your answer here..."
      />
    </>
  );
};

export default WriteCard;
