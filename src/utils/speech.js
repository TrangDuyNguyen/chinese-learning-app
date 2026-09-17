// Audio and Speech Synthesis engine for Mandarin Chinese pronunciation

// 1. High-quality human native audio recordings hosted via fast jsDelivr CDN
// Sourced from davinfifield/mp3-chinese-pinyin-sound (1,632 standard syllables)
const CDN_AUDIO_BASE = 'https://cdn.jsdelivr.net/gh/davinfifield/mp3-chinese-pinyin-sound@master/mp3';

// Accurate mapping for 21 Initials (Thanh mẫu) to standard teaching syllables
const INITIAL_AUDIO_MAP = {
  'b': 'bo1',
  'p': 'po1',
  'm': 'mo1',
  'f': 'fo1',
  'd': 'de1',
  't': 'te4',
  'n': 'ne4',
  'l': 'le4',
  'g': 'ge1',
  'k': 'ke1',
  'h': 'he1',
  'j': 'ji1',
  'q': 'qi1',
  'x': 'xi1',
  'zh': 'zhi1',
  'ch': 'chi1',
  'sh': 'shi1',
  'r': 'ri4',
  'z': 'zi1',
  'c': 'ci1',
  's': 'si1',
  'y': 'yi1',
  'w': 'wu1'
};

// Accurate mapping for 36 Finals (Vận mẫu)
const FINAL_AUDIO_MAP = {
  'a': 'a1',
  'o': 'wo1',
  'e': 'e1',
  'i': 'yi1',
  'u': 'wu1',
  'ü': 'yu1',
  'v': 'yu1',
  'ai': 'ai1',
  'ei': 'ei1',
  'ao': 'ao1',
  'ou': 'ou1',
  'ia': 'ya1',
  'ie': 'ye1',
  'iao': 'yao1',
  'iu': 'you1',
  'iou': 'you1',
  'ua': 'wa1',
  'uo': 'wo1',
  'uai': 'wai1',
  'ui': 'wei1',
  'uei': 'wei1',
  'üe': 'yue1',
  'an': 'an1',
  'en': 'en1',
  'in': 'yin1',
  'un': 'wen1',
  'ün': 'yun1',
  'uan': 'wan1',
  'üan': 'yuan1',
  'uen': 'wen1',
  'ang': 'ang1',
  'eng': 'weng1',
  'ing': 'ying1',
  'ong': 'hong1',
  'iang': 'yang1',
  'iong': 'yong1',
  'uang': 'wang1',
  'ueng': 'weng1'
};

// Accented tone character to [base, toneNumber]
const PINYIN_TONE_MAP = {
  'ā': ['a', 1], 'á': ['a', 2], 'ǎ': ['a', 3], 'à': ['a', 4],
  'ō': ['o', 1], 'ó': ['o', 2], 'ǒ': ['o', 3], 'ò': ['o', 4],
  'ē': ['e', 1], 'é': ['e', 2], 'ě': ['e', 3], 'è': ['e', 4],
  'ī': ['i', 1], 'í': ['i', 2], 'ǐ': ['i', 3], 'ì': ['i', 4],
  'ū': ['u', 1], 'ú': ['u', 2], 'ǔ': ['u', 3], 'ù': ['u', 4],
  'ǖ': ['v', 1], 'ǘ': ['v', 2], 'ǚ': ['v', 3], 'ǜ': ['v', 4]
};

// Hanzi backup mappings for initials & finals when using TTS
const HANZI_FALLBACK_MAP = {
  'b': '玻', 'p': '坡', 'm': '摸', 'f': '佛',
  'd': '得', 't': '特', 'n': '讷', 'l': '勒',
  'g': '哥', 'k': '科', 'h': '喝',
  'j': '鸡', 'q': '七', 'x': '西',
  'zh': '知', 'ch': '吃', 'sh': '诗', 'r': '日',
  'z': '资', 'c': '疵', 's': '思',
  'a': '啊', 'o': '喔', 'e': '鹅', 'i': '衣', 'u': '乌', 'ü': '迂',
  'ai': '哀', 'ei': '诶', 'ao': '熬', 'ou': '欧',
  'ia': '鸭', 'ie': '椰', 'iao': '腰', 'iu': '优',
  'ua': '蛙', 'uo': '窝', 'uai': '歪', 'ui': '微',
  'üe': '约', 'an': '安', 'en': '恩', 'in': '因',
  'ang': '昂', 'eng': '鞥', 'ing': '英', 'ong': '红'
};

// Active Audio element to prevent overlapping audio
let currentAudio = null;

/**
 * Converts a pinyin string (e.g. 'mā', 'b', 'zh', 'nǐ', 'a') to a CDN mp3 filename
 */
export function getPinyinAudioFile(pinyin) {
  if (!pinyin) return null;
  const raw = pinyin.trim().toLowerCase();

  // 1. Check direct Initial map
  if (INITIAL_AUDIO_MAP[raw]) {
    return INITIAL_AUDIO_MAP[raw];
  }

  // 2. Check direct Final map
  if (FINAL_AUDIO_MAP[raw]) {
    return FINAL_AUDIO_MAP[raw];
  }

  // 3. Handle syllable with tone mark (e.g. 'mā', 'má', 'mǎ', 'mà', 'bā', 'nǐ')
  let cleaned = raw;
  let tone = 1;
  let hasTone = false;

  for (const [char, [replacement, t]] of Object.entries(PINYIN_TONE_MAP)) {
    if (cleaned.includes(char)) {
      cleaned = cleaned.replace(new RegExp(char, 'g'), replacement);
      tone = t;
      hasTone = true;
      break;
    }
  }

  // Common special spellings: ü -> u/v
  if (cleaned.startsWith('v')) cleaned = 'yu' + cleaned.slice(1);
  if (cleaned === 'i') cleaned = 'yi';
  if (cleaned === 'u') cleaned = 'wu';

  return `${cleaned}${hasTone ? tone : 1}`;
}

/**
 * Plays standard native human audio for a pinyin initial, final, or syllable
 * Returns a Promise that resolves when playback starts or fails
 */
export function playPinyinAudio(pinyin, fallbackHanzi = null) {
  const filename = getPinyinAudioFile(pinyin);

  if (filename && typeof Audio !== 'undefined') {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audioUrl = `${CDN_AUDIO_BASE}/${filename}.mp3`;
    const audio = new Audio(audioUrl);
    currentAudio = audio;

    return audio.play().catch((err) => {
      console.warn(`Could not play MP3 for "${pinyin}" (${audioUrl}), falling back to Web Speech:`, err);
      speakChinese(fallbackHanzi || pinyin);
    });
  }

  // Fallback to TTS
  speakChinese(fallbackHanzi || pinyin);
  return Promise.resolve();
}

/**
 * Extracts ONLY Chinese Hanzi characters from a string
 * e.g. "爸爸 (bàba - bố)" -> "爸爸"
 * e.g. "ní hǎo (你好)" -> "你好"
 * e.g. "yí dìng (一定)" -> "一定"
 */
export function extractChineseText(input) {
  if (!input) return '';
  // Check if string contains Chinese characters
  const hanziMatches = input.match(/[\u4e00-\u9fa5]+/g);
  if (hanziMatches && hanziMatches.length > 0) {
    return hanziMatches.join('');
  }
  return input.trim();
}

// Cached voices for Web Speech API
let cachedVoices = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  cachedVoices = window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    cachedVoices = window.speechSynthesis.getVoices();
  };
}

/**
 * Text-to-Speech specifically tuned for Mandarin Chinese (zh-CN)
 * Intelligently extracts Chinese characters and selects the best native Mandarin voice
 */
export function speakChinese(text, rate = 0.85) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Stop any currently playing audio file
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Cancel any ongoing TTS
  window.speechSynthesis.cancel();

  // If text is a raw pinyin initial or final, map to representative Hanzi
  const trimmed = text ? text.trim() : '';
  let speechText = trimmed;

  if (HANZI_FALLBACK_MAP[trimmed]) {
    speechText = HANZI_FALLBACK_MAP[trimmed];
  } else {
    // Extract actual Chinese characters if present (e.g. from "爸爸 (bàba)")
    const extracted = extractChineseText(trimmed);
    if (extracted) {
      speechText = extracted;
    }
  }

  if (!speechText) return;

  const utterance = new SpeechSynthesisUtterance(speechText);
  utterance.lang = 'zh-CN';
  utterance.rate = rate; // slightly slower for language learners
  utterance.pitch = 1.0;

  if (cachedVoices.length === 0) {
    cachedVoices = window.speechSynthesis.getVoices();
  }

  // Priority search for highest quality Mandarin Chinese voices
  const zhVoice = cachedVoices.find(voice => 
    voice.lang === 'zh-CN' || 
    voice.lang === 'cmn-Hans-CN' || 
    voice.lang === 'zh_CN' ||
    voice.name.includes('Ting-Ting') || 
    voice.name.includes('Sin-Ji') || 
    voice.name.includes('Xiaoxiao') || 
    voice.name.includes('Yunxi') ||
    voice.name.includes('Chinese')
  );

  if (zhVoice) {
    utterance.voice = zhVoice;
  }

  window.speechSynthesis.speak(utterance);
}

/**
 * Universal sound player:
 * - If given a Pinyin sound (e.g. 'b', 'p', 'mā', 'zh'): plays authentic MP3 audio
 * - If given a Chinese word/sentence (e.g. '你好', '谢谢', '蛋糕被弟弟吃掉了'): speaks using native Mandarin TTS
 */
export function playSound(text, optionalPinyin = null) {
  if (!text && !optionalPinyin) return;

  // 1. If explicit pinyin is provided or text is pure Latin pinyin
  const pinyinCandidate = optionalPinyin || (text && !/[\u4e00-\u9fa5]/.test(text) ? text : null);
  
  if (pinyinCandidate) {
    const raw = pinyinCandidate.trim().toLowerCase();
    if (INITIAL_AUDIO_MAP[raw] || FINAL_AUDIO_MAP[raw] || /[āáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜ]/.test(raw)) {
      return playPinyinAudio(pinyinCandidate, extractChineseText(text));
    }
  }

  // 2. Otherwise, speak Chinese characters via TTS
  speakChinese(text);
}
