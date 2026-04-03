# StockMyProducts

> API REST back-end sécurisée pour la gestion de produits, de stock et de catégories.  
> Exploitable via **Postman** · Authentification **JWT** · Architecture **MVC**

---

## Fonctionnalités

- Authentification JWT (Register / Login)
- Gestion des utilisateurs avec rôles (`admin`, `manager`, `user`)
- CRUD Produits
- CRUD Catégories
- Gestion des mouvements de stock (entrée / sortie)
- Historique des mouvements
- Sécurité multicouche (Helmet, CORS, Rate Limit, JWT)

---

## Architecture du projet

```
STOCKMYPRODUCTS
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── categoryController.js
│   ├── productController.js
│   └── stockController.js
│
├── middlewares/
│   ├── authMiddleware.js
│   ├── errorMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── Category.js
│   ├── Product.js
│   ├── StockMovement.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── categoryRoutes.js
│   ├── productRoutes.js
│   └── stockRoutes.js
│
├── .env
├── package.json
├── package-lock.json
├── README.md
└── server.js
```

---

## Installation

### 1. Cloner le projet

```bash
git clone <repo>
cd stockmyproducts
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer le fichier `.env`

Créer un fichier `.env` à la racine du projet :

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/stockmyproducts
JWT_SECRET=secret123
```

---

## Lancer le projet

| Mode | Commande |
|------|----------|
| Développement | `npm run dev` |
| Production | `npm start` |

> Serveur disponible sur : `http://localhost:3000`

---

## Authentification

L'API utilise un système d'authentification par **JWT**. Chaque token a une durée d'expiration configurée.

### Rôles et permissions

| Rôle | Permissions |
|------|-------------|
| `admin` | Accès complet |
| `manager` | Gestion produits, stock et catégories |
| `user` | Consultation uniquement |

### Header requis

```http
Authorization: Bearer <TOKEN>
```

---

## Routes API

### Auth

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/auth/register` | Créer un compte |
| `POST` | `/api/auth/login` | Se connecter |

### Catégories

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/categories` | Créer une catégorie |
| `GET` | `/api/categories` | Lister les catégories |

### Produits

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/products` | Créer un produit |
| `GET` | `/api/products` | Lister les produits |
| `GET` | `/api/products/:id` | Obtenir un produit par ID |
| `PUT` | `/api/products/:id` | Modifier un produit |
| `DELETE` | `/api/products/:id` | Supprimer un produit |

### Stock

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/api/stock/in` | Entrée de stock |
| `POST` | `/api/stock/out` | Sortie de stock |
| `GET` | `/api/stock/history` | Historique des mouvements |

---

## Sécurité

Le projet intègre plusieurs couches de protection :

- **JWT** — Authentification par token
- **bcrypt** — Hachage des mots de passe
- **Helmet** — Sécurisation des headers HTTP
- **CORS** — Contrôle des origines autorisées
- **Rate Limiting** — Protection contre les abus
- **Mongo Sanitize** — Protection contre les injections NoSQL
- **RBAC** — Contrôle d'accès basé sur les rôles

---

## Base de données

**MongoDB** avec les collections suivantes :

| Collection | Description |
|------------|-------------|
| `users` | Comptes utilisateurs |
| `products` | Catalogue des produits |
| `categories` | Catégories de produits |
| `stockmovements` | Historique des mouvements |

---

## Tests

Les tests peuvent être effectués via :

- **Postman** — Collection fournie dans le projet
- **MongoDB Compass** — Inspection visuelle de la base de données

---

## Technologies utilisées

| Catégorie | Technologies |
|-----------|-------------|
| Runtime | Node.js |
| Framework | Express.js |
| Base de données | MongoDB, Mongoose |
| Authentification | JWT, bcrypt |
| Sécurité | Helmet, CORS, Rate Limit, Mongo Sanitize |