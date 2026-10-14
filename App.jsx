import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, User, Sparkles, Send, RefreshCw, BookOpen, GraduationCap, 
  Settings, Award, CheckCircle2, AlertCircle, Play, ChevronRight, 
  BarChart3, FileText, Lightbulb, Zap, HelpCircle, Layers, Cpu, 
  Wrench, Code2, Download, Copy, Check, MessageSquare, ArrowRight,
  TrendingUp, Users, Clock, ShieldCheck, Sliders, Plus, Trash2,
  ExternalLink, Activity, Terminal, Upload, UploadCloud, Paperclip,
  FileCode, X, File, DownloadCloud, ArrowLeft, Edit3, Video, Eye, Film,
  ZoomIn, ZoomOut, FileSpreadsheet, Image as ImageIcon, PlayCircle,
  FileCheck, SendHorizontal, CheckCircle, MessageCircle, Star, ThumbsUp, ThumbsDown,
  Presentation, MonitorPlay, Tv, Share2, Maximize2, Box
} from 'lucide-react';

const DISCIPLINES = [
  {
    id: 'robotics',
    title: 'Робототехника және мехатроника',
    icon: Cpu,
    color: 'from-amber-500 to-orange-600',
    modules: [
      'Сервомониторлар мен сервожетектерді баптау',
      'Өнеркәсіптік роботтардың сенсорлық жүйелері',
      'Контроллердегі кері байланыс интерфейстері',
      'Пневматикалық және гидравликалық атқарушы механизмдер'
    ]
  },
  {
    id: 'electro',
    title: 'Электротехника және микроконтроллерлер',
    icon: Zap,
    color: 'from-blue-500 to-indigo-600',
    modules: [
      'Arduino/ESP32 микроконтроллерлерін бағдарламалау',
      'Аналогтық және цифрлық датчиктерді қосу',
      'Тізбектегі кернеудің төмендеуі мен қысқа тұйықталу',
      'Мотор-драйверлерді баптау'
    ]
  },
  {
    id: 'prog',
    title: 'Бағдарламалау негіздері',
    icon: Code2,
    color: 'from-emerald-500 to-teal-600',
    modules: [
      'Python: Алгоритмдер мен функциялар',
      'Деректер базасы және SQL сұраныстар',
      'ООП концепциялары мен объектілер',
      'REST API интеграциясы мен қателерді өңдеу'
    ]
  }
];

const INITIAL_TASKS = [
  {
    id: 'task-full-1',
    disciplineId: 'robotics',
    groupName: 'РМ-21 топ',
    title: '№1 Кешенді Тапсырма: Сервожетектер мен Өнеркәсіптік Манипуляторлар',
    description: 'Осы кешенді сабақта Дәрістік презентация (.pptx), Зертханалық нұсқаулық құжаты (.pdf) және Бейнесабақ (.mp4) толық қамтылған.',
    createdAt: '29.09.2026',
    author: 'Оқытушы: Ахметов А.Б.',
    pptFileName: 'Robotics_Servos_Lecture1.pptx',
    pptFileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    slidesCount: 2,
    slides: [
      {
        slideNum: 1,
        title: '1-слайд: Кіріспе — Робототехникадағы Сервожетектер',
        content: '• Сервожетек дегеніміз не?\n• Атқарушы механизмдер классификациясы (Электрлік, Пневматикалық, Гидравликалық).\n• Робот манипуляторындағы бұрыштық позициялау.',
        imagePlaceholder: '🤖 Сервомотор және редуктор құрылысының 3D анимациясы'
      },
      {
        slideNum: 2,
        title: '2-слайд: Құрылысы және Жұмыс Принципі',
        content: '1. ДПТ (Тұрақты ток қозғалтқышы)\n2. Редуктор шестернялары\n3. Потенциометр (Кері байланыс датчигі)\n4. Басқару платасы (ПИД-контроллер).',
        imagePlaceholder: '📐 Сервожетек құрылымдық блоктық схемасы'
      }
    ],
    docFileName: 'Lab_01_PID_Robotics_Guide.pdf',
    docFileType: 'pdf',
    docFileSize: '2.4 MB',
    docFileUrl: '',
    docPreview: `[ЗЕРТХАНАЛЫҚ НҰСҚАУЛЫҚ ҚҰЖАТЫ: Lab_01_PID_Robotics_Guide.pdf]\n\n1. ЖҰМЫСТЫҢ МAҚСАТЫ:\n• NI Multisim және Tinkercad ортасында схеманы модельдеу.\n• ПИД-коэффициенттерін таңдау арқылы позициялау қателігін азайту.`,
    videoTitle: 'Сервожетек баптау бейнесабағы.mp4',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4'
  }
];

const INITIAL_VIDEOS = [
  {
    id: 'vid-1',
    disciplineId: 'robotics',
    groupName: 'РМ-21 топ',
    title: 'NI Multisim & Tinkercad: Схема құрастыру және модельдеу',
    description: 'Осы оқу видеосында Multisim және Tinkercad ортасында схемаларды басынан аяғына дейін жинау процесі көрсетіледі.',
    videoUrl: 'https://vjs.zencdn.net/v/oceans.mp4',
    createdAt: '29.09.2026',
    author: 'Оқытушы: Ахметов А.Б.'
  }
];

const INITIAL_SUBMISSIONS = [
  {
    id: 'sub-1',
    taskId: 'task-full-1',
    studentName: 'Ерланов Нұрсұлтан (РМ-21)',
    fileName: 'Lecture1_Erlanov_Notes.pptx',
    fileType: 'pptx',
    fileSize: '3.1 MB',
    fileUrl: '',
    comment: 'Оқытушы жүктеген презентация, документ және видеоны зерттеп, тапсырманы орындадым.',
    submittedAt: '29.09.2026 14:30',
    status: 'submitted',
    score: null,
    teacherFeedback: '',
    aiAnalysis: {
      pros: [
        `«Lecture1_Erlanov_Notes.pptx» презентациясында ШИМ сигналдары мен ПИД реттегішінің жұмыс принципі дұрыс баяндалған.`
      ],
      cons: [
        `Минустары мен қателері жоқ! Тапсырма мүлтіксіз орындалды.`
      ],
      grammar: 'Орфографиялық және грамматикалық қателер табылмады.',
      calcErrors: 'Есептеулерде қателер жоқ.',
      recommendedScore: 100,
      pedagogicalNote: 'Жұмыс өте ұқыпты әрі сапалы орындалған.'
    },
    contentPreview: `[С Т У Д Е Н Т Т І Ң   О Р Ы Н Д А Ғ А Н   Ф А Й Л Ы]\nФайл: Lecture1_Erlanov_Notes.pptx`
  }
];

export default function App() {
  const [role, setRole] = useState('teacher'); // 'student' | 'teacher'
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks', 'multisim', 'chat', 'prompt'
  const [selectedDiscipline, setSelectedDiscipline] = useState(DISCIPLINES[0]);
  const [selectedModule, setSelectedModule] = useState(DISCIPLINES[0].modules[0]);

  // Tasks & Submissions
  const [tasksList, setTasksList] = useState(INITIAL_TASKS);
  const [selectedTask, setSelectedTask] = useState(INITIAL_TASKS[0]);
  const [submissionsList, setSubmissionsList] = useState(INITIAL_SUBMISSIONS);
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Presentation Slide Switcher
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);

  // Video Viewer Modal state
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Teacher Video Hub Add Modal
  const [isAddingVideo, setIsAddingVideo] = useState(false);
  const [newVideoTitle, setNewVideoTitle] = useState('');
  const [newVideoDesc, setNewVideoDesc] = useState('');
  const [newVideoFileObj, setNewVideoFileObj] = useState(null);
  const [newVideoUrlVal, setNewVideoUrlVal] = useState('');

  // Inspection Modal for Teacher
  const [inspectingSub, setInspectingSub] = useState(null);
  const [teacherScoreInput, setTeacherScoreInput] = useState('100');
  const [teacherFeedbackText, setTeacherFeedbackText] = useState('');

  // Teacher Task Creation Form
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskGroupName, setTaskGroupName] = useState('РМ-21 топ');

  // Attachments
  const [taskPptFile, setTaskPptFile] = useState(null);
  const [taskPptUrl, setTaskPptUrl] = useState('');
  const [taskDocFile, setTaskDocFile] = useState(null);
  const [taskDocUrl, setTaskDocUrl] = useState('');
  const [taskVideoFile, setTaskVideoFile] = useState(null);
  const [taskVideoUrl, setTaskVideoUrl] = useState('');

  // Student Homework Upload
  const [studentFile, setStudentFile] = useState(null);
  const [studentFileUrl, setStudentFileUrl] = useState('');
  const [studentComment, setStudentComment] = useState('');
  const [isSubmittingHW, setIsSubmittingHW] = useState(false);

  // Standalone Videos list
  const [videosList, setVideosList] = useState(INITIAL_VIDEOS);

  // Chat
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Сәлеметсіз бе! Мен «AI Ұстаз Lab» цифрлық менторымын. Оқытушы салған Презентацияларды (.pptx), Документтерді (.pdf, .docx) немесе Видеоларды (.mp4) талдау үшін сұрақ қойыңыз!',
      timestamp: '10:00'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);

  // System Prompt
  const [systemPrompt, setSystemPrompt] = useState(
    `Сіз — колледж студенттеріне арналған «AI Ұстаз Lab» цифрлық менторысыз.`
  );

  const pptFileInputRef = useRef(null);
  const docFileInputRef = useRef(null);
  const videoFileInputRef = useRef(null);
  const studentFileInputRef = useRef(null);
  const hubVideoFileInputRef = useRef(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setSelectedModule(selectedDiscipline.modules[0]);
  }, [selectedDiscipline]);

  useEffect(() => {
    setCurrentSlideIdx(0);
  }, [selectedTask]);

  const currentDiscTasks = tasksList.filter(t => t.disciplineId === selectedDiscipline.id || !t.disciplineId);
  const currentTaskSubmissions = submissionsList.filter(s => s.taskId === selectedTask?.id);
  const mySubmission = submissionsList.find(s => s.taskId === selectedTask?.id);

  const handlePptUpload = (e) => {
    if (role !== 'teacher') return;
    const file = e.target.files[0];
    if (file) {
      setTaskPptFile(file);
      setTaskPptUrl(URL.createObjectURL(file));
      if (!taskTitle) setTaskTitle(file.name);
    }
  };

  const handleDocUpload = (e) => {
    if (role !== 'teacher') return;
    const file = e.target.files[0];
    if (file) {
      setTaskDocFile(file);
      setTaskDocUrl(URL.createObjectURL(file));
      if (!taskTitle) setTaskTitle(file.name);
    }
  };

  const handleVideoUpload = (e) => {
    if (role !== 'teacher') return;
    const file = e.target.files[0];
    if (file) {
      setTaskVideoFile(file);
      setTaskVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleHubVideoFileSelect = (e) => {
    if (role !== 'teacher') return;
    const file = e.target.files[0];
    if (file) {
      setNewVideoFileObj(file);
      setNewVideoUrlVal(URL.createObjectURL(file));
      if (!newVideoTitle) setNewVideoTitle(file.name);
    }
  };

  const handleSaveHubVideo = (e) => {
    e.preventDefault();
    if (role !== 'teacher') return;
    if (!newVideoTitle.trim()) return;

    const newVid = {
      id: 'vid-' + Date.now(),
      disciplineId: selectedDiscipline.id,
      groupName: 'РМ-21 топ',
      title: newVideoTitle,
      description: newVideoDesc || 'Оқытушы жүктеген жаңа оқу видеосабағы.',
      videoUrl: newVideoUrlVal || 'https://vjs.zencdn.net/v/oceans.mp4',
      createdAt: new Date().toLocaleDateString('kk-KZ'),
      author: 'Оқытушы (Админ)'
    };

    setVideosList(prev => [newVid, ...prev]);
    setNewVideoTitle('');
    setNewVideoDesc('');
    setNewVideoFileObj(null);
    setNewVideoUrlVal('');
    setIsAddingVideo(false);
  };

  const handleDeleteHubVideo = (vidId) => {
    if (role !== 'teacher') return;
    setVideosList(prev => prev.filter(v => v.id !== vidId));
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (role !== 'teacher') return;
    if (!taskTitle.trim()) return;

    const hasPpt = Boolean(taskPptFile);
    const hasDoc = Boolean(taskDocFile);
    const hasVideo = Boolean(taskVideoFile || taskVideoUrl);
    const docExt = taskDocFile ? taskDocFile.name.split('.').pop().toLowerCase() : 'pdf';

    const newTask = {
      id: 'task-' + Date.now(),
      disciplineId: selectedDiscipline.id,
      groupName: taskGroupName || 'Жалпы топ',
      title: taskTitle,
      description: taskDesc || 'Оқытушы дайындаған дәрістік презентация, зертханалық тапсырма құжаты және видеосабақ.',
      createdAt: new Date().toLocaleDateString('kk-KZ'),
      author: 'Оқытушы (Админ)',
      pptFileName: taskPptFile ? taskPptFile.name : (hasPpt ? 'Presentation.pptx' : 'Презентация_Сабақ1.pptx'),
      pptFileUrl: taskPptUrl,
      slidesCount: 3,
      slides: [
        {
          slideNum: 1,
          title: `1-слайд: Кіріспе — ${taskTitle}`,
          content: `• Тақырып: ${taskTitle}\n• Топ: ${taskGroupName}\n• Оқу мақсаты: Дәріс материалдарын зерттеп, зертханалық тапсырманы орындау.`,
          imagePlaceholder: '📊 Дәріс презентациясының басты слайды'
        },
        {
          slideNum: 2,
          title: '2-слайд: Теориялық Негіздер',
          content: '• Негізгі формулалар мен параметрлер.\n• Функционалды блоктық схемалар.',
          imagePlaceholder: '📐 Схемалық құрылымдар'
        },
        {
          slideNum: 3,
          title: '3-слайд: Қорытынды Тапсырма',
          content: '• Tөмендегі тапсырма құжатын орындап, платформаға жүктеңіз.',
          imagePlaceholder: '📝 Бақылау тапсырмалары'
        }
      ],
      docFileName: taskDocFile ? taskDocFile.name : (hasDoc ? 'Lab_Task.pdf' : null),
      docFileType: docExt,
      docFileSize: taskDocFile ? (taskDocFile.size / (1024 * 1024)).toFixed(1) + ' MB' : '2.1 MB',
      docFileUrl: taskDocUrl,
      docPreview: `[ТАПСЫРМА ҚҰЖАТЫ: ${taskDocFile ? taskDocFile.name : 'Lab_Task.pdf'}]\nОқытушы бекіткен тапсырма.`,
      videoTitle: taskVideoFile ? taskVideoFile.name : (hasVideo ? 'Тіркелген_Бейнесабақ.mp4' : null),
      videoUrl: taskVideoUrl
    };

    setTasksList(prev => [newTask, ...prev]);
    setSelectedTask(newTask);

    setTaskTitle('');
    setTaskDesc('');
    setTaskPptFile(null);
    setTaskPptUrl('');
    setTaskDocFile(null);
    setTaskDocUrl('');
    setTaskVideoFile(null);
    setTaskVideoUrl('');
    setIsAddingTask(false);
  };

  const handleDeleteTask = (id) => {
    if (role !== 'teacher') return;
    setTasksList(prev => prev.filter(t => t.id !== id));
    if (selectedTask?.id === id) {
      setSelectedTask(null);
    }
  };

  const handleStudentFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setStudentFile(file);
      setStudentFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmitStudentHW = (e) => {
    e.preventDefault();
    if (!studentFile) return;

    setIsSubmittingHW(true);

    setTimeout(() => {
      const ext = studentFile.name.split('.').pop().toLowerCase();
      const newSubmission = {
        id: 'sub-' + Date.now(),
        taskId: selectedTask.id,
        studentName: 'Студент (Сіз)',
        fileName: studentFile.name,
        fileType: ext || 'pptx',
        fileSize: (studentFile.size / (1024 * 1024)).toFixed(1) + ' MB',
        fileUrl: studentFileUrl,
        comment: studentComment || 'Тапсырма бойынша дайындалған жұмыс жүктелді.',
        submittedAt: new Date().toLocaleString('kk-KZ', { dateStyle: 'short', timeStyle: 'short' }),
        status: 'submitted',
        score: null,
        teacherFeedback: '',
        aiAnalysis: {
          pros: [
            `«${studentFile.name}» файлы сәтті жүктелді және пішімі талаптарға сай.`
          ],
          cons: [
            `Минустары табылмады.`
          ],
          grammar: 'Мәтінде орфографиялық қателер жоқ.',
          calcErrors: 'Есептер дұрыс.',
          recommendedScore: 100,
          pedagogicalNote: 'Жұмыс тексеруге дайын.'
        },
        contentPreview: `[С Т У Д Е Н Т Т І Ң   О Р Ы Н Д А Ғ А Н   Ф А Й Л Ы]\nФайл аты: ${studentFile.name}`
      };

      setSubmissionsList(prev => [newSubmission, ...prev.filter(s => s.taskId !== selectedTask.id)]);
      setIsSubmittingHW(false);
      setStudentFile(null);
      setStudentFileUrl('');
      setStudentComment('');
    }, 800);
  };

  const handleOpenInspectModal = (sub) => {
    setInspectingSub(sub);
    const existingScore = sub.score || (sub.aiAnalysis?.recommendedScore ? String(sub.aiAnalysis.recommendedScore) : '100');
    setTeacherScoreInput(existingScore);
    
    const existingFeedback = sub.teacherFeedback || (
      sub.aiAnalysis 
        ? `[AI Ұстаз Lab Сараптама нәтижесі]:\n\n👍 ПЛЮСТАРЫ:\n${sub.aiAnalysis.pros.map(p => '• ' + p).join('\n')}\n\n👎 МИНУСТАРЫ:\n${sub.aiAnalysis.cons.map(c => '• ' + c).join('\n')}\n\n✍️ ГРАММАТИКАСЫ: ${sub.aiAnalysis.grammar}\n\n🔢 ЕСЕПТЕГІ ҚАТЕЛЕР: ${sub.aiAnalysis.calcErrors}`
        : 'Презентация/жұмыс талаптарға сай орындалған.'
    );
    setTeacherFeedbackText(existingFeedback);
  };

  const handleAutoEvaluateWithAI = () => {
    if (!inspectingSub) return;
    setIsAiThinking(true);

    setTimeout(() => {
      const generatedAnalysis = {
        pros: [
          `«${inspectingSub.fileName}» файлы бойынша тапсырмалар мен слайдтар мазмұны жүйелі түрде әзірленген.`,
          `Схемалар мен техникалық анықтамалар оқу стандартына сай.`
        ],
        cons: [
          `Минустары мен қателері жоқ! Тапсырма барлық критерийлер бойынша мүлтіксіз әрі нақты орындалған.`
        ],
        grammar: 'Грамматикалық және орфографиялық қателер табылмады. Тілдік нормалар сақталған.',
        calcErrors: 'Есептеуде және формулаларда қателер табылмады. Барлық сандық мәндер нақты.',
        recommendedScore: 100,
        pedagogicalNote: 'Жұмыс кемшіліксіз, өте ұқыпты орындалған. Ең жоғары баға 100/100 ұсынылады.'
      };

      const updatedSub = {
        ...inspectingSub,
        aiAnalysis: generatedAnalysis
      };

      setInspectingSub(updatedSub);
      setTeacherScoreInput('100');
      setTeacherFeedbackText(
        `[AI Ұстаз Lab Сараптама нәтижесі]:\n\n👍 ПЛЮСТАРЫ:\n${generatedAnalysis.pros.map(p => '• ' + p).join('\n')}\n\n👎 МИНУСТАРЫ МЕН ЕСКЕРТУЛЕР:\n${generatedAnalysis.cons.map(c => '• ' + c).join('\n')}\n\n✍️ ГРАММАТИКАСЫ: ${generatedAnalysis.grammar}\n\n🔢 ЕСЕПТЕГІ ҚАТЕЛЕР: ${generatedAnalysis.calcErrors}\n\n📊 ҰСЫНЫЛАТЫН БАҒА: 100 / 100`
      );
      setIsAiThinking(false);
    }, 1000);
  };

  const handleSaveTeacherEvaluation = () => {
    if (!inspectingSub) return;

    setSubmissionsList(prev => prev.map(s => {
      if (s.id === inspectingSub.id) {
        return {
          ...s,
          status: 'evaluated',
          score: teacherScoreInput,
          teacherFeedback: teacherFeedbackText,
          aiAnalysis: inspectingSub.aiAnalysis
        };
      }
      return s;
    }));

    setInspectingSub(null);
  };

  const handleAnalyzeDocumentWithAI = (task, submission = null) => {
    setActiveTab('chat');
    const analyzePrompt = submission 
      ? `Сәлеметсіз бе! Мен «${task.title}» бойынша өзім әзірлеген «${submission.fileName}» файлымды жүктедім. Осы жұмысымды тексеріп, бағалап бересіз бе?`
      : `Сәлеметсіз бе! Мен «${task.title}» сабағын аштым. Осы презентация, тапсырма құжаты мен видео бойынша маған түсіндірме беріңізші!`;
    
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: analyzePrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setIsAiThinking(true);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: `Тамаша! «${task.title}» бойынша Презентация слайдтарын, Тапсырма құжатын және Бейнесабақты талдадым. Сұрағыңызды қойыңыз!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 1200);
  };

  const handleSendMessage = (customText = null) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setIsAiThinking(true);

    setTimeout(() => {
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: 'Өте жақсы! Тапсырылған презентациялар, документтер мен видеолар талданды. Сұрағыңызды қоя беріңіз.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-300">
                  AI Ұстаз Lab
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Цифрлық зертхана
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Презентация, Тапсырма Құжаты Және Видео Менеджеры
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg ${
                activeTab === 'tasks'
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 text-white ring-2 ring-indigo-400 shadow-indigo-500/30'
                  : 'bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-indigo-500/40'
              }`}
            >
              <Presentation className="w-4 h-4 text-amber-300" />
              <span>Презентация & Тапсырмалар</span>
            </button>

            <button
              onClick={() => setActiveTab('multisim')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === 'multisim'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white ring-2 ring-cyan-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40'
              }`}
            >
              <Video className="w-4 h-4 text-cyan-300" />
              <span>Оқу Видеолары</span>
            </button>
          </div>

          {/* Role Switcher */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-800 p-1 rounded-xl border border-slate-700 flex items-center">
              <button
                onClick={() => { setRole('student'); setIsAddingTask(false); setInspectingSub(null); setIsAddingVideo(false); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'student'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Студент</span>
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  role === 'teacher'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Оқытушы</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto w-full flex-1 p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Sidebar */}
        <aside className="lg:col-span-3 flex flex-col gap-4">
          <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selectedDiscipline.color} flex items-center justify-center text-white shadow-md`}>
                <selectedDiscipline.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-indigo-400 uppercase font-semibold tracking-wider block">Белсенді пән</span>
                <h3 className="text-sm font-bold text-white truncate">{selectedDiscipline.title}</h3>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-slate-400 font-medium">Оқу модулі / Тақырып:</label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg text-xs text-slate-200 p-2.5 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {selectedDiscipline.modules.map((m, idx) => (
                  <option key={idx} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-2 backdrop-blur-sm flex flex-col gap-1">
            <div className="px-3 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>{role === 'student' ? 'Студенттік Панель' : 'Оқытушы Панелі'}</span>
              <span className="text-[9px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
                {role === 'teacher' ? 'ВИДЕО & ТАПСЫРМА' : 'СТУДЕНТ'}
              </span>
            </div>

            <button
              onClick={() => setActiveTab('tasks')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'tasks' 
                  ? 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-lg shadow-indigo-600/30' 
                  : 'text-indigo-300 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Presentation className="w-4 h-4 text-amber-300" />
                <span>Презентация & Тапсырмалар</span>
              </div>
              <span className="text-[10px] bg-indigo-950 px-2 py-0.5 rounded text-indigo-200 font-mono font-bold">
                {currentDiscTasks.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('multisim')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'multisim' 
                  ? 'bg-cyan-600 text-white font-semibold shadow-lg shadow-cyan-600/30' 
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-cyan-300" />
                <span>Оқу Видеолары</span>
              </div>
              <span className="text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded font-mono font-bold">
                {videosList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === 'chat' 
                  ? 'bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-600/30' 
                  : 'text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>AI Ментор Чат</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>

            {role === 'teacher' && (
              <button
                onClick={() => setActiveTab('prompt')}
                className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-xs font-medium transition-all ${
                  activeTab === 'prompt' 
                    ? 'bg-indigo-600 text-white font-semibold shadow-lg' 
                    : 'text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>AI Баптаулары</span>
              </button>
            )}
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="lg:col-span-9 flex flex-col gap-4">

          {/* TASKS & PRESENTATIONS TAB */}
          {activeTab === 'tasks' && (
            <div className="space-y-6 animate-fade-in">
              
              <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 border border-indigo-500/40 rounded-2xl p-6 relative overflow-hidden shadow-2xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2 max-w-xl">
                    <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
                      <Presentation className="w-3.5 h-3.5 text-amber-400" />
                      Презентациялар, Құжаттар Және Видео Хабы
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      Презентация, Тапсырма Құжаты Және Оқу Видеосы
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Оқытушы әр сабаққа PPTX презентациясын, Тапсырма құжатын (.pdf / .docx) және Бейнесабақты (.mp4) жүктейді. Студенттер оларды ашып, жүктеп ала алады.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <a
                      href="https://www.multisim.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs transition-all shadow-xl flex items-center gap-1.5 group"
                    >
                      <Cpu className="w-3.5 h-3.5 text-cyan-100 group-hover:rotate-12 transition-transform" />
                      <span>Multisim Live</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <a
                      href="https://www.tinkercad.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold rounded-xl text-xs transition-all shadow-xl flex items-center gap-1.5 group"
                    >
                      <Box className="w-3.5 h-3.5 text-amber-100 group-hover:scale-110 transition-transform" />
                      <span>Tinkercad Live</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <a
                      href="https://electronicworkbenchewb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl text-xs transition-all shadow-xl flex items-center gap-1.5 group"
                    >
                      <Zap className="w-3.5 h-3.5 text-teal-100 group-hover:scale-110 transition-transform" />
                      <span>Electronic Workbench Live</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <a
                      href="https://www.siemens.com/ru-ru/products/tia-portal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs transition-all shadow-xl flex items-center gap-1.5 group"
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-200 group-hover:scale-110 transition-transform" />
                      <span>Tia-portal Live</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                </div>

                {/* Teacher Add Task Button - placed cleanly underneath the header banner */}
                {role === 'teacher' && (
                  <div className="pt-3 border-t border-indigo-500/30 flex justify-start">
                    <button
                      onClick={() => setIsAddingTask(!isAddingTask)}
                      className="px-5 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-slate-950 font-black rounded-xl text-xs transition-all shadow-xl flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>+ Сабақ Салу</span>
                    </button>
                  </div>
                )}
              </div>

              {/* TEACHER ADD TASK FORM */}
              {role === 'teacher' && isAddingTask && (
                <div className="bg-slate-800/95 border border-amber-500/50 rounded-2xl p-6 backdrop-blur-md space-y-4 shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2">
                      <Presentation className="w-5 h-5 text-amber-400" />
                      <h3 className="text-base font-bold text-white">
                        Жаңа Сабақ: Презентация, Документ Тапсырмасы ЖӘНЕ Видео Жіберу
                      </h3>
                    </div>
                    <button 
                      onClick={() => setIsAddingTask(false)}
                      className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveTask} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5 md:col-span-2">
                        <label className="text-xs font-bold text-slate-300">Сабақ / Тапсырма Атауы:</label>
                        <input
                          type="text"
                          required
                          placeholder="Мысалы: №1 Кешенді Тапсырма"
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-300">Топ аты:</label>
                        <input
                          type="text"
                          value={taskGroupName}
                          onChange={(e) => setTaskGroupName(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Сабақтың қысқаша сипаттамасы мен оқу мақсаты:</label>
                      <textarea
                        rows={2}
                        placeholder="Презентациядағы дәріс, документтегі зертханалық тапсырма және бейнесабақ бойынша түсініктеме жазыңыз..."
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />
                    </div>

                    {/* 3 UPLOAD FIELDS */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-700/80">
                      
                      {/* 1. Presentation Upload */}
                      <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-amber-500/30">
                        <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Presentation className="w-4 h-4 text-amber-400" />
                            <span>1. Дәріс Презентациясы (.pptx)</span>
                          </span>
                          {taskPptFile && (
                            <button
                              type="button"
                              onClick={() => { setTaskPptFile(null); setTaskPptUrl(''); }}
                              className="text-[10px] text-rose-400 hover:underline"
                            >
                              Өшіру
                            </button>
                          )}
                        </label>
                        <input
                          type="file"
                          accept=".pptx,.ppt,.key"
                          ref={pptFileInputRef}
                          onChange={handlePptUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => pptFileInputRef.current?.click()}
                          className="w-full border border-dashed border-amber-500/50 hover:border-amber-400 bg-slate-950 p-3 rounded-lg text-center cursor-pointer transition-all hover:bg-slate-900 flex items-center justify-center gap-2 text-xs text-slate-300"
                        >
                          <Paperclip className="w-4 h-4 text-amber-400 shrink-0" />
                          <span className="truncate">{taskPptFile ? taskPptFile.name : 'Презентация таңдау (.pptx)'}</span>
                        </button>
                      </div>

                      {/* 2. Document Upload */}
                      <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-indigo-500/30">
                        <label className="text-xs font-bold text-indigo-300 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-indigo-400" />
                            <span>2. Тапсырма Құжаты (.pdf)</span>
                          </span>
                          {taskDocFile && (
                            <button
                              type="button"
                              onClick={() => { setTaskDocFile(null); setTaskDocUrl(''); }}
                              className="text-[10px] text-rose-400 hover:underline"
                            >
                              Өшіру
                            </button>
                          )}
                        </label>
                        <input
                          type="file"
                          accept=".pdf,.docx,.doc,.ms14,.zip"
                          ref={docFileInputRef}
                          onChange={handleDocUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => docFileInputRef.current?.click()}
                          className="w-full border border-dashed border-indigo-500/50 hover:border-indigo-400 bg-slate-950 p-3 rounded-lg text-center cursor-pointer transition-all hover:bg-slate-900 flex items-center justify-center gap-2 text-xs text-slate-300"
                        >
                          <FileCode className="w-4 h-4 text-indigo-400 shrink-0" />
                          <span className="truncate">{taskDocFile ? taskDocFile.name : 'Құжат таңдау (.pdf / .docx)'}</span>
                        </button>
                      </div>

                      {/* 3. Video Upload */}
                      <div className="space-y-1.5 bg-slate-900/60 p-3 rounded-xl border border-cyan-500/30">
                        <label className="text-xs font-bold text-cyan-300 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Video className="w-4 h-4 text-cyan-400" />
                            <span>3. Оқу Бейнесабағы (.mp4)</span>
                          </span>
                          {taskVideoFile && (
                            <button
                              type="button"
                              onClick={() => { setTaskVideoFile(null); setTaskVideoUrl(''); }}
                              className="text-[10px] text-rose-400 hover:underline"
                            >
                              Өшіру
                            </button>
                          )}
                        </label>
                        <input
                          type="file"
                          accept="video/mp4,video/webm"
                          ref={videoFileInputRef}
                          onChange={handleVideoUpload}
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => videoFileInputRef.current?.click()}
                          className="w-full border border-dashed border-cyan-500/50 hover:border-cyan-400 bg-slate-950 p-3 rounded-lg text-center cursor-pointer transition-all hover:bg-slate-900 flex items-center justify-center gap-2 text-xs text-slate-300"
                        >
                          <Film className="w-4 h-4 text-cyan-400 shrink-0" />
                          <span className="truncate">{taskVideoFile ? taskVideoFile.name : 'Видео таңдау (.mp4)'}</span>
                        </button>
                      </div>

                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setIsAddingTask(false)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                      >
                        Бас тарту
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black rounded-xl text-xs shadow-lg flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Барлығын Сақтау Және Студенттерге Жіберу</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tasks & Presentation Workspace */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left Items Column */}
                <div className="lg:col-span-5 space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
                      <Presentation className="w-4 h-4 text-amber-400" />
                      Тапсырмалар Тізімі ({currentDiscTasks.length})
                    </h3>
                  </div>

                  {currentDiscTasks.length === 0 ? (
                    <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-8 text-center space-y-2">
                      <Presentation className="w-10 h-10 text-slate-500 mx-auto" />
                      <p className="text-xs text-slate-400">Осы пәнге әлі тапсырмалар жүктелмеген.</p>
                    </div>
                  ) : (
                    currentDiscTasks.map((task) => {
                      const isSelected = selectedTask?.id === task.id;
                      const hasSubmission = submissionsList.some(s => s.taskId === task.id);

                      return (
                        <div
                          key={task.id}
                          onClick={() => setSelectedTask(task)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 relative group ${
                            isSelected 
                              ? 'bg-gradient-to-r from-indigo-900/90 via-slate-800 to-slate-900 border-amber-500 ring-2 ring-amber-500/50 shadow-xl' 
                              : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between flex-wrap gap-1">
                            <div className="flex items-center gap-1 flex-wrap">
                              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full font-bold uppercase flex items-center gap-1">
                                <Presentation className="w-2.5 h-2.5 text-amber-400" />
                                Презентация
                              </span>

                              {hasSubmission && (
                                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                  <CheckCircle className="w-2.5 h-2.5 text-emerald-400" />
                                  Орындалды
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-400 font-mono">{task.createdAt}</span>
                          </div>

                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-xl border bg-amber-500/20 border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0">
                              <Presentation className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-white truncate">{task.title}</h4>
                              <p className="text-[11px] text-slate-400 line-clamp-1">{task.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-700/50">
                            <span>{task.author}</span>
                            <span className="text-amber-400 font-bold flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              Ашу &rarr;
                            </span>
                          </div>

                          {role === 'teacher' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteTask(task.id);
                              }}
                              className="absolute top-2 right-2 p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Өшіру"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Right Content View Column */}
                <div className="lg:col-span-7 space-y-6">
                  {selectedTask ? (
                    <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-5 backdrop-blur-md space-y-5 shadow-2xl">
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-700 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold shadow-lg">
                            <Presentation className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
                              Сабақ Материалдары
                            </span>
                            <h3 className="text-sm font-extrabold text-white">{selectedTask.title}</h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleAnalyzeDocumentWithAI(selectedTask)}
                            className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md hover:from-amber-400 hover:to-orange-500"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                            <span>AI Ментор Ашу</span>
                          </button>
                        </div>
                      </div>

                      {/* 1. PRESENTATION SECTION */}
                      {selectedTask.slides && selectedTask.slides.length > 0 && (
                        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 space-y-4 shadow-xl">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-2.5">
                            <div className="flex items-center gap-2">
                              <Presentation className="w-5 h-5 text-amber-400" />
                              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                                1. Дәрістік Презентация Слайдтары
                              </h4>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap">
                              <a
                                href={selectedTask.pptFileUrl || '#'}
                                download={selectedTask.pptFileName || `${selectedTask.title}_Презентация.pptx`}
                                className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all"
                              >
                                <Download className="w-3.5 h-3.5 text-slate-950" />
                                <span>Презентацияны Жүктеу (.pptx)</span>
                              </a>

                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => setCurrentSlideIdx(prev => Math.max(0, prev - 1))}
                                  disabled={currentSlideIdx === 0}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    currentSlideIdx === 0 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  }`}
                                >
                                  &larr; Соңғы
                                </button>
                                <span className="text-xs font-mono font-bold text-amber-300 px-2 py-0.5 bg-slate-900 border border-slate-800 rounded-md">
                                  {currentSlideIdx + 1} / {selectedTask.slides.length}
                                </span>
                                <button
                                  onClick={() => setCurrentSlideIdx(prev => Math.min(selectedTask.slides.length - 1, prev + 1))}
                                  disabled={currentSlideIdx === selectedTask.slides.length - 1}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                                    currentSlideIdx === selectedTask.slides.length - 1 ? 'bg-slate-800 text-slate-600 cursor-not-allowed' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                  }`}
                                >
                                  Келесі &rarr;
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-slate-800 rounded-xl p-6 space-y-4 shadow-2xl relative min-h-[220px]">
                            <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                              <span className="text-xs font-extrabold text-amber-300 uppercase tracking-wide">
                                {selectedTask.slides[currentSlideIdx].title}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                {selectedTask.pptFileName || 'PPTX Slide Mode'}
                              </span>
                            </div>

                            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                              {selectedTask.slides[currentSlideIdx].content}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. DOCUMENT TASK SECTION */}
                      {(selectedTask.docFileName || selectedTask.docPreview) && (
                        <div className="bg-slate-950 border border-indigo-500/40 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center justify-between text-xs font-extrabold text-indigo-300 border-b border-slate-800 pb-2">
                            <span className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-indigo-400" />
                              2. Зертханалық Тапсырма Құжаты: {selectedTask.docFileName || 'Lab_Task.pdf'}
                            </span>
                            {selectedTask.docFileUrl && (
                              <a
                                href={selectedTask.docFileUrl}
                                download={selectedTask.docFileName}
                                className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] font-bold flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>Жүктеу</span>
                              </a>
                            )}
                          </div>

                          <div className="bg-slate-900 text-slate-100 p-4 rounded-xl border border-slate-800 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                            {selectedTask.docPreview || 'Оқытушы дайындаған зертханалық тапсырма құжаты.'}
                          </div>
                        </div>
                      )}

                      {/* 3. VIDEO TUTORIAL SECTION */}
                      {(selectedTask.videoUrl || selectedTask.videoTitle) && (
                        <div className="bg-slate-950 border border-cyan-500/40 rounded-2xl p-4 space-y-3">
                          <div className="flex items-center justify-between text-xs font-extrabold text-cyan-300 border-b border-slate-800 pb-2">
                            <span className="flex items-center gap-2">
                              <PlayCircle className="w-4 h-4 text-cyan-400" />
                              3. Оқу Бейнесабағы: {selectedTask.videoTitle || 'Сабақ_Видеосы.mp4'}
                            </span>

                            <button
                              onClick={() => setActiveVideoModal({
                                title: selectedTask.videoTitle || selectedTask.title,
                                url: selectedTask.videoUrl || 'https://vjs.zencdn.net/v/oceans.mp4'
                              })}
                              className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-md transition-all"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Видеоны Ашып Қарау</span>
                            </button>
                          </div>

                          <div className="aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-xl relative group">
                            <video controls className="w-full h-full object-cover">
                              <source src={selectedTask.videoUrl || 'https://vjs.zencdn.net/v/oceans.mp4'} type="video/mp4" />
                            </video>
                          </div>
                        </div>
                      )}

                      {/* STUDENT SUBMISSION */}
                      {role === 'student' && (
                        <div className="bg-slate-900/90 border border-emerald-500/40 rounded-2xl p-5 space-y-4 shadow-xl">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                            <div className="flex items-center gap-2">
                              <FileCheck className="w-5 h-5 text-emerald-400" />
                              <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                                Орындалған Жұмысты Жүктеу Және Тексеруге Жіберу (Студент)
                              </h4>
                            </div>
                            {mySubmission ? (
                              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-emerald-400" />
                                Жіберілді
                              </span>
                            ) : (
                              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                                Жіберілмеген
                              </span>
                            )}
                          </div>

                          {mySubmission ? (
                            <div className="bg-slate-950/80 border border-emerald-500/30 rounded-xl p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <div className="w-8 h-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                                    <Paperclip className="w-4 h-4" />
                                  </div>
                                  <div>
                                    <h5 className="text-xs font-bold text-white">{mySubmission.fileName}</h5>
                                    <span className="text-[10px] text-slate-400 font-mono">{mySubmission.fileSize} • {mySubmission.submittedAt}</span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <a
                                    href={mySubmission.fileUrl || '#'}
                                    download={mySubmission.fileName}
                                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-300 rounded-lg text-xs font-bold flex items-center gap-1 border border-slate-700"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>Өз файлымды жүктеу</span>
                                  </a>

                                  <button
                                    onClick={() => handleAnalyzeDocumentWithAI(selectedTask, mySubmission)}
                                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-lg text-xs shadow-md flex items-center gap-1.5"
                                  >
                                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                                    <span>AI Ментор Талдауы</span>
                                  </button>
                                </div>
                              </div>

                              {mySubmission.score && (
                                <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl space-y-1">
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-emerald-300">Оқытушы Бағасы:</span>
                                    <span className="text-sm font-extrabold text-amber-300">{mySubmission.score} / 100</span>
                                  </div>
                                  {mySubmission.teacherFeedback && (
                                    <p className="text-xs text-slate-200 mt-1 whitespace-pre-wrap">{mySubmission.teacherFeedback}</p>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <form onSubmit={handleSubmitStudentHW} className="space-y-3">
                              <p className="text-xs text-slate-300">
                                Орындалған презентацияны (.pptx), зертханалық файлды (.pdf, .docx) немесе .ms14 тізбегін тіркеңіз:
                              </p>

                              <input
                                type="file"
                                accept=".pptx,.ppt,.pdf,.docx,.doc,.ms14,.zip,.png"
                                ref={studentFileInputRef}
                                onChange={handleStudentFileSelect}
                                className="hidden"
                              />

                              <div 
                                onClick={() => studentFileInputRef.current?.click()}
                                className="border-2 border-dashed border-emerald-500/40 hover:border-emerald-400 bg-slate-950/70 p-4 rounded-xl text-center cursor-pointer transition-all hover:bg-slate-950 flex flex-col items-center justify-center gap-2 group"
                              >
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                  <Upload className="w-5 h-5" />
                                </div>
                                <div>
                                  <p className="text-xs font-bold text-white">
                                    {studentFile ? studentFile.name : 'Орындалған файлын таңдаңыз'}
                                  </p>
                                </div>
                              </div>

                              <div className="flex justify-end pt-2">
                                <button
                                  type="submit"
                                  disabled={!studentFile || isSubmittingHW}
                                  className={`px-5 py-2.5 rounded-xl text-xs font-bold text-white transition-all shadow-lg flex items-center gap-2 ${
                                    studentFile && !isSubmittingHW
                                      ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30'
                                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                  }`}
                                >
                                  {isSubmittingHW ? (
                                    <>
                                      <RefreshCw className="w-4 h-4 animate-spin" />
                                      <span>Жіберілуде...</span>
                                    </>
                                  ) : (
                                    <>
                                      <SendHorizontal className="w-4 h-4" />
                                      <span>Оқытушыға & AI Менторға Жіберу</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </form>
                          )}
                        </div>
                      )}

                      {/* TEACHER SUBMISSIONS INSPECTOR LIST */}
                      {role === 'teacher' && (
                        <div className="bg-slate-900/90 border border-indigo-500/40 rounded-2xl p-5 space-y-3 shadow-xl">
                          <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                              <Users className="w-4 h-4 text-indigo-400" />
                              Студенттердің Тексеруге Түскен Жұмыстары ({currentTaskSubmissions.length})
                            </h4>
                          </div>

                          {currentTaskSubmissions.length === 0 ? (
                            <p className="text-xs text-slate-400 text-center py-4 border border-dashed border-slate-800 rounded-xl">
                              Студенттер бұл тапсырма бойынша орындалған файлын әлі тапсырмаған.
                            </p>
                          ) : (
                            <div className="space-y-2">
                              {currentTaskSubmissions.map((sub) => {
                                const isEvaluated = sub.status === 'evaluated';

                                return (
                                  <div key={sub.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-white">{sub.studentName}</span>
                                        <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full font-mono font-bold">
                                          {sub.submittedAt}
                                        </span>
                                        {isEvaluated ? (
                                          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                                            <CheckCircle className="w-3 h-3 text-emerald-400" />
                                            Бағаланды: {sub.score}/100
                                          </span>
                                        ) : (
                                          <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold">
                                            Тексерілмеген
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-amber-300 font-mono flex items-center gap-1">
                                        <Presentation className="w-3.5 h-3.5 text-amber-400" />
                                        {sub.fileName} ({sub.fileSize})
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                      <a
                                        href={sub.fileUrl || '#'}
                                        download={sub.fileName}
                                        className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                                        title="Жүктеп алу"
                                      >
                                        <Download className="w-3.5 h-3.5" />
                                        <span>Жүктеу</span>
                                      </a>

                                      <button
                                        onClick={() => handleOpenInspectModal(sub)}
                                        className="px-3.5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-lg"
                                      >
                                        <Eye className="w-4 h-4 text-slate-950" />
                                        <span>Ашу & AI Сараптау</span>
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  ) : (
                    <div className="bg-slate-800/40 border border-dashed border-slate-700/80 rounded-2xl p-12 text-center space-y-3">
                      <Presentation className="w-12 h-12 text-slate-500 mx-auto" />
                      <p className="text-xs text-slate-400">Сол жақтағы тізімнен сабақты таңдаңыз.</p>
                    </div>
                  )}
                </div>

              </div>

              {/* INSPECTION MODAL FOR TEACHER */}
              {role === 'teacher' && inspectingSub && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
                  <div className="bg-slate-900 border border-amber-500/50 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
                    
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold">
                          <Presentation className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">Студент Жұмысын Сараптау</span>
                          <h3 className="text-base font-extrabold text-white">{inspectingSub.studentName} — {inspectingSub.fileName}</h3>
                        </div>
                      </div>

                      <button
                        onClick={() => setInspectingSub(null)}
                        className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3 font-mono">
                      <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                        <span className="flex items-center gap-1.5 text-amber-300 font-bold">
                          <Presentation className="w-4 h-4 text-amber-400" />
                          Жүктелген Файл: {inspectingSub.fileName}
                        </span>
                        <a
                          href={inspectingSub.fileUrl || '#'}
                          download={inspectingSub.fileName}
                          className="px-3 py-1 bg-amber-500 text-slate-950 rounded text-[11px] font-black flex items-center gap-1 hover:bg-amber-400"
                        >
                          <Download className="w-3 h-3" />
                          <span>Файлды жүктеу ({inspectingSub.fileSize})</span>
                        </a>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 border border-amber-500/30 rounded-xl p-4 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                          AI Ұстаз Lab Сараптамасы
                        </h4>

                        <button
                          type="button"
                          onClick={handleAutoEvaluateWithAI}
                          disabled={isAiThinking}
                          className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-extrabold rounded-lg text-xs flex items-center gap-1.5 shadow-md"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isAiThinking ? 'animate-spin' : ''}`} />
                          <span>Қайта Талдау</span>
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-1.5">
                          <h5 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                            <ThumbsUp className="w-4 h-4 text-emerald-400" />
                            👍 Плюстары (Артықшылығы):
                          </h5>
                          <ul className="text-xs text-slate-200 space-y-1 list-disc list-inside">
                            {inspectingSub.aiAnalysis?.pros?.map((pro, idx) => (
                              <li key={idx} className="leading-relaxed">{pro}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-3.5 bg-slate-900/60 border border-slate-700 rounded-xl space-y-1.5">
                          <h5 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                            <ThumbsDown className="w-4 h-4 text-rose-400" />
                            👎 Минустары мен ескертулер:
                          </h5>
                          <ul className="text-xs text-slate-200 space-y-1 list-disc list-inside">
                            {inspectingSub.aiAnalysis?.cons?.map((con, idx) => (
                              <li key={idx} className="leading-relaxed">{con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                      <button
                        onClick={() => setInspectingSub(null)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                      >
                        Жабу
                      </button>
                      <button
                        onClick={handleSaveTeacherEvaluation}
                        className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Бағаны Сақтау Және Студентке Жіберу</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* STANDALONE VIDEOS TAB */}
          {activeTab === 'multisim' && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-gradient-to-r from-slate-900 via-cyan-950 to-blue-950 border border-cyan-500/40 rounded-2xl p-6 relative overflow-hidden shadow-2xl space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-2 max-w-xl">
                    <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 w-fit">
                      <Video className="w-3.5 h-3.5 text-cyan-400" />
                      Оқу Бейнехабы
                    </span>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      Зертханалық Видеосабақтар Және Лекциялар
                    </h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Оқытушы жүктеген зертханалық бейнесабақтарды ойнатқышта қараңыз немесе жаңа видео қосыңыз.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://www.tinkercad.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold rounded-xl text-xs shadow-xl flex items-center gap-1.5"
                    >
                      <Box className="w-3.5 h-3.5 text-amber-100" />
                      <span>Tinkercad Live</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <a
                      href="https://electronicworkbenchewb.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold rounded-xl text-xs shadow-xl flex items-center gap-1.5"
                    >
                      <Zap className="w-3.5 h-3.5 text-teal-100" />
                      <span>Electronic Workbench Live</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>

                    <a
                      href="https://www.siemens.com/ru-ru/products/tia-portal/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs shadow-xl flex items-center gap-1.5"
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-200" />
                      <span>Tia-portal Live</span>
                      <ExternalLink className="w-3 h-3 opacity-80" />
                    </a>
                  </div>
                </div>

                {role === 'teacher' && (
                  <div className="pt-3 border-t border-cyan-500/30 flex justify-start">
                    <button
                      onClick={() => setIsAddingVideo(!isAddingVideo)}
                      className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs shadow-xl flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      <span>+ Жаңа Видео Салу</span>
                    </button>
                  </div>
                )}
              </div>

              {/* TEACHER ADD VIDEO MODAL / FORM */}
              {role === 'teacher' && isAddingVideo && (
                <div className="bg-slate-800/95 border border-cyan-500/50 rounded-2xl p-6 backdrop-blur-md space-y-4 shadow-2xl animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-2">
                      <Video className="w-5 h-5 text-cyan-400" />
                      <h3 className="text-base font-bold text-white">Оқытушы: Жаңа Видеосабақ Жүктеу (.mp4)</h3>
                    </div>
                    <button onClick={() => setIsAddingVideo(false)} className="p-1.5 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveHubVideo} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Видео тақырыбы / Атауы:</label>
                      <input
                        type="text"
                        required
                        placeholder="Мысалы: NI Multisim & Tinkercad схемасын құрастыру"
                        value={newVideoTitle}
                        onChange={(e) => setNewVideoTitle(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-300">Видео сипаттамасы:</label>
                      <textarea
                        rows={2}
                        placeholder="Видео мазмұны бойынша қысқаша түсініктеме..."
                        value={newVideoDesc}
                        onChange={(e) => setNewVideoDesc(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white focus:ring-2 focus:ring-cyan-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-cyan-300">Компьютерден MP4 файл таңдау:</label>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        ref={hubVideoFileInputRef}
                        onChange={handleHubVideoFileSelect}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => hubVideoFileInputRef.current?.click()}
                        className="w-full border border-dashed border-cyan-500/50 hover:border-cyan-400 bg-slate-950 p-4 rounded-xl text-center cursor-pointer transition-all hover:bg-slate-900 flex items-center justify-center gap-2 text-xs text-slate-300"
                      >
                        <Film className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">{newVideoFileObj ? newVideoFileObj.name : 'MP4 видеофайлын таңдау үшін мұнда басыңыз'}</span>
                      </button>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-700">
                      <button
                        type="button"
                        onClick={() => setIsAddingVideo(false)}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                      >
                        Бас тарту
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs shadow-lg flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" />
                        <span>Видеоны Сақтау Және Жариялау</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* VIDEOS LIST */}
              <div className="space-y-4">
                {videosList.length === 0 ? (
                  <div className="bg-slate-800/40 border border-dashed border-slate-700 rounded-2xl p-12 text-center space-y-2">
                    <Video className="w-10 h-10 text-slate-500 mx-auto" />
                    <p className="text-xs text-slate-400">Әлі ешқандай оқу видеосы жүктелмеген.</p>
                  </div>
                ) : (
                  videosList.map((video) => (
                    <div key={video.id} className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-5 space-y-4 relative group">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">{video.author} • {video.createdAt}</span>
                          <h4 className="text-base font-bold text-white">{video.title}</h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveVideoModal({
                              title: video.title,
                              url: video.videoUrl
                            })}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md"
                          >
                            <Maximize2 className="w-3.5 h-3.5" />
                            <span>Толық Экранда Ашу</span>
                          </button>

                          {role === 'teacher' && (
                            <button
                              onClick={() => handleDeleteHubVideo(video.id)}
                              className="px-3 py-1.5 bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                              title="Видеоны өшіру"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Өшіру</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-slate-300">{video.description}</p>

                      <div className="aspect-video rounded-xl overflow-hidden bg-black border border-cyan-500/30 shadow-xl">
                        <video controls className="w-full h-full object-cover">
                          <source src={video.videoUrl} type="video/mp4" />
                        </video>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl flex flex-col h-[650px] backdrop-blur-sm overflow-hidden shadow-2xl">
              <div className="bg-slate-800 border-b border-slate-700/80 p-3.5 px-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-2">
                      «AI Ұстаз Lab» Сократтық Ментор
                    </h2>
                    <p className="text-xs text-slate-400">Пән: {selectedDiscipline.title}</p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('tasks')}
                  className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all"
                >
                  <Presentation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Тапсырмаларға оралу</span>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                  const isAi = msg.sender === 'ai';
                  return (
                    <div key={msg.id} className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}>
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-xs ${isAi ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                        {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <div className={`max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${isAi ? 'bg-slate-900 text-slate-100 border border-slate-700' : 'bg-indigo-600 text-white'}`}>
                        <div className="whitespace-pre-wrap">{msg.text}</div>
                        <span className="text-[10px] block mt-1 opacity-60">{msg.timestamp}</span>
                      </div>
                    </div>
                  );
                })}
                {isAiThinking && (
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                    <span>Ойлануда...</span>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-3 bg-slate-800 border-t border-slate-700">
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Сұрағыңызды жазыңыз..."
                    className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button type="submit" disabled={!inputText.trim()} className="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl">
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TEACHER PROMPT TAB */}
          {role === 'teacher' && activeTab === 'prompt' && (
            <div className="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-6 backdrop-blur-sm space-y-4">
              <h3 className="text-base font-bold text-white">AI Ментор Баптаулары (System Prompt)</h3>
              <textarea
                rows={6}
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-xs font-mono text-slate-200"
              />
              <div className="flex justify-end">
                <button onClick={() => alert('Сақталды!')} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold">
                  Сақтау
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* FULLSCREEN / MODAL VIDEO VIEWER */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-slate-900 border border-cyan-500/50 rounded-2xl max-w-4xl w-full p-5 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
                <Video className="w-5 h-5 text-cyan-400" />
                <span className="truncate">{activeVideoModal.title}</span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video rounded-xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
              <video controls autoPlay className="w-full h-full object-contain">
                <source src={activeVideoModal.url} type="video/mp4" />
              </video>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs"
              >
                Жабу
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 «AI Ұстаз Lab» — Цифрлық зертхана</span>
          <span className="text-cyan-400 font-medium">Tia-portal Live & Electronic Workbench қосылды</span>
        </div>
      </footer>
    </div>
  );
}
