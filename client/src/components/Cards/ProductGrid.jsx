import React from 'react'
import { Link } from 'react-router-dom'

const ProductGrid = ({products, loading, error}) => {
    if (loading){
        return <p> Loading...</p>
    }
    if(error){
        return <p>Error:{error}</p>
    }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        {products.map((product,index)=>(
            <Link key={index} to={`/product/${product._id}`}className="block">
                <div className="p-4 rounded-xl ">
                    <div className="w-full h-96 mb-3">
                        <img
                        src={product.images[0].url}
                        alt={product.images[0].altText||product.name}
                        className="w-full h-full object-cover rounded-lg"
                        ></img>
                    </div>
                    <h3 className="text-sm mb-2">{product.name}</h3>
                    <p className="text-gray-500 font-medium text-sm tracking-tighter"> ${product.price}</p>
                </div>
            </Link>
        ))}
    </div>
  )
}

export default ProductGrid