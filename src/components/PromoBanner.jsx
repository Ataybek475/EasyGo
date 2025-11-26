// components/PromoBanner.jsx
import React from 'react';

export const PromoBanner = () => {
  return (
    <div className="mt-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl p-4 flex justify-between items-center">
      <div>
        <div className="font-semibold">Скидка 20% на</div>
        <div className="font-semibold">первую поездку</div>
      </div>
      <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
        EASYGO25
      </div>
    </div>
  );
};