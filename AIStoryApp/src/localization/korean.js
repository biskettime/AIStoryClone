/**
 * Korean Localization Strings
 * Complete Korean localization with proper cultural adaptations
 * Formal Korean language appropriate for subscription services
 */

export const KoreanStrings = {
  // VIP Screen
  vip: {
    title: 'VIP',
    header: 'VIP 회원 전용 혜택',
    subtitle: '프리미엄 기능과 VIP 전용 특별 혜택을 모두 마음껏 이용하세요',
    
    // Pricing Plans
    weekly: '주간',
    monthly: '월간', 
    yearly: '연간',
    
    // Pricing Values (Korean Won format)
    weeklyPrice: '₩4,400',
    monthlyPrice: '₩22,000', 
    yearlyPrice: '₩132,000',
    
    // Duration
    weeklyDuration: '7일',
    monthlyDuration: '30일',
    yearlyDuration: '365일',
    
    // Discounts
    weeklySavings: null,
    monthlySavings: '75% 절약',
    yearlySavings: '85% 절약',
    
    // Benefits
    benefits: {
      diamonds: '매일 40개 다이아몬드 자동 지급',
      bonus: '다이아몬드 충전 시 10% 보너스',
      unlimited: '무제한 그룹 채팅',
      models: '고급 AI 모델 무제한 사용',
      memory: '캐릭터당 메모리 슬롯 1→5개',
      inspiration: '무한한 영감과 아이디어',
      characters: '주간 새 캐릭터 생성 10→30개',
      images: '일일 이미지 생성 200→400개', 
      edits: '캐릭터 편집 횟수 3→6회',
      earlyAccess: '신기능 우선 체험'
    },
    
    // Button Text
    subscribe: 'VIP 구독하기',
    subscribeWithPrice: (price, period) => `VIP 구독하기 - ${price}/${period}`,
    processing: '결제 처리 중...',
    completed: '구독이 완료되었습니다!',
    
    // Footer
    termsOfService: '서비스 이용약관',
    privacyPolicy: '개인정보 보호정책',
    restore: '구매 내역 복원하기'
  },
  
  // Ads-Free Screen
  adsFree: {
    title: '광고 제거',
    header: '순수한 채팅 경험',
    subtitle: '어떠한 광고도 없는 진정한 채팅 경험을 마음껏 즐기세요',
    
    // Pricing
    monthlyPrice: '₩2,200',
    yearlyPrice: '₩15,000',
    yearlySavings: '43% 절약',
    
    // Benefits
    benefits: {
      removeAds: '모든 광고 제거',
      smoothExperience: '부드러운 사용자 경험',
      prioritySupport: '우선 고객 지원',
      cleanInterface: '깔끔한 인터페이스'
    },
    
    // Features
    features: {
      speed: '앱 실행 속도 최대 3배 빨라짐',
      interface: '광고 없는 깔끔한 인터페이스',
      data: '모바일 데이터 사용량 절약',
      battery: '배터리 수명 최대 30% 연장'
    },
    
    // Notes
    notes: {
      instant: '구매 후 즉시 활성화됩니다',
      cancellation: '언제든지 구독 취소 가능합니다',
      allDevices: '동일 계정의 모든 기기에서 적용됩니다',
      autoRenewal: '자동 갱신, 갱신 전 24시간 취소 가능'
    },
    
    // Button Text
    subscribe: '광고 제거하기',
    subscribeWithPrice: (price, period) => `광고 제거하기 - ${price}/${period}`
  },
  
  // Help Modal
  help: {
    title: '도움말',
    close: '닫기',
    
    // Tab Titles
    vipTab: 'VIP',
    adsFreeTab: '광고 제거',
    
    // Introduction
    vipIntroTitle: 'VIP 회원 전용 혜택',
    vipIntroText: '프리미엄 기능과 VIP 전용 특별 혜택을 모두 마음껏 이용하세요. VIP 회원님만을 위한 차별화된 서비스를 경험하실 수 있습니다.',
    adsFreeIntroTitle: '순수한 채팅 경험',
    adsFreeIntroText: '어떠한 광고도 없는 진정한 채팅 경험을 마음껏 즐기세요. 깔끔하고 몰입감 있는 인터페이스로 온전히 집중하실 수 있습니다.',
    
    // Section Titles
    vipBenefitsTitle: '주요 혜택 요약',
    adsFreeEffectsTitle: '개선 효과 요약',
    vipGuideTitle: 'VIP 전용 기능 안내',
    adsFreeGuideTitle: '광고 제거 효과 안내',
    faqTitle: '자주 묻는 질문 (FAQ)',
    contactTitle: '추가적인 도움이 필요하신가요?',
    
    // Search
    searchPlaceholder: '궁금한 내용을 검색해보세요...',
    noResults: '검색 결과를 찾을 수 없습니다',
    noResultsText: '다른 키워드로 다시 검색해보시거나, 아래 고객센터로 문의해주시기 바랍니다',
    
    // Contact
    contactText: '더 궁금하신 내용이 있으시거나 문의사항이 있으시면 언제든지 마음편히 연락주시기 바랍니다.',
    contactButton: '고객지원팀에 문의하기'
  },
  
  // Success/Error Messages
  messages: {
    success: {
      subscriptionComplete: '구독이 성공적으로 완료되었습니다!',
      purchaseComplete: '결제가 성공적으로 완료되었습니다',
      restored: '구매 내역이 성공적으로 복원되었습니다',
      cancelled: '구독이 성공적으로 취소되었습니다'
    },
    
    error: {
      paymentFailed: '결제 처리 중 오류가 발생했습니다',
      networkError: '네트워크 연결을 확인해주시기 바랍니다',
      subscriptionFailed: '구독 처리 중 오류가 발생했습니다',
      restoreFailed: '구매 내역 복원에 실패했습니다',
      tryAgain: '잠시 후 다시 시도해주시기 바랍니다'
    },
    
    loading: {
      processing: '처리 중입니다...',
      connecting: '연결 중...',
      purchasing: '결제 처리 중...',
      restoring: '복원 중...'
    }
  },
  
  // Time Periods
  time: {
    daily: '일간',
    weekly: '주간', 
    monthly: '월간',
    yearly: '연간',
    perDay: '일',
    perWeek: '주',
    perMonth: '월',
    perYear: '년'
  },
  
  // Currency Format
  currency: {
    won: '₩',
    formatPrice: (amount) => `₩${amount.toLocaleString('ko-KR')}`,
    formatSavings: (percentage) => `${percentage}% 절약`
  },
  
  // Feature Guides
  guides: {
    vip: {
      memoryTitle: 'AI 메모리 슬롯 확장',
      memoryDescription: 'VIP 회원님은 캐릭터당 최대 5개의 메모리 슬롯을 이용하실 수 있습니다',
      memorySteps: [
        '캐릭터 설정 메뉴로 이동',
        '메모리 관리 탭 선택', 
        '새로운 메모리 슬롯 추가',
        'AI가 대화 내용을 더 오래 기억합니다'
      ],
      memoryAction: '사용법 안내 보기',
      
      diamondsTitle: '매일 다이아몬드 지급',
      diamondsDescription: '매일 자동으로 40개의 다이아몬드를 지급드리며, 충전 시 10% 보너스를 드립니다',
      diamondsSteps: [
        '매일 오전 9시에 자동 지급',
        '다이아몬드 충전 시 추가 10% 지급',
        '모든 프리미엄 기능 무제한 이용',
        '고급 AI 모델 무료 이용 가능'
      ]
    },
    
    adsFree: {
      speedTitle: '빠른 앱 실행 속도',
      speedDescription: '광고 제거로 앱 로딩 속도가 최대 3배 빨라집니다',
      speedSteps: [
        '광고 로딩 대기시간 완전 제거',
        '앱 메모리 사용량 현저히 감소',
        '배터리 수명 최대 30% 연장',
        '모바일 데이터 사용량 절약'
      ],
      
      experienceTitle: '순수한 채팅 경험',
      experienceDescription: '어떠한 광고도 없는 깔끔하고 몰입감 있는 채팅 인터페이스',
      experienceSteps: [
        '모든 배너 및 팝업 광고 완전 제거',
        '대화 중 갑작스러운 광고 차단 없음',
        '채팅 흐름이 끊어지지 않는 몰입감',
        '집중력과 사용자 만족도 현저히 향상'
      ]
    }
  },
  
  // Typography Settings
  typography: {
    // Korean-specific spacing rules
    letterSpacing: {
      normal: 0,
      tight: -0.5,
      wide: 0.5
    },
    
    // Line height for Korean text readability
    lineHeight: {
      compact: 1.3,
      normal: 1.4,
      relaxed: 1.6
    },
    
    // Font weights suitable for Korean characters
    fontWeight: {
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '800'
    }
  }
};

// Utility functions for Korean text formatting
export const KoreanUtils = {
  // Format currency with proper Korean number formatting
  formatCurrency: (amount) => {
    return `₩${amount.toLocaleString('ko-KR')}`;
  },
  
  // Format period with Korean particles
  formatPeriod: (period) => {
    const periodMap = {
      'weekly': '주간',
      'monthly': '월간',
      'yearly': '연간'
    };
    return periodMap[period] || period;
  },
  
  // Format savings percentage
  formatSavings: (percentage) => {
    return `${percentage}% 절약`;
  },
  
  // Add proper Korean spacing for readability
  addKoreanSpacing: (text) => {
    return text
      .replace(/(\d+)([가-힣])/g, '$1 $2') // Add space between numbers and Korean
      .replace(/([가-힣])(\d+)/g, '$1 $2') // Add space between Korean and numbers
      .replace(/([a-zA-Z])([가-힣])/g, '$1 $2') // Add space between English and Korean
      .replace(/([가-힣])([a-zA-Z])/g, '$1 $2'); // Add space between Korean and English
  },
  
  // Validate proper Korean honorific usage
  isPoliteForm: (text) => {
    const politeEndings = ['습니다', '세요', '시기', '하시', '드립니다', '바랍니다'];
    return politeEndings.some(ending => text.includes(ending));
  }
};

export default KoreanStrings;