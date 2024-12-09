const express = require("express");
const {
  getOrdersByUserId,
  addOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const router = express.Router();
router.route("/add-order").post(addOrder);
// router.route("/").get(getAllWishlists).delete(clearWishlist);
// router.route("/:id").get(getOneWishlist);
router.route("/user/:user_id").get(getOrdersByUserId);
router.route("/").get(getAllOrders);
router.route("/:order_id").put(updateOrder).delete(deleteOrder);

// router.route("/add-item").post(addItemToWishlist);
// router.route("/delete-item").delete(removeWishlistItem);
module.exports = router;
