import { Router } from "express";
import { addToWishlist, removeFromWishlist, getUserWishlist } from "../controllers/wishlistController";

const router = Router();

/**
 * @swagger
 * /wishlist:
 *   post:
 *     summary: Add an ad to a user's wishlist
 *     tags: [Wishlist]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 type: integer
 *                 description: ID of the user
 *                 example: 1
 *               ad:
 *                 type: integer
 *                 description: ID of the ad
 *                 example: 1
 *     responses:
 *       201:
 *         description: Wishlist item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Wishlist ID
 *                   example: 1
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user1@example.com"
 *                 ad:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Ad Title"
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rel:
 *                         type: string
 *                         example: "self"
 *                       href:
 *                         type: string
 *                         example: "/api/wishlist/1"
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: User or ad not found
 *       500:
 *         description: Internal server error
 */
router.post("/", addToWishlist);

/**
 * @swagger
 * /wishlist/{id}:
 *   delete:
 *     summary: Remove an item from a user's wishlist
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the wishlist item
 *     responses:
 *       200:
 *         description: Wishlist item removed successfully
 *       404:
 *         description: Wishlist item not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", removeFromWishlist);

/**
 * @swagger
 * /wishlist/user/{userId}:
 *   get:
 *     summary: Get all wishlist items for a user
 *     tags: [Wishlist]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: List of wishlist items for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Wishlist item ID
 *                   user:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       email:
 *                         type: string
 *                   ad:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/user/:userId", getUserWishlist);

export default router;
