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

  // 1. 性格放大器逻辑：将分数的离散度拉开，避免全员“中庸”
  const amplifiedVector = useMemo(() => {
    const rawVector = DIMENSIONS.map(d => dimensionScores[d]);
    const avg = rawVector.reduce((a, b) => a + b, 0) / 5;
    // 关键逻辑：将差异放大 3 倍，确保极端性格（如祁同伟、高小琴）能够浮出水面
    return rawVector.map(v => avg + (v - avg) * 3);
  }, [dimensionScores]);

  // 2. 核心算法：欧几里得距离计算
  const calculateDistance = (vecA: number[], vecB: number[]) => {
    return Math.sqrt(vecA.reduce((sum, val, i) => sum + Math.pow(val - vecB[i] * 10, 2), 0));
  };

  // 3. 计算匹配结果
  const resultData = useMemo(() => {
    if (screen !== 'result') return null;

    let minDistance = Infinity;
    let winnerId = characters[0].id;

    characters.forEach(char => {
      const charVector = DIMENSIONS.map(d => char.vector[d]);
      const distance = calculateDistance(amplifiedVector, charVector);
      if (distance < minDistance) {
        minDistance = distance;
        winnerId = char.id;
      }
    });

    const character = characters.find(c => c.id === winnerId) || characters[0];
    
    // 契合度计算逻辑
    let percentage = Math.round(100 - (minDistance / 2));
    if (percentage > 99) percentage = 99;
    if (percentage < 60) percentage = 60 + Math.floor(Math.random() * 10);

    return { character, matchPercentage: percentage };
  }, [amplifiedVector, screen]);

  // 4. 雷达图专用数据
  const radarData = useMemo(() => {
    return DIMENSIONS.map((d, i) => ({
      subject: DIMENSION_NAMES[d],
      // 这里的 A 采用了放大后的数据，视觉张力更强
      A: Math.max(0, Math.min(100, amplifiedVector[i])),
      fullMark: 100,
    }));
  }, [amplifiedVector]);

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

  const handleRestart = () => {
    setScreen('start');
  };

  // 🌟 开发者暗门：10000 次随机混沌测试
  const handleSimulate = () => {
    const tally: Record<string, number> = {};
    characters.forEach(c => tally[c.name] = 0);

    for (let i = 0; i < 10000; i++) {
      const tempScores = { ...INITIAL_SCORES };
      questions.forEach(q => {
        const randOpt = q.options[Math.floor(Math.random() * q.options.length)];
        Object.entries(randOpt.scores).forEach(([d, s]) => {
          tempScores[d as Dimension] += s || 0;
        });
      });

      const rawVec = DIMENSIONS.map(d => tempScores[d]);
      const avg = rawVec.reduce((a, b) => a + b, 0) / 5;
      const ampVec = rawVec.map(v => avg + (v - avg) * 3);

      let minDist = Infinity;
      let winId = characters[0].id;
      characters.forEach(char => {
        const charVec = DIMENSIONS.map(d => char.vector[d]);
        const dist = calculateDistance(ampVec, charVec);
        if (dist < minDist) {
          minDist = dist;
          winId = char.id;
        }
      });
      const winner = characters.find(c => c.id === winId);
      if (winner) tally[winner.name]++;
    }

    let report = "✅ 性格放大器已激活！10000 次随机模拟结果：\n\n";
    Object.entries(tally).sort((a, b) => b[1] - a[1]).forEach(([name, count]) => {
      report += `[${name}]: ${count}次 (${(count / 100).toFixed(2)}%)\n`;
    });
    alert(report);
  };

  return (
    <div className="min-h-screen bg-[#2C2C2C] flex items-center justify-center p-4">
      <div className="relative dossier-container w-full max-w-[960px] h-full min-h-[700px] dossier-folder p-5 flex">
        <div className="absolute right-[-40px] top-[100px] dossier-tab">案件卷宗：2017-001</div>
        <div className="page-content paper-sheet w-full h-full p-10 md:p-16 flex flex-col relative overflow-hidden">
          <AnimatePresence mode="wait">
            {screen === 'start' && (
              <motion.div key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col">
                <div className="text-center border-b-2 border-official-red pb-5 mb-10">
                  <h1 className="text-2xl md:text-3xl font-serif font-bold text-official-red tracking-[2px] mb-2">停止仰望星空！<br />来测测你离孙连城的“境界”还有多远？</h1>
                </div>
                <div className="flex flex-col items-center justify-center flex-grow space-y-8 text-center">
                  <div className="w-24 h-24 bg-official-red/10 rounded-full flex items-center justify-center border-2 border-official-red relative">
                    <span className="text-official-red font-black text-2xl">证</span>
                  </div>
                  <p className="text-gray-600 leading-relaxed italic max-w-md">“你是那把铁面无私的冷色标尺，还是胸怀宇宙的观测者？”</p>
                  <div className="flex flex-col items-center space-y-3 w-full">
                    <button onClick={handleStart} className="w-full max-w-xs py-4 bg-official-red text-white font-bold tracking-[4px] rounded shadow-lg hover:bg-official-red/90 transition-all active:scale-95">开始审查</button>
                    <button onClick={handleSimulate} className="text-[10px] text-gray-400 hover:text-official-red transition-colors underline decoration-dashed">[执行 10000 次压力测试]</button>
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'test' && (
              <motion.div key="test" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-grow flex flex-col">
                <div className="flex justify-between items-center text-xs text-text-muted mb-8 border-b border-dashed border-[#ccc] pb-2 font-sans tracking-wider">
                  <span>编号：HD-H-2026-0417</span><span>当前环节：情境抉择</span><span>{currentQuestionIdx + 1} / {questions.length}</span>
                </div>
                <div className="flex-grow space-y-8">
                  <div className="space-y-4">
                    <div className="text-lg font-bold text-official-red">第 {currentQuestionIdx + 1} 题：</div>
                    <h2 className="text-2xl font-serif font-semibold text-ink-black leading-snug">{questions[currentQuestionIdx].text}</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {questions[currentQuestionIdx].options.map((option, idx) => (
                      <button key={idx} onClick={() => handleAnswer(option)} className="form-option p-5 text-left flex items-start group relative">
                        <span className="w-8 h-8 border border-ink-black flex items-center justify-center shrink-0 mr-4 font-bold text-sm group-hover:bg-official-red group-hover:text-white transition-all">{String.fromCharCode(65 + idx)}</span>
                        <span className="text-base text-ink-black mt-0.5 leading-relaxed">{option.text}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {screen === 'result' && resultData && (
              <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-grow flex flex-col">
                <div className="text-center border-b-2 border-official-red pb-5 mb-10">
                  <h1 className="text-3xl font-serif font-bold text-official-red tracking-[4px] mb-2 uppercase">审查结论意见书</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_250px] gap-8 flex-grow">
                  <div className="space-y-6">
                    <div className="aspect-[3/4] bg-white border border-[#D1C9BC] p-2 relative shadow-inner">
                      <img src={resultData.character.image} alt={resultData.character.name} className="w-full h-full object-cover grayscale brightness-90 contrast-125" referrerPolicy="no-referrer" />
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-serif font-black text-ink-black border-b-2 border-official-red inline-block mb-1">{resultData.character.name}</div>
                      <p className="text-xs text-text-muted font-bold tracking-widest uppercase">审查匹配对象</p>
                    </div>
                  </div>
                  <div className="space-y-6 py-2">
                    <div className="grid grid-cols-2 gap-4 border-b border-dashed border-[#ccc] pb-4 text-xs">
                      <div><span className="text-text-muted font-bold block mb-1">党政职务</span><span className="text-ink-black text-sm">{resultData.character.title}</span></div>
                      <div><span className="text-text-muted font-bold block mb-1">灵魂契合度</span><span className="text-official-red font-black text-lg">{resultData.matchPercentage}%</span></div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-official-red font-bold text-sm border-l-4 border-official-red pl-3">核心格调分析</h4>
                      <p className="text-ink-black text-sm leading-relaxed font-serif text-justify">{resultData.character.description}</p>
                    </div>
                    <div className="p-4 bg-[#F5F2EA] border border-[#D1C9BC] italic relative">
                      <div className="absolute -top-2.5 left-4 bg-paper-bg px-2 text-[8px] text-text-muted uppercase font-bold">出圈座右铭</div>
                      <span className="text-lg text-ink-black leading-relaxed">{resultData.character.famousQuote}</span>
                    </div>
                  </div>
                  <div className="space-y-4 border-l border-dashed border-[#ccc] pl-6 hidden md:block">
                    <h4 className="text-official-red font-bold text-[10px] text-center">人格指纹 (RADAR PROFILE)</h4>
                    <div className="h-[200px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                          <PolarGrid stroke="#ccc" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 8 }} />
                          <Radar name="特征" dataKey="A" stroke="#A31E22" fill="#A31E22" fillOpacity={0.6} />
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
