import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const GITHUB_CLIENT_ID = "Ov23lishEaheG0DXK7SS";
const GITHUB_CLIENT_SECRET = "e8a9127cdb0706f66de7b0de972fc49f05a22c5b";

app.post("/api/auth/github/callback", async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Authentication failed" });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
