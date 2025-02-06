/* 

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { title } = require("process");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const secretKey = 'your_secret_key';

mongoose.connect(process.env.MONGO_URI_EMINA, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

mongoose.connect(process.env.MONGO_URI_CART, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB Cart');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

const cartSchema = new mongoose.Schema({
    user_id: { type: Number, required: true },
    product_id: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);

const authenticateUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error('Token verification failed:', err.message);
            return res.status(401).json({ error: 'Invalid token' });
        }
        req.userId = decoded.id;
        next();
    });
};

const uploadSchema = new mongoose.Schema({
  text: String,
  title: String,
  image: String,
});

const Upload = mongoose.model("Upload", uploadSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newUpload = new Upload({
      text: req.body.text,
      title: req.body.text,
      image: req.file.filename,
    });
    await newUpload.save();
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/data", async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/sign_up', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during user login:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
 */
/* 
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI_EMINA, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

const uploadSchema = new mongoose.Schema({
  text: String,
  title: String,
  image: String,
});

const Upload = mongoose.model("Upload", uploadSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newUpload = new Upload({
      text: req.body.text,
      title: req.body.title,
      image: req.file.filename,
    });
    await newUpload.save();
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/data", async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 */


/* 
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose.connect(process.env.MONGO_URI_EMINA, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

const uploadSchema = new mongoose.Schema({
  text: String,
  title: String,
  image: String,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
});

const Upload = mongoose.model("Upload", uploadSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post("/upload", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
  { name: "img4", maxCount: 1 }
]), async (req, res) => {
  try {
    const newUpload = new Upload({
      text: req.body.text,
      title: req.body.title,
      image: req.files["image"] ? req.files["image"][0].filename : "",
      img1: req.files["img1"] ? req.files["img1"][0].filename : "",
      img2: req.files["img2"] ? req.files["img2"][0].filename : "",
      img3: req.files["img3"] ? req.files["img3"][0].filename : "",
      img4: req.files["img4"] ? req.files["img4"][0].filename : "",
    });
    await newUpload.save();
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/data", async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 */
/* 
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Dodajemo absolutnu putanju za statičke fajlove
const uploadDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDir));

// Povezivanje sa MongoDB
mongoose.connect(process.env.MONGO_URI_EMINA, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Definisanje šeme za MongoDB
const uploadSchema = new mongoose.Schema({
  text: String,
  title: String,
  image: String,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
});

const Upload = mongoose.model("Upload", uploadSchema);

// Konfiguracija za multer (upload slika)
const storage = multer.diskStorage({
  destination: uploadDir,  // Direktorijum za smeštanje slika
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Dodavanje timestamp-a za jedinstveno ime fajla
  },
});

const upload = multer({ storage });

// Ruta za upload slika
app.post("/upload", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
  { name: "img4", maxCount: 1 }
]), async (req, res) => {
  try {
    const newUpload = new Upload({
      text: req.body.text,
      title: req.body.title,
      image: req.files["image"] ? req.files["image"][0].filename : "",
      img1: req.files["img1"] ? req.files["img1"][0].filename : "",
      img2: req.files["img2"] ? req.files["img2"][0].filename : "",
      img3: req.files["img3"] ? req.files["img3"][0].filename : "",
      img4: req.files["img4"] ? req.files["img4"][0].filename : "",
    });
    await newUpload.save();
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta za dohvat podataka
app.get("/data", async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Startovanje servera
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 */

/* radio u skoli */


const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const uploadDir = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadDir));

mongoose.connect(process.env.MONGO_URI_EMINA, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const uploadSchema = new mongoose.Schema({
  text: String,
  title: String,
  image: String,
  img1: String,
  img2: String,
  img3: String,
  img4: String,
});
/*  */

const Upload = mongoose.model("Upload", uploadSchema);

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
/*  */
/* const Upload = mongoose.model("Upload", uploadSchema); */

/* const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage }); */

app.post("/upload", upload.fields([
  { name: "image", maxCount: 1 },
  { name: "img1", maxCount: 1 },
  { name: "img2", maxCount: 1 },
  { name: "img3", maxCount: 1 },
  { name: "img4", maxCount: 1 }
]), async (req, res) => {
  try {
    const newUpload = new Upload({
      text: req.body.text,
      title: req.body.title,
      image: req.files["image"] ? req.files["image"][0].filename : "",
      img1: req.files["img1"] ? req.files["img1"][0].filename : "",
      img2: req.files["img2"] ? req.files["img2"][0].filename : "",
      img3: req.files["img3"] ? req.files["img3"][0].filename : "",
      img4: req.files["img4"] ? req.files["img4"][0].filename : "",
    });
    await newUpload.save();
    res.status(200).json({ message: "Upload successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/data", async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.json(uploads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
