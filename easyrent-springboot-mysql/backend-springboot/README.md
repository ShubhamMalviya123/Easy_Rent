# EasyRent Backend — Spring Boot + MySQL

Ye project original **Node.js / Express / MongoDB** backend ka 1:1 port hai
**Spring Boot + MySQL** mein. Saare API paths, request/response JSON shapes,
cookies (`token`, `userId`), aur auth rules (jwtAuth / landOwnerAuth / adminAuth)
same rakhe gaye hain — taaki frontend (React) mein **koi change na karna pade**.

## Kya-kya waisa hi hai

- Har REST endpoint same path/method pe: `/api/users`, `/api/rooms`,
  `/api/favourite`, `/api/history`, `/api/notifications`, `/api/relationship`,
  `/api/request`, `/api/search`, `/api/payment`, `/api/chat`
- `_id` field naam JSON mein wahi rehta hai (Mongo-jaisa 24-char id generate
  hota hai — `ObjectIdGenerator`), sirf storage MySQL hai.
- Cookies same: `token` (JWT), `userId`.
- Real-time chat/notifications: **netty-socketio** library use ki hai jo
  socket.io protocol ko hi serve karti hai — matlab frontend ka
  `socket.io-client` code bilkul waisa hi chalega, sirf socket server ka
  URL/port point karna hoga (default port `9092`, `.env` se change kar sakte ho).
- Stripe checkout/verify/webhook same logic ke saath.
- Login response mein password hash bhi wapas aata hai (original code ka wahi
  "bug" jaanbujh kar copy kiya hai, kyunki tumne bola tha "same as is").
- `adminAuth` original mein hamesha 404 deta hai (kyunki token payload mein
  `user.userType` field hi nahi hota) — yehi behavior yahan bhi hai.

## Project structure

```
src/main/java/com/easyrent/backend/
  ├── entity/          # JPA entities (User, Room, Favourite, History, Notification, Relationship, RentRequest, Chat)
  ├── repository/       # Spring Data JPA repositories
  ├── security/          # JwtUtil, CookieUtil, @JwtAuth/@LandOwnerAuth/@AdminAuth + interceptor
  ├── controller/        # REST controllers (1 per module, mirrors *.controller.js)
  ├── service/           # NotificationService (creates + emits via socket)
  ├── socket/             # netty-socketio server + event handlers (register/join_chat/send_message)
  ├── dto/                # Request bodies
  ├── config/             # CORS, Security, Stripe
  └── util/               # ObjectIdGenerator, EmailService
```

## Setup

### 1. MySQL database banao

```sql
CREATE DATABASE easyrent CHARACTER SET utf8mb4;
```

Tables khud ban jayenge (`spring.jpa.hibernate.ddl-auto=update`) jab app pehli
baar chalega.

### 2. Environment variables set karo

`.env` istemal nahi hota Spring mein directly — inhe environment variables ya
`application.properties` mein set karo (ya IDE run-config mein):

| Variable | Matlab | Default |
|---|---|---|
| `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` | MySQL connection | localhost:3306/easyrent |
| `SECRET_KEY` | JWT signing secret (same purpose as original `.env`) | change-this-secret-key-in-env |
| `FRONTEND_URL` | React app ka URL (CORS + email links + Stripe redirect) | http://localhost:5173 |
| `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_FROM` | SMTP for welcome/reset-password mails | smtp.gmail.com:587 |
| `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Stripe keys | (empty) |
| `SOCKET_PORT` | netty-socketio port (frontend socket client isi port se connect karega) | 9092 |
| `PRODUCTION` | `true` set karo prod mein (cookies ko `Secure; SameSite=None` banata hai) | false |
| `PORT` | HTTP server port | 5000 |

### 3. Build & run

```bash
mvn clean install
mvn spring-boot:run
```

Ya jar bana ke chalao:

```bash
mvn clean package
java -jar target/easyrent-backend-1.0.0.jar
```

> **Note:** Is sandbox environment mein Maven Central (`repo.maven.apache.org`)
> tak network access allowed nahi tha, isliye main yahan `mvn compile` chala ke
> verify nahi kar saka. Code manually review kiya hai aur syntactically sahi
> hai, lekin apne machine pe pehli baar build karte waqt agar koi chhoti
> dependency-version mismatch (jaise `stripe-java` ka exact version) aaye to
> `pom.xml` mein wo version number Maven Central pe check karke update kar
> lena.

### 4. Frontend mein sirf ek cheez update karni hogi

Frontend code bilkul same rehta hai — bas jahan bhi socket.io client connect
hota hai (`frontend/src/services/socket.service.js`), uska URL naye backend
ke socket port (`9092` by default, ya jo tum `SOCKET_PORT` set karo) pe point
karna hoga, kyunki REST API aur socket server alag-alag ports pe chalte hain
(jaisa production mein bhi common hai).

## Jo cheezein original mein bhi thoda "loose"/buggy thi, waise hi rakhi gayi hain

- `PUT /api/users/password/update` — original mein bhi ye kabhi kaam nahi
  karta (dependency missing), yahan bhi same 401 deta hai.
- `GET /api/search/state` — sirf validation karta hai, results kabhi nahi
  deta (original code mein bhi wahi tha).
- `isArchieve` / `removeRenter` jaise naming aur inverted boolean logic
  bilkul original jaisa hi hai.
