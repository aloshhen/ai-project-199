import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { TrendingUp, Target, BarChart3, BookOpen, Users, Award, Star, Send, CheckCircle, MessageSquare, X, Bot, ChevronRight, Menu, Mail } from 'lucide-react'

// Web3Forms Handler Hook
const useFormHandler = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const handleSubmit = async (e, accessKey) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);
    
    const formData = new FormData(e.target);
    formData.append('access_key', accessKey);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        e.target.reset();
      } else {
        setIsError(true);
        setErrorMessage(data.message || 'Что-то пошло не так');
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage('Ошибка сети. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage('');
  };
  
  return { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm };
};

// Newsletter Form Component
const NewsletterForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler();
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Замените на ваш ключ с https://web3forms.com

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="newsletter-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              name="email"
              placeholder="Ваш email"
              required
              className="flex-1 px-6 py-4 bg-white/5 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Подписаться
                </>
              )}
            </button>
            {isError && (
              <p className="text-red-500 text-sm w-full">{errorMessage}</p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="newsletter-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-4"
          >
            <div className="flex items-center justify-center gap-3 text-green-500">
              <CheckCircle className="w-6 h-6" />
              <p className="text-lg font-semibold">Вы успешно подписались!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Contact Form Component
const ContactForm = () => {
  const { isSubmitting, isSuccess, isError, errorMessage, handleSubmit, resetForm } = useFormHandler();
  const ACCESS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY'; // Замените на ваш ключ с https://web3forms.com

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.form
            key="contact-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={(e) => handleSubmit(e, ACCESS_KEY)}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                name="name"
                placeholder="Ваше имя"
                required
                className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <input
                type="email"
                name="email"
                placeholder="Ваш email"
                required
                className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Телефон"
                className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div>
              <textarea
                name="message"
                placeholder="Ваше сообщение"
                rows="4"
                required
                className="w-full px-4 py-3 bg-white/5 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors resize-none"
              ></textarea>
            </div>
            
            {isError && (
              <div className="text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Отправка...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Отправить сообщение
                </>
              )}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="contact-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4, type: "spring" }}
            className="text-center py-12"
          >
            <div className="bg-green-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Сообщение отправлено!
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Спасибо за обращение. Мы свяжемся с вами в ближайшее время.
            </p>
            <button
              onClick={resetForm}
              className="text-red-500 hover:text-red-400 font-semibold transition-colors"
            >
              Отправить еще одно сообщение
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Chat Widget Component
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: 'Здравствуйте! Чем могу помочь?', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');

  const FAQ_DATA = [
    {
      question: 'Сколько стоят курсы?',
      answer: 'Стоимость курсов варьируется от 15,000₽ до 50,000₽ в зависимости от уровня. Базовый курс - 15,000₽, Продвинутый - 30,000₽, Профессиональный - 50,000₽.',
      keywords: ['стоимость', 'цена', 'сколько', 'стоят', 'курс']
    },
    {
      question: 'Как долго длится обучение?',
      answer: 'Базовый курс - 4 недели, Продвинутый - 8 недель, Профессиональный - 12 недель. Доступ к материалам остается навсегда.',
      keywords: ['длительность', 'сколько времени', 'долго', 'недель', 'месяцев']
    },
    {
      question: 'Нужен ли опыт?',
      answer: 'Нет, наш базовый курс рассчитан на полных новичков. Мы начинаем с основ и постепенно переходим к продвинутым стратегиям.',
      keywords: ['опыт', 'новичок', 'начинающий', 'с нуля', 'без опыта']
    },
    {
      question: 'Есть ли поддержка?',
      answer: 'Да! Вы получаете доступ к закрытому чату с преподавателями и другими студентами. Также проводятся еженедельные вебинары с разбором вопросов.',
      keywords: ['поддержка', 'помощь', 'вопросы', 'чат', 'консультация']
    }
  ];

  const SITE_CONTEXT = 'Сайт курсов по трейдингу. Предлагаем обучение трейдингу с нуля до профессионала. Есть три уровня курсов: Базовый, Продвинутый и Профессиональный.';

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);

    // Check FAQ
    const lowerInput = input.toLowerCase();
    const matchedFAQ = FAQ_DATA.find(faq => 
      faq.keywords.some(keyword => lowerInput.includes(keyword))
    );

    setTimeout(() => {
      if (matchedFAQ) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: matchedFAQ.answer,
          sender: 'bot'
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          text: 'Спасибо за вопрос! Наш менеджер свяжется с вами в ближайшее время. А пока посмотрите наши курсы или оставьте заявку.',
          sender: 'bot'
        }]);
      }
    }, 500);

    setInput('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-80 sm:w-96 bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-red-600 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Консультант</h3>
                  <p className="text-xs text-red-100">Онлайн</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-96 overflow-y-auto p-6 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-red-600 text-white'
                        : 'bg-white/10 text-gray-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                />
                <button
                  onClick={handleSend}
                  className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg shadow-red-600/50 transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </div>
  );
};

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const coursesRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  
  const coursesInView = useInView(coursesRef, { once: true, margin: "-100px" });
  const testimonialsInView = useInView(testimonialsRef, { once: true, margin: "-100px" });
  const contactInView = useInView(contactRef, { once: true, margin: "-100px" });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const courses = [
    {
      title: 'Базовый курс',
      price: '15,000₽',
      duration: '4 недели',
      description: 'Идеально для новичков. Изучите основы трейдинга, технический анализ и управление рисками.',
      features: ['Основы трейдинга', 'Технический анализ', 'Управление рисками', 'Торговые платформы', 'Психология трейдинга'],
      icon: BookOpen,
      color: 'from-red-600/20 to-red-900/20'
    },
    {
      title: 'Продвинутый курс',
      price: '30,000₽',
      duration: '8 недель',
      description: 'Для тех, кто хочет углубить знания. Продвинутые стратегии и работа с реальными сделками.',
      features: ['Продвинутые стратегии', 'Работа с индикаторами', 'Фундаментальный анализ', 'Практика на реальном счете', 'Личный наставник'],
      icon: Target,
      color: 'from-red-500/20 to-red-800/20',
      popular: true
    },
    {
      title: 'Профессиональный',
      price: '50,000₽',
      duration: '12 недель',
      description: 'Станьте профессиональным трейдером. Алгоритмическая торговля и управление портфелем.',
      features: ['Алгоритмическая торговля', 'Управление портфелем', 'Работа с большими объемами', 'VIP поддержка', 'Сертификат'],
      icon: Award,
      color: 'from-red-700/20 to-red-950/20'
    }
  ];

  const testimonials = [
    {
      name: 'Алексей Петров',
      role: 'Трейдер',
      text: 'Прошел базовый курс и уже через месяц начал стабильно зарабатывать. Преподаватели объясняют сложные вещи простым языком.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    {
      name: 'Мария Соколова',
      role: 'Начинающий трейдер',
      text: 'Очень довольна продвинутым курсом! Получила не только знания, но и уверенность в своих силах. Поддержка преподавателей на высоте.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
    },
    {
      name: 'Дмитрий Волков',
      role: 'Профессиональный трейдер',
      text: 'Профессиональный курс превзошел все ожидания. Алгоритмическая торговля открыла новые горизонты. Рекомендую всем серьезным трейдерам!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-darker-gray via-dark-gray to-black text-white overflow-x-hidden">
      {/* HEADER */}
      <header className="fixed top-0 w-full bg-black/80 backdrop-blur-xl z-50 border-b border-red-900/30 noise-texture">
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between max-w-full">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <span className="text-xl sm:text-2xl font-black text-white tracking-tight">TRADING<span className="text-red-500">PRO</span></span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('courses')} className="text-gray-300 hover:text-red-500 transition-colors font-semibold">Курсы</button>
            <button onClick={() => scrollToSection('testimonials')} className="text-gray-300 hover:text-red-500 transition-colors font-semibold">Отзывы</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-300 hover:text-red-500 transition-colors font-semibold">Контакты</button>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => scrollToSection('courses')}
              className="hidden sm:block bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded-lg font-bold transition-all transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
            >
              Записаться
            </button>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white p-2"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-black/95 border-t border-red-900/30 overflow-hidden"
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                <button onClick={() => scrollToSection('courses')} className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-semibold py-2">Курсы</button>
                <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-semibold py-2">Отзывы</button>
                <button onClick={() => scrollToSection('contact')} className="block w-full text-left text-gray-300 hover:text-red-500 transition-colors font-semibold py-2">Контакты</button>
                <button onClick={() => scrollToSection('courses')} className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-bold transition-colors">
                  Записаться
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 noise-texture overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-transparent pointer-events-none"></div>
        <div className="container mx-auto text-center relative z-10 max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-red-600/20 border border-red-500/30 px-4 sm:px-6 py-2 rounded-full mb-6 sm:mb-8">
              <span className="text-red-400 font-bold text-sm sm:text-base">🔥 Старт новых групп через 3 дня</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-4 sm:mb-6 tracking-tighter leading-tight px-2">
              СТАНЬТЕ<br />
              <span className="text-red-500">ПРОФЕССИОНАЛЬНЫМ</span><br />
              ТРЕЙДЕРОМ
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 font-bold max-w-3xl mx-auto px-4">
              Обучение трейдингу с нуля до профессионала
            </p>
            <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
              Научитесь зарабатывать на финансовых рынках с помощью проверенных стратегий и профессиональных наставников
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <button 
                onClick={() => scrollToSection('courses')}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-red-600/50 min-h-[44px]"
              >
                Выбрать курс
                <ChevronRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-6 sm:px-8 py-4 rounded-lg text-base sm:text-lg font-bold transition-all backdrop-blur-sm border border-white/20 min-h-[44px]"
              >
                Бесплатная консультация
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-b from-red-950/10 to-transparent noise-texture">
        <div className="container mx-auto max-w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { number: '500+', label: 'Выпускников' },
              { number: '95%', label: 'Успешных трейдеров' },
              { number: '12', label: 'Лет опыта' },
              { number: '24/7', label: 'Поддержка' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 sm:p-6 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-red-900/30"
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-red-500 mb-2">{stat.number}</div>
                <div className="text-sm sm:text-base text-gray-400 font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section id="courses" ref={coursesRef} className="py-16 sm:py-20 px-4 sm:px-6 noise-texture">
        <div className="container mx-auto max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={coursesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight px-2">
              НАШИ <span className="text-red-500">КУРСЫ</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Выберите программу обучения, которая подходит именно вам
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {courses.map((course, index) => {
              const Icon = course.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={coursesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  {course.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold z-10">
                      Популярный
                    </div>
                  )}
                  <div className={`h-full bg-gradient-to-br ${course.color} p-6 sm:p-8 rounded-2xl border ${course.popular ? 'border-red-500' : 'border-red-900/30'} hover:border-red-500 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-red-600/20`}>
                    <div className="bg-red-600/20 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-red-500" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-3">{course.title}</h3>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl sm:text-4xl font-black text-red-500">{course.price}</span>
                    </div>
                    <p className="text-gray-400 mb-4 text-sm sm:text-base">{course.duration}</p>
                    <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">{course.description}</p>
                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300 text-sm sm:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-4 rounded-lg font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 min-h-[44px]">
                      Записаться на курс
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" ref={testimonialsRef} className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-red-950/10 to-transparent noise-texture">
        <div className="container mx-auto max-w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight px-2">
              ОТЗЫВЫ <span className="text-red-500">УЧЕНИКОВ</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Узнайте, что говорят наши выпускники о курсах
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 rounded-2xl border border-red-900/30 hover:border-red-500 transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-red-500"
                  />
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-red-500 fill-red-500" />
                  ))}
                </div>
                <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 noise-texture">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-br from-red-600 to-red-800 p-8 sm:p-12 rounded-2xl text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight">
              Подпишитесь на рассылку
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Получайте эксклюзивные материалы, торговые сигналы и новости рынка
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef} className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-red-950/10 to-transparent noise-texture telegram-safe-bottom">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 sm:mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tight px-2">
              СВЯЖИТЕСЬ <span className="text-red-500">С НАМИ</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Остались вопросы? Заполните форму, и мы свяжемся с вами в ближайшее время
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={contactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900 to-black p-6 sm:p-8 md:p-12 rounded-2xl border border-red-900/30"
          >
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-red-900/30 py-8 sm:py-12 px-4 sm:px-6 noise-texture">
        <div className="container mx-auto max-w-full">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-black text-white">TRADING<span className="text-red-500">PRO</span></span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400">
              <button onClick={() => scrollToSection('courses')} className="hover:text-red-500 transition-colors">Курсы</button>
              <button onClick={() => scrollToSection('testimonials')} className="hover:text-red-500 transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('contact')} className="hover:text-red-500 transition-colors">Контакты</button>
            </div>
          </div>
          <div className="text-center text-gray-500 text-xs sm:text-sm mt-8">
            © 2024 TradingPro. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}

export default App