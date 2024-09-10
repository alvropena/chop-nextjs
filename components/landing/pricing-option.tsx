import React from 'react';
import Link from 'next/link';
import { PricingOptionType } from './pricing-option-type';

export function PricingOption({ title, description, price, linkText, linkHref }: PricingOptionType) {
    return (
        <div className="rounded-lg border border-input bg-background p-6 shadow-sm">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p className="mt-4 text-muted-foreground">
                {description}
                {linkText && linkHref && (
                    <Link href={linkHref} className="text-primary underline">
                        {linkText}
                    </Link>
                )}
            </p>
            <div className="mt-8">
                <span className="text-4xl font-bold tracking-tight text-foreground">{price}</span>
                <span className="text-muted-foreground">/month</span>
            </div>
        </div>
    );
}
