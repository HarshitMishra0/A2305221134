const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

let accessToken = null;
let tokenExpiry = null;

const clientID = "74bb730b-994e-4eba-a185-0196c67c5aef";
const clientSecret = "YGcjWrxBqgklHBHH";
const refreshTokenUrl = "http://20.244.56.144/test/auth";

const fetchAccessToken = async () => {
  try {
    const response = await axios.post(refreshTokenUrl, {
      companyName: "AMITY UNIVERSITY NOIDA",
      clientID,
      clientSecret,
      ownerName: "Harshit Mishra",
      ownerEmail: "harshit.mishra6@s.amity.edu",
      rollNo: "A2305221134",
    });

    accessToken = response.data.access_token;
    tokenExpiry = new Date().getTime() + response.data.expires_in * 1000;
  } catch (error) {
    console.error("Failed to fetch access token:", error);
    throw new Error("Failed to fetch access token");
  }
};

const getAccessToken = async () => {
  if (!accessToken || new Date().getTime() > tokenExpiry) {
    await fetchAccessToken();
  }
  return accessToken;
};

app.get("/products", async (req, res) => {
  const {
    productName,
    n,
    page,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice,
    company,
  } = req.query;

  let itemsPerPage = parseInt(n) || 10;
  let currentPage = parseInt(page) || 1;
  let sortDirection = sortOrder === "desc" ? -1 : 1;

  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `http://20.244.56.144/test/companies/${company}/categories/${productName}/products`,
      {
        headers: { Authorization: `Bearer ${token}` },
        params: { top: itemsPerPage, minPrice, maxPrice },
      }
    );

    let products = response.data;

    if (sortBy) {
      products = products.sort(
        (a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDirection
      );
    }

    const start = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = products.slice(start, start + itemsPerPage);

    const result = paginatedProducts.map((product, index) => ({
      ...product,
      id: `${productName}-${start + index + 1}`,
    }));

    res.json(result);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.get("/products/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `http://20.244.56.144/test/products/${productid}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const product = response.data;

    res.json(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
    res.status(500).json({ error: "Failed to fetch product details" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
