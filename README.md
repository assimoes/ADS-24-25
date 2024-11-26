# Classified Ads API

## Introduction

A RESTful API for managing classified ads with features like user management, tagging, and wishlists. This API follows the Richardson Maturity Model Level 3 with HATEOAS.

## Routes

### Get all ads

  ```
  GET /api/ads
  ```
#### Response

```
[
  {
    "id": 1,
    "title": "Ad Title",
    "description": "Ad Description",
    "price": 100,
    "tags": [{ "id": 1, "name": "Electronics" }],
    "links": [
      { "rel": "self", "href": "/api/ads/1" },
      { "rel": "update", "href": "/api/ads/1/update" },
      { "rel": "delete", "href": "/api/ads/1/delete" }
    ]
  }
]

```

### Get single ad

  ```
  GET /api/ads/:id
  ```
#### Response

```
{
  "id": 1,
  "title": "Ad Title",
  "description": "Ad Description",
  "price": 100,
  "tags": [{ "id": 1, "name": "Electronics" }],
  "links": [
    { "rel": "self", "href": "/api/ads/1" },
    { "rel": "update", "href": "/api/ads/1/update" },
    { "rel": "delete", "href": "/api/ads/1/delete" }
  ]
}

```

### Create an Ad

```
POST /api/ads
```

#### Payload

```
{
  "title": "Ad Title",
  "description": "Ad Description",
  "price": 100,
  "user": 1,
  "tags": [1, 2]
}

```

#### Response

```
{
  "id": 1,
  "title": "Ad Title",
  "description": "Ad Description",
  "price": 100,
  "tags": [{ "id": 1, "name": "Electronics" }],
  "links": [
    { "rel": "self", "href": "/api/ads/1" },
    { "rel": "update", "href": "/api/ads/1/update" },
    { "rel": "delete", "href": "/api/ads/1/delete" }
  ]
}

```

### Update an Ad

```
PUT /api/ads/:id
```

#### Payload

```
{
  "title": "Updated Title",
  "description": "Updated Description",
  "price": 120
}

```

#### Response

```
{
  "id": 1,
  "title": "Updated Title",
  "description": "Updated Description",
  "price": 120,
  "links": [
    { "rel": "self", "href": "/api/ads/1" },
    { "rel": "update", "href": "/api/ads/1/update" },
    { "rel": "delete", "href": "/api/ads/1/delete" }
  ]
}

```

### Delete an Ad

```
DELETE /api/ads/1
```

#### Response

```
{
  "message": "Ad deleted successfully"
}

```

### Add Wishlist item

```
POST /api/whishlist
```

#### Payload

```
{
  "user": 1,
  "ad": 1
}

```

#### Response
```
{
  "id": 1,
  "user": { "id": 1, "email": "user@example.com" },
  "ad": { "id": 1, "title": "Ad Title" },
  "links": [
    { "rel": "self", "href": "/api/wishlist/1" },
    { "rel": "delete", "href": "/api/wishlist/1/delete" }
  ]
}
```

### Remove Wishlist item

```
DELETE /api/whishlist/:id
```


#### Response
```
{
  "message": "Wishlist item removed successfully"
}
```