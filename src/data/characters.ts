import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'hou-liangping',
    name: '侯亮平',
    title: '汉东省检察院反贪局局长',
    description: '充满正义感的业务骨干，偶尔有点小清高。你追求真理与法纪的完美契合，在复杂的博弈中，你是那颗永不偏航的棋子。你的底色是正直，是那种为了信仰不顾一切的锐气。',
    suggestion: '正义的路上不仅需要利剑，更需要洞察人心的温度。',
    famousQuote: '“我们检察院的权力，是人民给的！”',
    image: 'https://picsum.photos/seed/hou/400/600',
    traits: ['正直', '睿智', '业务骨干'],
    vector: {
      powerAmbition: 7,
      ruleIntegrity: 9,
      socialResponsibility: 8,
      emotionalDetachment: 7,
      strategicManeuvering: 6
    }
  },
  {
    id: 'li-dakang',
    name: '李达康',
    title: '京州市委书记',
    description: '你是一个在戈壁滩上狂奔的人。你爱惜羽毛，更爱惜你的事业。你不需要朋友，也不需要理解，你只需要目标在前方不断延伸。你的成功是孤独的，因为你的身后空无一人。',
    suggestion: '别忘了，GDP 之外，还有人间烟火。',
    famousQuote: '“我的李达康的GDP，谁也别想动！”',
    image: 'https://picsum.photos/seed/li/400/600',
    traits: ['极致实干', '目标感强', '孤独行者'],
    vector: {
      powerAmbition: 10,
      ruleIntegrity: 7,
      socialResponsibility: 9,
      emotionalDetachment: 10,
      strategicManeuvering: 5
    }
  },
  {
    id: 'gao-yuliang',
    name: '高育良',
    title: '汉东省委副书记',
    description: '你是权力的建筑师，擅长在最复杂的地基上构建平衡。你儒雅、得体，说话滴水不漏，总能在博弈中找到那条最优雅的退路。你赢了局势，却在深夜的盆景前，感到了某种深刻的寒意。',
    suggestion: '逻辑再完美，也掩盖不了内心的真实。',
    famousQuote: '“这人呐，最紧要的是要有一颗平常心。”',
    image: 'https://picsum.photos/seed/gao/400/600',
    traits: ['精致利己', '儒雅缜密', '博弈大师'],
    vector: {
      powerAmbition: 8,
      ruleIntegrity: 4,
      socialResponsibility: 5,
      emotionalDetachment: 6,
      strategicManeuvering: 10
    }
  },
  {
    id: 'qi-tongwei',
    name: '祁同伟',
    title: '汉东省公安厅厅长',
    description: '你曾从泥泞中爬起，所以发誓再也不回地狱。你把人生看作一场豪赌，筹码是你的自尊与信仰。你渴望胜天半子，因为你太想向这个世界证明：你曾活得有尊严。',
    suggestion: '当你在凝视深渊时，深渊也在凝视你。',
    famousQuote: '“我就是要胜天半子！”',
    image: 'https://picsum.photos/seed/qi/400/600',
    traits: ['孤傲野心', '执着反击', '胜天半子'],
    vector: {
      powerAmbition: 10,
      ruleIntegrity: 2,
      socialResponsibility: 3,
      emotionalDetachment: 4,
      strategicManeuvering: 8
    }
  },
  {
    id: 'chen-yanshi',
    name: '陈岩石',
    title: '汉东省检察院原常务副检察长',
    description: '你是那块最硬的骨头。哪怕退休了，哪怕没有了编制，你依然把自己当成群众的哨兵。你不需要头衔来装点身份，因为你的名字本身，就代表了某种永不熄灭的公平。',
    suggestion: '在这个复杂的时代，你的纯粹是一种奢侈品。',
    famousQuote: '“共产党员，就要给人民当牛做马。”',
    image: 'https://picsum.photos/seed/chen/400/600',
    traits: ['理想主义', '群众哨兵', '永恒火种'],
    vector: {
      powerAmbition: 1,
      ruleIntegrity: 9,
      socialResponsibility: 10,
      emotionalDetachment: 4,
      strategicManeuvering: 4
    }
  },
  {
    id: 'lu-yike',
    name: '陆亦可',
    title: '汉东省检察院反贪局一处处长',
    description: '你是一把冷色调的标尺。在人情社会里，你像是一个‘异类’，坚持着那点近乎倔强的程序正义。你不懂圆滑，不屑投机，你的底色是如冰雪般的透明与坚定。',
    suggestion: '偶尔流露的一点温情，会让你更有力量。',
    famousQuote: '“只要是贪腐，我就一定要查到底。”',
    image: 'https://picsum.photos/seed/lu/400/600',
    traits: ['程序正义', '刚直不阿', '纯粹守望'],
    vector: {
      powerAmbition: 5,
      ruleIntegrity: 10,
      socialResponsibility: 7,
      emotionalDetachment: 9,
      strategicManeuvering: 4
    }
  },
  {
    id: 'sun-liancheng',
    name: '孙连城',
    title: '京州市光明区区长',
    description: '你不是在逃避，你只是看透了权力的虚无。在繁琐平庸的报表中，你内心深处藏着一片浩瀚的星空。你不跑不送，也不求进步，因为你明白，这世间纷扰在百亿年的时空面前，不过是微小的尘埃。',
    suggestion: '小心，别让“佛系”变成对他人的伤害。',
    famousQuote: '“我胸怀宇宙，这点小事算什么。”',
    image: 'https://picsum.photos/seed/sun/400/600',
    traits: ['宇宙看客', '佛系超脱', '自我放逐'],
    vector: {
      powerAmbition: 1,
      ruleIntegrity: 8,
      socialResponsibility: 1,
      emotionalDetachment: 9,
      strategicManeuvering: 3
    }
  },
  {
    id: 'yi-xuexi',
    name: '易学习',
    title: '吕州市高新区党工委书记',
    description: '踏实的实干家，不求名利，只求问心无愧。你是默默耕耘的黄牛，也是最有风骨的实干家。你不需要掌声，也不需要瞩目，你只求在任一方、守土有责。',
    suggestion: '踏实坚韧是你的底色，但也请记得保护好自己那颗赤诚的心。',
    famousQuote: '“我们干工作的，图的是个心安。”',
    image: 'https://picsum.photos/seed/yi/400/600',
    traits: ['踏实勤恳', '问心无愧', '实干风骨'],
    vector: {
      powerAmbition: 3,
      ruleIntegrity: 9,
      socialResponsibility: 10,
      emotionalDetachment: 8,
      strategicManeuvering: 5
    }
  }
];
