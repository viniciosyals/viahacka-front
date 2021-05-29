import React from 'react';

interface Props {
  col?: string;
  children: any;
}

const Card = ({ col, children }: Props) => (
  <div className={`bg-white rounded-xl shadow-lg divide-y divide-gray-100 ${col ? `col-${col}` : ''}`}>
    {children}
  </div>
)

Card.Title = ({ children }: any) => (
  <div className="p-4 text-md font-medium">
    {children}
  </div>
)

Card.Body = ({ children }: any) => (
  <div className="p-4">
    {children}
  </div>
)

export default Card;
