import * as React from 'react';
import { useParams } from "react-router-dom";

const Shop = () => {
    let params = useParams();
    return( 
            <h2>Shop {params.shopIndex}</h2>
    );
}

export default Shop;