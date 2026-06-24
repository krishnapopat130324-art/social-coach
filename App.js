// App.js - Social Coach with Study & Coding Options (FULLY FIXED)
import React, { useState, useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// ============================================================
// 🎨 THEME SYSTEM
// ============================================================
const THEMES = {
  purple: {
    id: 'purple',
    name: 'Purple',
    primary: '#6C63FF',
    secondary: '#8B83FF',
    background: '#F0EEFF',
    card: '#FFFFFF',
    text: '#2D2B4E',
    textLight: '#6B6A8A',
    accent: '#FF6B6B',
    gradient: ['#6C63FF', '#8B83FF'],
    bubbleUser: '#6C63FF',
    bubbleCoach: '#F0EEFF',
    shadow: 'rgba(108, 99, 255, 0.2)',
    emoji: '💜',
  },
  pink: {
    id: 'pink',
    name: 'Romantic Pink',
    primary: '#FF1493',
    secondary: '#FF6B9D',
    background: '#FFF0F6',
    card: '#FFFFFF',
    text: '#4E2D3D',
    textLight: '#8A6A7A',
    accent: '#FFD700',
    gradient: ['#FF1493', '#FF6B9D'],
    bubbleUser: '#FF1493',
    bubbleCoach: '#FFF0F6',
    shadow: 'rgba(255, 20, 147, 0.2)',
    emoji: '💗',
  },
  red: {
    id: 'red',
    name: 'Warm Red',
    primary: '#FF6B6B',
    secondary: '#FF8E8E',
    background: '#FFF0EE',
    card: '#FFFFFF',
    text: '#4E2D2B',
    textLight: '#8A6B6A',
    accent: '#4ECDC4',
    gradient: ['#FF6B6B', '#FF8E8E'],
    bubbleUser: '#FF6B6B',
    bubbleCoach: '#FFF0EE',
    shadow: 'rgba(255, 107, 107, 0.2)',
    emoji: '❤️',
  },
  blue: {
    id: 'blue',
    name: 'Professional Blue',
    primary: '#2C3E50',
    secondary: '#34495E',
    background: '#F0F2F5',
    card: '#FFFFFF',
    text: '#1A1A2E',
    textLight: '#6B6A8A',
    accent: '#3498DB',
    gradient: ['#2C3E50', '#34495E'],
    bubbleUser: '#2C3E50',
    bubbleCoach: '#F0F2F5',
    shadow: 'rgba(44, 62, 80, 0.2)',
    emoji: '💙',
  },
  lavender: {
    id: 'lavender',
    name: 'Calm Lavender',
    primary: '#6C5CE7',
    secondary: '#A29BFE',
    background: '#F5F0FF',
    card: '#FFFFFF',
    text: '#2D2B4E',
    textLight: '#6B6A8A',
    accent: '#00CEC9',
    gradient: ['#6C5CE7', '#A29BFE'],
    bubbleUser: '#6C5CE7',
    bubbleCoach: '#F5F0FF',
    shadow: 'rgba(108, 92, 231, 0.2)',
    emoji: '💜',
  },
  gold: {
    id: 'gold',
    name: 'Golden',
    primary: '#F39C12',
    secondary: '#F1C40F',
    background: '#FFFBF0',
    card: '#FFFFFF',
    text: '#4E3D2B',
    textLight: '#8A7A6A',
    accent: '#E74C3C',
    gradient: ['#F39C12', '#F1C40F'],
    bubbleUser: '#F39C12',
    bubbleCoach: '#FFFBF0',
    shadow: 'rgba(243, 156, 18, 0.2)',
    emoji: '🌟',
  },
  green: {
    id: 'green',
    name: 'Fresh Green',
    primary: '#00B894',
    secondary: '#00D2A0',
    background: '#F0FFF8',
    card: '#FFFFFF',
    text: '#2D4E3D',
    textLight: '#6A8A7A',
    accent: '#FDCB6E',
    gradient: ['#00B894', '#00D2A0'],
    bubbleUser: '#00B894',
    bubbleCoach: '#F0FFF8',
    shadow: 'rgba(0, 184, 148, 0.2)',
    emoji: '💚',
  },
  dark: {
    id: 'dark',
    name: 'Dark Mode',
    primary: '#1A1A2E',
    secondary: '#2D2B4E',
    background: '#0F0F1A',
    card: '#1A1A2E',
    text: '#FFFFFF',
    textLight: '#A0A0B8',
    accent: '#6C63FF',
    gradient: ['#1A1A2E', '#2D2B4E'],
    bubbleUser: '#6C63FF',
    bubbleCoach: '#2D2B4E',
    shadow: 'rgba(108, 99, 255, 0.2)',
    emoji: '🌙',
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean Blue',
    primary: '#00B4D8',
    secondary: '#48CAE4',
    background: '#E8F8FF',
    card: '#FFFFFF',
    text: '#023E8A',
    textLight: '#0077B6',
    accent: '#FF6B6B',
    gradient: ['#00B4D8', '#48CAE4'],
    bubbleUser: '#00B4D8',
    bubbleCoach: '#E8F8FF',
    shadow: 'rgba(0, 180, 216, 0.2)',
    emoji: '🌊',
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset',
    primary: '#FF6B35',
    secondary: '#FF8C42',
    background: '#FFF5F0',
    card: '#FFFFFF',
    text: '#4A2810',
    textLight: '#8A684A',
    accent: '#FF1493',
    gradient: ['#FF6B35', '#FF8C42'],
    bubbleUser: '#FF6B35',
    bubbleCoach: '#FFF5F0',
    shadow: 'rgba(255, 107, 53, 0.2)',
    emoji: '🌅',
  },
};

// Theme options for the switcher
const THEME_OPTIONS = [
  { id: 'purple', name: 'Purple', emoji: '💜' },
  { id: 'pink', name: 'Pink', emoji: '💗' },
  { id: 'red', name: 'Red', emoji: '❤️' },
  { id: 'blue', name: 'Blue', emoji: '💙' },
  { id: 'lavender', name: 'Lavender', emoji: '💜' },
  { id: 'gold', name: 'Golden', emoji: '🌟' },
  { id: 'green', name: 'Green', emoji: '💚' },
  { id: 'ocean', name: 'Ocean', emoji: '🌊' },
  { id: 'sunset', name: 'Sunset', emoji: '🌅' },
  { id: 'dark', name: 'Dark', emoji: '🌙' },
];

// Scenario to Theme mapping
const SCENARIO_THEMES = {
  general: 'purple',
  friends: 'red',
  date: 'pink',
  interview: 'blue',
  anxiety: 'lavender',
  confidence: 'lavender',
  stress: 'lavender',
  mindfulness: 'lavender',
  therapy: 'lavender',
  speaking: 'gold',
  debate: 'gold',
  speech: 'gold',
  pitch: 'gold',
  toast: 'gold',
  singing: 'purple',
  audition: 'purple',
  stagefright: 'lavender',
  karaoke: 'gold',
  performance: 'purple',
  doctor: 'green',
  fitness: 'green',
  nutrition: 'green',
  sleep: 'green',
  recovery: 'green',
  study: 'blue',
  math: 'blue',
  science: 'green',
  english: 'gold',
  history: 'sunset',
  exam: 'red',
  motivation: 'purple',
  coding: 'dark',
  python: 'blue',
  javascript: 'gold',
  web: 'ocean',
  react: 'purple',
  java: 'red',
  cpp: 'blue',
  interviewprep: 'dark',
};

// ============================================================
// 📱 MAIN APP
// ============================================================
export default function App() {
  const [messages, setMessages] = useState([
    {
      id: '1',
      speaker: 'Coach',
      message: '👋 Welcome to Social Coach! Choose a scenario below. 🎓 Study options for 10th/12th students! 💻 Coding for college students!',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [currentScenario, setCurrentScenario] = useState('general');
  const [category, setCategory] = useState('all');
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [currentThemeId, setCurrentThemeId] = useState('purple');
  const [showThemeModal, setShowThemeModal] = useState(false);
  const flatListRef = useRef(null);
  const speechSynthRef = useRef(null);
  const recognitionRef = useRef(null);

  // Get current theme
  const theme = THEMES[currentThemeId] || THEMES.purple;

  // Auto-change theme based on scenario
  useEffect(() => {
    const themeId = SCENARIO_THEMES[currentScenario] || 'purple';
    setCurrentThemeId(themeId);
  }, [currentScenario]);

  // Initialize speech
  useEffect(() => {
    if (Platform.OS === 'web' && window.speechSynthesis) {
      speechSynthRef.current = window.speechSynthesis;
    }
  }, []);

  const speakText = (text) => {
    if (Platform.OS === 'web' && speechSynthRef.current) {
      speechSynthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.pitch = 1.0;
      utterance.rate = 0.9;
      speechSynthRef.current.speak(utterance);
    }
  };

  // Voice input
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported. Please use Google Chrome.');
      return;
    }
    
    if (isListeningVoice) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListeningVoice(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
      setIsListeningVoice(true);
      setInputText('🎤 Listening... Speak now');
    };
    
    recognition.onresult = (event) => {
      let transcript = '';
      let isFinal = false;
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
        if (event.results[i].isFinal) isFinal = true;
      }
      setInputText(transcript);
      if (isFinal && transcript.trim()) {
        setInputText(transcript + ' ✏️ (Click Send)');
      }
    };
    
    recognition.onerror = (event) => {
      setIsListeningVoice(false);
      if (event.error === 'no-speech') {
        setInputText('No speech detected. Try again.');
        setTimeout(() => setInputText(''), 2000);
      }
    };
    
    recognition.onend = () => {
      setIsListeningVoice(false);
      if (inputText === '🎤 Listening... Speak now') setInputText('');
    };
    
    try { recognition.start(); } catch (error) { console.error(error); }
  };

  // ============================================================
  // 📚 SCENARIOS
  // ============================================================
  const scenarios = {
    'career': {
      id: 'career',
      label: '💼 Career',
      emoji: '💼',
      options: [
        { id: 'interview', label: 'Job Interview', emoji: '💼' },
        { id: 'negotiation', label: 'Salary Negotiation', emoji: '💰' },
        { id: 'networking', label: 'Networking Event', emoji: '🤝' },
        { id: 'presentation', label: 'Presentation', emoji: '📊' },
        { id: 'feedback', label: 'Giving Feedback', emoji: '📝' },
      ]
    },
    'social': {
      id: 'social',
      label: '👥 Social',
      emoji: '👥',
      options: [
        { id: 'friends', label: 'Making Friends', emoji: '🤝' },
        { id: 'date', label: 'First Date', emoji: '❤️' },
        { id: 'party', label: 'Party Conversation', emoji: '🎉' },
        { id: 'group', label: 'Group Discussion', emoji: '👥' },
        { id: 'smalltalk', label: 'Small Talk', emoji: '☕' },
      ]
    },
    'mental': {
      id: 'mental',
      label: '🧠 Mental Health',
      emoji: '🧠',
      options: [
        { id: 'anxiety', label: 'Managing Anxiety', emoji: '😰' },
        { id: 'confidence', label: 'Building Confidence', emoji: '💪' },
        { id: 'stress', label: 'Stress Management', emoji: '🧘' },
        { id: 'mindfulness', label: 'Mindfulness Practice', emoji: '🙏' },
        { id: 'therapy', label: 'Therapy Conversation', emoji: '💬' },
      ]
    },
    'relationships': {
      id: 'relationships',
      label: '💕 Relationships',
      emoji: '💕',
      options: [
        { id: 'conflict', label: 'Conflict Resolution', emoji: '⚡' },
        { id: 'parents', label: 'Talking to Parents', emoji: '👨‍👩‍👧' },
        { id: 'partner', label: 'Partner Communication', emoji: '💑' },
        { id: 'apology', label: 'Saying Sorry', emoji: '🙏' },
        { id: 'boundaries', label: 'Setting Boundaries', emoji: '🛡️' },
      ]
    },
    'study': {
      id: 'study',
      label: '🎓 Study Help',
      emoji: '🎓',
      options: [
        { id: 'math', label: 'Math Help', emoji: '📐' },
        { id: 'science', label: 'Science Help', emoji: '🔬' },
        { id: 'english', label: 'English Practice', emoji: '📝' },
        { id: 'history', label: 'History Study', emoji: '📜' },
        { id: 'exam', label: 'Exam Prep', emoji: '📚' },
        { id: 'motivation', label: 'Study Motivation', emoji: '💪' },
      ]
    },
    'coding': {
      id: 'coding',
      label: '💻 Coding',
      emoji: '💻',
      options: [
        { id: 'python', label: 'Python', emoji: '🐍' },
        { id: 'javascript', label: 'JavaScript', emoji: '🟡' },
        { id: 'web', label: 'Web Development', emoji: '🌐' },
        { id: 'react', label: 'React/React Native', emoji: '⚛️' },
        { id: 'java', label: 'Java', emoji: '☕' },
        { id: 'cpp', label: 'C++', emoji: '⚡' },
        { id: 'interviewprep', label: 'Coding Interview', emoji: '💼' },
      ]
    },
    'public': {
      id: 'public',
      label: '🎤 Public Speaking',
      emoji: '🎤',
      options: [
        { id: 'speaking', label: 'Public Speaking', emoji: '🎤' },
        { id: 'debate', label: 'Debate Practice', emoji: '⚖️' },
        { id: 'speech', label: 'Wedding Speech', emoji: '💒' },
        { id: 'pitch', label: 'Business Pitch', emoji: '🚀' },
        { id: 'toast', label: 'Toast at Event', emoji: '🥂' },
      ]
    },
    'health': {
      id: 'health',
      label: '🏥 Health & Wellness',
      emoji: '🏥',
      options: [
        { id: 'doctor', label: 'Doctor Visit', emoji: '🩺' },
        { id: 'fitness', label: 'Fitness Motivation', emoji: '💪' },
        { id: 'nutrition', label: 'Nutrition Talk', emoji: '🥗' },
        { id: 'sleep', label: 'Sleep Hygiene', emoji: '😴' },
        { id: 'recovery', label: 'Recovery Journey', emoji: '🌟' },
      ]
    },
    'digital': {
      id: 'digital',
      label: '📱 Digital Life',
      emoji: '📱',
      options: [
        { id: 'socialmedia', label: 'Social Media', emoji: '📱' },
        { id: 'online', label: 'Online Dating', emoji: '💻' },
        { id: 'digitaldetox', label: 'Digital Detox', emoji: '🚫' },
        { id: 'remote', label: 'Remote Work', emoji: '🏠' },
        { id: 'cyber', label: 'Cyber Safety', emoji: '🛡️' },
      ]
    },
    'diversity': {
      id: 'diversity',
      label: '🌍 Diversity & Inclusion',
      emoji: '🌍',
      options: [
        { id: 'inclusion', label: 'Inclusion Talk', emoji: '🤗' },
        { id: 'culture', label: 'Cultural Exchange', emoji: '🌏' },
        { id: 'ally', label: 'Being an Ally', emoji: '🏳️‍🌈' },
        { id: 'accessibility', label: 'Accessibility', emoji: '♿' },
        { id: 'respect', label: 'Respectful Dialogue', emoji: '💬' },
      ]
    },
    'performance': {
      id: 'performance',
      label: '🎵 Singing',
      emoji: '🎵',
      options: [
        { id: 'singing', label: 'Singing Review', emoji: '🎤' },
        { id: 'audition', label: 'Audition Prep', emoji: '🎭' },
        { id: 'stagefright', label: 'Stage Fright', emoji: '😰' },
        { id: 'karaoke', label: 'Karaoke Night', emoji: '🎤' },
        { id: 'performance', label: 'Performance Tips', emoji: '🌟' },
      ]
    }
  };

  // ============================================================
  // 📝 RESPONSES (FULLY FIXED - No single quote errors)
  // ============================================================
  const scenarioResponses = {
    'friends': {
      start: '🤝 Making friends is wonderful! Let\'s practice starting a conversation. What would you say to someone new?',
      conversation: 'Great start! Ask open-ended questions like "What do you do for fun?" or "How do you know the host?"',
      followup: 'Excellent! Good listeners are great friends. Show interest in what others say.',
      default: 'That\'s a good approach! Friendship is about connection.',
    },
    'date': {
      start: '❤️ Dating can be nervous, but you\'ve got this! Let\'s practice a first date conversation. How would you introduce yourself?',
      conversation: 'Nice opener! On a date, ask about their interests, hobbies, and what they\'re passionate about. Keep it light and fun!',
      followup: 'Great! Remember to listen as much as you talk. Show genuine curiosity.',
      default: 'That\'s a good conversation starter! Be yourself and find common ground.',
    },
    'interview': {
      start: '💼 Great choice! Let\'s practice a job interview. Tell me about yourself. What\'s your name and what do you do?',
      conversation: 'Nice! Use the STAR method: Situation, Task, Action, Result.',
      followup: 'Good progress! Highlight your achievements and how they relate to the job.',
      default: 'That\'s a solid answer. Confidence and preparation are key.',
    },
    'anxiety': {
      start: '😰 Anxiety is real and it\'s okay to talk about it. How are you feeling right now?',
      conversation: 'Thank you for sharing. Try deep breathing: 4-7-8 method (inhale 4, hold 7, exhale 8).',
      followup: 'Great job! Ground yourself by naming 5 things you see, 4 you hear, 3 you touch.',
      default: 'That\'s a healthy way to talk about anxiety. Practice these techniques daily.',
    },
    'singing': {
      start: '🎤 Great! Let\'s practice singing! Sing a song or a few lines for me, and I\'ll give you feedback! What would you like to sing?',
      conversation: '🎵 Nice! Your pitch is clear, but try to work on your breathing. Take deeper breaths from your diaphragm.',
      followup: '🌟 Excellent progress! Want to try another song or focus on a specific aspect?',
      default: '🎵 That was good! Practice vocal warm-ups daily, record yourself, and stay hydrated!',
    },
    'speaking': {
      start: '🎤 Public speaking is a great skill! Let\'s practice together. What topic would you like to speak about?',
      conversation: 'Good topic! When presenting, start with a hook, use visuals, and practice your delivery.',
      followup: 'Excellent! Remember to make eye contact, use gestures, and pause for effect.',
      default: 'That\'s a solid approach! Keep practicing and you\'ll become more confident.',
    },
    'confidence': {
      start: '💪 Building confidence takes practice. Let\'s work on it! What\'s one thing you\'re proud of?',
      conversation: 'That\'s wonderful! Write down your achievements and read them daily. Confidence comes from recognizing your worth.',
      followup: 'Excellent! Confidence isn\'t about being perfect. It\'s about accepting yourself and taking action.',
      default: 'That\'s a great mindset! Keep building your confidence one step at a time.',
    },
    'conflict': {
      start: '⚡ Conflict resolution is key in any relationship. Let\'s practice. How would you handle a disagreement?',
      conversation: 'Good approach! Use "I" statements: "I feel..." instead of "You always...". Listen to understand, not to respond.',
      followup: 'Excellent! Stay calm, take a break if needed, and focus on finding a solution.',
      default: 'Good conflict resolution skills! Practice makes perfect.',
    },

    // STUDY SCENARIOS
    'math': {
      start: '📐 Let\'s practice math! What math topic are you studying? Algebra, Geometry, Calculus, or Statistics?',
      conversation: 'Great topic! Remember to practice problems daily, understand the concepts not just memorize formulas, and don\'t hesitate to ask for help when stuck.',
      followup: 'Excellent! Try breaking down complex problems into smaller steps. Practice makes perfect in math!',
      default: 'Good approach! Keep practicing and you\'ll master math. Remember: understanding is better than memorizing.',
    },
    'science': {
      start: '🔬 Science is fascinating! What science subject are you studying? Physics, Chemistry, Biology, or Environmental Science?',
      conversation: 'Great choice! For science, focus on understanding the "why" behind concepts. Do experiments, draw diagrams, and connect ideas to real life.',
      followup: 'Excellent! Remember to review your notes daily and practice explaining concepts to someone else.',
      default: 'Good approach! Keep exploring and questioning. Science is about curiosity and discovery!',
    },
    'english': {
      start: '📝 English practice! What would you like to work on? Grammar, Vocabulary, Writing, or Speaking?',
      conversation: 'Great choice! Read regularly, write daily, and practice speaking. The more you practice, the more confident you\'ll become.',
      followup: 'Excellent! Try reading news articles, writing journal entries, and having conversations in English daily.',
      default: 'Good approach! Keep practicing all four skills: reading, writing, speaking, and listening.',
    },
    'history': {
      start: '📜 History is full of fascinating stories! What historical period or topic are you studying?',
      conversation: 'Great topic! For history, create timelines, connect events, and understand the causes and effects. History is about understanding our past.',
      followup: 'Excellent! Try watching documentaries, reading biographies, and visiting museums if possible.',
      default: 'Good approach! Remember: those who don\'t learn from history are doomed to repeat it.',
    },
    'exam': {
      start: '📚 Exam prep can be stressful but you\'ve got this! What subject are you preparing for?',
      conversation: 'Great approach! Create a study schedule, take breaks, practice past papers, and stay hydrated. You\'ve prepared well, now trust yourself!',
      followup: 'Excellent! Remember to get enough sleep before the exam, eat a good breakfast, and stay calm. You know this material!',
      default: 'Good preparation! Keep going, take breaks, and believe in yourself. You\'ve got this!',
    },
    'motivation': {
      start: '💪 Study motivation is key! What\'s been challenging your motivation lately?',
      conversation: 'Great question! Remember your WHY. Why are you studying? What are your goals? Break big goals into small, achievable steps.',
      followup: 'Excellent! Celebrate small wins daily. Reward yourself after completing study sessions. You\'re building your future!',
      default: 'Good mindset! Stay focused, stay positive, and keep pushing forward. Your future self will thank you!',
    },

    // CODING SCENARIOS
    'python': {
      start: '🐍 Python is a great language to learn! What Python topic would you like to practice? Variables, Functions, Loops, or OOP?',
      conversation: 'Great topic! For Python, practice writing code daily. Start with small programs, use print statements to debug, and read others\' code.',
      followup: 'Excellent! Try building a small project like a calculator, to-do list, or web scraper to apply what you learn.',
      default: 'Good approach! Keep coding daily and you\'ll become a Python pro. Remember: practice is better than theory!',
    },
    'javascript': {
      start: '🟡 JavaScript is essential for web development! What would you like to practice? Variables, Functions, DOM Manipulation, or Async/Await?',
      conversation: 'Great topic! For JavaScript, practice in the browser console, build small projects, and understand concepts like closures and promises.',
      followup: 'Excellent! Try building a small web app, game, or interactive page to practice your skills.',
      default: 'Good approach! Keep coding and building. JavaScript is everywhere, and practice makes perfect!',
    },
    'web': {
      start: '🌐 Web Development is in high demand! What would you like to practice? HTML, CSS, JavaScript, or Backend?',
      conversation: 'Great choice! Start with HTML/CSS for structure, then add JavaScript for interactivity. Build projects to showcase your skills.',
      followup: 'Excellent! Try building a portfolio website, a blog, or a small web application to apply what you learn.',
      default: 'Good approach! Keep building and learning. Web development is a great career path!',
    },
    'react': {
      start: '⚛️ React is powerful! What would you like to practice? Components, State, Props, Hooks, or Navigation?',
      conversation: 'Great topic! For React, understand component lifecycle, state management, and hooks. Build small apps and refactor them.',
      followup: 'Excellent! Try building a todo app, weather app, or clone of a simple website to practice React.',
      default: 'Good approach! Keep building and breaking things. That\'s how you learn React!',
    },
    'java': {
      start: '☕ Java is a powerful language! What Java topic would you like to practice? OOP, Collections, Threads, or Spring?',
      conversation: 'Great topic! For Java, understand OOP concepts deeply, practice writing clean code, and learn design patterns.',
      followup: 'Excellent! Try building a small application like a banking system, library management, or game.',
      default: 'Good approach! Keep coding and learning. Java is used everywhere - from Android to enterprise!',
    },
    'cpp': {
      start: '⚡ C++ is a powerful language! What would you like to practice? Pointers, OOP, STL, or Data Structures?',
      conversation: 'Great topic! For C++, master pointers, understand memory management, and practice with data structures and algorithms.',
      followup: 'Excellent! Try implementing data structures from scratch and solving competitive programming problems.',
      default: 'Good approach! Keep practicing and understanding low-level concepts. C++ is a great language!',
    },
    'interviewprep': {
      start: '💼 Coding interviews can be challenging but you\'ve prepared! What topic would you like to practice? Data Structures, Algorithms, or System Design?',
      conversation: 'Great approach! For coding interviews, practice problem-solving daily, learn common patterns, and practice explaining your thought process.',
      followup: 'Excellent! Use platforms like LeetCode, HackerRank, and Codeforces. Also, practice whiteboard coding!',
      default: 'Good preparation! Keep practicing, stay calm during the interview, and remember to think out loud!',
    },
  };

  // Default responses
  const baseResponses = {
    'hello': 'Hello! Great to see you practicing. How are you feeling today?',
    'hi': 'Hi there! I\'m your social coach. What would you like to practice?',
    'help': 'I can help you practice: 💼 Career, 🎓 Study (10th/12th), 💻 Coding (College), ❤️ Dating, 🤝 Friends, 🧠 Mental Health, 🎤 Speaking, and more! Choose a scenario above.',
    'thank': 'You\'re welcome! Keep practicing and you\'ll get better every day.',
    'bye': 'Goodbye! Remember, practice makes perfect. Come back anytime to practice more!',
    'sing': '🎵 Great! Let\'s practice singing! What would you like to sing?',
    'song': '🎵 Nice! What song would you like to sing? Pick something you love!',
    'voice': '🎤 Your voice is your instrument! Let\'s practice some vocal exercises.',
    'study': '🎓 Great! I can help you with Math, Science, English, History, Exam Prep, or Study Motivation. What would you like to practice?',
    'math': '📐 Let\'s practice math! What topic are you studying?',
    'coding': '💻 Awesome! I can help you with Python, JavaScript, Web Development, React, Java, C++, or Coding Interviews. What would you like to practice?',
    'python': '🐍 Python is a great language! Let\'s practice together. What topic would you like to cover?',
    'exam': '📚 Exam prep can be stressful. Let\'s work on it together! What subject are you preparing for?',
  };

  const getCoachResponse = (userMessage) => {
    const lower = userMessage.toLowerCase();
    
    for (const [key, value] of Object.entries(baseResponses)) {
      if (lower.includes(key)) return value;
    }

    if (currentScenario !== 'general' && scenarioResponses[currentScenario]) {
      const scenario = scenarioResponses[currentScenario];
      if (lower.includes('start') || lower.includes('begin') || lower.includes('first')) return scenario.start;
      if (lower.includes('next') || lower.includes('continue') || lower.includes('more')) return scenario.followup;
      if (lower.includes('conversation') || lower.includes('talk')) return scenario.conversation;
      return scenario.default;
    }
    
    return "That's interesting! Tell me more. Try saying 'help' to see what I can do! I offer: 🎓 Study (10th/12th), 💻 Coding (College), ❤️ Dating, 🤝 Friends, 🎤 Speaking, and more!";
  };

  const handleScenarioSelect = (scenarioId) => {
    setCurrentScenario(scenarioId);
    const scenario = scenarioResponses[scenarioId];
    if (scenario) {
      setMessages([{
        id: Date.now().toString(),
        speaker: 'Coach',
        message: scenario.start,
        timestamp: new Date(),
      }]);
      speakText(scenario.start);
    }
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200);
  };

  const handleSendMessage = () => {
    let cleanText = inputText;
    if (cleanText.includes('✏️ (Click Send)')) {
      cleanText = cleanText.replace(' ✏️ (Click Send)', '');
    }
    if (cleanText === '🎤 Listening... Speak now') {
      setInputText('');
      return;
    }
    if (!cleanText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      speaker: 'You',
      message: cleanText.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    const response = getCoachResponse(cleanText.trim());
    speakText(response);

    setTimeout(() => {
      const coachMessage = {
        id: (Date.now() + 1).toString(),
        speaker: 'Coach',
        message: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, coachMessage]);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }, 500);

    setInputText('');
  };

  const renderMessage = ({ item }) => {
    const isCoach = item.speaker === 'Coach';
    return (
      <View style={[
        styles.messageBubble,
        isCoach ? styles.coachBubble : styles.userBubble,
        { 
          backgroundColor: isCoach ? theme.bubbleCoach : theme.bubbleUser,
          shadowColor: theme.shadow,
        }
      ]}>
        <Text style={[styles.speakerName, { color: isCoach ? theme.textLight : 'rgba(255,255,255,0.8)' }]}>
          {item.speaker}
        </Text>
        <Text style={[styles.messageText, { color: isCoach ? theme.text : '#FFFFFF' }]}>
          {item.message}
        </Text>
        <Text style={[styles.timestamp, { color: isCoach ? theme.textLight : 'rgba(255,255,255,0.6)' }]}>
          {item.timestamp ? item.timestamp.toLocaleTimeString() : ''}
        </Text>
      </View>
    );
  };

  const getAllScenarios = () => {
    const all = [];
    Object.values(scenarios).forEach(category => {
      category.options.forEach(option => {
        all.push({ ...option, category: category.id, categoryLabel: category.label });
      });
    });
    return all;
  };

  const allScenarios = getAllScenarios();
  const filteredScenarios = category === 'all' ? allScenarios : allScenarios.filter(s => s.category === category);

  // Theme Modal
  const ThemeModal = () => (
    <Modal
      visible={showThemeModal}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setShowThemeModal(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>🎨 Choose Theme</Text>
            <TouchableOpacity onPress={() => setShowThemeModal(false)}>
              <Text style={[styles.modalClose, { color: theme.textLight }]}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.themeGrid}>
            {THEME_OPTIONS.map(option => {
              const themeColor = THEMES[option.id].primary;
              const isActive = currentThemeId === option.id;
              return (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.themeOption,
                    { backgroundColor: themeColor },
                    isActive && styles.themeOptionActive,
                  ]}
                  onPress={() => {
                    setCurrentThemeId(option.id);
                    setShowThemeModal(false);
                  }}
                >
                  <Text style={styles.themeEmoji}>{option.emoji}</Text>
                  <Text style={styles.themeName}>{option.name}</Text>
                  {isActive && (
                    <View style={styles.themeCheckmark}>
                      <Text style={styles.themeCheckmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={currentThemeId === 'dark' ? 'light-content' : 'dark-content'} />

      {/* Header with Theme Switcher */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}>
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>🎯 Social Coach</Text>
            <Text style={styles.headerSubtitle}>Practice • Learn • Grow</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.themeSwitcher}
              onPress={() => setShowThemeModal(true)}
            >
              <Text style={styles.themeSwitcherEmoji}>{theme.emoji}</Text>
              <Text style={styles.themeSwitcherText}>Theme</Text>
            </TouchableOpacity>
            <View style={styles.headerBadge}>
              <Text style={styles.headerBadgeText}>✨ AI</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Category Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.categoryContainer, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={[styles.categoryButton, category === 'all' && styles.categoryButtonActive, { borderColor: theme.primary }]}
          onPress={() => setCategory('all')}
        >
          <Text style={[styles.categoryButtonText, category === 'all' && { color: '#FFFFFF' }]}>🌟 All</Text>
        </TouchableOpacity>
        {Object.values(scenarios).map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryButton, category === cat.id && styles.categoryButtonActive, { borderColor: theme.primary }]}
            onPress={() => setCategory(cat.id)}
          >
            <Text style={[styles.categoryButtonText, category === cat.id && { color: '#FFFFFF' }]}>
              {cat.emoji} {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scenario Buttons */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={[styles.scenarioContainer, { backgroundColor: theme.card }]}>
        {filteredScenarios.map(scenario => (
          <TouchableOpacity
            key={scenario.id}
            style={[
              styles.scenarioButton,
              currentScenario === scenario.id && styles.scenarioButtonActive,
              { 
                borderColor: theme.primary,
                backgroundColor: currentScenario === scenario.id ? theme.primary : '#FFFFFF',
              }
            ]}
            onPress={() => handleScenarioSelect(scenario.id)}
          >
            <Text style={[
              styles.scenarioButtonText,
              currentScenario === scenario.id && styles.scenarioButtonTextActive,
              { color: currentScenario === scenario.id ? '#FFFFFF' : theme.text }
            ]}>
              {scenario.emoji} {scenario.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scenario Indicator */}
      {currentScenario !== 'general' && (
        <View style={[styles.scenarioIndicator, { backgroundColor: theme.bubbleCoach }]}>
          <Text style={[styles.scenarioIndicatorText, { color: theme.primary }]}>
            🎯 Practicing: {scenarioResponses[currentScenario]?.start?.split('.')[0] || currentScenario}
          </Text>
        </View>
      )}

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={[styles.inputContainer, { backgroundColor: theme.card, borderTopColor: theme.background }]}>
          <TextInput
            style={[styles.input, { backgroundColor: theme.background, color: theme.text }]}
            placeholder={isListeningVoice ? '🎤 Listening...' : 'Type or speak...'}
            placeholderTextColor={theme.textLight}
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleSendMessage}
            editable={!isListeningVoice}
          />
          
          <TouchableOpacity
            style={[styles.micButton, isListeningVoice && styles.micButtonActive, { backgroundColor: isListeningVoice ? '#FF6B6B' : theme.primary }]}
            onPress={startVoiceInput}
          >
            <Text style={styles.micButtonText}>{isListeningVoice ? '⏹' : '🎤'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: theme.primary }]}
            onPress={handleSendMessage}
            disabled={isListeningVoice}
          >
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Theme Modal */}
      <ThemeModal />
    </SafeAreaView>
  );
}

// ============================================================
// 🎨 STYLES
// ============================================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    fontWeight: '400',
    marginTop: 2,
  },
  themeSwitcher: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  themeSwitcherEmoji: {
    fontSize: 14,
    marginRight: 4,
  },
  themeSwitcherText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  headerBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    maxHeight: 55,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
    borderWidth: 1,
  },
  categoryButtonActive: {
    backgroundColor: '#6C63FF',
  },
  categoryButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  scenarioContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    maxHeight: 55,
  },
  scenarioButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scenarioButtonActive: {
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  scenarioButtonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  scenarioButtonTextActive: {
    color: '#FFFFFF',
  },
  scenarioIndicator: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  scenarioIndicatorText: {
    fontSize: 13,
    fontWeight: '600',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  messageBubble: {
    maxWidth: '85%',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  coachBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  speakerName: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 9,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 30 : 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 24,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 15,
    minHeight: 44,
  },
  micButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 24,
    marginRight: 8,
  },
  micButtonActive: {
    backgroundColor: '#FF6B6B',
  },
  micButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 24,
    minWidth: 48,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    maxHeight: height * 0.7,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  modalClose: {
    fontSize: 24,
    fontWeight: '600',
  },
  themeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  themeOption: {
    width: (width - 60) / 3,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themeOptionActive: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  themeEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  themeName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  themeCheckmark: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  themeCheckmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});