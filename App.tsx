
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  FileText, 
  Layout, 
  Settings, 
  MessageSquare, 
  Plus, 
  Minus,
  Download,
  Eye, 
  ChevronDown, 
  Check,
  Building2,
  X,
  Search,
  ImageIcon,
  Upload,
  Edit2,
  Trash2,
  Loader2,
  Phone,
  Mail,
  MapPin,
  QrCode,
  MoveHorizontal,
  GripVertical,
  RotateCcw,
  LayoutGrid,
  Globe,
  ClipboardList,
  ShieldCheck,
  CheckCircle2,
  ArrowDown,
  ChevronRight,
  Clock,
  Building,
  FlaskConical,
  Users,
  Award,
  Grid,
  Leaf,
  Droplets,
  Factory,
  ShoppingBag,
  ExternalLink,
  FileCheck,
  UserCheck,
  Copy,
  LayoutTemplate,
  Utensils,
  Box,
  Lock,
  Monitor,
  Gavel,
  Car,
  Heart,
  Microscope,
  Zap,
  Activity,
  UserPlus,
  Target,
  Target as TargetIcon,
  Rocket,
  Compass,
  Lightbulb,
  Cpu,
  Fingerprint,
  Presentation,
  Type,
  Table2,
  Columns,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Underline,
  Palette,
  Type as TypeIcon,
  ChevronsUpDown,
  ArrowRightLeft,
  Images,
  FileSpreadsheet,
  Layers,
  Info,
  CarTaxiFront,
  ReceiptText,
  Bug,
  Scaling,
  Network,
  GitBranch,
  EyeOff
} from 'lucide-react';
import * as XLSX from 'xlsx';
import { QuoteData, CertItem, TechnicalService, QuoteModule, CertModule, TechModule, TechServiceStep, CaseBlock, CustomModule } from './types';

const AVAILABLE_STANDARDS = [
  "ISO 9001:2015（质量）",
  "ISO 14001:2015（环境）",
  "ISO 45001:2018（职业健康）",
  "ISO 22000:2018（食品安全管理）",
  "HACCP V1.0（危害分析与关键控制点）",
  "ISO 9001:2015 + GB/T 50430-2017（工程建设施工）",
  "FSSC 22000 V6.0（食品安全）",
  "ISO 50001:2018（能源）",
  "ISO 37301:2021（合规）",
  "ISO 41001:2018（设施）",
  "ISO/IEC 27001:2022（信息安全）",
  "IEC 20000-1:2018（信息技术）",
  "ISO 42001:2023（人工智能）",
  "IATF 16949:2016（汽车）",
  "ISO 37001:2016（反贿赂）",
  "ISO 22716:2007（化妆品良好生产规范）",
  "ISO 13485:2016（医疗器械）",
  "GB/T 31950-2015（诚信）",
  "SA 8000:2014（社会责任）",
  "GB/T 39604-2020（社会责任）",
  "T/CCAA 39-2022（碳管理）",
  "ISO 56001:2024（创新）",
  "GB/T 19640-2019（有机）",
  "GB/T 27922-2011（商品售后）",
  "GB/T 31863-2015&GB/T 33718-2017（履约）",
  "GB/T 29490-2013（知识产权）",
  "ISO 10012:2003（测量）",
  "ISO 28000:2022（供应链）",
  "ISO 22301:2019（业务连续性）",
  "GB/T 20647.9-2006（物业服务）",
  "ISO 46001:2019（水效率）",
  "ISO 10015:2019（培训）",
  "BRCGS（英国零售商协会）",
  "GLOBALGAP（全球良好农业规范）",
  "CHINAGAP（中国良好农业规范）",
  "RA（雨林联盟）",
  "ISO 55001:2014（资产管理）",
  "FAMI-QS",
  "CXC1-1969（良好卫生通则）",
  "RB/T 071-2021（道地药材）",
  "绿色工厂评价",
  "非转基因身份保持（IP）",
  "HSE（健康安全环境管理体系评价）",
  "IQNet SR10（社会责任）",
  "FSC（森林）",
  "CFCC（中国森林）",
  "BSCI（商业社会标准认证）",
  "Sedex（供应商商业道德信息交换）",
  "GRS（全球回收标准）",
  "GOTS（全球有机纺织品标准）",
  "ISO 17025（实验室认可）",
  "CE认证",
  "CCC认证（中国强制性产品认证）",
  "UL认证",
  "海关AEO认证咨询培训项目技术服务",
  "关务管理系统技术服务"
];

const DEFAULT_TECH_STEP_CONTENT: TechServiceStep[] = [
  {
    id: "01",
    title: "前期诊断与方案设计",
    desc: "精准识别现状与目标的缺口，量身定制最契合行业特性的实施路径。",
    tags: ["现场调研", "差距分析", "架构梳理", "方案定制"]
  },
  {
    id: "02",
    title: "体系文件搭建与优化",
    desc: "通过架构优化与流程再造，构建高效合规的现代化管理文件体系。",
    tags: ["架构优化", "流程再造", "体系文件指导", "管理工具应用"]
  },
  {
    id: "03",
    title: "人员培训与能力建设",
    desc: "强化管理层意识并提升员工执行力，打造高素质的内审技术团队。",
    tags: ["管理意识培训", "宣贯培训", "内审员培训", "管理评审"]
  },
  {
    id: "04",
    title: "体系运行指导与整改",
    desc: "实施定期的现场跟踪排查，通过闭闭环机制确保体系运行持续有效。",
    tags: ["运行指导", "内审实施", "管理评审指导", "不符合项整改"]
  },
  {
    id: "05",
    title: "迎审资料审查及支持服务",
    desc: "提供全面的资料预审与现场审核支持，确保获证后的合规运营。",
    tags: ["资料评审", "现场陪审", "获证支持", "持续改进"]
  }
];

const STEP_COLORS = [
  { bg: "bg-[#EFF5FC]", text: "text-[#0062AD]", darkText: "text-[#00467A]", num: "text-[#0062AD]/10", tag: "bg-white text-[#0062AD]" },
  { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", darkText: "text-[#166534]", num: "text-[#16A34A]/10", tag: "bg-white text-[#16A34A]" },
  { bg: "bg-[#FFFBEB]", text: "text-[#D97706]", darkText: "text-[#92400E]", num: "text-[#D97706]/10", tag: "bg-white text-[#D97706]" },
  { bg: "bg-[#F5F3FF]", text: "text-[#7C3AED]", darkText: "text-[#5B21B6]", num: "text-[#7C3AED]/10", tag: "bg-white text-[#7C3AED]" },
  { bg: "bg-[#FFF1F2]", text: "text-[#E11D48]", darkText: "text-[#9F1239]", num: "text-[#E11D48]/10", tag: "bg-white text-[#E11D48]" },
  { bg: "bg-[#F0FDFA]", text: "text-[#0D9488]", darkText: "text-[#115E59]", num: "text-[#0D9488]/10", tag: "bg-white text-[#0D9488]" },
  { bg: "bg-[#F8FAFC]", text: "text-[#475569]", darkText: "text-[#1E293B]", num: "text-[#475569]/10", tag: "bg-white text-[#475569]" },
  { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", darkText: "text-[#994B00]", num: "text-[#B45309]/10", tag: "bg-white text-[#B45309]" },
  { bg: "bg-[#E0E7FF]", text: "text-[#4338CA]", darkText: "text-[#3730A3]", num: "text-[#4338CA]/10", tag: "bg-white text-[#4338CA]" },
  { bg: "bg-[#FFE4E6]", text: "text-[#BE123C]", darkText: "text-[#881337]", num: "text-[#BE123C]/10", tag: "bg-white text-[#BE123C]" }
];

const STEP_ICONS = [Search, Activity, UserPlus, Zap, CheckCircle2, Rocket, Compass, Lightbulb, Cpu, Fingerprint];

const BRAND_COLORS = {
  primary: '#0075CB',
  primaryDeep: '#005691',
  primaryLight: '#F0F8FF',
  primaryHover: '#E0F2FF',
  deep: '#304166',
  red: '#EE4932',
  lightBlue: '#BDD1FF',
  bgSoft: '#EFF5FC',
  green: '#00b050',
  teal: '#0d9488',
  charcoal: '#1D2129',
  navy: '#072A4A',
  lightBlueBase: '#F0F8FF',
  lightBlueHover: '#DFEFFF',
  addButtonText: '#055087',
  neutralText: '#595959',
  line: '#F2F3F5'
};

const INITIAL_LEFT_LOGO = "https://wp-cdn.4ce.cn/v2/Pmf7UFF.png"; // CQC Default Left
const INITIAL_RIGHT_LOGO = "https://wp-cdn.4ce.cn/v2/cDFtr81.png"; // CCIC Default Right

const PREDEFINED_MANAGERS = [
  {
    name: '涂嘉辰',
    jobTitle1: '合规产品经理',
    phone: '186-6454-0686',
    email: 'tujiachen@ccicgd.com',
    qrCode: 'https://img.meituan.net/content/0da77cb2001678bfcecd3810e2f0912e220759.png'
  },
  {
    name: '缪健夫',
    jobTitle1: '管理提升产品经理',
    phone: '134-5037-6652',
    email: 'miaojianfu@ccicgd.com',
    qrCode: 'https://img.meituan.net/content/5b613bbb7aa0a4d617d64230b8750426131979.jpg'
  },
  {
    name: '陈铉中',
    jobTitle1: '入厂培训产品经理',
    phone: '151-0203-0465',
    email: 'chenxuanzhong@ccicgd.com',
    qrCode: 'https://img.meituan.net/content/28f653a8a6f49720533349cd29c4e6b7141319.jpg'
  },
  {
    name: '蒋秉政',
    jobTitle1: 'IATF 16949产品经理',
    phone: '159-1587-3879',
    email: 'jiangbingzheng@ccicgd.com',
    qrCode: 'https://img.meituan.net/content/0bc65540d7c688a680c10b1d443ad854141107.jpg'
  },
  {
    name: '徐伟平',
    jobTitle1: 'ESG产品经理',
    phone: '180-2880-3036',
    email: 'xuweiping@ccicgd.com',
    qrCode: 'https://img.meituan.net/content/6f3a1fa00b3d46820ed0d82fc505ef2f136237.jpg'
  }
];

const COMMON_LOGOS = [
  { id: 'logo-cqc', url: 'https://wp-cdn.4ce.cn/v2/Pmf7UFF.png', name: '中国质量认证中心 (CQC)' },
  { id: 'logo-ccic', url: 'https://wp-cdn.4ce.cn/v2/cDFtr81.png', name: '中国检验认证集团 (CCIC)' },
];

const COMMON_WEBSITES = [
  { id: 'site-cnca', logo: 'https://img.meituan.net/content/268dce338d6c33df9ef63ce4369ddfc422893.jpg', name: 'CNCA 认监委', url: 'http://cx.cnca.cn' },
  { id: 'site-cqc', logo: 'https://img.meituan.net/content/4f05fc80e1c584a38b4c4dd274bc7e9949625.jpg', name: 'CQC官网', url: 'https://www.cqc.com.cn' },
  { id: 'site-tianyancha', logo: 'https://img.meituan.net/content/fc494661773359d8eb74250657de423d10240.png', name: '天眼查', url: 'https://www.tianyancha.com' },
  { id: 'site-qizhidao', logo: 'https://wp-cdn.4ce.cn/v2/yGS3zHx.png', name: '企知道', url: 'https://www.qizhidao.com' }
];

const COMMON_CERT_TEMPLATES = [
  { id: 'tmpl-9001', name: 'ISO 9001', url: 'https://wp-cdn.4ce.cn/v2/AyRunvv.jpeg', icon: Award, color: '#0062AD', bg: 'bg-blue-50' },
  { id: 'tmpl-14001', name: 'ISO 14001', url: 'https://wp-cdn.4ce.cn/v2/M4Gc4lr.png', icon: Leaf, color: '#00b050', bg: 'bg-green-50' },
  { id: 'tmpl-45001', name: 'ISO 45001', url: 'https://wp-cdn.4ce.cn/v2/gJRZLlb.jpeg', icon: ShieldCheck, color: '#EE4932', bg: 'bg-red-50' },
  { id: 'tmpl-50430', name: 'GB/T 50430', url: 'https://wp-cdn.4ce.cn/v2/E2pWVgr.png', icon: Building, color: '#b45309', bg: 'bg-amber-50' },
  { id: 'tmpl-22000', name: 'ISO 22000', url: 'https://wp-cdn.4ce.cn/v2/qvNmBr9.png', icon: Utensils, color: '#0d9488', bg: 'bg-teal-50' },
  { id: 'tmpl-haccp', name: 'HACCP', url: 'https://wp-cdn.4ce.cn/v2/i2oNiM4.png', icon: FlaskConical, color: '#7c3aed', bg: 'bg-purple-50' },
  { id: 'tmpl-fssc', name: 'FSSC 22000', url: 'https://wp-cdn.4ce.cn/v2/ipb4LxV.png', icon: ShoppingBag, color: '#db2777', bg: 'bg-pink-50' },
  { id: 'tmpl-brc', name: 'BRCGS', url: 'https://wp-cdn.4ce.cn/v2/gY6wQG8.png', icon: Box, color: '#4b5563', bg: 'bg-gray-50' },
  { id: 'tmpl-globalgap', name: 'GLOBALGAP', url: 'https://wp-cdn.4ce.cn/v2/rN0WzBz.png', icon: Globe, color: '#2563eb', bg: 'bg-blue-50' },
  { id: 'tmpl-chinagap', name: 'CHINAGAP', url: 'https://wp-cdn.4ce.cn/v2/VfTMNX5.png', icon: Globe, color: '#16a34a', bg: 'bg-green-50' },
  { id: 'tmpl-27001', name: 'ISO 27001', url: 'https://wp-cdn.4ce.cn/v2/npCm4fl.jpeg', icon: Lock, color: '#1e293b', bg: 'bg-slate-50' },
  { id: 'tmpl-20000', name: 'ISO 20000', url: 'https://wp-cdn.4ce.cn/v2/qUdlGrb.jpeg', icon: Monitor, color: '#0284c7', bg: 'bg-sky-50' },
  { id: 'tmpl-37301', name: 'ISO 37301', url: 'https://wp-cdn.4ce.cn/v2/Rih9A4f.png', icon: Gavel, color: '#c2410c', bg: 'bg-orange-50' },
  { id: 'tmpl-16949', name: 'IATF 16949', url: 'https://wp-cdn.4ce.cn/v2/wtAmF6h.jpeg', icon: Car, color: '#4338ca', bg: 'bg-indigo-50' },
  { id: 'tmpl-8000', name: 'SA 8000', url: 'https://wp-cdn.4ce.cn/v2/8ELY1JI.png', icon: Heart, color: '#e11d48', bg: 'bg-rose-50' },
  { id: 'tmpl-50001', name: 'ISO 50001', url: 'https://wp-cdn.4ce.cn/v2/gQVlReb.png', icon: Zap, color: '#f59e0b', bg: 'bg-amber-50' },
  { id: 'tmpl-13485', name: 'ISO 13485', url: 'https://wp-cdn.4ce.cn/v2/I4djZGu.png', icon: Microscope, color: '#0891b2', bg: 'bg-cyan-50' },
  { id: 'tmpl-27922', name: 'GB/T 27922', url: 'https://wp-cdn.4ce.cn/v2/F0tNdnz.png', icon: ShoppingBag, color: '#ea580c', bg: 'bg-orange-50' },
  { id: 'tmpl-31950', name: 'GB/T 31950', url: 'https://wp-cdn.4ce.cn/v2/F0tNdnz.png', icon: UserCheck, color: '#16a34a', bg: 'bg-green-50' },
  { id: 'tmpl-iqnet', name: 'IQNET', url: 'https://wp-cdn.4ce.cn/v2/TXT6WHQ.png', icon: Award, color: '#6d28d9', bg: 'bg-violet-50' }
];

const DEFAULT_CERT_ITEMS: CertItem[] = [
  { id: '1', type: '2026年初次认证费', project: '审核费+审定和注册费用+管理年金', amount: 12000 },
  { id: '2', type: '2027年监督审核费', project: '审核费+管理年金', amount: 6000 },
  { id: '3', type: '2028年监督审核费', project: '审核费+管理年金', amount: 6000 },
];

const DEFAULT_TECH_SERVICES: TechnicalService[] = [
  { id: '1', name: '前期诊断与方案设计', description: '现场调研、差距分析、架构梳理、方案定制', checked: true, basePrice: 5000 },
  { id: '2', name: '体系文件搭建与优化', description: '架构优化、流程再造、体系文件指导、管理工具应用', checked: true, basePrice: 8000 },
  { id: '3', name: '人员培训与能力建设', description: '管理意识培训、标准宣贯、内审技术培训、管理评审指导', checked: true, basePrice: 6000 },
  { id: '4', name: '体系运行指导与整改', description: '定期现场跟踪、问题排查分析、整改方案落地、效果验证', checked: true, basePrice: 7000 },
  { id: '5', name: '迎审资料审查及支持服务', description: '迎审资料审查、审核现场支持、远程维护指导、获证后续支持', checked: true, basePrice: 4000 },
];

const INITIAL_DATA: QuoteData = {
  clientName: '河南新思维软件科技有限公司',
  clientAddress: '河南省郑州市高新区',
  employeeCount: 50,
  certStandards: ['ISO 9001:2015（质量）'],
  certScope: '软件开发、销售及相关的管理活动',
  modules: [
    {
      id: 'default-cert',
      type: 'cert',
      title: '管理体系认证报价',
      items: [...DEFAULT_CERT_ITEMS]
    },
    {
      id: 'default-tech',
      type: 'tech',
      title: '专业技术服务报价',
      services: [...DEFAULT_TECH_SERVICES],
      fee: 15000,
      details: { minDays: 10, auditCerts: 5 }
    }
  ],
  travelExpenseOption: 'excluded',
  note1Prefix: '体系覆盖员工',
  note1Count: 50,
  note1Suffix: '人以内规模的基础上报价，本报价单60天有效。',
  note3Text: '认证项目属营改增范围，客户提供相关开票资料并缴纳费用后，均可开具增值税专用发票（可抵扣）。',
  additionalRemarks: [],
  certTemplates: [],
  techServiceSteps: [...DEFAULT_TECH_STEP_CONTENT],
  caseBlocks: [],
  contact: { 
    name: '涂嘉辰', 
    phone: '186-6454-0686', 
    email: 'tujiachen@ccicgd.com',
    jobTitle1: '合规产品经理',
    jobTitle2: '体系认证与组织提升事业部 市场营销项目经理',
    officeAddress: '广州市天河区珠江新城华利路59号保利大厦东塔17楼',
    qrCode: "https://img.meituan.net/content/0da77cb2001678bfcecd3810e2f0912e220759.png"
  },
  quoteDate: new Date().toISOString().split('T')[0]
};

const cropWhiteBottom = async (base64: string): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) { resolve(base64); return; }
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let lastNonWhiteRow = canvas.height - 1;
        const threshold = 250;
        rowLoop: for (let y = canvas.height - 1; y >= 0; y--) {
          for (let x = 0; x < canvas.width; x++) {
            const idx = (y * canvas.width + x) * 4;
            if (data[idx] < threshold || data[idx + 1] < threshold || data[idx + 2] < threshold) {
              lastNonWhiteRow = y;
              break rowLoop;
            }
          }
        }
        if (lastNonWhiteRow >= canvas.height - 5) { resolve(base64); return; }
        const croppedCanvas = document.createElement('canvas');
        const croppedCtx = croppedCanvas.getContext('2d');
        if (!croppedCtx) { resolve(croppedCanvas.toDataURL('image/png')); return; }
        croppedCanvas.width = canvas.width;
        croppedCanvas.height = lastNonWhiteRow + 5;
        croppedCtx.drawImage(img, 0, 0);
        resolve(croppedCanvas.toDataURL('image/png'));
      } catch (e) { resolve(base64); }
    };
    img.onerror = () => resolve(base64);
    img.src = base64;
  });
};

const EditableBrandLogo: React.FC<{ 
  src: string | null; 
  label: string; 
  onUpload: (base64: string | null) => void;
  className?: string;
  isEditable?: boolean;
  align?: 'left' | 'right' | 'center';
}> = ({ src, label, onUpload, className, isEditable = true, align = 'left' }) => {
  const [error, setError] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => { onUpload(reader.result as string); setError(false); };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); if (isEditable) setIsDragOver(true); };
  const handleDragLeave = () => { setIsDragOver(false); };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragOver(false);
    if (!isEditable) return;
    const logoUrl = e.dataTransfer.getData('logoUrl');
    if (logoUrl) { onUpload(logoUrl); setError(false); }
    else {
      const file = e.dataTransfer.files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => { onUpload(reader.result as string); setError(false); };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleDelete = (e: React.MouseEvent) => { e.stopPropagation(); onUpload(null); setError(false); };
  if (!isEditable) {
    return src && !error ? <img src={src} alt={label} loading="lazy" className="block h-auto w-auto object-contain" style={{ maxWidth: '100%', maxHeight: '120px', imageRendering: 'auto' }} onError={() => setError(true)} /> : null;
  }
  return (
    <div className={`relative flex flex-col ${align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center'} ${className}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {label && <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><ImageIcon className="w-3 h-3" /> {label}</label>}
      <div className={`relative group transition-all flex items-center justify-center border rounded-[12px] cursor-pointer ${isDragOver ? `border-[${BRAND_COLORS.primary}] bg-[${BRAND_COLORS.bgSoft}] scale-[1.02]` : src ? 'border-transparent bg-transparent shadow-none' : 'border-[#E2E8F0] bg-white shadow-sm'}`} style={{ minHeight: '80px', minWidth: '120px' }} onClick={() => fileInputRef.current?.click()}>
        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
        {src && !error ? <img src={src} alt={label} loading="lazy" className="block max-w-full max-h-[120px] object-contain p-1" onError={() => setError(true)} /> : <div className="flex flex-col items-center justify-center w-full h-full text-[#94A3B8] p-4 font-quote"><Upload className="w-8 h-8 mb-2 group-hover:text-[var(--color-primary)] transition-colors" /><span className="text-[10px] font-bold">上传或拖放</span></div>}
        {src && <div className="absolute inset-0 bg-[#304166cc] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-[12px]"><div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform"><Edit2 className="w-3.5 h-3.5 text-[#0062AD]" /><span className="text-xs font-bold text-[#304166]">更换</span></div></div>}
        {src && <button onClick={handleDelete} title="删除" className="absolute -top-2 -right-2 p-1 bg-[#EE4932] text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 active:scale-95 z-10"><X className="w-3.5 h-3.5" strokeWidth={3} /></button>}
      </div>
    </div>
  );
};

const CertificationProcess = ({ validity = '3years' }: { validity?: '1year' | '3years' }) => {
  const stages = [
    { title: "前期准备阶段", icon: <ClipboardList className="w-5 h-5" />, color: "amber", steps: [ { id: "1", title: "认证受理", desc: "明确需求 → 签合同 → 交资料" }, { id: "2", title: "方案策划", desc: "定时间 → 组审核员" }, { id: "3", title: "顾客沟通", desc: "沟通事宜 → 确认计划" } ] },
    { title: "审核与整改阶段", icon: <ShieldCheck className="w-5 h-5" />, color: "blue", steps: [ { id: "4", title: "现场审核", desc: "进驻现场 + 按标审核" }, { id: "5", title: "整改", desc: "整改问题 → 交见证材料" }, { id: "6", title: "材料上报", desc: "确认材料 →报总部" } ] },
    { title: "评审与后续监督阶段", icon: <CheckCircle2 className="w-5 h-5" />, color: "purple", steps: [ { id: "7", title: "总部评审", desc: "评审材料有效性" }, { id: "8", title: "发证书", desc: "制证 → 寄送" }, { id: "9", title: validity === '3years' ? "后续监督" : "再认证", desc: validity === '3years' ? "3年2次监督审核" : "证书到期前3个月进行再认证" } ] }
  ];
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'amber': return { bg: 'bg-[#fffbeb]', border: 'border-transparent', text: 'text-[#D48806]', badge: 'bg-[#FFF7E6] text-[#D48806]', stepTitle: 'text-[#D48806]', stepDesc: 'text-[#D48806]/60' };
      case 'blue': return { bg: 'bg-[#eff6ff]', border: 'border-transparent', text: 'text-[#005691]', badge: 'bg-[#F0F5FF] text-[#005691]', stepTitle: 'text-[#005691]', stepDesc: 'text-[#005691]/60' };
      case 'purple': return { bg: 'bg-[#F9F0FF]', border: 'border-transparent', text: 'text-[#722ED1]', badge: 'bg-[#F9F0FF] text-[#722ED1]', stepTitle: 'text-[#722ED1]', stepDesc: 'text-[#722ED1]/60' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-600', badge: 'bg-gray-100 text-gray-600', stepTitle: 'text-[#1D2129]', stepDesc: 'text-gray-400' };
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {stages.map((stage, idx) => {
        const cls = getColorClasses(stage.color);
        return (
          <div key={idx} className={`relative flex-1 rounded-[12px] ${cls.bg} p-[24px] flex flex-col gap-5 transition-all duration-500`}>
            <div className={`flex items-center gap-2 font-bold text-[16px] ${cls.text}`}>{stage.icon}{stage.title}</div>
            <div className="flex flex-col gap-4">
              {stage.steps.map((step, sIdx) => (
                <React.Fragment key={step.id}>
                  <div className="bg-white rounded-[8px] p-4 shadow-sm flex flex-col gap-1.5 transition-all hover:scale-[1.02]">
                    <div className="flex items-center gap-3"><span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-black tracking-tight ${cls.badge}`}>Step {step.id}</span><span className={`font-semibold text-[14px] ${cls.stepTitle} animate-fade-in`}>{step.title}</span></div>
                    <div className={`text-[12px] ${cls.stepDesc} font-normal leading-[1.6] pl-0.5 animate-fade-in whitespace-nowrap overflow-visible`} title={step.desc}>{step.desc}</div>
                  </div>
                  {sIdx < stage.steps.length - 1 && <div className="flex justify-center -my-1"><ArrowDown className="w-4 h-4 opacity-20 text-gray-400" /></div>}
                </React.Fragment>
              ))}
            </div>
            {idx < stages.length - 1 && <div className="hidden md:flex absolute -right-[18px] top-1/2 -translate-y-1/2 z-10"><ChevronRight className="w-5 h-5 text-gray-300 opacity-50" /></div>}
          </div>
        );
      })}
    </div>
  );
};

const TechStepCard: React.FC<{ 
  step: TechServiceStep; 
  index: number;
  isEditable: boolean;
  onDragStart: (e: React.DragEvent, idx: number) => void;
  onDragOver: (e: React.DragEvent, idx: number) => void;
  onDrop: (e: React.DragEvent, idx: number) => void;
  onRemove: (idx: number) => void;
  onUpdate: (idx: number, field: keyof TechServiceStep, value: any) => void;
  onUpdateTags: (idx: number, tags: string[]) => void;
}> = ({ step, index, isEditable, onDragStart, onDragOver, onDrop, onRemove, onUpdate, onUpdateTags }) => {
  const color = STEP_COLORS[index % STEP_COLORS.length];
  const Icon = STEP_ICONS[index % STEP_ICONS.length];
  const [tagDragOver, setTagDragOver] = useState<number | null>(null);
  const handleTagDragStart = (e: React.DragEvent, tIdx: number) => { e.stopPropagation(); e.dataTransfer.setData('tagIdx', tIdx.toString()); };
  const handleTagDrop = (e: React.DragEvent, targetTagIdx: number) => {
    e.preventDefault(); e.stopPropagation(); setTagDragOver(null);
    const sourceTagIdx = parseInt(e.dataTransfer.getData('tagIdx'));
    if (sourceTagIdx !== targetTagIdx) {
      const newTags = [...step.tags];
      const [removed] = newTags.splice(sourceTagIdx, 1);
      newTags.splice(targetTagIdx, 0, removed);
      onUpdateTags(index, newTags);
    }
  };
  return (
    <div draggable={isEditable} onDragStart={(e) => onDragStart(e, index)} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }} onDrop={(e) => onDrop(e, index)} className={`group flex flex-col relative p-5 rounded-[10px] ${color.bg} overflow-hidden transition-all duration-300 border h-full min-h-0 cursor-default ${isEditable ? 'cursor-move' : ''} border-[#E5E6EB] hover:scale-[1.02] hover:border-[#0062AD]/30`} style={{ }}>
      <div className={`absolute -right-2 -top-4 text-[5rem] font-black italic select-none ${color.num} font-num`}>{step.id}</div>
      <div className={`w-9 h-9 flex items-center justify-start ${color.text} mb-3 relative z-10 shrink-0`}><Icon className="w-[22px] h-[22px]" /></div>
      {isEditable && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all z-20">
          <button onClick={(e) => { e.stopPropagation(); const newTags = [...step.tags, '新标签']; onUpdateTags(index, newTags); }} title="添加标签" className="p-1.5 bg-white/80 hover:bg-[#0062AD] hover:text-white text-[#0062AD] rounded-[4px] border border-[#BDD1FF]/50"><Plus className="w-3 h-3" strokeWidth={3} /></button>
          <button onClick={(e) => { e.stopPropagation(); onRemove(index); }} title="删除流程阶段" className="p-1.5 bg-white/80 hover:bg-red-50 hover:text-white text-gray-400 rounded-[4px] border border-gray-100"><Trash2 className="w-3.5 h-3.5" strokeWidth={2.5} /></button>
        </div>
      )}
      {isEditable ? (
        <div className="space-y-1.5 relative z-10 flex flex-col mb-2">
          <input className={`!p-0 !border-0 bg-transparent focus:ring-0 text-[15px] font-semibold ${color.text} leading-tight w-full outline-none`} value={step.title} onChange={e => onUpdate(index, 'title', e.target.value)} />
          <textarea className="!p-0 !border-0 bg-transparent focus:ring-0 text-[12px] text-[#86909C] font-normal leading-[1.6] resize-none w-full h-12 no-scrollbar outline-none" value={step.desc} onChange={e => onUpdate(index, 'desc', e.target.value)} />
        </div>
      ) : (
        <><h4 className={`text-[15px] font-semibold ${color.text} mb-2 relative z-10 leading-tight shrink-0`}>{step.title}</h4><p className="text-[12px] text-[#86909C] font-normal leading-[1.6] mb-2 relative z-10 opacity-90">{step.desc}</p></>
      )}
      <div className="grid grid-cols-2 gap-1.5 relative z-10 mt-auto shrink-0 pb-1">
        {step.tags.map((tag, tIdx) => (
          <div key={`${step.id}-tag-${tIdx}`} draggable={isEditable} onDragStart={(e) => handleTagDragStart(e, tIdx)} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setTagDragOver(tIdx); }} onDragLeave={() => setTagDragOver(null)} onDrop={(e) => handleTagDrop(e, tIdx)} className={`relative px-2 py-1.5 rounded-[8px] text-[10px] font-bold ${color.tag} border border-[#E5E6EB] flex items-center justify-center text-center transition-all group/tag ${tagDragOver === tIdx ? 'ring-2 ring-[#0062AD]' : ''}`}>
            {isEditable ? (
              <div className="flex items-center gap-1.5 w-full justify-center"><input className={`!p-0 !border-0 bg-transparent focus:ring-0 text-[10px] font-bold w-full text-center placeholder:opacity-50 outline-none ${color.text}`} value={tag} placeholder="标签" onChange={e => { const newTags = [...step.tags]; newTags[tIdx] = e.target.value; onUpdateTags(index, newTags); }} /><button onClick={() => { const newTags = step.tags.filter((_, i) => i !== tIdx); onUpdateTags(index, newTags); }} className="text-gray-300 hover:text-red-500 shrink-0 opacity-0 group-hover/tag:opacity-100 transition-opacity"><X className="w-2.5 h-2.5" /></button></div>
            ) : (
              <span className="leading-tight text-center break-all">{tag}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const TechnicalServiceProcess = ({ steps, onUpdateStep, onRemoveStep, onReorderSteps, onUpdateTags, isEditable = false }: { steps: TechServiceStep[], onUpdateStep?: (index: number, field: keyof TechServiceStep, value: any) => void, onRemoveStep?: (index: number) => void, onReorderSteps?: (sourceIdx: number, targetIdx: number) => void, onUpdateTags?: (index: number, newTags: string[]) => void, isEditable?: boolean }) => {
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const handleDragStart = (e: React.DragEvent, idx: number) => { if (!isEditable) return; e.dataTransfer.setData('stepIdx', idx.toString()); };
  const handleDragOver = (e: React.DragEvent, idx: number) => { if (!isEditable) return; e.preventDefault(); setDragOverIdx(idx); };
  const handleDrop = (e: React.DragEvent, targetIdx: number) => {
    if (!isEditable) return; e.preventDefault(); setDragOverIdx(null);
    const sourceIdxStr = e.dataTransfer.getData('stepIdx');
    if (sourceIdxStr === '') return;
    const sourceIdx = parseInt(sourceIdxStr);
    if (sourceIdx !== targetIdx && onReorderSteps) { onReorderSteps(sourceIdx, targetIdx); }
  };
  return ( <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-stretch relative">{steps.map((step, idx) => ( <TechStepCard key={step.id} step={step} index={idx} isEditable={isEditable} onDragStart={handleDragStart} onDragOver={handleDragOver} onDrop={handleDrop} onRemove={onRemoveStep!} onUpdate={onUpdateStep!} onUpdateTags={onUpdateTags!} /> ))}</div> );
};

const AgencyProfile = () => {
  const introClass = "text-[14px] text-gray-500 leading-relaxed text-justify px-1";
  
  return (
    <div className="space-y-10 px-5 md:px-10 lg:px-0 text-center lg:text-left">
      <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 items-center lg:items-stretch">
        <div className="lg:col-span-3 space-y-6 flex flex-col justify-between py-1 items-center lg:items-start">
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-0 group">
              <div className="w-[4px] h-[32px] bg-[#013580] rounded-[2px] mr-[12px] shrink-0"></div>
              <h3 className="text-[20px] font-bold text-[#005691] tracking-tight">中国检验认证集团 <span className="text-[#0062AD] font-en">(CCIC)</span></h3>
            </div>
            <p className={introClass}>中国检验认证集团（简称中国中检）是经国务院批准设立、由国务院国资委管理的中央企业。作为以“检验、检测、认证、标准、计量”为主业的综合性质量服务机构，机构在全球范围内提供专业、高效、一站式的质量安全服务。</p>
          </div>
          <div className="pt-4 w-full my-5 lg:my-0">
            <div className="flex items-center gap-3 mb-4"><div className="h-[2px] bg-blue-100 flex-1"></div><span className="text-[11px] font-black text-[#0062AD] uppercase tracking-[0.2em] whitespace-nowrap">三大品牌</span><div className="h-[2px] bg-blue-100 flex-1"></div></div>
            <div className="grid grid-cols-3 gap-4">
              {[{ name: 'CCIC', icon: 'https://img.meituan.net/content/85a4fc82d05398fc2174b38f3079c047286176.png' }, { name: 'CQC', icon: 'https://img.meituan.net/content/3c7d0f7f8939199ffc2353fd439669e9284944.png' }, { name: 'CAERI', icon: 'https://img.meituan.net/content/277ebe8f724c51cf401237b50ba688a051357.jpg' }].map((sub, i) => (
                <div key={i} className="bg-white rounded-[12px] p-4 border border-gray-100 flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 min-h-[110px]">
                  <div className="h-14 w-full flex items-center justify-center">
                    <img src={sub.icon} alt={sub.name} loading="lazy" className="max-h-full max-w-full object-contain" />
                  </div>
                  <span className="text-[13px] font-semibold text-[#00428D] text-center whitespace-nowrap tracking-wider">{sub.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Statistics Grid - Six-color dynamic matrix for CCIC */}
        <div className="w-full lg:col-span-2 grid grid-cols-3 lg:grid-cols-2 gap-[20px] md:gap-[30px] lg:pl-8 lg:border-l border-gray-100 items-center py-1">
          {[
            { label: '服务网络', value: '30', unit: '+', icon: <Globe className="w-5 h-5" />, color: '#165DFF' }, 
            { label: '分支机构', value: '400', unit: '+', icon: <Building className="w-5 h-5" />, color: '#00B42A' }, 
            { label: '专业实验室', value: '500', unit: '+', icon: <FlaskConical className="w-5 h-5" />, color: '#722ED1' }, 
            { label: '专业员工', value: '20000', unit: '+', icon: <Users className="w-5 h-5" />, color: '#FF7D00' }, 
            { label: '认可资质', value: '100', unit: '+', icon: <Award className="w-5 h-5" />, color: '#F53F3F' }, 
            { label: '国家认可', value: '300', unit: '+', icon: <ShieldCheck className="w-5 h-5" />, color: '#F77234' }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-2" style={{ color: stat.color }}>
                {React.cloneElement(stat.icon as React.ReactElement, { color: 'currentColor' })}
              </div>
              <div className="flex items-baseline mb-1 justify-center align-num" style={{ color: stat.color }}>
                <span className="text-[16px] font-bold font-num leading-none transform translate-y-[1px]">{stat.value}</span>
                <span className="text-[12px] font-bold ml-0.5 leading-none font-en">{stat.unit}</span>
              </div>
              <span className="text-[12px] font-medium whitespace-nowrap overflow-hidden text-ellipsis w-full text-[#4B5563]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
      
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-x-12 items-stretch text-center lg:text-left">
        {/* LEFT COLUMN: CQC */}
        <div className="flex flex-col h-full w-full">
          <div className="mb-4 text-left">
            <div className="flex items-center justify-start gap-3 border-l-4 border-[#0062AD] pl-4 mb-3">
              <h4 className="text-[20px] font-bold text-[#005691]">中国质量认证中心 <span className="font-en">(CQC)</span></h4>
            </div>
            <p className={introClass + " !px-0"}>中国质量认证中心(CQC)是由中国政府批准设立、认证机构批准书编号为001号的质量服务机构，隶属于中国中检集团。同时CQC也是世界最大认证机构联盟—国际认证联盟（IQNet）中国区域的两大成员之一。</p>
          </div>
          
          <div className="flex flex-col justify-between flex-1 mt-4 gap-4">
            <div className="bg-[#0062AD08] rounded-[12px] p-5 flex flex-col sm:flex-row items-start gap-4 border border-[#0062AD1a] transition-all hover:bg-[#0062AD0D]">
              <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[#005691] shrink-0 self-start mt-0"><Award className="w-6 h-6" /></div>
              <div className="space-y-1.5 flex-1 text-left pt-0">
                <div className="flex items-center justify-start gap-5"><span className="text-[14px] font-bold text-[#005691]">权威地位</span><span className="px-2 py-0.5 bg-[#0062AD] text-white rounded-md text-[10px] font-black font-num tracking-wider">No. 001</span></div>
                <p className="text-[13px] leading-relaxed font-normal" style={{ color: '#4E89B2' }}>国家认监委批准设立的专业认证机构，机构批准号：001。</p>
              </div>
            </div>
            
            <div className="bg-[#34A85308] rounded-[12px] p-5 flex flex-col sm:flex-row items-start gap-4 border border-[#34A8531a] transition-all hover:bg-[#34A8530D]">
              <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[#166534] shrink-0 self-start mt-0"><Globe className="w-6 h-6" /></div>
              <div className="space-y-1 flex-1 text-left pt-0">
                <div className="flex items-center justify-start gap-5"><span className="text-[14px] font-bold text-[#166534]">国际合作</span><span className="px-2 py-0.5 bg-[#34A853] text-white rounded-md text-[10px] font-black font-num tracking-wider">IQNet 中国成员</span></div>
                <p className="text-[12.5px] leading-snug line-clamp-2 font-normal" style={{ color: '#529E66' }}>代表中国加入国际认证联盟及国际电工委员会合格评定体系，实现一张证书，全球通行。</p>
              </div>
            </div>
            
            <div className="bg-[#FBBC0508] rounded-[12px] p-5 flex flex-col sm:flex-row items-start gap-4 border border-[#FBBC051a] transition-all hover:bg-[#FBBC050D]">
              <div className="w-10 h-10 rounded-[8px] flex items-center justify-center text-[#B45309] shrink-0 self-start mt-0"><Grid className="w-6 h-6" /></div>
              <div className="space-y-1 flex-1 text-left pt-0">
                <div className="flex items-center justify-start gap-5"><span className="text-[14px] font-bold text-[#B45309]">业务覆盖</span><span className="px-2 py-0.5 bg-[#FBBC05] text-white rounded-md text-[10px] font-black font-num tracking-wider">全产业链覆盖</span></div>
                <p className="text-[12.5px] leading-snug line-clamp-2 font-normal" style={{ color: '#B27A4E' }}>提供强制性产品认证 (CCC)、自愿性认证、节能环保认证及管理体系认证等全方位服务。</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* RIGHT COLUMN: CCIC GD */}
        <div className="flex flex-col w-full mt-10 lg:mt-0 text-left">
          <div className="mb-4">
            <div className="flex items-center justify-start gap-3 border-l-4 border-[#EE4932] pl-4 mb-3">
              <h4 className="text-[20px] font-bold text-[#005691]">中国中检广东公司 <span className="font-en">(CCIC GD)</span></h4>
            </div>
            <p className={introClass + " !px-0"}>中国检验认证集团广东有限公司(中国中检广东公司)是中国中检集团核心子公司之一，中国中检集团华南区域总部，也是中国质量认证中心有限公司在当地开展管理体系认证业务的分支机构。</p>
          </div>
          
          {/* CCIC GD Statistics Area - Re-aligned to main stats logic */}
          <div className="grid grid-cols-3 gap-x-6 mt-6 mb-4 w-full">
            {[
              { label: '分公司', value: '19', unit: '家', icon: <MapPin className="w-5 h-5" />, color: '#165DFF' }, 
              { label: '子公司', value: '3', unit: '家', icon: <GitBranch className="w-5 h-5" />, color: '#00B42A' },
              { label: '实验室', value: '14', unit: '个', icon: <FlaskConical className="w-5 h-5" />, color: '#722ED1' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="mb-1" style={{ color: stat.color }}>{stat.icon}</div>
                <div className="flex items-baseline justify-center align-num" style={{ color: stat.color }}>
                  <span className="text-[16px] font-bold font-num leading-none transform translate-y-[1px]">{stat.value}</span>
                  <span className="text-[12px] font-bold ml-0.5 leading-none">{stat.unit}</span>
                </div>
                <span className="text-[12px] font-medium mt-[4px] leading-none text-[#4B5563]">{stat.label}</span>
              </div>
            ))}
          </div>
          
          {/* Service Scope with Grid - 9-color scheme and 28px icons */}
          <div className="mt-[20px] space-y-4">
            <div className="grid grid-cols-3 gap-x-4">
              <div className="col-start-2 flex items-center justify-center gap-2 whitespace-nowrap">
                <Scaling className="w-4 h-4 text-[#EE4932]" />
                <span className="text-[14px] font-bold text-[#304166]">服务范围</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-y-6 gap-x-4">
              {[
                { label: '农产品食品', icon: <Leaf className="w-7 h-7" />, iconColor: '#00B42A', textColor: '#3CB371' }, 
                { label: '石油化工', icon: <Droplets className="w-7 h-7" />, iconColor: '#FF7D00', textColor: '#DAA520' }, 
                { label: '矿产品检测', icon: <Box className="w-7 h-7" />, iconColor: '#4E5969', textColor: '#708090' },
                { label: '工业品检测', icon: <Factory className="w-7 h-7" />, iconColor: '#0075CB', textColor: '#4682B4' }, 
                { label: '消费品安全', icon: <ShoppingBag className="w-7 h-7" />, iconColor: '#F53F3F', textColor: '#CD5C5C' }, 
                { label: '有害生物防控', icon: <Bug className="w-7 h-7" />, iconColor: '#14C9C9', textColor: '#20B2AA' },
                { label: '体系认证', icon: <Award className="w-7 h-7" />, iconColor: '#722ED1', textColor: '#9370DB' }, 
                { label: '计量校准', icon: <Target className="w-7 h-7" />, iconColor: '#F77234', textColor: '#E9967A' },
                { label: '技术服务', icon: <Settings className="w-7 h-7" />, iconColor: '#165DFF', textColor: '#6495ED' }
              ].map((serv, i) => (
                <div key={i} className="flex flex-col items-center gap-2 transition-transform hover:-translate-y-1">
                  <div className={`w-11 h-11 flex items-center justify-center bg-transparent`} style={{ color: serv.iconColor }}>
                    {serv.icon}
                  </div>
                  <span className="text-[12px] font-semibold whitespace-nowrap text-center" style={{ color: serv.textColor }}>{serv.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Qualifications = () => {
  const headerWrapperClass = "relative inline-block mb-6 mx-auto";
  const headerTextClass = "text-[#304166] font-bold text-[16px] uppercase tracking-widest relative z-10 px-1 text-center";
  const headerLineClass = "absolute -bottom-1.5 left-0 w-full h-[1px] bg-[#E5E6EB]";
  
  const imgWrapperClass = "bg-[#F8FAFC] border border-transparent rounded-[20px] p-8 flex items-center justify-center transition-all";
  const certImgClass = "w-full h-auto block rounded-sm shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-[#E5E6EB] transition-transform hover:scale-[1.01]";

  return (
    <div className="space-y-14 px-4 sm:px-10 text-center">
      <div className="max-w-[720px] mx-auto">
        <div className={headerWrapperClass}>
          <h5 className={headerTextClass}>营业执照</h5>
          <div className={headerLineClass}></div>
        </div>
        <div className={imgWrapperClass}>
          <div className="w-full max-w-[580px]">
            <img 
              src="https://img.meituan.net/content/f9409b4072b52fcca451773db527b477176762.jpg" 
              alt="营业执照" 
              loading="lazy" 
              className={certImgClass} 
            />
          </div>
        </div>
      </div>
      
      <div className="flex flex-row gap-[24px] items-stretch w-full">
        <div className="flex-1 flex flex-col">
          <div className={headerWrapperClass}>
            <h5 className={headerTextClass}>认证机构批准书</h5>
            <div className={headerLineClass}></div>
          </div>
          <div className={`${imgWrapperClass} flex-1`}>
            <div className="w-full">
              <img 
                src="https://img.meituan.net/content/fc461674b29c66fc272087ea4df91b81344956.png" 
                alt="认证机构批准书" 
                loading="lazy" 
                className={certImgClass} 
              />
            </div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className={headerWrapperClass}>
            <h5 className={headerTextClass}>认可证书</h5>
            <div className={headerLineClass}></div>
          </div>
          <div className={`${imgWrapperClass} flex-1`}>
            <div className="w-full">
              <img 
                src="https://img.meituan.net/content/6db09cf3cf38fb658b6874ad1d161b90193660.jpg" 
                alt="认可证书" 
                loading="lazy" 
                className={certImgClass} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<QuoteData>(INITIAL_DATA);
  const [leftLogo, setLeftLogo] = useState<string | null>(INITIAL_LEFT_LOGO);
  const [rightLogo, setLeftLogoRight] = useState<string | null>(INITIAL_RIGHT_LOGO);
  const [isNote1Visible, setIsNote1Visible] = useState(true);
  const [isNote2Visible, setIsNote2Visible] = useState(true);
  const [isNote3Visible, setIsNote3Visible] = useState(true);
  const [isCertProcessVisible, setIsCertProcessVisible] = useState(true);
  const [isTechProcessVisible, setIsTechProcessVisible] = useState(true);
  const [isCertTemplatesVisible, setIsCertTemplatesVisible] = useState(true);
  const [isCustomerCaseVisible, setIsCustomerCaseVisible] = useState(false);
  const [processOrder, setProcessOrder] = useState<string[]>(['cert-process', 'tech-process', 'agency-profile', 'business-qualifications', 'customer-case', 'cert-templates']);
  const [isManagerSelectOpen, setIsManagerSelectOpen] = useState(false);
  const [processValidity, setProcessValidity] = useState<'1year' | '3years'>('3years');
  const [isDraggingOverLogos, setIsDraggingOverLogos] = useState(false);
  const [isDraggingOverWebsites, setIsDraggingOverWebsites] = useState(false);
  const [isDraggingOverCertTemplates, setIsDraggingOverCertTemplates] = useState(false);
  const [isDraggingOverSidebarTemplates, setIsDraggingOverSidebarTemplates] = useState(false);
  const [isDraggingExcelOverCase, setIsDraggingExcelOverCase] = useState(false);
  const [draggingExcelTargetId, setDraggingExcelTargetId] = useState<string | null>(null);
  const [dragOverModuleId, setDragOverModuleId] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const resizingInfo = useRef<{ blockId: string, colIdx: number, startX: number, startWidths: number[] } | null>(null);
  const excelInputRef = useRef<HTMLInputElement>(null);

  const hasCert = useMemo(() => data.modules.some(m => m.type === 'cert'), [data.modules]);
  const hasTech = useMemo(() => data.modules.some(m => m.type === 'tech'), [data.modules]);

  const dynamicTitle = useMemo(() => {
    if (hasCert && hasTech) return "管理体系认证及技术服务报价单";
    if (!hasCert && hasTech) return "技术服务报价单";
    if (hasCert && !hasTech) return "管理体系认证报价单";
    return "管理体系认证及技术服务报价单";
  }, [hasCert, hasTech]);

  const dynamicSubtitle = useMemo(() => {
    if (hasCert && hasTech) return "Quotation for Management System Certification and Technical Services";
    if (!hasCert && hasTech) return "Quotation for Technical Services";
    if (hasCert && !hasTech) return "Quotation for Management System Certification";
    return "Quotation for Management System Certification and Technical Services";
  }, [hasCert, hasTech]);

  const getTravelNote = (option: 'excluded' | 'included') => {
    if (hasCert && hasTech) {
      return option === 'excluded' 
        ? "本报价不包括现场审核及培训期间发生的交通、住宿及餐饮费用。上述费用将根据实际发生金额由客户实报实销，或由客户统一安排。"
        : "本报价包含现场审核及培训期间的所有必要费用，包括但不限于：审核费、差旅费（含往返及市内交通）、食宿费及资料费。";
    } else if (hasCert) {
      return option === 'excluded'
        ? "本报价不包括现场审核期间发生的交通、住宿及餐饮费用。上述费用将根据实际发生金额由客户实报实销，或由客户统一安排。"
        : "本报价包含现场审核期间的所有必要费用，包括但不限于：审核费、差旅费（含往返及市内交通）、食宿费。";
    } else if (hasTech) {
      return option === 'excluded'
        ? "本报价不包括培训期间发生的交通、住宿及餐饮费用。上述费用将根据实际发生金额由客户实报实销，或由客户统一安排。"
        : "本报价包含培训期间的所有必要费用，包括但不限于：差旅费（含往返及市内交通）、食宿费及资料费。";
    }
    return option === 'excluded' 
      ? "本报价不包括现场审核及培训指导时发生的食宿和差旅费用，根据实际合理发生由客户承担/安排。"
      : "本报价包括现场审核及培训指导时发生的必要的食宿和差旅费用。";
  };

  const [isStandardOpen, setIsStandardOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [editingCertId, setEditingCertId] = useState<{moduleId: string, itemId: string} | null>(null);
  const [editingTechFeeId, setEditingTechFeeId] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [previewScale, setPreviewScale] = useState(1);
  const [isDraggingOverMain, setIsDraggingOverMain] = useState(false);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [customStandardInput, setCustomStandardInput] = useState('');

  const standardDropdownRef = useRef<HTMLDivElement>(null);
  const managerSelectRef = useRef<HTMLDivElement>(null);
  const pdfSourceRef = useRef<HTMLDivElement>(null);
  const previewScrollContainerRef = useRef<HTMLDivElement>(null);
  const certTemplateInputRef = useRef<HTMLInputElement>(null);
  const caseImageInputRef = useRef<HTMLInputElement>(null);
  const activeCaseBlockIdRef = useRef<string | null>(null);
  const customModuleExcelInputRef = useRef<HTMLInputElement>(null);

  const certTotal = useMemo(() => data.modules.reduce((sum, m) => m.type === 'cert' ? sum + m.items.reduce((s, i) => s + (i.amount || 0), 0) : sum, 0), [data.modules]);
  const techTotal = useMemo(() => data.modules.reduce((sum, m) => m.type === 'tech' ? sum + (m.fee || 0) : sum, 0), [data.modules]);
  const grandTotal = useMemo(() => certTotal + techTotal, [certTotal, techTotal]);
  const allDisplayStandards = useMemo(() => { const base = [...AVAILABLE_STANDARDS]; data.certStandards.forEach(std => { if (!base.includes(std)) base.push(std); }); return base; }, [data.certStandards]);
  const filteredStandards = useMemo(() => allDisplayStandards.filter(std => std.toLowerCase().includes(searchTerm.toLowerCase())), [searchTerm, allDisplayStandards]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (standardDropdownRef.current && !standardDropdownRef.current.contains(event.target as Node)) { setIsStandardOpen(false); setIsAddingCustom(false); setCustomStandardInput(''); }
      if (managerSelectRef.current && !managerSelectRef.current.contains(event.target as Node)) { setIsManagerSelectOpen(false); }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showPreview) {
      const updateScale = () => { if (previewScrollContainerRef.current) { const container = previewScrollContainerRef.current; const padding = window.innerWidth < 768 ? 16 : 48; const availableWidth = container.clientWidth - padding; const docWidthPx = 297 * 3.7795275591; const scale = availableWidth / docWidthPx; setPreviewScale(scale); } };
      updateScale(); window.addEventListener('resize', updateScale); return () => window.removeEventListener('resize', updateScale);
    }
  }, [showPreview]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizingInfo.current) return;
      const { blockId, colIdx, startX, startWidths } = resizingInfo.current;
      let targetBlock: CaseBlock | undefined = data.caseBlocks.find(b => b.id === blockId);
      if (!targetBlock) {
        for (const module of data.modules) {
          if (module.type === 'custom') {
            targetBlock = module.blocks.find(b => b.id === blockId);
            if (targetBlock) break;
          }
        }
      }
      if (!targetBlock || !targetBlock.columnWidths) return;
      const deltaX = e.clientX - startX;
      const tableElement = document.querySelector(`[data-table-block-id="${blockId}"]`);
      if (!tableElement) return;
      const tableWidth = tableElement.getBoundingClientRect().width;
      const deltaPercent = (deltaX / tableWidth) * 100;
      const newWidths = [...startWidths];
      if (colIdx < newWidths.length - 1) {
        const nextColIdx = colIdx + 1;
        const requestedChange = deltaPercent;
        const finalChange = Math.max(5 - startWidths[colIdx], Math.min(startWidths[nextColIdx] - 5, requestedChange));
        newWidths[colIdx] = startWidths[colIdx] + finalChange;
        newWidths[nextColIdx] = startWidths[nextColIdx] - finalChange;
        setData(prev => ({
          ...prev,
          caseBlocks: prev.caseBlocks.map(b => b.id === blockId ? { ...b, columnWidths: newWidths } : b),
          modules: prev.modules.map(m => m.type === 'custom' ? { ...m, blocks: m.blocks.map(b => b.id === blockId ? { ...b, columnWidths: newWidths } : b) } : m)
        }));
      }
    };
    const handleMouseUp = () => { resizingInfo.current = null; document.body.style.cursor = 'default'; };
    if (showPreview) return;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [data.caseBlocks, data.modules, showPreview]);

  const addCertModule = () => { const newModule: CertModule = { id: Date.now().toString(), type: 'cert', title: '管理体系认证报价', items: [...DEFAULT_CERT_ITEMS].map(item => ({ ...item, id: Math.random().toString() })) }; setData(prev => ({ ...prev, modules: [...prev.modules, newModule] })); };
  const addTechModule = () => { const newModule: TechModule = { id: Date.now().toString(), type: 'tech', title: '专业技术服务报价', services: [...DEFAULT_TECH_SERVICES], fee: 15000, details: { minDays: 10, auditCerts: 5 } }; setData(prev => ({ ...prev, modules: [...prev.modules, newModule] })); };
  const addCustomModule = () => { const newModule: CustomModule = { id: Date.now().toString(), type: 'custom', title: '新建自定义模块', blocks: [] }; setData(prev => ({ ...prev, modules: [...prev.modules, newModule] })); };
  const removeModule = (id: string) => { setData(prev => ({ ...prev, modules: prev.modules.filter(m => m.id !== id) })); };
  const updateModuleTitle = (id: string, title: string) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => id === m.id ? { ...m, title } : m) })); };
  
  const handleUpdateCertItem = (moduleId: string, itemId: string, field: keyof CertItem, value: any) => {
    setData(prev => ({
      ...prev,
      modules: prev.modules.map(m => 
        (m.id === moduleId && m.type === 'cert')
          ? { ...m, items: m.items.map(i => i.id === itemId ? { ...i, [field]: value } : i) }
          : m
      )
    }));
  };

  const addCertItemToModule = (moduleId: string) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => { if (m.id === moduleId && m.type === 'cert') { const nextYear = 2026 + m.items.length; const newItem: CertItem = { id: Date.now().toString(), type: `${nextYear}年监督审核费`, project: '审核费+管理年金', amount: 0 }; return { ...m, items: [...m.items, newItem] }; } return m; }) })); };
  const removeCertItemFromModule = (moduleId: string) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'cert' && m.items.length > 0 ? { ...m, items: m.items.slice(0, -1) } : m) })); };
  const resetCertModuleItems = (moduleId: string) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'cert' ? { ...m, items: [...DEFAULT_CERT_ITEMS].map(i => ({ ...i, id: Math.random().toString() })) } : m) })); };
  
  const updateTechService = (moduleId: string, serviceId: string, field: keyof TechnicalService, value: any) => {
    setData(prev => {
      const normalizedId = serviceId.padStart(2, '0');
      const iIdx = prev.techServiceSteps.findIndex(s => s.id === normalizedId);
      const newModules = prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, services: m.services.map(s => s.id === serviceId ? { ...s, [field]: value } : s) } : m);
      const newSteps = [...prev.techServiceSteps];
      if (iIdx !== -1) {
        if (field === 'name') newSteps[iIdx] = { ...newSteps[iIdx], title: value };
        if (field === 'description') newSteps[iIdx] = { ...newSteps[iIdx], tags: value.split(/[、,，\s]+/).filter(Boolean) };
      }
      return { ...prev, modules: newModules, techServiceSteps: newSteps };
    });
  };

  const toggleTechService = (moduleId: string, serviceId: string) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, services: m.services.map(s => s.id === serviceId ? { ...s, checked: !s.checked } : s) } : m) })); };
  
  const handleRemoveTechService = (moduleId: string, serviceIdx: number) => {
    setData(prev => {
      const newModules = prev.modules.map(m => { if (m.id === moduleId && m.type === 'tech') { const newServices = [...m.services]; newServices.splice(serviceIdx, 1); return { ...m, services: newServices }; } return m; });
      const newSteps = [...prev.techServiceSteps]; newSteps.splice(serviceIdx, 1);
      const reindexedSteps = newSteps.map((s, i) => ({ ...s, id: (i + 1).toString().padStart(2, '0') }));
      return { ...prev, modules: newModules, techServiceSteps: reindexedSteps };
    });
  };

  const removeTechServiceFromModule = (moduleId: string) => {
    const module = data.modules.find(m => m.id === moduleId && m.type === 'tech') as TechModule;
    if (module && module.services.length > 0) {
      handleRemoveTechService(moduleId, module.services.length - 1);
    }
  };

  const handleReorderTechServices = (moduleId: string, sourceIdx: number, targetIdx: number) => {
    setData(prev => {
      const newModules = prev.modules.map(m => { if (m.id === moduleId && m.type === 'tech') { const newServices = [...m.services]; const [removed] = newServices.splice(sourceIdx, 1); newServices.splice(targetIdx, 0, removed); return { ...m, services: newServices }; } return m; });
      const newSteps = [...prev.techServiceSteps]; const [removedStep] = newSteps.splice(sourceIdx, 1); newSteps.splice(targetIdx, 0, removedStep);
      const reindexedSteps = newSteps.map((s, i) => ({ ...s, id: (i + 1).toString().padStart(2, '0') }));
      return { ...prev, techServiceSteps: reindexedSteps, modules: newModules };
    });
  };

  const addTechServiceToModule = (moduleId: string) => {
    setData(prev => {
      const newIdx = prev.techServiceSteps.length + 1; const newId = newIdx.toString();
      const newItem: TechnicalService = { id: newId, name: '新增技术服务项目', description: '请描述服务内容', checked: true, basePrice: 0 };
      const newModules = prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, services: [...m.services, newItem] } : m);
      const newStep: TechServiceStep = { id: newIdx.toString().padStart(2, '0'), title: newItem.name, desc: '', tags: [] };
      return { ...prev, modules: newModules, techServiceSteps: [...prev.techServiceSteps, newStep] };
    });
  };

  const resetTechModuleServices = (moduleId: string) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, services: [...DEFAULT_TECH_SERVICES].map(s => ({ ...s, id: Math.random().toString() })) } : m), techServiceSteps: [...DEFAULT_TECH_STEP_CONTENT] })); };
  const updateTechModuleFee = (moduleId: string, fee: number) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, fee } : m) })); };
  const updateTechModuleDetails = (moduleId: string, field: 'minDays' | 'auditCerts', value: number) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, details: { ...m.details, [field]: value } } : m) })); };
  
  const addRemark = () => setData(prev => ({ ...prev, additionalRemarks: [...prev.additionalRemarks, ''] }));
  const removeLastRemark = () => { setData(prev => ({ ...prev, additionalRemarks: prev.additionalRemarks.length > 0 ? prev.additionalRemarks.slice(0, -1) : prev.additionalRemarks })); };
  const removeRemark = (index: number) => setData(prev => ({ ...prev, additionalRemarks: prev.additionalRemarks.filter((_, i) => i !== index) }));
  const resetRemarks = () => { setData(prev => ({ ...prev, note1Prefix: INITIAL_DATA.note1Prefix, note1Count: INITIAL_DATA.note1Count, note1Suffix: INITIAL_DATA.note1Suffix, note3Text: INITIAL_DATA.note3Text, additionalRemarks: [], travelExpenseOption: INITIAL_DATA.travelExpenseOption })); setIsNote1Visible(true); setIsNote2Visible(true); setIsNote3Visible(true); };
  const updateAdditionalRemark = (index: number, value: string) => setData(prev => ({ ...prev, additionalRemarks: prev.additionalRemarks.map((r, i) => i === index ? value : r) }));
  
  const toggleStandard = (std: string) => setData(prev => ({ ...prev, certStandards: prev.certStandards.includes(std) ? prev.certStandards.filter(s => s !== std) : [...prev.certStandards, std] }));
  const handleAddCustomStandard = () => { if (customStandardInput.trim()) { const val = customStandardInput.trim(); if (!data.certStandards.includes(val)) setData(prev => ({ ...prev, certStandards: [...prev.certStandards, val] })); setCustomStandardInput(''); setIsAddingCustom(false); } };
  
  const triggerToast = () => { setShowToast(true); setTimeout(() => setShowToast(false), 2000); };

  const handleDownloadPDF = async () => {
    if (!pdfSourceRef.current) return;
    setIsGeneratingPdf(true);
    
    try {
      const exportTarget = document.getElementById('pdf-export-target');
      if (exportTarget) {
        exportTarget.style.display = 'block'; 
      }

      const canvas = await (window as any).html2canvas(pdfSourceRef.current, {
        scale: 2, 
        useCORS: true, 
        logging: false, 
        backgroundColor: '#ffffff',
        allowTaint: true
      });

      if (exportTarget) {
        exportTarget.style.display = 'none'; 
      }

      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      
      const pdf = new (window as any).jspdf.jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: [297, 297 * (canvas.height / canvas.width)],
        putOnlyUsedFonts: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

      const cleanStandards = data.certStandards
        .map(s => s.split(/[:（]/)[0].trim())
        .join('、');
      
      const fileName = `${data.clientName || '未命名公司'}-${cleanStandards}${dynamicTitle}.pdf`;
      
      pdf.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("生成 PDF 失败，可能是内容过多超过浏览器限制。请尝试减少模块或简化内容。");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  /**
   * 彻底重写的 handleDownloadPDFNew 函数
   * 采用“Tailwind CDN + 物理尺寸锁定”技术实现 1:1 导出。
   */
  const handleDownloadPDFNew = async () => {
    if (!pdfSourceRef.current) return;
    setIsGeneratingPdf(true);

    try {
      // 1. 获取预览区域的 HTML
      const content = pdfSourceRef.current.innerHTML;

      // 2. 构造最终的 HTML 文件内容
      const fullHtml = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${data.clientName}报价单</title>
  <!-- 注入 Tailwind CDN 确保样式 1:1 解释 -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet">
  <style>
    /* 定义 CSS 变量以匹配原始应用 */
    :root {
      --font-zh: 'Microsoft YaHei', '微软雅黑', 'PingFang SC', sans-serif;
      --font-en: 'Inter', 'SF Pro Text', -apple-system, sans-serif;
      --font-num: 'DIN Alternate', 'DIN Condensed', 'Arial', sans-serif;
      --font-quote: 'DIN Alternate', 'SF Pro Text', 'Microsoft YaHei', sans-serif;
    }
    
    body { 
      margin: 0; 
      padding: 0; 
      background: #f0f2f5; 
      display: flex; 
      justify-content: center; 
      font-family: var(--font-zh);
      /* 核心：确保内容可被选择和复制 */
      user-select: text !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    /* 物理画板：锁定 297mm 宽度，防止内容贴边 */
    #html-export-container { 
      width: 297mm !important; 
      background: white !important; 
      padding: 30mm 25mm !important; /* 增加上下页边距 */
      box-sizing: border-box !important; 
      box-shadow: 0 0 20px rgba(0,0,0,0.1);
      position: relative;
    }

    /* 强制打印样式：解决分页和尺寸过小问题 */
    @media print {
      @page { 
        size: 297mm auto; /* 核心：锁定宽度，高度自动，从而实现一页长图不分页 */
        margin: 0 !important; 
      }
      body { 
        background: white !important; 
        padding: 0 !important;
        width: 297mm !important;
      }
      #html-export-container { 
        box-shadow: none !important; 
        width: 297mm !important;
        margin: 0 !important;
      }
      /* 禁止浏览器打印时将元素截断 */
      * { 
        page-break-inside: avoid !important; 
        break-inside: avoid !important; 
      }
    }

    /* 修复对齐精度（防止导出时 Tailwind 类丢失解释权） */
    .pl-40 { padding-left: 10rem !important; }
    .text-right { text-align: right !important; }
    .text-left { text-align: left !important; }
    .font-num { font-family: var(--font-num) !important; }
    .font-en { font-family: var(--font-en) !important; }
    .font-quote { font-family: var(--font-quote) !important; }
    
    /* 强制表格显示逻辑 */
    table { width: 100% !important; border-collapse: collapse !important; table-layout: fixed !important; }
    th, td { border-bottom: 1px solid #F2F3F5; }
    
    /* 确保金额列图标对齐 */
    .align-num { 
      display: inline-flex !important; 
      align-items: baseline !important; 
      gap: 2px !important;
    }
  </style>
</head>
<body>
  <div id="html-export-container">
    ${content}
  </div>
</body>
</html>
`;

      // 3. 执行文件下载
      const blob = new Blob([fullHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const cleanStandards = data.certStandards
        .map(s => s.split(/[:（]/)[0].trim())
        .join('、');
      link.href = url;
      link.download = `${data.clientName || '未命名公司'}-${cleanStandards}${dynamicTitle}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert("HTML 导出成功！\n请用浏览器打开导出的 HTML 文件后执行：\n1. 按 Ctrl+P (打印)；\n2. 打印预览此时应为一整张长图，且左右边距正常；\n3. 目标打印机选 '另存为 PDF'；\n4. 注意勾选 '背景图形'。");
    } catch (err) {
      console.error("HTML export failed:", err);
      alert("导出 HTML 失败。");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handleDragStart = (e: React.DragEvent, moduleId: string) => { e.dataTransfer.setData('moduleId', moduleId); e.dataTransfer.effectAllowed = 'move'; };
  const handleDropToMain = (e: React.DragEvent) => { e.preventDefault(); setIsDraggingOverMain(false); };
  
  const handleModuleReorder = (e: React.DragEvent, targetId: string) => {
    e.stopPropagation(); setDragOverModuleId(null);
    const sourceId = e.dataTransfer.getData('moduleId');
    if (!sourceId || sourceId === targetId) return;
    const extraIds = ['cert-process', 'tech-process', 'agency-profile', 'business-qualifications', 'customer-case', 'cert-templates'];
    if (extraIds.includes(sourceId) && extraIds.includes(targetId)) {
      setProcessOrder(prev => {
        const newOrder = [...prev]; const sIdx = newOrder.indexOf(sourceId); const tIdx = newOrder.indexOf(targetId);
        if (sIdx !== -1 && tIdx !== -1) { const [removed] = newOrder.splice(sIdx, 1); newOrder.splice(tIdx, 0, removed); }
        return newOrder;
      });
      triggerToast();
      return;
    }
    setData(prev => { 
      const newModules = [...prev.modules]; const sIdx = newModules.findIndex(m => m.id === sourceId); const tIdx = newModules.findIndex(m => m.id === targetId); 
      if (sIdx !== -1 && tIdx !== -1) { const [removed] = newModules.splice(sIdx, 1); newModules.splice(tIdx, 0, removed); } 
      return { ...prev, modules: newModules }; 
    });
    triggerToast();
  };

  const handleStepReorder = (sourceIdx: number, targetIdx: number) => {
    setData(prev => {
      const newSteps = [...prev.techServiceSteps]; const [removed] = newSteps.splice(sourceIdx, 1); newSteps.splice(targetIdx, 0, removed);
      const reindexedSteps = newSteps.map((s, i) => ({ ...s, id: (i + 1).toString().padStart(2, '0') }));
      const newModules = prev.modules.map(m => { if (m.type === 'tech') { const newServices = [...m.services]; const [removedS] = newServices.splice(sourceIdx, 1); newServices.splice(targetIdx, 0, removedS); return { ...m, services: newServices }; } return m; });
      return { ...prev, techServiceSteps: reindexedSteps, modules: newModules };
    });
  };

  const handleUpdateTechStep = (index: number, field: keyof TechServiceStep, value: any) => {
    setData(prev => {
      const step = prev.techServiceSteps[index]; const normalizedServiceId = step.id.replace(/^0+/, '');
      const newSteps = prev.techServiceSteps.map((s, i) => i === index ? { ...s, [field]: value } : s);
      const newModules = prev.modules.map(m => m.type === 'tech' ? { ...m, services: m.services.map(serv => serv.id === normalizedServiceId && field === 'title' ? { ...serv, name: value } : serv) } : m);
      return { ...prev, techServiceSteps: newSteps, modules: newModules };
    });
  };

  const handleUpdateTechStepTags = (index: number, newTags: string[]) => {
    setData(prev => {
      const step = prev.techServiceSteps[index]; const normalizedServiceId = step.id.replace(/^0+/, '');
      const newSteps = prev.techServiceSteps.map((s, i) => i === index ? { ...s, tags: newTags } : s);
      const newModules = prev.modules.map(m => m.type === 'tech' ? { ...m, services: m.services.map(serv => serv.id === normalizedServiceId ? { ...serv, description: newTags.join('、') } : serv) } : m);
      return { ...prev, techServiceSteps: newSteps, modules: newModules };
    });
  };

  const handleRemoveStep = (index: number) => {
    setData(prev => {
      const newSteps = prev.techServiceSteps.filter((_, i) => i !== index);
      const reindexedSteps = newSteps.map((s, i) => ({ ...s, id: (i + 1).toString().padStart(2, '0') }));
      const newModules = prev.modules.map(m => { if (m.type === 'tech') { return { ...m, services: m.services.filter((_, i) => i !== index) }; } return m; });
      return { ...prev, techServiceSteps: reindexedSteps, modules: newModules };
    });
  };

  const handleRemoveLastStep = () => { if (data.techServiceSteps.length > 0) handleRemoveStep(data.techServiceSteps.length - 1); };
  const handleSelectManager = (manager: typeof PREDEFINED_MANAGERS[0]) => { setData({ ...data, contact: { ...data.contact, name: manager.name, jobTitle1: manager.jobTitle1, phone: manager.phone, email: manager.email, qrCode: manager.qrCode } }); setIsManagerSelectOpen(false); };
  
  const handleCertTemplateFiles = (files: FileList | null) => { if (!files) return; const readers = Array.from(files).map(file => { return new Promise<string>((resolve) => { const reader = new FileReader(); reader.onloadend = async () => { const base64 = reader.result as string; const croppedBase64 = await cropWhiteBottom(base64); resolve(croppedBase64); }; reader.readAsDataURL(file); }); }); Promise.all(readers).then(newImages => { setData(prev => ({ ...prev, certTemplates: [...prev.certTemplates, ...newImages] })); }); };
  const handlePaste = (e: React.ClipboardEvent) => { const items = e.clipboardData.items; for (let i = 0; i < items.length; i++) { if (items[i].type.indexOf('image') !== -1) { const blob = items[i].getAsFile(); if (blob) { const reader = new FileReader(); reader.onloadend = async () => { const base64 = reader.result as string; const croppedBase64 = await cropWhiteBottom(base64); setData(prev => ({ ...prev, certTemplates: [...prev.certTemplates, croppedBase64] })); }; reader.readAsDataURL(blob); } } } };
  const removeCertTemplate = (index: number) => { setData(prev => ({ ...prev, certTemplates: prev.certTemplates.filter((_, i) => i !== index) })); };
  const addCommonTemplate = async (url: string) => { const croppedUrl = await cropWhiteBottom(url); setData(prev => ({ ...prev, certTemplates: [...prev.certTemplates, croppedUrl] })); };
  
  const addTechStep = () => {
    const newIdx = data.techServiceSteps.length + 1; const newId = newIdx.toString().padStart(2, '0');
    const newStep: TechServiceStep = { id: newId, title: '新流程阶段', desc: '请描述此流程的具体内容', tags: ['待定义'] };
    const newItem: TechnicalService = { id: newIdx.toString(), name: newStep.title, description: '', checked: true, basePrice: 0 };
    setData(prev => ({ ...prev, techServiceSteps: [...prev.techServiceSteps, newStep], modules: prev.modules.map(m => m.type === 'tech' ? { ...m, services: [...m.services, newItem] } : m) }));
  };
  const resetTechSteps = () => { setData(prev => ({ ...prev, techServiceSteps: [...DEFAULT_TECH_STEP_CONTENT], modules: prev.modules.map(m => m.type === 'tech' ? { ...m, services: [...DEFAULT_TECH_SERVICES] } : m) })); };

  const addBlockToModule = (moduleId: string | null, type: 'text' | 'table' | 'image') => {
    const newBlock: CaseBlock = 
      type === 'text' ? { id: Date.now().toString(), type: 'text', content: '点击此处输入描述内容...', fontSize: 14, fontWeight: 'normal', color: '#4b5563', align: 'left', underline: false } :
      type === 'table' ? { id: Date.now().toString(), type: 'table', tableData: [['项目名称', '内容描述'], ['示例项目A', '描述效果A'], ['示例项目B', '描述效果B']], rowSpacing: 12, columnWidths: [50, 50], fontSize: 13, fontWeight: 'normal', align: 'left', color: '#4b5563', underline: false } :
      { id: Date.now().toString(), type: 'image', images: [] };
    setData(prev => {
      if (moduleId === null) return { ...prev, caseBlocks: [...prev.caseBlocks, newBlock] };
      return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: [...m.blocks, newBlock] } : m) };
    });
  };

  const removeBlockFromModule = (moduleId: string | null, blockId: string) => {
    setData(prev => {
      if (moduleId === null) return { ...prev, caseBlocks: prev.caseBlocks.filter(b => b.id !== blockId) };
      return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: m.blocks.filter(b => b.id !== blockId) } : m) };
    });
  };

  const updateBlockInModule = (moduleId: string | null, blockId: string, field: keyof CaseBlock, value: any) => {
    setData(prev => {
      if (moduleId === null) return { ...prev, caseBlocks: prev.caseBlocks.map(b => b.id === blockId ? { ...b, [field]: value } : b) };
      return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: m.blocks.map(b => b.id === blockId ? { ...b, [field]: value } : b) } : m) };
    });
  };

  const addTableRowInModule = (moduleId: string | null, blockId: string) => {
    setData(prev => {
      const updateFn = (blocks: CaseBlock[]) => blocks.map(b => b.id === blockId && b.tableData ? { ...b, tableData: [...b.tableData, Array(b.tableData[0].length).fill('')] } : b);
      if (moduleId === null) return { ...prev, caseBlocks: updateFn(prev.caseBlocks) };
      return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: updateFn(m.blocks) } : m) };
    });
  };

  const addTableColInModule = (moduleId: string | null, blockId: string) => {
    setData(prev => {
      const updateFn = (blocks: CaseBlock[]) => blocks.map(b => { if (b.id === blockId && b.tableData) { const defaultWidth = 100 / (b.tableData[0].length + 1); return { ...b, tableData: b.tableData.map(row => [...row, '']), columnWidths: [...(b.columnWidths || []), Math.floor(defaultWidth)] }; } return b; });
      if (moduleId === null) return { ...prev, caseBlocks: updateFn(prev.caseBlocks) };
      return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: updateFn(m.blocks) } : m) };
    });
  };

  const updateTableCellInModule = (moduleId: string | null, blockId: string, r: number, c: number, val: string) => {
    setData(prev => {
      const updateFn = (blocks: CaseBlock[]) => blocks.map(b => { if (b.id === blockId && b.tableData) { const newData = b.tableData.map(row => [...row]); newData[r][c] = val; return { ...b, tableData: newData }; } return b; });
      if (moduleId === null) return { ...prev, caseBlocks: updateFn(prev.caseBlocks) };
      return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: updateFn(m.blocks) } : m) };
    });
  };

  const handleImageFilesToModule = (moduleId: string | null, blockId: string, files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(file => { return new Promise<string>((resolve) => { const reader = new FileReader(); reader.onloadend = async () => { const base64 = reader.result as string; const croppedBase64 = await cropWhiteBottom(base64); resolve(croppedBase64); }; reader.readAsDataURL(file); }); });
    Promise.all(readers).then(newImages => {
      setData(prev => {
        const updateFn = (blocks: CaseBlock[]) => blocks.map(b => b.id === blockId ? { ...b, images: [...(b.images || []), ...newImages] } : b);
        if (moduleId === null) return { ...prev, caseBlocks: updateFn(prev.caseBlocks) };
        return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: m.blocks.map(b => b.id === blockId ? { ...b, images: [...(b.images || []), ...newImages] } : b) } : m) };
      });
    });
  };

  const removeImageFromBlock = (moduleId: string | null, blockId: string, imgIdx: number) => {
    setData(prev => {
      const updateFn = (blocks: CaseBlock[]) => blocks.map(b => b.id === blockId ? { ...b, images: b.images?.filter((_, i) => i !== imgIdx) } : b);
      if (moduleId === null) return { ...prev, caseBlocks: updateFn(prev.caseBlocks) };
      return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: m.blocks.filter(b => b.id !== blockId) } : m) };
    });
  };

  const handleReorderBlocksInModule = (moduleId: string | null, sourceIdx: number, targetIdx: number) => {
    setData(prev => {
      if (moduleId === null) { const newBlocks = [...prev.caseBlocks]; const [removed] = newBlocks.splice(sourceIdx, 1); newBlocks.splice(targetIdx, 0, removed); return { ...prev, caseBlocks: newBlocks }; }
      return { ...prev, modules: prev.modules.map(m => { if (m.id === moduleId && m.type === 'custom') { const newBlocks = [...m.blocks]; const [removed] = newBlocks.splice(sourceIdx, 1); newBlocks.splice(targetIdx, 0, removed); return { ...m, blocks: newBlocks }; } return m; }) };
    });
  };

  const handleReorderCertTemplates = (sourceIdx: number, targetIdx: number) => {
    setData(prev => { const newTemplates = [...prev.certTemplates]; const [removed] = newTemplates.splice(sourceIdx, 1); newTemplates.splice(targetIdx, 0, removed); return { ...prev, certTemplates: newTemplates }; });
  };

  const parseExcelFileToModule = (file: File, moduleId: string | null) => {
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result; const wb = XLSX.read(bstr, { type: 'binary' }); const wsname = wb.SheetNames[0]; const ws = wb.Sheets[wsname];
      const dataArr: any[][] = XLSX.utils.sheet_to_json(ws, { header: 1 }); if (dataArr.length === 0) return;
      const sanitizedData = dataArr.filter(row => row.some(cell => cell !== null && cell !== undefined && cell !== "")).map(row => row.map(cell => cell === null || cell === undefined ? "" : String(cell)));
      if (sanitizedData.length === 0) return;
      const columnCount = sanitizedData[0].length; const defaultWidth = 100 / columnCount;
      const newBlock: CaseBlock = { id: Date.now().toString(), type: 'table', tableData: sanitizedData, rowSpacing: 12, columnWidths: Array(columnCount).fill(Math.floor(defaultWidth)), fontSize: 13, fontWeight: 'normal', align: 'left', color: '#4b5563', underline: false };
      setData(prev => {
        if (moduleId === null) return { ...prev, caseBlocks: [...prev.caseBlocks, newBlock] };
        return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: [...m.blocks, newBlock] } : m) };
      });
    };
    reader.readAsBinaryString(file);
  };

  const handleExcelUploadToModule = (e: React.ChangeEvent<HTMLInputElement>, moduleId: string | null) => {
    const file = e.target.files?.[0]; if (!file) return;
    parseExcelFileToModule(file, moduleId); e.target.value = '';
  };

  const handleExcelUpload = (e: React.ChangeEvent<HTMLInputElement>) => handleExcelUploadToModule(e, null);

  const QuoteDocument = ({ containerRef, isPrint = false, style = {} }: { containerRef?: React.RefObject<HTMLDivElement | null>, isPrint?: boolean, style?: React.CSSProperties }) => {
    const primaryColor = BRAND_COLORS.primary; const deepColor = BRAND_COLORS.deep; const textColor = '#333333';
    const sizeTitleMain = 22; const sizeTitleModule = 17; const sizeText = 14; const sizeSmall = 13; const currentWidth = '297mm';
    const visibleNotes = [];
    if (isNote1Visible) visibleNotes.push({ id: 'note1', content: `以上按${data.note1Prefix} ${data.note1Count} ${data.note1Suffix}` });
    if (isNote2Visible) {
      const content = getTravelNote(data.travelExpenseOption);
      visibleNotes.push({ id: 'note2', content });
    }
    if (isNote3Visible) visibleNotes.push({ id: 'note3', content: data.note3Text });
    data.additionalRemarks.forEach((rem, idx) => { if (rem) visibleNotes.push({ id: `additional-${idx}`, content: rem }); });
    const getBracketLabel = (title: string, type: 'cert' | 'tech') => { 
      const suffix = type === 'cert' ? '管理体系认证报价' : '专业技术服务报价';
      const matched = title.match(new RegExp(`^(.*?)${suffix}$`)) || title.match(/^(.*?)报价$/) || title.match(/^(.*?)费$/);
      return matched ? matched[1].trim() : '';
    };
    const docImgContainerClass = "border border-[#F2F3F5] rounded-[12px] overflow-hidden bg-white shadow-none flex items-center justify-center p-6 transition-transform hover:scale-[1.02] aspect-[1/1.4] w-full h-full";
    const renderBlocksInDoc = (blocks: CaseBlock[]) => {
      return (
        <div className="space-y-10">
          {blocks.map((block) => (
            <div key={block.id} className="animate-fade-in" style={{ textAlign: block.align || 'left' }}>
              {block.type === 'text' ? (
                <div style={{ fontSize: `${block.fontSize || 14}px`, fontWeight: block.fontWeight === 'bold' ? 700 : (block.fontWeight === 'black' ? 900 : 400), color: block.color || '#4b5563', textDecoration: block.underline ? 'underline' : 'none', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{block.content}</div>
              ) : block.type === 'table' ? (
                <div className="overflow-hidden border border-[#F2F3F5] rounded-[12px]" style={{ textAlign: 'left', backgroundColor: '#f8fafc' }}>
                  <table className="w-full text-sm border-collapse" style={{ tableLayout: 'fixed' }}>
                    <thead className="bg-[#F8FAFF] text-[#0062AD]">
                      <tr>{block.tableData?.[0].map((cell, i) => (<th key={i} className="px-4 py-5 text-left font-bold border-b border-[#F2F3F5]" style={{ width: block.columnWidths ? `${block.columnWidths[i]}%` : 'auto' }}>{cell}</th>))}</tr>
                    </thead>
                    <tbody className="divide-y divide-[#F2F3F5]">
                      {block.tableData?.slice(1).map((row, ri) => (<tr key={ri} className="border-b border-[#F2F3F5]">{row.map((cell, ci) => (<td key={ci} className="px-4 font-quote" style={{ paddingBlock: `${block.rowSpacing || 12}px`, wordBreak: 'break-all', whiteSpace: 'normal', textAlign: block.align || 'left', fontSize: `${block.fontSize || 13}px`, color: block.color || '#4b5563', fontWeight: block.fontWeight === 'bold' ? 700 : (block.fontWeight === 'black' ? 900 : 400), textDecoration: block.underline ? 'underline' : 'none' }}>{cell}</td>))}</tr>))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-full">
                  {block.images && block.images.length > 0 && (<div className={`grid ${block.images.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-[40px] items-start`}>{block.images.map((img, idx) => (<div key={idx} className={block.images && block.images.length <= 2 ? 'border border-[#F2F3F5] rounded-[12px] overflow-hidden bg-white shadow-none flex items-center justify-center p-6 transition-transform hover:scale-[1.02] aspect-[1/1.4]' : docImgContainerClass}><img src={img} alt={`Image ${idx}`} loading="lazy" className="max-w-full max-h-full object-contain" /></div>))}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };

    const ModuleHeader = ({ title }: { title: string }) => (
      <div className="flex justify-center mb-10">
        <div className="border-b border-[#E5E6EB] px-8 py-1.5 w-fit">
          <h4 className="uppercase tracking-[0.12em] font-black" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>{title}</h4>
        </div>
      </div>
    );

    const FinalInfoRow = ({ label, content, isEn = false, isBold = false, isSubject = false }: { label: string, content: string, isEn?: boolean, isBold?: boolean, isSubject?: boolean }) => (
      <div className="flex items-baseline w-full" style={{ lineHeight: 1.8 }}>
        <span className="font-medium text-[14px] text-[#4E5969] shrink-0 inline-block" style={{ width: '100px' }}>{label}</span>
        <div className="flex items-baseline gap-[40px] flex-1 min-w-0">
          <span className={`${isBold ? 'font-medium text-[15px]' : 'font-normal text-[14px]'} text-[#1D2129] ${isEn ? 'font-en' : ''} break-words`}>{content}</span>
          {isSubject && (
            <div className="inline-flex items-baseline bg-[#F2F3F5] px-2 py-0.5 rounded-[4px] shrink-0 ml-4 align-num">
              <span className="text-[13px] font-normal text-[#4E5969] text-[13px] leading-none">有效人数：</span>
              <span className="text-[14px] font-medium text-[#1D2129] font-num leading-none transform translate-y-[1px]">{data.employeeCount}</span>
            </div>
          )}
        </div>
      </div>
    );

    return (
      <div ref={containerRef} id="quotation-preview" className={`${isPrint ? '' : 'mx-auto'} bg-white p-[32px] md:p-[48px] transition-all duration-300 origin-top`} style={{ minHeight: isPrint ? 'auto' : '297mm', width: currentWidth, color: textColor, fontFamily: 'var(--font-zh)', ...style }}>
        <style dangerouslySetInnerHTML={{ __html: `
          .font-num { line-height: inherit !important; }
          @media print {
            img {
              image-rendering: -webkit-optimize-contrast;
              -webkit-print-color-adjust: exact;
            }
          }
        `}} />
        <div className="flex justify-between items-center mb-[48px] gap-10 min-h-[80px]">
          <div className="flex-1 flex justify-start items-center">
            {leftLogo && (
              <img 
                src={leftLogo} 
                alt="Brand Left" 
                loading="lazy" 
                className="block" 
                style={{ 
                  height: '80px', 
                  width: 'auto',
                  objectFit: 'contain',
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitPrintColorAdjust: 'exact'
                } as React.CSSProperties} 
              />
            )}
          </div>
          <div className="flex-1 flex justify-end items-center">
            {rightLogo && (
              <img 
                src={rightLogo} 
                alt="Brand Right" 
                loading="lazy" 
                className="block" 
                style={{ 
                  height: '80px', 
                  width: 'auto',
                  objectFit: 'contain',
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitPrintColorAdjust: 'exact'
                } as React.CSSProperties} 
              />
            )}
          </div>
        </div>
        <div className="flex justify-between items-baseline mb-4">
          <div className="flex-1">
            <h2 className="mb-1 leading-tight tracking-tight font-bold" style={{ fontSize: `${sizeTitleMain}px`, color: deepColor }}>{dynamicTitle}</h2>
            <p className="text-[13px] text-gray-400 uppercase tracking-widest font-normal font-en">{dynamicSubtitle}</p>
          </div>
          <div className="text-right pb-1 shrink-0 flex flex-col items-end">
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 font-en">DATE / 签发日期</p>
            <p className="font-bold text-[16px] tracking-tight font-en self-end" style={{ color: textColor }}>{data.quoteDate}</p>
          </div>
        </div>
        <div className="h-[1px] w-full mb-[48px] bg-[#E5E6EB]"></div>
        
        <div className="bg-[#F9FAFB] border-l-[4px] border-[#0062AD] mb-[48px] overflow-hidden rounded-[8px] p-6">
          <div className="flex items-baseline justify-start mb-5 border-b border-[#E5E6EB] pb-3">
             <h4 className="text-[14px] font-semibold uppercase tracking-wider" style={{ color: deepColor }}>客户及认证基本信息 / CLIENT & CERTIFICATION INFORMATION</h4>
          </div>
          <div className="flex flex-col gap-[14px]">
            <FinalInfoRow label="客户名称：" content={data.clientName} isBold={true} isSubject={true} />
            <FinalInfoRow label="经营地址：" content={data.clientAddress} />
            <FinalInfoRow label="认证标准：" content={data.certStandards.join('、')} isEn={true} />
            <FinalInfoRow label="认证范围：" content={data.certScope} />
          </div>
        </div>
        
        <table className="w-full mb-6 border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="py-5 text-left font-bold uppercase border-b border-[#F2F3F5] align-top" style={{ fontSize: `${sizeTitleModule}px`, color: '#475569' }}>描述 / DESCRIPTION</th>
              <th className="py-5 text-left font-bold uppercase pl-40 border-b border-[#F2F3F5] align-top" style={{ fontSize: `${sizeTitleModule}px`, color: '#475569' }}>具体项目 / PROJECT</th>
              <th className="py-5 text-right font-bold uppercase whitespace-nowrap border-b border-[#F2F3F5] align-top" style={{ fontSize: `${sizeTitleModule}px`, color: '#475569' }}>金额 / AMOUNT</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2F3F5]">
            {data.modules.map(module => { 
              if (module.type === 'cert') { 
                const prefix = getBracketLabel(module.title, 'cert'); 
                return module.items.map(item => (
                  <tr key={item.id} className="border-b border-[#F2F3F5] bg-white">
                    <td className="py-5 align-baseline">
                      {prefix ? (<div className="space-y-1"><p className="font-medium text-gray-400" style={{ fontSize: `${sizeSmall + 1}px` }}>【{prefix}】</p><p className="font-medium text-[#072A4A]" style={{ fontSize: `14px` }}>{item.type}</p></div>) : (<p className="font-medium text-[#072A4A]" style={{ fontSize: `14px` }}>{item.type}</p>)}
                    </td>
                    <td className="py-5 pl-40 align-baseline">
                      {prefix && <p className="font-medium text-transparent select-none mb-1" style={{ fontSize: `${sizeSmall + 1}px` }}>【{prefix}】</p>}
                      <p className="text-[#4E5969] font-medium leading-relaxed" style={{ fontSize: `14px` }}>{item.project}</p>
                    </td>
                    <td className="py-5 text-right font-medium whitespace-nowrap font-quote align-baseline" style={{ color: BRAND_COLORS.primary }}>
                      <span className="align-num">
                        <span className="font-bold opacity-40" style={{ fontSize: '12px' }}>¥</span>
                        <span className="font-medium leading-none transform translate-y-[1px]" style={{ fontSize: '16px' }}>{item.amount.toLocaleString()}</span>
                      </span>
                    </td>
                  </tr>
                )); 
              } else if (module.type === 'tech') { 
                const prefix = getBracketLabel(module.title, 'tech'); 
                const activeServices = module.services.filter(s => s.checked).map(s => s.name); 
                const serviceChunks = []; 
                for (let i = 0; i < activeServices.length; i += 3) serviceChunks.push(activeServices.slice(i, i + 3).join('、')); 
                return (
                  <tr key={module.id} className="border-b border-[#F2F3F5] bg-white">
                    <td className="py-5 align-baseline">
                      {prefix ? (<div className="space-y-1"><p className="font-medium text-gray-400" style={{ fontSize: `${sizeSmall + 1}px` }}>【{prefix}】</p><p className="font-medium text-[#072A4A]" style={{ fontSize: `14px` }}>专业技术服务费</p></div>) : (<p className="font-medium text-[#072A4A]" style={{ fontSize: `14px` }}>专业技术服务费</p>)}
                    </td>
                    <td className="py-5 pl-40 align-baseline">
                      <div className="space-y-2">
                        <div className="space-y-0.5">{serviceChunks.map((chunk, idx) => (<p key={idx} className="text-[#072A4A] font-medium leading-relaxed" style={{ fontSize: `14px` }}>{chunk}</p>))}</div>
                        <div className="flex items-baseline gap-0 text-[#4E5969] font-normal" style={{ fontSize: `13px`, marginTop: '8px' }}>
                          <span className="leading-none">指导周期：不少于</span>
                          <span className="inline-flex items-baseline align-num">
                            <span className="font-bold mx-1 font-num leading-none transform translate-y-[1px]" style={{ color: primaryColor, fontSize: '14px' }}>{module.details.minDays}</span>
                            <span className="leading-none">人天</span>
                          </span>
                          <div className="w-px h-3 bg-[#F2F3F5] mx-4 self-center"></div>
                          <span className="leading-none">内审员证书：</span>
                          <span className="inline-flex items-baseline align-num">
                            <span className="font-bold mx-1 font-num leading-none transform translate-y-[1px]" style={{ color: primaryColor, fontSize: '14px' }}>{module.details.auditCerts}</span>
                            <span className="leading-none">份</span>
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 text-right font-medium whitespace-nowrap font-quote align-baseline" style={{ color: BRAND_COLORS.primary }}>
                      <span className="align-num">
                        <span className="font-bold opacity-40" style={{ fontSize: '12px' }}>¥</span>
                        <span className="font-medium leading-none transform translate-y-[1px]" style={{ fontSize: '16px' }}>{module.fee.toLocaleString()}</span>
                      </span>
                    </td>
                  </tr>
                ); 
              } 
              return null; 
            })}
          </tbody>
          <tfoot className="before:content-[''] before:block before:h-2">
            <tr>
              <td colSpan={2} className="py-4 text-left font-bold uppercase tracking-wide bg-white border-t border-[#F2F3F5]" style={{ fontSize: `14px`, color: '#4E5969' }}>报价总计（含6%增值税）</td>
              <td className="py-4 text-right font-bold whitespace-nowrap font-quote bg-white border-t border-[#F2F3F5]" style={{ fontSize: `24px`, color: BRAND_COLORS.primary }}>
                <span className="align-num">
                    <span className="text-[0.45em] font-bold leading-none opacity-60">¥</span>
                    <span className="leading-none transform translate-y-[1px]">{grandTotal.toLocaleString()}</span>
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
        
        <div className="space-y-4 pt-8 pb-10 leading-relaxed mt-0" style={{ fontSize: `${sizeText}px` }}>
          <p className="font-bold underline mb-4 tracking-widest uppercase" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>报价说明 / Terms:</p>
          <div className="space-y-3 font-normal text-gray-700 overflow-hidden">
            {visibleNotes.map((note, idx) => (
              <div key={note.id} className="flex gap-3 items-baseline w-full">
                <span className="font-semibold shrink-0 font-en font-bold leading-none" style={{ color: primaryColor, fontSize: `${sizeSmall}px` }}>{idx + 1}.</span>
                <div dangerouslySetInnerHTML={{ __html: note.content }} className="rich-text-content text-left leading-relaxed font-normal" style={{ fontSize: `${sizeSmall}px`, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-end pt-10 border-t border-[#F2F3F5]">
          <div className="flex-1 text-left">
            <h3 className="mb-3 font-semibold" style={{ fontSize: `${sizeTitleMain + 4}px`, color: deepColor }}>{data.contact.name}</h3>
            <div className="mb-10"><p className="text-[14px] font-normal text-[#333333] mb-1 tracking-tight">{data.contact.jobTitle1}</p><p className="text-[14px] font-normal text-gray-500 tracking-tight">{data.contact.jobTitle2}</p></div>
            <div className="space-y-5">
              <div className="flex items-center gap-4"><div className="w-7 h-7 bg-[#00b050] rounded-sm flex items-center justify-center shrink-0"><Phone className="w-4 h-4 text-white fill-current" /></div><span className="text-[17px] font-bold text-[#333333] font-num tracking-tight leading-none align-num transform translate-y-[1px]">{data.contact.phone}</span></div>
              <div className="flex items-center gap-4"><div className="w-7 h-7 bg-[#EE4932] rounded-sm flex items-center justify-center shrink-0"><Mail className="w-4 h-4 text-white fill-current" /></div><span className="text-[17px] font-bold text-[#333333] font-en tracking-tight leading-none transform translate-y-[1px]">{data.contact.email}</span></div>
              <div className="flex items-center gap-4"><div className="w-7 h-7 bg-[#fbbc04] rounded-sm flex items-center justify-center shrink-0"><MapPin className="w-4 h-4 text-white fill-current" /></div><span className="text-[15px] font-bold text-[#333333] leading-tight tracking-tight">{data.contact.officeAddress}</span></div>
            </div>
          </div>
          <div className="shrink-0 ml-16 relative">
            <div className="relative w-[220px] bg-transparent flex items-end">
              <div className="relative w-full">
                <img src="https://wp-cdn.4ce.cn/v2/bTQ9Tq2.png" alt="Card Decoration" loading="lazy" className="w-full h-auto block" />
                <div className="absolute top-[26%] left-[11.6%] w-[35.5%] h-[40.5%] bg-white p-0 overflow-hidden flex items-center justify-center">
                  {data.contact.qrCode ? <img src={data.contact.qrCode} alt="Contact QR" loading="lazy" className="max-w-full max-h-full aspect-square object-contain" /> : (<div className="flex items-center justify-center w-full h-full bg-white"><QrCode className="w-14 h-14 text-gray-200" /></div>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {processOrder.map(moduleId => {
          const isVisible = moduleId === 'cert-process' ? isCertProcessVisible : moduleId === 'tech-process' ? isTechProcessVisible : moduleId === 'customer-case' ? isCustomerCaseVisible : moduleId === 'cert-templates' ? isCertTemplatesVisible : moduleId === 'agency-profile' || moduleId === 'business-qualifications';
          if (!isVisible) return null;
          
          let title = "";
          let content = null;

          if (moduleId === 'cert-process') {
            title = "管理体系认证流程 / MANAGEMENT SYSTEM CERTIFICATION PROCESS";
            content = <CertificationProcess validity={processValidity} />;
          } else if (moduleId === 'tech-process') {
            title = "专业技术服务流程 / PROFESSIONAL TECHNICAL SERVICE PROCESS";
            content = <TechnicalServiceProcess steps={data.techServiceSteps} />;
          } else if (moduleId === 'agency-profile') {
            title = "机构简介 / AGENCY PROFILE";
            content = <AgencyProfile />;
          } else if (moduleId === 'business-qualifications') {
            title = "业务资质 / BUSINESS QUALIFICATIONS";
            content = <Qualifications />;
          } else if (moduleId === 'customer-case' && data.caseBlocks.length > 0) {
            title = "客户案例 / CUSTOMER CASES";
            content = renderBlocksInDoc(data.caseBlocks);
          } else if (moduleId === 'cert-templates' && data.certTemplates.length > 0) {
            title = "证书模板 / CERTIFICATE TEMPLATES";
            content = (
              <div className={`grid ${data.certTemplates.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-[40px] items-start`}>
                {data.certTemplates.map((img, idx) => (<div key={idx} className={docImgContainerClass}><img src={img} alt={`Template ${idx}`} loading="lazy" className="max-w-full max-h-full object-contain" /></div>))}
              </div>
            );
          }

          if (!content) return null;

          return (
            <div key={moduleId} className="mt-[60px]">
              <ModuleHeader title={title} />
              {content}
            </div>
          );
        })}

        <div className="space-y-[60px]">
          {data.modules.filter(m => m.type === 'custom').map(module => (
            <div key={module.id} className="mt-[60px]">
              <ModuleHeader title={module.title} />
              {renderBlocksInDoc(module.blocks)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const RenderModuleBlocksEditor = ({ moduleId, blocks, excelInputRef }: { moduleId: string | null, blocks: CaseBlock[], excelInputRef: React.RefObject<HTMLInputElement | null> }) => {
    return (
      <div 
        className={`min-h-[300px] rounded-[12px] p-6 border-2 border-dashed transition-all flex flex-col gap-6 ${draggingExcelTargetId === (moduleId || 'main-case') ? 'bg-[#EFF5FC] border-[#0062AD] scale-[1.01]' : 'bg-slate-50/50 border-slate-200'}`}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.types.includes('Files')) setDraggingExcelTargetId(moduleId || 'main-case'); }}
        onDragLeave={() => setDraggingExcelTargetId(null)}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setDraggingExcelTargetId(null); const files = e.target.files; if (files && files.length > 0) { const ext = files[0].name.split('.').pop()?.toLowerCase(); if (['xlsx', 'xls', 'csv'].includes(ext || '')) parseExcelFileToModule(files[0], moduleId); } }}
      >
        {blocks.length === 0 ? (<div className="flex-1 flex flex-col items-center justify-center text-slate-300 py-12 pointer-events-none text-center"><div className="w-20 h-20 bg-white border border-[#E5E6EB] rounded-[12px] flex items-center justify-center mb-4 mx-auto"><Presentation className="w-10 h-10 opacity-20" /></div><p className="text-sm font-bold opacity-60">空白演示画布</p><p className="text-xs opacity-40 mt-1">点击上方按钮 or 直接拖入 Excel 文件识别</p></div>) : (
          <div className="space-y-6">
            {blocks.map((block, idx) => (
              <div key={block.id} draggable onDragStart={(e) => { e.dataTransfer.setData('sourceBlockIdx', idx.toString()); e.dataTransfer.setData('sourceModuleId', moduleId || ''); e.stopPropagation(); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const sIdx = parseInt(e.dataTransfer.getData('sourceBlockIdx')); const sModuleId = e.dataTransfer.getData('sourceModuleId'); if (sModuleId === (moduleId || '') && !isNaN(sIdx) && sIdx !== idx) handleReorderBlocksInModule(moduleId, sIdx, idx); }} className="relative group/block bg-white p-6 rounded-[12px] border border-[#E5E6EB] hover:border-[#BDD1FF] transition-all"><div className="absolute -left-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-200 opacity-0 group-hover/block:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => removeBlockFromModule(moduleId, block.id)} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/block:opacity-100 shadow-sm z-20"><X className="w-3 h-3" /></button>
                {block.type === 'text' ? (<div className="space-y-4"><div className="flex wrap items-center justify-between gap-4 border-b border-gray-50 pb-4 mb-4"><div className="flex items-center gap-2 text-[#0062AD] font-bold text-xs uppercase tracking-widest"><Type className="w-3 h-3" /> 文本样式</div><div className="flex wrap items-center gap-2"><div className="flex items-center gap-1.5 border border-gray-100 rounded-[8px] p-1 bg-gray-50/50"><TypeIcon className="w-3.5 h-3.5 text-gray-400 ml-1" /><input type="number" className="w-12 !p-0.5 !border-0 bg-transparent text-xs font-bold text-center outline-none" value={block.fontSize} onChange={e => updateBlockInModule(moduleId, block.id, 'fontSize', parseInt(e.target.value) || 14)} /></div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100"><button onClick={() => updateBlockInModule(moduleId, block.id, 'underline', !block.underline)} className={`p-1 rounded-[4px] transition-all ${block.underline ? 'bg-[#0062AD] text-white' : 'text-gray-400'}`}><Underline className="w-3 h-3" /></button></div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100">{(['normal', 'bold', 'black'] as const).map(w => (<button key={w} onClick={() => updateBlockInModule(moduleId, block.id, 'fontWeight', w)} className={`px-2 py-0.5 text-[10px] rounded-[4px] transition-all font-bold ${block.fontWeight === w ? 'bg-[#0062AD] text-white' : 'text-gray-400'}`}>{w === 'normal' ? '细' : w === 'bold' ? '粗' : '极'}</button>))}</div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100">{(['left', 'center', 'right'] as const).map(a => (<button key={a} onClick={() => updateBlockInModule(moduleId, block.id, 'align', a)} className={`p-1 rounded-[4px] transition-all ${block.align === a ? 'bg-[#0062AD] text-white' : 'text-gray-400'}`}>{a === 'left' ? <AlignLeft className="w-3 h-3" /> : a === 'center' ? <AlignCenter className="w-3 h-3" /> : <AlignRight className="w-3 h-3" />}</button>))}</div></div></div><textarea className="w-full bg-slate-50 border-none rounded-[8px] p-4 focus:bg-white transition-all min-h-[120px] outline-none" style={{ fontSize: `${block.fontSize}px`, fontWeight: block.fontWeight === 'bold' ? 700 : (block.fontWeight === 'black' ? 900 : 400), color: block.color, textAlign: block.align, textDecoration: block.underline ? 'underline' : 'none' }} value={block.content} onChange={e => updateBlockInModule(moduleId, block.id, 'content', e.target.value)} /></div>
                ) : block.type === 'table' ? (<div className="space-y-4 text-left"><div className="flex wrap items-center justify-between gap-4 border-b border-gray-50 pb-4 mb-4"><div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest"><Table2 className="w-3 h-3" /> 表格管理与样式</div><div className="flex wrap items-center gap-2"><div className="flex items-center gap-1.5 border border-gray-100 rounded-[8px] p-1 bg-gray-50/50"><TypeIcon className="w-3.5 h-3.5 text-gray-400 ml-1" /><input type="number" className="w-12 !p-0.5 !border-0 bg-transparent text-xs font-bold text-center outline-none" value={block.fontSize} onChange={e => updateBlockInModule(moduleId, block.id, 'fontSize', parseInt(e.target.value) || 13)} /></div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100"><input type="color" className="w-6 h-6 p-0 border-0 bg-transparent cursor-pointer" value={block.color || '#4b5563'} onChange={e => updateBlockInModule(moduleId, block.id, 'color', e.target.value)} /></div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100"><button onClick={() => updateBlockInModule(moduleId, block.id, 'fontWeight', block.fontWeight === 'bold' ? 'normal' : 'bold')} className={`p-1 rounded-[4px] transition-all ${block.fontWeight === 'bold' ? 'bg-emerald-600 text-white' : 'text-gray-400'}`}><Bold className="w-3 h-3" /></button><button onClick={() => updateBlockInModule(moduleId, block.id, 'underline', !block.underline)} className={`p-1 rounded-[4px] transition-all ${block.underline ? 'bg-emerald-600 text-white' : 'text-gray-400'}`}><Underline className="w-3 h-3" /></button></div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100">{(['left', 'center', 'right'] as const).map(a => (<button key={a} onClick={() => updateBlockInModule(moduleId, block.id, 'align', a)} className={`p-1 rounded-[4px] transition-all ${block.align === a ? 'bg-emerald-600 text-white' : 'text-gray-400'}`}>{a === 'left' ? <AlignLeft className="w-3 h-3" /> : a === 'center' ? <AlignCenter className="w-3 h-3" /> : <AlignRight className="w-3 h-3" />}</button>))}</div><div className="w-px h-4 bg-gray-200 mx-1"></div><button onClick={() => addTableRowInModule(moduleId, block.id)} className="p-1.5 text-emerald-600 bg-emerald-50 rounded-[4px] flex items-center gap-1 hover:bg-emerald-100 transition-colors"><Plus className="w-3 h-3" /><span className="text-[10px] font-bold">加行</span></button><button onClick={() => addTableColInModule(moduleId, block.id)} className="p-1.5 text-emerald-600 bg-emerald-50 rounded-[4px] flex items-center gap-1 hover:bg-emerald-100 transition-colors"><Columns className="w-3 h-3" /><span className="text-[10px] font-bold">加列</span></button></div></div><div className="overflow-x-auto border border-slate-100 rounded-[12px]"><table className="w-full border-collapse bg-[#f1f5f9] table-fixed" data-table-block-id={block.id}><thead><tr className="bg-[#304166]">{block.tableData?.[0].map((cell, i) => (<th key={i} className="p-0 border-r border-white/10 last:border-0 relative group/th" style={{ width: block.columnWidths ? `${block.columnWidths[i]}%` : 'auto' }}><input className="w-full bg-transparent border-none text-white text-xs font-bold px-3 py-2 focus:ring-0 text-left outline-none" value={cell} onChange={e => updateTableCellInModule(moduleId, block.id, 0, i, e.target.value)} />{i < (block.tableData?.[0].length || 0) - 1 && (<div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#0062AD] z-10 transition-colors" onMouseDown={(e) => { resizingInfo.current = { blockId: block.id, colIdx: i, startX: e.clientX, startWidths: [...(block.columnWidths || [])] }; document.body.style.cursor = 'col-resize'; }} />)}</th>))}</tr></thead><tbody className="divide-y divide-slate-200">{block.tableData?.slice(1).map((row, ri) => (<tr key={ri} className="bg-white hover:bg-slate-50 transition-colors">{row.map((cell, ci) => (<td key={ci} className="p-0 border-r border-slate-200 last:border-0"><textarea className="w-full bg-transparent border-none text-xs px-3 focus:ring-0 resize-none font-quote outline-none" style={{ paddingBlock: `${block.rowSpacing}px`, textAlign: block.align || 'left', fontSize: `${block.fontSize}px`, color: block.color || '#4b5563', fontWeight: block.fontWeight === 'bold' ? 700 : (block.fontWeight === 'black' ? 900 : 400), textDecoration: block.underline ? 'underline' : 'none' }} value={cell} rows={cell.split('\n').length || 1} onChange={e => updateTableCellInModule(moduleId, block.id, ri + 1, ci, e.target.value)} /></td>))}</tr>))}</tbody></table></div></div>
                ) : (<div className="space-y-4"><div className="flex items-center gap-2 text-charcoal font-bold text-xs uppercase tracking-widest border-b border-gray-50 pb-4 mb-4"><ImageIcon className="w-3 h-3" /> 图片管理</div><div className="w-full flex wrap gap-4">{block.images?.map((img, iIdx) => (<div key={iIdx} className="w-[calc(33.333%-12px)] relative group/caseimg border border-[#E5E6EB] rounded-[8px] overflow-hidden bg-white shadow-none transition-transform hover:scale-[1.02]"><img src={img} className="w-full h-auto block" loading="lazy" /><button onClick={() => removeImageFromBlock(moduleId, block.id, iIdx)} className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full shadow-sm opacity-0 group-hover/caseimg:opacity-100 transition-opacity"><Trash2 className="w-3.5 h-3.5" /></button></div>))}<div onClick={() => { activeCaseBlockIdRef.current = block.id; caseImageInputRef.current?.click(); }} className="w-[calc(33.333%-12px)] aspect-square border border-dashed border-[#E5E6EB] rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-[#BDD1FF] transition-all text-gray-400"><Plus className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold">继续添加</span></div></div></div>)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const getModuleSortingInfo = (module: QuoteModule, index: number) => {
    if (module.type === 'cert') return { label: module.title || `体系认证 #${index+1}`, icon: Award, color: 'border-blue-600 text-blue-600 bg-blue-50/30', bar: 'bg-blue-600' };
    if (module.type === 'tech') return { label: module.title || `技术服务 #${index+1}`, icon: Settings, color: 'border-green-600 text-green-600 bg-green-50/30', bar: 'bg-green-600' };
    if (module.type === 'custom') return { label: module.title, icon: Layers, color: 'border-indigo-600 text-indigo-600 bg-indigo-50/30', bar: 'bg-indigo-600' };
    return { label: '未知', icon: FileText, color: 'border-gray-400', bar: 'bg-gray-400' };
  };

  const getProcessSortingInfo = (moduleId: string) => {
    if (moduleId === 'cert-process') return { label: '认证流程', icon: Layers, color: 'border-indigo-600 text-indigo-600 bg-indigo-50/30', bar: 'bg-indigo-600' };
    if (moduleId === 'tech-process') return { label: '技术流程', icon: Layers, color: 'border-indigo-600 text-indigo-600 bg-indigo-50/30', bar: 'bg-indigo-600' };
    if (moduleId === 'customer-case') return { label: '客户案例', icon: Images, color: 'border-amber-500 text-amber-500 bg-amber-50/30', bar: 'bg-amber-500' };
    if (moduleId === 'cert-templates') return { label: '证书模板', icon: LayoutTemplate, color: 'border-amber-500 text-amber-500 bg-amber-50/30', bar: 'bg-amber-500' };
    return { label: '其他', icon: FileText, color: 'border-gray-400', bar: 'bg-gray-400' };
  };

  const SidebarTitle = ({ icon: Icon, title, isSub = false }: { icon: any, title: string, isSub?: boolean }) => ( <div className={`flex items-center gap-2 font-semibold text-[#072A4A] ${isSub ? 'mb-4 mt-6' : 'mb-4 pb-3 border-b border-[#EFF5FC]'}`}><Icon className="w-4 h-4 text-[#0062AD]" /><span className="text-[15px]">{title}</span></div> );

  const extraModulesMap = {
    'cert-process': isCertProcessVisible ? ( <section key="cert-process" draggable="true" onDragStart={(e) => handleDragStart(e, 'cert-process')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('cert-process'); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'cert-process')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border ${dragOverModuleId === 'cert-process' ? 'border-[#0062AD] scale-[1.01]' : 'border-[#E5E6EB] hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsCertProcessVisible(false)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-8"><div className="section-header !mb-0" style={{ borderLeftColor: '#0062AD' }}><LayoutGrid className="w-5 h-5" /><span>管理体系认证流程</span></div><div className="flex items-center bg-[#F2F3F5] p-1 rounded-[12px] shadow-none transition-all duration-300"><button onClick={() => setProcessValidity('1year')} className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all flex items-center gap-1.5 active:scale-95 ${processValidity === '1year' ? 'bg-white text-[#0062AD] shadow-sm' : 'text-[#595959] hover:bg-white/50'}`}><Clock className="w-3.5 h-3.5" /> 一年有效期</button><button onClick={() => setProcessValidity('3years')} className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all flex items-center gap-1.5 active:scale-95 ${processValidity === '3years' ? 'bg-white text-[#0062AD] shadow-sm' : 'text-[#595959] hover:bg-white/50'}`}><Clock className="w-3.5 h-3.5" /> 三年有效期</button></div></div><CertificationProcess validity={processValidity} /></section> ) : null,
    'tech-process': isTechProcessVisible ? ( <section key="tech-process" draggable="true" onDragStart={(e) => handleDragStart(e, 'tech-process')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('tech-process'); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'tech-process')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border ${dragOverModuleId === 'tech-process' ? 'border-[#0062AD] scale-[1.01]' : 'border-[#E5E6EB] hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsTechProcessVisible(false)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-6"><div className="section-header !mb-0" style={{ borderLeftColor: '#0062AD' }}><Zap className="w-5 h-5" /><span>专业技术服务流程</span></div><div className="flex gap-[12px]"><button onClick={resetTechSteps} className="btn-header-func"><RotateCcw className="w-3.5 h-3.5" /> 重置</button><button onClick={addTechStep} className="btn-header-func"><Plus className="w-3.5 h-3.5" /> 添加流程</button><button onClick={handleRemoveLastStep} className="btn-header-dest"><Minus className="w-3.5 h-3.5" /> 移除流程</button></div></div><TechnicalServiceProcess steps={data.techServiceSteps} onUpdateStep={handleUpdateTechStep} onRemoveStep={handleRemoveStep} onReorderSteps={handleStepReorder} onUpdateTags={handleUpdateTechStepTags} isEditable={true} /></section> ) : null,
    'agency-profile': ( <section key="agency-profile" className="card overflow-hidden transition-all duration-300 border border-[#E5E6EB]"><div className="section-header" style={{ borderLeftColor: '#0062AD' }}><Building className="w-5 h-5" /><span>机构简介</span></div><AgencyProfile /></section> ),
    'business-qualifications': ( <section key="business-qualifications" className="card overflow-hidden transition-all duration-300 border border-[#E5E6EB]"><div className="section-header" style={{ borderLeftColor: '#0062AD' }}><FileCheck className="w-5 h-5" /><span>业务资质</span></div><Qualifications /></section> ),
    'customer-case': isCustomerCaseVisible ? (
      <section key="customer-case" draggable="true" onDragStart={(e) => handleDragStart(e, 'customer-case')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('customer-case'); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'customer-case')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border ${dragOverModuleId === 'customer-case' ? 'border-[#0062AD] scale-[1.01]' : 'border-[#E5E6EB] hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsCustomerCaseVisible(false)} title="隐藏模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-6"><div className="section-header !mb-0" style={{ borderLeftColor: '#0062AD' }}><Presentation className="w-5 h-5" /><span>客户案例展示</span></div><div className="flex gap-[12px]"><button onClick={() => setData(prev => ({ ...prev, caseBlocks: [] }))} className="btn-header-func"><RotateCcw className="w-3.5 h-3.5" /> 重置</button><button onClick={() => excelInputRef.current?.click()} className="btn-header-func"><FileSpreadsheet className="w-3.5 h-3.5" /> 导入 Excel</button><button onClick={() => addBlockToModule(null, 'image')} className="btn-header-func"><Images className="w-3.5 h-3.5" /> 添加图片</button><button onClick={() => addBlockToModule(null, 'text')} className="btn-header-func"><Type className="w-3.5 h-3.5" /> 添加文本</button><button onClick={() => addBlockToModule(null, 'table')} className="btn-header-func"><Table2 className="w-3.5 h-3.5" /> 添加表格</button></div></div><input type="file" ref={excelInputRef} className="hidden" accept=".xlsx, .xls, .csv" onChange={handleExcelUpload} /><RenderModuleBlocksEditor moduleId={null} blocks={data.caseBlocks} excelInputRef={excelInputRef} /></section>
    ) : null,
    'cert-templates': isCertTemplatesVisible ? (
      <section key="cert-templates" draggable="true" onDragStart={(e) => handleDragStart(e, 'cert-templates')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('cert-templates'); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'cert-templates')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border ${dragOverModuleId === 'cert-templates' ? 'border-[#0062AD] scale-[1.01]' : 'border-[#E5E6EB] hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsCertTemplatesVisible(false)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-6"><div className="section-header !mb-0" style={{ borderLeftColor: '#0062AD' }}><Award className="w-5 h-5" /><span>证书模板</span></div><div className="flex gap-[12px]"><button onClick={() => setData(prev => ({ ...prev, certTemplates: [] }))} className="btn-header-dest"><RotateCcw className="w-3.5 h-3.5" /> 清空</button><button onClick={() => certTemplateInputRef.current?.click()} className="btn-header-func"><Upload className="w-3.5 h-3.5" /> 上传模板</button></div></div><div className={`min-h-[200px] border-2 border-dashed rounded-[12px] transition-all duration-300 flex flex-col items-center justify-center p-6 ${isDraggingOverCertTemplates ? 'border-[#0062AD] bg-[#EFF5FC]' : 'border-gray-200 hover:border-[#BDD1FF]'}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverCertTemplates(true); }} onDragLeave={() => setIsDraggingOverCertTemplates(false)} onDrop={(e) => { e.preventDefault(); setIsDraggingOverCertTemplates(false); const templateUrl = e.dataTransfer.getData('templateUrl'); if (templateUrl) addCommonTemplate(templateUrl); else { const internalTmplIdx = e.dataTransfer.getData('certTemplateIdx'); if (internalTmplIdx === "") handleCertTemplateFiles(e.dataTransfer.files); } }} onPaste={handlePaste} onClick={() => data.certTemplates.length === 0 && certTemplateInputRef.current?.click()}><input type="file" ref={certTemplateInputRef} className="hidden" accept="image/*" multiple onChange={(e) => handleCertTemplateFiles(e.target.files)} />{data.certTemplates.length > 0 ? (<div className="w-full flex wrap justify-center gap-[40px]">{data.certTemplates.map((img, tIdx) => (<div key={tIdx} draggable onDragStart={(e) => { e.dataTransfer.setData('certTemplateIdx', tIdx.toString()); e.stopPropagation(); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const sIdx = parseInt(e.dataTransfer.getData('certTemplateIdx')); if (!isNaN(sIdx) && sIdx !== tIdx) handleReorderCertTemplates(sIdx, tIdx); }} className="w-[calc(33.333%-27px)] relative group/img border border-[#E5E6EB] rounded-[12px] overflow-hidden bg-white shadow-none transition-transform hover:scale-[1.02] cursor-grab active:cursor-grabbing"><img src={img} alt={`Template ${tIdx}`} loading="lazy" className="w-full h-auto block object-contain" /><button onClick={(e) => { e.stopPropagation(); removeCertTemplate(tIdx); }} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-sm opacity-0 group-hover/img:opacity-100 transition-opacity z-10"><Trash2 className="w-3.5 h-3.5" /></button></div>))}<div onClick={() => certTemplateInputRef.current?.click()} className="w-[calc(33.333%-27px)] aspect-square border-2 border-dashed border-gray-200 rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-[#BDD1FF] hover:bg-gray-50 transition-all text-gray-400 group"><Plus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" /><span className="text-[11px] font-bold">继续添加</span></div></div>) : (<div className="flex flex-col items-center text-gray-300 pointer-events-none"><div className="w-16 h-16 rounded-[12px] bg-gray-50 border border-[#E5E6EB] flex items-center justify-center mb-4"><Copy className="w-8 h-8 text-gray-200" /></div><p className="text-[14px] font-bold text-gray-400">支持上传、拖放图片或粘贴截图</p><p className="text-[12px] text-gray-300 mt-1">系统将自动分析并裁剪底部多余白边</p></div>)}</div></section>
    ) : null
  };

  const sortingItemClass = (isActive: boolean) => `relative bg-[#F8FAFC] border border-[#E5E6EB] min-h-[52px] px-3 rounded-[8px] flex items-center justify-between shadow-none cursor-move transition-all duration-300 group ${isActive ? 'bg-[#F0F8FF] border-[#0062AD] ring-1 ring-[#0062AD]/10' : 'hover:bg-[#F0F8FF] hover:border-[#BDD1FF]'}`;
  const iconBoxClass = "w-6 h-6 flex items-center justify-center bg-white border border-[#E5E6EB] rounded-[4px] text-[#0075CB] shrink-0";
  const dragLineClass = (isActive: boolean) => `absolute left-0 top-2 bottom-2 ${isActive ? 'w-[4px]' : 'w-[2px]'} bg-[#0075CB] rounded-r-full transition-all duration-200`;

  const InputWrapperStyle = "border border-gray-200 rounded-[12px] p-2 bg-white cursor-text hover:border-[#0062AD] hover:shadow-[0_0_0_3px_rgba(0,98,173,0.08)] focus-within:border-[#0062AD] focus-within:shadow-[0_0_0_3px_rgba(0,98,173,0.08)] transition-all min-h-[42px] flex items-center outline-none ring-0";

  const autoResize = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget;
    target.style.height = 'auto';
    target.style.height = target.scrollHeight + 'px';
  };

  return (
    <div className="max-w-[1550px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
      <div id="pdf-export-target" className="absolute -left-[9999px] top-0"><QuoteDocument containerRef={pdfSourceRef} isPrint={true} /></div>
      
      <div className={`flex-1 max-w-[900px] transition-colors duration-300 space-y-4 ${isDraggingOverMain ? 'bg-[#EFF5FC]' : ''}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverMain(true); }} onDragLeave={() => setIsDraggingOverMain(false)} onDrop={handleDropToMain}>
        
        <header className="flex flex-col mb-10 text-center"><div className="relative flex justify-between items-center w-full mb-12 gap-10 transition-all min-h-[120px]"><EditableBrandLogo src={leftLogo} label="左侧 Logo" onUpload={setLeftLogo} align="left" className="flex-1" /><EditableBrandLogo src={rightLogo} label="右侧 Logo" onUpload={setLeftLogoRight} align="right" className="flex-1" /></div><div className="text-center relative"><div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent -z-10"></div><h1 className="text-[22px] md:text-[28px] font-bold text-[#304166] mb-2 bg-[#F8FAFC] inline-block px-10 transition-all duration-300">{dynamicTitle}</h1><p className="text-gray-500 text-[13px] tracking-[0.2em] uppercase leading-tight font-normal opacity-80">{dynamicSubtitle}</p></div></header>
        
        <section className="card text-left"><div className="section-header" style={{ borderLeftColor: '#0062AD' }}><Building2 className="w-5 h-5" /><span>客户及认证基本信息</span></div><div className="grid grid-cols-12 gap-x-4 gap-y-3">
          <div className="col-span-12 md:col-span-9">
            <label className="field-label">客户名称</label>
            <div className={InputWrapperStyle}>
              <textarea 
                className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-[14px] leading-relaxed resize-none h-auto overflow-hidden text-left outline-none" 
                rows={1}
                style={{ height: 'auto' }}
                onInput={autoResize}
                value={data.clientName} 
                onChange={e => setData({...data, clientName: e.target.value})} 
                placeholder="输入公司全称" 
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-3">
            <label className="field-label">有效人数</label>
            <div className={InputWrapperStyle}>
              <input 
                className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-[14px] text-left font-num outline-none" 
                type="number" 
                value={data.employeeCount} 
                onChange={e => setData({...data, employeeCount: parseInt(e.target.value) || 0})} 
              />
            </div>
          </div>
          <div className="col-span-12">
            <label className="field-label">客户经营地址</label>
            <div className={InputWrapperStyle}>
              <textarea 
                className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-[14px] leading-relaxed resize-none h-auto overflow-hidden text-left outline-none" 
                rows={1}
                style={{ height: 'auto' }}
                onInput={autoResize}
                value={data.clientAddress} 
                onChange={e => setData({...data, clientAddress: e.target.value})} 
                placeholder="详细经营地址" 
              />
            </div>
          </div>
          <div className="col-span-12 relative" ref={standardDropdownRef}>
            <label className="field-label">认证标准</label>
            <div onClick={() => setIsStandardOpen(!isStandardOpen)} className={`${InputWrapperStyle} !items-start cursor-pointer min-h-[46px] flex-col !p-2.5`}>
              <div className="flex flex-wrap gap-2 text-[13px] font-normal text-gray-500 w-full">
                {data.certStandards.length > 0 ? (
                  <div className="flex wrap gap-2 w-full">
                    {data.certStandards.map(s => (
                      <span key={s} className="bg-[#F2F3F5] text-[#1D2129] text-[12px] px-3 py-1.5 rounded-[6px] border border-slate-200 font-semibold flex items-center gap-2 group/standard w-fit">
                        <span className="whitespace-normal leading-tight">{s}</span>
                        <X className="w-3.5 h-3.5 ml-0.5 opacity-0 group-hover/standard:opacity-100 cursor-pointer shrink-0 hover:text-[#F53F3F]" onClick={(e) => { e.stopPropagation(); toggleStandard(s); }} />
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-gray-400 text-xs py-1">点击选择认证标准...</span>
                )}
              </div>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isStandardOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
            {isStandardOpen && (<div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-[#E5E6EB] rounded-[12px] shadow-2xl overflow-hidden animate-fade-in flex flex-col min-w-[320px] sm:min-w-[700px] w-full"><div className="p-2 border-b border-gray-50 bg-gray-50/50"><span className="text-[10px] font-black text-[#0062AD] uppercase tracking-widest pl-2">认证标准快速检索与选择</span></div><div className="p-3 flex flex-col gap-2"><div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" /><input autoFocus type="text" placeholder="搜索标准..." className="pl-8 pr-3 py-1.5 border-gray-200 text-xs !rounded-[8px] outline-none w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 max-h-[400px] overflow-y-auto pr-1">{filteredStandards.map(std => (<div key={std} onClick={() => toggleStandard(std)} className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-[8px] cursor-pointer group transition-colors"><div className={`w-3.5 h-3.5 rounded-[4px] border transition-colors flex items-center justify-center flex-shrink-0 ${data.certStandards.includes(std) ? 'bg-[#0062AD] border-[#0062AD]' : 'border-gray-300 group-hover:border-[#0062AD]'}`}>{data.certStandards.includes(std) && <Check className="w-2.5 h-2.5 text-white" />}</div><span className="text-[12px] text-gray-700 truncate select-none leading-tight">{std}</span></div>))}<div className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-[8px] cursor-pointer group transition-colors">{isAddingCustom ? (<div className="flex items-center gap-1.5 w-full" onClick={e => e.stopPropagation()}><input autoFocus placeholder="输入标准名称" className="flex-1 !py-1 !px-2 text-[11px] border-[#BDD1FF] focus:border-[#0062AD] !rounded-[8px] outline-none" value={customStandardInput} onChange={e => setCustomStandardInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddCustomStandard()} /><button onClick={handleAddCustomStandard} className="p-1 text-[#0062AD] hover:bg-[#EFF5FC] rounded-[8px] transition-colors"><Check className="w-3 h-3" /></button><button onClick={() => { setIsAddingCustom(false); setCustomStandardInput(''); }} className="p-1 text-[#EE4932] hover:bg-red-50 rounded-[8px] transition-colors"><X className="w-3 h-3" /></button></div>) : (<div onClick={(e) => { e.stopPropagation(); setIsAddingCustom(true); }} className="flex items-center gap-2 w-full"><div className="w-3.5 h-3.5 rounded-[4px] border border-dashed border-gray-300 group-hover:border-[#0062AD] flex items-center justify-center flex-shrink-0"><Plus className="w-2.5 h-2.5 text-gray-400 group-hover:text-[#0062AD]" /></div><span className="text-[12px] text-gray-400 font-semibold group-hover:text-[#0062AD] transition-colors">其他</span></div>)}</div></div></div></div>)}
          </div>
          <div className="col-span-12">
            <label className="field-label">认证范围</label>
            <div className={`${InputWrapperStyle} !items-start`}>
              <textarea 
                className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-[14px] leading-relaxed resize-none h-auto overflow-hidden text-left outline-none" 
                rows={1}
                style={{ height: 'auto' }}
                onInput={autoResize}
                value={data.certScope} 
                onChange={e => setData({...data, certScope: e.target.value})} 
                placeholder="详细描述认证覆盖范围" 
              />
            </div>
          </div>
        </div></section>
        
        {data.modules.filter(m => m.type !== 'custom').map((module) => (
          <section key={module.id} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border ${dragOverModuleId === module.id ? 'border-[#0062AD] scale-[1.01]' : 'border-[#E5E6EB] hover:border-[#BDD1FF] text-left'}`} draggable="true" onDragStart={(e) => handleDragStart(e, module.id)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(module.id); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, module.id)}>
            <div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => removeModule(module.id)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 z-10"><Trash2 className="w-4 h-4" /></button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="section-header !mb-0 flex-1" style={{ borderLeftColor: '#0062AD' }}>{module.type === 'cert' ? <Layout className="w-5 h-5 shrink-0" /> : <Settings className="w-5 h-5 shrink-0" />}<input className={`!border-0 !p-0 font-semibold bg-transparent focus:ring-0 text-[17px] w-full outline-none ${module.type === 'tech' ? 'text-[#055087] font-semibold' : 'text-[#304166]'}`} value={module.title} onChange={e => updateModuleTitle(module.id, e.target.value)} /></div>
              <div className="flex gap-[12px]">
                {module.type === 'cert' ? (<><button onClick={() => resetCertModuleItems(module.id)} className="btn-header-func"><RotateCcw className="w-3.5 h-3.5" /> 重置</button><button onClick={() => addCertItemToModule(module.id)} className="btn-header-func"><Plus className="w-3.5 h-3.5" /> 添加阶段</button><button onClick={() => removeCertItemFromModule(module.id)} className="btn-header-dest"><Minus className="w-3.5 h-3.5" /> 移除阶段</button></>) : (<><button onClick={() => resetTechModuleServices(module.id)} className="btn-header-func"><RotateCcw className="w-3.5 h-3.5" /> 重置</button><button onClick={() => addTechServiceToModule(module.id)} className="btn-header-func"><Plus className="w-3.5 h-3.5" /> 添加服务</button><button onClick={() => removeTechServiceFromModule(module.id)} className="btn-header-dest"><Minus className="w-3.5 h-3.5" /> 移除服务</button></>)}
              </div>
            </div>
            {module.type === 'cert' ? (
              <div className="border border-[#E5E6EB] rounded-[12px] overflow-hidden shadow-none">
                <table className="w-full text-[14px] border-separate border-spacing-0">
                  <thead className="bg-white">
                    <tr>
                      <th className="px-5 py-5 text-left font-bold text-[#475569] border-b border-[#F2F3F5]">认证阶段</th>
                      <th className="px-5 py-5 text-left font-bold text-[#475569] border-b border-[#F2F3F5]">具体收费项目</th>
                      <th className="px-5 py-5 text-right font-bold text-[#475569] w-40 border-b border-[#F2F3F5]">金额 (CNY)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {module.items.map((item) => (
                      <tr key={item.id} className="bg-white border-b border-[#E5E6EB] last:border-0">
                        <td className="p-0 align-top">
                          <input className="!border-0 px-5 py-5 focus:ring-0 bg-transparent w-full text-left outline-none text-[14px] font-medium text-[#072A4A]" value={item.type} onChange={e => handleUpdateCertItem(module.id, item.id, 'type', e.target.value)} />
                        </td>
                        <td className="p-0 align-top">
                          <input className="!border-0 px-5 py-5 focus:ring-0 bg-transparent w-full text-left outline-none text-[14px] text-[#4E5969]" value={item.project} onChange={e => handleUpdateCertItem(module.id, item.id, 'project', e.target.value)} />
                        </td>
                        <td className="p-0 bg-white cursor-text align-top" onClick={() => setEditingCertId({moduleId: module.id, itemId: item.id})}>
                          <div className="flex items-baseline justify-end px-5 py-5 gap-1 text-[#0075CB] font-medium font-quote leading-none align-num">
                            <span className="font-bold opacity-40 text-[12px]">¥</span>
                            {editingCertId?.moduleId === module.id && editingCertId?.itemId === item.id ? (
                              <input autoFocus className="!border-0 !p-0 focus:ring-0 bg-transparent text-right font-medium w-24 font-quote outline-none text-[16px]" type="number" value={item.amount} onBlur={() => setEditingCertId(null)} onChange={e => handleUpdateCertItem(module.id, item.id, 'amount', parseFloat(e.target.value) || 0)} />
                            ) : (
                              <span className="text-[16px] font-normal leading-none transform translate-y-[1px]">{item.amount.toLocaleString()}</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="bg-[#F8FAFC] px-5 py-4 flex items-center justify-between rounded-b-[12px] border-t border-[#E5E6EB]">
                  <span className="text-[14px] text-[#4E5969] font-medium">认证费用总计（含6%增值税）</span>
                  <div className="flex items-baseline justify-end text-[#0075CB] font-bold text-[18px] whitespace-nowrap font-quote leading-none align-num">
                    <span className="text-[12px] font-bold opacity-60 mr-0.5">¥</span>
                    <span className="leading-none transform translate-y-[1px]">{module.items.reduce((s, i) => s + (i.amount || 0), 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              <><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-stretch">{module.services.filter(s => s).map((service, idx) => {
                    const color = STEP_COLORS[idx % STEP_COLORS.length]; const displayId = (idx + 1).toString().padStart(2, '0');
                    const ProcessIcon = STEP_ICONS[idx % STEP_ICONS.length] || Settings;
                    return (
                      <div key={service.id} draggable="true" onDragStart={(e) => { e.dataTransfer.setData('serviceIdx', idx.toString()); e.dataTransfer.setData('sourceModuleId', module.id); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const sIdx = parseInt(e.dataTransfer.getData('serviceIdx')); const sourceModId = e.dataTransfer.getData('sourceModuleId'); if (sourceModId === module.id && sIdx !== idx) handleReorderTechServices(module.id, sIdx, idx); }} className={`group relative h-full flex flex-col p-5 rounded-[10px] transition-all duration-300 overflow-hidden border ${service.checked ? `${color.bg} border-[#BDD1FF]` : 'bg-[#F2F3F5] border-[#E5E6EB] grayscale-[0.8]'}`} style={{ }}>
                        <div className={`absolute -right-1 -top-2 text-[3.5rem] font-black italic select-none ${service.checked ? color.num : 'text-[#86909C]/10'} font-num z-0`}>{displayId}</div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-20">
                          <button onClick={(e) => { e.stopPropagation(); toggleTechService(module.id, service.id); }} title={service.checked ? "隐藏项目" : "显示项目"} className={`p-1.5 rounded-full transition-all ${service.checked ? 'bg-white text-[#0062AD] hover:bg-[#0062AD] hover:text-white shadow-sm' : 'bg-[#86909C] text-white shadow-none'}`}>
                            {service.checked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="flex flex-col relative z-10 flex-1">
                          <div className={`mb-3 flex items-center justify-start ${service.checked ? color.text : 'text-[#86909C]'}`}>
                            <ProcessIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1 min-w-0 flex flex-col h-full">
                            <input className={`!p-0 !border-0 bg-transparent focus:ring-0 text-[14px] font-bold block w-full text-left outline-none mb-2 ${service.checked ? color.text : 'text-[#86909C]'}`} value={service.name} onChange={e => updateTechService(module.id, service.id, 'name', e.target.value)} />
                            <textarea className={`!p-0 !border-0 bg-transparent focus:ring-0 text-[12px] text-left leading-relaxed block w-full font-normal outline-none resize-none overflow-hidden ${service.checked ? 'text-[#4E5969]' : 'text-[#86909C]/70'}`} rows={2} style={{ height: 'auto' }} value={service.description} onChange={e => updateTechService(module.id, service.id, 'description', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    );
                  })}</div><div className="border border-[#E5E6EB] rounded-[12px] overflow-hidden bg-white shadow-none">
                  <div className="bg-white flex wrap items-center px-5 pt-5 pb-6 text-[14px] font-quote m-0 rounded-t-[12px] gap-x-0">
                    <div className="flex items-center gap-2 font-normal text-left">
                      <span className="text-[#4E5969] font-medium shrink-0">指导周期：</span>
                      <span className="text-[#4E5969] shrink-0">不少于（现场+远程）</span>
                      <div className="border border-[#E5E6EB] rounded-[4px] p-1.5 bg-white w-16 ml-2 mr-0">
                        <input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-center font-medium text-[#0075CB] font-quote outline-none" value={module.details.minDays} onChange={e => updateTechModuleDetails(module.id, 'minDays', parseInt(e.target.value) || 0)} />
                      </div>
                      <span className="text-[#4E5969] ml-2">人天</span>
                    </div>
                    <div className="w-px h-3 bg-[#E5E6EB] mx-8 self-center"></div>
                    <div className="flex items-center gap-2 font-normal">
                      <span className="text-[#4E5969] font-medium">内审员证书：</span>
                      <div className="border border-[#E5E6EB] rounded-[4px] p-1.5 bg-white w-16 ml-2 mr-0">
                        <input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-center font-medium text-[#0075CB] font-quote outline-none" value={module.details.auditCerts} onChange={e => updateTechModuleDetails(module.id, 'auditCerts', parseInt(e.target.value) || 0)} />
                      </div>
                      <span className="text-[#4E5969] ml-2">份</span>
                    </div>
                  </div>
                  <div className="bg-[#F8FAFC] px-5 py-4 flex items-center justify-between m-0 rounded-b-[12px] border-t border-[#E5E6EB]">
                    <span className="font-medium text-[#4E5969] text-[14px]">技术服务费用总计（含6%增值税）</span>
                    <div className="flex items-baseline justify-end text-[#0075CB] font-bold text-[18px] whitespace-nowrap font-quote transition-all min-w-[120px] leading-none align-num">
                      <span className="mr-0.5 font-quote opacity-60 text-sm">¥</span>
                      {editingTechFeeId === module.id ? (
                        <input autoFocus className="!border-0 !p-0 focus:ring-0 bg-transparent text-right font-bold text-[18px] w-28 placeholder:text-blue-200 font-quote outline-none" type="number" value={module.fee} onBlur={() => setEditingTechFeeId(null)} onChange={e => updateTechModuleFee(module.id, parseFloat(e.target.value) || 0)} />
                      ) : (
                        <span onClick={() => setEditingTechFeeId(module.id)} className="cursor-text text-right font-bold font-quote leading-none transform translate-y-[1px]">{module.fee.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                </div></>
            )}
          </section>
        ))}

        <section className="card text-left">
          <div className="flex justify-between items-center mb-6">
            <div className="section-header !mb-0" style={{ borderLeftColor: '#0062AD' }}>
              <MessageSquare className="w-5 h-5 text-[#072A4A]" />
              <span className="text-[#072A4A]">报价说明及备注</span>
            </div>
            <div className="flex gap-[12px]">
              <button onClick={resetRemarks} className="btn-header-func"><RotateCcw className="w-3.5 h-3.5" /> 重置</button>
              <button onClick={addRemark} className="btn-header-func"><Plus className="w-3.5 h-3.5" /> 添加备注项</button>
              <button onClick={removeLastRemark} className="btn-header-dest"><Minus className="w-3.5 h-3.5" /> 移除备注项</button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`p-4 border border-[#E5E6EB] rounded-[12px] bg-gray-50/50 group relative transition-all ${!isNote1Visible ? 'opacity-40 grayscale' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-[#072A4A] font-bold text-xs uppercase tracking-widest"><Info className="w-3.5 h-3.5" /> 备注 1：规模说明</div>
                <button onClick={() => setIsNote1Visible(!isNote1Visible)} className={`p-1 rounded-[8px] transition-colors ${isNote1Visible ? 'text-[#072A4A] hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-200'}`}>{isNote1Visible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-50 line-through" />}</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-left justify-start">
                <span className="text-[13px] text-[#4E5969] whitespace-nowrap">以上按</span>
                <div className={InputWrapperStyle + " flex-1 min-w-[200px] !min-h-0 !p-1.5"}>
                  <textarea 
                    className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-left font-normal text-[13px] text-[#4E5969] resize-none h-auto overflow-hidden text-left outline-none" 
                    rows={1}
                    style={{ height: 'auto' }}
                    onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
                    value={data.note1Prefix} 
                    onChange={e => setData({...data, note1Prefix: e.target.value})} 
                  />
                </div>
                <div className={InputWrapperStyle + " !w-20 !min-h-0 !p-1.5"}>
                  <input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-center font-normal text-[13px] text-[#0062AD] outline-none font-num" type="number" value={data.note1Count} onChange={e => setData({...data, note1Count: parseInt(e.target.value) || 0})} />
                </div>
                <div className={InputWrapperStyle + " flex-1 min-w-[200px] !min-h-0 !p-1.5"}>
                  <textarea 
                    className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-left font-normal text-[13px] text-[#4E5969] resize-none h-auto overflow-hidden text-left outline-none" 
                    rows={1}
                    style={{ height: 'auto' }}
                    onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
                    value={data.note1Suffix} 
                    onChange={e => setData({...data, note1Suffix: e.target.value})} 
                  />
                </div>
              </div>
            </div>

            <div className={`p-4 border border-[#E5E6EB] rounded-[12px] bg-gray-50/50 group relative transition-all ${!isNote2Visible ? 'opacity-40 grayscale' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-[#072A4A] font-bold text-xs uppercase tracking-widest"><CarTaxiFront className="w-3.5 h-3.5" /> 备注 2：食宿差旅</div>
                <button onClick={() => setIsNote2Visible(!isNote2Visible)} className={`p-1 rounded-[8px] transition-colors ${isNote2Visible ? 'text-[#072A4A] hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-200'}`}>{isNote2Visible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-50 line-through" />}</button>
              </div>
              <div className="flex gap-3 mb-3">
                <button onClick={() => setData({...data, travelExpenseOption: 'excluded'})} className={`flex-1 py-2 text-xs font-bold rounded-[8px] border transition-all ${data.travelExpenseOption === 'excluded' ? 'bg-[#0062AD] border-[#0062AD] text-white shadow-none' : 'bg-white border-[#E5E6EB] text-[#64748B] hover:border-[#0062AD]/30'}`}>不包含差旅费</button>
                <button onClick={() => setData({...data, travelExpenseOption: 'included'})} className={`flex-1 py-2 text-xs font-bold rounded-[8px] border transition-all ${data.travelExpenseOption === 'included' ? 'bg-[#0062AD] border-[#0062AD] text-white shadow-none' : 'bg-white border-[#E5E6EB] text-[#64748B] hover:border-[#0062AD]/30'}`}>已包含差旅费</button>
              </div>
              <div className="p-3 bg-white border border-[#E5E6EB] rounded-[8px] text-left">
                <p className="text-[13px] text-[#4E5969] leading-relaxed font-normal">
                  {getTravelNote(data.travelExpenseOption)}
                </p>
              </div>
            </div>

            <div className={`p-4 border border-[#E5E6EB] rounded-[12px] bg-gray-50/50 group relative transition-all ${!isNote3Visible ? 'opacity-40 grayscale' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-[#072A4A] font-bold text-xs uppercase tracking-widest"><ReceiptText className="w-3.5 h-3.5" /> 备注 3：发票及缴纳</div>
                <button onClick={() => setIsNote3Visible(!isNote3Visible)} className={`p-1 rounded-[8px] transition-colors ${isNote3Visible ? 'text-[#072A4A] hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-200'}`}>{isNote3Visible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-50 line-through" />}</button>
              </div>
              <div className={InputWrapperStyle + " !p-1.5"}>
                <textarea 
                  className="w-full !p-0 !border-0 bg-transparent focus:ring-0 text-[13px] font-normal text-[#4E5969] border-none outline-none resize-none leading-relaxed min-h-[40px] h-auto text-left" 
                  value={data.note3Text} 
                  onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
                  onChange={e => setData({...data, note3Text: e.target.value})} 
                  placeholder="输入发票及收费说明" 
                />
              </div>
            </div>

            {data.additionalRemarks.map((remark, index) => (
              <div key={index} className="p-4 border border-[#E5E6EB] rounded-[12px] bg-white group relative text-left">
                <button onClick={() => removeRemark(index)} className="absolute top-2 right-2 p-1 text-[#4E5969] hover:text-[#EE4932] opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                <div className="flex flex-col gap-2 w-full">
                  <div className="field-label !mb-0 text-[#072A4A] text-left">备注 {index + 4}</div>
                  <div className={InputWrapperStyle + " !min-h-0 !p-1.5 !rounded-[8px]"}>
                    <textarea 
                      className="w-full bg-transparent !p-0 !border-0 focus:ring-0 outline-none text-[13px] font-normal text-[#4E5969] text-left resize-none" 
                      value={remark} 
                      rows={1}
                      onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
                      onChange={e => updateAdditionalRemark(index, e.target.value)} 
                      placeholder="点击输入补充备注内容" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="card text-left"><div className="section-header" style={{ borderLeftColor: '#0062AD' }}><ImageIcon className="w-5 h-5" /><span>名片及联系信息</span></div><div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4"><div className="space-y-3"><div className="relative" ref={managerSelectRef}><label className="field-label">姓名</label><div className="flex items-center gap-1"><div className="relative flex-1"><div className={InputWrapperStyle + " !p-1.5 !min-h-0"}><input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 font-normal text-left pr-8 outline-none" value={data.contact.name} placeholder="自定义姓名" onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})} /></div><button onClick={() => setIsManagerSelectOpen(!isManagerSelectOpen)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-[4px]"><ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isManagerSelectOpen ? 'rotate-180' : ''}`} /></button></div></div>{isManagerSelectOpen && (<div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-[#E5E6EB] rounded-[12px] shadow-2xl overflow-hidden animate-fade-in"><div className="p-2 border-b border-gray-50 bg-gray-50/50"><span className="text-[10px] font-black text-[#0062AD] uppercase tracking-widest pl-2">预设经理人快速选择</span></div>{PREDEFINED_MANAGERS.map((mgr) => (<div key={mgr.name} onClick={() => handleSelectManager(mgr)} className="group flex items-center justify-between px-4 py-3 hover:bg-[#EFF5FC] cursor-pointer border-b last:border-0 border-gray-50 transition-colors"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${data.contact.name === mgr.name ? 'bg-[#0062AD] text-white' : 'bg-gray-100 text-gray-500'}`}>{mgr.name.charAt(0)}</div><div className="flex flex-col"><span className="text-[14px] font-bold text-gray-700">{mgr.name}</span><span className="text-[11px] text-gray-400">{mgr.jobTitle1}</span></div></div>{data.contact.name === mgr.name && <UserCheck className="w-4 h-4 text-[#0062AD]" />}</div>))}</div>)}</div><div><label className="field-label">职位 1</label><div className={InputWrapperStyle + " !p-1.5 !min-h-0"} title={data.contact.jobTitle1}><input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 font-normal text-left outline-none truncate" value={data.contact.jobTitle1} onChange={e => setData({...data, contact: {...data.contact, jobTitle1: e.target.value}})} /></div></div><div><label className="field-label">地址缩写/职位2</label><div className={InputWrapperStyle + " !p-1.5 !min-h-0"} title={data.contact.jobTitle2}><input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 font-normal text-left outline-none truncate" value={data.contact.jobTitle2} onChange={e => setData({...data, contact: {...data.contact, jobTitle2: e.target.value}})} /></div></div></div><div className="space-y-3"><div><label className="field-label">电话</label><div className={InputWrapperStyle + " !p-1.5 !min-h-0"}><input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 font-quote text-left outline-none" value={data.contact.phone} onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} /></div></div><div><label className="field-label">邮箱</label><div className={InputWrapperStyle + " !p-1.5 !min-h-0"}><input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 font-en text-left outline-none" value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} /></div></div><div><label className="field-label">办公详细地址</label><div className={InputWrapperStyle + " !p-1.5 !min-h-0"} title={data.contact.officeAddress}><input className="w-full !p-0 !border-0 bg-transparent focus:ring-0 font-normal text-left outline-none truncate" value={data.contact.officeAddress} onChange={e => setData({...data, contact: {...data.contact, officeAddress: e.target.value}})} /></div></div></div><div className="flex flex-col items-center pl-6 border-l border-gray-100"><label className="field-label self-center mb-2">联系二维码</label><EditableBrandLogo src={data.contact.qrCode} label="" onUpload={(base64) => setData({...data, contact: {...data.contact, qrCode: base64}})} className="w-full" align="center" /><div className="mt-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><ImageIcon className="w-3 h-3" /> 上传二维码</div></div></div></section>

        {processOrder.map(moduleId => extraModulesMap[moduleId as keyof typeof extraModulesMap])}

        {data.modules.filter(m => m.type === 'custom').map((module) => (
          <section key={module.id} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border ${dragOverModuleId === module.id ? 'border-[#0062AD] scale-[1.01]' : 'border-[#E5E6EB] hover:border-[#BDD1FF] text-left'}`} draggable="true" onDragStart={(e) => handleDragStart(e, module.id)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(module.id); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, module.id)}>
            <div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => removeModule(module.id)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-none z-10"><Trash2 className="w-4 h-4" /></button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="section-header !mb-0 flex-1" style={{ borderLeftColor: '#0062AD' }}><Layers className="w-5 h-5 shrink-0" /><input className="!border-0 !p-0 font-bold bg-transparent focus:ring-0 text-[#304166] w-full outline-none" value={module.title} onChange={e => updateModuleTitle(module.id, e.target.value)} /></div>
              <div className="flex gap-[12px]">
                <button onClick={() => setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === module.id && m.type === 'custom' ? { ...m, blocks: [] } : m) }))} className="btn-header-func"><RotateCcw className="w-3.5 h-3.5" /> 重置</button>
                <button onClick={() => { activeCaseBlockIdRef.current = module.id; customModuleExcelInputRef.current?.click(); }} className="btn-header-func"><FileSpreadsheet className="w-3.5 h-3.5" /> 导入 Excel</button>
                <button onClick={() => addBlockToModule(module.id, 'image')} className="btn-header-func"><Images className="w-3.5 h-3.5" /> 添加图片</button>
                <button onClick={() => addBlockToModule(module.id, 'text')} className="btn-header-func"><Type className="w-3.5 h-3.5" /> 添加文本</button>
                <button onClick={() => addBlockToModule(module.id, 'table')} className="btn-header-func"><Table2 className="w-3.5 h-3.5" /> 添加表格</button>
              </div>
            </div>
            <input type="file" ref={customModuleExcelInputRef} className="hidden" accept=".xlsx, .xls, .csv" onChange={(e) => handleExcelUploadToModule(e, module.id)} />
            <RenderModuleBlocksEditor moduleId={module.id} blocks={module.blocks} excelInputRef={customModuleExcelInputRef} />
          </section>
        ))}
      </div>

      <aside className="w-full lg:w-[680px]">
        <div className="sticky top-8 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="flex flex-col gap-4">
              <div className="card !p-5 bg-white flex flex-col mb-0 rounded-[16px] border border-[#E5E6EB] shadow-none">
                <SidebarTitle icon={FileText} title="主要操作" />
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <button onClick={() => setShowPreview(true)} className="flex items-center justify-center gap-2 h-[40px] text-[14px] font-semibold bg-[#005691] text-white rounded-[8px] hover:bg-[#004a7c] transition-all shadow-[0_4px_10px_rgba(0,86,145,0.1)] border-none outline-none text-center"><Eye className="w-4 h-4" /> 预览报价单</button>
                  <button disabled={isGeneratingPdf} onClick={handleDownloadPDFNew} className="flex items-center justify-center gap-2 h-[40px] text-[14px] font-semibold bg-[#F0F8FF] text-[#005691] rounded-[8px] hover:bg-[#E0F2FF] transition-all border-none outline-none text-center">{isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}{isGeneratingPdf ? '正在导出...' : '导出高清 HTML'}</button>
                  <button disabled={isGeneratingPdf} onClick={handleDownloadPDF} className="flex items-center justify-center gap-2 h-[40px] text-[14px] font-semibold bg-gray-50 text-gray-500 rounded-[8px] hover:bg-gray-100 transition-all border-none outline-none text-center"><FileCheck className="w-4 h-4" /> 另存为 PDF</button>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-4 pt-4 border-t border-[#E5E6EB]">
                  <button onClick={addCertModule} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F8FAFC] text-[#055087] font-medium rounded-[10px] border border-dashed border-[#E5E6EB] hover:bg-[#F0F8FF] hover:border-[#BDD1FF] transition-all group"><Layout className="w-4 h-4 text-[#0062AD] group-hover:scale-110 shrink-0" /><span className="text-[13px] text-center">添加认证报价</span></button>
                  <button onClick={addTechModule} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F8FAFC] text-[#055087] font-medium rounded-[10px] border border-dashed border-[#E5E6EB] hover:bg-[#F0F8FF] hover:border-[#BDD1FF] transition-all group"><Settings className="w-4 h-4 text-[#0062AD] group-hover:scale-110 shrink-0" /><span className="text-[13px] text-center">添加技术报价</span></button>
                  <button onClick={addCustomModule} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F8FAFC] text-[#055087] font-medium rounded-[10px] border border-dashed border-[#E5E6EB] hover:bg-[#F0F8FF] hover:border-[#BDD1FF] transition-all group"><Layers className="w-4 h-4 text-[#0062AD] group-hover:scale-110 shrink-0" /><span className="text-[13px] text-center">添加自定义模块</span></button>
                </div>
                <div className="pt-4 border-t border-[#E5E6EB]">
                  <div className="flex items-center gap-2 text-[#072A4A] font-semibold mb-3 text-left"><LayoutGrid className="w-4 h-4 text-[#0075CB] fill-current" /><span className="text-[15px]">模块排序管理</span></div>
                  <div className="space-y-2">
                    {data.modules.filter(m => m.type !== 'custom').map((module, index) => {
                      const info = getModuleSortingInfo(module, index);
                      const Icon = info.icon;
                      const isActive = dragOverModuleId === module.id;
                      return (
                        <div key={module.id} draggable="true" onDragStart={(e) => handleDragStart(e, module.id)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(module.id); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, module.id)} className={sortingItemClass(isActive)}>
                          <div className={dragLineClass(isActive)}></div>
                          <div className="flex items-center gap-3 ml-2">
                            <div className={iconBoxClass}><Icon className="w-3.5 h-3.5" /></div>
                            <span className="text-[13px] font-medium text-[#4E5969] truncate max-w-[140px] group-hover:text-[#0062AD]">{info.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5"><GripVertical className="w-4 h-4 text-[#94A3B8] transition-colors" /><button onClick={() => removeModule(module.id)} className="p-1 text-[#CBD5E1] hover:text-[#EF4444] transition-colors"><Trash2 className="w-4 h-4" /></button></div>
                        </div>
                      );
                    })}
                    {processOrder.map(moduleId => {
                      if (moduleId === 'agency-profile' || moduleId === 'business-qualifications') return null;
                      const isVisible = moduleId === 'cert-process' ? isCertProcessVisible : moduleId === 'tech-process' ? isTechProcessVisible : moduleId === 'customer-case' ? isCustomerCaseVisible : moduleId === 'cert-templates' ? isCertTemplatesVisible : false;
                      if (!isVisible) return null;
                      const info = getProcessSortingInfo(moduleId);
                      const Icon = info.icon;
                      const isActive = dragOverModuleId === moduleId;
                      return (
                        <div key={moduleId} draggable="true" onDragStart={(e) => handleDragStart(e, moduleId)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(moduleId); }} onDragLeave={() => setDragOverModuleId(null)} onDragEnd={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, moduleId)} className={sortingItemClass(isActive)}>
                          <div className={dragLineClass(isActive)}></div>
                          <div className="flex items-center gap-3 ml-2">
                            <div className={iconBoxClass}><Icon className="w-3.5 h-3.5" /></div>
                            <span className="text-[13px] font-medium text-[#4E5969] group-hover:text-[#0062AD]">{info.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5"><GripVertical className="w-4 h-4 text-[#94A3B8]" /><button onClick={() => { if(moduleId === 'cert-process') setIsCertProcessVisible(false); if(moduleId === 'tech-process') setIsTechProcessVisible(false); if(moduleId === 'customer-case') setIsCustomerCaseVisible(false); if(moduleId === 'cert-templates') setIsCertTemplatesVisible(false); }} className="p-1 text-[#CBD5E1] hover:text-[#EF4444] transition-colors"><Trash2 className="w-4 h-4" /></button></div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[16px] border border-[#E5E6EB] p-4 flex flex-col shadow-none overflow-hidden">
                <div className="px-4 pb-4">
                  <div className="text-[14px] font-semibold tracking-wider mb-4 text-[#0062AD] font-en border-b border-slate-50 pb-2 text-left">Quotation Summary</div>
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex flex-col text-left"><span className="text-[13px] font-medium text-[#4E5969]">认证费用总计</span><span className="text-[11px] text-[#94A3B8] font-en tracking-tight">Certification Fees</span></div>
                      <div className="text-right flex items-baseline justify-end min-w-[100px] leading-none align-num"><span className="text-[#0062AD] text-[11px] mr-1 font-en font-bold">¥</span><span className="text-[16px] font-semibold font-quote whitespace-nowrap text-[#0062AD] transform translate-y-[1px]">{certTotal.toLocaleString()}</span></div>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex flex-col text-left"><span className="text-[13px] font-medium text-[#4E5969]">技术服务费用总计</span><span className="text-[11px] text-[#94A3B8] font-en tracking-tight">Technical Service Fees</span></div>
                      <div className="text-right flex items-baseline justify-end min-w-[100px] leading-none align-num"><span className="text-[#0062AD] text-[11px] mr-1 font-en font-bold">¥</span><span className="text-[16px] font-semibold font-quote whitespace-nowrap text-[#0062AD] transform translate-y-[1px]">{techTotal.toLocaleString()}</span></div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F2F5F8] rounded-[12px] px-4 py-3.5 flex justify-between items-center w-full">
                  <div className="flex flex-col text-left"><span className="text-[13px] text-[#0062AD] font-[700]">总计 (含6%增值税)</span><span className="text-[11px] text-[#86909C] font-medium font-en tracking-tight whitespace-nowrap">Grand Total (6% Included)</span></div>
                  <div className="text-right flex items-baseline justify-end leading-none align-num"><span className="text-[#0062AD] text-[14px] mr-1 font-en font-black">¥</span><span className="text-[24px] font-bold font-quote whitespace-nowrap text-[#0062AD] transform translate-y-[1px]">{grandTotal.toLocaleString()}</span></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className={`card !p-6 bg-white border border-[#E5E6EB] shadow-none mb-0 rounded-[16px] ${isDraggingOverLogos ? 'bg-[#0052D90a] scale-[1.02]' : ''}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverLogos(true); }} onDragLeave={() => setIsDraggingOverLogos(false)} onDrop={() => setIsDraggingOverLogos(false)}>
                <SidebarTitle icon={ImageIcon} title="常用 LOGO" />
                <div className="grid grid-cols-2 gap-3">
                  {COMMON_LOGOS.map(logo => (<div key={logo.id} draggable onDragStart={(e) => e.dataTransfer.setData('logoUrl', logo.url)} className="p-3 border-none rounded-[12px] hover:bg-[#0052D90a] transition-all flex flex-col items-center justify-center text-center overflow-hidden min-h-[90px] cursor-grab active:cursor-grabbing"><div className="h-10 w-full flex items-center justify-center mb-2"><img src={logo.url} alt={logo.name} loading="lazy" className="max-full max-w-full object-contain pointer-events-none" /></div><p className="text-[12px] text-[#4E5969] font-medium line-clamp-2">{logo.name}</p></div>))}
                </div>
              </div>
              <div className="card !p-6 bg-white border border-[#E5E6EB] shadow-none mb-0 rounded-[16px]">
                <SidebarTitle icon={Globe} title="常用网站" />
                <div className="grid grid-cols-2 gap-1">
                  {COMMON_WEBSITES.map(site => (<a key={site.id} href={site.url} target="_blank" rel="noopener noreferrer" className="p-3 hover:bg-[#0052D90a] rounded-[8px] transition-all flex items-center gap-2"><div className="h-8 w-8 flex items-center justify-center shrink-0 border-none"><img src={site.logo} alt={site.name} className="h-full w-full object-contain" /></div><p className="text-[12px] text-[#4E5969] font-medium truncate w-full">{site.name}</p></a>))}
                </div>
              </div>
              <div className="card !p-6 bg-white border border-[#E5E6EB] shadow-none mb-0 rounded-[16px]">
                <SidebarTitle icon={LayoutTemplate} title="常用证书模板" />
                <div className="grid grid-cols-4 gap-2">
                  {COMMON_CERT_TEMPLATES.map(tmpl => { const Icon = tmpl.icon; return (<div key={tmpl.id} draggable onDragStart={(e) => e.dataTransfer.setData('templateUrl', tmpl.url)} onClick={() => addCommonTemplate(tmpl.url)} className={`aspect-square p-2 border border-[#E5E6EB] rounded-[12px] ${tmpl.bg} cursor-grab active:cursor-grabbing hover:border-[#BDD1FF] transition-all flex flex-col items-center justify-center text-center relative group`} title={`点击添加 ${tmpl.name} 证书`}><Icon className="w-6 h-6 mb-1" style={{ color: tmpl.color }} /><span className="text-[8px] font-semibold uppercase tracking-tighter leading-none" style={{ color: tmpl.color }}>{tmpl.name}</span><div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 border border-[#E5E6EB] shadow-sm opacity-0 group-hover/opacity-100 transition-opacity"><Plus className="w-3 h-3 text-[#0062AD]" /></div></div>); })}
                </div>
                <p className="mt-4 text-[10px] text-[#4E5969] font-medium text-center">点击添加或拖拽至左侧主区域</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-[#304166] text-white px-8 py-3.5 rounded-full shadow-lg flex items-center gap-3 animate-fade-in border border-white/10 backdrop-blur-md"><div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"><Check className="w-4 h-4 text-white" strokeWidth={4} /></div><span className="text-[14px] font-bold tracking-tight">配置更新成功</span></div>
      )}

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-[#304166cc] backdrop-blur-xl flex items-center justify-center p-2 md:p-4"><div className="bg-white rounded-[24px] w-full flex flex-col shadow-2xl overflow-hidden transition-all duration-500 border border-white/20 max-w-[98vw] h-[98vh] overflow-x-hidden"><div className="p-4 md:p-5 bg-white border-b flex justify-between items-center z-10 shrink-0"><div className="flex items-center gap-4 md:gap-6 text-left"><h3 className="font-bold text-[#304166] flex items-center gap-3 text-lg tracking-tight"><Eye className="text-[#0062AD] w-5 h-5" /> 预览报价单</h3></div><button onClick={() => setShowPreview(false)} className="p-2 hover:bg-red-50 hover:text-[#EE4932] rounded-full transition-all group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button></div><div ref={previewScrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-12 bg-slate-200/40 flex flex-col items-center"><div className="bg-white shadow-[0_20px_50px_rgba(48,65,102,0.15)] origin-top" style={{ transform: `scale(${previewScale})`, marginTop: '0' }}><QuoteDocument /></div></div><div className="p-4 md:p-5 bg-white border-t flex flex-col sm:flex-row justify-end items-center gap-3 shrink-0"><p className="flex-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest italic opacity-60 text-center sm:text-left">* 预览已根据窗口宽度自动调整，确保内容在打印范围内。</p><div className="flex gap-3 w-full sm:w-auto"><button onClick={() => setShowPreview(false)} className="flex-1 sm:flex-none h-[40px] px-6 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-[8px] outline-none">关闭</button><button disabled={isGeneratingPdf} onClick={handleDownloadPDFNew} className="flex-1 sm:flex-none h-[40px] px-8 text-sm font-bold bg-[#F0F8FF] text-[#005691] hover:bg-[#E0F2FF] rounded-[8px] flex items-center justify-center gap-2 transition-all border-none disabled:opacity-50 outline-none">{isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}{isGeneratingPdf ? '正在导出...' : '导出高清 HTML'}</button></div></div></div></div>
      )}
    </div>
  );
};

export default App;
