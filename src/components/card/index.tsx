import React from 'react';
import styled from 'styled-components';

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

const Spinner = styled.svg.attrs({
  className: 'animate-spin rounded-full',
  viewBox: '0 0 24 24'
})`
  & {
    background: linear-gradient(#00d3c3, #6a5aff);
    -webkit-mask:radial-gradient(farthest-side, transparent calc(100% - 10px), #fff 0);
            mask:radial-gradient(farthest-side, transparent calc(100% - 10px), #fff 0);
    width: 60px;
    height: 60px;
    border-radius: 50%;
    position: absolute;
    top: calc(50% - 30px);
    left: calc(50% - 30px);  
  }
`;

Card.Body = ({ children, loading }: any) => (
  <div className="relative">
    {loading ? <Spinner /> : ''}
    <div className={`p-4 ${loading ? `invisible` : ''}`}>
      {children}
    </div>
  </div>
)

export default Card;
