const express = require("express");
const Product = require("./products.model");
const router = express.Router();
const multer = require('multer');
const path = require('path');


// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products/"); // Save uploaded files in the "uploads" folder
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// ✅ Get all products
router.get("/allProducts", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
// Fetch all products (with vendor_id = 1)
router.get('/display_vendor_products', async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { vendor_id: 1 }  // Filter by vendor ID 1
    });

    const productsWithImages = products.map(product => {
      // If the product has an image, append the full path
      if (product.image) {
        product.image = `http://localhost:5000${product.image}`;
      }
      return product;
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products' });
  }
});


router.get("/total-vendor-products", async (req, res) => {
  try {
    const vendorId = 1;  // Assuming vendor_id is always 1 for now
    const totalProducts = await Product.count({
      where: { vendor_id: vendorId }  // Count only products for this vendor
    });
    res.status(200).json({ totalProducts });
  } catch (error) {
    console.error("Error fetching total products:", error);
    res.status(500).json({ message: "Failed to fetch total products" });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});



// Create a product (updated to use vendor_id from session)
router.post("/create-vendor-product", upload.single("image"), async (req, res) => {
  try {
    // Retrieve vendor_id from session
    const vendor_id = "1"; // Replace with the actual vendor ID if needed


    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : null; // Get the file path

    // Create a new product with vendor_id
    const newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      skin_type_suitability: req.body.skin_type_suitability,
      brand: req.body.brand,
      stock: req.body.stock,
      image: imageUrl, // Store the image URL in the database
      vendor_id: vendor_id, // Set vendor_id from session
    });
    res.status(201).json(newProduct); // Respond with the created product
  } catch (error) {
  }
});

// Create a product
router.post("/create-product", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Failed to create product" });
  }
});






// Update a product

router.patch("/update-product/:id", upload.single('image'), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/products/${req.file.filename}` : req.body.image;

    const updatedProduct = await Product.update(
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        brand: req.body.brand,
        skin_type_suitability: req.body.skin_type_suitability,
        image: imageUrl, // Make sure image URL is updated in the database
      },
      {
        where: { product_id: req.params.id }
      }
    );

    if (!updatedProduct[0]) {
      return res.status(404).json({ message: "Product not found" });
    }
    // Fetch the updated product and return it
    const updatedProductData = await Product.findOne({ where: { product_id: req.params.id } });
    res.status(200).json({
      message: "Product updated successfully",
      product: updatedProductData, // Send back the entire updated product object
    });
  } catch (error) {
  }
});


// ✅ Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Failed to fetch product" });
  }
});



// Get products by brand
router.get("/brand/:brand", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { brand: req.params.brand },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this brand" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    res.status(500).json({ message: "Failed to fetch products by brand" });
  }
});


// Delete a product
router.delete("/:id", async (req, res) => {
  // ✅ Get products by skin type suitability
  router.get("/skin-type/:skinType", async (req, res) => {
    try {
      const products = await Product.findAll({
        where: { skin_type_suitability: req.params.skinType },
      });

      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for this skin type" });
      }

      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products by skin type suitability:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  })
});

// ✅ Get related products by category
router.get("/related/:category", async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { category: req.params.category },
    });

    if (products.length === 0) {
      return res.status(404).json({ message: "No related products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Failed to fetch related products" });
  }
});

module.exports = router;