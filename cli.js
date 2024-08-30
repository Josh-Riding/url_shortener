import { Command } from "commander";
const program = new Command();
import axios from "axios";

program
  .name("url-shortner")
  .description("CLI tool to shorten URLs")
  .version("1.0.0");

program
  .command("short")
  .description("Shorten's a URL to a more manageable format.")
  .argument("<string>", "URL to shorten")
  .action(async (url) => {
    try {
      const response = await axios.post("http://localhost:3000/", { url: url });
      console.log(
        `Shortened URL: http://localhost:3000/${response.data.generatedUrl}`
      );
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  });

program
  .command("click")
  .description("Return the number of clicks for a given URL")
  .argument("<string>", "Mini URL to check click rates")
  .action(async (url) => {
    try {
      const response = await axios.post(url);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  });

program.parse();
