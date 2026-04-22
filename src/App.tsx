/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { characters } from './data/characters';
import { questions } from './data/questions';
import { Character, Option, Dimension } from './types';

type ScreenState = 'start' | 'test' | 'result';

const DIMENSIONS: Dimension[] = [
  'powerAmbition',
  'ruleIntegrity',
  'socialResponsibility',
  'emotionalDetachment',
  'strategicManeuvering'
];

const DIMENSION_NAMES: Record<Dimension, string> = {
  powerAmbition: '权力抱负',
  ruleIntegrity: '规则边界',
  socialResponsibility: '社会责任',
  emotionalDetachment: '情感阈值',
  strategicManeuvering: '局势掌控'
};

const INITIAL_SCORES: Record<Dimension, number> = {
  powerAmbition: 50,
  ruleIntegrity: 50,
  socialResponsibility: 50,
  emotionalDetachment: 50,
  strategicManeuvering: 50
};

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [dimensionScores, setDimensionScores] = useState<Record<Dimension, number>>(INITIAL_SCORES);
  const [activeQuestions, setActiveQuestions] = useState(questions);

  const questionMeans = useMemo(() => {
    const sums: Record<Dimension, number> = {
      powerAmbition: 0,
      ruleIntegrity: 0,
      socialResponsibility: 0,
      emotionalDetachment: 0,
      strategicManeuvering: 0
    };
    let totalOptions = 0;
    questions.forEach(q => {
      q.options.forEach(o => {
        Object.entries(o.scores).forEach(([d, s]) => {
          sums[d as Dimension] += s;
        });
        totalOptions++;
      });
    });
    const means: Record<Dimension, number> = { ...sums };
    DIMENSIONS.forEach(d => {
      means[d] = sums[d] / (questions.length * 4); // 平均每个题目的得分偏移
    });
    return means;
  }, []);

  const handleStart = () => {
    setDimensionScores(INITIAL_SCORES);
    setActiveQuestions(shuffle(questions));
    setCurrentQuestionIdx(0);
    setScreen('test');
  };

  const handleAnswer = (option: Option) => {
    const newScores = { ...dimensionScores };
    Object.entries(option.scores).forEach(([dimension, score]) => {
      newScores[dimension as Dimension] += score || 0;
    });
    setDimensionScores(newScores);

    if (currentQuestionIdx < activeQuestions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setScreen('result');
    }
  };

  const calculateCosineSimilarity = (vecA: number[], vecB: number[]) => {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
  };

  const resultCharacter = useMemo(() => {
    if (screen !== 'result') return characters[0];

    // 校准用户向量：减去 50 基准分，再减去题库本身的平均得分偏移
    // 这样 [0,0,0,0,0] 就代表一个完全随机、无倾向的受测者
    const userVector = DIMENSIONS.map(d => (dimensionScores[d] - 50) - (questionMeans[d] * activeQuestions.length));
    
    // 计算信号强度
    const magnitudeU = Math.sqrt(userVector.reduce((sum, v) => sum + v * v, 0));
    
    // 如果信号极弱（比如全选了得分均衡的选项），直接返回一个随机角色
    if (magnitudeU < 0.1) {
      return shuffle(characters)[0];
    }

    // 计算所有角色的相似度
    const scores = shuffle(characters).map(char => {
      const charVector = DIMENSIONS.map(d => char.vector[d] - 5.5);
      const similarity = calculateCosineSimilarity(userVector, charVector);
      return { char, similarity };
    });

    // 按相似度降序排序
    scores.sort((a, b) => b.similarity - a.similarity);

    // 寻找所有相似度极其接近最高分的“头筹者”
    const topSimilarity = scores[0].similarity;
    const topScorers = scores.filter(s => Math.abs(s.similarity - topSimilarity) < 1e-6);

    // 从头筹者中随机选一个，彻底消除数组顺序带来的固定偏见
    return topScorers[Math.floor(Math.random() * topScorers.length)].char;
  }, [dimensionScores, screen, activeQuestions, questionMeans]);

  const resultQuote = useMemo(() => {
    if (!resultCharacter) return '';
    const quotes = resultCharacter.famousQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
  }, [resultCharacter]);

  const radarData = useMemo(() => {
    return DIMENSIONS.map(d => ({
      subject: DIMENSION_NAMES[d],
      A: dimensionScores[d],
      fullMark: 100,
    }));
  }, [dimensionScores]);

  const shuffledOptions = useMemo(() => {
    if (screen !== 'test') return [];
    return shuffle(activeQuestions[currentQuestionIdx].options);
  }, [currentQuestionIdx, screen, activeQuestions]);

  const handleRestart = () => {
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] flex items-center justify-center p-0 md:p-4">
      <div className="relative dossier-container w-full max-w-[960px] h-full rounded-none md:rounded-lg min-h-screen md:min-h-[700px] dossier-folder p-3 md:p-5 flex">
        {/* Sidebar Tab - Hidden on Mobile */}
        <div className="hidden md:block absolute right-[-40px] top-[100px] dossier-tab">
          案件卷宗：2017-001
        </div>

        <div className="page-content paper-sheet w-full h-full p-4 sm:p-10 md:p-16 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {screen === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <div className="text-center border-b-2 border-official-red pb-4 md:pb-5 mb-6 md:mb-10 mt-2 md:mt-0">
                  <h1 className="text-xl md:text-3xl font-serif font-bold text-official-red tracking-[1px] md:tracking-[2px] mb-2 leading-tight">
                    停止仰望星空！<br />
                    来测测你离孙连城的“境界”还有多远？
                  </h1>
                  <p className="text-[10px] md:text-xs uppercase tracking-[2px] text-text-muted">
                    内卷还是躺平？让达康书记来告诉你
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center flex-grow space-y-6 md:space-y-8 max-w-xl mx-auto text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-official-red/10 rounded-full flex items-center justify-center border-2 border-official-red relative">
                    <div className="absolute inset-2 border border-official-red rounded-full opacity-30" />
                    <span className="text-official-red font-black text-xl md:text-2xl">证</span>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <p className="text-lg md:text-2xl font-serif font-bold text-ink-black border-b border-dashed border-[#ccc] pb-2 inline-block">
                      公职人员人格与价值观终极审查
                    </p>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed italic px-2">
                      “你是那把铁面无私的冷色标尺，还是胸怀宇宙的观测者？”
                    </p>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed px-4">
                      基于汉东省 40 项极端情境博弈模型，我们将深度揭开您在权力、规则与信仰面前最真实的灵魂归属点。
                    </p>
                    <div className="flex items-center justify-center space-x-3 text-[10px] md:text-xs text-text-muted pt-2 scale-90 md:scale-100">
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        40 道深度题目
                      </span>
                      <span className="w-1 h-1 bg-text-muted/30 rounded-full" />
                      <span className="flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        预计用时 8-10 分钟
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleStart}
                    className="w-full max-w-xs py-4 bg-official-red text-white font-bold tracking-[4px] rounded shadow-lg hover:bg-official-red/90 transition-all active:scale-95"
                  >
                    开始审查
                  </button>
                </div>

                <div className="mt-auto flex justify-between items-end border-t border-[#eee] pt-6">
                  <div className="text-[10px] text-text-muted uppercase tracking-widest font-sans">
                    HD-DOC-CODE: 2026-X01
                  </div>
                  <div className="official-seal w-28 h-28">
                    汉东省反贪总局<br />审查专用章
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'test' && (
              <motion.div
                key="test"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-grow flex flex-col"
              >
                <div className="text-center border-b-2 border-official-red pb-1 md:pb-5 mb-2 md:mb-10">
                  <h1 className="text-base md:text-3xl font-serif font-bold text-official-red tracking-[1px] md:tracking-[2px] mb-0.5 md:mb-2 text-balance leading-tight">
                    人格特质审查表 (QUESTIONNAIRE)
                  </h1>
                  <p className="text-[6px] md:text-[10px] uppercase tracking-[2px] text-text-muted">
                    SECTION II: PSYCHOLOGICAL BEHAVIOR ANALYSIS
                  </p>
                </div>

                <div className="flex justify-between items-center text-[6px] md:text-xs text-text-muted mb-2 md:mb-8 border-b border-dashed border-[#ccc] pb-1 font-sans tracking-tight md:tracking-wider">
                  <span>受测编号：HD-H-2026-0417</span>
                  <span className="hidden sm:inline">当前环节：情境抉择测试</span>
                  <span>页码：{currentQuestionIdx + 1} / {activeQuestions.length}</span>
                </div>

                <div className="flex-grow space-y-2 md:space-y-8 overflow-y-auto max-h-[70vh] md:max-h-none pr-1">
                  <div className="space-y-0.5 md:space-y-4">
                    <div className="text-[10px] md:text-lg font-bold text-official-red font-sans">
                      第 {currentQuestionIdx + 1 < 10 ? `0${currentQuestionIdx + 1}` : currentQuestionIdx + 1} 题：
                    </div>
                    <h2 className="text-sm md:text-2xl font-serif font-semibold text-ink-black leading-snug">
                      {activeQuestions[currentQuestionIdx].text}
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 md:gap-4 pb-2">
                    {shuffledOptions.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(option)}
                        className="form-option p-2 md:p-5 text-left flex items-start group relative min-h-[50px] md:min-h-[auto]"
                      >
                        <span className="w-4 h-4 md:w-8 md:h-8 border border-ink-black flex items-center justify-center shrink-0 mr-2 md:mr-4 font-bold text-[8px] md:text-sm group-hover:bg-official-red group-hover:text-white group-hover:border-official-red transition-all">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-[11px] md:text-base text-ink-black mt-0.5 leading-tight">
                          {option.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-2 md:mt-10 flex justify-between items-end">
                  <div className="w-40 md:w-64">
                    <div className="flex justify-between text-[8px] md:text-[10px] text-text-muted mb-1 font-sans">
                      <span>审查进度</span>
                      <span>{Math.round(((currentQuestionIdx + 1) / activeQuestions.length) * 100)}%</span>
                    </div>
                    <div className="h-1 bg-gray-200 w-full rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-official-red"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentQuestionIdx + 1) / activeQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="opacity-30">
                    <div className="border-2 border-official-red p-1 rounded rotate-[-5deg]">
                      <div className="border border-official-red px-2 py-0.5 text-[8px] font-black text-official-red uppercase">
                        Confidential
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-grow flex flex-col h-full overflow-y-auto pr-1"
              >
                <div className="text-center border-b-2 border-official-red pb-4 md:pb-5 mb-6 md:mb-10">
                  <h1 className="text-xl md:text-3xl font-serif font-bold text-official-red tracking-[2px] md:tracking-[4px] mb-2 uppercase leading-tight">
                    审查结论意见书
                  </h1>
                  <p className="text-[8px] md:text-[10px] uppercase tracking-[2px] text-text-muted">
                    FINAL AUDIT CONCLUSION - CASE NO. 2026-X01
                  </p>
                </div>

                <div className="flex flex-col items-center mb-6 border-b border-official-red pb-4">
                  <div className="text-4xl font-serif font-black text-ink-black border-b-4 border-official-red inline-block mb-2">
                    {resultCharacter.name}
                  </div>
                  <p className="text-sm text-text-muted font-sans font-bold uppercase tracking-widest">
                    审查匹配对象 (IDENTIFIED PROFILE)
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 flex-grow">
                  {/* Left Column: Description & Quotes */}
                  <div className="space-y-6 py-2">
                    <div className="grid grid-cols-2 gap-4 border-b border-dashed border-[#ccc] pb-4 font-sans text-xs">
                      <div>
                        <span className="text-text-muted font-bold block mb-1 uppercase tracking-tighter">党政职务</span>
                        <span className="text-ink-black font-serif text-sm">{resultCharacter.title}</span>
                      </div>
                      <div>
                        <span className="text-text-muted font-bold block mb-1 uppercase tracking-tighter">评估等级</span>
                        <span className="text-official-red font-bold text-sm tracking-widest">AA++ / 特级审查</span>
                      </div>
                    </div>

                    <div className="p-4 bg-[#F5F2EA] border border-[#D1C9BC] font-serif italic relative">
                      <div className="absolute -top-2.5 left-4 bg-paper-bg px-2 text-[8px] text-text-muted uppercase tracking-widest font-sans font-bold">
                        座右铭
                      </div>
                      <span className="text-base md:text-lg text-ink-black leading-relaxed whitespace-pre-line">
                        {resultQuote}
                      </span>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-official-red font-bold text-xs md:text-sm uppercase tracking-widest border-l-4 border-official-red pl-3">核心格调分析</h4>
                      <p className="text-ink-black text-sm leading-relaxed font-serif text-justify">
                        {resultCharacter.description}
                      </p>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      <h4 className="text-official-red font-bold text-xs md:text-sm uppercase tracking-widest border-l-4 border-official-red pl-3">职场建议</h4>
                      <p className="text-ink-black text-sm leading-relaxed font-serif italic">
                        {resultCharacter.suggestion}
                      </p>
                    </div>

                    {/* Removal of character tags from original middle column as they were moved to radar column */}
                  </div>

                  {/* Right Column: Radar Chart & Tags */}
                  <div className="space-y-6 md:border-l border-dashed border-[#ccc] md:pl-8">
                    <h4 className="text-official-red font-bold text-[10px] uppercase tracking-widest text-center">人格指纹 (RADAR PROFILE)</h4>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                          <PolarGrid stroke="#ccc" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 10 }} />
                          <Radar
                            name="用户得分"
                            dataKey="A"
                            stroke="#A31E22"
                            fill="#A31E22"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        {DIMENSIONS.map(d => (
                          <div key={d} className="flex justify-between items-center text-[10px] border-b border-[#eee] pb-1">
                            <span className="text-text-muted">{DIMENSION_NAMES[d]}</span>
                            <span className="font-bold text-ink-black">{dimensionScores[d]}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-4 border-t border-dashed border-[#ccc]">
                        <h4 className="text-official-red font-bold text-[10px] uppercase tracking-widest mb-3">能力鉴定 (CHARACTER TAGS)</h4>
                        <div className="flex flex-wrap gap-2">
                          {resultCharacter.traits.map((trait, i) => (
                            <span key={i} className="px-2 py-0.5 bg-white border border-ink-black/20 font-serif text-[10px] italic">
                              #{trait}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dimension Details Section */}
                <div className="mt-8 md:mt-12 pt-8 md:pt-10 border-t-2 border-official-red/30">
                  <div className="mb-6 md:mb-8 flex items-center">
                    <div className="bg-official-red text-white px-2 md:px-3 py-0.5 md:py-1 font-bold text-[10px] md:text-xs mr-3">附录 A</div>
                    <h3 className="text-base md:text-xl font-serif font-black text-ink-black tracking-wider md:tracking-widest">📊 汉京人格：五大核心维度深度解析</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
                    {/* 1. Power Ambition */}
                    <div className="space-y-2 md:space-y-3">
                      <div className="flex items-center justify-between border-b border-official-red/20 pb-1 flex-wrap gap-2">
                        <h4 className="font-bold text-official-red font-serif text-xs md:text-sm">1. 权力抱负 (Power Ambition)</h4>
                        <span className="text-[9px] md:text-[10px] text-text-muted italic">影响力边界与掌控欲</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 md:gap-3">
                        <div className="bg-[#FAF9F6] p-2 md:p-3 border-l-2 border-official-red/40">
                          <p className="text-[10px] md:text-xs font-bold text-ink-black mb-1">高分表现（进取者）</p>
                          <p className="text-[10px] md:text-[11px] text-gray-600 leading-relaxed">
                            你拥有极强的人格驱动力，渴望通过职位的攀升和资源的掌控来实现人生价值。你认为只有掌握了话语权，才能真正改变环境。
                          </p>
                        </div>
                        <div className="bg-[#FAF9F6] p-2 md:p-3 border-l-2 border-gray-300">
                          <p className="text-[10px] md:text-xs font-bold text-ink-black mb-1">低分表现（淡泊者）</p>
                          <p className="text-[10px] md:text-[11px] text-gray-600 leading-relaxed">
                            你更在意内心的安宁或任务本身的完成，对职级带来的光环反应平淡。在极端情况下，这种倾向会转化为“无欲则刚”的洒脱。
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 2. Rule Integrity */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-official-red/20 pb-1">
                        <h4 className="font-bold text-official-red font-serif text-sm">2. 规则边界 (Rule Integrity)</h4>
                        <span className="text-[10px] text-text-muted italic">定义：你对社会契约与道德准则的敬畏程度</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-official-red/40">
                          <p className="text-xs font-bold text-ink-black mb-1">高分表现（捍卫者）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你信奉程序正义，认为法律和规章是保护社会运作的最后一道防线。即便在人情社会，你也会选择守住那条“冷冰冰”的底线。
                          </p>
                        </div>
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-gray-300">
                          <p className="text-xs font-bold text-ink-black mb-1">博弈者（低分表现）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你深谙规则背后的潜规则。你认为规则是灵活的工具，擅长在红线边缘寻找利益最大化的方案，甚至为了“大目标”而不惜变通。
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 3. Social Responsibility */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-official-red/20 pb-1">
                        <h4 className="font-bold text-official-red font-serif text-sm">3. 社会责任 (Social Responsibility)</h4>
                        <span className="text-[10px] text-text-muted italic">定义：你的利他倾向与对他人苦难的共情深度</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-official-red/40">
                          <p className="text-xs font-bold text-ink-black mb-1">高分表现（燃灯者）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你具有极强的奉献精神，习惯于将群众或集体的利益置于个人得失之上。你的存在感往往来源于“被需要”和“解决真实难题”。
                          </p>
                        </div>
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-gray-300">
                          <p className="text-xs font-bold text-ink-black mb-1">低分表现（旁观者）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你更侧重于自保或个人领域的成就。面对宏大的叙事或集体的诉求，你倾向于保持理性疏离，避免陷入无意义的自我牺牲。
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 4. Emotional Detachment */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-official-red/20 pb-1">
                        <h4 className="font-bold text-official-red font-serif text-sm">4. 情感阈值 (Emotional Detachment)</h4>
                        <span className="text-[10px] text-text-muted italic">定义：你处理问题时受感性因素干扰的程度</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-official-red/40">
                          <p className="text-xs font-bold text-ink-black mb-1">高分表现（冷面者）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你拥有近乎绝对的理智，能够切断感性干扰进行纯粹的决策。在职场中，你是一个“去情感化”的精密零件。
                          </p>
                        </div>
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-gray-300">
                          <p className="text-xs font-bold text-ink-black mb-1">低分表现（重情者）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你极度重视师生、同乡、旧友之间的纽带。行为逻辑深受人际关系影响，既显得有血有肉，也容易在利益纠葛中陷入挣扎。
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 5. Strategic Maneuvering */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-official-red/20 pb-1">
                        <h4 className="font-bold text-official-red font-serif text-sm">5. 局势掌控 (Strategic Maneuvering)</h4>
                        <span className="text-[10px] text-text-muted italic">定义：你在复杂博弈中的策略深度与耐心</span>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-official-red/40">
                          <p className="text-xs font-bold text-ink-black mb-1">高分表现（布局者）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你城府极深，擅长长线布局、平衡各方势力。你极少表露真实意图，懂得在静默中等待对手露出破绽。
                          </p>
                        </div>
                        <div className="bg-[#FAF9F6] p-3 border-l-2 border-gray-300">
                          <p className="text-xs font-bold text-ink-black mb-1">低分表现（破局者）</p>
                          <p className="text-[11px] text-gray-600 leading-relaxed">
                            你崇尚直来直去、力破万法。你更倾向于用最直接、最透明的方式解决矛盾，不屑于甚至厌恶复杂的政治博弈。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#eee] pt-6 flex justify-between items-center">
                  <div className="official-seal w-28 h-28">
                    汉东省反贪总局<br />审批结论专用章
                  </div>
                  
                  <div className="flex gap-4">
                     <button
                      onClick={handleRestart}
                      className="px-8 py-3 bg-ink-black text-white font-bold uppercase tracking-[2px] text-xs hover:bg-official-red transition-all active:scale-95"
                    >
                      重新审查
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <footer className="fixed bottom-4 text-white/20 text-[10px] uppercase tracking-[0.4em] font-sans">
        HAN DONG PROVINCE ARCHIVES DEPARTMENT · CONFIDENTIAL 2026
      </footer>
    </div>
  );
}


