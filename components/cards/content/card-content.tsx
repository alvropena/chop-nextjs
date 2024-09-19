import React from "react";
import Image from "next/image";
import type { CardContentType } from "@/types/card/content/card-content-type";

const CardContent: React.FC<CardContentType> = ({
  passage,
  audioUrl,
  imageUrl,
}) => {
  return (
    <div>
      {/* Always render the passage */}
      <p className="p-4 rounded">{passage}</p>

      {/* Conditionally render the audio if provided */}
      {audioUrl && (
        <audio controls src={audioUrl} className="w-full mt-4">
          Your browser does not support the audio element.
        </audio>
      )}

      {/* Conditionally render the image if provided */}
      {imageUrl && (
        <div
          className="mt-4 w-full relative overflow-hidden rounded"
          style={{ height: "200px" }}
        >
          <Image
            src={imageUrl}
            alt="Content image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}
    </div>
  );
};

export default CardContent;
