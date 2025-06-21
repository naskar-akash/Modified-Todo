import React from "react";

const About = () => {
  return (
    <div className="px-4">
      <div className="text-6xl font-extrabold mb-4 text-center text-neutral-700 text-shadow-lg text-shadow-gray-400">About This App</div>

      <p className="text-gray-700 text-xl font-semibold mb-4">
        @TODO is a simple and efficient way to manage your daily tasks. Whether you're planning your day,
        organizing your work this app helps you stay productive and organized.
      </p>

      <div className="text-4xl font-bold text-gray-800 mb-2">Features</div>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>Add, edit, and delete todos</li>
        <li>Filter tasks by date and keyword</li>
        <li>Persistent data using localStorage or API</li>
      </ul>

      <div className="text-4xl font-bold text-gray-800 mb-2">Tech Stack</div>
      <ul className="list-disc pl-6 text-gray-700 mb-4">
        <li>React JS</li>
        <li>React Router</li>
        <li>Tailwind CSS</li>
      </ul>

      <p className="text-gray-700 font-semibold text-lg">
        Built by Akash. You can find the source code and updates on my{"GitHub Account "}
        <a
          href="https://github.com/naskar-akash"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-500 underline"
        >
          github.com/naskar-akash
        </a>.
      </p>
    </div>
  );
};

export default About;
