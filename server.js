import dotenv from "dotenv";
dotenv.config({ path: "dev.env" });
import app from "./app";
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Gemini server running on port ${PORT}`);
});
