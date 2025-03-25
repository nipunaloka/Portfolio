import { useState, useEffect } from 'react';
import portfolioImage from "./image/portfolio.png";
import {
  Github,
  Mail,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  Download,
  ChevronRight,
  Database,
  Server,
  Layout,
  Cloud,
  Cpu,
  BookOpen,
  MessageSquare,
  User,
  Code,
  Briefcase,
  AirVent
} from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach(section => {
        const element = section as HTMLElement;
        const top = element.offsetTop;
        const height = element.offsetHeight;
        const id = element.getAttribute('id') || '';

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }

        // Animation on scroll
        if (window.scrollY + window.innerHeight >= element.offsetTop) {
          element.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  const skills = [
    {
      category: 'Frontend',
      icon: Layout,
      items: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    },
    {
      category: 'Backend',
      icon: Server,
      items: ['Node.js', 'Express', '.NET Core', 'Laravel'],
    },
    {
      category: 'Database',
      icon: Database,
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
    },
    {
      category: 'Cloud & DevOps',
      icon: Cloud,
      items: ['AWS', 'Docker', 'Azure','Git'],
    },
    {
      category: 'IoT & Embedded',
      icon: Cpu,
      items: ['ESP32', 'Arduino', 'Raspberry Pi'],
    },
    {
      category: 'ML/AI',
      icon: AirVent,
      items: ['Computer Vision', 'Data Mining', 'TensorFlow'],
    },
  ];

  const projects = [
    {
      title: 'Restaurant POS System (MERN Stack)',
      description: 'A modern point of sale system with real-time order tracking and inventory management.',
      tech: ['React', 'Node.js', 'MongoDB', 'Redux'],
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800',
    },
    {
      title: 'Employee Management System (.NET)',
      description: 'A complete HR solution with employee registration, login, and salary management.',
      tech: ['C#', '.NET', 'SQL Server'],
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800',
    },
    {
      title: 'Sentiment Analysis System (Python)',
      description: 'Built a sentiment classification model with text preprocessing and machine learning algorithms.',
      tech: ['Python', 'Flask', 'Python', 'Kaggle', 'Scikit-learn', 'NLTK', 'SMOTE'],
      image: 'https://images.unsplash.com/photo-1677691824304-279660ceece3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      title: ' News Web App (React.js, NewsAPI)',
      description: ' Developed a responsive news web application that fetches real-time news using NewsAPI and displays categorized articles.',
      tech: ['React', 'Express', 'API'],
      image: 'https://images.unsplash.com/photo-1609764465702-78599b1f1833?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEwfHxuZXdzJTIwd2VifGVufDB8MHwwfHx8MA%3D%3D',
    },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Navbar */}
      <nav className="fixed w-full bg-gray-900/95 backdrop-blur-sm z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Nipun Bandara
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-sm transition-colors ${
                    activeSection === id
                      ? 'text-blue-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full flex items-center px-3 py-2 rounded-md text-base ${
                    activeSection === id
                      ? 'bg-gray-800 text-blue-500'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon size={18} className="mr-2" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src={portfolioImage}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto mb-6 border-4 border-blue-500/20"
            />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Hi, I'm Nipun Bandara
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Full-Stack Developer
          </p>
          <p className="text-gray-400 max-w-2xl mx-auto mb-12">
            Specializing in building exceptional digital experiences with modern technologies.
            From complex enterprise solutions to innovative AI applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center"
            >
              View My Work <ChevronRight size={20} className="ml-2" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 py-3 border border-gray-700 hover:border-blue-500 rounded-lg flex items-center"
            >
              Contact Me <Mail size={20} className="ml-2" />
            </button>
          </div>
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/nipunaloka"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/nipun-bandara-b28a93201"
              className="text-gray-400 hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="mailto:nipunaloka489@gmail.com"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gray-800/50 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-300 mb-6">
                With over 5 years of experience in software development, I've worked on a diverse range of projects
                from enterprise-level applications to cutting-edge IoT solutions. My passion lies in creating
                efficient, scalable, and user-friendly applications that solve real-world problems.
              </p>
              <p className="text-gray-300 mb-8">
                I specialize in full-stack development using the MERN stack, but I'm also experienced with .NET,
                AI/ML integration, and IoT development. I believe in continuous learning and staying updated with
                the latest technologies.
              </p>
              <a
                href="https://www.linkedin.com/in/nipun-bandara-b28a93201"
                className="inline-flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Download Resume <Download size={20} className="ml-2" />
              </a>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800"
                alt="About Me"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map(({ category, icon: Icon, items }) => (
              <div key={category} className="bg-gray-800/50 rounded-lg p-6 hover:bg-gray-800/70 transition-colors">
                <div className="flex items-center mb-4">
                  <Icon size={24} className="text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold">{category}</h3>
                </div>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item} className="text-gray-300 flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 bg-gray-800/50 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-gray-800/80 rounded-full text-sm text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href="https://github.com/nipunaloka"
                      className="inline-flex items-center text-white hover:text-blue-400 transition-colors"
                    >
                      Live Demo <ExternalLink size={16} className="ml-2" />
                    </a>
                    <a
                      href="https://github.com/nipunaloka"
                      className="inline-flex items-center text-white hover:text-blue-400 transition-colors"
                    >
                      GitHub <Github size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Experience & Education</h2>
          
          {/* Work Experience */}
          {/* <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-8">Work Experience</h3>
            <div className="space-y-8">
              <div className="bg-gray-800/50 rounded-lg p-6">
                <h4 className="text-xl font-semibold text-blue-500">Senior Software Engineer</h4>
                <p className="text-gray-400">Tech Corp Inc. | 2020 - Present</p>
                <ul className="mt-4 space-y-2 text-gray-300">
                  <li>• Led development of enterprise-scale applications</li>
                  <li>• Implemented CI/CD pipelines reducing deployment time by 60%</li>
                  <li>• Mentored junior developers and conducted code reviews</li>
                </ul>
              </div>
              
            </div>
          </div> */}

          {/* Education */}
          <div>
            <h3 className="text-2xl font-semibold mb-8">Education</h3>
            <div className="bg-gray-800/50 rounded-lg p-6">
              <h4 className="text-xl font-semibold text-blue-500">BICT(Hon’s)</h4>
              <p className="text-gray-400">South Eastern University of Sri Lanka | 2020 - 2025</p>
              <p className="mt-4 text-gray-300">
                Specialized in Software Technologies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-800/50 opacity-0 translate-y-10 transition-all duration-1000 ease-out">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                <p className="flex items-center text-gray-300">
                  <Mail size={20} className="mr-3 text-blue-500" />
                  nipunaloka489@gmail.com
                </p>
                <p className="flex items-center text-gray-300">
                  <Linkedin size={20} className="mr-3 text-blue-500" />
                  https://www.linkedin.com/in/nipun-bandara-b28a93201
                </p>
                <p className="flex items-center text-gray-300">
                  <Github size={20} className="mr-3 text-blue-500" />
                  https://github.com/nipunaloka
                </p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center"
                >
                  Send Message <MessageSquare size={20} className="ml-2" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 mt-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 Nipun Bandara. All rights reserved.
          </div>
          <div className="flex gap-6">
            {navLinks.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;