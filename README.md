# 🚀 API REST - Blog

API ontwikkeld met Node.js, Express en MongoDB voor het beheren van gebruikers en posts van een blog.

## 📋 Beschrijving

Deze API biedt complete endpoints voor:
- **Gebruikersbeheer** (volledige CRUD)
- **Postbeheer** (volledige CRUD)
- **Geavanceerd zoeken en filteren**
- **Paginering** van resultaten
- **Gegevensvalidatie**
- **Gecentraliseerde foutafhandeling**

## 🛠️ Gebruikte Technologieën

- **Node.js** (v20+)
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM voor MongoDB
- **Body-parser** - Request parsing
- **CORS** - Cross-Origin Resource Sharing

## 📦 Installatie

### Vereisten
- Node.js (versie 20 of hoger)
- MongoDB lokaal geïnstalleerd en draaiend

### Installatiestappen

1. **Kloon de repository**
```bash
git clone <URL_VAN_REPOSITORY>
cd NODEJS_project_EHB
```

2. **Installeer dependencies**
```bash
npm install
```

3. **Zorg ervoor dat MongoDB draait**
```bash
# In Windows (als MongoDB als service is geïnstalleerd)
net start MongoDB

# Of controleer of het draait
mongosh
```

4. **Start de server**
```bash
node server.js
```

5. **Controleer of de server werkt**
```
Server draait op http://localhost:3000
MongoDB verbonden: localhost
```

## 🌐 Beschikbare Endpoints

### 👥 Gebruikers

| Methode | Endpoint | Beschrijving |
|---------|----------|--------------|
| GET | `/api/users` | Alle gebruikers ophalen |
| GET | `/api/users/:id` | Gebruiker ophalen op ID |
| POST | `/api/users` | Nieuwe gebruiker aanmaken |
| PUT | `/api/users/:id` | Gebruiker bijwerken |
| DELETE | `/api/users/:id` | Gebruiker verwijderen |

### 📝 Posts

| Methode | Endpoint | Beschrijving |
|---------|----------|--------------|
| GET | `/api/posts` | Alle posts ophalen |
| GET | `/api/posts/:id` | Post ophalen op ID |
| POST | `/api/posts` | Nieuwe post aanmaken |
| PUT | `/api/posts/:id` | Post bijwerken |
| DELETE | `/api/posts/:id` | Post verwijderen |
| GET | `/api/posts/author/:authorId` | Posts per auteur |

## 📊 Query Parameters

### Paginering
- `page` - Paginanummer (standaard: 1)
- `limit` - Items per pagina (standaard: 10)

### Zoeken
- `search` - Zoekterm

### Filters (Posts)
- `category` - Filteren op categorie
- `author` - Filteren op auteur ID

## 📝 Gebruiksvoorbeelden

### Gebruiker aanmaken
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jan Jansen",
    "email": "jan@voorbeeld.com",
    "age": 25,
    "bio": "Webontwikkelaar"
  }'
```

### Post aanmaken
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Mijn eerste post",
    "content": "Inhoud van mijn eerste post...",
    "author": "ID_VAN_GEBRUIKER",
    "category": "deportes",
    "tags": ["nodejs", "express"]
  }'
```

### Gebruikers zoeken
```bash
curl "http://localhost:3000/api/users?search=jan&page=1&limit=5"
```

### Posts zoeken
```bash
curl "http://localhost:3000/api/posts?search=nodejs&category=deportes&page=1&limit=5"
```

## ✅ Validaties

### Gebruikers
- **Naam**: Verplicht, geen cijfers, 2-50 karakters
- **Email**: Verplicht, geldig formaat, uniek
- **Leeftijd**: Verplicht, nummer tussen 13-120
- **Bio**: Optioneel, maximaal 500 karakters

### Posts
- **Titel**: Verplicht, 5-100 karakters
- **Inhoud**: Verplicht, 10-5000 karakters
- **Auteur**: Verplicht, geldig ID van bestaande gebruiker
- **Categorie**: Verplicht, geldige waarden: `deportes`, `otros`, `entretenimiento`
- **Tags**: Optioneel, array van strings

## 🏗️ Projectstructuur

```
NODEJS_project_EHB/
├── config/
│   └── database.js          # MongoDB configuratie
├── middleware/
│   ├── errorHandler.js      # Gecentraliseerde foutafhandeling
│   ├── validation.js        # Gegevensvalidatie
│   └── logger.js           # Request logging
├── models/
│   ├── User.js             # Gebruikersmodel
│   └── Post.js             # Postmodel
├── routes/
│   ├── users.js            # Gebruikersroutes
│   └── posts.js            # Postroutes
├── public/
│   └── index.html          # API documentatie
├── server.js               # Hoofdserver
├── package.json            # Dependencies en scripts
└── README.md              # Dit bestand
```

## ⚙️ Configuratie

### Omgevingsvariabelen
Maak een `.env` bestand aan in de root van het project:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/blog_api
```

### Database
De applicatie verbindt met MongoDB op:
- **URL**: `mongodb://localhost:27017/blog_api`
- **Database**: `blog_api`

## 🧪 Testing

### Met PowerShell
```powershell
# Gebruiker aanmaken
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -ContentType "application/json" -Body '{"name":"Anna Jansen","email":"anna@voorbeeld.com","age":28,"bio":"Full Stack Ontwikkelaar"}'

# Gebruikers ophalen
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET

# Post aanmaken
Invoke-RestMethod -Uri "http://localhost:3000/api/posts" -Method POST -ContentType "application/json" -Body '{"title":"Mijn eerste post","content":"Inhoud van mijn eerste post...","author":"ID_VAN_GEBRUIKER","category":"deportes","tags":["nodejs"]}'
```

### Met Postman
1. Importeer de Postman collectie
2. Configureer de basis URL: `http://localhost:3000`
3. Voer de test requests uit

## 🚨 Foutafhandeling

De API retourneert geschikte HTTP statuscodes:

- **200** - OK (succesvolle operatie)
- **201** - Created (resource aangemaakt)
- **400** - Bad Request (ongeldige gegevens)
- **404** - Not Found (resource niet gevonden)
- **500** - Internal Server Error (serverfout)

### Voorbeelden van fouten
```json
{
  "error": "Validatiefout",
  "details": ["Naam mag geen cijfers bevatten"]
}
```

## 📚 Documentatie

Volledige API documentatie is beschikbaar op:
**http://localhost:3000**
