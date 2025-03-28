import React from 'react';
import Card from './Card';

interface CardVariantAProps {
  title: string;
  description: string;
  imageUrl: string;
}

export default function CardVariantA({
  title,
  description,
  imageUrl,
}: CardVariantAProps) {
  return (
    <Card>
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </Card>
  );
}
