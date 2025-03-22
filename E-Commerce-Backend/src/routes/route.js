const router = require("express").Router();
const authMiddleware = require('../middleware/auth.js');
const User = require("../models/userModel.js");
const {
  signUpUser,
  logInUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const {addProduct,getProducts,getProductById,updateProduct,deleteProduct} = require('../controllers/productController');

const {addToCart, getAllCarts, getCarts, removeCart} = require('../controllers/cartController.js');
const {createContact,getContacts} = require('../controllers/contactController.js')
//Users
// router.post("/signupUser", signUpUser);
const asyncHandler = require("express-async-handler");

router.post("/signupUser",(signUpUser));

//LogIn User
router.post("/loginUser", logInUser);
// Get Users
router.get("/getUsers", authMiddleware, getUsers);
// Get By Id
router.get("/getUser/:userId", authMiddleware, getUserById);
// Update User
router.put("/updateUser/:userId", authMiddleware, updateUser);
// Delete User
router.delete("/deleteUser/:userId", authMiddleware, deleteUser);


// Products
router.post("/addProduct", authMiddleware, addProduct);
router.get("/getProducts", authMiddleware, getProducts);
router.get("/getProduct/:productId", authMiddleware, getProductById);
router.put("/updateProduct/:productId", authMiddleware, updateProduct);
router.delete("/deleteProduct/:productId", authMiddleware, deleteProduct);


// Cart 
router.post("/addcart",authMiddleware,addToCart)
router.get("/getAllCarts",authMiddleware,getAllCarts);
router.get("/getCart/:userId", getCarts);
router.delete("/removeProductFromCart",removeCart)

// Caontact 
router.post('/addContact', createContact);
router.get('/getContact', getContacts);
module.exports = router;
