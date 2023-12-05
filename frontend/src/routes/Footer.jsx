import React from "react";
import myImage from "../assets/samurai.png";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
  return (
    <footer id="footer" className="bg-gray-800 text-white py-8">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="flex items-center">
          <span className="text-xl font-semibold">
            Samur
            <em className="italic text-blue-500">AI</em>{" "}
            <span className="font-light">Stock</span>
          </span>
          <img className="navLogo mr-2" src={myImage} alt="Logo" />
        </div>
        <div className="flex space-x-4">
          <a href="/about" className="hover:text-blue-500">
            About
          </a>
          <a href="mailto:samuraistock@outlook.com" className="hover:text-blue-500">
            Contact us
          </a>
        </div>
        <div className="flex space-x-4">
          <a href="https://github.com/jan-Dro/" className="hover:text-blue-500">
            <GitHubIcon fontSize="medium" /> Jesus
          </a>
          <a
            href="https://github.com/chris-galey/"
            className="hover:text-blue-500"
          >
            <GitHubIcon fontSize="medium" /> Chris
          </a>
          <a
            href="https://github.com/joyceleechocolate"
            className="hover:text-blue-500"
          >
            <GitHubIcon fontSize="medium" /> Joyce
          </a>
          <a
            href="https://github.com/harrygustavo"
            className="hover:text-blue-500"
          >
            <GitHubIcon fontSize="medium" /> Harry
          </a>
        </div>
      </div>
      <div className="text-center mt-8">
        <p className="text-gray-500">
          &copy; 2023 SamurAI Stock. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
