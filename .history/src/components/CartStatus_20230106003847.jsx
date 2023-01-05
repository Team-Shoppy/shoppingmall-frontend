import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import useCart from '../components/hooks/useCart';
import AllProducts from '../pages/AllProducts';


export default function CartStatus() {
  const {data : AllProducts}

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-4xl' />
      {products && (
        <p className='w-6 h-6 text-center bg-brand text-white font-bold rounded-full absolute -top-1 -right-2'>
          {products.length}
        </p>
      )}
    </div>
  );
}
