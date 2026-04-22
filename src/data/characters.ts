import { Character } from '../types';

export const characters: Character[] = [
  {
    id: 'hou-liangping',
    name: '侯亮平',
    title: '汉东省检察院反贪局局长',
    description: '充满正义感的业务骨干，偶尔有点小清高。你追求真理与法纪的完美契合，在复杂的博弈中，你是那颗永不偏航的棋子。你的底色是正直，是那种为了信仰不顾一切的锐气。',
    suggestion: '正义的路上不仅需要利剑，更需要洞察人心的温度。',
    famousQuote: '“你大把大把捞黑钱的时候，怎么没想过自己是农民的儿子？”',
    image: 'https://picsum.photos/seed/hou/400/600',
    traits: ['正直', '睿智', '业务骨干'],
    vector: { powerAmbition: 6, ruleIntegrity: 8, socialResponsibility: 8, emotionalDetachment: 6, strategicManeuvering: 7 }
  },
  {
    id: 'li-dakang',
    name: '李达康',
    title: '京州市委书记',
    description: '你是一个在戈壁滩上狂奔的人。你爱惜羽毛，更爱惜你的事业。你不需要朋友，也不需要理解，你只需要目标在前方不断延伸。你的成功是孤独的，因为你的身后空无一人。',
    suggestion: '别忘了，GDP 之外，还有人间烟火。',
    famousQuote: '“以前人民群众不相信政府做坏事，现在人民群众不相信政府做好事了。”',
    image: 'https://picsum.photos/seed/li/400/600',
    traits: ['极致实干', '目标感强', '孤独行者'],
    vector: { powerAmbition: 9, ruleIntegrity: 6, socialResponsibility: 9, emotionalDetachment: 8, strategicManeuvering: 7 }
  },
  {
    id: 'gao-yuliang',
    name: '高育良',
    title: '汉东省委副书记',
    description: '你是权力的建筑师，擅长在最复杂的地基上构建平衡。你儒雅、得体，说话滴水不漏，总能在博弈中找到那条最优雅的退路。你赢了局势，却在深夜的盆景前，感到了某种深刻的寒意。',
    suggestion: '逻辑再完美，也掩盖不了内心的真实。',
    famousQuote: '“中国目前的政治生态，就是一把手几乎拥有绝对的权力。”',
    image: 'https://picsum.photos/seed/gao/400/600',
    traits: ['精致利己', '儒雅缜密', '博弈大师'],
    vector: { powerAmbition: 8, ruleIntegrity: 4, socialResponsibility: 5, emotionalDetachment: 6, strategicManeuvering: 10 }
  },
  {
    id: 'qi-tongwei',
    name: '祁同伟',
    title: '汉东省公安厅厅长',
    description: '你曾从泥泞中爬起，所以发誓再也不回地狱。你把人生看作一场豪赌，筹码是你的自尊与信仰。你渴望胜天半子，因为你太想向这个世界证明：你曾活得有尊严。',
    suggestion: '当你在凝视深渊时，深渊也在凝视你。',
    famousQuote: '“去你妈的老天爷，我就是要胜天半子！”',
    image: 'https://picsum.photos/seed/qi/400/600',
    traits: ['孤傲野心', '执着反击', '胜天半子'],
    vector: { powerAmbition: 10, ruleIntegrity: 2, socialResponsibility: 3, emotionalDetachment: 4, strategicManeuvering: 8 }
  },
  {
    id: 'chen-yanshi',
    name: '陈岩石',
    title: '原省检察院常务副检察长',
    description: '你是那块最硬的骨头。哪怕退休了，哪怕没有了编制，你依然把自己当成群众的哨兵。你不需要头衔来装点身份，因为你的名字本身，就代表了某种永不熄灭的公平。',
    suggestion: '在这个复杂的时代，你的纯粹是一种奢侈品。',
    famousQuote: '“什么叫特权？在那个年代，共产党员的特权就是扛炸药包！”',
    image: 'https://picsum.photos/seed/chen/400/600',
    traits: ['理想主义', '群众哨兵', '永恒火种'],
    vector: { powerAmbition: 1, ruleIntegrity: 6, socialResponsibility: 10, emotionalDetachment: 2, strategicManeuvering: 3 }
  },
  {
    id: 'lu-yike',
    name: '陆亦可',
    title: '反贪局一处处长',
    description: '你是一把冷色调的标尺。在人情社会里，你像是一个‘异类’，坚持着那点近乎倔强的程序正义。你不懂圆滑，不屑投机，你的底色是如冰雪般的透明与坚定。',
    suggestion: '偶尔流露的一点温情，会让你更有力量。',
    famousQuote: '“就算是他们的天下，我去了之后也得给他们的天捅个窟窿！”',
    image: 'https://picsum.photos/seed/lu/400/600',
    traits: ['程序正义', '刚直不阿', '纯粹守望'],
    vector: { powerAmbition: 5, ruleIntegrity: 10, socialResponsibility: 7, emotionalDetachment: 9, strategicManeuvering: 4 }
  },
  {
    id: 'sun-liancheng',
    name: '孙连城',
    title: '光明区区长',
    description: '你不是在逃避，你只是看透了权力的虚无。在繁琐平庸的报表中，你内心深处藏着一片浩瀚的星空。你不跑不送，也不求进步，因为你明白，这世间纷扰在百亿年的时空面前，不过是微小的尘埃。',
    suggestion: '小心，别让“佛系”变成对他人的伤害。',
    famousQuote: '“宇宙浩渺，时空无限。人类算什么？李达康算什么？”',
    image: 'https://picsum.photos/seed/sun/400/600',
    traits: ['宇宙看客', '佛系超脱', '自我放逐'],
    vector: { powerAmbition: 1, ruleIntegrity: 8, socialResponsibility: 1, emotionalDetachment: 9, strategicManeuvering: 3 }
  },
  {
    id: 'yi-xuexi',
    name: '易学习',
    title: '吕州市高新区党工委书记',
    description: '踏实的实干家，不求名利，只求问心无愧。你是默默耕耘的黄牛，也是最有风骨的实干家。你不需要掌声，也不需要瞩目，你只求在任一方、守土有责。',
    suggestion: '踏实坚韧是你的底色，但也请记得保护好自己那颗赤诚的心。',
    famousQuote: '“这么多年了，我易学习就没指望过他李达康提提拔我！”',
    image: 'https://picsum.photos/seed/yi/400/600',
    traits: ['踏实勤恳', '问心无愧', '实干风骨'],
    vector: { powerAmbition: 4, ruleIntegrity: 8, socialResponsibility: 10, emotionalDetachment: 6, strategicManeuvering: 6 }
  },
  {
    id: 'sha-ruijin',
    name: '沙瑞金',
    title: '汉东省委书记',
    description: '你是绝对的控局者。你站得比所有人都高，看问题总是直击本质。你不轻易表态，但一旦出手便具有降维打击的压迫感。在复杂的博弈中，你是制定规则而不是遵守规则的人。',
    suggestion: '绝对的理智有时会让人觉得高处不胜寒，偶尔展示一点破绽会让你更有亲和力。',
    famousQuote: '“上不封顶，下不保底，一查到底！”',
    image: 'https://picsum.photos/seed/sha/400/600',
    traits: ['降维打击', '绝对权威', '最高裁决'],
    vector: { powerAmbition: 8, ruleIntegrity: 9, socialResponsibility: 8, emotionalDetachment: 8, strategicManeuvering: 10 }
  },
  {
    id: 'ji-changming',
    name: '季昌明',
    title: '汉东省检察院检察长',
    description: '你是职场上的“不粘锅”与生存大师。你极度谨慎，将“程序正义”作为保护自己的最强铠甲。你不做出头鸟，也绝不轻易得罪人，擅长在各种神仙打架的夹缝中安然退休。',
    suggestion: '在规则之内保护自己是智慧，但在关键时刻缺乏担当可能会错失真正的成就。',
    famousQuote: '“办案要讲究程序，没有手续，咱们一步都不能动！”',
    image: 'https://picsum.photos/seed/ji/400/600',
    traits: ['程序盾牌', '职场生存大师', '绝对谨慎'],
    vector: { powerAmbition: 4, ruleIntegrity: 10, socialResponsibility: 6, emotionalDetachment: 9, strategicManeuvering: 8 }
  },
  {
    id: 'zhao-donglai',
    name: '赵东来',
    title: '京州市公安局局长',
    description: '你是那种让人又爱又恨的“兵痞”型干将。你性格粗犷但心思细腻，为了心中的正义和保护自己的人，你敢于打破常规，甚至不惜游走在灰色的边缘。',
    suggestion: '你的江湖气是你最大的魅力，但也容易成为别人攻击你的把柄。',
    famousQuote: '“如果是头狼，就算把牙拔了，他也还会咬人！”',
    image: 'https://picsum.photos/seed/zhaod/400/600',
    traits: ['硬汉干将', '粗中有细', '江湖义气'],
    vector: { powerAmbition: 6, ruleIntegrity: 6, socialResponsibility: 8, emotionalDetachment: 5, strategicManeuvering: 7 }
  },
  {
    id: 'gao-xiaoqin',
    name: '高小琴',
    title: '山水集团董事长',
    description: '你是拥有顶级情商的致命猎手。你从底层杀出一条血路，极度务实且没有任何道德洁癖。你深谙人性弱点，擅长用最柔软的身段，做最狠辣的资源置换。',
    suggestion: '过度依赖利益编织的网，在遇到真正的风暴时往往最先破裂。',
    famousQuote: '“大家在这个世上混，谁都不容易。我们输在起跑线上，就只能拿命拼！”',
    image: 'https://picsum.photos/seed/gaox/400/600',
    traits: ['顶级情商', '慕强攀附', '八面玲珑'],
    vector: { powerAmbition: 9, ruleIntegrity: 1, socialResponsibility: 2, emotionalDetachment: 8, strategicManeuvering: 9 }
  },
  {
    id: 'zhao-dehan',
    name: '赵德汉',
    title: '国家部委某处长',
    description: '你是被贪婪吞噬的胆小鬼。你身处要职却缺乏匹配的心智，你将金钱视为填补内心自卑的唯一稻草。你只敢敛财却不敢享受，活在一个虚伪且充满恐惧的躯壳里。',
    suggestion: '你拼命囤积的安全感，最终只会变成压垮你的大山。',
    famousQuote: '“我一分钱都没花！不敢花啊！我家祖祖辈辈是农民，穷怕了！”',
    image: 'https://picsum.photos/seed/zhaode/400/600',
    traits: ['伪善掩饰', '心理补偿', '守财奴'],
    vector: { powerAmbition: 8, ruleIntegrity: 2, socialResponsibility: 2, emotionalDetachment: 6, strategicManeuvering: 2 }
  }
];
