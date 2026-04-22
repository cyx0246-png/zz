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

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('start');
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [dimensionScores, setDimensionScores] = useState<Record<Dimension, number>>(INITIAL_SCORES);

  const handleStart = () => {
    setDimensionScores(INITIAL_SCORES);
    setCurrentQuestionIdx(0);
    setScreen('test');
  };

  const handleAnswer = (option: Option) => {
    const newScores = { ...dimensionScores };
    Object.entries(option.scores).forEach(([dimension, score]) => {
      newScores[dimension as Dimension] += score || 0;
    });
    setDimensionScores(newScores);

    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
    } else {
      setScreen('result');
    }
  };

  // 核心距离算法
  const calculateDistance = (vecA: number[], vecB: number[]) => {
    return Math.sqrt(vecA.reduce((sum, val, i) => sum + Math.pow(val - vecB[i] * 10, 2), 0));
  };

  // 🌟 开发者暗门：蒙特卡洛 10000 次随机测试引擎
  const handleSimulate = () => {
    const tally: Record<string, number> = {};
    characters.forEach(c => tally[c.name] = 0);
    const SIMULATION_COUNT = 10000;

    for (let i = 0; i < SIMULATION_COUNT; i++) {
      const tempScores = { ...INITIAL_SCORES };
      
      // 模拟瞎点 40 道题
      questions.forEach(q => {
        const randomOption = q.options[Math.floor(Math.random() * q.options.length)];
        Object.entries(randomOption.scores).forEach(([dimension, score]) => {
          tempScores[dimension as Dimension] += score || 0;
        });
      });

      const userVector = DIMENSIONS.map(d => tempScores[d]);
      let minDistance = Infinity;
      let winnerId = characters[0].id;

      characters.forEach(char => {
        const charVector = DIMENSIONS.map(d => char.vector[d]);
        const distance = calculateDistance(userVector, charVector);
        if (distance < minDistance) {
          minDistance = distance;
          winnerId = char.id;
        }
      });

      const winner = characters.find(c => c.id === winnerId);
      if (winner) {
        tally[winner.name]++;
      }
    }

    // 统计结果并弹出
    let resultText = `✅ 成功执行 ${SIMULATION_COUNT} 次随机测试，分布如下：\n\n`;
    Object.entries(tally)
      .sort((a, b) => b[1] - a[1]) // 按出现次数从高到低排序
      .forEach(([name, count]) => {
        const percentage = ((count / SIMULATION_COUNT) * 100).toFixed(2);
        resultText += `[${name}] : ${count}次 (${percentage}%)\n`;
      });
      
    resultText += `\n💡 评估标准：只要有人不是 0%，算法就算跑通了！`;
    alert(resultText);
  };

  // 正常结算逻辑
  const resultData = useMemo(() => {
    const userVector = DIMENSIONS.map(d => dimensionScores[d]);
    let minDistance = Infinity;
    let winnerId = characters[0].id;

    characters.forEach(char => {
      const charVector = DIMENSIONS.map(d => char.vector[d]);
      const distance = calculateDistance(userVector, charVector);
      if (distance < minDistance) {
        minDistance = distance;
        winnerId = char.id;
      }
    });

    const character = characters.find(c => c.id === winnerId) || characters[0];
    let percentage = Math.round(100 - (minDistance / 1.5));
    if (percentage > 99) percentage = 99;
    if (percentage < 60) percentage = 60 + Math.floor(Math.random() * 10);

    return { character, matchPercentage: percentage };
  }, [dimensionScores, screen]);

  const radarData = useMemo(() => {
    return DIMENSIONS.map(d => ({
      subject: DIMENSION_NAMES[d],
      A: dimensionScores[d],
      fullMark: 100,
    }));
  }, [dimensionScores]);

  const handleRestart = () => {
    setScreen('start');
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] flex items-center justify-center p-4">
      <div className="relative dossier-container w-full max-w-[960px] h-full min-h-[700px] dossier-folder p-5 flex">
        <div className="absolute right-[-40px] top-[100px] dossier-tab">
          案件卷宗：2017-001
        </div>

        <div className="page-content paper-sheet w-full h-full p-10 md:p-16 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {screen === 'start' && (
              <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col">
                <div className="text-center border-b-2 border-official-red pb-5 mb-10">
                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-official-red tracking-[2px] mb-2">
                    停止仰望星空！<br />
                    来测测你离孙连城的“境界”还有多远？
                  </h1>
                  <p className="text-xs uppercase tracking-[2px] text-text-muted">
                    内卷还是躺平？让达康书记来告诉你
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center flex-grow space-y-8 max-w-xl mx-auto text-center">
                  <div className="w-24 h-24 bg-official-red/10 rounded-full flex items-center justify-center border-2 border-official-red relative">
                    <div className="absolute inset-2 border border-official-red rounded-full opacity-30" />
                    <span className="text-official-red font-black text-2xl">证</span>
                  </div>
                  <div className="space-y-4">
                    <p className="text-xl md:text-2xl font-serif font-bold text-ink-black border-b border-dashed border-[#ccc] pb-2 inline-block">公职人员人格与价值观终极审查</p>
                    <p className="text-gray-600 leading-relaxed italic">“你是那把铁面无私的冷色标尺，还是胸怀宇宙的观测者？”</p>
                    <p className="text-gray-600 leading-relaxed">基于汉东省 40 项极端情境博弈模型，我们将深度揭开您在权力、规则与信仰面前最真实的灵魂归属点。</p>
                  </div>
                  
                  <div className="flex flex-col items-center space-y-3 w-full">
                    <button onClick={handleStart} className="w-full max-w-xs py-4 bg-official-red text-white font-bold tracking-[4px] rounded shadow-lg hover:bg-official-red/90 transition-all active:scale-95">开始审查</button>
                    
                    {/* 👇 这里就是隐藏的测试按钮 👇 */}
                    <button onClick={handleSimulate} className="text-[10px] text-gray-400 hover:text-official-red transition-colors underline decoration-dashed">
                      [内部指令：执行 10000 次随机混沌测试]
                    </button>
                  </div>

                </div>
              </motion.div>
            )}

            {screen === 'test' && (
              <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col">
                <div className="flex justify-between items-center text-xs text-text-muted mb-8 border-b border-dashed border-[#ccc] pb-2 font-sans tracking-wider">
                  <span>受测编号：HD-H-2026-0417</span>
                  <span>当前环节：情境抉择</span>
                  <span>{currentQuestionIdx + 1} / {questions.length}</span>
                </div>
                <div className="flex-grow space-y-8">
                  <div className="space-y-4">
                    <div className="text-lg font-bold text-official-red font-sans">第 {currentQuestionIdx + 1} 题：</div>
                    <h2 className="text-2xl font-serif font-semibold text-ink-black leading-snug">{questions[currentQuestionIdx].text}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {questions[currentQuestionIdx].options.map((option, idx) => (
                      <button key={idx} onClick={() => handleAnswer(option)} className="form-option p-5 text-left flex items-start group relative">
                        <span className="w-8 h-8 border border-ink-black flex items-center justify-center shrink-0 mr-4 font-bold text-sm group-hover:bg-official-red group-hover:text-white group-hover:border-official-red transition-all">{String.fromCharCode(65 + idx)}</span>
                        <span className="text-base text-ink-black mt-0.5 leading-relaxed">{option.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'result' && (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col">
                <div className="text-center border-b-2 border-official-red pb-5 mb-10">
                  <h1 className="text-3xl font-serif font-bold text-official-red tracking-[4px] mb-2 uppercase">审查结论意见书</h1>
                  <p className="text-[10px] uppercase tracking-[2px] text-text-muted">FINAL AUDIT CONCLUSION</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_250px] gap-8 flex-grow">
                  <div className="space-y-6">
                    <div className="aspect-[3/4] bg-white border border-[#D1C9BC] p-2 relative shadow-inner">
                      <img src={resultData.character.image} alt={resultData.character.name} className="w-full h-full object-cover grayscale brightness-90 contrast-125" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-3xl font-serif font-black text-ink-black border-b-2 border-official-red inline-block mb-1">{resultData.character.name}</div>
                      <p className="text-xs text-text-muted font-sans font-bold uppercase tracking-widest">审查匹配对象</p>
                    </div>
                  </div>

                  <div className="space-y-6 py-2">
                    <div className="grid grid-cols-2 gap-4 border-b border-dashed border-[#ccc] pb-4 font-sans text-xs">
                      <div>
                        <span className="text-text-muted font-bold block mb-1 uppercase tracking-tighter">党政职务</span>
                        <span className="text-ink-black font-serif text-sm">{resultData.character.title}</span>
                      </div>
                      <div>
                        <span className="text-text-muted font-bold block mb-1 uppercase tracking-tighter">灵魂契合度</span>
                        <span className="text-official-red font-black text-lg tracking-widest">{resultData.matchPercentage}%</span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-official-red font-bold text-sm uppercase tracking-widest border-l-4 border-official-red pl-3">核心格调分析</h4>
                      <p className="text-ink-black text-sm leading-relaxed font-serif text-justify">{resultData.character.description}</p>
                    </div>

                    <div className="p-4 bg-[#F5F2EA] border border-[#D1C9BC] font-serif italic relative">
                      <div className="absolute -top-2.5 left-4 bg-paper-bg px-2 text-[8px] text-text-muted uppercase tracking-widest font-sans font-bold">出圈座右铭</div>
                      <span className="text-lg text-ink-black leading-relaxed">{resultData.character.famousQuote}</span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {resultData.character.traits.map((trait, i) => (
                          <span key={i} className="px-2 py-0.5 bg-white border border-ink-black/20 font-serif text-xs italic">#{trait}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-l border-dashed border-[#ccc] pl-6 hidden md:block">
                    <h4 className="text-official-red font-bold text-[10px] uppercase tracking-widest text-center">人格指纹 (RADAR PROFILE)</h4>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                          <PolarGrid stroke="#ccc" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 8 }} />
                          <Radar name="用户得分" dataKey="A" stroke="#A31E22" fill="#A31E22" fillOpacity={0.6} />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-[#eee] pt-6 flex justify-between items-center">
                  <div className="official-seal w-28 h-28">汉东省反贪总局<br />审批结论专用章</div>
                  <button onClick={handleRestart} className="px-8 py-3 bg-ink-black text-white font-bold uppercase tracking-[2px] text-xs hover:bg-official-red transition-all active:scale-95">重新审查</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
