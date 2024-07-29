// src/ProductPage.js
import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { productid } = useParams();

  // Simulate fetching product data
  const product = {
    name: "Sample Product",
    company: "Sample Company",
    category: "Sample Category",
    price: "$99.99",
    rating: "4.5",
    discount: "10%",
    availability: "In Stock",
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={12}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h2" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Company:</strong> {product.company}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Price:</strong> {product.price}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Rating:</strong> {product.rating}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Discount:</strong> {product.discount}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Availability:</strong> {product.availability}
            </Typography>
            <Button variant="contained" color="secondary">
              Add to Cart
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
