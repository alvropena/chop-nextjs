import React from 'react'
import Image from 'next/image'
import { TeamMemberType } from '../../types/team-member-type'

export default function TeamMember({ name, position, imageSrc, profileLink }: TeamMemberType) {
    return (
        <div className="flex items-center gap-4">
            <Image
                src={imageSrc}
                width={64}
                height={64}
                alt={name}
                className="rounded-full"
                style={{ aspectRatio: "64/64", objectFit: "cover" }}
            />
            <div>
                <p className="font-medium">
                    <a href={profileLink} target="_blank" rel="noopener noreferrer" className="custom-underline hover:underline">
                        {name}
                    </a>
                </p>
                <p className="text-muted-foreground">{position}</p>
            </div>
        </div>
    )
}
