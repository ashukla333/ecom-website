import React from 'react'
import ProductCard from '../common/card/ProductCard'
import { product, product2 } from '../json'

const CategoryRightSide = () => {
    return (
        <div className='md:p-2 grid lg:grid-cols-5 xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 md:gap-5 gap-2'>
            {
                [...product?.products, ...product2?.products].map((value, index) => {
                    return <ProductCard
                        value={value}
                        key={index}
                    />
                })

            }
        </div>
    )
}

export default CategoryRightSide