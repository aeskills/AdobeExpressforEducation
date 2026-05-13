// translations.js — Complete English/Hindi translation system
const translations = {
  en: {
    // Navigation
    nav_home: 'Home', nav_about: 'About', nav_contact: 'Contact',
    nav_help: 'Need Help?', nav_faq: 'FAQ',
    lang_toggle: 'हिन्दी', lang_label: 'EN',

    // Hero — KGBV
    kgbv_hero_title: 'KGBV Account Recovery',
    kgbv_hero_subtitle: 'Empowering Girls Through Education',
    kgbv_tagline: 'Serving 2,23,800+ Girl Students with Excellence and Care',
    kgbv_feature1: 'Safe & Secure Learning', kgbv_feature2: 'Girl-Centric Education', kgbv_feature3: 'Community Support',
    kgbv_about_title: 'Empowering Girls Through Education',
    kgbv_about_desc: 'Kasturba Gandhi Balika Vidyalayas (KGBVs) are residential schools dedicated to providing quality education to girls from disadvantaged communities across Uttar Pradesh. We focus on holistic development, academic excellence, and building future leaders.',
    kgbv_services_title: 'Our Core Services',
    kgbv_service_edu: 'Quality Education', kgbv_service_edu_desc: 'Comprehensive curriculum tailored for girls\' holistic development.',
    kgbv_service_hostel: 'Safe Boarding', kgbv_service_hostel_desc: 'Secure residential facilities ensuring a safe environment.',
    kgbv_service_recovery: 'Digital Access', kgbv_service_recovery_desc: 'Instant access to online portals and student credentials.',
    kgbv_service_empower: 'Skill Building', kgbv_service_empower_desc: 'Vocational training and life skills for future independence.',
    kgbv_stat_districts: 'Districts Reached',

    // Hero — APS
    aps_hero_title: 'APS UP Account Recovery',
    aps_hero_subtitle: 'Serving with Excellence',
    aps_tagline: 'Building Leaders, Inspiring Excellence Across 4,32,000+ Students',
    aps_feature1: 'Discipline & Excellence', aps_feature2: 'Character Development', aps_feature3: 'All-India Standards',

    // Hero — SamajKalyan
    samajkalyan_hero_title: 'Samaj Kalyan Account Recovery',
    samajkalyan_hero_subtitle: 'Community First',
    samajkalyan_tagline: 'Empowering Communities Through Education for 4,32,000+ Students',
    samajkalyan_feature1: 'Community Care', samajkalyan_feature2: 'Social Responsibility', samajkalyan_feature3: 'Inclusive Development',

    // Form & Recovery (generic)
    page_title: 'Recover Your Account',
    portal_title: 'Account Recovery Portal',
    info_banner: 'Enter your Unique ID to view your credentials',
    unique_id_label: 'Unique ID',
    retrieve_btn: 'Retrieve Credentials',
    sample_ids_title: 'Sample IDs',

    // KGBV-specific
    retrieve_cta: 'Retrieve Your Credentials',
    back_home: 'Back to Home',
    kgbv_retrieve_title: 'Retrieve Your Credentials',
    kgbv_info_banner: 'Select your school and enter your class & roll number to retrieve your credentials',
    select_school_label: 'Step 1: Select Your KGBV School',
    select_school_placeholder: 'Search and select your school...',
    search_school: 'Type to search school name or city...',
    no_schools_found: 'No schools found',
    classroll_label: 'Step 2: Enter Class & Roll Number',
    classroll_format: 'Format: [Class][Section][Roll] — e.g. 6a1, 7b12, 8a5',
    classroll_placeholder: 'E.g. 6a1, 7b12, 8a5',
    select_school_error: 'Please select your KGBV school first',
    enter_classroll_error: 'Please enter your class and roll number',
    invalid_school: 'Invalid school selection',
    student_not_found: 'Student not found. Please check your school, class and roll number.',
    loading_data: 'Loading student data...',
    kgbv_how_title: 'How It Works',
    kgbv_how_desc: 'Select your school → Enter class & roll → Get your credentials instantly',
    kgbv_schools_count: 'KGBV Schools',
    kgbv_schools_available: 'schools across UP',
    kgbv_students_count: 'Total Students',
    kgbv_students_registered: 'students registered',
    kgbv_gallery_title: 'KGBV Glimpses',

    // Samaj Kalyan specific
    sk_retrieve_title: 'Retrieve Your Credentials',
    sk_info_banner: 'Select your Ashram school and enter your class & roll number',
    sk_select_school_label: 'Step 1: Select Your Ashram School',
    sk_select_placeholder: 'Search and select your school...',
    sk_search_school: 'Type school name or city...',
    sk_select_school_error: 'Please select your Ashram school first',
    sk_classroll_format: 'Format: [Class][Section][Roll] — e.g. 6a1, 7b12, 10a5',
    sk_classroll_placeholder: 'E.g. 6a1, 7b12, 10a5',
    sk_invalid_format: 'Invalid format. Use like 6a1, 7b12, 10a5',
    sk_how_title: 'How It Works',
    sk_how_desc: 'Select your school → Enter class & roll → Get your credentials instantly',
    sk_schools_count: 'Ashram Schools',
    sk_schools_available: 'schools across UP',
    sk_students_count: 'Total Students',
    sk_students_registered: 'students registered',
    sk_gallery_title: 'Ashram School Glimpses',
    sk_about_title: 'Education for Social Equality',
    sk_about_desc: 'Samaj Kalyan Ashram Vidyalayas provide inclusive, high-quality residential education aimed at uplifting marginalized communities. We foster an environment of equality, social justice, and excellence to build a stronger society.',
    sk_services_title: 'What We Provide',
    sk_service_edu: 'Inclusive Learning', sk_service_edu_desc: 'Equal educational opportunities for all sections of society.',
    sk_service_community: 'Community Care', sk_service_community_desc: 'Focusing on social welfare and community development.',
    sk_service_recovery: 'Student Portal', sk_service_recovery_desc: 'Seamless retrieval of student IDs and online credentials.',
    sk_service_welfare: 'Holistic Welfare', sk_service_welfare_desc: 'Comprehensive support including boarding and healthcare.',
    sk_stat_inclusive: 'Commitment to Inclusion',

    // Results
    credentials_retrieved: 'Credentials Retrieved',
    student_name: 'Student Name', email_address: 'Email Address', password: 'Password',
    copy: 'Copy', copied: 'Copied',

    // Errors
    enter_uid: 'Please enter a Unique ID',
    invalid_id: 'Invalid ID format or student not found.',
    subtitle_loaded: 'Instantly retrieve credentials for', subtitle_students: 'students',

    // Not Found
    not_found_title: 'Page Not Found',
    not_found_subtitle: 'Please use a valid school link to access this portal.',
    choose_portal: 'Choose a school portal to continue',
    school_aps: 'APS Schools', school_kgbv: 'KGBV Schools', school_samajkalyan: 'Samaj Kalyan',

    // Footer
    footer_powered: 'Powered by', footer_rights: 'All rights reserved',
    footer_privacy: 'Privacy Policy', footer_terms: 'Terms & Conditions', footer_contact: 'Contact Support',

    // School labels
    label_aps: 'Army Public Schools UP',
    label_kgbv: 'Kasturba Gandhi Balika Vidyalaya',
    label_samajkalyan: 'Samaj Kalyan Ashram Schools',
  },

  hi: {
    // Navigation
    nav_home: 'होम', nav_about: 'परिचय', nav_contact: 'संपर्क करें',
    nav_help: 'मदद चाहिए?', nav_faq: 'अक्सर पूछे जाने वाले प्रश्न',
    lang_toggle: 'English', lang_label: 'हिन्दी',

    // Hero — KGBV
    kgbv_hero_title: 'KGBV खाता पुनर्प्राप्ति',
    kgbv_hero_subtitle: 'शिक्षा के माध्यम से लड़कियों को सशक्त बनाना',
    kgbv_tagline: 'उत्कृष्टता और देखभाल के साथ 2,23,800+ छात्राओं की सेवा',
    kgbv_feature1: 'सुरक्षित शिक्षा', kgbv_feature2: 'लड़की-केंद्रित शिक्षा', kgbv_feature3: 'सामुदायिक समर्थन',
    kgbv_about_title: 'शिक्षा के माध्यम से लड़कियों को सशक्त बनाना',
    kgbv_about_desc: 'कस्तूरबा गांधी बालिका विद्यालय (KGBV) उत्तर प्रदेश भर में वंचित समुदायों की लड़कियों को गुणवत्तापूर्ण शिक्षा प्रदान करने के लिए समर्पित आवासीय विद्यालय हैं। हम समग्र विकास, शैक्षणिक उत्कृष्टता और भविष्य की महिलाओं को सशक्त बनाने पर ध्यान केंद्रित करते हैं।',
    kgbv_services_title: 'हमारी मुख्य सेवाएँ',
    kgbv_service_edu: 'गुणवत्तापूर्ण शिक्षा', kgbv_service_edu_desc: 'लड़कियों के समग्र विकास के लिए तैयार व्यापक पाठ्यक्रम।',
    kgbv_service_hostel: 'सुरक्षित छात्रावास', kgbv_service_hostel_desc: 'एक सुरक्षित वातावरण सुनिश्चित करने वाली आवासीय सुविधाएँ।',
    kgbv_service_recovery: 'डिजिटल एक्सेस', kgbv_service_recovery_desc: 'ऑनलाइन पोर्टल और छात्र क्रेडेंशियल तक त्वरित पहुँच।',
    kgbv_service_empower: 'कौशल विकास', kgbv_service_empower_desc: 'भविष्य की स्वतंत्रता के लिए व्यावसायिक प्रशिक्षण और जीवन कौशल।',
    kgbv_stat_districts: 'जिलों तक पहुँच',

    // Hero — APS
    aps_hero_title: 'APS UP खाता पुनर्प्राप्ति',
    aps_hero_subtitle: 'उत्कृष्टता के साथ सेवा',
    aps_tagline: '4,32,000+ छात्रों में नेतृत्व निर्माण, उत्कृष्टता को प्रेरित करना',
    aps_feature1: 'अनुशासन और उत्कृष्टता', aps_feature2: 'चरित्र विकास', aps_feature3: 'भारत-व्यापी मानक',

    // Hero — SamajKalyan
    samajkalyan_hero_title: 'समाज कल्याण खाता पुनर्प्राप्ति',
    samajkalyan_hero_subtitle: 'समुदाय पहले',
    samajkalyan_tagline: '4,32,000+ छात्रों के लिए शिक्षा के माध्यम से समुदायों को सशक्त बनाना',
    samajkalyan_feature1: 'सामुदायिक देखभाल', samajkalyan_feature2: 'सामाजिक जिम्मेदारी', samajkalyan_feature3: 'समावेशी विकास',

    // Form & Recovery (generic)
    page_title: 'अपना खाता पुनः प्राप्त करें',
    portal_title: 'खाता पुनर्प्राप्ति पोर्टल',
    info_banner: 'अपना यूनिक आईडी दर्ज करें',
    unique_id_label: 'यूनिक आईडी',
    retrieve_btn: 'क्रेडेंशियल प्राप्त करें',
    sample_ids_title: 'नमूना आईडी',

    // KGBV-specific
    retrieve_cta: 'अपने क्रेडेंशियल प्राप्त करें',
    back_home: 'होम पर वापस जाएं',
    kgbv_retrieve_title: 'अपने क्रेडेंशियल प्राप्त करें',
    kgbv_info_banner: 'अपने स्कूल का चयन करें और अपनी कक्षा व रोल नंबर दर्ज करें',
    select_school_label: 'चरण 1: अपना KGBV स्कूल चुनें',
    select_school_placeholder: 'अपना स्कूल खोजें और चुनें...',
    search_school: 'स्कूल का नाम या शहर टाइप करें...',
    no_schools_found: 'कोई स्कूल नहीं मिला',
    classroll_label: 'चरण 2: कक्षा और रोल नंबर दर्ज करें',
    classroll_format: 'प्रारूप: [कक्षा][सेक्शन][रोल] — जैसे 6a1, 7b12, 8a5',
    classroll_placeholder: 'जैसे 6a1, 7b12, 8a5',
    select_school_error: 'कृपया पहले अपना KGBV स्कूल चुनें',
    enter_classroll_error: 'कृपया अपनी कक्षा और रोल नंबर दर्ज करें',
    invalid_school: 'अमान्य स्कूल चयन',
    student_not_found: 'छात्र नहीं मिला। कृपया अपना स्कूल, कक्षा और रोल नंबर जांचें।',
    loading_data: 'छात्र डेटा लोड हो रहा है...',
    kgbv_how_title: 'यह कैसे काम करता है',
    kgbv_how_desc: 'अपना स्कूल चुनें → कक्षा और रोल दर्ज करें → तुरंत क्रेडेंशियल पाएं',
    kgbv_schools_count: 'KGBV स्कूल',
    kgbv_schools_available: 'स्कूल यूपी भर में',
    kgbv_students_count: 'कुल छात्राएं',
    kgbv_students_registered: 'छात्राएं पंजीकृत',
    kgbv_gallery_title: 'KGBV की झलकियाँ',

    // Samaj Kalyan specific
    sk_retrieve_title: 'अपने क्रेडेंशियल प्राप्त करें',
    sk_info_banner: 'अपने आश्रम स्कूल का चयन करें और कक्षा व रोल नंबर दर्ज करें',
    sk_select_school_label: 'चरण 1: अपना आश्रम स्कूल चुनें',
    sk_select_placeholder: 'अपना स्कूल खोजें और चुनें...',
    sk_search_school: 'स्कूल का नाम या शहर टाइप करें...',
    sk_select_school_error: 'कृपया पहले अपना आश्रम स्कूल चुनें',
    sk_classroll_format: 'प्रारूप: [कक्षा][सेक्शन][रोल] — जैसे 6a1, 7b12, 10a5',
    sk_classroll_placeholder: 'जैसे 6a1, 7b12, 10a5',
    sk_invalid_format: 'अमान्य प्रारूप। जैसे 6a1, 7b12, 10a5 उपयोग करें',
    sk_how_title: 'यह कैसे काम करता है',
    sk_how_desc: 'अपना स्कूल चुनें → कक्षा और रोल दर्ज करें → तुरंत क्रेडेंशियल पाएं',
    sk_schools_count: 'आश्रम स्कूल',
    sk_schools_available: 'स्कूल यूपी भर में',
    sk_students_count: 'कुल छात्र',
    sk_students_registered: 'छात्र पंजीकृत',
    sk_gallery_title: 'आश्रम स्कूल की झलकियाँ',
    sk_about_title: 'सामाजिक समानता के लिए शिक्षा',
    sk_about_desc: 'समाज कल्याण आश्रम विद्यालय हाशिए पर रहने वाले समुदायों के उत्थान के उद्देश्य से समावेशी, उच्च गुणवत्ता वाली आवासीय शिक्षा प्रदान करते हैं। हम एक मजबूत समाज के निर्माण के लिए समानता, सामाजिक न्याय और उत्कृष्टता के माहौल को बढ़ावा देते हैं।',
    sk_services_title: 'हम क्या प्रदान करते हैं',
    sk_service_edu: 'समावेशी शिक्षा', sk_service_edu_desc: 'समाज के सभी वर्गों के लिए समान शैक्षिक अवसर।',
    sk_service_community: 'सामुदायिक देखभाल', sk_service_community_desc: 'सामाजिक कल्याण और सामुदायिक विकास पर ध्यान केंद्रित करना।',
    sk_service_recovery: 'छात्र पोर्टल', sk_service_recovery_desc: 'छात्र आईडी और ऑनलाइन क्रेडेंशियल की निर्बाध पुनर्प्राप्ति।',
    sk_service_welfare: 'समग्र कल्याण', sk_service_welfare_desc: 'बोर्डिंग और स्वास्थ्य सेवा सहित व्यापक सहायता।',
    sk_stat_inclusive: 'समावेश के प्रति प्रतिबद्धता',

    // Results
    credentials_retrieved: 'क्रेडेंशियल प्राप्त हुए',
    student_name: 'छात्र का नाम', email_address: 'ईमेल पता', password: 'पासवर्ड',
    copy: 'कॉपी', copied: 'कॉपी हुआ',

    // Errors
    enter_uid: 'कृपया यूनिक आईडी दर्ज करें',
    invalid_id: 'अमान्य आईडी या छात्र नहीं मिला।',
    subtitle_loaded: 'तुरंत क्रेडेंशियल प्राप्त करें', subtitle_students: 'छात्रों के लिए',

    // Not Found
    not_found_title: 'पेज नहीं मिला',
    not_found_subtitle: 'इस पोर्टल तक पहुँचने के लिए कृपया एक वैध स्कूल लिंक का उपयोग करें।',
    choose_portal: 'जारी रखने के लिए एक स्कूल पोर्टल चुनें',
    school_aps: 'APS स्कूल', school_kgbv: 'KGBV स्कूल', school_samajkalyan: 'समाज कल्याण',

    // Footer
    footer_powered: 'द्वारा संचालित', footer_rights: 'सर्वाधिकार सुरक्षित',
    footer_privacy: 'गोपनीयता नीति', footer_terms: 'शर्तें और शर्तें', footer_contact: 'समर्थन से संपर्क करें',

    // School labels
    label_aps: 'आर्मी पब्लिक स्कूल यूपी',
    label_kgbv: 'कस्तूरबा गांधी बालिका विद्यालय',
    label_samajkalyan: 'समाज कल्याण आश्रम स्कूल',
  },
};

export default translations;
