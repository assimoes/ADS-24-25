
import { Router } from "express";
import { createTag, getTags } from "../controllers/tagController";

const router = Router();

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags: [Tags]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the tag
 *     responses:
 *       201:
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the created tag
 *                 name:
 *                   type: string
 *                   description: Name of the tag
 *                 links:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       rel:
 *                         type: string
 *                       href:
 *                         type: string
 *       400:
 *         description: Invalid request body or tag already exists
 *       500:
 *         description: Internal server error
 */
router.post("/", createTag);

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Retrieve all tags
 *     tags: [Tags]
 *     responses:
 *       200:
 *         description: List of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Tag ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: Tag name
 *                     example: "electronics"
 *                   links:
 *                     type: array
 *                     description: HATEOAS links for the tag
 *                     items:
 *                       type: object
 *                       properties:
 *                         rel:
 *                           type: string
 *                           description: Relation type
 *                           example: "self"
 *                         href:
 *                           type: string
 *                           description: URL for the resource
 *                           example: "/api/tags/1"
 *       500:
 *         description: Internal server error
 */
router.get("/", getTags);

export default router;
