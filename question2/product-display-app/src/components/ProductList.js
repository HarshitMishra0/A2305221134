import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";

const ProductList = ({ products }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product) => (
        <Card key={product.id} style={{ width: "250px", margin: "16px" }}>
          <CardMedia
            component="img"
            height="140"
            image={`https://via.placeholder.com/250?text=${product.name}`}
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h6">{product.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {product.category}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${product.price}
            </Typography>
            <Link to={`/product/${product.id}`}>View Details</Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductList;
