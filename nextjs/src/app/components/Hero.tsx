import React from 'react';

export default function Hero() {
  return (
    <section className="bg-blue-100 py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Find the best events near you
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore a wide range of events and experiences.
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Explore Events
        </button>
      </div>
    </section>
  );
}
