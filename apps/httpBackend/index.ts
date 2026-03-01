import "dotenv/config"
import express, { type Request, type Response } from "express";
import { prisma } from "@repo/db/client"
const app = express()


app.use(express.json());
const PORT = 8000
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany()

  if (!users) {
    return res.status(404).json({
      error:"User not exist"
    })
  }

  res.status(200).json({
    users
  })
   
})

app.post("/user", async   (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    res.status(400).json({ error: "Username and password are required" });
    return
  }

  await prisma.user.create({
    data: {
      username,
      password
    }
  })
    .then(users => {
      res.status(201).json(users);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
})
app.listen(PORT,"0.0.0.0",()=> {
    console.log("Server started", PORT)
})