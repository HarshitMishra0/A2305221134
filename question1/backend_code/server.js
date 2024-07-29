const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.use(express.json());

let accessToken = null;
let tokenExpiry = null;

const CLIENT_ID = "74bb730b-994e-4eba-a185-0196c67c5aef";
const CLIENT_SECRET = "YGcjWrxBqgklHBHH";
const TOKEN_URL = "http://20.244.56.144/test/auth";

const fetchNewAccessToken = async () => {
  try {
    const response = await axios.post(TOKEN_URL, {
      companyName: "AMITY UNIVERSITY NOIDA",
      clientID: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      ownerName: "Harshit Mishra",
      ownerEmail: "harshit.mishra6@s.amity.edu",
      rollNo: "A2305221134",
    });

    accessToken = response.data.access_token;
    tokenExpiry = Date.now() + response.data.expires_in * 1000;
  } catch (error) {
    console.error("Failed to fetch new access token:", error.message);
    throw new Error("Failed to fetch new access token");
  }
};

const getValidAccessToken = async () => {
  if (!accessToken || Date.now() > tokenExpiry) {
    await fetchNewAccessToken();
  }
  return accessToken;
};

app.get("/api/products", async (req, res) => {
  const {
    productName,
    n = 10,
    page = 1,
    sortBy,
    sortOrder = "asc",
    minPrice,
    maxPrice,
    company,
  } = req.query;

  const itemsPerPage = parseInt(n, 10);
  const currentPage = parseInt(page, 10);
  const sortDirection = sortOrder === "desc" ? -1 : 1;

  try {
    const token = await getValidAccessToken();
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
    console.error("Error retrieving products:", error.message);
    res.status(500).json({ error: "Unable to retrieve products" });
  }
});

app.get("/api/products/:productid", async (req, res) => {
  const { productid } = req.params;

  try {
    const token = await getValidAccessToken();
    const response = await axios.get(
      `http://20.244.56.144/test/products/${productid}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const product = response.data;

    res.json(product);
  } catch (error) {
    console.error("Error retrieving product details:", error.message);
    res.status(500).json({ error: "Unable to retrieve product details" });
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on http://localhost:${port}`);
});
