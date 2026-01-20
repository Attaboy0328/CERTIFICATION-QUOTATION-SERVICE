
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
  Target as Rocket, // Fallback for Rocket
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
  Palette,
  Type as TypeIcon,
  ChevronsUpDown,
  ArrowRightLeft,
  Images,
  FileSpreadsheet,
  Layers,
  Info,
  CarTaxiFront,
  ReceiptText
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
    desc: "实施定期的现场跟踪排查，通过闭环机制确保体系运行持续有效。",
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
  { bg: "bg-[#EFF5FC]", text: "text-[#0062AD]", num: "text-[#0062AD]/10", tag: "bg-white text-[#0062AD]" },
  { bg: "bg-[#F0FDF4]", text: "text-[#16A34A]", num: "text-[#16A34A]/10", tag: "bg-white text-[#16A34A]" },
  { bg: "bg-[#FFFBEB]", text: "text-[#D97706]", num: "text-[#D97706]/10", tag: "bg-white text-[#D97706]" },
  { bg: "bg-[#F5F3FF]", text: "text-[#7C3AED]", num: "text-[#7C3AED]/10", tag: "bg-white text-[#7C3AED]" },
  { bg: "bg-[#FFF1F2]", text: "text-[#E11D48]", num: "text-[#E11D48]/10", tag: "bg-white text-[#E11D48]" },
  { bg: "bg-[#F0FDFA]", text: "text-[#0D9488]", num: "text-[#0D9488]/10", tag: "bg-white text-[#0D9488]" },
  { bg: "bg-[#F8FAFC]", text: "text-[#475569]", num: "text-[#475569]/10", tag: "bg-white text-[#475569]" },
  { bg: "bg-[#FEF3C7]", text: "text-[#B45309]", num: "text-[#B45309]/10", tag: "bg-white text-[#B45309]" },
  { bg: "bg-[#E0E7FF]", text: "text-[#4338CA]", num: "text-[#4338CA]/10", tag: "bg-white text-[#4338CA]" },
  { bg: "bg-[#FFE4E6]", text: "text-[#BE123C]", num: "text-[#BE123C]/10", tag: "bg-white text-[#BE123C]" }
];

const STEP_ICONS = [Search, Activity, UserPlus, Zap, CheckCircle2, Rocket, Compass, Lightbulb, Cpu, Fingerprint];

const BRAND_COLORS = {
  primary: '#0062AD',
  deep: '#304166',
  red: '#EE4932',
  lightBlue: '#BDD1FF',
  bgSoft: '#EFF5FC',
  green: '#00b050',
  teal: '#0d9488'
};

const INITIAL_LEFT_LOGO = "https://img.meituan.net/content/a9cfaa78007ceea1101b8524ce9d309c121236.png"; 
const INITIAL_RIGHT_LOGO = "https://img.meituan.net/content/ced347feedea9d2757a88ba1715be430123826.png"; 

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
  { id: 'logo-cqc', url: 'https://wp-cdn.4ce.cn/v2/OfhUkRT.png', name: '中国质量认证中心 (CQC)' },
  { id: 'logo-ccic', url: 'https://wp-cdn.4ce.cn/v2/6p37qt1.png', name: '中国检验认证集团 (CCIC)' },
];

const COMMON_WEBSITES = [
  { id: 'site-cnca', logo: 'https://img.meituan.net/content/268dce338d6c33df9ef63ce4369ddfc422893.jpg', name: 'CNCA 认监委', url: 'http://cx.cnca.cn' },
  { id: 'site-cqc', logo: 'https://img.meituan.net/content/4f05fc80e1c584a38b4c4dd274bc7e9949625.jpg', name: 'CQC 官网', url: 'https://www.cqc.com.cn' },
  { id: 'site-tianyancha', logo: 'https://img.meituan.net/content/fc494661773359d8eb74250657de423d10240.png', name: '天眼查', url: 'https://www.tianyancha.com' },
  { id: 'site-qizhidao', logo: 'https://img.meituan.net/content/7e0ad8a677eda56cd63536741d1c805e7170.webp', name: '企知道', url: 'https://www.qizhidao.com' }
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
    { title: "审核与整改阶段", icon: <ShieldCheck className="w-5 h-5" />, color: "blue", steps: [ { id: "4", title: "现场审核", desc: "进驻现场 + 按标审核" }, { id: "5", title: "整改", desc: "整改问题 → 交见证材料" }, { id: "6", title: "材料上报", desc: "确认材料 → 报总部" } ] },
    { title: "评审与后续监督阶段", icon: <CheckCircle2 className="w-5 h-5" />, color: "purple", steps: [ { id: "7", title: "总部评审", desc: "评审材料有效性" }, { id: "8", title: "发证书", desc: "制证 → 寄送" }, { id: "9", title: validity === '3years' ? "后续监督" : "再认证", desc: validity === '3years' ? "3年2次监督审核" : "证书到期前3个月进行再认证" } ] }
  ];
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'amber': return { bg: 'bg-[#fffbeb]', border: 'border-[#fef3c7]', text: 'text-[#d97706]', badge: 'bg-[#fef3c7] text-[#d97706]' };
      case 'blue': return { bg: 'bg-[#eff6ff]', border: 'border-[#dbeafe]', text: 'text-[#0062AD]', badge: 'bg-[#dbeafe] text-[#0062AD]' };
      case 'purple': return { bg: 'bg-[#f5f3ff]', border: 'border-[#ede9fe]', text: 'text-[#7c3aed]', badge: 'bg-[#ede9fe] text-[#7c3aed]' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-600', badge: 'bg-gray-100 text-gray-600' };
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      {stages.map((stage, idx) => {
        const cls = getColorClasses(stage.color);
        return (
          <div key={idx} className={`relative flex-1 rounded-[12px] border-2 ${cls.border} ${cls.bg} p-6 flex flex-col gap-5 transition-all duration-500`}>
            <div className={`flex items-center gap-2 font-bold text-[16px] ${cls.text}`}>{stage.icon}{stage.title}</div>
            <div className="flex flex-col gap-4">
              {stage.steps.map((step, sIdx) => (
                <React.Fragment key={step.id}>
                  <div className="bg-white rounded-[8px] p-4 shadow-sm border border-gray-100/50 flex flex-col gap-1.5 transition-all hover:scale-[1.02]">
                    <div className="flex items-center gap-3"><span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-black tracking-tight ${cls.badge}`}>Step {step.id}</span><span className="font-bold text-[14px] text-gray-800 animate-fade-in">{step.title}</span></div>
                    <div className="text-[12px] text-gray-400 font-medium pl-0.5 animate-fade-in truncate overflow-hidden whitespace-nowrap" title={step.desc}>{step.desc}</div>
                  </div>
                  {sIdx < stage.steps.length - 1 && <div className="flex justify-center -my-1"><ArrowDown className={`w-4 h-4 opacity-30 ${cls.text}`} /></div>}
                </React.Fragment>
              ))}
            </div>
            {idx < stages.length - 1 && <div className="hidden md:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-1 border border-gray-100 shadow-sm"><ChevronRight className="w-4 h-4 text-gray-300" /></div>}
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
    <div draggable={isEditable} onDragStart={(e) => onDragStart(e, index)} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }} onDrop={(e) => onDrop(e, index)} className={`group flex flex-col relative p-5 rounded-[12px] ${color.bg} overflow-hidden transition-all duration-300 border-2 h-full min-h-[220px] cursor-default ${isEditable ? 'cursor-move' : ''} border-white/50 hover:scale-[1.02] hover:border-[#0062AD]/30`} style={{ boxShadow: '0 4px 20px rgba(0, 98, 173, 0.05)' }}>
      <div className={`absolute -right-2 -top-4 text-[5rem] font-black italic select-none ${color.num} font-num`}>{step.id}</div>
      <div className={`w-9 h-9 rounded-[8px] bg-white shadow-sm flex items-center justify-center ${color.text} mb-3 relative z-10 shrink-0`}><Icon className="w-4.5 h-4.5" /></div>
      {isEditable && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all z-20">
          <button onClick={(e) => { e.stopPropagation(); const newTags = [...step.tags, '新标签']; onUpdateTags(index, newTags); }} title="添加标签" className="p-1.5 bg-white/80 hover:bg-[#0062AD] hover:text-white text-[#0062AD] rounded-[4px] shadow-sm backdrop-blur-sm border border-[#BDD1FF]/50"><Plus className="w-3 h-3" strokeWidth={3} /></button>
          <button onClick={(e) => { e.stopPropagation(); onRemove(index); }} title="删除流程阶段" className="p-1.5 bg-white/80 hover:bg-red-500 hover:text-white text-gray-400 rounded-[4px] shadow-sm backdrop-blur-sm border border-gray-100"><Trash2 className="w-3 h-3" strokeWidth={2.5} /></button>
        </div>
      )}
      {isEditable ? (
        <div className="space-y-1.5 relative z-10 flex flex-col mb-2">
          <input className="!p-0 !border-0 bg-transparent focus:ring-0 text-[15px] font-bold !text-inherit leading-tight w-full" style={{ color: 'inherit' }} value={step.title} onChange={e => onUpdate(index, 'title', e.target.value)} />
          <textarea className="!p-0 !border-0 bg-transparent focus:ring-0 text-[11px] text-gray-500 siding-relaxed resize-none w-full h-12 no-scrollbar" value={step.desc} onChange={e => onUpdate(index, 'desc', e.target.value)} />
        </div>
      ) : (
        <><h4 className={`text-[15px] font-bold ${color.text} mb-2 relative z-10 leading-tight shrink-0`}>{step.title}</h4><p className="text-[11px] text-gray-500 siding-relaxed mb-2 relative z-10 opacity-90">{step.desc}</p></>
      )}
      <div className="grid grid-cols-2 gap-1.5 relative z-10 mt-auto shrink-0 pb-1">
        {step.tags.map((tag, tIdx) => (
          <div key={`${step.id}-tag-${tIdx}`} draggable={isEditable} onDragStart={(e) => handleTagDragStart(e, tIdx)} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setTagDragOver(tIdx); }} onDragLeave={() => setTagDragOver(null)} onDrop={(e) => handleTagDrop(e, tIdx)} className={`relative px-2 py-1.5 rounded-[8px] text-[10px] font-bold shadow-sm ${color.tag} border border-gray-100/50 flex items-center justify-center text-center transition-all group/tag ${tagDragOver === tIdx ? 'ring-2 ring-[#0062AD]' : ''}`}>
            {isEditable ? (
              <div className="flex items-center gap-1 w-full justify-center"><input className="!p-0 !border-0 bg-transparent focus:ring-0 text-[10px] font-bold w-full text-center placeholder:opacity-50" value={tag} placeholder="标签" onChange={e => { const newTags = [...step.tags]; newTags[tIdx] = e.target.value; onUpdateTags(index, newTags); }} /><button onClick={() => { const newTags = step.tags.filter((_, i) => i !== tIdx); onUpdateTags(index, newTags); }} className="text-gray-300 hover:text-red-500 shrink-0 opacity-0 group-hover/tag:opacity-100 transition-opacity"><X className="w-2.5 h-2.5" /></button></div>
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
  const introClass = "text-[14px] text-gray-500 siding-relaxed siding-snug text-justify px-1";
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
        <div className="lg:col-span-3 space-y-6 flex flex-col justify-between py-1">
          <div className="space-y-4"><h3 className="text-[28px] font-bold text-[#304166] tracking-tight siding-tight">中国检验认证集团 <span className="text-[#0062AD] font-en">(CCIC)</span></h3><p className={introClass}>中国检验认证集团（简称中国中检）是经国务院批准设立、由国务院国资委管理的中央企业。作为以“检验、检测、认证、标准、计量”为主业的综合性质量服务机构，机构在全球范围内提供专业、高效、一站式的质量安全服务。</p></div>
          <div className="pt-4"><div className="flex items-center gap-3 mb-4"><div className="h-[2px] bg-blue-100 flex-1"></div><span className="text-[11px] font-black text-[#0062AD] uppercase tracking-[0.2em] whitespace-nowrap">三大品牌</span><div className="h-[2px] bg-blue-100 flex-1"></div></div><div className="grid grid-cols-3 gap-4">{[{ name: '中国中检 CCIC', icon: 'https://img.meituan.net/content/85a4fc82d05398fc2174b38f3079c047286176.png' }, { name: '中国质量认证中心 CQC', icon: 'https://img.meituan.net/content/3c7d0f7f8939199ffc2353fd439669e9284944.png' }, { name: '中国汽研 CAERI', icon: 'https://img.meituan.net/content/277ebe8f724c51cf401237b50ba688a051357.jpg' }].map((sub, i) => (<div key={i} className="bg-white rounded-[12px] p-4 border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-3 transition-transform hover:scale-105 min-h-[110px]"><div className="h-14 w-full flex items-center justify-center"><img src={sub.icon} alt={sub.name} loading="lazy" className="max-h-full max-w-full object-contain" /></div><span className="text-[11px] font-bold text-gray-400 text-center whitespace-nowrap">{sub.name}</span></div>))}</div></div>
        </div>
        <div className="lg:col-span-2 grid grid-cols-2 gap-x-8 gap-y-10 pl-8 border-l border-gray-100 flex wrap items-center py-1">{[{ label: '国家和地区服务网络', value: '30', unit: '+', icon: <Globe className="w-5 h-5 text-[#0062AD]" /> }, { label: '分支机构全球布局', value: '400', unit: '+', icon: <Building className="w-5 h-5 text-[#0062AD]" /> }, { label: '专业化实验室', value: '500', unit: '+', icon: <FlaskConical className="w-5 h-5 text-[#0062AD]" /> }, { label: '全球专业技术员工', value: '20000', unit: '+', icon: <Users className="text-[#0062AD] w-5 h-5" /> }, { label: '国际权威认可资质', value: '100', unit: '+', icon: <Award className="w-5 h-5 text-[#0062AD]" /> }, { label: '国家级认可资质', value: '300', unit: '+', icon: <ShieldCheck className="w-5 h-5 text-[#0062AD]" /> }].map((stat, i) => (<div key={i} className="flex flex-col gap-1.5"><div className="mb-1">{stat.icon}</div><div className="flex items-baseline gap-0.5"><span className="text-[26px] font-bold text-[#304166] font-num leading-none">{stat.value}</span><span className="text-[16px] font-bold text-[#0062AD] font-en font-num">{stat.unit}</span></div><span className="text-[12px] font-bold text-gray-400 whitespace-nowrap">{stat.label}</span></div>))}</div></div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
      <div className="grid grid-cols-2 gap-x-12 items-start">
        <div className="flex flex-col gap-y-4"><div className="mb-2"><div className="flex items-center gap-3 border-l-4 border-[#0062AD] pl-4 mb-3"><h4 className="text-[21px] font-bold text-[#304166]">中国质量认证中心 <span className="font-en">(CQC)</span></h4></div><p className={introClass}>中国质量认证中心(CQC)是由中国政府批准设立、认证机构批准书编号为001号的质量服务机构，隶属于中国中检集团。同时CQC也是世界最大认证机构联盟——国际认证联盟（IQNet）中国区域的两大成员之一。</p></div><div className="bg-[#f8fafc] rounded-[12px] p-5 flex items-start gap-4 border border-gray-100"><div className="w-10 h-10 rounded-[8px] bg-white flex items-center justify-center text-[#0062AD] shadow-sm shrink-0"><Award className="w-5 h-5" /></div><div className="space-y-1.5"><div className="flex items-center gap-3"><span className="text-[14px] font-bold text-[#304166]">权威地位</span><span className="px-2 py-0.5 bg-[#304166] text-white rounded-md text-[10px] font-black font-num tracking-wider">No. 001</span></div><p className="text-[13px] text-gray-500 siding-relaxed">国家认监委批准设立的专业认证机构，机构批准号：001。</p></div></div><div className="bg-[#f8fafc] rounded-[12px] p-5 flex items-start gap-4 border border-gray-100"><div className="w-10 h-10 rounded-[8px] bg-white flex items-center justify-center text-[#0062AD] shadow-sm shrink-0"><Globe className="w-5 h-5" /></div><div className="space-y-1 flex-1"><div className="flex items-center gap-3"><span className="text-[14px] font-bold text-[#304166]">国际合作</span>{['IQNet', 'IECEE'].map(tag => <span key={tag} className="px-2 py-0.5 border border-gray-200 text-gray-400 rounded-md text-[10px] font-bold font-en">{tag}</span>)}</div><p className="text-[12.5px] text-gray-500 siding-snug line-clamp-2">代表中国加入国际认证联盟及国际电工委员会合格评定体系，实现“一张证书，全球通行”。</p></div></div><div className="bg-[#f8fafc] rounded-[12px] p-5 flex items-start gap-4 border border-gray-100"><div className="w-10 h-10 rounded-[8px] bg-white flex items-center justify-center text-[#0062AD] shadow-sm shrink-0"><Grid className="w-5 h-5" /></div><div className="space-y-1 flex-1"><div className="flex items-center gap-3"><span className="text-[14px] font-bold text-[#304166]">业务覆盖</span></div><p className="text-[12.5px] text-gray-500 siding-snug line-clamp-2">提供强制性产品认证 (CCC)、自愿性认证、节能环保认证及国际管理体系认证等全方位服务。</p></div></div></div>
        <div className="flex flex-col gap-y-4"><div className="mb-2"><div className="flex items-center gap-3 border-l-4 border-[#EE4932] pl-4 mb-3"><h4 className="text-[21px] font-bold text-[#304166]">中国中检广东公司 <span className="font-en">(CCIC GD)</span></h4></div><p className={introClass}>中国检验认证集团广东有限公司(中国中检广东公司)是中国中检集团核心子公司之一，中国中检集团华南区域总部，也是中国质量认证中心有限公司在当地开展管理体系认证业务的分支机构。</p></div><div className="grid grid-cols-2 gap-4">{[{ label: '分支机构辐射全省', value: '19', unit: '个', icon: <MapPin className="w-4 h-4 text-[#EE4932]" />, bg: 'bg-red-50/50' }, { label: '专业技术实验室', value: '14', unit: '个', icon: <FlaskConical className="w-4 h-4 text-[#EE4932]" />, bg: 'bg-red-50/50' }].map((stat, i) => (<div key={i} className={`${stat.bg} rounded-[12px] px-5 py-4 flex flex-col justify-center gap-1 shadow-sm`}><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">{stat.icon}</div><div className="flex items-baseline gap-1 mt-0.5"><span className="text-[22px] font-bold text-[#304166] font-num siding-none">{stat.value}</span><span className="text-[12px] font-bold text-[#304166]">{stat.unit}</span></div><span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{stat.label}</span></div>))}</div><div className="mt-1 space-y-4"><div className="flex items-center gap-2"><Grid className="w-4 h-4 text-[#EE4932]" /><span className="text-[14px] font-bold text-[#304166]">服务范围 <span className="text-gray-300 font-en">/ Service Scope</span></span></div><div className="grid grid-cols-3 gap-y-8 gap-x-4 pr-2">{[{ label: '农产品食品', icon: <Leaf className="w-4 h-4" />, color: 'text-green-500', bg: 'bg-green-50' }, { label: '石油化工', icon: <Droplets className="w-4 h-4" />, color: 'text-amber-500', bg: 'bg-amber-50' }, { label: '工业品检测', icon: <Factory className="w-4 h-4" />, color: 'text-blue-500', bg: 'bg-blue-50' }, { label: '消费品安全', icon: <ShoppingBag className="w-4 h-4" />, color: 'text-pink-500', bg: 'bg-pink-50' }, { label: '体系认证', icon: <Award className="w-4 h-4" />, color: 'text-[#0062AD]', bg: 'bg-blue-50' }, { label: '技术服务', icon: <Settings className="w-4 h-4" />, color: 'text-purple-500', bg: 'bg-purple-50' }].map((serv, i) => (<div key={i} className="flex flex-col items-center gap-2 transition-transform hover:-translate-y-1"><div className={`w-11 h-11 rounded-[8px] ${serv.bg} flex items-center justify-center ${serv.color} shadow-sm`}>{serv.icon}</div><span className="text-[11px] font-bold text-gray-600 whitespace-nowrap">{serv.label}</span></div>))}</div></div></div>
      </div>
    </div>
  );
};

const Qualifications = () => {
  const headerClass = "bg-[#304166] text-white py-2 px-4 text-center font-bold text-[15px] rounded-t-[16px] tracking-widest";
  const imgContainerClass = "border border-gray-100 rounded-b-[12px] overflow-hidden bg-white shadow-sm flex items-center justify-center p-6"; 
  return (
    <div className="space-y-10">
      <div className="max-w-[800px] mx-auto space-y-3"><div className={headerClass}>营业执照</div><div className={`${imgContainerClass} bg-slate-50/50`}><div className="relative group/license"><div className="absolute inset-0 ring-1 ring-black/5 rounded-sm pointer-events-none z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.02)]"></div><img src="https://img.meituan.net/content/f9409b4072b52fcca451773db527b477176762.jpg" alt="营业执照" loading="lazy" className="w-full h-auto block rounded-sm shadow-lg group-hover/license:shadow-xl transition-shadow" /></div></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"><div className="space-y-3 flex flex-col"><div className={headerClass}>认证机构批准书</div><div className={`${imgContainerClass} flex-1`}><img src="https://img.meituan.net/content/fc461674b29c66fc272087ea4df91b81344956.png" alt="认证机构批准书" loading="lazy" className="w-full h-auto block" /></div></div><div className="space-y-3 flex flex-col"><div className={headerClass}>管理体系认证机构认可证书</div><div className={`${imgContainerClass} flex-1`}><img src="https://img.meituan.net/content/6db09cf3cf38fb658b6874ad1d161b90193660.jpg" alt="管理体系认证机构认可证书" loading="lazy" className="w-full h-auto block" /></div></div></div>
    </div>
  );
};

const App: React.FC = () => {
  const [data, setData] = useState<QuoteData>(INITIAL_DATA);
  const [leftLogo, setLeftLogo] = useState<string | null>(INITIAL_LEFT_LOGO);
  const [rightLogo, setRightLogo] = useState<string | null>(INITIAL_RIGHT_LOGO);
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
  const [isDraggingOverCaseBlock, setIsDraggingOverCaseBlock] = useState<string | null>(null);
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
      const newModules = prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, services: m.services.map(s => s.id === serviceId ? { ...s, [field]: value } : s) } : m);
      const newSteps = prev.techServiceSteps.map(step => { if (step.id === normalizedId) { if (field === 'name') return { ...step, title: value }; if (field === 'description') return { ...step, tags: value.split(/[、,，\s]+/).filter(Boolean) }; } return step; });
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
  const removeTechServiceFromModule = (moduleId: string) => {
    setData(prev => {
      const module = prev.modules.find(m => m.id === moduleId && m.type === 'tech') as TechModule;
      if (module && module.services.length > 0) return handleRemoveTechService(moduleId, module.services.length - 1);
      return prev;
    });
  };
  const resetTechModuleServices = (moduleId: string) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, services: [...DEFAULT_TECH_SERVICES].map(s => ({ ...s, id: Math.random().toString() })) } : m), techServiceSteps: [...DEFAULT_TECH_STEP_CONTENT] })); };
  const updateTechModuleFee = (moduleId: string, fee: number) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, fee } : m) })); };
  const updateTechModuleDetails = (moduleId: string, field: 'minDays' | 'auditCerts', value: number) => { setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'tech' ? { ...m, details: { ...m.details, [field]: value } } : m) })); };
  const addRemark = () => setData(prev => ({ ...prev, additionalRemarks: [...prev.additionalRemarks, ''] }));
  const removeLastRemark = () => { setData(prev => ({ ...prev, additionalRemarks: prev.additionalRemarks.length > 0 ? prev.additionalRemarks.slice(0, -1) : prev.additionalRemarks })); };
  const removeRemark = (index: number) => setData(prev => ({ ...prev, additionalRemarks: prev.additionalRemarks.filter((_, i) => i !== index) }));
  const resetRemarks = () => { setData(prev => ({ ...prev, note1Prefix: INITIAL_DATA.note1Prefix, note1Count: INITIAL_DATA.note1Count, note3Text: INITIAL_DATA.note3Text, additionalRemarks: [], travelExpenseOption: INITIAL_DATA.travelExpenseOption })); setIsNote1Visible(true); setIsNote2Visible(true); setIsNote3Visible(true); };
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
      pdf.save(`报价单_${data.clientName}_${data.quoteDate}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("生成 PDF 失败，可能是内容过多超过浏览器限制。请尝试减少模块或简化内容。");
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
      type === 'text' ? { id: Date.now().toString(), type: 'text', content: '点击此处输入描述内容...', fontSize: 14, fontWeight: 'normal', color: '#4b5563', align: 'left' } :
      type === 'table' ? { id: Date.now().toString(), type: 'table', tableData: [['项目名称', '内容描述'], ['示例项目A', '描述效果A'], ['示例项目B', '描述效果B']], rowSpacing: 12, columnWidths: [50, 50] } :
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
        return { ...prev, modules: prev.modules.map(m => m.id === moduleId && m.type === 'custom' ? { ...m, blocks: updateFn(m.blocks) } : m) };
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
      const newBlock: CaseBlock = { id: Date.now().toString(), type: 'table', tableData: sanitizedData, rowSpacing: 12, columnWidths: Array(columnCount).fill(Math.floor(defaultWidth)) };
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
    if (isNote1Visible) visibleNotes.push({ id: 'note1', content: `以上按${data.note1Prefix} ${data.note1Count} 人以内规模的基础上报价，本报价单 60 天有效。` });
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
    const docImgContainerClass = "border border-gray-100 rounded-[12px] overflow-hidden bg-white shadow-sm flex items-center justify-center p-6 transition-transform hover:scale-[1.02] aspect-[1/1.4] w-full h-full";
    const renderBlocksInDoc = (blocks: CaseBlock[]) => {
      return (
        <div className="space-y-10">
          {blocks.map((block) => (
            <div key={block.id} className="animate-fade-in" style={{ textAlign: block.align || 'left' }}>
              {block.type === 'text' ? (
                <div style={{ fontSize: `${block.fontSize || 14}px`, fontWeight: block.fontWeight === 'bold' ? 700 : (block.fontWeight === 'black' ? 900 : 400), color: block.color || '#4b5563', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{block.content}</div>
              ) : block.type === 'table' ? (
                <div className="overflow-hidden border border-gray-200 rounded-[12px]" style={{ textAlign: 'left', backgroundColor: '#f8fafc' }}>
                  <table className="w-full text-sm border-collapse" style={{ tableLayout: 'fixed' }}>
                    <thead className="bg-[#F8FAFC] text-[#0062AD]">
                      <tr>{block.tableData?.[0].map((cell, i) => (<th key={i} className="px-4 py-3 text-left font-bold border-b-2 border-[#0062AD]" style={{ width: block.columnWidths ? `${block.columnWidths[i]}%` : 'auto' }}>{cell}</th>))}</tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {block.tableData?.slice(1).map((row, ri) => (<tr key={ri} className="border-b border-gray-100">{row.map((cell, ci) => (<td key={ci} className="px-4 text-gray-600 font-quote" style={{ paddingBlock: `${block.rowSpacing || 12}px`, wordBreak: 'break-all', whiteSpace: 'normal', textAlign: 'right' }}>{cell}</td>))}</tr>))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-full">
                  {block.images && block.images.length > 0 && (<div className={`grid ${block.images.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-[40px] items-start`}>{block.images.map((img, idx) => (<div key={idx} className={block.images && block.images.length <= 2 ? 'border border-gray-100 rounded-[12px] overflow-hidden bg-white shadow-sm flex items-center justify-center p-6 transition-transform hover:scale-[1.02] aspect-[1/1.4]' : docImgContainerClass}><img src={img} alt={`Image ${idx}`} loading="lazy" className="max-w-full max-h-full object-contain" /></div>))}</div>)}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    };

    return (
      <div ref={containerRef} className={`${isPrint ? '' : 'mx-auto'} bg-white p-[32px] md:p-[48px] transition-all duration-300 origin-top`} style={{ minHeight: isPrint ? 'auto' : '297mm', width: currentWidth, color: textColor, fontFamily: 'var(--font-zh)', ...style }}>
        <div className="flex justify-between items-center mb-[48px] gap-10 min-h-[90px]"><div className="flex-1 flex justify-start items-center">{leftLogo && <img src={leftLogo} alt="Brand Left" loading="lazy" className="block h-auto w-auto object-contain" style={{ maxHeight: '120px', imageRendering: 'auto' }} />}</div><div className="flex-1 flex justify-end items-center">{rightLogo && <img src={rightLogo} alt="Brand Right" loading="lazy" className="block h-auto w-auto object-contain" style={{ maxHeight: '120px', imageRendering: 'auto' }} />}</div></div>
        <div className="flex justify-between items-end mb-4"><div className="flex-1"><h2 className="mb-1 leading-tight tracking-tight font-bold" style={{ fontSize: `${sizeTitleMain}px`, color: deepColor }}>{dynamicTitle}</h2><p className="text-[13px] text-gray-400 uppercase tracking-widest font-normal font-en">{dynamicSubtitle}</p></div><div className="text-right pb-1 shrink-0"><p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-0.5 font-en">DATE / 签发日期</p><p className="font-bold text-[16px] tracking-tight font-en" style={{ color: textColor }}>{data.quoteDate}</p></div></div>
        <div className="h-[2px] w-full mb-[48px]" style={{ backgroundColor: primaryColor }}></div>
        <div className="mb-[48px]"><div className="grid grid-cols-2 gap-x-12 relative pl-6 border-l-[4px] items-stretch gap-y-4" style={{ borderColor: primaryColor }}><h4 className="uppercase tracking-widest font-semibold" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>客户信息 / CLIENT INFORMATION</h4><h4 className="uppercase tracking-widest font-semibold" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>认证标准与范围 / STANDARD & SCOPE</h4><div className="flex items-center"><p className="font-bold siding-tight" style={{ fontSize: `${sizeText + 4}px`, color: textColor }}>{data.clientName}</p></div><div className="flex items-start gap-3"><span className="font-semibold shrink-0" style={{ fontSize: `${sizeText}px`, color: textColor }}>认证标准:</span><span className="font-normal leading-relaxed font-en" style={{ fontSize: `${sizeText}px`, color: textColor }}>{data.certStandards.join('、')}</span></div><div className="flex items-end gap-3"><span className="font-semibold shrink-0" style={{ fontSize: `${sizeText}px`, color: textColor }}>经营地址:</span><span className="font-normal leading-relaxed" style={{ fontSize: `${sizeText}px`, color: textColor }}>{data.clientAddress}</span></div><div className="flex items-end gap-3"><span className="font-semibold shrink-0" style={{ fontSize: `${sizeText}px`, color: textColor }}>认证范围:</span><span className="font-normal siding-relaxed" style={{ fontSize: `${sizeText}px`, color: textColor }}>{data.certScope}</span></div></div></div>
        <table className="w-full mb-[48px] border-collapse"><thead><tr className="bg-[#F8FAFC]"><th className="py-4 text-left font-semibold uppercase border-b-2 border-[#0062AD]" style={{ fontSize: `${sizeTitleModule}px`, color: primaryColor }}>描述 / DESCRIPTION</th><th className="py-4 text-left font-semibold uppercase pl-40 border-b-2 border-[#0062AD]" style={{ fontSize: `${sizeTitleModule}px`, color: primaryColor }}>具体项目 / PROJECT</th><th className="py-4 text-right font-semibold uppercase whitespace-nowrap border-b-2 border-[#0062AD]" style={{ fontSize: `${sizeTitleModule}px`, color: primaryColor }}>金额 / AMOUNT</th></tr></thead><tbody className="divide-y divide-gray-100">{data.modules.map(module => { if (module.type === 'cert') { const prefix = getBracketLabel(module.title, 'cert'); return module.items.map(item => (<tr key={item.id} className="border-b border-gray-50"><td className="py-6 align-top">{prefix ? (<div className="space-y-1"><p className="font-semibold text-gray-400" style={{ fontSize: `${sizeSmall + 1}px` }}>【{prefix}】</p><p className="font-semibold text-[#333333]" style={{ fontSize: `${sizeTitleModule}px` }}>{item.type}</p></div>) : (<p className="font-semibold text-[#333333]" style={{ fontSize: `${sizeTitleModule}px` }}>{item.type}</p>)}</td><td className="py-6 pl-40 align-top">{prefix && <p className="font-semibold text-transparent select-none mb-1" style={{ fontSize: `${sizeSmall + 1}px` }}>【{prefix}】</p>}<p className="text-[#333333] font-semibold siding-relaxed" style={{ fontSize: `${sizeTitleModule}px` }}>{item.project}</p></td><td className="py-6 text-right font-bold whitespace-nowrap font-quote align-top" style={{ fontSize: `${sizeTitleModule + 2}px`, color: primaryColor }}><div className="flex items-baseline justify-end gap-0.5"><span className="mr-0.5 text-[0.6em] font-bold opacity-60">¥</span>{item.amount.toLocaleString()}</div></td></tr>)); } else if (module.type === 'tech') { const prefix = getBracketLabel(module.title, 'tech'); const activeServices = module.services.filter(s => s.checked).map(s => s.name); const serviceChunks = []; for (let i = 0; i < activeServices.length; i += 3) serviceChunks.push(activeServices.slice(i, i + 3).join('、')); const detailsStr = `指导周期：不少于（现场+远程） ${module.details.minDays} 人天，内审员证书：${module.details.auditCerts} 份`; return (<tr key={module.id} className="border-b border-gray-50"><td className="py-6 align-top">{prefix ? (<div className="space-y-1"><p className="font-semibold text-gray-400" style={{ fontSize: `${sizeSmall + 1}px` }}>【{prefix}】</p><p className="font-semibold text-[#333333]" style={{ fontSize: `${sizeTitleModule}px` }}>专业技术服务费</p></div>) : (<p className="font-semibold text-[#333333]" style={{ fontSize: `${sizeTitleModule}px` }}>专业技术服务费</p>)}</td><td className="py-6 pl-40 align-top"><div className="space-y-2"><div className="space-y-0.5">{serviceChunks.map((chunk, idx) => (<p key={idx} className="text-[#333333] font-semibold siding-relaxed" style={{ fontSize: `${sizeTitleModule}px` }}>{chunk}</p>))}</div><p className="text-gray-400 font-normal italic" style={{ fontSize: `${sizeText}px` }}>{detailsStr}</p></div></td><td className="py-6 text-right font-bold whitespace-nowrap font-quote align-top" style={{ fontSize: `${sizeTitleModule + 2}px`, color: primaryColor }}><div className="flex items-baseline justify-end gap-0.5"><span className="mr-0.5 text-[0.6em] font-bold opacity-60">¥</span>{module.fee.toLocaleString()}</div></td></tr>); } return null; })}</tbody><tfoot><tr className="border-t-2 border-gray-900"><td colSpan={2} className="py-8 text-left font-bold uppercase tracking-wide" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>总计 GRAND TOTAL (含6%增值税)</td><td className="py-8 text-right font-bold whitespace-nowrap font-quote flex items-baseline justify-end gap-1" style={{ fontSize: `${sizeTitleModule * 1.9 - 4}px`, color: primaryColor }}><span className="text-[0.45em] font-bold opacity-60">¥</span>{grandTotal.toLocaleString()}</td></tr></tfoot></table>
        <div className="space-y-4 border-t border-gray-100 pt-8 pb-10 leading-relaxed" style={{ fontSize: `${sizeText}px` }}><p className="font-bold underline mb-4 tracking-widest uppercase" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>报价说明 / Terms:</p><div className="space-y-3 font-normal text-gray-700 overflow-hidden">{visibleNotes.map((note, idx) => (<div key={note.id} className="flex gap-3 items-baseline w-full"><span className="font-semibold shrink-0 font-en font-bold" style={{ color: primaryColor, fontSize: `${sizeSmall}px` }}>{idx + 1}.</span><div dangerouslySetInnerHTML={{ __html: note.content }} className="rich-text-content text-left siding-relaxed font-normal" style={{ fontSize: `${sizeSmall}px`, wordBreak: 'break-word', whiteSpace: 'pre-wrap' }} /></div>))}</div></div>
        <div className="mt-4 flex justify-between items-end pt-10 border-t-2" style={{ borderColor: `${primaryColor}33` }}><div className="flex-1"><h3 className="mb-3 siding-none font-semibold" style={{ fontSize: `${sizeTitleMain + 4}px`, color: deepColor }}>{data.contact.name}</h3><div className="mb-10"><p className="text-[14px] font-normal text-[#333333] mb-1 tracking-tight">{data.contact.jobTitle1}</p><p className="text-[14px] font-normal text-gray-500 tracking-tight">{data.contact.jobTitle2}</p></div><div className="space-y-5"><div className="flex items-center gap-4"><div className="w-7 h-7 bg-[#00b050] rounded-sm flex items-center justify-center shrink-0 shadow-sm"><Phone className="w-4 h-4 text-white fill-current" /></div><span className="text-[17px] font-bold text-[#333333] font-num tracking-tight">{data.contact.phone}</span></div><div className="flex items-center gap-4"><div className="w-7 h-7 bg-[#EE4932] rounded-sm flex items-center justify-center shrink-0 shadow-sm"><Mail className="w-4 h-4 text-white fill-current" /></div><span className="text-[17px] font-bold text-[#333333] font-en tracking-tight">{data.contact.email}</span></div><div className="flex items-center gap-4"><div className="w-7 h-7 bg-[#fbbc04] rounded-sm flex items-center justify-center shrink-0 shadow-sm"><MapPin className="w-4 h-4 text-white fill-current" /></div><span className="text-[15px] font-bold text-[#333333] leading-tight tracking-tight">{data.contact.officeAddress}</span></div></div></div><div className="shrink-0 ml-16 relative"><div className="relative w-[220px] bg-transparent flex items-end"><div className="relative w-full"><img src="https://wp-cdn.4ce.cn/v2/bTQ9Tq2.png" alt="Card Decoration" loading="lazy" className="w-full h-auto block" /><div className="absolute top-[26%] left-[11.6%] w-[35.5%] h-[40.5%] bg-white p-0 overflow-hidden flex items-center justify-center">{data.contact.qrCode ? <img src={data.contact.qrCode} alt="Contact QR" loading="lazy" className="max-w-full max-h-full aspect-square object-contain" /> : (<div className="flex items-center justify-center w-full h-full bg-white"><QrCode className="w-14 h-14 text-gray-200" /></div>)}</div></div></div></div></div>
        {processOrder.map(moduleId => {
          const isVisible = moduleId === 'cert-process' ? isCertProcessVisible : moduleId === 'tech-process' ? isTechProcessVisible : moduleId === 'customer-case' ? isCustomerCaseVisible : moduleId === 'cert-templates' ? isCertTemplatesVisible : moduleId === 'agency-profile' || moduleId === 'business-qualifications';
          if (!isVisible) return null;
          if (moduleId === 'cert-process') return (<div key="cert-process" className="mt-[48px] pt-[48px] border-t-2 border-dashed border-gray-100"><h4 className="uppercase tracking-widest mb-10 font-black text-center" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>管理体系认证流程 / MANAGEMENT SYSTEM CERTIFICATION PROCESS</h4><CertificationProcess validity={processValidity} /></div>);
          if (moduleId === 'tech-process') return (<div key="tech-process" className="mt-[48px] pt-[48px] border-t-2 border-dashed border-gray-100"><h4 className="uppercase tracking-widest mb-10 font-black text-center" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>专业技术服务流程 / PROFESSIONAL TECHNICAL SERVICE PROCESS</h4><TechnicalServiceProcess steps={data.techServiceSteps} /></div>);
          if (moduleId === 'agency-profile') return (<div key="agency-profile" className="mt-[48px] pt-[48px] border-t-2 border-dashed border-gray-100"><h4 className="uppercase tracking-widest mb-10 font-black text-center" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>机构简介 / AGENCY PROFILE</h4><AgencyProfile /></div>);
          if (moduleId === 'business-qualifications') return (<div key="business-qualifications" className="mt-[48px] pt-[48px] border-t-2 border-dashed border-gray-100"><h4 className="uppercase tracking-widest mb-10 font-black text-center" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>业务资质 / BUSINESS QUALIFICATIONS</h4><Qualifications /></div>);
          if (moduleId === 'customer-case' && data.caseBlocks.length > 0) return (<div key="customer-case" className="mt-[48px] pt-[48px] border-t-2 border-dashed border-gray-100"><h4 className="uppercase tracking-widest mb-10 font-black text-center" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>客户案例 / CUSTOMER CASES</h4>{renderBlocksInDoc(data.caseBlocks)}</div>);
          if (moduleId === 'cert-templates' && data.certTemplates.length > 0) return (<div key="cert-templates" className="mt-[48px] pt-[48px] border-t-2 border-dashed border-gray-100"><h4 className="uppercase tracking-widest mb-10 font-black text-center" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>证书模板 / CERTIFICATE TEMPLATES</h4><div className={`grid ${data.certTemplates.length <= 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-[40px] items-start`}>{data.certTemplates.map((img, idx) => (<div key={idx} className={docImgContainerClass}><img src={img} alt={`Template ${idx}`} loading="lazy" className="max-w-full max-h-full object-contain" /></div>))}</div></div>);
          return null;
        })}
        <div className="space-y-[48px]">{data.modules.filter(m => m.type === 'custom').map(module => (<div key={module.id} className="mt-[48px] pt-[48px] border-t-2 border-dashed border-gray-100"><h4 className="uppercase tracking-widest mb-10 font-black text-center" style={{ fontSize: `${sizeTitleModule}px`, color: deepColor }}>{module.title}</h4>{renderBlocksInDoc(module.blocks)}</div>))}</div>
      </div>
    );
  };

  const RenderModuleBlocksEditor = ({ moduleId, blocks, excelInputRef }: { moduleId: string | null, blocks: CaseBlock[], excelInputRef: React.RefObject<HTMLInputElement | null> }) => {
    return (
      <div 
        className={`min-h-[300px] rounded-[12px] p-6 border-2 border-dashed transition-all flex flex-col gap-6 ${draggingExcelTargetId === (moduleId || 'main-case') ? 'bg-[#EFF5FC] border-[#0062AD] scale-[1.01]' : 'bg-slate-50/50 border-slate-200'}`}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); if (e.dataTransfer.types.includes('Files')) setDraggingExcelTargetId(moduleId || 'main-case'); }}
        onDragLeave={() => setDraggingExcelTargetId(null)}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation(); setDraggingExcelTargetId(null); const files = e.dataTransfer.files; if (files && files.length > 0) { const ext = files[0].name.split('.').pop()?.toLowerCase(); if (['xlsx', 'xls', 'csv'].includes(ext || '')) parseExcelFileToModule(files[0], moduleId); } }}
      >
        {blocks.length === 0 ? (<div className="flex-1 flex flex-col items-center justify-center text-slate-300 py-12 pointer-events-none"><div className="w-20 h-20 bg-white rounded-[12px] flex items-center justify-center shadow-sm mb-4 border border-slate-100"><Presentation className="w-10 h-10 opacity-20" /></div><p className="text-sm font-bold opacity-60">空白演示画布</p><p className="text-xs opacity-40 mt-1">点击上方按钮或直接拖入 Excel 文件识别</p></div>) : (
          <div className="space-y-6">
            {blocks.map((block, idx) => (
              <div key={block.id} draggable onDragStart={(e) => { e.dataTransfer.setData('sourceBlockIdx', idx.toString()); e.dataTransfer.setData('sourceModuleId', moduleId || ''); e.stopPropagation(); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const sIdx = parseInt(e.dataTransfer.getData('sourceBlockIdx')); const sModuleId = e.dataTransfer.getData('sourceModuleId'); if (sModuleId === (moduleId || '') && !isNaN(sIdx) && sIdx !== idx) handleReorderBlocksInModule(moduleId, sIdx, idx); }} className="relative group/block bg-white p-6 rounded-[12px] border border-slate-200 shadow-sm hover:border-[#BDD1FF] transition-all"><div className="absolute -left-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-200 opacity-0 group-hover/block:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => removeBlockFromModule(moduleId, block.id)} className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover/block:opacity-100 shadow-lg transition-all z-20"><X className="w-3 h-3" /></button>
                {block.type === 'text' ? (<div className="space-y-4"><div className="flex wrap items-center justify-between gap-4 border-b border-gray-50 pb-4 mb-4"><div className="flex items-center gap-2 text-[#0062AD] font-bold text-xs uppercase tracking-widest"><Type className="w-3 h-3" /> 文本样式</div><div className="flex wrap items-center gap-2"><div className="flex items-center gap-1.5 border border-gray-100 rounded-[8px] p-1 bg-gray-50/50"><TypeIcon className="w-3.5 h-3.5 text-gray-400 ml-1" /><input type="number" className="w-12 !p-0.5 !border-0 bg-transparent text-xs font-bold text-center" value={block.fontSize} onChange={e => updateBlockInModule(moduleId, block.id, 'fontSize', parseInt(e.target.value) || 14)} /></div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100">{(['normal', 'bold', 'black'] as const).map(w => (<button key={w} onClick={() => updateBlockInModule(moduleId, block.id, 'fontWeight', w)} className={`px-2 py-0.5 text-[10px] rounded-[4px] transition-all font-bold ${block.fontWeight === w ? 'bg-[#0062AD] text-white' : 'text-gray-400'}`}>{w === 'normal' ? '细' : w === 'bold' ? '粗' : '极'}</button>))}</div><div className="flex items-center bg-gray-50/50 rounded-[8px] p-1 border border-gray-100">{(['left', 'center', 'right'] as const).map(a => (<button key={a} onClick={() => updateBlockInModule(moduleId, block.id, 'align', a)} className={`p-1 rounded-[4px] transition-all ${block.align === a ? 'bg-[#0062AD] text-white' : 'text-gray-400'}`}>{a === 'left' ? <AlignLeft className="w-3 h-3" /> : a === 'center' ? <AlignCenter className="w-3 h-3" /> : <AlignRight className="w-3 h-3" />}</button>))}</div></div></div><textarea className="w-full bg-slate-50 border-none rounded-[8px] p-4 focus:bg-white transition-all min-h-[120px]" style={{ fontSize: `${block.fontSize}px`, fontWeight: block.fontWeight === 'bold' ? 700 : (block.fontWeight === 'black' ? 900 : 400), color: block.color, textAlign: block.align }} value={block.content} onChange={e => updateBlockInModule(moduleId, block.id, 'content', e.target.value)} /></div>
                ) : block.type === 'table' ? (<div className="space-y-4"><div className="flex wrap items-center justify-between gap-4 border-b border-gray-50 pb-4 mb-4"><div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-widest"><Table2 className="w-3 h-3" /> 表格管理</div><div className="flex gap-2"><button onClick={() => addTableRowInModule(moduleId, block.id)} className="p-1.5 text-emerald-600 bg-emerald-50 rounded-[4px] flex items-center gap-1"><Plus className="w-3 h-3" /><span className="text-[10px] font-bold">加行</span></button><button onClick={() => addTableColInModule(moduleId, block.id)} className="p-1.5 text-emerald-600 bg-emerald-50 rounded-[4px] flex items-center gap-1"><Columns className="w-3 h-3" /><span className="text-[10px] font-bold">加列</span></button></div></div><div className="overflow-x-auto border border-slate-100 rounded-[12px]"><table className="w-full border-collapse bg-[#f1f5f9] table-fixed" data-table-block-id={block.id}><thead><tr className="bg-[#304166]">{block.tableData?.[0].map((cell, i) => (<th key={i} className="p-0 border-r border-white/10 last:border-0 relative group/th" style={{ width: block.columnWidths ? `${block.columnWidths[i]}%` : 'auto' }}><input className="w-full bg-transparent border-none text-white text-xs font-bold px-3 py-2 focus:ring-0 text-left" value={cell} onChange={e => updateTableCellInModule(moduleId, block.id, 0, i, e.target.value)} />{i < (block.tableData?.[0].length || 0) - 1 && (<div className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-[#0062AD] z-10 transition-colors" onMouseDown={(e) => { resizingInfo.current = { blockId: block.id, colIdx: i, startX: e.clientX, startWidths: [...(block.columnWidths || [])] }; document.body.style.cursor = 'col-resize'; }} />)}</th>))}</tr></thead><tbody className="divide-y divide-slate-200">{block.tableData?.slice(1).map((row, ri) => (<tr key={ri}>{row.map((cell, ci) => (<td key={ci} className="p-0 border-r border-slate-200 last:border-0"><textarea className="w-full bg-transparent border-none text-slate-600 text-xs px-3 focus:ring-0 resize-none font-quote" style={{ paddingBlock: `${block.rowSpacing}px`, textAlign: 'right' }} value={cell} rows={cell.split('\n').length || 1} onChange={e => updateTableCellInModule(moduleId, block.id, ri + 1, ci, e.target.value)} /></td>))}</tr>))}</tbody></table></div></div>
                ) : (<div className="space-y-4"><div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest border-b border-gray-50 pb-4 mb-4"><ImageIcon className="w-3 h-3" /> 图片管理</div><div className="w-full flex wrap gap-4">{block.images?.map((img, iIdx) => (<div key={iIdx} className="w-[calc(33.333%-12px)] relative group/caseimg border border-gray-100 rounded-[8px] overflow-hidden bg-white shadow-sm transition-transform hover:scale-[1.02]"><img src={img} className="w-full h-auto block" loading="lazy" /><button onClick={() => removeImageFromBlock(moduleId, block.id, iIdx)} className="absolute top-1.5 right-1.5 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover/caseimg:opacity-100 transition-opacity"><Trash2 className="w-3 h-3" /></button></div>))}<div onClick={() => { activeCaseBlockIdRef.current = block.id; caseImageInputRef.current?.click(); }} className="w-[calc(33.333%-12px)] aspect-square border-2 border-dashed border-gray-200 rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-[#BDD1FF] transition-all text-gray-400"><Plus className="w-5 h-5 mb-1" /><span className="text-[9px] font-bold">继续添加</span></div></div></div>)}
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

  const SidebarTitle = ({ icon: Icon, title, isSub = false }: { icon: any, title: string, isSub?: boolean }) => ( <div className={`flex items-center gap-2 font-semibold text-[#475569] ${isSub ? 'mb-4 mt-6' : 'mb-4 pb-3 border-b border-[#EFF5FC]'}`}><Icon className="w-4 h-4 text-[#0062AD]" /><span className="text-[15px]">{title}</span></div> );

  const extraModulesMap = {
    'cert-process': isCertProcessVisible ? ( <section key="cert-process" draggable="true" onDragStart={(e) => handleDragStart(e, 'cert-process')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('cert-process'); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'cert-process')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border-2 ${dragOverModuleId === 'cert-process' ? 'border-[#0062AD] scale-[1.01]' : 'border-transparent hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsCertProcessVisible(false)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-8"><div className="section-header !mb-0"><LayoutGrid className="w-5 h-5" /><span>管理体系认证流程</span></div><div className="flex items-center bg-[#EFF5FC] p-1 rounded-[12px] border border-[#BDD1FF] shadow-sm transition-all duration-300"><button onClick={() => setProcessValidity('1year')} className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all flex items-center gap-1.5 ${processValidity === '1year' ? 'bg-[#0062AD] text-white shadow-md' : 'text-gray-500 hover:text-[#0062AD]'}`}><Clock className="w-3.5 h-3.5" /> 一年有效期</button><button onClick={() => setProcessValidity('3years')} className={`px-4 py-1.5 text-[12px] font-bold rounded-[8px] transition-all flex items-center gap-1.5 ${processValidity === '3years' ? 'bg-[#0062AD] text-white shadow-md' : 'text-gray-500 hover:text-[#0062AD]'}`}><Clock className="w-3.5 h-3.5" /> 三年有效期</button></div></div><CertificationProcess validity={processValidity} /></section> ) : null,
    'tech-process': isTechProcessVisible ? ( <section key="tech-process" draggable="true" onDragStart={(e) => handleDragStart(e, 'tech-process')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('tech-process'); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'tech-process')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border-2 ${dragOverModuleId === 'tech-process' ? 'border-[#0062AD] scale-[1.01]' : 'border-transparent hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsCertProcessVisible(false)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-6"><div className="section-header !mb-0"><Zap className="w-5 h-5" /><span>专业技术服务流程</span></div><div className="flex gap-2"><button onClick={resetTechSteps} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-gray-100 text-gray-600 px-3 py-1.5 rounded-[12px] hover:bg-gray-50 transition-all"><RotateCcw className="w-3 h-3" /> 重置</button><button onClick={addTechStep} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] px-3 py-1.5 rounded-[12px] hover:bg-[#EFF5FC] transition-all"><Plus className="w-3 h-3" /> 添加流程</button><button onClick={handleRemoveLastStep} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-red-100 text-red-500 px-3 py-1.5 rounded-[12px] hover:bg-red-50 transition-all"><Minus className="w-3 h-3" /> 移除流程</button></div></div><TechnicalServiceProcess steps={data.techServiceSteps} onUpdateStep={handleUpdateTechStep} onRemoveStep={handleRemoveStep} onReorderSteps={handleStepReorder} onUpdateTags={handleUpdateTechStepTags} isEditable={true} /></section> ) : null,
    'agency-profile': ( <section key="agency-profile" className="card overflow-hidden transition-all duration-300 border-2 border-transparent"><div className="section-header"><Building className="w-5 h-5" /><span>机构简介</span></div><AgencyProfile /></section> ),
    'business-qualifications': ( <section key="business-qualifications" className="card overflow-hidden transition-all duration-300 border-2 border-transparent"><div className="section-header"><FileCheck className="w-5 h-5" /><span>业务资质</span></div><Qualifications /></section> ),
    'customer-case': isCustomerCaseVisible ? (
      <section key="customer-case" draggable="true" onDragStart={(e) => handleDragStart(e, 'customer-case')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('customer-case'); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'customer-case')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border-2 ${dragOverModuleId === 'customer-case' ? 'border-[#0062AD] scale-[1.01]' : 'border-transparent hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsCustomerCaseVisible(false)} title="隐藏模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-6"><div className="section-header !mb-0"><Presentation className="w-5 h-5" /><span>客户案例展示</span></div><div className="flex gap-2"><button onClick={() => setData(prev => ({ ...prev, caseBlocks: [] }))} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-gray-100 text-gray-600 px-3 py-1.5 rounded-[12px] hover:bg-gray-50 transition-all shadow-sm"><RotateCcw className="w-3.5 h-3.5" /> 重置</button><button onClick={() => excelInputRef.current?.click()} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-emerald-100 text-emerald-600 px-3 py-1.5 rounded-[12px] hover:bg-emerald-50 transition-all shadow-sm"><FileSpreadsheet className="w-3.5 h-3.5" /> 导入 Excel</button><button onClick={() => addBlockToModule(null, 'image')} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-amber-100 text-amber-600 px-3 py-1.5 rounded-[12px] hover:bg-amber-50 transition-all shadow-sm"><Images className="w-3.5 h-3.5" /> 添加图片</button><button onClick={() => addBlockToModule(null, 'text')} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] px-3 py-1.5 rounded-[12px] hover:bg-[#EFF5FC] transition-all shadow-sm"><Type className="w-3.5 h-3.5" /> 添加文本</button><button onClick={() => addBlockToModule(null, 'table')} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-emerald-100 text-emerald-600 px-3 py-1.5 rounded-[12px] hover:bg-emerald-50 transition-all shadow-sm"><Table2 className="w-3.5 h-3.5" /> 添加表格</button></div></div><input type="file" ref={excelInputRef} className="hidden" accept=".xlsx, .xls, .csv" onChange={handleExcelUpload} /><RenderModuleBlocksEditor moduleId={null} blocks={data.caseBlocks} excelInputRef={excelInputRef} /></section>
    ) : null,
    'cert-templates': isCertTemplatesVisible ? (
      <section key="cert-templates" draggable="true" onDragStart={(e) => handleDragStart(e, 'cert-templates')} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId('cert-templates'); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, 'cert-templates')} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border-2 ${dragOverModuleId === 'cert-templates' ? 'border-[#0062AD] scale-[1.01]' : 'border-transparent hover:border-[#BDD1FF]'}`}><div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => setIsCertTemplatesVisible(false)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button><div className="flex justify-between items-center mb-6"><div className="section-header !mb-0"><Award className="w-5 h-5" /><span>证书模板</span></div><div className="flex gap-2"><button onClick={() => setData(prev => ({ ...prev, certTemplates: [] }))} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-gray-100 text-gray-600 px-3 py-1.5 rounded-[12px] hover:bg-gray-50 transition-all"><RotateCcw className="w-3 h-3" /> 清空</button><button onClick={() => certTemplateInputRef.current?.click()} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] px-3 py-1.5 rounded-[12px] hover:bg-[#EFF5FC] transition-all"><Upload className="w-3 h-3" /> 上传模板</button></div></div><div className={`min-h-[200px] border-2 border-dashed rounded-[12px] transition-all duration-300 flex flex-col items-center justify-center p-6 ${isDraggingOverCertTemplates ? 'border-[#0062AD] bg-[#EFF5FC]' : 'border-gray-200 hover:border-[#BDD1FF]'}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverCertTemplates(true); }} onDragLeave={() => setIsDraggingOverCertTemplates(false)} onDrop={(e) => { e.preventDefault(); setIsDraggingOverCertTemplates(false); const templateUrl = e.dataTransfer.getData('templateUrl'); if (templateUrl) addCommonTemplate(templateUrl); else { const internalTmplIdx = e.dataTransfer.getData('certTemplateIdx'); if (internalTmplIdx === "") handleCertTemplateFiles(e.dataTransfer.files); } }} onPaste={handlePaste} onClick={() => data.certTemplates.length === 0 && certTemplateInputRef.current?.click()}><input type="file" ref={certTemplateInputRef} className="hidden" accept="image/*" multiple onChange={(e) => handleCertTemplateFiles(e.target.files)} />{data.certTemplates.length > 0 ? (<div className="w-full flex wrap justify-center gap-[40px]">{data.certTemplates.map((img, tIdx) => (<div key={tIdx} draggable onDragStart={(e) => { e.dataTransfer.setData('certTemplateIdx', tIdx.toString()); e.stopPropagation(); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); e.stopPropagation(); const sIdx = parseInt(e.dataTransfer.getData('certTemplateIdx')); if (!isNaN(sIdx) && sIdx !== tIdx) handleReorderCertTemplates(sIdx, tIdx); }} className="w-[calc(33.333%-27px)] relative group/img border border-gray-100 rounded-[12px] overflow-hidden bg-white shadow-sm transition-transform hover:scale-[1.02] cursor-grab active:cursor-grabbing"><img src={img} alt={`Template ${tIdx}`} loading="lazy" className="w-full h-auto block object-contain" /><button onClick={(e) => { e.stopPropagation(); removeCertTemplate(tIdx); }} className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover/img:opacity-100 transition-opacity z-10"><Trash2 className="w-3.5 h-3.5" /></button></div>))}<div onClick={() => certTemplateInputRef.current?.click()} className="w-[calc(33.333%-27px)] aspect-square border-2 border-dashed border-gray-200 rounded-[12px] flex flex-col items-center justify-center cursor-pointer hover:border-[#BDD1FF] hover:bg-gray-50 transition-all text-gray-400 group"><Plus className="w-6 h-6 mb-2 group-hover:scale-110 transition-transform" /><span className="text-[11px] font-bold">继续添加</span></div></div>) : (<div className="flex flex-col items-center text-gray-300 pointer-events-none"><div className="w-16 h-16 rounded-[12px] bg-gray-50 flex items-center justify-center mb-4"><Copy className="w-8 h-8 text-gray-200" /></div><p className="text-[14px] font-bold text-gray-400">支持上传、拖放图片或粘贴截图</p><p className="text-[12px] text-gray-300 mt-1">系统将自动分析并裁剪底部多余白边</p></div>)}</div></section>
    ) : null
  };

  return (
    <div className="max-w-[1550px] mx-auto px-6 py-10 flex flex-col lg:flex-row gap-8">
      <div id="pdf-export-target" className="absolute -left-[9999px] top-0"><QuoteDocument containerRef={pdfSourceRef} isPrint={true} /></div>
      
      {/* LEFT COLUMN: Main Editor Area */}
      <div className={`flex-1 max-w-[900px] transition-colors duration-300 space-y-4 ${isDraggingOverMain ? 'bg-[#EFF5FC]' : ''}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverMain(true); }} onDragLeave={() => setIsDraggingOverMain(false)} onDrop={handleDropToMain}>
        
        {/* Module 1: Header */}
        <header className="flex flex-col mb-10"><div className="relative flex justify-between items-center w-full mb-12 gap-10 transition-all min-h-[120px]"><EditableBrandLogo src={leftLogo} label="左侧 Logo" onUpload={setLeftLogo} align="left" className="flex-1" /><EditableBrandLogo src={rightLogo} label="右侧 Logo" onUpload={setRightLogo} align="right" className="flex-1" /></div><div className="text-center relative"><div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent -z-10"></div><h1 className="text-[22px] md:text-[28px] font-bold text-[#304166] mb-2 bg-[#f4f7fa] inline-block px-10 transition-all duration-300">{dynamicTitle}</h1><p className="text-gray-500 text-[13px] tracking-[0.2em] uppercase font-normal opacity-80">{dynamicSubtitle}</p></div></header>
        
        {/* Module 2: Client Basic Info */}
        <section className="card"><div className="section-header"><Building2 className="w-5 h-5" /><span>客户及认证基本信息</span></div><div className="grid grid-cols-12 gap-x-4 gap-y-3"><div className="col-span-12 md:col-span-9"><label className="field-label">客户名称</label><input value={data.clientName} onChange={e => setData({...data, clientName: e.target.value})} placeholder="输入公司全称" /></div><div className="col-span-12 md:col-span-3"><label className="field-label">有效人数</label><input className="text-left font-num" type="number" value={data.employeeCount} onChange={e => setData({...data, employeeCount: parseInt(e.target.value) || 0})} /></div><div className="col-span-12"><label className="field-label">客户经营地址</label><input value={data.clientAddress} onChange={e => setData({...data, clientAddress: e.target.value})} placeholder="详细经营地址" /></div><div className="col-span-12 relative" ref={standardDropdownRef}><label className="field-label">认证标准</label><div onClick={() => setIsStandardOpen(!isStandardOpen)} className="flex items-center justify-between border border-gray-200 !rounded-[12px] p-2 bg-white cursor-pointer hover:border-[#0062AD] transition-colors min-h-[42px] max-h-[120px] overflow-y-auto no-scrollbar"><div className="flex wrap gap-1 text-[13px] font-normal text-gray-500">{data.certStandards.length > 0 ? data.certStandards.map(s => (<span key={s} className="bg-[#EFF5FC] text-[#0062AD] text-[11px] px-1.5 py-0.5 rounded-[4px] border border-[#BDD1FF] font-en">{s}</span>)) : <span className="text-gray-400 text-xs">点击选择</span>}</div><ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform flex-shrink-0 ${isStandardOpen ? 'rotate-180' : ''}`} /></div>{isStandardOpen && (<div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[12px] shadow-2xl overflow-hidden animate-fade-in flex flex-col min-w-[320px] sm:min-w-[700px] w-full"><div className="p-2 border-b border-gray-50 bg-gray-50/50"><span className="text-[10px] font-black text-[#0062AD] uppercase tracking-widest pl-2">认证标准快速检索与选择</span></div><div className="p-3 flex flex-col gap-2"><div className="relative"><Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" /><input autoFocus type="text" placeholder="搜索标准..." className="pl-8 pr-3 py-1.5 border-gray-200 text-xs font-en !rounded-[8px]" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div><div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 max-h-[400px] overflow-y-auto pr-1">{filteredStandards.map(std => (<div key={std} onClick={() => toggleStandard(std)} className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-[8px] cursor-pointer group transition-colors"><div className={`w-3.5 h-3.5 rounded-[4px] border transition-colors flex items-center justify-center flex-shrink-0 ${data.certStandards.includes(std) ? 'bg-[#0062AD] border-[#0062AD]' : 'border-gray-300 group-hover:border-[#0062AD]'}`}>{data.certStandards.includes(std) && <Check className="w-2.5 h-2.5 text-white" />}</div><span className="text-[12px] text-gray-700 truncate select-none siding-tight">{std}</span></div>))}<div className="flex items-center gap-2 p-1.5 hover:bg-gray-50 rounded-[8px] cursor-pointer group transition-colors">{isAddingCustom ? (<div className="flex items-center gap-1.5 w-full" onClick={e => e.stopPropagation()}><input autoFocus placeholder="输入标准名称" className="flex-1 !py-1 !px-2 text-[11px] border-[#BDD1FF] focus:border-[#0062AD] !rounded-[8px]" value={customStandardInput} onChange={e => setCustomStandardInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddCustomStandard()} /><button onClick={handleAddCustomStandard} className="p-1 text-[#0062AD] hover:bg-[#EFF5FC] rounded-[8px] transition-colors"><Check className="w-3 h-3" /></button><button onClick={() => { setIsAddingCustom(false); setCustomStandardInput(''); }} className="p-1 text-[#EE4932] hover:bg-red-50 rounded-[8px] transition-colors"><X className="w-3 h-3" /></button></div>) : (<div onClick={(e) => { e.stopPropagation(); setIsAddingCustom(true); }} className="flex items-center gap-2 w-full"><div className="w-3.5 h-3.5 rounded-[4px] border border-dashed border-gray-300 group-hover:border-[#0062AD] flex items-center justify-center flex-shrink-0"><Plus className="w-2.5 h-2.5 text-gray-400 group-hover:text-[#0062AD]" /></div><span className="text-[12px] text-gray-400 font-semibold group-hover:text-[#0062AD] transition-colors">其他</span></div>)}</div></div></div></div>)}</div><div className="col-span-12"><label className="field-label">认证范围</label><textarea rows={1} value={data.certScope} onChange={e => setData({...data, certScope: e.target.value})} placeholder="详细描述认证覆盖范围" className="resize-none min-h-[42px] max-h-[120px] !rounded-[12px]" /></div></div></section>
        
        {/* Dynamic Quote Modules (Direct children for space-y-4) */}
        {data.modules.filter(m => m.type !== 'custom').map((module) => (
          <section key={module.id} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border-2 ${dragOverModuleId === module.id ? 'border-[#0062AD] scale-[1.01]' : 'border-transparent hover:border-[#BDD1FF]'}`} draggable="true" onDragStart={(e) => handleDragStart(e, module.id)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(module.id); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, module.id)}>
            <div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => removeModule(module.id)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="section-header !mb-0 flex-1">{module.type === 'cert' ? <Layout className="w-5 h-5 shrink-0" /> : <Settings className="w-5 h-5 shrink-0" />}<input className="!border-0 !p-0 font-bold bg-transparent focus:ring-0 text-[17px] text-[#304166] w-full" value={module.title} onChange={e => updateModuleTitle(module.id, e.target.value)} /></div>
              <div className="flex gap-2">
                {module.type === 'cert' ? (<><button onClick={() => resetCertModuleItems(module.id)} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-gray-100 text-gray-600 px-3 py-1.5 rounded-[12px] hover:bg-gray-50 transition-all"><RotateCcw className="w-3 h-3" /> 重置</button><button onClick={() => addCertItemToModule(module.id)} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] px-3 py-1.5 rounded-[12px] hover:bg-[#EFF5FC] transition-all"><Plus className="w-3 h-3" /> 添加阶段</button><button onClick={() => removeCertItemFromModule(module.id)} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-red-100 text-red-500 px-3 py-1.5 rounded-[12px] hover:bg-red-50 transition-all"><Minus className="w-3 h-3" /> 移除阶段</button></>) : (<><button onClick={() => resetTechModuleServices(module.id)} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-gray-100 text-gray-600 px-3 py-1.5 rounded-[12px] hover:bg-gray-50 transition-all"><RotateCcw className="w-3 h-3" /> 重置</button><button onClick={() => addTechServiceToModule(module.id)} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] px-3 py-1.5 rounded-[12px] hover:bg-[#EFF5FC] transition-all"><Plus className="w-3 h-3" /> 添加服务</button><button onClick={() => removeTechServiceFromModule(module.id)} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-red-100 text-red-500 px-3 py-1.5 rounded-[12px] hover:bg-red-50 transition-all"><Minus className="w-3 h-3" /> 移除服务</button></>)}
              </div>
            </div>
            {module.type === 'cert' ? (<div className="border border-gray-100 rounded-[12px] overflow-hidden shadow-sm"><table className="w-full text-[14px] border-separate border-spacing-0"><thead className="bg-[#F8FAFC] text-[#304166] border-b-2 border-[#0062AD]"><tr><th className="px-5 py-3 text-left font-semibold first:rounded-tl-[12px] border-b-2 border-[#0062AD]">认证阶段</th><th className="px-5 py-3 text-left font-semibold border-b-2 border-[#0062AD]">具体收费项目</th><th className="px-5 py-3 text-right font-semibold w-40 last:rounded-tr-[12px] border-b-2 border-[#0062AD]">金额 (CNY)</th></tr></thead><tbody className="divide-y divide-gray-100">{module.items.map((item) => (<tr key={item.id} className="hover:bg-[#EFF5FC]/30 transition-colors"><td className="p-0 border-r border-gray-50 align-top"><input className="!border-0 px-5 py-3 focus:ring-0 bg-transparent w-full text-left" value={item.type} onChange={e => handleUpdateCertItem(module.id, item.id, 'type', e.target.value)} /></td><td className="p-0 border-r border-gray-50 align-top"><input className="!border-0 px-5 py-3 focus:ring-0 bg-transparent w-full text-left" value={item.project} onChange={e => handleUpdateCertItem(module.id, item.id, 'project', e.target.value)} /></td><td className="p-0 bg-white/50 cursor-text align-top" onClick={() => setEditingCertId({moduleId: module.id, itemId: item.id})}><div className="flex items-baseline justify-end px-5 py-3 gap-0.5 text-[#0062AD] font-bold font-quote text-[15px] leading-none"><span className="font-bold text-[13px] opacity-60 mr-0.5">¥</span>{editingCertId?.moduleId === module.id && editingCertId?.itemId === item.id ? (<input autoFocus className="!border-0 !p-0 focus:ring-0 bg-transparent text-right font-bold w-24 font-quote" type="number" value={item.amount} onBlur={() => setEditingCertId(null)} onChange={e => handleUpdateCertItem(module.id, item.id, 'amount', parseFloat(e.target.value) || 0)} />) : (<span>{item.amount.toLocaleString()}</span>)}</div></td></tr>))}</tbody><tfoot><tr className="bg-[#FAFAFA] border-t border-[#D1E0FF]"><td colSpan={2} className="px-5 py-5 font-bold text-[#304166] text-left first:rounded-bl-[12px]">认证费用总计（含6%增值税）</td><td className="px-5 py-5 text-right font-bold text-[#0062AD] text-[18px] whitespace-nowrap font-quote flex items-baseline justify-end gap-0.5 last:rounded-br-[12px] leading-none"><span className="text-sm font-bold opacity-60 mr-0.5">¥</span>{module.items.reduce((s, i) => s + (i.amount || 0), 0).toLocaleString()}</td></tr></tfoot></table></div>) : (
              <><div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">{module.services.map((service, idx) => {
                    const color = STEP_COLORS[idx % STEP_COLORS.length]; const displayId = (idx + 1).toString().padStart(2, '0');
                    return (
                      <div key={service.id} draggable="true" onDragStart={(e) => { e.dataTransfer.setData('serviceIdx', idx.toString()); e.dataTransfer.setData('sourceModuleId', module.id); }} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); const sIdx = parseInt(e.dataTransfer.getData('serviceIdx')); const sourceModId = e.dataTransfer.getData('sourceModuleId'); if (sourceModId === module.id && sIdx !== idx) handleReorderTechServices(module.id, sIdx, idx); }} className={`group relative p-4 rounded-[12px] ${color.bg} border-2 transition-all duration-300 overflow-hidden ${service.checked ? 'border-[#BDD1FF]' : 'border-transparent hover:border-[#BDD1FF]/50'}`} style={{ boxShadow: '0 4px 20px rgba(0, 98, 173, 0.05)' }}>
                        <div className={`absolute -right-1 -top-2 text-[3.5rem] font-black italic select-none ${color.num} font-num z-0`}>{displayId}</div>
                        <div className="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-20">
                          <div className="p-1 text-gray-300 cursor-move hover:text-[#0062AD]">
                            <GripVertical className="w-3.5 h-3.5" />
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); handleRemoveTechService(module.id, idx); }} title="删除项目" className="p-1 text-gray-300 hover:text-white hover:bg-red-500 rounded-lg transition-all shadow-sm">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="flex items-start gap-3 relative z-10">
                          <div className="mt-0.5 flex-shrink-0">
                              <input 
                                  type="checkbox" 
                                  checked={service.checked} 
                                  onChange={() => toggleTechService(module.id, service.id)}
                                  className="ui-checkbox" 
                              />
                          </div>
                          <div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1.5"><input className={`!p-0 !border-0 bg-transparent focus:ring-0 text-[14px] font-bold block w-full text-left transition-colors ${service.checked ? 'text-[#304166]' : 'text-[#333333]'}`} value={service.name} onChange={e => updateTechService(module.id, service.id, 'name', e.target.value)} /></div><input className="!p-0 !border-0 bg-transparent focus:ring-0 text-[11px] text-gray-500 text-left siding-relaxed siding-snug block w-full truncate font-normal" value={service.description} onChange={e => updateTechService(module.id, service.id, 'description', e.target.value)} /></div>
                        </div>
                      </div>
                    );
                  })}</div><div className="border border-gray-100 rounded-[12px] overflow-hidden shadow-sm bg-[#FAFAFA]"><div className="flex items-center gap-4 px-5 py-4 text-[13px] font-quote"><div className="flex items-center gap-2 font-normal text-left"><span className="text-gray-600 font-bold shrink-0">指导周期：</span><span className="text-gray-600 shrink-0">不少于（现场+远程）</span><input className="w-16 text-center font-bold text-[#0062AD] !py-1 font-quote !rounded-[8px]" value={module.details.minDays} onChange={e => updateTechModuleDetails(module.id, 'minDays', parseInt(e.target.value) || 0)} /><span className="text-gray-600">人天</span></div><div className="h-4 w-px bg-gray-300 mx-1"></div><div className="flex items-center gap-2 font-normal"><span className="text-gray-600 font-bold">内审员证书:</span><input className="w-16 text-center font-bold text-[#0062AD] !py-1 font-quote !rounded-[8px]" value={module.details.auditCerts} onChange={e => updateTechModuleDetails(module.id, 'auditCerts', parseInt(e.target.value) || 0)} /><span className="text-gray-600">份</span></div></div><div className="border-t border-[#D1E0FF] px-5 py-5 flex items-center justify-between"><span className="font-bold text-[#304166] text-[14px]">技术服务费用总计（含6%增值税）</span><div className="flex items-baseline justify-end text-[#0062AD] font-bold text-[18px] whitespace-nowrap font-quote transition-all min-w-[120px] leading-none"><span className="mr-0.5 font-quote opacity-60 text-sm">¥</span>{editingTechFeeId === module.id ? (<input autoFocus className="!border-0 !p-0 focus:ring-0 bg-transparent text-right font-bold text-[18px] w-28 placeholder:text-blue-200 font-quote" type="number" value={module.fee} onBlur={() => setEditingTechFeeId(null)} onChange={e => updateTechModuleFee(module.id, parseFloat(e.target.value) || 0)} />) : (<span onClick={() => setEditingTechFeeId(module.id)} className="cursor-text text-right font-bold font-quote">{module.fee.toLocaleString()}</span>)}</div></div></div></>
            )}
          </section>
        ))}

        {/* Module 3: Remarks and Notes */}
        <section className="card">
          <div className="flex justify-between items-center mb-6">
            <div className="section-header !mb-0">
              <MessageSquare className="w-5 h-5" />
              <span>报价说明及备注</span>
            </div>
            <div className="flex gap-2">
              <button onClick={resetRemarks} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-gray-100 text-gray-600 px-3 py-1.5 rounded-[12px] hover:bg-gray-50 transition-all"><RotateCcw className="w-3 h-3" /> 重置</button>
              <button onClick={addRemark} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] px-3 py-1.5 rounded-[12px] hover:bg-[#EFF5FC] transition-all"><Plus className="w-3 h-3" /> 添加备注项</button>
              <button onClick={removeLastRemark} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-red-100 text-red-500 px-3 py-1.5 rounded-[12px] hover:bg-red-50 transition-all"><Minus className="w-3 h-3" /> 移除备注项</button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className={`p-4 border border-gray-100 rounded-[12px] bg-gray-50/50 group relative transition-all ${!isNote1Visible ? 'opacity-40 grayscale' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-[#0062AD] font-bold text-xs uppercase tracking-widest"><Info className="w-3.5 h-3.5" /> 备注 1：规模说明</div>
                <button onClick={() => setIsNote1Visible(!isNote1Visible)} className={`p-1 rounded-[8px] transition-colors ${isNote1Visible ? 'text-[#0062AD] hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-200'}`}>{isNote1Visible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-50 line-through" />}</button>
              </div>
              <div className="flex items-center gap-2 flex-wrap text-left justify-start">
                <span className="text-[13px] text-gray-500 whitespace-nowrap">以上按</span>
                <textarea 
                  className="flex-1 min-w-[200px] !py-1 text-left font-normal text-[13px] bg-white rounded-[8px] border-gray-200 resize-none h-auto overflow-hidden" 
                  rows={1}
                  style={{ height: 'auto' }}
                  onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
                  value={data.note1Prefix} 
                  onChange={e => setData({...data, note1Prefix: e.target.value})} 
                />
                <input className="!w-20 !py-1 text-center font-normal text-[13px] text-[#0062AD] bg-white !rounded-[8px]" type="number" value={data.note1Count} onChange={e => setData({...data, note1Count: parseInt(e.target.value) || 0})} />
                <span className="text-[13px] text-gray-500 whitespace-nowrap">人以内规模的基础上报价，本报价单60天有效。</span>
              </div>
            </div>

            <div className={`p-4 border border-gray-100 rounded-[12px] bg-gray-50/50 group relative transition-all ${!isNote2Visible ? 'opacity-40 grayscale' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-[#0062AD] font-bold text-xs uppercase tracking-widest"><CarTaxiFront className="w-3.5 h-3.5" /> 备注 2：食宿差旅</div>
                <button onClick={() => setIsNote2Visible(!isNote2Visible)} className={`p-1 rounded-[8px] transition-colors ${isNote2Visible ? 'text-[#0062AD] hover:bg-blue-50' : 'text-gray-400 hover:bg-gray-200'}`}>{isNote2Visible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-50 line-through" />}</button>
              </div>
              <div className="flex items-center gap-4 mb-3">
                <button onClick={() => setData({...data, travelExpenseOption: 'excluded'})} className={`flex-1 py-2 text-xs font-bold rounded-[8px] border-2 transition-all ${data.travelExpenseOption === 'excluded' ? 'bg-[#0062AD] border-[#0062AD] text-white shadow-md' : 'bg-white border-[#CBD5E1] text-[#64748B] hover:border-[#0062AD]/30'}`}>不包含差旅费</button>
                <button onClick={() => setData({...data, travelExpenseOption: 'included'})} className={`flex-1 py-2 text-xs font-bold rounded-[8px] border-2 transition-all ${data.travelExpenseOption === 'included' ? 'bg-[#0062AD] border-[#0062AD] text-white shadow-md' : 'bg-white border-[#CBD5E1] text-[#64748B] hover:border-[#0062AD]/30'}`}>已包含差旅费</button>
              </div>
              <div className="p-3 bg-white border border-[#EFF5FC] rounded-[8px] text-left">
                <p className="text-[13px] text-gray-600 leading-relaxed font-normal">
                  {getTravelNote(data.travelExpenseOption)}
                </p>
              </div>
            </div>

            <div className={`p-4 border border-gray-100 rounded-[12px] bg-gray-50/50 group relative transition-all ${!isNote3Visible ? 'opacity-40 grayscale' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-widest"><ReceiptText className="w-3.5 h-3.5" /> 备注 3：发票及缴纳</div>
                <button onClick={() => setIsNote3Visible(!isNote3Visible)} className={`p-1 rounded-[8px] transition-colors ${isNote3Visible ? 'text-amber-600 hover:bg-amber-50' : 'text-gray-400 hover:bg-gray-200'}`}>{isNote3Visible ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4 opacity-50 line-through" />}</button>
              </div>
              <textarea 
                className="!bg-white !border border-gray-200 !p-3 text-[13px] font-normal focus:ring-1 focus:ring-amber-500/20 leading-relaxed min-h-[40px] h-auto rounded-[8px] text-left" 
                value={data.note3Text} 
                onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
                onChange={e => setData({...data, note3Text: e.target.value})} 
                placeholder="输入发票及收费说明" 
              />
            </div>

            {data.additionalRemarks.map((remark, index) => (
              <div key={index} className="p-4 border border-gray-100 rounded-[12px] bg-white group relative shadow-sm animate-fade-in text-left">
                <button onClick={() => removeRemark(index)} className="absolute top-2 right-2 p-1 text-gray-300 hover:text-[#EE4932] opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                <div className="flex flex-col gap-2 w-full">
                  <div className="field-label !mb-0 text-[#0062AD] text-left">追加备注 {index + 1}</div>
                  <textarea 
                    className="w-full bg-transparent border-b border-dashed border-gray-200 focus:border-[#0062AD] outline-none p-0.5 text-[13px] font-normal text-gray-700 text-left resize-none" 
                    value={remark} 
                    rows={1}
                    onInput={(e) => { e.currentTarget.style.height = 'auto'; e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px'; }}
                    onChange={e => updateAdditionalRemark(index, e.target.value)} 
                    placeholder="点击输入补充备注内容" 
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Module 4: Contact Info */}
        <section className="card"><div className="section-header"><ImageIcon className="w-5 h-5" /><span>名片及联系信息</span></div><div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4"><div className="space-y-3"><div className="relative" ref={managerSelectRef}><label className="field-label">姓名</label><div className="flex items-center gap-1"><div className="relative flex-1"><input className="!py-1.5 font-normal text-left pr-8 !rounded-[8px]" value={data.contact.name} placeholder="自定义姓名" onChange={e => setData({...data, contact: {...data.contact, name: e.target.value}})} /><button onClick={() => setIsManagerSelectOpen(!isManagerSelectOpen)} className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-[4px] transition-colors"><ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isManagerSelectOpen ? 'rotate-180' : ''}`} /></button></div></div>{isManagerSelectOpen && (<div className="absolute z-30 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-[12px] shadow-2xl overflow-hidden animate-fade-in"><div className="p-2 border-b border-gray-50 bg-gray-50/50"><span className="text-[10px] font-black text-[#0062AD] uppercase tracking-widest pl-2">预设经理人快速选择</span></div>{PREDEFINED_MANAGERS.map((mgr) => (<div key={mgr.name} onClick={() => handleSelectManager(mgr)} className="group flex items-center justify-between px-4 py-3 hover:bg-[#EFF5FC] cursor-pointer transition-colors border-b last:border-0 border-gray-50"><div className="flex items-center gap-3"><div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${data.contact.name === mgr.name ? 'bg-[#0062AD] text-white' : 'bg-gray-100 text-gray-500'}`}>{mgr.name.charAt(0)}</div><div className="flex flex-col"><span className="text-[14px] font-bold text-gray-700">{mgr.name}</span><span className="text-[11px] text-gray-400">{mgr.jobTitle1}</span></div></div>{data.contact.name === mgr.name && <UserCheck className="w-4 h-4 text-[#0062AD]" />}</div>))}</div>)}</div><div><label className="field-label">职位 1</label><input className="!py-1.5 font-normal text-left !rounded-[8px]" value={data.contact.jobTitle1} onChange={e => setData({...data, contact: {...data.contact, jobTitle1: e.target.value}})} /></div><div><label className="field-label">职位 2</label><input className="!py-1.5 font-normal text-left !rounded-[8px]" value={data.contact.jobTitle2} onChange={e => setData({...data, contact: {...data.contact, jobTitle2: e.target.value}})} /></div></div><div className="space-y-3"><div><label className="field-label">电话</label><input className="!py-1.5 font-quote text-left !rounded-[8px]" value={data.contact.phone} onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} /></div><div><label className="field-label">邮箱</label><input className="!py-1.5 font-en text-left !rounded-[8px]" value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} /></div><div><label className="field-label">地址</label><input className="!py-1.5 font-normal text-left !rounded-[8px]" value={data.contact.officeAddress} onChange={e => setData({...data, contact: {...data.contact, officeAddress: e.target.value}})} /></div></div><div className="flex flex-col items-center pl-6 border-l border-gray-100"><label className="field-label self-center mb-2">联系二维码</label><EditableBrandLogo src={data.contact.qrCode} label="" onUpload={(base64) => setData({...data, contact: {...data.contact, qrCode: base64}})} className="w-full" align="center" /><div className="mt-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5"><ImageIcon className="w-3 h-3" /> 上传二维码</div></div></div></section>

        {/* Level 5+: Process and Custom Modules (Direct children for space-y-4) */}
        {processOrder.map(moduleId => extraModulesMap[moduleId as keyof typeof extraModulesMap])}

        {data.modules.filter(m => m.type === 'custom').map((module) => (
          <section key={module.id} className={`card overflow-hidden relative group cursor-default transition-all duration-300 border-2 ${dragOverModuleId === module.id ? 'border-[#0062AD] scale-[1.01]' : 'border-transparent hover:border-[#BDD1FF]'}`} draggable="true" onDragStart={(e) => handleDragStart(e, module.id)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(module.id); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, module.id)}>
            <div className="absolute top-2 left-2 p-1 text-gray-300 opacity-0 group-hover:opacity-100 cursor-move transition-opacity"><GripVertical className="w-4 h-4" /></div><button onClick={() => removeModule(module.id)} title="删除模块" className="absolute top-2 right-2 p-1 text-gray-300 hover:text-white hover:bg-[#EE4932] rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"><Trash2 className="w-4 h-4" /></button>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="section-header !mb-0 flex-1"><Layers className="w-5 h-5 shrink-0" /><input className="!border-0 !p-0 font-bold bg-transparent focus:ring-0 text-[17px] text-[#304166] w-full" value={module.title} onChange={e => updateModuleTitle(module.id, e.target.value)} /></div>
              <div className="flex gap-2">
                <button onClick={() => setData(prev => ({ ...prev, modules: prev.modules.map(m => m.id === module.id && m.type === 'custom' ? { ...m, blocks: [] } : m) }))} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-gray-100 text-gray-600 px-3 py-1.5 rounded-[12px] hover:bg-gray-50 transition-all shadow-sm"><RotateCcw className="w-3.5 h-3.5" /> 重置</button>
                <button onClick={() => { activeCaseBlockIdRef.current = module.id; customModuleExcelInputRef.current?.click(); }} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-emerald-100 text-emerald-600 px-3 py-1.5 rounded-[12px] hover:bg-emerald-50 transition-all shadow-sm"><FileSpreadsheet className="w-3.5 h-3.5" /> 导入 Excel</button>
                <button onClick={() => addBlockToModule(module.id, 'image')} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-amber-100 text-amber-600 px-3 py-1.5 rounded-[12px] hover:bg-amber-50 transition-all shadow-sm"><Images className="w-3.5 h-3.5" /> 添加图片</button>
                <button onClick={() => addBlockToModule(module.id, 'text')} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] px-3 py-1.5 rounded-[12px] hover:bg-[#EFF5FC] transition-all shadow-sm"><Type className="w-3.5 h-3.5" /> 添加文本</button>
                <button onClick={() => addBlockToModule(module.id, 'table')} className="flex items-center gap-1.5 text-[13px] font-bold border-2 border-emerald-100 text-emerald-600 px-3 py-1.5 rounded-[12px] hover:bg-emerald-50 transition-all shadow-sm"><Table2 className="w-3.5 h-3.5" /> 添加表格</button>
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
              <div className="card !p-5 bg-white flex flex-col mb-0 rounded-[16px]">
                <SidebarTitle icon={FileText} title="主要操作" />
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <button onClick={() => setShowPreview(true)} className="flex items-center justify-center gap-2 py-2.5 text-[14px] font-bold border-2 border-[#BDD1FF] text-[#0062AD] rounded-[8px] hover:bg-[#EFF5FC] transition-all shadow-none"><Eye className="w-4 h-4" /> 预览报价单</button>
                  <button disabled={isGeneratingPdf} onClick={handleDownloadPDF} className="flex items-center justify-center gap-2 py-2.5 text-[14px] font-bold border-2 border-green-100 text-[#00b050] rounded-[8px] hover:bg-green-50 transition-all disabled:opacity-50 shadow-none">{isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}{isGeneratingPdf ? '正在导出...' : '下载 PDF'}</button>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-4 pt-4 border-t border-gray-50">
                  <button onClick={addCertModule} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#0062AD] text-white rounded-[8px] hover:bg-[#004d87] transition-all shadow-none group"><Layout className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" /><span className="text-[13px] font-bold text-center">添加管理体系认证报价</span></button>
                  <button onClick={addTechModule} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#EFF6FF] text-[#0062AD] rounded-[8px] hover:bg-blue-100 transition-all shadow-none group"><Settings className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" /><span className="text-[13px] font-bold text-center">添加专业技术服务报价</span></button>
                  <button onClick={addCustomModule} className="flex items-center justify-center gap-2 px-4 py-3 bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0] rounded-[8px] hover:bg-gray-100 transition-all shadow-none group"><Layers className="w-4 h-4 group-hover:scale-110 transition-transform shrink-0" /><span className="text-[13px] font-bold text-center">添加自定义模块</span></button>
                </div>
                <div className="pt-4 border-t border-gray-50">
                  <div className="flex items-center gap-2 text-[#475569] font-bold mb-3">
                    <LayoutGrid className="w-4 h-4 text-[#0062AD]" />
                    <span className="text-[15px]">模块排序管理</span>
                  </div>
                  <div className="space-y-2.5">
                    {data.modules.filter(m => m.type !== 'custom').map((module, index) => {
                      const info = getModuleSortingInfo(module, index);
                      const Icon = info.icon;
                      return (
                        <div key={module.id} draggable="true" onDragStart={(e) => handleDragStart(e, module.id)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(module.id); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, module.id)} className={`relative bg-white border border-[#F1F5F9] min-h-[52px] px-3 rounded-[12px] flex items-center justify-between shadow-none cursor-move transition-all duration-300 group ${dragOverModuleId === module.id ? 'border-[#0062AD] ring-1 ring-[#0062AD]/20 scale-[1.02]' : 'hover:border-[#BDD1FF]'}`}>
                          <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full ${info.bar}`}></div>
                          <div className="flex items-center gap-3 ml-1.5">
                            <div className={`p-1.5 rounded-[6px] ${info.color.split(' ')[2]}`}><Icon className="w-3.5 h-3.5" /></div>
                            <span className="text-[13px] font-semibold text-[#1E293B] truncate max-w-[140px]">{info.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <GripVertical className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition-colors" />
                            <button onClick={() => removeModule(module.id)} title="删除此模块" className="p-1 text-gray-300 hover:text-[#EE4932] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      );
                    })}
                    {processOrder.map(moduleId => {
                      if (moduleId === 'agency-profile' || moduleId === 'business-qualifications') return null;
                      const isVisible = moduleId === 'cert-process' ? isCertProcessVisible : moduleId === 'tech-process' ? isTechProcessVisible : moduleId === 'customer-case' ? isCustomerCaseVisible : moduleId === 'cert-templates' ? isCertTemplatesVisible : false;
                      if (!isVisible) return null;
                      const info = getProcessSortingInfo(moduleId);
                      const Icon = info.icon;
                      return (
                        <div key={moduleId} draggable="true" onDragStart={(e) => handleDragStart(e, moduleId)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(moduleId); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, moduleId)} className={`relative bg-white border border-[#F1F5F9] min-h-[52px] px-3 rounded-[12px] flex items-center justify-between shadow-none cursor-move transition-all duration-300 group ${dragOverModuleId === moduleId ? 'border-[#0062AD] ring-1 ring-[#0062AD]/20 scale-[1.02]' : 'hover:border-[#BDD1FF]'}`}>
                          <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full ${info.bar}`}></div>
                          <div className="flex items-center gap-3 ml-1.5">
                            <div className={`p-1.5 rounded-[6px] ${info.color.split(' ')[2]}`}><Icon className="w-3.5 h-3.5" /></div>
                            <span className="text-[13px] font-semibold text-[#1E293B]">{info.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <GripVertical className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition-colors" />
                            <button onClick={() => { if(moduleId === 'cert-process') setIsCertProcessVisible(false); if(moduleId === 'tech-process') setIsTechProcessVisible(false); if(moduleId === 'customer-case') setIsCustomerCaseVisible(false); if(moduleId === 'cert-templates') setIsCertTemplatesVisible(false); }} title="隐藏此模块" className="p-1 text-gray-300 hover:text-[#EE4932] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      );
                    })}
                    {data.modules.filter(m => m.type === 'custom').map((module, index) => {
                      const info = getModuleSortingInfo(module, index);
                      const Icon = info.icon;
                      return (
                        <div key={module.id} draggable="true" onDragStart={(e) => handleDragStart(e, module.id)} onDragOver={(e) => { e.preventDefault(); setDragOverModuleId(module.id); }} onDragLeave={() => setDragOverModuleId(null)} onDrop={(e) => handleModuleReorder(e, module.id)} className={`relative bg-white border border-[#F1F5F9] min-h-[52px] px-3 rounded-[12px] flex items-center justify-between shadow-none cursor-move transition-all duration-300 group ${dragOverModuleId === module.id ? 'border-[#0062AD] ring-1 ring-[#0062AD]/20 scale-[1.02]' : 'hover:border-[#BDD1FF]'}`}>
                          <div className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-r-full ${info.bar}`}></div>
                          <div className="flex items-center gap-3 ml-1.5">
                            <div className={`p-1.5 rounded-[6px] ${info.color.split(' ')[2]}`}><Icon className="w-3.5 h-3.5" /></div>
                            <span className="text-[13px] font-semibold text-[#1E293B] truncate max-w-[140px]">{info.label}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <GripVertical className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition-colors" />
                            <button onClick={() => removeModule(module.id)} title="删除此模块" className="p-1 text-gray-300 hover:text-[#EE4932] transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-[16px] shadow-[0_4px_20px_rgba(0,98,173,0.05)] flex flex-col overflow-hidden">
                <div className="p-6 pb-2">
                  <div className="text-[15px] font-bold tracking-wider mb-6 text-[#64748B] font-en border-b border-slate-50 pb-3 text-left">Quotation Summary</div>
                  <div className="space-y-6 flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col text-left">
                        <span className="text-[14px] font-[600] text-[#333333]">认证费用总计</span>
                        <span className="text-[12px] text-[#94A3B8] font-en tracking-tight">Certification Fees</span>
                      </div>
                      <div className="text-right flex items-baseline justify-end leading-none pt-0.5 min-w-[120px]">
                        <span className="text-[#0062AD] text-[12px] mr-1 font-en font-bold">¥</span>
                        <span className="text-[18px] font-bold font-quote whitespace-nowrap text-[#0062AD] leading-none">{certTotal.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex flex-col text-left">
                        <span className="text-[14px] font-[600] text-[#333333]">技术服务费用总计</span>
                        <span className="text-[12px] text-[#94A3B8] font-en tracking-tight">Technical Service Fees</span>
                      </div>
                      <div className="text-right flex items-baseline justify-end leading-none pt-0.5 min-w-[120px]">
                        <span className="text-[#0062AD] text-[12px] mr-1 font-en font-bold">¥</span>
                        <span className="text-[18px] font-bold font-quote whitespace-nowrap text-[#0062AD] leading-none">{techTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-6 h-px bg-slate-200 mt-4 opacity-50"></div>
                <div className="bg-white px-[24px] pt-[20px] pb-[24px] flex justify-between items-start gap-4 mt-2 transition-all">
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] text-[#0062AD] font-[700]">总计 (含6%增值税)</span>
                    <span className="text-[12px] text-[#94A3B8] font-en tracking-tight">Grand Total (6% Included)</span>
                  </div>
                  <div className="text-right flex items-baseline justify-end leading-none min-w-[120px]">
                    <span className="text-[#0062AD] text-[16px] mr-1 font-en font-black mt-1">¥</span>
                    <span className="text-[30px] font-black font-quote whitespace-nowrap text-[#0062AD] leading-none">{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className={`card !p-6 border-2 transition-all duration-300 bg-white shadow-[0_4px_20px_rgba(0,98,173,0.05)] mb-0 rounded-[16px] ${isDraggingOverLogos ? 'border-[#0062AD] bg-[#EFF5FC] scale-[1.02]' : 'border-transparent'}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverLogos(true); }} onDragLeave={() => setIsDraggingOverLogos(false)} onDrop={() => setIsDraggingOverLogos(false)}>
                <SidebarTitle icon={ImageIcon} title="常用 LOGO" />
                <div className="grid grid-cols-2 gap-3">
                  {COMMON_LOGOS.map(logo => (
                    <div key={logo.id} draggable onDragStart={(e) => e.dataTransfer.setData('logoUrl', logo.url)} className="p-2 border border-[#F1F5F9] rounded-[12px] bg-white shadow-none cursor-grab active:cursor-grabbing hover:border-[#BDD1FF] transition-all group flex flex-col items-center justify-center text-center overflow-hidden min-h-[85px]">
                      <div className="h-10 w-full flex items-center justify-center mb-1"><img src={logo.url} alt={logo.name} loading="lazy" className="max-h-full max-w-full object-contain pointer-events-none transition-all" /></div>
                      <p className="text-[12px] text-[#94A3B8] font-medium font-zh siding-tight group-hover:text-[#0062AD] transition-colors line-clamp-2">{logo.name}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`card !p-6 border-2 transition-all duration-300 bg-white shadow-[0_4px_20px_rgba(0,98,173,0.05)] mb-0 rounded-[16px] ${isDraggingOverWebsites ? 'border-[#0062AD] bg-[#EFF5FC] scale-[1.02]' : 'border-transparent'}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverWebsites(true); }} onDragLeave={() => setIsDraggingOverWebsites(false)} onDrop={() => setIsDraggingOverWebsites(false)}>
                <SidebarTitle icon={Globe} title="常用网站" />
                <div className="grid grid-cols-2 gap-1">
                  {COMMON_WEBSITES.map(site => ( 
                    <a key={site.id} href={site.url} target="_blank" rel="noopener noreferrer" title={site.name} className="p-3 bg-transparent hover:bg-[#EFF6FF] rounded-[8px] transition-all group flex items-center gap-2">
                      <div className="h-8 w-8 flex items-center justify-center shrink-0"><img src={site.logo} alt={site.name} loading="lazy" className="h-full w-full object-contain rounded-[4px] transition-all" /></div>
                      <p className="text-[12px] text-[#94A3B8] font-medium font-zh truncate w-full group-hover:text-[#0062AD] transition-colors tracking-[0.02em]">{site.name}</p>
                    </a> 
                  ))}
                </div>
              </div>
              <div className={`card !p-6 border-2 transition-all duration-300 bg-white shadow-[0_4px_20px_rgba(0,98,173,0.05)] mb-0 rounded-[16px] ${isDraggingOverSidebarTemplates ? 'border-[#0062AD] bg-[#EFF5FC] scale-[1.02]' : 'border-transparent'}`} onDragOver={(e) => { e.preventDefault(); setIsDraggingOverSidebarTemplates(true); }} onDragLeave={() => setIsDraggingOverSidebarTemplates(false)} onDrop={() => setIsDraggingOverSidebarTemplates(false)}>
                <SidebarTitle icon={LayoutTemplate} title="常用证书模板" />
                <div className="grid grid-cols-4 gap-2">
                  {COMMON_CERT_TEMPLATES.map(tmpl => { const Icon = tmpl.icon; return (<div key={tmpl.id} draggable onDragStart={(e) => e.dataTransfer.setData('templateUrl', tmpl.url)} onClick={() => addCommonTemplate(tmpl.url)} className={`aspect-square p-2 border border-gray-100 rounded-[12px] ${tmpl.bg} shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all group flex flex-col items-center justify-center text-center relative border-transparent hover:border-[#BDD1FF]`} title={`点击添加 ${tmpl.name} 证书`}><Icon className="w-6 h-6 mb-1 transition-transform group-hover:scale-110" style={{ color: tmpl.color }} /><span className="text-[8px] font-black uppercase tracking-tighter leading-none" style={{ color: tmpl.color }}>{tmpl.name}</span><div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"><Plus className="w-3 h-3 text-[#0062AD]" /></div></div>); })}
                </div>
                <p className="mt-4 text-[10px] text-gray-400 font-bold text-center leading-relaxed">点击添加或拖拽至左侧主区域<br/><span className="opacity-50 text-[9px]">图标仅作标识，添加后显示真实证书</span></p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[60] bg-[#304166] text-white px-8 py-3.5 rounded-full shadow-[0_12px_40px_rgba(48,65,102,0.3)] flex items-center gap-3 animate-fade-in border border-white/10 backdrop-blur-md">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center shadow-inner">
            <Check className="w-4 h-4 text-white" strokeWidth={4} />
          </div>
          <span className="text-[14px] font-bold tracking-tight">配置更新成功</span>
        </div>
      )}

      {showPreview && (
        <div className="fixed inset-0 z-50 bg-[#304166cc] backdrop-blur-xl flex items-center justify-center p-2 md:p-4"><div className="bg-white rounded-[24px] w-full flex flex-col shadow-2xl overflow-hidden transition-all duration-500 border border-white/20 max-w-[98vw] h-[98vh] overflow-x-hidden"><div className="p-4 md:p-5 bg-white border-b flex justify-between items-center shadow-sm z-10 shrink-0"><div className="flex items-center gap-4 md:gap-6"><h3 className="font-bold text-[#304166] flex items-center gap-3 text-lg tracking-tight"><Eye className="text-[#0062AD] w-5 h-5" /> 预览报价单</h3><div className="hidden sm:flex items-center bg-[#EFF5FC] px-3 py-1.5 rounded-[12px] text-xs font-bold text-[#0062AD]"><MoveHorizontal className="w-3.5 h-3.5 mr-2" /> 全屏智能展开 (297mm)</div></div><button onClick={() => setShowPreview(false)} className="p-2 hover:bg-red-50 hover:text-[#EE4932] rounded-full transition-all group"><X className="w-6 h-6 group-hover:rotate-90 transition-transform" /></button></div><div ref={previewScrollContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-12 bg-slate-200/40 scroll-smooth flex flex-col items-center"><div className="bg-white shadow-[0_20px_50px_rgba(48,65,102,0.15)] transition-transform duration-300 origin-top" style={{ transform: `scale(${previewScale})`, marginTop: '0' }}><QuoteDocument /></div></div><div className="p-4 md:p-5 bg-white border-t flex flex-col sm:flex-row justify-end items-center gap-4 shrink-0"><p className="flex-1 text-[11px] font-bold text-gray-400 uppercase tracking-widest italic opacity-60 text-center sm:text-left">* 预览已根据您的窗口宽度自动展开，禁止左右滑动以确保最佳阅读体验。</p><div className="flex gap-4 w-full sm:w-auto"><button onClick={() => setShowPreview(false)} className="flex-1 sm:flex-none px-6 py-2.5 text-sm font-bold text-gray-600 hover:bg-gray-100 rounded-[8px]">关闭</button><button disabled={isGeneratingPdf} onClick={handleDownloadPDF} className="flex-1 sm:flex-none px-8 py-2.5 text-sm font-bold bg-[#0062AD] text-white hover:bg-[#304166] rounded-[8px] flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-50">{isGeneratingPdf ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}{isGeneratingPdf ? '正在导出...' : '下载 PDF'}</button></div></div></div></div>
      )}
    </div>
  );
};

export default App;
