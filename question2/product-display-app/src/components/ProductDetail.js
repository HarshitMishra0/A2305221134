import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  CircularProgress,
} from "@mui/material";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!product) return <CircularProgress />;

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={`https://via.placeholder.com/500?text=${product.name}`}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="h6">{product.category}</Typography>
        <Typography variant="h6">${product.price}</Typography>
        <Typography variant="body1">{product.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
