import {
  Atom,
  Calculator,
  Factory,
  FlaskConical,
  Stethoscope,
  Terminal,
} from 'lucide-vue-next'
import type { ResearchArea } from './types'

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: 1,
    title: 'AI for Industry',
    desc: `围绕复杂工业场景中的知识组织、任务编排、异常诊断和智能决策开展研究，推动大模型能力在真实生产环境中的落地。`,
    icon: Factory,
  },
  {
    id: 2,
    title: 'AI for Mathematical',
    desc: `围绕数学推理中的逻辑推导、符号计算和定理证明开展研究，探索大模型在数学问题解决中的应用。`,
    icon: Calculator,
  },
  {
    id: 3,
    title: 'AI for Science',
    desc: `围绕科学计算中的数值模拟、数据分析和模型构建开展研究，探索大模型在科学研究中的应用。`,
    icon: FlaskConical,
  },
  {
    id: 4,
    title: 'AI for Quantum Science',
    desc: `围绕量子科学中的量子计算、量子通信和量子测量开展研究，探索大模型在量子技术中的应用。`,
    icon: Atom,
  },
  {
    id: 5,
    title: 'AI for CUDA',
    desc: `围绕CUDA编程中的并行计算、内存管理和性能优化开展研究，探索大模型在GPU加速计算中的应用。`,
    icon: Terminal,
  },
  {
    id: 6,
    title: 'AI for Medicine',
    desc: `围绕医学中的疾病诊断、药物发现和个性化治疗开展研究，探索大模型在医疗健康领域的应用。`,
    icon: Stethoscope,
  },
]
