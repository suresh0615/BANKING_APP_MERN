import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const port = process.env.PORT;
const app = express();


app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const MONGOURL =process.env.MONGO_URL

mongoose.connect(MONGOURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("DB connected");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

    const CreateSchema = new mongoose.Schema({
        name: String,
        email: { type: String, unique: true },
        phone: { type: String, unique: true },
        age: String,
        gender: String,
        password: String,
        balance: { type: Number, default: 0 },
        usertype: String,
    });
    
    const Create = mongoose.model("Create", CreateSchema);
    
    // Create account endpoint
    app.post("/createaccount", async (req, res) => {
        const { name, email, phone, age, gender, password, usertype, secretkey } = req.body;
        console.log("Request body:", req.body); // Log the request body
    
        // Validate input
        if (!name || !email || !phone || !age || !gender || !password || !usertype) {
            return res.status(400).json({ error: "All fields are required" });
        }
    
        // Admin specific validation
        if (usertype === "Admin" && secretkey !== process.env.SECRET) {
            return res.status(400).json({ error: "Invalid Admin secret key" });
        }
    
        try {
            // Check if the email already exists
            const oldUser = await Create.findOne({ email });
            if (oldUser) {
                return res.status(409).json({ error: "User already exists" });
            }
    
            // Check if the phone number already exists
            const existingPhone = await Create.findOne({ phone });
            if (existingPhone) {
                return res.status(409).json({ error: "Phone number already exists" });
            }
    
            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new user
            const create = new Create({
                name,
                email,
                phone,
                age,
                gender,
                password: hashedPassword,
                usertype,
            });
    
            // Save the user to the database
            await create.save();
    
            // Send a success response
            return res.status(201).json({ message: "Account created successfully!" });
    
        } catch (error) {
            console.error("Error while creating an account:", error); // This will log the error
            return res.status(500).json({ error: "Internal Server Error" });
        }
    });

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Create.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ status: "ok", token });
        } else {
            return res.status(400).json({ error: "Invalid Password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Login failed" });
    }
});

app.post("/userdetails", async (req, res) => {
    const { token } = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const useremail = user.email;

        const data = await Create.findOne({ email: useremail });
        if (data) {
            res.status(200).send({ status: "ok", data: { name: data.name, balance: data.balance, usertype: data.usertype, email:data.email, phone:data.phone } });
        } else {
            res.status(404).send({ status: "error", data: "User not found" });
        }
    } catch (error) {
        console.error("Error verifying token or fetching user details:", error);
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.post("/deposit", async (req, res) => {
    const { token, amount } = req.body;

    try {
        const currentUser = jwt.verify(token, JWT_SECRET);
        const userEmail = currentUser.email;

        const user = await Create.findOne({ email: userEmail });
        if (user) {
            user.balance += Number(amount);

            await user.save();

            res.status(200).send({ status: "ok", data: user.balance });
        } else {
            res.status(404).send({ status: "error", data: "User not found" });
        }
    } catch (error) {
        console.error("Error verifying token or fetching user details:", error);
        res.status(500).send({ status: "error", data: error.message });
    }
});

app.post("/user-action", async (req, res) => {
    const { token, amount } = req.body;

    try {
        const currentUser = jwt.verify(token, JWT_SECRET);
        const userEmail = currentUser.email;

        const user = await Create.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (amount !== undefined) {
            // Process withdrawal
            const amountValue = Number(amount);
            if (isNaN(amountValue) || amountValue <= 0) {
                return res.status(400).json({ error: "Invalid amount" });
            }

            if (user.balance < amountValue) {
                return res.status(400).json({ error: "Insufficient balance" });
            }

            user.balance -= amountValue;
            await user.save();

            return res.status(200).json({ data: user.balance });
        } else {
            // Fetch balance
            return res.status(200).json({ balance: user.balance });
        }
    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/alluser", async (req, res) => {
    try {
        const alluser = await Create.find({});
        res.send({ status: "oke", data: alluser });
    } catch (error) {
        console.log(error);
    }
})

// Add the booking schema
const bookingSchema = new mongoose.Schema({
  hallName: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, required: true },
  timeSlot: { type: String, required: true },  // e.g., "10:00-12:00"
});

const Booking = mongoose.model("Booking", bookingSchema);

// Route to book a hall
app.post("/bookhall", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, "secret_key");
    const { hallName, date, timeSlot } = req.body;

    // Check if all fields are provided
    if (!hallName || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the hall exists
    const hallToBook = await Hall.findOne({ name: hallName });
    if (!hallToBook) {
      return res.status(404).json({ message: "Hall not found" });
    }

    // Check if the hall is already booked for the requested date and time
    const existingBooking = await Booking.findOne({
      hallName,
      date: new Date(date),
      timeSlot,
    });
    
    if (existingBooking) {
      return res.status(409).json({ message: "Hall is already booked for the specified time slot" });
    }

    // Create a new booking
    const newBooking = new Booking({
      hallName,
      userId: decoded.userId,
      date: new Date(date),
      timeSlot,
    });

    await newBooking.save();
    return res.status(201).json({ message: "Hall booked successfully", booking: newBooking });
  } catch (error) {
    return res.status(500).json({ message: "Error while booking the hall", error: error.message });
  }
});

app.get("/bookedhall",async(req,res)=>{
  try{
  const bookedhalls = await Booking.findOne({},{hallName:1,date:1,timeSlot:1});
  return res.status(200).json({message:bookedhalls})
  }
  catch(error){
    return res.send(400).json({message:error})
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

