import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  Sun,
  Moon,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import projects from "./projects.json";
import profile from "/profile1.png";
import profile1 from "/profile4.png";
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const FRONTEND = import.meta.env.VITE_DOMAIN;




// ROBUST Typewriter Hook
function useTypewriter(words, speed = 120, delay = 1500) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setText(currentWord.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex + 1 === currentWord.length) {
            setTimeout(() => setIsDeleting(true), delay);
          }
        } else {
          setText(currentWord.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex - 1 === 0) {
            setIsDeleting(false);
            setWordIndex((prev) => (prev + 1) % words.length);
          }
        }
      },
      isDeleting ? speed / 2 : speed,
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words, speed, delay]);

  return text;
}

function Counter({ value, label }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / value), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === value) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold text-indigo-500">{count}+</h3>
      <p className="mt-2 text-gray-400">{label}</p>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [aboutTab, setAboutTab] = useState("skills");
  const [menuOpen, setMenuOpen] = useState(false);


  const typedText = useTypewriter([
    "MERN Stack Engineer",
    "Full Stack Developer",
    "React & Node Specialist",
    "Building Scalable Web Apps",
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div
      className={
        dark
          ? "bg-black text-white scroll-smooth"
          : "bg-gray-100 text-gray-900 scroll-smooth"
      }
    >
      {/* Navbar */}
     <nav
        className={`fixed top-0 w-full z-50 backdrop-blur ${
          dark ? "bg-black/80" : "bg-white/80"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <h1 className="font-bold text-3xl">Akash</h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg border"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg border"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-5">
            {["home", "about", "projects", "contact"].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </a>
            ))}

            <button
              onClick={() => {
                setDark(!dark);
                setMenuOpen(false);
              }}
              className="p-2 w-fit rounded-lg border"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section
        id="home"
        className="min-h-screen grid md:grid-cols-2 items-center pt-24 max-w-7xl mx-auto px-8"
      >
        <div>
          <span className="text-indigo-500 font-semibold tracking-widest block min-h-6">
            {typedText}
            <span className="animate-pulse">|</span>
          </span>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Hi, I’m <span className="text-indigo-500">Akash</span>
            <br />
            Pal | MERN Engineer
          </h1>

          <p className="text-gray-400 mt-6 max-w-xl">
            I build high-performance MERN stack applications with clean UI and
            scalable backend architecture.
          </p>

          <div className="flex gap-6 mt-8">
            <a href="https://github.com/AKASHPAL1234" target="_blank">
              <Github />
            </a>
            <a
              href="https://www.linkedin.com/in/akash-pal-0120342a7/"
              target="_blank"
            >
              <Linkedin />
            </a>
            <a href="mailto:palankit86762@gmail.com">
              <Mail />
            </a>
          </div>

          <a
            href="/Akash__pal__final.pdf"
            download
            className="inline-flex items-center gap-3 mt-10 bg-indigo-600 px-8 py-4 rounded-lg"
          >
            <Download /> Download Resume
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex justify-center"
        >
          
          <div className="relative mt-8 my-6">
            <div className="absolute inset-0 rounded-full bg-indigo-500 blur-3xl opacity-20"></div>
            <img
              src={profile}
              className="relative w-[320px] md:w-105 aspect-square object-cover rounded-full  shadow-2xl scale-110 translate-y-2.5 hover:scale-115 transition-transform duration-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 border-t border-gray-800">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <Counter value={15} label="Projects" />
          <Counter value={50} label="Users" />
          <Counter value={1} label="Years Experience" />
        </div>
      </section>

      {/* About Tabs */}
      <section
        id="about"
        className="py-20 px-8 max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        <div className="relative flex justify-center">
          <div className="absolute inset-0 rounded-full   blur-3xl opacity-20"></div>
          <img
            src={profile1}
            className="relative w-[320px] md:w-105  object-cover rounded-full  shadow-2xl scale-110 translate-y-2.5 hover:scale-115 transition-transform duration-500"
          />
        </div>

        <div>
          <h2 className="text-4xl font-bold mb-6">About Me</h2>

          <div className="flex gap-8 border-b border-gray-700 mb-6">
            {["skills", "experience", "education"].map((tab) => (
              <button
                key={tab}
                onClick={() => setAboutTab(tab)}
                className={
                  aboutTab === tab
                    ? "text-indigo-500 border-b-2 border-indigo-500 pb-2"
                    : "text-gray-400"
                }
              >
                {tab}
              </button>
            ))}
          </div>

          {aboutTab === "skills" && (
            <ul className="space-y-2 text-gray-400">
              <li>React, Tailwind, JavaScript</li>
              <li>Node.js, Express, MongoDB</li>
              <li>Git, GitHub, Vercel</li>
  
 <li>      HTML, CSS, Tailwind CSS  </li>
<li> C, C++, Java, Python  </li>
<li>   SQL, MongoDB  </li>
<li>Git, GitHub, MS Office, Data Structures and Algorithms</li>
<li>Vercel, Render</li>

            </ul>
          )}

          {aboutTab === "experience" && (
            <ul className="space-y-2 text-gray-400">
              <li>Freelance MERN Developer (2024–Present)</li>
              <li>Frontend Developer (2024–2025)</li>
              <li>Backend Developer (2024–2025)</li>
            </ul>
          )}

          {aboutTab === "education" && (
            <ul className="space-y-2 text-gray-400">
              <li>BCA – RMLAU University (2023–2026):72%</li>
              <br />
              
              <li>
                 M.B.D.R.S Inter College Akbarpur Ambedkar nagar <br /> Intermediate  (2022-2023): 61% <br /><br />High
                School       (2020-2021): 90% 
              </li>
            </ul>
          )}
        </div>
      </section>

      {/* Projects */}
      

    <section id="projects" className="py-20 px-8 max-w-7xl mx-auto">
  <h2 className="text-4xl font-bold mb-10">Projects</h2>

  <div className="grid md:grid-cols-3 gap-10">
    {projects.map((project) => (
      <motion.div
        key={project.id}
        whileHover={{ y: -8 }}
        className="bg-gray-900 rounded-xl overflow-hidden group"
      >
        {/* IMAGE — FULLY CLICKABLE */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
        >
          <img
            src={project.image}
            alt={project.title}
            className="h-48 w-full object-cover"
          />

          {/* Hover overlay (visual only) */}
          <div
            className="absolute inset-0 flex items-center justify-center
            bg-black/70 opacity-0 group-hover:opacity-100
            transition-opacity duration-300"
          >
            <span
              className="px-6 py-2 bg-indigo-600 rounded-lg
              text-white font-semibold"
            >
              Live →
            </span>
          </div>
        </a>

        {/* CONTENT */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl font-semibold">{project.title}</h3>
          <p className="text-gray-400 text-sm">{project.description}</p>

          {/* GitHub link */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-indigo-500 hover:underline"
          >
            GitHub →
          </a>
        </div>
      </motion.div>
    ))}
  </div>
</section>



     <section id="contact" className="py-20 max-w-3xl mx-auto px-6">
  <h2 className="text-4xl font-bold text-center mb-10">Contact Me</h2>

  <form
    action="https://api.web3forms.com/submit"
    method="POST"
    className="bg-gray-900 p-8 rounded-xl space-y-6"
  >
    {/* REQUIRED */}
    <input type="hidden" name="access_key" value={ACCESS_KEY} />

    {/* Honeypot (spam protection) */}
    <input type="checkbox" name="botcheck" className="hidden" />

    {/* SUCCESS redirect */}
  <input
    type="hidden"
    name="redirect"
    value={FRONTEND}
  />
  

  {/* ERROR redirect (optional but good) */}
  <input
    type="hidden"
    name="redirect_error"
    value={FRONTEND}
  />

    <input
      type="text"
      name="name"
      placeholder="Your Name"
      required
      className="w-full px-4 py-3 rounded-lg bg-gray-800 outline-none"
    />

    <input
      type="email"
      name="email"
      placeholder="Your Email"
      required
      className="w-full px-4 py-3 rounded-lg bg-gray-800 outline-none"
    />

    <textarea
      name="message"
      placeholder="Your Message"
      rows="5"
      required
      className="w-full px-4 py-3 rounded-lg bg-gray-800 outline-none"
    />

    <button
      type="submit"
      className="w-full bg-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
    >
      Send Message
    </button>
  </form>
</section>


      <footer className="py-6 text-center text-gray-500">
        © 2026 Akash Pal
      </footer>
    </div>
  );
}




