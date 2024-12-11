import axios from "axios";
import dotenv from "dotenv";

describe("Server tests", () => {
   it("Should test the server is running", async () => {
      const port = process.env.PORT || 3001;

      const response = await axios.get(`http://localhost:${port}`);

      expect(response.status).toBe(200);
      expect(response.data).toBe('Wellcome to my project API')
   });
});
