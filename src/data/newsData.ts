import type { NewsCategory, NewsItem } from './types'

export const DYNAMIC_NEWS: NewsItem[] = [
  {
    id: 1,
    category: 'dynamic',
    date: '2026-02',
    title: '论文GGBench被 CVPR 2026 接收，几何生成推理基准相关研究取得进展',
    isFeatured: true,
    img: '/news/GGBench.png',
    content: [
      '团队围绕统一多模态模型的几何生成与推理能力评测，提出 GGBench 几何生成推理基准，为复杂图形、结构化视觉表达与几何关系理解提供了系统化测试平台。',
      '根据谭铖老师主页 News 栏，该成果于 2026 年 2 月获 CVPR 2026 接收，有助于推动多模态模型从一般感知走向更高层次的结构化推理。',
    ],
  },
  {
    id: 2,
    category: 'dynamic',
    date: '2026-02',
    title: '论文Geoint-R1被 CVPR 2026 接收，多模态几何推理研究取得进展',
    img: '/news/Geoint-R1.png',
    content: [
      '针对多模态几何推理中辅助构造不足、形式化表达不清晰等问题，团队相关工作提出 Geoint-R1 框架，通过动态辅助构造机制加强模型对几何关系、推理路径与结构约束的理解能力。',
      '根据谭铖老师主页 News 栏，该成果于 2026 年 2 月获 CVPR 2026 接收，表明实验室在多模态推理、几何理解与结构化智能方向上的研究正在形成特色成果。',
    ],
  },
  {
    id: 3,
    category: 'dynamic',
    date: '2026-02',
    title: '论文Context-First Self-Evolving Learning被 CVPR 2026 接收，数据稀缺场景下视觉语言推理研究取得进展',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
    content: [
      '面向数据稀缺条件下视觉语言推理模型泛化能力不足的问题，团队相关工作提出 Context-First Self-Evolving Learning 框架，强调上下文优先建模与自演化学习机制，以提升模型在复杂视觉语言任务中的稳健性与适应性。',
      '根据谭铖老师主页 News 栏，该成果于 2026 年 2 月获 CVPR 2026 接收，体现了实验室在多模态推理方法、模型泛化能力提升以及高质量视觉语言学习方向上的持续探索。',
    ],
  },
  {
    id: 4,
    category: 'dynamic',
    date: '2026-01',
    title: '论文Scientific LLM被 ICLR 2026 接收，生物分子理解研究取得进展',
    content: [
      '针对科学大模型在生物分子理解任务中存在的 tokenization 瓶颈问题，团队相关研究从上下文建模角度提出新的分析与改进思路，揭示了上下文信息在 Scientific LLM 表征能力中的关键作用。',
      '根据谭铖老师主页 News 栏，该成果于 2026 年 1 月获 ICLR 2026 接收，体现了实验室在科学智能与基础模型机制研究方面的持续积累。',
    ],
  },
  {
    id: 10,
    category: 'dynamic',
    date: '2026-01',
    title: '论文Hyperbolic-Enhanced Mixture-of-Experts Mamba被 Nature Communications 接收，单细胞基础模型研究取得进展',
    content: [
      '团队参与的单细胞基础模型研究成果面向单细胞数据稀疏性、异质性与可解释性问题，构建了兼顾大规模预训练与生物学解释能力的基础模型框架。',
      '根据谭铖老师主页 News 栏，该成果于 2026 年 1 月获 Nature Communications 接收，为细胞状态识别、知识发现及多模态生物数据分析提供了新的方法支撑。',
    ],
  },
  {
    id: 11,
    category: 'dynamic',
    date: '2026-01',
    title: '论文GenProve被收录于 AAAI 2026，序列推荐建模研究取得新进展',
    content: [
      '围绕序列推荐任务中的动态兴趣建模与专家协同机制，团队提出 Hyperbolic-Enhanced Mixture-of-Experts Mamba 方法，将双曲表示学习与 Mamba 架构相结合，以提升复杂用户行为序列的表征能力。',
      '刘玉文老师主页已将该论文列入 AAAI 2026 代表性成果。由于主页未单列接收或发布月份，这里按月级信息保留为 2026 年 1 月展示，不再虚构具体日期。',
    ],
  },
  {
    id: 12,
    category: 'dynamic',
    date: '2026-02',
    title: '论文The Trinity of Consistency as a Defining Principle for General World Models被 ACL 2026 接收，GenProve 细粒度溯源生成研究取得进展',
    content: [
      '围绕细粒度溯源生成任务，团队相关工作 GenProve 针对生成结果的来源追踪、证据对齐与细粒度归因等关键问题展开研究，旨在提升生成式模型在复杂知识场景中的可验证性与可信度。',
      '根据魏靖烜老师主页 News 栏，该成果于 2026 年获 ACL 2026 接收。该工作进一步拓展了实验室在多模态推理、知识溯源与可信生成方向上的研究布局。',
    ],
  },
  {
    id: 13,
    category: 'dynamic',
    date: '2026-02',
    title: '世界模型一致性原理相关新成果发布',
    content: [
      '团队围绕世界模型的基础机制研究，提出 The Trinity of Consistency as a Defining Principle for General World Models，从一致性原则视角探讨通用世界模型的能力边界与构建路径。',
      '根据魏靖烜老师主页 News 栏，该成果已于 2026 年发布。相关工作为后续世界模型、统一推理框架与复杂认知建模研究提供了新的理论参考。',
    ],
  },
]

export const LAB_NEWS: NewsItem[] = [
  {
    id: 5,
    category: 'lab',
    date: '2026-04-02',
    title: '课题组完成首次线下全员会面与任务分组',
    isFeatured: true,
    img: '/news/首次会面.png',
    content: [
      '研究组完成成立以来的首次线下全员会面，围绕官网、算力平台、数字人系统等方向进行了分工。',
      '本次会议进一步明确了研究组近期重点任务和协同机制。',
    ],
  },
  {
    id: 6,
    category: 'lab',
    date: '2026-04-08',
    title: '超算多模态推理研究组正式上线公众号!',
    qrCode: {
      src: '/ZhangHao/公众号.jpg',
      alt: '公众号二维码',
      caption: '扫码关注实验室公众号',
    },
    content: [
      '齐鲁工业大学（山东省科学院）“超算多模态推理研究组”公众号正式开通。我们聚焦多模态大模型推理、量子计算与底层算力优化，以及面向工业、科研和医学场景的系统级应用。',
      '关注我们，了解：',
      '多模态大模型推理与交叉领域应用最新研究；',
      '研究组科研算力平台与实验管理体系建设动态；',
      '组织学术研讨、组会成果与重点建设任务进展；',
      '面向工业互联网、AI 安全、边缘智能等方向的前沿突破。',
      '扫码关注“超算多模态推理研究组”，与我们一起见证前沿科研向应用落地的每一步。',
    ],
  },
  {
    id: 7,
    category: 'lab',
    date: '2026-04-10',
    title: 'QLUSMR研究组小红书账号上线!',
    qrCode: {
      src: '/ZhangHao/小红书.png',
      alt: '小红书二维码',
      caption: '扫码关注实验室小红书账号',
    },
    content: [
      'QLUSMR研究组小红书账号上线啦！',
      '这里是齐鲁工业大学（山东省科学院）“超算多模态推理研究组”的官方小红书号。我们致力于把深度科研内容用可视化、故事化的方式呈现，关注多模态大模型底座、数字人系统、科研算力平台与跨领域实验室建设。',
      '内容包括：',
      '研究组日常与实验室建设背后的技术故事；',
      '多模态推理、大模型应用与工业场景落地案例；',
      '科研团队成员视角、项目进展速递与平台搭建经验；',
      '未来可期的科研方向：AI for Science、算力调度、知识体系沉淀。',
      '扫码关注“QLUSMR研究组”，一起走进科研现场，发现前沿科技背后的真实力量。',
    ],
  },
  {
    id: 8,
    category: 'lab',
    date: '2026-04-06',
    title: '课题组网站宣传工作正式启动!',
    content: [
      '齐鲁工业大学（山东省科学院）超算多模态推理研究组官方网站建设与宣传工作正式启动。',
      '网站采用 Vue 与 TypeScript 等前端技术栈进行模块化构建，旨在打造研究组对外的标准化学术窗口。',
      '目前，网站已规划并逐步实现“首页”“研究方向”“重点任务”及“团队成员”等核心功能模块的开发与部署。',
      '该官方网站将与微信公众号、小红书等新媒体平台形成宣传矩阵，进一步提升课题组在多模态大模型推理、量子计算及底层算力优化等领域研究成果的学术影响力与可见度。',
    ],
  },
]

export const NEWS_BY_CATEGORY: Record<NewsCategory, NewsItem[]> = {
  dynamic: DYNAMIC_NEWS,
  lab: LAB_NEWS,
}
