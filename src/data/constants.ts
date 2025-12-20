import { ServiceCategory } from '../lib/types';

export const WHATSAPP_NUMBER = "+201XXXXXXXXX"; // رقمك الحقيقي

export const SERVICES_DATA: ServiceCategory[] = [
  {
    category: 'تطوير مواقع الويب',
    items: [
      {
        name: 'موقع تعريفي (Landing / شركة)',
        description:
          'تصميم وتطوير موقع ويب احترافي لعرض نشاطك وخدماتك، مناسب للشركات والأفراد.',
        price: '6,000 – 8,000 EGP',
        image: 'https://picsum.photos/seed/web-basic/400/300',
        tags: ['الأكثر طلباً'],
        timeline: '7 – 10 أيام',
        features: [
          'تصميم متجاوب لجميع الشاشات',
          'أداء عالي وسرعة تحميل ممتازة',
          'تحسين SEO أساسي',
          'استضافة مجانية على Netlify أو Vercel',
          'SSL مجاني',
          'ربط دومين (الدومين غير مشمول)'
        ]
      },
      {
        name: 'موقع ديناميكي (Dashboard / CMS)',
        description:
          'موقع ويب متكامل مع لوحة تحكم لإدارة المحتوى باستخدام React و API.',
        price: '12,000 – 18,000 EGP',
        image: 'https://picsum.photos/seed/web-dynamic/400/300',
        tags: ['احترافي'],
        timeline: '2 – 4 أسابيع',
        features: [
          'لوحة تحكم مخصصة',
          'ربط قواعد بيانات',
          'نظام صلاحيات',
          'استضافة مجانية (Vercel)',
          'إعداد بيئة إنتاج كاملة',
          'توثيق المشروع'
        ]
      },
      {
        name: 'تطبيق ويب مخصص (Web App)',
        description:
          'بناء تطبيق ويب متكامل حسب متطلبات النشاط التجاري.',
        price: '20,000 – 35,000 EGP',
        image: 'https://picsum.photos/seed/web-app/400/300',
        tags: ['مخصص'],
        timeline: '4 – 8 أسابيع',
        features: [
          'واجهة مستخدم مخصصة 100%',
          'بنية احترافية قابلة للتوسع',
          'تكامل API خارجي',
          'استضافة Production مجانية',
          'اختبارات وأداء عالي'
        ]
      }
    ]
  },

  {
    category: 'تطوير تطبيقات الموبايل',
    items: [
      {
        name: 'تطبيق موبايل أساسي',
        description:
          'تطبيق موبايل بسيط لعرض المحتوى أو الخدمات باستخدام Flutter.',
        price: '15,000 – 20,000 EGP',
        image: 'https://picsum.photos/seed/mobile-basic/400/300',
        tags: ['الأكثر طلباً'],
        timeline: '3 – 5 أسابيع',
        features: [
          'Android أو iOS',
          'تصميم عصري',
          'أداء ثابت',
          'تهيئة للنشر',
          'تسليم الكود كامل'
        ]
      },
      {
        name: 'تطبيق موبايل (Android & iOS)',
        description:
          'تطبيق يعمل على أندرويد و iOS من كود واحد باستخدام Flutter أو React Native.',
        price: '22,000 – 30,000 EGP',
        image: 'https://picsum.photos/seed/mobile-cross/400/300',
        tags: ['Cross-Platform'],
        timeline: '4 – 6 أسابيع',
        features: [
          'كود موحد',
          'ربط API',
          'إشعارات',
          'جاهز للنشر',
          'دعم فني بعد التسليم'
        ]
      },
      {
        name: 'تطبيق مخصص متقدم',
        description:
          'حل متكامل لتطبيقات الشركات مع خصائص مخصصة.',
        price: '35,000+ EGP',
        image: 'https://picsum.photos/seed/mobile-advanced/400/300',
        tags: ['احترافي'],
        timeline: '6 – 10 أسابيع',
        features: [
          'تحليل متطلبات كامل',
          'تصميم UI/UX احترافي',
          'تكامل أنظمة خارجية',
          'اختبارات شاملة',
          'دعم ما بعد الإطلاق'
        ]
      }
    ]
  },

  {
    category: 'مزايا مجانية مع كل مشروع',
    items: [
      {
        name: 'استضافة ونشر',
        description:
          'نشر المشروع على منصات موثوقة مع إعداد بيئة الإنتاج.',
        price: 'مجاني',
        image: 'https://picsum.photos/seed/hosting/400/300',
        tags: ['Free'],
        timeline: 'ضمن مدة التنفيذ',
        features: [
          'Netlify أو Vercel',
          'SSL مجاني',
          'إعداد DNS',
          'أفضل ممارسات الأمان'
        ]
      },
      {
        name: 'دعم فني بعد التسليم',
        description:
          'دعم فني لضمان استقرار المشروع بعد الإطلاق.',
        price: 'مجاني (14 يوم)',
        image: 'https://picsum.photos/seed/support/400/300',
        tags: ['Bonus'],
        timeline: 'بعد التسليم',
        features: [
          'إصلاح أخطاء',
          'مساعدة في الإطلاق',
          'إرشادات الاستخدام'
        ]
      }
    ]
  }
];
