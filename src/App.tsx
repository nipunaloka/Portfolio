import { useState, useEffect, useRef  } from 'react';
import { motion, useScroll, useSpring, useInView } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import portfolioImage from "./image/portfolio.png";
import {
  Github,
  Mail,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  ChevronLeft,
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
  AirVent,
  Smartphone,
  Bot,
  Wifi,
  Lightbulb,
  Settings,
  Zap,
  Award,
  Users,
  TrendingUp,
  Target,
  Coffee,
  Star,
  ArrowUpRightFromSquareIcon,
  Send,
  CheckCircle,
  AlertCircle,
  Loader,
  Phone,
} from 'lucide-react';

function Counter({ end, duration = 2, suffix = '' }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / (duration * 1000);

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
      {count}{suffix}
    </span>
  );
}

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formMessage, setFormMessage] = useState('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation Variants
  const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6}
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6 }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 60 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6}
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { duration: 0.5}
  }
};

  const navLinks = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'projects', label: 'Projects', icon: Layout },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'services', label: 'Services', icon: Settings },
    { id: 'contact', label: 'Contact', icon: MessageSquare },
  ];

  const skills = [
    {
      category: 'Frontend',
      icon: Layout,
      items: ['HTML','React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    },
    {
      category: 'Backend',
      icon: Server,
      items: ['Node.js','.NET Core', 'Laravel', 'Flask', 'FastAPI'],
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
      category: 'Mobile Development',
      icon: Smartphone,
      items: ['Android Studio (Java)', 'Flutter', 'React Native'],
    },
    {
      category: 'ML/AI',
      icon: AirVent,
      items: ['TensorFlow', 'Data Mining', 'Scikit-learn'],
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
      title: 'Food Recognition App for Tourists (Flutter, FastAPI, MobileNetV2, MongoDB)',
      description: 'Developed an AI-powered mobile app to recognize traditional Sri Lankan dishes and provide cultural insights, ingredients, and preparation methods. Implemented MobileNetV2 (97% accuracy) with FastAPI backend, Google OAuth, user reviews, and multilingual support.',
      tech: ['Flutter', 'FastAPI', 'MobileNetV2', 'MongoDB', 'Google OAuth'],
      image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
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
    {
      title: 'Task Management Web App (React, Node.js, MongoDB)',
      description: 'A full-stack Task Management Web Application built with modern technologies including React, Node.js, and MongoDB. Users can log in with Google, manage tasks, and export data as PDFs.',
      tech: ['React', 'Node.js', 'MongoDB', 'Google OAuth', 'PDF Export'],
      image: 'https://images.unsplash.com/photo-1612831455540-7b47c5f13e07?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    }
  ];

  const services = [
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Building scalable web applications using MERN stack, Next.js, and modern frameworks with responsive UI/UX.',
      features: ['React & Next.js', 'Node.js & Express', 'RESTful APIs', 'Database Design'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Creating cross-platform mobile applications with React Native and native solutions for iOS and Android.',
      features: ['React Native', 'Cross-Platform', 'Native Performance', 'App Store Deploy'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Developing robust server-side applications, APIs, and microservices with Node.js, .NET Core, and Laravel.',
      features: ['.NET Core', 'Laravel', 'Microservices', 'API Integration'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Bot,
      title: 'AI/ML Integration',
      description: 'Implementing machine learning models, computer vision, sentiment analysis, and AI-powered features.',
      features: ['TensorFlow', 'Computer Vision', 'NLP & Sentiment Analysis', 'Data Mining'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Wifi,
      title: 'IoT Solutions',
      description: 'Designing and developing IoT systems with ESP32, Arduino, and Raspberry Pi for smart automation.',
      features: ['ESP32 & Arduino', 'Sensor Integration', 'Real-time Monitoring', 'Smart Automation'],
      color: 'from-teal-500 to-cyan-500'
    },
    {
      icon: Cloud,
      title: 'Cloud & DevOps',
      description: 'Deploying and managing applications on AWS, Azure with Docker containerization and CI/CD pipelines.',
      features: ['AWS & Azure', 'Docker', 'CI/CD Pipelines', 'Cloud Architecture'],
      color: 'from-indigo-500 to-blue-500'
    },
  ];

  const achievements = [
    {
      icon: Code,
      value: 30,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Full-stack & IoT solutions',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Award,
      value: 5,
      suffix: '+',
      label: 'Years Experience',
      description: 'In software development',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Users,
      value: 15,
      suffix: '+',
      label: 'Happy Clients',
      description: 'Satisfied customers',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Star,
      value: 100,
      suffix: '%',
      label: 'Success Rate',
      description: 'Project delivery',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Coffee,
      value: 1000,
      suffix: '+',
      label: 'Cups of Coffee',
      description: 'Fueling development',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: TrendingUp,
      value: 50,
      suffix: '+',
      label: 'Technologies Used',
      description: 'Modern tech stack',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Started University',
      description: 'Began BICT degree at South Eastern University',
      icon: BookOpen
    },
    {
      year: '2021',
      title: 'First Major Project',
      description: 'Built Restaurant POS System with MERN stack',
      icon: Code
    },
    {
      year: '2022',
      title: 'IoT Innovation',
      description: 'Developed ESP32-based smart automation system',
      icon: Wifi
    },
    {
      year: '2023',
      title: 'AI/ML Expertise',
      description: 'Completed Sentiment Analysis project with 95% accuracy',
      icon: Bot
    },
    {
      year: '2024',
      title: 'Cloud Certification',
      description: 'AWS Academy Cloud Foundations Graduate',
      icon: Cloud
    },
    {
      year: '2025',
      title: 'Graduation',
      description: 'Graduating with Honors in Software Technologies',
      icon: Award
    }
  ];
  // Navigation functions for projects carousel
  const nextProjects = () => {
    setCurrentProjectIndex((prev) => 
      prev + 4 >= projects.length ? 0 : prev + 4
    );
  };

  const prevProjects = () => {
    setCurrentProjectIndex((prev) => 
      prev - 4 < 0 ? Math.max(0, projects.length - 4) : prev - 4
    );
  };

  // Get current projects to display
  const displayedProjects = projects.slice(currentProjectIndex, currentProjectIndex + 4);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('loading');
    setFormMessage('');

    try {
      const response = await fetch('https://formspree.io/f/mjgbbdlv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormMessage('Thank you for your message! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus('idle');
          setFormMessage('');
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setFormStatus('error');
      setFormMessage('Oops! Something went wrong. Please try again or email me directly.');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
        setFormMessage('');
      }, 5000);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <style>{`
        /* Deployment fixes for GitHub Pages */
        html {
          -webkit-text-size-adjust: none !important;
          -moz-text-size-adjust: none !important;
          -ms-text-size-adjust: none !important;
          text-size-adjust: none !important;
        }
        
        body {
          -webkit-text-size-adjust: none !important;
          text-size-adjust: none !important;
          transform: scale(1) !important;
          transform-origin: 0 0 !important;
        }
        
        #root {
          -webkit-text-size-adjust: none !important;
          text-size-adjust: none !important;
        }
        
        * {
          -webkit-text-size-adjust: none !important;
          text-size-adjust: none !important;
        }

        .glass {
          background: rgba(17, 25, 40, 0.75);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.125);
        }
        
        .glass-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        .glass-hover {
          transition: all 0.3s ease;
        }

        .glass-hover:hover {
          background: rgba(30, 41, 59, 0.8);
          border: 1px solid rgba(59, 130, 246, 0.3);
          box-shadow: 0 8px 32px 0 rgba(59, 130, 246, 0.2);
        }
      `}</style>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed w-full glass backdrop-blur-md z-50 border-b border-gray-700/50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex-shrink-0"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
              >
                NB
              </motion.span>
            </motion.div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map(({ id, label, icon: Icon }, index) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-4 py-2 rounded-lg transition-all ${
                    activeSection === id
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                  {activeSection === id && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg glass-card text-gray-300 hover:text-white transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-gray-700/50"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map(({ id, label, icon: Icon }, index) => (
                <motion.button
                  key={id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => scrollToSection(id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === id
                      ? 'glass-card border border-blue-500/30 text-white'
                      : 'text-gray-400 hover:glass-card hover:text-white'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-16 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="mb-8 relative"
          >
            <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
          />
            <motion.img
              whileHover={{ scale: 1.05, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={portfolioImage}
              alt="Profile"
              className="relative w-40 h-40 rounded-full mx-auto border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              <TypeAnimation
                sequence={[
                  "Hi, I'm Nipun Bandara",
                  2000,
                  "Hi, I'm a Problem Solver",
                  2000,
                  "Hi, I'm a Tech Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </span>
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block glass-card rounded-2xl px-8 py-4 border border-gray-700"
            >
              <TypeAnimation
                sequence={[
                  1000,
                  'Full-Stack Developer',
                  2000,
                  'AI & Machine Learning Developer',
                  2000,
                  'Mobile & Backend Developer',
                  2000,
                  'IoT & Embedded Systems Developer',
                  2000,
                  'Cloud & Database Solutions Developer',
                  2000,
                ]}
                wrapper="p"
                className="text-xl md:text-2xl text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </motion.div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-400 text-lg max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Specializing in building exceptional digital experiences with modern technologies.
            From complex enterprise solutions to innovative AI applications.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('projects')}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative flex items-center gap-2">
                View My Work 
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 glass-card border border-gray-700 hover:border-blue-500 rounded-xl font-semibold transition-all"
            >
              <span className="flex items-center gap-2">
                Contact Me 
                <Mail size={20} className="group-hover:rotate-12 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-6"
          >
            {[
              { href: "https://github.com/nipunaloka", icon: Github, color: "hover:text-gray-400" },
              { href: "https://www.linkedin.com/in/nipun-bandara-b28a93201", icon: Linkedin, color: "hover:text-blue-400" },
              { href: "mailto:nipunaloka489@gmail.com", icon: Mail, color: "hover:text-red-400" }
            ].map(({ href, icon: Icon, color }, index) => (
              <motion.a
                key={href}
                href={href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-4 glass-card rounded-xl text-gray-400 ${color} transition-all border border-gray-700 hover:border-blue-500`}
                target={href.startsWith('http') ? "_blank" : undefined}
                rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>

          {/* Floating skill badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-wrap justify-center gap-3"
          >
            {['React', 'Node.js', 'Python', 'AI/ML', 'IoT', 'Cloud'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="px-4 py-2 glass-card rounded-full text-sm font-medium text-blue-400 border border-blue-500/30"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-gray-400"
            >
              <span className="text-xs">Scroll to explore</span>
              <ChevronRight size={20} className="rotate-90" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative overflow-hidden bg-gray-800/50">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Passionate developer dedicated to creating innovative solutions and delivering excellence
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-start mb-12">
            {/* Left Side - Text Content (3 columns width) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="lg:col-span-3 space-y-4"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative glass-card glass-hover rounded-2xl p-5">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 mr-3 flex-shrink-0">
                      <User size={20} className="text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Who I Am</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        With over 5 years of hands-on experience in software development through academic, project-based, and internship work, I have contributed to a wide range of solutions including full-stack web and mobile applications, backend systems, and IoT-based solutions.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative glass-card glass-hover rounded-2xl p-5">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 mr-3 flex-shrink-0">
                      <Target size={20} className="text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">My Expertise</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        I specialize in full-stack development using the MERN stack, with additional experience in .NET development, RESTful API design, AI/ML integration, and IoT systems. I am experienced in working with databases, cloud platforms, secure authentication mechanisms, and modern development tools.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative glass-card glass-hover rounded-2xl p-5">
                  <div className="flex items-start">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 mr-3 flex-shrink-0">
                      <Lightbulb size={20} className="text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">My Approach</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        A continuous learner, I stay updated with emerging technologies and best practices to deliver robust, maintainable, and high-quality software solutions. I focus on building efficient, scalable, and user-friendly applications that address real-world business needs.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.a
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                href="https://www.linkedin.com/in/nipun-bandara-b28a93201"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg"
              >
                More About <ArrowUpRightFromSquareIcon size={20} className="ml-2" />
              </motion.a>
            </motion.div>

            {/* Right Side - Image with Stats Overlay (2 columns width) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="lg:col-span-2 relative"
            >
              {/* Main Image Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                <div className="relative glass-card rounded-2xl overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=800"
                    alt="About Me"
                    className="w-full h-[470px] object-cover rounded-2xl"
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                </div>
              </motion.div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -left-4 glass-card rounded-xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                    <Code size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">30+</p>
                    <p className="text-xs text-gray-400">Projects</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-4 -right-4 glass-card rounded-xl p-3 shadow-xl"
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                    <Award size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-white">5+</p>
                    <p className="text-xs text-gray-400">Years Exp</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Skills Highlights */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { icon: Layout, label: 'Full-Stack', color: 'from-blue-500 to-cyan-500' },
              { icon: Bot, label: 'AI/ML', color: 'from-purple-500 to-pink-500' },
              { icon: Wifi, label: 'IoT', color: 'from-green-500 to-emerald-500' },
              { icon: Cloud, label: 'Cloud & DevOps', color: 'from-orange-500 to-red-500' }
            ].map((skill) => (
              <motion.div
                key={skill.label}
                variants={scaleIn}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                <div className="relative glass-card glass-hover rounded-xl p-4 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${skill.color} p-0.5`}
                  >
                    <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                      <skill.icon size={18} className="text-white" />
                    </div>
                  </motion.div>
                  <p className="text-xs font-semibold text-gray-300">{skill.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-4 ">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-center mb-12">
            Comprehensive technical expertise across modern development stacks
          </p>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {skills.map(({ category, icon: Icon, items }) => (
              <motion.div
                key={category}
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                
                {/* Card */}
                <div className="relative glass-card glass-hover rounded-2xl p-6 h-full">
                  <div className="flex items-center mb-4">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mr-3"
                    >
                      <Icon size={24} className="text-blue-400" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-white">{category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {items.map((item, i) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="text-gray-300 flex items-center group/item"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-2 group-hover/item:scale-150 transition-transform"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Bottom accent */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section id="projects" className="py-20 px-4 bg-gray-800/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Showcasing my best work in full-stack development, AI/ML, and IoT solutions
            </p>

            {/* Project Counter */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-sm text-gray-400">
                Showing {currentProjectIndex + 1}-{Math.min(currentProjectIndex + 4, projects.length)} of {projects.length} projects
              </span>
            </div>
          </motion.div>

          {/* Projects Grid with Navigation */}
          <div className="relative">
            {/* Left Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevProjects}
              disabled={currentProjectIndex === 0}
              className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 z-20 p-3 rounded-full glass-card ${
                currentProjectIndex === 0 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-blue-600/20'
              }`}
            >
              <ChevronLeft size={28} className="text-white" />
            </motion.button>

            {/* Right Arrow */}
            <motion.button
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextProjects}
              disabled={currentProjectIndex + 4 >= projects.length}
              className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 z-20 p-3 rounded-full glass-card ${
                currentProjectIndex + 4 >= projects.length 
                  ? 'opacity-30 cursor-not-allowed' 
                  : 'hover:bg-blue-600/20'
              }`}
            >
              <ChevronRight size={28} className="text-white" />
            </motion.button>

            {/* Projects Grid */}
            <motion.div 
              key={currentProjectIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 gap-8"
            >
              {displayedProjects.map((project, index) => (
                <motion.div
                  key={`${currentProjectIndex}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                  
                  {/* Card */}
                  <div className="relative glass-card glass-hover rounded-2xl overflow-hidden h-full">
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                        src={project.image}
                        alt={project.title}
                        className="w-full h-56 object-cover"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                        {project.title}
                      </h3>
                      
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tech.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30"
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                      
                      {/* Links */}
                      <div className="flex gap-4 pt-4 border-t border-gray-700">
                        <motion.a
                          whileHover={{ x: 5, color: "#3b82f6" }}
                          href="https://github.com/nipunaloka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
                        >
                          <ExternalLink size={16} className="mr-2" />
                          Live Demo
                        </motion.a>
                        <motion.a
                          whileHover={{ x: 5, color: "#3b82f6" }}
                          href="https://github.com/nipunaloka"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-colors text-sm font-medium"
                        >
                          <Github size={16} className="mr-2" />
                          GitHub
                        </motion.a>
                      </div>
                    </div>

                    {/* Bottom accent */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: Math.ceil(projects.length / 4) }).map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCurrentProjectIndex(index * 4)}
                className={`w-3 h-3 rounded-full transition-all ${
                  Math.floor(currentProjectIndex / 4) === index
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8'
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>

          {/* View All Projects CTA */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <motion.a
              href="https://github.com/nipunaloka"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg"
            >
              View All Projects on GitHub
              <ExternalLink size={20} className="ml-2" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Experience & Education
              </span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              My academic journey, professional experience, and certifications.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Education Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="space-y-6"
            >
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mr-4">
                  <BookOpen size={28} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Education</h3>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative glass-card glass-hover rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">BICT (Hon's)</h4>
                      <p className="text-blue-400 font-medium mb-1">South Eastern University of Sri Lanka</p>
                      <p className="text-gray-400 text-sm mb-3">2020 - 2025</p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs font-semibold border border-green-500/30">
                        <Target size={14} className="mr-1" />
                        Software Technologies
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    >
                      <Award size={24} className="text-purple-400" />
                    </motion.div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mt-4">
                    Specialized in Software Technologies with hands-on experience in full-stack development, AI/ML, IoT systems, and cloud computing.
                  </p>
                </div>
              </motion.div>

              {/* Work Experince */}
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 mr-4">
                  <BookOpen size={28} className="text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Work Experience</h3>
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative glass-card glass-hover rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2">Software Engineering(Full-stack development)</h4>
                      <p className="text-blue-400 font-medium mb-1">Gamage Recruiters (PVT) LTD</p>
                      <p className="text-gray-400 text-sm mb-3">2025</p>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs font-semibold border border-green-500/30">
                        <Target size={14} className="mr-1" />
                        MERN Stack
                      </div>
                      <div className="inline-flex items-center px-3 py-1 ml-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs font-semibold border border-green-500/30">
                        <Target size={14} className="mr-1" />
                        React Native
                      </div>
                      <div className="inline-flex items-center px-3 py-1 ml-3 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 text-xs font-semibold border border-green-500/30">
                        <Target size={14} className="mr-1" />
                        Flask
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20"
                    >
                      <Award size={24} className="text-purple-400" />
                    </motion.div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mt-4">
                    Developed full-stack web and mobile applications using the MERN stack and React Native, implementing secure authentication with JWT and Google OAuth, role-based access control, and RESTful APIs. Integrated mobile applications with backend services for bookings, profiles, file uploads, and PDF generation, while configuring email services, testing APIs, fixing bugs, and optimizing backend performance.
                  </p>
                </div>
              </motion.div>

            </motion.div>
            

            {/* Certificates Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="space-y-6"
            >
              <div className="flex items-center mb-8">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 mr-4">
                  <Award size={28} className="text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>

              {[
                {
                  title: "AWS Academy Graduate",
                  subtitle: "AWS Academy Cloud Foundations",
                  icon: Cloud,
                  color: "from-orange-500 to-red-500",
                  link: "https://www.credly.com/badges/40ec7c43-9ef7-4950-aec5-f033c8a64ebe/linked_in_profile"
                },
                {
                  title: "Programming Essentials in C",
                  subtitle: "Cisco Networking Academy",
                  icon: Code,
                  color: "from-green-500 to-emerald-500",
                  link: "https://www.linkedin.com/in/nipun-bandara-b28a93201/details/certifications/1715083613876/single-media-viewer?type=DOCUMENT&profileId=ACoAADOYe5ABeJf69jA0SysibhG9mtjTP1g9bsA&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3Bmb8fFOZaSp2SjpTU0uNUSQ%3D%3D"
                },
                {
                  title: "Data Mining",
                  subtitle: "Professional Certification",
                  icon: Database,
                  color: "from-blue-500 to-cyan-500",
                  link: "https://www.linkedin.com/in/nipun-bandara-b28a93201/details/certifications/1715084142641/single-media-viewer?type=IMAGE&profileId=ACoAADOYe5ABeJf69jA0SysibhG9mtjTP1g9bsA&lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BSONtPRbzRxWsBBlq0QXB%2Fw%3D%3D"
                }
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${cert.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  <div className="relative glass-card glass-hover rounded-2xl p-5">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start flex-1">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`p-2 rounded-lg bg-gradient-to-r ${cert.color} mr-3 flex-shrink-0`}
                        >
                          <cert.icon size={20} className="text-white" />
                        </motion.div>
                        <div>
                          <h4 className="text-lg font-bold text-white mb-1">{cert.title}</h4>
                          <p className="text-gray-400 text-sm mb-3">{cert.subtitle}</p>
                          <motion.a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ x: 5 }}
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 text-sm font-medium"
                          >
                            View Certificate
                            <ExternalLink size={14} className="ml-2" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Skills Summary */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              <div className="relative glass-card glass-hover rounded-2xl p-8">
                <div className="text-center">
                  <motion.div
                    animate={{
                      rotate: [0, 10, -10, 10, 0],
                      scale: [1, 1.1, 1.1, 1.1, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className="inline-block mb-4"
                  >
                    <Lightbulb size={40} className="text-yellow-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">Continuous Learner</h3>
                  <p className="text-gray-400 max-w-2xl mx-auto mb-6">
                    Always staying updated with emerging technologies and best practices to deliver cutting-edge solutions. 
                    Committed to professional growth and technical excellence.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {['Problem Solving', 'Team Collaboration', 'Agile Development', 'Code Quality'].map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 text-sm font-medium border border-blue-500/30"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats & Achievements Section */}
      <section className="py-20 px-4 bg-gray-800/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Stats & Achievements
              </span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Numbers that showcase my journey and commitment to excellence in software development
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
          >
            {achievements.map((stat, _index) => (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ 
                  y: -10,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                {/* Card */}
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all">
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-14 h-14 mb-6 rounded-xl bg-gradient-to-r ${stat.color} p-0.5`}
                  >
                    <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
                      <stat.icon size={28} className="text-white" />
                    </div>
                  </motion.div>

                  {/* Counter */}
                  <div className="mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm">
                    {stat.description}
                  </p>

                  {/* Bottom accent */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${stat.color} rounded-b-2xl`}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline/Milestones */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-20"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Journey Milestones
              </span>
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-blue-500"></div>

              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.year}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`flex flex-col lg:flex-row items-center gap-8 ${
                      index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Content */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`lg:w-5/12 ${
                        index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                      }`}
                    >
                      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.6 }}
                          className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${achievements[index % achievements.length].color} mb-4`}
                        >
                          <milestone.icon size={24} className="text-white" />
                        </motion.div>
                        <h4 className="text-xl font-bold text-white mb-2">
                          {milestone.title}
                        </h4>
                        <p className="text-gray-400 mb-2">
                          {milestone.description}
                        </p>
                        <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">
                          {milestone.year}
                        </span>
                      </div>
                    </motion.div>

                    {/* Timeline dot */}
                    <motion.div
                      whileHover={{ scale: 1.5, rotate: 180 }}
                      className="hidden lg:flex w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-gray-900 z-10"
                    />

                    {/* Spacer */}
                    <div className="hidden lg:block lg:w-5/12"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Achievement Badges */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-20 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                >
                  <Target size={40} className="text-yellow-400" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">
                Ready to Achieve More Together?
              </h3>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Let's create something amazing and add to these achievements. Your project could be the next milestone!
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg flex items-center font-semibold mx-auto"
              >
                <Zap size={20} className="mr-2" />
                Let's Build Together
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                My Services
              </span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Comprehensive development solutions tailored to your business needs, 
              from concept to deployment and beyond.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, _index) => (
              <motion.div
                key={service.title}
                variants={scaleIn}
                whileHover={{ 
                  y: -10, 
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                {/* Animated gradient border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                
                {/* Card content */}
                <div className="relative bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 h-full border border-gray-700 hover:border-gray-600 transition-colors">
                  {/* Icon with animated background */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-r ${service.color} p-0.5`}
                  >
                    <div className="w-full h-full bg-gray-800 rounded-xl flex items-center justify-center">
                      <service.icon size={32} className="text-white" />
                    </div>
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-blue-400 group-hover:to-purple-400 transition-all">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center text-gray-300"
                      >
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 90 }}
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.color} mr-3`}
                        />
                        <span className="text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover effect overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-block bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8"
            >
              <div className="flex items-center justify-center mb-4">
                <motion.div
                  animate={{ 
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1.1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                >
                  <Lightbulb size={40} className="text-yellow-400" />
                </motion.div>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Have a Project in Mind?</h3>
              <p className="text-gray-400 mb-6 max-w-xl mx-auto">
                Let's discuss how I can help bring your ideas to life with cutting-edge technology 
                and innovative solutions.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg flex items-center font-semibold"
                >
                  <Zap size={20} className="mr-2" />
                  Start a Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollToSection('projects')}
                  className="px-8 py-3 border-2 border-gray-700 hover:border-blue-500 rounded-lg flex items-center font-semibold"
                >
                  View Portfolio
                  <ChevronRight size={20} className="ml-2" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - REPLACE THIS ENTIRE SECTION */}
      <section id="contact" className="py-20 px-4 bg-gray-800/50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Drop me a message and let's create something amazing together!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Left Side - Contact Info (2 columns) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInLeft}
              className="lg:col-span-2 space-y-6"
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
                <p className="text-gray-400">
                  Feel free to reach out through any of these channels. I'm always open to discussing new projects and opportunities.
                </p>
              </div>

              {/* Contact Cards */}
              {[
                {
                  icon: Mail,
                  title: 'Email',
                  value: 'nipunaloka489@gmail.com',
                  link: 'mailto:nipunaloka489@gmail.com',
                  color: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Linkedin,
                  title: 'LinkedIn',
                  value: 'Connect on LinkedIn',
                  link: 'https://www.linkedin.com/in/nipun-bandara-b28a93201',
                  color: 'from-purple-500 to-pink-500'
                },
                {
                  icon: Github,
                  title: 'GitHub',
                  value: 'View my repositories',
                  link: 'https://github.com/nipunaloka',
                  color: 'from-green-500 to-emerald-500'
                },
                {
                  icon: Phone,
                  title: 'Phone',
                  value: 'Available on request',
                  color: 'from-orange-500 to-red-500'
                }
              ].map((contact, index) => (
                <motion.div
                  key={contact.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${contact.color} rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                  
                  <div className="relative glass-card glass-hover rounded-xl p-5">
                    <div className="flex items-start">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className={`p-3 rounded-lg bg-gradient-to-r ${contact.color} mr-4 flex-shrink-0`}
                      >
                        <contact.icon size={24} className="text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold mb-1">{contact.title}</h4>
                        {contact.link ? (
                          <a
                            href={contact.link}
                            target={contact.link.startsWith('http') ? '_blank' : undefined}
                            rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-gray-400 text-sm hover:text-blue-400 transition-colors break-all"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-gray-400 text-sm">{contact.value}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative glass-card rounded-xl p-6">
                  <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                  <div className="flex gap-4">
                    {[
                      { href: "https://github.com/nipunaloka", icon: Github, label: "GitHub" },
                      { href: "https://www.linkedin.com/in/nipun-bandara-b28a93201", icon: Linkedin, label: "LinkedIn" },
                      { href: "mailto:nipunaloka489@gmail.com", icon: Mail, label: "Email" }
                    ].map(({ href, icon: Icon, label }) => (
                      <motion.a
                        key={label}
                        href={href}
                        target={href.startsWith('http') ? "_blank" : undefined}
                        rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
                        whileHover={{ scale: 1.2, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-lg bg-gray-700/50 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all"
                        title={label}
                      >
                        <Icon size={20} className="text-gray-300 hover:text-white" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Contact Form (3 columns) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInRight}
              className="lg:col-span-3"
            >
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative group"
              >
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                
                <div className="relative glass-card rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                        placeholder="John Doe"
                      />
                    </motion.div>

                    {/* Email Input */}
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                        placeholder="john@example.com"
                      />
                    </motion.div>

                    {/* Subject Input */}
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500"
                        placeholder="Project Inquiry"
                      />
                    </motion.div>

                    {/* Message Textarea */}
                    <motion.div whileHover={{ scale: 1.01 }}>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-white placeholder-gray-500 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </motion.div>

                    {/* Status Messages */}
                    {formMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex items-center gap-3 p-4 rounded-lg ${
                          formStatus === 'success'
                            ? 'bg-green-500/10 border border-green-500/30 text-green-400'
                            : 'bg-red-500/10 border border-red-500/30 text-red-400'
                        }`}
                      >
                        {formStatus === 'success' ? (
                          <CheckCircle size={20} className="flex-shrink-0" />
                        ) : (
                          <AlertCircle size={20} className="flex-shrink-0" />
                        )}
                        <p className="text-sm">{formMessage}</p>
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      whileHover={{ scale: formStatus === 'loading' ? 1 : 1.02 }}
                      whileTap={{ scale: formStatus === 'loading' ? 1 : 0.98 }}
                      className={`w-full px-6 py-4 rounded-lg flex items-center justify-center font-semibold text-white transition-all ${
                        formStatus === 'loading'
                          ? 'bg-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/50'
                      }`}
                    >
                      {formStatus === 'loading' ? (
                        <>
                          <Loader size={20} className="mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={20} className="mr-2" />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-xs text-gray-500 text-center">
                      By submitting this form, you agree to be contacted regarding your inquiry.
                    </p>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Quick Stats */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { icon: Zap, label: 'Quick Response', value: '< 24 hours', color: 'from-yellow-500 to-orange-500' },
              { icon: Users, label: 'Happy Clients', value: '15+', color: 'from-green-500 to-emerald-500' },
              { icon: Coffee, label: 'Projects Done', value: '30+', color: 'from-blue-500 to-cyan-500' },
              { icon: Star, label: 'Client Rating', value: '5.0', color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300`}></div>
                
                <div className="relative glass-card rounded-xl p-4 text-center">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`w-10 h-10 mx-auto mb-2 rounded-lg bg-gradient-to-r ${stat.color} p-0.5`}
                  >
                    <div className="w-full h-full bg-gray-800 rounded-lg flex items-center justify-center">
                      <stat.icon size={18} className="text-white" />
                    </div>
                  </motion.div>
                  <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-8 mt-8 px-4 border-t border-gray-800"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0">
            © 2024 Nipun Bandara. All rights reserved.
          </div>
          <div className="flex gap-6">
            {navLinks.map(({ id, label }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.1, color: "#fff" }}
                onClick={() => scrollToSection(id)}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;