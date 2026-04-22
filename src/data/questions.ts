import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 1,
    text: '如果你进入一个新团队，你最希望在同事心中建立什么样的第一印象？',
    options: [
      { text: '一个拥有绝对专业权威，凡事追求程序正义的专家。', scores: { ruleIntegrity: 2 } },
      { text: '一个雷厉风行，能迅速搞定复杂局面的强势领导者。', scores: { powerAmbition: 2, strategicManeuvering: 1 } },
      { text: '一个温和务实，愿意蹲在基层解决具体困难的执行者。', scores: { socialResponsibility: 2 } },
      { text: '一个守本分、不惹事，只求在岗位上平稳度日的透明人。', scores: { powerAmbition: -2, socialResponsibility: -1 } }
    ]
  },
  {
    id: 2,
    text: '面对一个注定无法完成的KPI（任务目标），你的首选策略是：',
    options: [
      { text: '孤注一掷，哪怕违规操作也要把结果拿回来。', scores: { powerAmbition: 2, ruleIntegrity: -2 } },
      { text: '向上级如实反馈风险，如果上级不听，就按规章制度办事，不求有功但求无过。', scores: { ruleIntegrity: 2, emotionalDetachment: 1 } },
      { text: '动用人脉关系进行多方协调，试图通过利益互换来化解考核指标。', scores: { strategicManeuvering: 2, ruleIntegrity: -1 } },
      { text: '既然努力也没用，不如放平心态，把精力转到个人爱好上。', scores: { powerAmbition: -2, socialResponsibility: -2 } }
    ]
  },
  {
    id: 3,
    text: '当你发现一个流程上的漏洞，可能导致效率低下，但能确保绝对不出错，你会：',
    options: [
      { text: '为了效率，带头简化流程，出了问题自己负责。', scores: { powerAmbition: 1, ruleIntegrity: -2 } },
      { text: '坚持原有流程，认为程序正义是保护团队的唯一手段。', scores: { ruleIntegrity: 2 } },
      { text: '向上反映，但在正式修改意见下来前，绝不私自变通。', scores: { socialResponsibility: 1, strategicManeuvering: 1 } },
      { text: '这种事不该我操心，假装没看见。', scores: { socialResponsibility: -2 } }
    ]
  },
  {
    id: 4,
    text: '你的竞争对手因为一个微小的失误被抓住把柄，你会：',
    options: [
      { text: '铁面无私，第一时间向上级汇报或按规定处理。', scores: { ruleIntegrity: 1, emotionalDetachment: 2 } },
      { text: '留着这个筹码，在最关键的利益博弈时刻再抛出来。', scores: { strategicManeuvering: 3 } },
      { text: '私下提醒对方，希望对方能以此为戒并承你的情。', scores: { emotionalDetachment: -1, strategicManeuvering: 1 } },
      { text: '事不关己，只要不烧到我身上，他升迁或倒台都无所谓。', scores: { powerAmbition: -1 } }
    ]
  },
  {
    id: 5,
    text: '在处理一份紧急的民生投诉单时，由于系统原因无法录入，你会：',
    options: [
      { text: '亲自去现场处理，先解决老百姓的问题，回头再补手续。', scores: { socialResponsibility: 3, ruleIntegrity: -1 } },
      { text: '告知投诉者系统坏了，请对方等系统修好了再按流程来。', scores: { ruleIntegrity: 2, emotionalDetachment: 1 } },
      { text: '找熟悉系统操作的人看看能不能开个“绿灯”，或者托关系特事特办。', scores: { strategicManeuvering: 2, ruleIntegrity: -1 } },
      { text: '只要我不点开那张单子，就不算我迟延处理。', scores: { socialResponsibility: -3 } }
    ]
  },
  {
    id: 6,
    text: '你如何看待职场中的“站队”现象？',
    options: [
      { text: '非常反感，只看业务能力和法律准绳。', scores: { ruleIntegrity: 2, strategicManeuvering: -1 } },
      { text: '是必要之恶，通过平衡各方势力，才能真正干成大事。', scores: { strategicManeuvering: 2 } },
      { text: '必须选择最有胜算的一方，那是实现个人抱负的捷径。', scores: { powerAmbition: 2 } },
      { text: '追求绝对的职业独立，不参与任何派系竞争，只关注个人边界的安稳。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 7,
    text: '辛苦工作了一周，周末突然接到上级通知要开一个非紧急的会议，你会：',
    options: [
      { text: '虽然内心排斥，但表现积极，认为这是展示态度的机会。', scores: { powerAmbition: 2 } },
      { text: '按时参加，但全程保持沉默，心思已经飘到了自家的阳台或兴趣上。', scores: { powerAmbition: -1, socialResponsibility: -1 } },
      { text: '直接请假，理由充分且合规，不给对方留下话柄。', scores: { ruleIntegrity: 1, emotionalDetachment: 1 } },
      { text: '毫无怨言，认为只要是为了集体利益，休息时间可以牺牲。', scores: { socialResponsibility: 2 } }
    ]
  },
  {
    id: 8,
    text: '在决定一项重大利益分配时，一个曾经提拔过你的老领导向你打了声招呼，你会：',
    options: [
      { text: '坚决拒绝，甚至因此与老领导断绝往来。', scores: { ruleIntegrity: 3, emotionalDetachment: 3 } },
      { text: '非常纠结，试图在合规范围内给老领导一个体面的交代。', scores: { emotionalDetachment: -2, strategicManeuvering: 1 } },
      { text: '只要不犯大错，一定会投桃报李，认为做人不能忘本。', scores: { emotionalDetachment: -3 } },
      { text: '向上级领导汇报此事，让更高层的人来做这个得罪人的决定。（注：典型利己策略）', scores: { strategicManeuvering: 2 } }
    ]
  },
  {
    id: 9,
    text: '关于“职业成就”，你内心深处最渴望达到的境界是：',
    options: [
      { text: '获得足以重塑局面的影响力，通过资源的高效整合，打下属于自己的时代印记。', scores: { powerAmbition: 3 } },
      { text: '深耕具体业务，通过实实在在的痛点解决，看到自身劳动转化为社会福祉。', scores: { socialResponsibility: 3 } },
      { text: '在职业上升过程中保持品格的绝对自洽，无论环境如何变迁始终恪守程序边界。', scores: { ruleIntegrity: 3 } },
      { text: '实现财务与精神的双重独立，在达到职业顶峰或退场后，能从容回归个人生活的本真。', scores: { powerAmbition: -3 } }
    ]
  },
  {
    id: 10,
    text: '当你在会议中被上级当众误解或批评时，你的第一反应是：',
    options: [
      { text: '哪怕顶撞也要当场说清真相，不能接受任何名誉受损。', scores: { ruleIntegrity: 1, strategicManeuvering: -1 } },
      { text: '暂时忍耐，会后找机会用委婉的方式沟通或交换利益。', scores: { strategicManeuvering: 2 } },
      { text: '深深反省自己哪里没做好，哪怕不是自己的错也先承担下来。', scores: { socialResponsibility: 1, emotionalDetachment: -1 } },
      { text: '无所谓，只要不影响我的工资和下班时间，你说什么都行。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 11,
    text: '你负责的项目突然发生意外事故，媒体已经在路上，你的第一反应是：',
    options: [
      { text: '迅速封锁现场，在没想好万全的公关口径前拒绝任何采访。', scores: { strategicManeuvering: 2, socialResponsibility: -1 } },
      { text: '第一时间赶往现场救灾，认为解决人的问题比形象公关更重要。', scores: { socialResponsibility: 3, ruleIntegrity: -1 } },
      { text: '既然我不是第一责任人，我会按程序逐级上报，等待上级指令再行动。', scores: { ruleIntegrity: 1, powerAmbition: -2 } },
      { text: '借故离开办公室去处理其他紧急事务，让副手去现场顶住。', scores: { socialResponsibility: -3, powerAmbition: -1 } }
    ]
  },
  {
    id: 12,
    text: '你的直接上级要求你签署一份明显违规、但对单位短期业绩极有帮助的文件，你会：',
    options: [
      { text: '坚决不签，即使这意味着你的职业生涯可能就此停滞。', scores: { ruleIntegrity: 3, powerAmbition: -2 } },
      { text: '签，但会留下相关的沟通过程证据，确保将来出事时能自保。', scores: { strategicManeuvering: 2, ruleIntegrity: -2 } },
      { text: '婉转地指出其中的风险，并建议上级换一种更隐蔽、合规的方式来达成目的。', scores: { strategicManeuvering: 3 } },
      { text: '向上级的上级秘密举报，以此作为自己晋升的投名状。', scores: { powerAmbition: 3, emotionalDetachment: 2 } }
    ]
  },
  {
    id: 13,
    text: '两个部门在争夺一个重点项目的控制权，而你恰好手握关键的决定权，你会：',
    options: [
      { text: '谁能给我的部门带来最大利益，我就支持谁，这叫资源互换。', scores: { powerAmbition: 2 } },
      { text: '谁的方案更符合长远规则和程序逻辑，我就选谁，不看人情。', scores: { ruleIntegrity: 2, emotionalDetachment: 1 } },
      { text: '左右逢源，试图让双方坐下来达成一个“平衡方案”，谁也不得罪。', scores: { strategicManeuvering: 3 } },
      { text: '迟迟不表态，看哪一边的胜算更大，或者等大领导拍板。', scores: { powerAmbition: -1, strategicManeuvering: 1 } }
    ]
  },
  {
    id: 14,
    text: '当你发现你的恩师或多年好友可能涉及一起严重的违纪案件时，你会：',
    options: [
      { text: '亲自去调查，争取在组织发现前劝他自首，争取宽大处理。', scores: { emotionalDetachment: -2, socialResponsibility: 1 } },
      { text: '避嫌，请求调离相关岗位，既不帮他也不害他。', scores: { ruleIntegrity: 1, strategicManeuvering: 1 } },
      { text: '铁面无私，作为主导者进行彻查，认为正义不分亲疏。', scores: { emotionalDetachment: 3, ruleIntegrity: 2 } },
      { text: '利用自己的信息优势，帮他清理痕迹或提供规避建议。', scores: { emotionalDetachment: -3, ruleIntegrity: -3 } }
    ]
  },
  {
    id: 15,
    text: '单位进行年终末位淘汰，你需要裁掉一名业务出色但性格刚直、经常顶撞你的下属，你会：',
    options: [
      { text: '照裁不误，认为团队的服从度和管理成本比个人能力更重要。', scores: { powerAmbition: 2, emotionalDetachment: 1 } },
      { text: '尽力保住他，认为有能力、有风骨的骨干是单位的财富。', scores: { socialResponsibility: 2, powerAmbition: -1 } },
      { text: '找他谈话，以此为筹码要求他未来必须对自己绝对忠诚。', scores: { strategicManeuvering: 3 } },
      { text: '把这个得罪人的决定推给人事部门或上级，自己表现出无奈的样子。', scores: { strategicManeuvering: 1, socialResponsibility: -1 } }
    ]
  },
  {
    id: 16,
    text: '在一次涉及部门生存的关键会议上，由于顶层设计存在明显偏差，可能导致一线利益受损，你会：',
    options: [
      { text: '坚持原则导向，即使面对高层压力也需明确指出方案缺陷，确保底层逻辑的闭环。', scores: { socialResponsibility: 2, ruleIntegrity: 1 } },
      { text: '采取弹性策略，在维护管理层权威的前提下，于执行阶段寻求局部修正与利益平衡。', scores: { strategicManeuvering: 2, socialResponsibility: 1 } },
      { text: '展现高度一致的执行力，快速寻找方案的合理化支点，作为最坚定的推动者辅助决策落地。', scores: { powerAmbition: 2, socialResponsibility: -2 } },
      { text: '恪守“依令行事”的边界，将决策权与后果交由上级，利用现有程序的复杂性进行消极防御。', scores: { powerAmbition: -1, strategicManeuvering: 1 } }
    ]
  },
  {
    id: 17,
    text: '如果你的职业生涯遭遇重大挫折（如被边缘化或下放到偏远岗位），你的态度是：',
    options: [
      { text: '认命，正好借此机会远离纷争，过好自己的小日子。', scores: { powerAmbition: -3, socialResponsibility: -1 } },
      { text: '愤愤不平，利用一切机会寻找重回权力中心的机会，准备反击。', scores: { powerAmbition: 3 } },
      { text: '踏踏实实做好眼下的事，相信只要做出实绩，金子总会发光。', scores: { socialResponsibility: 2, powerAmbition: -1 } },
      { text: '深度反思自己的政治失误，开始结交能帮自己说话的贵人。', scores: { strategicManeuvering: 2 } }
    ]
  },
  {
    id: 18,
    text: '你发现同事在利用职务之便谋取一点蝇头小利，虽不违法但违反纪律，你会：',
    options: [
      { text: '视而不见，认为水至清则无鱼，没必要为了这点小事坏了关系。', scores: { emotionalDetachment: -1, ruleIntegrity: -1 } },
      { text: '严厉警告，要求其立刻停止，否则将向有关部门反映。', scores: { ruleIntegrity: 2 } },
      { text: '既然他能拿，我也想办法分一杯羹，大家都在一条船上才安全。', scores: { ruleIntegrity: -3, strategicManeuvering: 1 } },
      { text: '记录下来但不发作，作为未来制衡该同事的一个筹码。', scores: { strategicManeuvering: 3 } }
    ]
  },
  {
    id: 19,
    text: '面对群众的集体诉求，但上级给出的解决资金有限，你会：',
    options: [
      { text: '自筹资金或向上级死磕，甚至不惜得罪领导也要解决群众难题。', scores: { socialResponsibility: 3, powerAmbition: -2 } },
      { text: '把现有的资金平均分配，哪怕每个人只能拿到一点点，求个表面太平。', scores: { strategicManeuvering: 2, socialResponsibility: -1 } },
      { text: '优先解决闹得最凶的人，通过“息事宁人”来维持表面秩序。', scores: { strategicManeuvering: 2, ruleIntegrity: -1 } },
      { text: '向群众解释政策困难，反复强调程序，只要我按程序解释了，解决不了也不是我的错。', scores: { ruleIntegrity: 2, socialResponsibility: -2 } }
    ]
  },
  {
    id: 20,
    text: '当你终于获得一个可以扳倒你多年政敌的机会，但证据链中有一环需要你违规获取，你会：',
    options: [
      { text: '为了正义（或胜利），不择手段，先拿下来再说。', scores: { powerAmbition: 2, ruleIntegrity: -3 } },
      { text: '宁可放弃这次机会，也要守住法律和程序的底线。', scores: { ruleIntegrity: 3 } },
      { text: '暗示第三方去操作，确保自己身上干干净净，不留下任何把柄。', scores: { strategicManeuvering: 3 } },
      { text: '犹豫不决，直到机会白白流失，最后安慰自己这就是命。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 21,
    text: '当你通过多年努力终于获得了一定的社会地位，你会如何对待那些还在底层挣扎、且有求于你的远房亲戚？',
    options: [
      { text: '只要不违反大原则，能帮则帮，甚至会主动利用职权为他们谋求一些出路。', scores: { emotionalDetachment: -3, strategicManeuvering: 1 } },
      { text: '坚决拒绝任何越过红线的要求，给点钱可以，但绝不挪用公权力。', scores: { ruleIntegrity: 3, emotionalDetachment: 2 } },
      { text: '表现得非常客气，但用一套官场辞令让他们知难而退，不留下任何把柄。', scores: { strategicManeuvering: 2, emotionalDetachment: 1 } },
      { text: '根本不想见他们，觉得这些琐事纯属浪费我钻研个人爱好的时间。', scores: { powerAmbition: -2, socialResponsibility: -2 } }
    ]
  },
  {
    id: 22,
    text: '关于“金钱”与“生活品质”，你最真实的看法是：',
    options: [
      { text: '权力带来的尊严远比金钱重要，我可以生活朴素，但必须受人敬畏。', scores: { powerAmbition: 3, ruleIntegrity: 2 } },
      { text: '金钱是改变命运、填补内心安全感的唯一工具，为此可以冒一定风险。', scores: { powerAmbition: 2, ruleIntegrity: -3 } },
      { text: '追求极致的雅致和品味，享受知识分子式的优越感，但绝不显山露水。', scores: { strategicManeuvering: 2 } },
      { text: '只要生活过得去就行，我对奢侈品毫无欲望，平淡才是真。', scores: { powerAmbition: -3 } }
    ]
  },
  {
    id: 23,
    text: '在选择伴侣或亲密关系时，你最看重对方的哪点特质？',
    options: [
      { text: '能够与我志同道合，甚至在事业和理想上互为支撑。', scores: { socialResponsibility: 2 } },
      { text: '能够为我的事业提供助力或背景，哪怕情感上淡薄一些也可以接受。', scores: { powerAmbition: 3, strategicManeuvering: 1 } },
      { text: '对方必须非常独立，互不干涉对方的工作 and 私人空间。', scores: { emotionalDetachment: 2 } },
      { text: '只要能让我回家后彻底放松，不拿琐事烦我，性格平庸一点也没关系。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 24,
    text: '如果你的一项个人业余爱好与你的职业形象严重不符，你会：',
    options: [
      { text: '彻底隐藏这个爱好，只在绝对隐秘的私人空间才表露出来。', scores: { strategicManeuvering: 3 } },
      { text: '并不在意，认为工作和生活应该完全分开，没必要为了形象演戏。', scores: { ruleIntegrity: 1, emotionalDetachment: 2 } },
      { text: '逐渐让这个爱好变得“雅致”化，使其能够融入到我的社交圈层中。', scores: { strategicManeuvering: 2 } },
      { text: '如果工作压力太大，我会为了这个爱好甚至动了辞职或内退的念头。', scores: { powerAmbition: -3 } }
    ]
  },
  {
    id: 25,
    text: '你的孩子在学校和同学发生冲突受了委屈，你发现对方家长是你职场上的有力竞争者，你会：',
    options: [
      { text: '绝对不介入，要求孩子自己解决，避免私人恩怨影响职业博弈。', scores: { emotionalDetachment: 3 } },
      { text: '利用自己的资源或影响力给对方家长一点暗示，让对方主动道歉。', scores: { strategicManeuvering: 2, powerAmbition: 1 } },
      { text: '亲自上门沟通，以理服人，不卑不亢，只论是非不论身份。', scores: { socialResponsibility: 2, ruleIntegrity: 1 } },
      { text: '算了，多一事不如少一事，安慰孩子几句，让他学会忍让。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 26,
    text: '面对“孤独”，你的常态是：',
    options: [
      { text: '在喧嚣的应酬和权力中心寻找存在感，以此掩盖内心的空虚。', scores: { powerAmbition: 2 } },
      { text: '享受孤独，甚至刻意与所有人保持距离，认为这样更安全。', scores: { strategicManeuvering: 2, emotionalDetachment: 2 } },
      { text: '在宏大的知识、物理或哲学领域寻找精神寄托，认为现实琐事过于平庸。', scores: { powerAmbition: -2, socialResponsibility: -1 } },
      { text: '并不孤独，我始终和普通人站在一起，在服务他人中获得满足。', scores: { socialResponsibility: 3 } }
    ]
  },
  {
    id: 27,
    text: '当你发现自己当年的纯真理想与现实的升迁规则发生剧烈冲突时，你会：',
    options: [
      { text: '迅速调整心态，认为只有爬到最高点，才能真正实现最初的理想。', scores: { powerAmbition: 2, strategicManeuvering: 2 } },
      { text: '坚决不向现实妥协，哪怕被冷落、被边缘化也甘之如饴。', scores: { ruleIntegrity: 3, socialResponsibility: 2 } },
      { text: '表面上顺应规则，内心却变得愤世嫉俗，开始在其他领域寻找精神寄托。', scores: { powerAmbition: -2 } },
      { text: '痛苦挣扎，但在诱惑面前，最后还是会选择那条通往权力的捷径。', scores: { powerAmbition: 2, ruleIntegrity: -2 } }
    ]
  },
  {
    id: 28,
    text: '如果你退休后可以总结自己的职业生涯遗产，你最倾向于哪种叙述基调？',
    options: [
      { text: '“不懈进取”：通过卓越的战略决断，在极度匮乏的资源环境中完成了层级重构与自我证明。', scores: { powerAmbition: 3 } },
      { text: '“系统守望”：作为制度的坚定执行者，在漫长的职业生涯中完整捍卫了程序的闭环与公平。', scores: { ruleIntegrity: 3 } },
      { text: '“动态平衡”：在复杂的利益网与多方博弈中，以协调艺术实现了系统稳定与各方利益的公约数。', scores: { strategicManeuvering: 3 } },
      { text: '“独立自保有余”：职业身份仅是一层底色，我更引以为傲的是在组织之外仍保有极其完整且深邃的个人精神世界。', scores: { powerAmbition: -3 } }
    ]
  },
  {
    id: 29,
    text: '你的一个老同学多年后成了大企业家，他想邀请你加入他的公司担任顾问并给出一份惊人的薪水，你会：',
    options: [
      { text: '婉言谢绝，认为现有的岗位虽然钱少，但那是实现社会抱负的平台。', scores: { socialResponsibility: 2 } },
      { text: '考察该公司是否有违规行为，如果没有，会考虑退休后再去发挥余热。', scores: { ruleIntegrity: 2, strategicManeuvering: 1 } },
      { text: '欣然前往，认为人生下半场应该为自己和家人的物质生活考虑了。', scores: { powerAmbition: -1 } },
      { text: '会去，但会利用这个身份作为跳板，建立更深层的权力交换网。', scores: { strategicManeuvering: 2, ruleIntegrity: -2 } }
    ]
  },
  {
    id: 30,
    text: '当你深夜独自一人时，你最担心的事是什么？',
    options: [
      { text: '担心自己现在的地位和财富会像泡沫一样在某天突然破碎。', scores: { strategicManeuvering: 1 } },
      { text: '担心自己一生忙碌，最后却发现对社会、对他人毫无贡献。', scores: { socialResponsibility: 3 } },
      { text: '担心自己被时代抛弃，不再被那个核心圈子所接纳。', scores: { powerAmbition: 2 } },
      { text: '其实没什么担心的，只要没人来打扰我的清静就行。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 31,
    text: '如果你的事业在一夜之间由于某种不可控的宏观因素（如政策剧变或时代终结）彻底崩塌，你会：',
    options: [
      { text: '绝不坐以待毙，即使是在废墟上，也要用尽最后的手段反击，胜天半子。', scores: { powerAmbition: 3, strategicManeuvering: 1 } },
      { text: '坦然接受，认为个人的浮沉在宏大的背景下微不足道，正好过回普通人的日子。', scores: { powerAmbition: -3, strategicManeuvering: 1 } },
      { text: '依然坚守在原地，试图在废墟中尽可能多地救助受损的普通人。', scores: { socialResponsibility: 3, ruleIntegrity: 1 } },
      { text: '隐身幕后，通过对局势的深度预判，寻找最安全、最优雅的退场时机。', scores: { strategicManeuvering: 3 } }
    ]
  },
  {
    id: 32,
    text: '面对一个几乎不可能战胜、且背景极其深厚的“庞然大物”（对手），你的态度是：',
    options: [
      { text: '明知不可为而为之，哪怕以卵击石，也要维护法律和正义的尊严。', scores: { ruleIntegrity: 3, socialResponsibility: 1 } },
      { text: '寻找对方的利益共同体，试图通过游说和妥协，化干戈为玉帛。', scores: { strategicManeuvering: 3, emotionalDetachment: -1 } },
      { text: '既然惹不起，那就彻底远离斗争中心，谁赢了我都跟着谁干活。', scores: { powerAmbition: -2, socialResponsibility: -2 } },
      { text: '忍辱负重，深挖对方的弱点，等待一个可以致命一击的机会。', scores: { strategicManeuvering: 2, powerAmbition: 2 } }
    ]
  },
  {
    id: 33,
    text: '假如你掌握了一个关于真相的关键证据，但公开它会导致你最亲近、最尊敬的人身败名裂，你会：',
    options: [
      { text: '痛苦之后选择公开，认为真相和公义大于私人情感。', scores: { ruleIntegrity: 3, emotionalDetachment: 3 } },
      { text: '为了保护那个人，选择永远埋葬证据，甚至不惜背负骂名。', scores: { emotionalDetachment: -3, ruleIntegrity: -3 } },
      { text: '将证据交给那个人，让他自己决定如何处理，以此了断恩情。', scores: { emotionalDetachment: -2, strategicManeuvering: 2 } },
      { text: '借此机会与那个人达成某种契约，确保双方未来的共同安全。', scores: { strategicManeuvering: 3, powerAmbition: 1 } }
    ]
  },
  {
    id: 34,
    text: '在你看来，一个“真正的英雄”应该具备的最核心品质是：',
    options: [
      { text: '能够承受常人无法忍受的羞辱 and 痛苦，最终改写命运。', scores: { powerAmbition: 2 } },
      { text: '面对权贵和诱惑，始终保持灵魂的纯粹与风骨。', scores: { ruleIntegrity: 3 } },
      { text: '有勇气推翻旧规则，建立一套更高效、更有秩序的新规则。', scores: { powerAmbition: 3, strategicManeuvering: 2 } },
      { text: '在大时代里默默奉献，不留姓名，功成不必在我。', scores: { socialResponsibility: 3, powerAmbition: -3 } }
    ]
  },
  {
    id: 35,
    text: '如果你有一个可以改变过去某个重大决策的机会，你会选择：',
    options: [
      { text: '回到起点，拒绝那次虽然卑微但改变了命运的投机。', scores: { emotionalDetachment: 2, powerAmbition: -2 } },
      { text: '回到巅峰，修正那次导致满盘皆输的微小战略失误。', scores: { strategicManeuvering: 2 } },
      { text: '回到最初，选择一条更平凡但更安稳的人生道路。', scores: { powerAmbition: -3 } },
      { text: '并不想改变什么，我认为所有的宿命都是自己性格的延伸。', scores: { strategicManeuvering: 1 } }
    ]
  },
  {
    id: 36,
    text: '当你身处绝境，唯有牺牲一个无辜者的利益才能换取全局的转机时，你会：',
    options: [
      { text: '坚决不牺牲无辜者，如果全局必须崩塌，那就让它崩塌。', scores: { ruleIntegrity: 3, socialResponsibility: 2 } },
      { text: '认为“成大事者不拘小节”，为了更宏大的目标，必要的牺牲是合理的。', scores: { powerAmbition: 2, socialResponsibility: -2 } },
      { text: '试图寻找第三种方案，即使这种方案会让自己陷入更危险的境地。', scores: { strategicManeuvering: 2, socialResponsibility: 1 } },
      { text: '这种决定太痛苦了，我会选择回避，由命运或上级来拍板。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 37,
    text: '关于“名声”与“实质利益”，你的选择倾向是：',
    options: [
      { text: '哪怕名声狼藉，也要实实在在地掌握核心权力和资源。', scores: { powerAmbition: 2, emotionalDetachment: 2 } },
      { text: '名声重于生命，绝不允许任何人往自己的羽毛上泼一点脏水。', scores: { ruleIntegrity: 2, powerAmbition: 1 } },
      { text: '只要能解决实际的民生痛点，名声好坏由后人去评说。', scores: { socialResponsibility: 3 } },
      { text: '既然名声和利益都很累，不如做一个籍籍无名的闲云野鹤。', scores: { powerAmbition: -3 } }
    ]
  },
  {
    id: 38,
    text: '当你最信任的战友或部下背叛了你，你的反应是：',
    options: [
      { text: '彻底与其切割，并利用制度的力量对其进行毁灭性打击。', scores: { ruleIntegrity: 2, emotionalDetachment: 3 } },
      { text: '试图理解对方背叛的原因，甚至反思自己是否也有负于对方之处。', scores: { emotionalDetachment: -2, socialResponsibility: 1 } },
      { text: '虽然愤怒，但依然维持表面的体面，私下将其边缘化。', scores: { strategicManeuvering: 3 } },
      { text: '哀叹人性的脆弱，从此对外界更加封闭，退回到自己的小世界里。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 39,
    text: '如果上级给你一个机会，可以让你在短期内获得极高的地位，但代价是必须彻底背叛你一直以来的信仰和朋友圈子，你会：',
    options: [
      { text: '拒绝，认为信仰和朋友圈子是一个人的根基。', scores: { ruleIntegrity: 3, emotionalDetachment: -2 } },
      { text: '接受，认为权力是实现信仰的唯一工具，现在暂时的背叛是为了未来更大的正义。', scores: { powerAmbition: 3, strategicManeuvering: 2 } },
      { text: '试图开辟第三条路，既获得地位，又通过某种利益交换保全圈子。', scores: { strategicManeuvering: 3 } },
      { text: '这种高难度的选择太累了，我不想要那个地位，只想维持现状。', scores: { powerAmbition: -2 } }
    ]
  },
  {
    id: 40,
    text: '最后，如果你的人生是一场棋局，你认为自己最像哪颗棋子？',
    options: [
      { text: '将/帅：坐镇中军，运筹帷幄，掌控全局。', scores: { strategicManeuvering: 3 } },
      { text: '卒：勇往直前，绝不回头，哪怕最后过河被牺牲。', scores: { ruleIntegrity: 3, socialResponsibility: 1 } },
      { text: '炮：隔山打牛，擅长借力打力，寻找奇袭机会。', scores: { strategicManeuvering: 2, powerAmbition: 1 } },
      { text: '棋盘本身：冷眼看局中人厮杀，我自岿然不动。', scores: { powerAmbition: -3, socialResponsibility: -1 } }
    ]
  }
];
