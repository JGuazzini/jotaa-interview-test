import React from "react";

const ProductCard = ({product}) => {

    return (
      <div className='product'>
        <div>
          <p>{product.description}</p>
        </div>

        <div>
          <img src={product.image} alt={product.name} />
        </div>

        <div>
          <span>${product.price}</span>
          <h3>{product.name}</h3>
        </div>

      </div>
    )
}

export default ProductCard