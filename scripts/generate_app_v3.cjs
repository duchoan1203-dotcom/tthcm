const fs = require('fs');

// Read questions
const questions = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));
console.log('Building v3 index.html with', questions.length, 'questions and dynamic themes...');

const chapterNames = {
  1: "Khái niệm, đối tượng, phương pháp nghiên cứu và ý nghĩa của môn học",
  2: "Cơ sở, quá trình hình thành và phát triển tư tưởng Hồ Chí Minh",
  3: "Tư tưởng Hồ Chí Minh về độc lập dân tộc và chủ nghĩa xã hội",
  4: "Tư tưởng Hồ Chí Minh về Đảng Cộng sản Việt Nam và Nhà nước của nhân dân, do nhân dân, vì nhân dân",
  5: "Tư tưởng Hồ Chí Minh về đại đoàn kết dân tộc và đoàn kết quốc tế",
  6: "Tư tưởng Hồ Chí Minh về văn hóa, đạo đức, con người"
};

const htmlContent = `<!DOCTYPE html>
<html lang="vi" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Ôn Thi Tư Tưởng Hồ Chí Minh - Trắc Nghiệm 475 Câu</title>
  <meta name="description" content="Website ôn tập và kiểm tra trắc nghiệm môn Tư tưởng Hồ Chí Minh với 475 câu hỏi trắc nghiệm chia theo 6 chương, phân trang 10 câu/trang, gắn cờ câu do dự, đa dạng hình nền dịu êm và tải ảnh tùy chọn." />
  <meta property="og:title" content="Ôn Thi Tư Tưởng Hồ Chí Minh - Trắc Nghiệm 475 Câu" />
  <meta property="og:description" content="Website ôn tập và kiểm tra trắc nghiệm môn Tư tưởng Hồ Chí Minh với 475 câu hỏi, nhiều theme êm dịu và tải ảnh nền." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />

  <style>
    /* ============================================================ */
    /* THEME SYSTEM & VARIABLES                                     */
    /* ============================================================ */
    :root {
      --bg-page: #f8fafc;
      --bg-card: rgba(255, 255, 255, 0.95);
      --bg-card-hover: rgba(255, 255, 255, 1);
      --bg-subtle: #f1f5f9;
      --bg-elevated: #ffffff;
      --border-color: #e2e8f0;
      --border-focus: #be123c;
      --text-main: #0f172a;
      --text-muted: #64748b;
      --text-light: #94a3b8;
      --primary: #be123c;
      --primary-hover: #9f1239;
      --primary-light: #ffe4e6;
      --primary-text: #ffffff;
      --accent: #b91c1c;
      --success: #059669;
      --success-light: #ecfdf5;
      --success-border: #a7f3d0;
      --danger: #dc2626;
      --danger-light: #fef2f2;
      --danger-border: #fecaca;
      --warning: #d97706;
      --warning-light: #fffbeb;
      --warning-border: #fde68a;
      --info: #0284c7;
      --info-light: #f0f9ff;
      --flag-bg: #fffbeb;
      --flag-border: #f59e0b;
      --flag-text: #b45309;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 20px;
      --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.03);
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.09), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    /* THEME: DARK */
    [data-theme="dark"] {
      --bg-page: #0b0f19;
      --bg-card: rgba(21, 30, 46, 0.92);
      --bg-card-hover: rgba(28, 39, 60, 0.96);
      --bg-subtle: #1e293b;
      --bg-elevated: #243046;
      --border-color: #2e3a50;
      --border-focus: #f43f5e;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-light: #64748b;
      --primary: #f43f5e;
      --primary-hover: #e11d48;
      --primary-light: rgba(244, 63, 94, 0.18);
      --primary-text: #ffffff;
      --accent: #fb7185;
      --success: #10b981;
      --success-light: rgba(16, 185, 129, 0.18);
      --success-border: #065f46;
      --danger: #f87171;
      --danger-light: rgba(239, 68, 68, 0.18);
      --danger-border: #991b1b;
      --warning: #fbbf24;
      --warning-light: rgba(245, 158, 11, 0.18);
      --warning-border: #92400e;
      --info: #38bdf8;
      --info-light: rgba(56, 189, 248, 0.18);
      --flag-bg: rgba(245, 158, 11, 0.18);
      --flag-border: #f59e0b;
      --flag-text: #fcd34d;
    }

    /* THEME: SAKURA (Hoa Anh Đào) */
    [data-theme="sakura"] {
      --bg-page: #fff5f7;
      --bg-card: rgba(255, 255, 255, 0.92);
      --bg-card-hover: rgba(255, 255, 255, 0.98);
      --bg-subtle: #ffe8ee;
      --bg-elevated: #ffffff;
      --border-color: #fbcfe8;
      --border-focus: #e11d48;
      --text-main: #4a1d2e;
      --text-muted: #834b62;
      --text-light: #b38297;
      --primary: #e11d48;
      --primary-hover: #be123c;
      --primary-light: #ffe4e6;
      --primary-text: #ffffff;
      --accent: #db2777;
      --success: #059669;
      --success-light: #ecfdf5;
      --success-border: #a7f3d0;
      --danger: #e11d48;
      --danger-light: #ffe4e6;
      --danger-border: #fecdd3;
      --warning: #d97706;
      --warning-light: #fffbeb;
      --warning-border: #fde68a;
      --info: #0284c7;
      --info-light: #f0f9ff;
      --flag-bg: #fffbeb;
      --flag-border: #f59e0b;
      --flag-text: #b45309;
    }

    /* THEME: RAIN (Mưa Êm Đềm) */
    [data-theme="rain"] {
      --bg-page: #0f172a;
      --bg-card: rgba(26, 37, 56, 0.9);
      --bg-card-hover: rgba(33, 47, 72, 0.95);
      --bg-subtle: #24344d;
      --bg-elevated: #2d4160;
      --border-color: #3b506f;
      --border-focus: #38bdf8;
      --text-main: #f1f5f9;
      --text-muted: #94a3b8;
      --text-light: #64748b;
      --primary: #38bdf8;
      --primary-hover: #0ea5e9;
      --primary-light: rgba(56, 189, 248, 0.18);
      --primary-text: #0f172a;
      --accent: #7dd3fc;
      --success: #34d399;
      --success-light: rgba(52, 211, 153, 0.15);
      --success-border: #065f46;
      --danger: #f87171;
      --danger-light: rgba(239, 68, 68, 0.18);
      --danger-border: #991b1b;
      --warning: #fbbf24;
      --warning-light: rgba(245, 158, 11, 0.18);
      --warning-border: #92400e;
      --info: #38bdf8;
      --info-light: rgba(56, 189, 248, 0.18);
      --flag-bg: rgba(245, 158, 11, 0.18);
      --flag-border: #f59e0b;
      --flag-text: #fcd34d;
    }

    /* THEME: WINTER (Mùa Đông Tuyết Rơi) */
    [data-theme="winter"] {
      --bg-page: #f0f9ff;
      --bg-card: rgba(255, 255, 255, 0.92);
      --bg-card-hover: rgba(255, 255, 255, 0.98);
      --bg-subtle: #e0f2fe;
      --bg-elevated: #ffffff;
      --border-color: #bae6fd;
      --border-focus: #0284c7;
      --text-main: #0c4a6e;
      --text-muted: #38769c;
      --text-light: #709fb9;
      --primary: #0284c7;
      --primary-hover: #0369a1;
      --primary-light: #e0f2fe;
      --primary-text: #ffffff;
      --accent: #0ea5e9;
      --success: #059669;
      --success-light: #ecfdf5;
      --success-border: #a7f3d0;
      --danger: #dc2626;
      --danger-light: #fef2f2;
      --danger-border: #fecaca;
      --warning: #d97706;
      --warning-light: #fffbeb;
      --warning-border: #fde68a;
      --info: #0284c7;
      --info-light: #f0f9ff;
      --flag-bg: #fffbeb;
      --flag-border: #f59e0b;
      --flag-text: #b45309;
    }

    /* THEME: CHRISTMAS (Giáng Sinh Ấm Áp) */
    [data-theme="christmas"] {
      --bg-page: #04291f;
      --bg-card: rgba(10, 48, 38, 0.92);
      --bg-card-hover: rgba(15, 62, 50, 0.96);
      --bg-subtle: #145041;
      --bg-elevated: #1a614f;
      --border-color: #247560;
      --border-focus: #ef4444;
      --text-main: #fefce8;
      --text-muted: #a7f3d0;
      --text-light: #6ee7b7;
      --primary: #ef4444;
      --primary-hover: #dc2626;
      --primary-light: rgba(239, 68, 68, 0.22);
      --primary-text: #ffffff;
      --accent: #f59e0b;
      --success: #10b981;
      --success-light: rgba(16, 185, 129, 0.2);
      --success-border: #065f46;
      --danger: #f87171;
      --danger-light: rgba(239, 68, 68, 0.2);
      --danger-border: #991b1b;
      --warning: #fbbf24;
      --warning-light: rgba(245, 158, 11, 0.22);
      --warning-border: #b45309;
      --info: #38bdf8;
      --info-light: rgba(56, 189, 248, 0.2);
      --flag-bg: rgba(245, 158, 11, 0.22);
      --flag-border: #f59e0b;
      --flag-text: #fde047;
    }

    /* THEME: VINTAGE (Trang Sách Cũ) */
    [data-theme="vintage"] {
      --bg-page: #fcf8ee;
      --bg-card: rgba(255, 253, 247, 0.94);
      --bg-card-hover: rgba(255, 255, 255, 1);
      --bg-subtle: #f5eedb;
      --bg-elevated: #fffcf5;
      --border-color: #e6dac1;
      --border-focus: #9a3412;
      --text-main: #3d2c1d;
      --text-muted: #786350;
      --text-light: #a89481;
      --primary: #9a3412;
      --primary-hover: #7c2d12;
      --primary-light: #ffedd5;
      --primary-text: #ffffff;
      --accent: #c2410c;
      --success: #15803d;
      --success-light: #f0fdf4;
      --success-border: #bbf7d0;
      --danger: #b91c1c;
      --danger-light: #fef2f2;
      --danger-border: #fecaca;
      --warning: #b45309;
      --warning-light: #fffbeb;
      --warning-border: #fde68a;
      --info: #0369a1;
      --info-light: #f0f9ff;
      --flag-bg: #fffbeb;
      --flag-border: #d97706;
      --flag-text: #92400e;
    }

    /* THEME: CUSTOM (Ảnh Nền Tự Tải) */
    [data-theme="custom"] {
      --bg-page: transparent;
      --bg-card: rgba(255, 255, 255, 0.92);
      --bg-card-hover: rgba(255, 255, 255, 0.98);
      --bg-subtle: rgba(241, 245, 249, 0.88);
      --bg-elevated: #ffffff;
      --border-color: rgba(226, 232, 240, 0.85);
      --border-focus: #be123c;
      --text-main: #0f172a;
      --text-muted: #475569;
      --text-light: #64748b;
      --primary: #be123c;
      --primary-hover: #9f1239;
      --primary-light: #ffe4e6;
      --primary-text: #ffffff;
      --accent: #b91c1c;
      --success: #059669;
      --success-light: #ecfdf5;
      --success-border: #a7f3d0;
      --danger: #dc2626;
      --danger-light: #fef2f2;
      --danger-border: #fecaca;
      --warning: #d97706;
      --warning-light: #fffbeb;
      --warning-border: #fde68a;
      --info: #0284c7;
      --info-light: #f0f9ff;
      --flag-bg: #fffbeb;
      --flag-border: #f59e0b;
      --flag-text: #b45309;
    }

    [data-theme="custom"][data-custom-tone="dark"] {
      --bg-card: rgba(17, 24, 39, 0.9);
      --bg-card-hover: rgba(25, 34, 53, 0.95);
      --bg-subtle: rgba(31, 41, 55, 0.88);
      --bg-elevated: #1f2937;
      --border-color: rgba(75, 85, 99, 0.55);
      --border-focus: #f43f5e;
      --text-main: #f9fafb;
      --text-muted: #9ca3af;
      --text-light: #6b7280;
      --primary: #f43f5e;
      --primary-hover: #e11d48;
      --primary-light: rgba(244, 63, 94, 0.2);
      --primary-text: #ffffff;
    }

    /* Ambient Background Layers */
    .theme-bg-layer {
      position: fixed;
      inset: 0;
      z-index: -3;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      transition: background 0.4s ease, filter 0.3s ease;
      pointer-events: none;
    }

    .theme-overlay-layer {
      position: fixed;
      inset: 0;
      z-index: -2;
      pointer-events: none;
      transition: background-color 0.3s ease;
    }

    .theme-particles-layer {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      overflow: hidden;
    }

    /* Particle Animations */
    .particle-sakura {
      position: absolute;
      top: -30px;
      width: 14px;
      height: 14px;
      background: radial-gradient(circle, #fbcfe8 20%, #f472b6 100%);
      border-radius: 14px 1px 14px 1px;
      opacity: 0.8;
      animation: sakuraFall linear infinite;
    }

    @keyframes sakuraFall {
      0% { transform: translate3d(0, -20px, 0) rotate(0deg); opacity: 0; }
      10% { opacity: 0.85; }
      90% { opacity: 0.85; }
      100% { transform: translate3d(90px, 105vh, 0) rotate(360deg); opacity: 0; }
    }

    .particle-rain {
      position: absolute;
      top: -40px;
      width: 1.5px;
      height: 26px;
      background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(56, 189, 248, 0.75));
      opacity: 0.65;
      animation: rainFall linear infinite;
    }

    @keyframes rainFall {
      0% { transform: translate3d(0, -30px, 0); opacity: 0; }
      15% { opacity: 0.65; }
      85% { opacity: 0.65; }
      100% { transform: translate3d(-35px, 105vh, 0); opacity: 0; }
    }

    .particle-snow {
      position: absolute;
      top: -25px;
      color: #7dd3fc;
      font-size: 14px;
      line-height: 1;
      opacity: 0.85;
      animation: snowFall linear infinite;
      user-select: none;
    }

    @keyframes snowFall {
      0% { transform: translate3d(0, -20px, 0) rotate(0deg); opacity: 0; }
      15% { opacity: 0.85; }
      85% { opacity: 0.85; }
      100% { transform: translate3d(60px, 105vh, 0) rotate(220deg); opacity: 0; }
    }

    .particle-sparkle {
      position: absolute;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #fde047;
      box-shadow: 0 0 8px #facc15;
      animation: sparkleTwinkle ease-in-out infinite alternate;
    }

    @keyframes sparkleTwinkle {
      0% { opacity: 0.2; transform: scale(0.8); }
      100% { opacity: 0.9; transform: scale(1.3); }
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-sans);
      color: var(--text-main);
      line-height: 1.6;
      font-size: 16px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: color 0.25s ease;
      -webkit-font-smoothing: antialiased;
    }

    /* Layout Container */
    .app-container {
      width: 100%;
      max-width: 1080px;
      margin: 0 auto;
      padding: 16px 20px 48px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Top Navigation Bar */
    .top-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0 16px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      user-select: none;
    }

    .brand-icon {
      width: 44px;
      height: 44px;
      background: linear-gradient(135deg, var(--primary), #e11d48);
      color: white;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      font-weight: 800;
      box-shadow: 0 4px 10px rgba(190, 18, 60, 0.25);
      flex-shrink: 0;
    }

    .brand-text h1 {
      font-size: 19px;
      font-weight: 800;
      line-height: 1.2;
      color: var(--text-main);
      letter-spacing: -0.02em;
    }

    .brand-text p {
      font-size: 12.5px;
      color: var(--text-muted);
      font-weight: 500;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-icon {
      background: var(--bg-card);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      padding: 8px 14px;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: var(--shadow-sm);
    }

    .btn-icon:hover {
      background: var(--bg-card-hover);
      border-color: var(--border-focus);
      transform: translateY(-1px);
    }

    /* Nightmare Mode Styling */
    .nightmare-banner {
      background: linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(185, 28, 28, 0.25));
      border: 1px solid rgba(239, 68, 68, 0.4);
      border-radius: var(--radius-lg);
      padding: 18px 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .nightmare-streak-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(239, 68, 68, 0.18);
      border: 1px solid rgba(239, 68, 68, 0.5);
      padding: 6px 14px;
      border-radius: 999px;
      font-weight: 800;
      color: #ef4444;
      font-size: 14px;
    }

    .nightmare-chapter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-top: 14px;
    }

    .nightmare-chapter-card {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 10px;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .nightmare-chapter-card:hover {
      border-color: #ef4444;
      box-shadow: 0 6px 20px rgba(239, 68, 68, 0.25);
      transform: translateY(-2px);
    }

    .nightmare-chapter-card.selected {
      border-color: #ef4444;
      background: rgba(239, 68, 68, 0.08);
      box-shadow: 0 0 0 2px #ef4444;
    }

    /* Main Menu Grid */
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 28px;
    }

    .menu-card {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 26px 22px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
      overflow: hidden;
    }

    .menu-card:hover {
      border-color: var(--primary);
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
      background: var(--bg-card-hover);
    }

    .menu-card-icon {
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      margin-bottom: 4px;
    }

    .menu-card h2 {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .menu-card p {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .menu-card .badge {
      font-size: 12px;
      padding: 4px 10px;
      border-radius: 999px;
      font-weight: 700;
    }

    /* Common Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 18px;
      font-size: 15px;
      font-weight: 600;
      border-radius: var(--radius-md);
      cursor: pointer;
      border: 1px solid transparent;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      text-decoration: none;
      user-select: none;
      line-height: 1.3;
    }

    .btn:active {
      transform: scale(0.98);
    }

    .btn:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      transform: none !important;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--primary-text);
      box-shadow: 0 2px 6px rgba(190, 18, 60, 0.25);
    }

    .btn-primary:hover:not(:disabled) {
      background: var(--primary-hover);
      box-shadow: 0 4px 12px rgba(190, 18, 60, 0.35);
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: var(--bg-subtle);
      color: var(--text-main);
      border-color: var(--border-color);
    }

    .btn-secondary:hover:not(:disabled) {
      background: var(--border-color);
      transform: translateY(-1px);
    }

    .btn-outline {
      background: transparent;
      color: var(--text-main);
      border-color: var(--border-color);
    }

    .btn-outline:hover:not(:disabled) {
      background: var(--bg-subtle);
      border-color: var(--text-main);
      transform: translateY(-1px);
    }

    .btn-sm {
      padding: 7px 13px;
      font-size: 13.5px;
      border-radius: var(--radius-sm);
    }

    .btn-lg {
      padding: 13px 26px;
      font-size: 16px;
      font-weight: 700;
      border-radius: var(--radius-lg);
    }

    /* Views Framework */
    .view-section {
      display: none;
      flex-direction: column;
      gap: 20px;
      animation: fadeIn 0.25s ease-out;
    }

    .view-section.active {
      display: flex;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .view-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 6px;
    }

    .view-title-group h2 {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
      letter-spacing: -0.01em;
    }

    .view-title-group p {
      font-size: 13.5px;
      color: var(--text-muted);
    }

    /* Chapter Cards in Practice View */
    .chapters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .chapter-card {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      box-shadow: var(--shadow-sm);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .chapter-card:hover {
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }

    .chapter-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
    }

    .chapter-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.4;
    }

    .chapter-tag {
      background: var(--primary-light);
      color: var(--primary);
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 999px;
      white-space: nowrap;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .progress-bar-track {
      background: var(--bg-subtle);
      border-radius: 999px;
      height: 8px;
      width: 100%;
      overflow: hidden;
    }

    .progress-bar-fill {
      background: linear-gradient(90deg, var(--primary), #e11d48);
      height: 100%;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .chapter-stats-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12.5px;
      color: var(--text-muted);
    }

    /* Big Action Buttons Row */
    .big-actions-row {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 16px;
      margin-bottom: 12px;
    }

    .btn-big-action {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      cursor: pointer;
      box-shadow: var(--shadow-sm);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      text-align: left;
    }

    .btn-big-action:hover {
      border-color: var(--primary);
      background: var(--bg-card-hover);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .btn-big-action .action-icon {
      font-size: 28px;
      width: 48px;
      height: 48px;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--bg-subtle);
      flex-shrink: 0;
    }

    .btn-big-action h3 {
      font-size: 16px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 2px;
    }

    .btn-big-action p {
      font-size: 12px;
      color: var(--text-muted);
    }

    /* Modal Framework */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(15, 23, 42, 0.65);
      backdrop-filter: blur(4px);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 16px;
    }

    .modal-overlay.active {
      display: flex;
    }

    .modal-card {
      background: var(--bg-card);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      width: 100%;
      max-width: 560px;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: var(--shadow-xl);
      display: flex;
      flex-direction: column;
      animation: modalPop 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-header {
      padding: 20px 24px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
    }

    .modal-body {
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      overflow-y: auto;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      background: var(--bg-subtle);
    }

    /* Toggle Switch */
    .toggle-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 14px;
      padding: 12px 14px;
      border-radius: var(--radius-md);
      background: var(--bg-subtle);
    }

    .toggle-info h4 {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 2px;
    }

    .toggle-info p {
      font-size: 12px;
      color: var(--text-muted);
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 48px;
      height: 26px;
      flex-shrink: 0;
    }

    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }

    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: var(--border-color);
      transition: .25s;
      border-radius: 34px;
    }

    .slider:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .25s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    input:checked + .slider {
      background-color: var(--primary);
    }

    input:checked + .slider:before {
      transform: translateX(22px);
    }

    /* Quiz Card (Used in Single-Question Practice) */
    .quiz-card {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px 28px;
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .quiz-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
    }

    .quiz-chapter-pill {
      font-size: 12px;
      font-weight: 700;
      color: var(--primary);
      background: var(--primary-light);
      padding: 4px 10px;
      border-radius: 999px;
    }

    .question-text {
      font-size: 17.5px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.55;
    }

    .options-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .option-btn {
      background: var(--bg-card);
      border: 1.5px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 14px 18px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      cursor: pointer;
      text-align: left;
      font-size: 15px;
      color: var(--text-main);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .option-btn:hover:not(:disabled) {
      border-color: var(--text-muted);
      background: var(--bg-subtle);
      transform: translateY(-1px);
    }

    .option-letter {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--bg-subtle);
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 13px;
      flex-shrink: 0;
      transition: all 0.2s;
    }

    .option-key-badge {
      font-size: 11px;
      font-weight: 700;
      color: var(--text-muted);
      background: var(--bg-subtle);
      border: 1px solid var(--border-color);
      border-radius: 4px;
      padding: 1px 6px;
      line-height: 1.4;
      margin-right: 4px;
      font-family: inherit;
      transition: all 0.2s ease;
      flex-shrink: 0;
    }

    .option-btn:hover .option-key-badge,
    .option-btn.selected .option-key-badge {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--bg-card);
    }

    .option-text {
      flex: 1;
      line-height: 1.5;
      font-weight: 500;
    }

    /* Option States in Practice Mode */
    .option-btn.selected {
      border-color: var(--primary);
      background: var(--primary-light);
    }

    .option-btn.selected .option-letter {
      background: var(--primary);
      color: white;
    }

    .option-btn.correct {
      border-color: var(--success);
      background: var(--success-light);
      color: var(--success);
    }

    .option-btn.correct .option-letter {
      background: var(--success);
      color: white;
    }

    .option-btn.wrong {
      border-color: var(--danger);
      background: var(--danger-light);
      color: var(--danger);
    }

    .option-btn.wrong .option-letter {
      background: var(--danger);
      color: white;
    }

    .quiz-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 14px;
      border-top: 1px solid var(--border-color);
      flex-wrap: wrap;
      gap: 12px;
    }

    /* ============================================================ */
    /* EXAM SECTION - PAGINATED 10 QUESTIONS & FLAGGING             */
    /* ============================================================ */
    .exam-sticky-bar {
      position: sticky;
      top: 12px;
      z-index: 100;
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-lg);
      gap: 14px;
      flex-wrap: wrap;
    }

    .exam-bar-left {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .exam-timer-display {
      font-size: 20px;
      font-weight: 800;
      color: var(--primary);
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-variant-numeric: tabular-nums;
      padding: 4px 10px;
      border-radius: var(--radius-md);
      background: var(--primary-light);
    }

    .exam-page-indicator {
      font-size: 13.5px;
      font-weight: 700;
      color: var(--text-main);
      background: var(--bg-subtle);
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--border-color);
    }

    .exam-bar-center {
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-width: 200px;
      max-width: 320px;
    }

    .exam-stats-pill {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 12.5px;
      color: var(--text-muted);
    }

    .exam-stats-pill .divider {
      color: var(--text-light);
    }

    .flag-counter-text {
      color: var(--warning);
      font-weight: 700;
    }

    .exam-progress-track {
      background: var(--bg-subtle);
      border-radius: 999px;
      height: 7px;
      width: 100%;
      overflow: hidden;
      border: 1px solid var(--border-color);
    }

    .exam-progress-bar {
      background: linear-gradient(90deg, var(--primary), var(--success));
      height: 100%;
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .exam-bar-right {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-submit-exam {
      background: linear-gradient(135deg, #e11d48, #be123c) !important;
      font-weight: 800;
      color: white !important;
      letter-spacing: 0.02em;
      box-shadow: 0 2px 8px rgba(225, 29, 72, 0.35);
    }

    .btn-submit-exam:hover {
      box-shadow: 0 4px 14px rgba(225, 29, 72, 0.45);
      transform: translateY(-1px);
    }

    /* Page Banner */
    .exam-page-banner {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      box-shadow: var(--shadow-sm);
    }

    .exam-page-top-actions {
      display: flex;
      gap: 8px;
    }

    /* Questions Container */
    .exam-questions-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Individual Question Card on Exam Page */
    .exam-q-card {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1.5px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 24px 26px;
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
      gap: 18px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      position: relative;
    }

    .exam-q-card:hover {
      box-shadow: var(--shadow-lg);
    }

    .exam-q-card.is-flagged {
      border-color: #f59e0b;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.2);
      background: linear-gradient(180deg, var(--flag-bg) 0%, var(--bg-card) 60px);
    }

    .exam-q-card.highlight-pulse {
      animation: cardPulse 1.8s ease-out;
    }

    @keyframes cardPulse {
      0% { box-shadow: 0 0 0 4px rgba(190, 18, 60, 0.6); }
      100% { box-shadow: var(--shadow-md); }
    }

    .exam-q-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 10px;
      padding-bottom: 12px;
      border-bottom: 1px solid var(--border-color);
    }

    .exam-q-meta {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;
    }

    .exam-q-num-badge {
      background: var(--primary);
      color: white;
      font-size: 13.5px;
      font-weight: 800;
      padding: 4px 12px;
      border-radius: 999px;
      box-shadow: 0 2px 4px rgba(190, 18, 60, 0.2);
    }

    .btn-flag-toggle {
      background: var(--bg-card);
      border: 1.5px solid var(--border-color);
      color: var(--text-muted);
      padding: 6px 14px;
      border-radius: 999px;
      font-size: 13px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .btn-flag-toggle:hover {
      border-color: #f59e0b;
      color: #b45309;
      transform: translateY(-1px);
    }

    .btn-flag-toggle.flagged {
      background: #fef3c7;
      border-color: #f59e0b;
      color: #b45309;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);
    }

    [data-theme="dark"] .btn-flag-toggle.flagged,
    [data-theme="rain"] .btn-flag-toggle.flagged,
    [data-theme="christmas"] .btn-flag-toggle.flagged {
      background: rgba(245, 158, 11, 0.22);
      border-color: #f59e0b;
      color: #fcd34d;
    }

    .exam-q-content {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-main);
      line-height: 1.6;
    }

    .exam-options-grid {
      display: flex;
      flex-direction: column;
      gap: 11px;
    }

    .exam-option-item {
      background: var(--bg-card);
      border: 1.5px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 13px 18px;
      display: flex;
      align-items: flex-start;
      gap: 14px;
      cursor: pointer;
      text-align: left;
      font-size: 15px;
      color: var(--text-main);
      transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
    }

    .exam-option-item:hover {
      background: var(--bg-subtle);
      border-color: var(--text-muted);
      transform: translateY(-1px);
    }

    .exam-option-item.selected {
      border-color: var(--primary);
      background: var(--primary-light);
      box-shadow: 0 2px 8px rgba(190, 18, 60, 0.15);
    }

    .exam-option-item.selected .option-letter {
      background: var(--primary);
      color: white;
      transform: scale(1.05);
    }

    .exam-pagination-bar {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 16px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      box-shadow: var(--shadow-sm);
    }

    .exam-page-pills {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
      justify-content: center;
    }

    .page-pill-btn {
      min-width: 38px;
      height: 38px;
      padding: 0 10px;
      border-radius: var(--radius-md);
      background: var(--bg-subtle);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .page-pill-btn:hover {
      border-color: var(--primary);
      background: var(--bg-card);
      transform: translateY(-1px);
    }

    .page-pill-btn.active {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
      box-shadow: 0 2px 6px rgba(190, 18, 60, 0.3);
    }

    .exam-submit-banner {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1.5px dashed var(--primary);
      border-radius: var(--radius-xl);
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 18px;
      margin-top: 10px;
    }

    .exam-submit-banner-text h4 {
      font-size: 17px;
      font-weight: 800;
      color: var(--text-main);
      margin-bottom: 4px;
    }

    .exam-submit-banner-text p {
      font-size: 13.5px;
      color: var(--text-muted);
    }

    .btn-scroll-top {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      box-shadow: var(--shadow-lg);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      z-index: 90;
      transition: all 0.2s;
    }

    .btn-scroll-top:hover {
      transform: translateY(-2px);
      border-color: var(--primary);
    }

    /* Question Matrix Grid */
    .matrix-legend {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      padding: 8px 12px;
      background: var(--bg-subtle);
      border-radius: var(--radius-md);
      font-size: 12.5px;
      font-weight: 600;
      margin-bottom: 6px;
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
    }

    .question-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(44px, 1fr));
      gap: 8px;
      max-height: 400px;
      overflow-y: auto;
      padding: 4px;
    }

    .grid-num-btn {
      height: 42px;
      border-radius: var(--radius-sm);
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      color: var(--text-main);
      font-weight: 700;
      font-size: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.15s;
    }

    .grid-num-btn:hover {
      border-color: var(--primary);
      transform: scale(1.05);
    }

    .grid-num-btn.answered {
      background: var(--success-light);
      border-color: var(--success);
      color: var(--success);
    }

    .grid-num-btn.flagged {
      background: #fef3c7 !important;
      border-color: #f59e0b !important;
      color: #b45309 !important;
    }

    [data-theme="dark"] .grid-num-btn.flagged,
    [data-theme="rain"] .grid-num-btn.flagged,
    [data-theme="christmas"] .grid-num-btn.flagged {
      background: rgba(245, 158, 11, 0.25) !important;
      color: #fcd34d !important;
    }

    .grid-num-btn.flagged::after {
      content: '🚩';
      position: absolute;
      top: -4px;
      right: -3px;
      font-size: 10px;
    }

    .grid-num-btn.active-page {
      box-shadow: 0 0 0 2px var(--primary);
    }

    .grid-num-btn.correct-ans {
      background: var(--success-light);
      border-color: var(--success);
      color: var(--success);
    }

    .grid-num-btn.wrong-ans {
      background: var(--danger-light);
      border-color: var(--danger);
      color: var(--danger);
    }

    /* Result Card */
    .result-card {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px 24px;
      text-align: center;
      box-shadow: var(--shadow-lg);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }

    .score-circle {
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-light), var(--bg-subtle));
      border: 4px solid var(--primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 8px 0;
      box-shadow: 0 8px 20px rgba(190, 18, 60, 0.2);
    }

    .score-number {
      font-size: 38px;
      font-weight: 800;
      color: var(--primary);
      line-height: 1;
    }

    .score-scale {
      font-size: 13px;
      color: var(--text-muted);
      font-weight: 600;
    }

    .result-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
      width: 100%;
      max-width: 600px;
    }

    .result-stat-box {
      background: var(--bg-subtle);
      border-radius: var(--radius-md);
      padding: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .result-stat-label {
      font-size: 12px;
      color: var(--text-muted);
    }

    .result-stat-val {
      font-size: 18px;
      font-weight: 800;
      color: var(--text-main);
    }

    .review-item {
      background: var(--bg-card);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 12px;
    }

    .review-item.is-correct {
      border-left: 4px solid var(--success);
    }

    .review-item.is-wrong {
      border-left: 4px solid var(--danger);
    }

    .review-item.is-skipped {
      border-left: 4px solid var(--text-muted);
    }

    .review-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12.5px;
      color: var(--text-muted);
    }

    .chart-bar-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 14px;
    }

    .chart-bar-header {
      display: flex;
      justify-content: space-between;
      font-size: 13.5px;
      font-weight: 600;
    }

    .chart-bar-track {
      background: var(--bg-subtle);
      border-radius: 999px;
      height: 12px;
      width: 100%;
      overflow: hidden;
    }

    .chart-bar-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.4s ease;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .form-label {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-weight: 700;
    }

    .form-range {
      width: 100%;
      accent-color: var(--primary);
      cursor: pointer;
    }

    .chapter-slider-item {
      background: var(--bg-subtle);
      padding: 14px 16px;
      border-radius: var(--radius-md);
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* ============================================================ */
    /* THEME MODAL STYLES                                           */
    /* ============================================================ */
    .theme-preset-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(115px, 1fr));
      gap: 10px;
    }

    .theme-card-option {
      background: var(--bg-subtle);
      border: 2px solid var(--border-color);
      border-radius: var(--radius-md);
      padding: 10px 8px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      text-align: center;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      user-select: none;
      position: relative;
    }

    .theme-card-option:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-sm);
    }

    .theme-card-option.active {
      border-color: var(--primary);
      background: var(--primary-light);
      box-shadow: 0 0 0 2px var(--primary);
    }

    .theme-preview-color {
      width: 100%;
      height: 44px;
      border-radius: var(--radius-sm);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      box-shadow: inset 0 0 0 1px rgba(0,0,0,0.1);
    }

    .theme-card-title {
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
    }

    .theme-card-desc {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.2;
    }

    .theme-upload-box {
      border: 2px dashed var(--border-color);
      border-radius: var(--radius-lg);
      padding: 18px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      text-align: center;
      background: var(--bg-subtle);
      transition: all 0.2s;
    }

    .theme-upload-box:hover {
      border-color: var(--primary);
    }

    .custom-preview-row {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 10px;
      background: var(--bg-card);
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
    }

    .custom-thumb-img {
      width: 64px;
      height: 64px;
      border-radius: var(--radius-sm);
      object-fit: cover;
      border: 1px solid var(--border-color);
      flex-shrink: 0;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .app-container {
        padding: 12px 14px 40px;
      }
      .exam-sticky-bar {
        padding: 10px 14px;
        gap: 8px;
      }
      .exam-bar-center {
        order: 3;
        width: 100%;
        max-width: 100%;
      }
      .exam-q-card {
        padding: 18px 16px;
      }
      .menu-grid {
        grid-template-columns: 1fr;
      }
      .week-calendar {
        gap: 4px;
      }
      .theme-preset-grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  </style>
</head>
<body>
  <!-- FIXED AMBIENT BACKGROUND & PARTICLES LAYERS -->
  <div id="themeBgLayer" class="theme-bg-layer"></div>
  <div id="themeOverlayLayer" class="theme-overlay-layer"></div>
  <div id="themeParticlesLayer" class="theme-particles-layer"></div>

  <div class="app-container">
    <!-- TOP NAVIGATION -->
    <header class="top-nav">
      <div class="brand-group" onclick="App.navigateTo('menu')">
        <div class="brand-icon">⭐</div>
        <div class="brand-text">
          <h1>Tư Tưởng Hồ Chí Minh</h1>
          <p>Ôn Tập & Thi Trắc Nghiệm 475 Câu</p>
        </div>
      </div>
      <div class="nav-actions">
        <!-- NÚT CHỌN THEME & HÌNH NỀN -->
        <button class="btn-icon" onclick="App.openThemeModal()" id="themePickerBtn" title="Chọn hình nền & Giao diện">
          🎨 <span id="themePickerLabel">Đổi nền</span>
        </button>
        <!-- NÚT TẢI FILE HTML ĐỂ KÉO THẢ LÊN NETLIFY DROP -->
        <button class="btn-icon" onclick="App.downloadWebFile()" title="Tải file index.html về máy (để kéo thả lên Netlify Drop hoặc mở offline)">
          📥 <span>Tải HTML</span>
        </button>
      </div>
    </header>

    <!-- VIEW 0: MAIN MENU -->
    <main id="view-menu" class="view-section active">
      <div class="menu-grid">
        <!-- 1. ÔN TẬP -->
        <div class="menu-card" onclick="App.navigateTo('practice-menu')">
          <div class="menu-card-icon" style="background: rgba(190, 18, 60, 0.12); color: var(--primary);">
            📖
          </div>
          <h2>
            1. ÔN TẬP
            <span class="badge" style="background: var(--primary-light); color: var(--primary);">475 Câu</span>
          </h2>
          <p>Ôn tập theo từng chương với bảng tiến độ chi tiết, ôn tất cả 475 câu hoặc ôn tự do nhiều chương tùy chọn.</p>
          <div style="margin-top: auto; display: flex; align-items: center; gap: 6px; color: var(--primary); font-weight: 700; font-size: 14px;">
            Bắt đầu ôn tập ➔
          </div>
        </div>

        <!-- 2. KIỂM TRA -->
        <div class="menu-card" onclick="App.navigateTo('exam-setup')">
          <div class="menu-card-icon" style="background: rgba(16, 185, 129, 0.12); color: var(--success);">
            ⏱️
          </div>
          <h2>
            2. KIỂM TRA
            <span class="badge" style="background: var(--success-light); color: var(--success);">Đề Thi Chuẩn</span>
          </h2>
          <p>Thi thử trắc nghiệm 40 - 120 câu, phân trang 10 câu/trang, gắn cờ câu do dự, đồng hồ đếm ngược và chấm điểm thang 10.</p>
          <div style="margin-top: auto; display: flex; align-items: center; gap: 6px; color: var(--success); font-weight: 700; font-size: 14px;">
            Thiết lập đề thi ➔
          </div>
        </div>

        <!-- 3. KIỂM TRA TIẾN ĐỘ THUỘC BÀI -->
        <div class="menu-card" onclick="App.navigateTo('mastery-analytics')">
          <div class="menu-card-icon" style="background: rgba(2, 132, 199, 0.12); color: var(--info);">
            📊
          </div>
          <h2>
            3. TIẾN ĐỘ THUỘC BÀI
            <span class="badge" style="background: var(--info-light); color: var(--info);">Phân Tích</span>
          </h2>
          <p>Xếp hạng các chương hay làm sai nhất, danh sách câu hỏi hay quên và thống kê toàn diện độ thuộc bài.</p>
          <div style="margin-top: auto; display: flex; align-items: center; gap: 6px; color: var(--info); font-weight: 700; font-size: 14px;">
            Xem phân tích ➔
          </div>
        </div>

        <!-- 4. CHẾ ĐỘ NIGHTMARE (ÁC MỘNG) -->
        <div class="menu-card" style="border-color: rgba(239, 68, 68, 0.45);" onclick="App.openNightmareSetup()">
          <div class="menu-card-icon" style="background: rgba(239, 68, 68, 0.15); color: #ef4444;">
            💀
          </div>
          <h2>
            4. CHẾ ĐỘ NIGHTMARE
            <span class="badge" style="background: rgba(239, 68, 68, 0.18); color: #ef4444;">Sinh Tồn 100%</span>
          </h2>
          <p>Thử thách sinh tồn đỉnh cao: Chọn Chương 1 đến 6. Chỉ cần sai đúng 1 đáp án là lập tức bị loại và phải làm lại từ Câu 1!</p>
          <div style="margin-top: auto; display: flex; align-items: center; gap: 6px; color: #ef4444; font-weight: 700; font-size: 14px;">
            Vào chế độ Ác mộng ➔
          </div>
        </div>
      </div>
    </main>

    <!-- VIEW 1: PRACTICE MENU (CHỌN CHƯƠNG) -->
    <section id="view-practice-menu" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <h2>Khu Vực Ôn Tập Trắc Nghiệm</h2>
          <p>Chọn chương cụ thể, ôn tất cả 475 câu hoặc ôn tự do theo nhóm chương</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('menu')">
          ⬅️ Về Menu
        </button>
      </div>

      <div class="big-actions-row">
        <div class="btn-big-action" onclick="App.openPracticeSettings('all')">
          <div class="action-icon" style="color: var(--primary);">📚</div>
          <div>
            <h3>ÔN TẤT CẢ CÁC CÂU</h3>
            <p>Toàn bộ 475 câu trắc nghiệm của cả 6 chương</p>
          </div>
        </div>

        <div class="btn-big-action" onclick="App.openCustomPracticeModal()">
          <div class="action-icon" style="color: var(--info);">🎯</div>
          <div>
            <h3>ÔN TỰ DO</h3>
            <p>Tự tick chọn 1 hoặc nhiều chương tùy ý</p>
          </div>
        </div>
      </div>

      <div class="chapters-grid" id="practiceChaptersGrid">
        <!-- Rendered dynamically -->
      </div>
    </section>

    <!-- VIEW 1B: PRACTICE SESSION -->
    <section id="view-practice-taking" class="view-section">
      <div class="view-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-weight: 800; font-size: 18px; color: var(--primary);" id="practiceProgressText">Câu 1/26</span>
          <span style="font-size: 12px; color: var(--text-muted);" id="practiceModeBadge">Chương 1</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button class="btn btn-outline btn-sm" onclick="App.openQuestionMatrix('practice')">
            🔢 Danh sách câu
          </button>
          <button class="btn btn-secondary btn-sm" onclick="App.finishPracticeEarly()">
            🏁 Kết thúc
          </button>
          <button class="btn btn-secondary btn-sm" onclick="App.confirmExitPractice()">
            ✕ Thoát
          </button>
        </div>
      </div>

      <div class="quiz-card" id="practiceQuizCard">
        <div class="quiz-meta">
          <span class="quiz-chapter-pill" id="practiceChapterTag">Chương 1</span>
          <span style="font-size: 12px; color: var(--text-muted);" id="practiceFeedbackModeHint">
            Hiện đáp án ngay khi chọn
          </span>
        </div>

        <div class="question-text" id="practiceQuestionText">
          Đang tải câu hỏi...
        </div>

        <div class="options-list" id="practiceOptionsList">
          <!-- Rendered dynamically -->
        </div>

        <!-- Thanh hướng dẫn phím tắt trực quan -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 12.5px; color: var(--text-muted); background: var(--bg-subtle); padding: 8px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-top: 4px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>⌨️ Phím <strong>1, 2, 3, 4</strong> (hoặc <strong>A, B, C, D</strong>): Chọn đáp án</span>
          </div>
          <div id="practiceKeyboardEnterHint" style="font-weight: 700; color: var(--primary);">
            Phím <strong>Enter</strong>: Sang câu tiếp theo ➔
          </div>
        </div>

        <div class="quiz-footer">
          <button class="btn btn-secondary" id="practicePrevBtn" onclick="App.prevPracticeQuestion()">
            ⬅️ Câu trước
          </button>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" id="practiceNextBtn" onclick="App.nextPracticeQuestion()">
              Câu tiếp theo ➡️
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VIEW 1C: PRACTICE RESULT -->
    <section id="view-practice-result" class="view-section">
      <div class="result-card">
        <div style="font-size: 40px;">🎉</div>
        <h2 style="font-size: 24px; font-weight: 800;">Hoàn Thành Lượt Ôn Tập!</h2>
        <p style="color: var(--text-muted);" id="practiceResultSummary">
          Bạn đã hoàn thành các câu hỏi trong lượt ôn này.
        </p>

        <div class="result-stats-grid">
          <div class="result-stat-box">
            <span class="result-stat-label">Tổng số câu</span>
            <span class="result-stat-val" id="practiceTotalStat">0</span>
          </div>
          <div class="result-stat-box" style="color: var(--success);">
            <span class="result-stat-label">Trả lời đúng</span>
            <span class="result-stat-val" id="practiceCorrectStat">0</span>
          </div>
          <div class="result-stat-box" style="color: var(--danger);">
            <span class="result-stat-label">Trả lời sai</span>
            <span class="result-stat-val" id="practiceWrongStat">0</span>
          </div>
          <div class="result-stat-box">
            <span class="result-stat-label">Độ chính xác</span>
            <span class="result-stat-val" id="practiceAccuracyStat">0%</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 10px;">
          <button class="btn btn-primary" id="practiceRetryWrongBtn" onclick="App.retryWrongQuestions()" style="background: #e11d48;">
            🔄 Làm lại các câu đã làm sai (<span id="retryWrongCountText">0</span>)
          </button>
          <button class="btn btn-secondary" onclick="App.navigateTo('practice-menu')">
            📖 Về danh sách ôn tập
          </button>
          <button class="btn btn-outline" onclick="App.navigateTo('menu')">
            🏠 Thoát về Menu
          </button>
        </div>
      </div>
    </section>

    <!-- VIEW 2: EXAM SETUP (KIỂM TRA) -->
    <section id="view-exam-setup" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <h2>Thiết Lập Đề Kiểm Tra</h2>
          <p>Tạo đề thi trắc nghiệm theo phân bổ chương và thời gian quy chuẩn</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('menu')">
          ⬅️ Về Menu
        </button>
      </div>

      <div style="background: var(--bg-card); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; gap: 24px; box-shadow: var(--shadow-sm);">
        <!-- 1. Question count -->
        <div class="form-group">
          <div class="form-label">
            <span>1. Số lượng câu hỏi (40 - 120 câu)</span>
            <span style="color: var(--primary); font-weight: 700;" id="examQCountDisplay">60 câu</span>
          </div>
          <input type="range" min="40" max="120" step="5" value="60" class="form-range" id="examQCountSlider" oninput="App.onExamQuestionCountChange(this.value)">
        </div>

        <!-- 2. Chapter distribution % -->
        <div class="form-group">
          <div class="form-label" style="align-items: center; margin-bottom: 4px;">
            <span>2. Tỉ lệ % câu hỏi từng chương</span>
            <div style="display: flex; align-items: center; gap: 8px;">
              <button class="btn btn-outline btn-sm" onclick="App.resetExamRatioEven()" type="button">
                ⚖️ Chia đều
              </button>
              <span id="examRatioSumBadge" style="padding: 4px 10px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700; background: var(--success-light); color: var(--success);">
                Tổng: 100%
              </span>
            </div>
          </div>
          <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">
            Mặc định tổng đúng 100%. Tự động quy đổi ra số câu cho từng chương.
          </p>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 14px;" id="examRatioGrid">
            <!-- 6 chapter inputs dynamically updated -->
          </div>
          <div id="examQuotaNotice" style="font-size: 13px; color: var(--warning); margin-top: 8px; display: none;"></div>
        </div>

        <!-- 3. Time -->
        <div class="form-group">
          <div class="form-label">
            <span>3. Thời gian làm bài (30 - 100 phút)</span>
            <span style="color: var(--primary); font-weight: 700;" id="examTimeDisplay">50 phút</span>
          </div>
          <input type="range" min="30" max="100" step="5" value="50" class="form-range" id="examTimeSlider" oninput="App.onExamTimeChange(this.value)">
        </div>

        <!-- Submit Button -->
        <div style="display: flex; justify-content: flex-end; gap: 12px; margin-top: 8px;">
          <button class="btn btn-primary btn-lg" id="startExamBtn" onclick="App.startExam()">
            🚀 BẮT ĐẦU KIỂM TRA
          </button>
        </div>
      </div>
    </section>

    <!-- VIEW 2B: EXAM TAKING (PAGINATED 10 QUESTIONS PER PAGE WITH FLAGGING) -->
    <section id="view-exam-taking" class="view-section">
      <!-- Exam Fixed Sticky Top Bar -->
      <div class="exam-sticky-bar" id="examStickyBar">
        <div class="exam-bar-left">
          <div class="exam-timer-display" id="examTimerDisplay">
            ⏱️ 50:00
          </div>
          <div class="exam-page-indicator" id="examTopPageBadge">
            Trang 1/6
          </div>
        </div>

        <div class="exam-bar-center">
          <div class="exam-stats-pill">
            <span>Đã làm: <strong id="examAnsweredCountText" style="color: var(--text-main);">0/60</strong></span>
            <span class="divider">•</span>
            <span class="flag-counter-text" id="examFlaggedCountText">🚩 0 do dự</span>
          </div>
          <div class="exam-progress-track">
            <div class="exam-progress-bar" id="examProgressBar" style="width: 0%;"></div>
          </div>
        </div>

        <div class="exam-bar-right">
          <button class="btn btn-outline btn-sm" onclick="App.openQuestionMatrix('exam')">
            🔢 Bảng câu hỏi
          </button>
          <button class="btn btn-primary btn-sm btn-submit-exam" onclick="App.promptSubmitExam()">
            📝 NỘP BÀI
          </button>
        </div>
      </div>

      <!-- Exam Page Content Banner -->
      <div class="exam-page-banner">
        <div>
          <h3 id="examCurrentPageHeading" style="font-size: 18px; font-weight: 800; color: var(--text-main);">
            Trang 1 / 6
          </h3>
          <p id="examCurrentPageRange" style="font-size: 13px; color: var(--text-muted); margin-top: 2px;">
            Hiển thị Câu 1 – Câu 10 (trong tổng số 60 câu)
          </p>
        </div>
        <div class="exam-page-top-actions">
          <button class="btn btn-secondary btn-sm" id="examTopPrevBtn" onclick="App.prevExamPage()">
            ⬅️ Trang trước
          </button>
          <button class="btn btn-primary btn-sm" id="examTopNextBtn" onclick="App.nextExamPage()">
            Trang sau ➡️
          </button>
        </div>
      </div>

      <!-- 10 Question Cards on Current Page -->
      <div id="examQuestionsContainer" class="exam-questions-list">
        <!-- Rendered dynamically -->
      </div>

      <!-- Bottom Pagination Bar -->
      <div class="exam-pagination-bar">
        <button class="btn btn-secondary" id="examBottomPrevBtn" onclick="App.prevExamPage()">
          ⬅️ Trang trước
        </button>

        <div class="exam-page-pills" id="examPagePillsContainer">
          <!-- Page 1, 2, 3... buttons -->
        </div>

        <button class="btn btn-secondary" id="examBottomNextBtn" onclick="App.nextExamPage()">
          Trang sau ➡️
        </button>
      </div>

      <!-- Prominent Submit Exam Banner at Bottom -->
      <div class="exam-submit-banner">
        <div class="exam-submit-banner-text">
          <h4>Sẵn sàng nộp bài kiểm tra?</h4>
          <p id="examSubmitStatusText">Bạn đã trả lời 0/60 câu hỏi. Bạn có thể kiểm tra lại các câu đã gắn cờ do dự trước khi nộp.</p>
        </div>
        <button class="btn btn-primary btn-lg btn-submit-exam" onclick="App.promptSubmitExam()">
          📝 NỘP BÀI KIỂM TRA
        </button>
      </div>

      <!-- Floating Scroll-to-Top Button -->
      <button class="btn-scroll-top" id="examScrollTopBtn" onclick="window.scrollTo({top: 0, behavior: 'smooth'})" title="Lên đầu trang">
        ⬆️
      </button>
    </section>

    <!-- VIEW 2C: EXAM RESULT -->
    <section id="view-exam-result" class="view-section">
      <div class="result-card">
        <div style="font-size: 40px;">🏆</div>
        <h2 style="font-size: 24px; font-weight: 800;">Kết Quả Bài Kiểm Tra</h2>
        <div id="examRatingBadge" style="padding: 4px 14px; border-radius: 999px; font-weight: 700; font-size: 13px;">
          Xuất sắc
        </div>

        <div class="score-circle">
          <div class="score-number" id="examScoreDisplay">0.00</div>
          <div class="score-scale">Thang điểm 10</div>
        </div>

        <div class="result-stats-grid">
          <div class="result-stat-box">
            <span class="result-stat-label">Tổng số câu</span>
            <span class="result-stat-val" id="examTotalQStat">60</span>
          </div>
          <div class="result-stat-box" style="color: var(--success);">
            <span class="result-stat-label">Số câu đúng</span>
            <span class="result-stat-val" id="examCorrectQStat">0</span>
          </div>
          <div class="result-stat-box" style="color: var(--danger);">
            <span class="result-stat-label">Số câu sai</span>
            <span class="result-stat-val" id="examWrongQStat">0</span>
          </div>
          <div class="result-stat-box">
            <span class="result-stat-label">Thời gian làm bài</span>
            <span class="result-stat-val" id="examTimeSpentStat">00:00</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 14px;">
          <button class="btn btn-primary" onclick="App.showExamReview()">
            🔍 KIỂM TRA ĐÁP ÁN
          </button>
          <button class="btn btn-outline" onclick="App.showExamAnalysis()">
            📊 PHÂN TÍCH THEO CHƯƠNG
          </button>
          <button class="btn btn-secondary" onclick="App.navigateTo('menu')">
            🏠 Thoát về Menu
          </button>
        </div>
      </div>

      <!-- Phân Tích Biểu Đồ Từng Chương -->
      <div id="examAnalysisContainer" style="display: none; background: var(--bg-card); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); flex-direction: column; gap: 16px;">
        <h3 style="font-size: 18px; font-weight: 800;">Phân Tích Tỉ Lệ Đúng Theo Từng Chương</h3>
        <p style="font-size: 13px; color: var(--text-muted);" id="bestChapterNotice">
          Chương bạn làm đúng nhiều nhất: Đang tải...
        </p>

        <div id="examChapterCharts" style="margin-top: 10px;">
          <!-- 6 bars rendered dynamically -->
        </div>
      </div>

      <!-- Xem Lại Toàn Bộ Bài Thi -->
      <div id="examReviewContainer" style="display: none; background: var(--bg-card); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
          <h3 style="font-size: 18px; font-weight: 800;">Xem Lại Đề Thi & Đáp Án Chuẩn</h3>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm active" id="filterAllBtn" onclick="App.filterExamReview('all')">Tất cả</button>
            <button class="btn btn-outline btn-sm" id="filterWrongBtn" onclick="App.filterExamReview('wrong')">Chỉ câu sai</button>
            <button class="btn btn-outline btn-sm" id="filterCorrectBtn" onclick="App.filterExamReview('correct')">Chỉ câu đúng</button>
          </div>
        </div>

        <div id="examReviewList" style="margin-top: 10px;">
          <!-- Review questions rendered -->
        </div>
      </div>
    </section>

    <!-- VIEW 3: KIỂM TRA TIẾN ĐỘ THUỘC BÀI (ANALYTICS) -->
    <section id="view-mastery-analytics" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <h2>Kiểm Tra Tiến Độ Thuộc Bài</h2>
          <p>Phân tích các chương hay quên và danh sách các câu hỏi hay làm sai nhất</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('menu')">
          ⬅️ Về Menu
        </button>
      </div>

      <!-- Khi Chưa Có Dữ Liệu -->
      <div id="masteryEmptyState" style="background: var(--bg-card); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 48px 24px; text-align: center; display: none; flex-direction: column; align-items: center; gap: 14px;">
        <div style="font-size: 48px;">📂</div>
        <h3 style="font-size: 18px; font-weight: 800;">Chưa có dữ liệu học tập</h3>
        <p style="color: var(--text-muted); max-width: 440px;">
          Hãy làm bài ôn tập hoặc kiểm tra trước để hệ thống ghi nhận lịch sử và phân tích độ thuộc bài của bạn!
        </p>
        <button class="btn btn-primary" onclick="App.navigateTo('practice-menu')">
          Bắt đầu ôn tập ngay
        </button>
      </div>

      <!-- Khi Đã Có Dữ Liệu -->
      <div id="masteryDataState" style="display: flex; flex-direction: column; gap: 24px;">
        <div style="background: var(--bg-card); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 800;">Xếp Hạng Các Chương Hay Quên / Làm Sai Nhất</h3>
          <p style="font-size: 13px; color: var(--text-muted);">
            Thứ tự từ chương có tỉ lệ làm sai cao nhất xuống thấp nhất dựa trên mọi lần làm bài.
          </p>

          <div id="chapterRankingsList">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <div style="background: var(--bg-card); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 800;">Danh Sách Các Câu Hỏi Hay Sai Nhất</h3>
          <p style="font-size: 13px; color: var(--text-muted);">
            Những câu hỏi bạn đã sai nhiều lần hoặc ở lần làm gần đây nhất vẫn chưa chọn đúng:
          </p>

          <div id="failedQuestionsList">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-outline btn-sm" onclick="App.confirmClearData()" style="color: var(--danger); border-color: var(--danger-border);">
            🗑️ Xóa toàn bộ dữ liệu học tập
          </button>
        </div>
      </div>
    </section>

    <!-- VIEW 4: NIGHTMARE SETUP -->
    <section id="view-nightmare-setup" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <h2 style="color: #ef4444; display: flex; align-items: center; gap: 8px;">
            <span>💀</span> CHẾ ĐỘ NIGHTMARE (ÁC MỘNG)
          </h2>
          <p>Sinh tồn tuyệt đối: Chọn 1 chương hoặc Tất cả. <strong>Chỉ cần sai 1 câu là làm lại từ Câu 1!</strong></p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('menu')">
          ⬅️ Về Menu
        </button>
      </div>

      <div class="nightmare-banner">
        <div style="display: flex; align-items: center; gap: 14px;">
          <div style="font-size: 38px; line-height: 1;">⚡</div>
          <div>
            <div style="font-weight: 800; font-size: 16px; color: #ef4444;">QUY TẮC TỬ THẦN</div>
            <div style="font-size: 13px; color: var(--text-muted);">
              Trả lời đúng: Tăng chuỗi sinh tồn ➔ Trả lời sai dù chỉ 1 câu: <strong>Bị loại ngay lập tức và bắt đầu lại từ Câu 1!</strong>
            </div>
          </div>
        </div>
        <div class="nightmare-streak-badge">
          <span>💀 KHÔNG SAI DÙ 1 CÂU</span>
        </div>
      </div>

      <div style="margin-top: 10px;">
        <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 8px;">1. Chọn Chương Muốn Thử Thách (1 - 6):</h3>
        <div class="nightmare-chapter-grid" id="nightmareChapterSelectionGrid">
          <!-- Rendered dynamically with best records -->
        </div>
      </div>

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 18px 20px; margin-top: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; font-size: 14px; font-weight: 600;">
          <input type="checkbox" id="nightmareShuffleToggle" checked style="width: 18px; height: 18px; accent-color: #ef4444;">
          <span>Tráo ngẫu nhiên thứ tự câu hỏi và đáp án</span>
        </label>
        <button class="btn btn-lg" style="background: linear-gradient(135deg, #ef4444, #991b1b); color: white; box-shadow: 0 4px 14px rgba(239, 68, 68, 0.4);" onclick="App.startNightmare()">
          💀 BẮT ĐẦU VƯỢT THỬ THÁCH ➔
        </button>
      </div>
    </section>

    <!-- VIEW 4B: NIGHTMARE TAKING -->
    <section id="view-nightmare-taking" class="view-section">
      <div class="view-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-weight: 800; font-size: 18px; color: #ef4444;" id="nightmareProgressText">Câu 1/26</span>
          <span class="badge" style="background: rgba(239, 68, 68, 0.18); color: #ef4444;" id="nightmareChapterTag">Chương 1</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
          <div class="nightmare-streak-badge" id="nightmareLiveStreakBadge">
            🔥 Chuỗi: 0 câu đúng
          </div>
          <button class="btn btn-secondary btn-sm" onclick="App.exitNightmare()">
            ✕ Thoát
          </button>
        </div>
      </div>

      <!-- Warning bar -->
      <div style="background: rgba(239, 68, 68, 0.1); border: 1px dashed rgba(239, 68, 68, 0.35); padding: 8px 14px; border-radius: var(--radius-sm); font-size: 12.5px; color: #ef4444; font-weight: 700; display: flex; align-items: center; justify-content: space-between;">
        <span>⚠️ CHẾ ĐỘ NIGHTMARE: Sai 1 câu là LÀM LẠI TỪ CÂU 1!</span>
        <span id="nightmareBestRecordText" style="color: var(--text-muted); font-weight: 500;">Kỷ lục: 0 câu</span>
      </div>

      <div class="quiz-card" id="nightmareQuizCard" style="border-color: rgba(239, 68, 68, 0.4);">
        <div class="question-text" id="nightmareQuestionText">
          Đang tải câu hỏi...
        </div>

        <div class="options-list" id="nightmareOptionsList">
          <!-- Rendered dynamically -->
        </div>

        <!-- Shortcut Guide Bar -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; font-size: 12.5px; color: var(--text-muted); background: var(--bg-subtle); padding: 8px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-top: 4px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span>⌨️ Phím <strong>1, 2, 3, 4</strong>: Chọn đáp án</span>
          </div>
          <div id="nightmareKeyboardEnterHint" style="font-weight: 700; color: #ef4444;">
            Nhấn <strong>Enter</strong>: Xác nhận đáp án ↵
          </div>
        </div>

        <div class="quiz-footer">
          <div style="font-size: 12px; color: var(--text-muted);">
            Nhấn Enter lần 1 để chốt đáp án, Enter lần 2 để sang câu tiếp theo.
          </div>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" id="nightmareNextBtn" style="background: linear-gradient(135deg, #ef4444, #b91c1c);" onclick="App.onNightmareNextClick()">
              Xác nhận đáp án ↵
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VIEW 4C: NIGHTMARE VICTORY -->
    <section id="view-nightmare-victory" class="view-section">
      <div class="result-card" style="border-color: rgba(234, 179, 8, 0.5); box-shadow: 0 10px 30px rgba(234, 179, 8, 0.2);">
        <div style="font-size: 54px;">🏆</div>
        <h2 style="font-size: 26px; font-weight: 900; color: #eab308; letter-spacing: -0.01em;">
          HUYỀN THOẠI! BẠN ĐÃ CHINH PHỤC NIGHTMARE!
        </h2>
        <p style="color: var(--text-muted); font-size: 15px; max-width: 520px;" id="nightmareVictorySubtitle">
          Bạn đã hoàn thành xuất sắc tất cả câu hỏi mà KHÔNG SAI DÙ CHỈ 1 CÂU NÀO!
        </p>

        <div class="result-stats-grid">
          <div class="result-stat-box" style="color: #eab308;">
            <span class="result-stat-label">Số câu chinh phục</span>
            <span class="result-stat-val" id="nightmareVictoryTotalStat">0</span>
          </div>
          <div class="result-stat-box" style="color: var(--success);">
            <span class="result-stat-label">Số câu trả lời sai</span>
            <span class="result-stat-val">0</span>
          </div>
          <div class="result-stat-box" style="color: #ef4444;">
            <span class="result-stat-label">Độ chính xác</span>
            <span class="result-stat-val">100%</span>
          </div>
        </div>

        <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 12px;">
          <button class="btn btn-primary btn-lg" style="background: linear-gradient(135deg, #ef4444, #b91c1c);" onclick="App.openNightmareSetup()">
            🔥 Chinh phục chương khác ➔
          </button>
          <button class="btn btn-secondary btn-lg" onclick="App.navigateTo('menu')">
            ⬅️ Về Menu chính
          </button>
        </div>
      </div>
    </section>

    <!-- ============================================================ -->
    <!-- MODAL: CHỌN HÌNH NỀN & GIAO DIỆN (THEME SWITCHER)             -->
    <!-- ============================================================ -->
    <div class="modal-overlay" id="themePickerModal">
      <div class="modal-card" style="max-width: 600px;">
        <div class="modal-header">
          <h3>🎨 Chọn Hình Nền & Giao Diện</h3>
          <button class="btn-icon" onclick="App.closeThemeModal()">✕</button>
        </div>
        <div class="modal-body">
          <div>
            <h4 style="font-size: 15px; font-weight: 800; margin-bottom: 4px;">1. Giao Diện Có Sẵn (Êm Dịu & Thư Thái)</h4>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 12px;">
              Bấm vào giao diện bạn muốn để áp dụng ngay:
            </p>

            <div class="theme-preset-grid" id="themePresetsContainer">
              <!-- Preset theme cards rendered dynamically -->
            </div>
          </div>

          <!-- PHẦN TỰ TẢI ẢNH NỀN -->
          <div style="border-top: 1px solid var(--border-color); padding-top: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: 15px; font-weight: 800;">2. Tải Ảnh Nền Tùy Chọn Từ Máy</h4>
              <button class="btn btn-outline btn-sm" id="btnRemoveCustomWallpaper" onclick="App.removeCustomWallpaper()" style="display: none; color: var(--danger); border-color: var(--danger-border);">
                🗑️ Xóa ảnh tự chọn
              </button>
            </div>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 12px;">
              Tải ảnh từ điện thoại hoặc máy tính. Ảnh sẽ được tự động tối ưu và lưu vào máy của bạn.
            </p>

            <div class="theme-upload-box" id="themeUploadBox">
              <input type="file" id="customWallpaperInput" accept="image/*" style="display: none;" onchange="App.onCustomWallpaperFileSelected(this.files[0])">
              
              <div id="customUploadPlaceholder" style="display: flex; flex-direction: column; align-items: center; gap: 8px;">
                <div style="font-size: 32px;">🖼️</div>
                <div style="font-weight: 700; font-size: 14px;">Chọn ảnh từ thiết bị của bạn</div>
                <button class="btn btn-primary btn-sm" type="button" onclick="document.getElementById('customWallpaperInput').click()">
                  📁 Chọn Tệp Ảnh
                </button>
              </div>

              <!-- Khi đã có ảnh tùy chọn -->
              <div id="customUploadActiveRow" class="custom-preview-row" style="display: none;">
                <img id="customThumbPreview" class="custom-thumb-img" alt="Ảnh nền tùy chọn">
                <div style="flex: 1; text-align: left; display: flex; flex-direction: column; gap: 4px;">
                  <span style="font-size: 13.5px; font-weight: 700; color: var(--text-main);">Đang dùng ảnh tùy chọn</span>
                  <div style="display: flex; gap: 8px;">
                    <button class="btn btn-outline btn-sm" type="button" onclick="document.getElementById('customWallpaperInput').click()">
                      Đổi ảnh khác
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tùy chỉnh lớp phủ dịu mắt khi dùng ảnh tùy chọn -->
            <div id="customControlsGroup" style="display: none; margin-top: 14px; background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); flex-direction: column; gap: 12px;">
              <div class="form-group">
                <div class="form-label" style="font-size: 13px;">
                  <span>Lớp phủ làm dịu mắt / Độ tối</span>
                  <span style="color: var(--primary);" id="customDimmerDisplay">35%</span>
                </div>
                <input type="range" min="10" max="85" step="5" value="35" class="form-range" id="customDimmerSlider" oninput="App.onCustomDimmerChange(this.value)">
              </div>

              <div class="form-group">
                <div class="form-label" style="font-size: 13px;">
                  <span>Độ mờ nghệ thuật (Blur)</span>
                  <span style="color: var(--primary);" id="customBlurDisplay">0px</span>
                </div>
                <input type="range" min="0" max="8" step="1" value="0" class="form-range" id="customBlurSlider" oninput="App.onCustomBlurChange(this.value)">
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                <span style="font-weight: 600;">Màu thẻ nội dung:</span>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-sm btn-outline" id="toneLightBtn" onclick="App.setCustomTone('light')">Sáng</button>
                  <button class="btn btn-sm btn-outline" id="toneDarkBtn" onclick="App.setCustomTone('dark')">Tối</button>
                </div>
              </div>
            </div>
          </div>

          <!-- HIỆU ỨNG ĐỘNG (HOA RƠI / MƯA / TUYẾT) -->
          <div class="toggle-row" style="margin-top: 6px;">
            <div class="toggle-info">
              <h4>Hiệu ứng động êm dịu (Cánh hoa / Mưa / Tuyết rơi)</h4>
              <p>Hiệu ứng trôi nhẹ nhàng, không tốn pin hay giật lag</p>
            </div>
            <label class="switch">
              <input type="checkbox" id="switchParticlesToggle" checked onchange="App.toggleParticles(this.checked)">
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" onclick="App.closeThemeModal()">Hoàn Tất & Áp Dụng</button>
        </div>
      </div>
    </div>

    <!-- MODAL: Ôn Tập Cài Đặt (2 Công Tắc) -->
    <div class="modal-overlay" id="practiceSettingsModal">
      <div class="modal-card">
        <div class="modal-header">
          <h3 id="practiceSettingsTitle">Cấu Hình Lượt Ôn Tập</h3>
          <button class="btn-icon" onclick="App.closePracticeSettingsModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="toggle-row">
            <div class="toggle-info">
              <h4>(a) Tráo thứ tự câu hỏi và đáp án</h4>
              <p>Xáo trộn ngẫu nhiên thứ tự câu và các lựa chọn A, B, C, D</p>
            </div>
            <label class="switch">
              <input type="checkbox" id="switchShuffle" checked>
              <span class="slider"></span>
            </label>
          </div>

          <div class="toggle-row">
            <div class="toggle-info">
              <h4>(b) Hiện đáp án đúng ngay khi chọn đáp án</h4>
              <p>Bật: chọn xong hiện ngay đúng/sai và tô màu; Tắt: chỉ ghi nhận lựa chọn</p>
            </div>
            <label class="switch">
              <input type="checkbox" id="switchImmediateFeedback" checked>
              <span class="slider"></span>
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="App.closePracticeSettingsModal()">Hủy</button>
          <button class="btn btn-primary" onclick="App.confirmStartPractice()">Bắt Đầu Ôn Tập ➔</button>
        </div>
      </div>
    </div>

    <!-- MODAL: Ôn Tự Do (Chọn Chương) -->
    <div class="modal-overlay" id="customPracticeModal">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Ôn Tự Do - Chọn Chương</h3>
          <button class="btn-icon" onclick="App.closeCustomPracticeModal()">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size: 13.5px; color: var(--text-muted);">
            Tick chọn một hoặc nhiều chương để tạo lượt ôn tập kết hợp:
          </p>

          <div style="display: flex; flex-direction: column; gap: 10px;" id="customChaptersCheckboxList">
            <!-- 6 checkboxes -->
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px;">
            <button class="btn btn-outline btn-sm" onclick="App.toggleSelectAllCustomChapters()">Chọn tất cả</button>
            <span style="font-size: 13px; font-weight: 700; color: var(--primary);" id="customTotalQCount">0 câu được chọn</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="App.closeCustomPracticeModal()">Hủy</button>
          <button class="btn btn-primary" onclick="App.startCustomPractice()">Tiếp tục ➔</button>
        </div>
      </div>
    </div>

    <!-- MODAL: Ma Trận Bảng Danh Sách Câu Hỏi -->
    <div class="modal-overlay" id="questionMatrixModal">
      <div class="modal-card" style="max-width: 620px;">
        <div class="modal-header">
          <h3 id="questionMatrixTitle">Danh Sách Câu Hỏi</h3>
          <button class="btn-icon" onclick="App.closeQuestionMatrix()">✕</button>
        </div>
        <div class="modal-body">
          <div class="matrix-legend" id="matrixLegend">
            <div class="legend-item">
              <span class="legend-dot" style="background: var(--success);"></span>
              <span>Đã làm</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: var(--border-color);"></span>
              <span>Chưa làm</span>
            </div>
            <div class="legend-item" id="matrixLegendFlagged">
              <span class="legend-dot" style="background: #f59e0b;"></span>
              <span>🚩 Gắn cờ do dự</span>
            </div>
          </div>
          <div class="question-grid" id="questionMatrixGrid">
            <!-- Grid of 1..N buttons -->
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="App.closeQuestionMatrix()">Đóng</button>
        </div>
      </div>
    </div>

    <!-- MODAL: Generic Confirmation -->
    <div class="modal-overlay" id="confirmModal">
      <div class="modal-card" style="max-width: 460px;">
        <div class="modal-header">
          <h3 id="confirmModalTitle">Xác Nhận</h3>
          <button class="btn-icon" onclick="App.closeConfirmModal()">✕</button>
        </div>
        <div class="modal-body">
          <div id="confirmModalMessage" style="font-size: 15px; color: var(--text-main); line-height: 1.6;"></div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="App.closeConfirmModal()">Hủy / Tiếp tục làm bài</button>
          <button class="btn btn-primary" id="confirmModalActionBtn">Đồng ý</button>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL: NIGHTMARE GAME OVER -->
  <div class="modal-overlay" id="nightmareGameOverModal">
    <div class="modal-card" style="max-width: 540px; border-color: rgba(239, 68, 68, 0.5); box-shadow: 0 10px 40px rgba(239, 68, 68, 0.35);">
      <div class="modal-header" style="background: rgba(239, 68, 68, 0.12); border-bottom-color: rgba(239, 68, 68, 0.3);">
        <h3 style="color: #ef4444; display: flex; align-items: center; gap: 8px;">
          <span>💀</span> BẠN ĐÃ THẤT BẠI TẠI CÂU <span id="nightmareFailQNum">1</span>!
        </h3>
        <button class="btn-icon" onclick="App.exitNightmare()">✕</button>
      </div>
      <div class="modal-body" style="gap: 16px;">
        <div style="background: rgba(239, 68, 68, 0.08); padding: 12px 14px; border-radius: var(--radius-sm); border: 1px dashed rgba(239, 68, 68, 0.3); font-size: 13.5px; color: #ef4444; font-weight: 600;">
          ⚠️ Trong Chế độ Nightmare: Sai đúng 1 câu là phải làm lại từ Câu 1!
        </div>

        <div style="background: var(--bg-subtle); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 14px; line-height: 1.5;" id="nightmareFailQText">
          Nội dung câu hỏi...
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 13.5px;">
          <div style="padding: 10px 14px; border-radius: var(--radius-sm); background: var(--danger-light); color: var(--danger); border: 1px solid var(--danger-border); font-weight: 600;" id="nightmareUserChoiceDisplay">
            ✕ Bạn đã chọn: B
          </div>
          <div style="padding: 10px 14px; border-radius: var(--radius-sm); background: var(--success-light); color: var(--success); border: 1px solid var(--success-border); font-weight: 600;" id="nightmareCorrectChoiceDisplay">
            ✓ Đáp án đúng: A
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 13.5px;">
          <span>🔥 Chuỗi đúng lượt này: <strong id="nightmareSessionStreakNum" style="color: #ef4444;">0</strong> câu</span>
          <span>🏆 Kỷ lục: <strong id="nightmareBestRecordNum">0</strong> câu</span>
        </div>
      </div>
      <div class="modal-footer" style="background: var(--bg-subtle);">
        <button class="btn btn-secondary" onclick="App.exitNightmare()">⬅️ Về Menu</button>
        <button class="btn btn-primary" style="background: linear-gradient(135deg, #ef4444, #991b1b);" onclick="App.restartNightmare()">
          🔄 LÀM LẠI TỪ CÂU 1 (Enter)
        </button>
      </div>
    </div>
  </div>

  <!-- EMBEDDED QUESTION BANK & APP LOGIC -->
  <script>
    // 475 Câu hỏi trắc nghiệm Tư tưởng Hồ Chí Minh
    const ALL_QUESTIONS = ${JSON.stringify(questions)};
    const CHAPTER_NAMES = ${JSON.stringify(chapterNames)};

    // Main App Object
    const App = (function() {
      const STORAGE_KEY = 'hcm_ideology_quiz_v3';

      // ==========================================
      // AUDIO CONTROLLER (SYNTHESIZER SOUND EFFECTS)
      // ==========================================
      const AudioController = (function() {
        let ctx = null;
        function getContext() {
          try {
            if (!ctx) {
              const AudioContextClass = window.AudioContext || window.webkitAudioContext;
              if (AudioContextClass) ctx = new AudioContextClass();
            }
            if (ctx && ctx.state === 'suspended') {
              ctx.resume().catch(() => {});
            }
            return ctx;
          } catch (e) {
            return null;
          }
        }

        function playCorrect() {
          try {
            const audio = getContext();
            if (!audio) return;
            const now = audio.currentTime;
            // 3-note ascending chime: C5 (523.25), E5 (659.25), G5 (783.99), C6 (1046.5)
            const freqs = [523.25, 659.25, 783.99, 1046.5];
            freqs.forEach((f, idx) => {
              const osc = audio.createOscillator();
              const gain = audio.createGain();
              osc.type = 'triangle';
              osc.frequency.setValueAtTime(f, now + idx * 0.065);
              gain.gain.setValueAtTime(0, now + idx * 0.065);
              gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.065 + 0.015);
              gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.065 + 0.28);
              osc.connect(gain);
              gain.connect(audio.destination);
              osc.start(now + idx * 0.065);
              osc.stop(now + idx * 0.065 + 0.29);
            });
          } catch (e) {
            console.warn('Audio play error', e);
          }
        }

        function playWrong() {
          try {
            const audio = getContext();
            if (!audio) return;
            const now = audio.currentTime;
            const osc = audio.createOscillator();
            const gain = audio.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(260, now);
            osc.frequency.exponentialRampToValueAtTime(130, now + 0.28);
            gain.gain.setValueAtTime(0.18, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.29);
            osc.connect(gain);
            gain.connect(audio.destination);
            osc.start(now);
            osc.stop(now + 0.3);
          } catch (e) {
            console.warn('Audio play error', e);
          }
        }

        return { playCorrect, playWrong };
      })();

      let state = {
        theme: 'sakura', // Mặc định mở đầu bằng theme êm dịu Sakura hoặc Light
        themeSettings: {
          customWallpaper: null,
          customOverlayOpacity: 0.35,
          customBlur: 0,
          customTone: 'light',
          enableParticles: true
        },
        nightmareRecords: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0,
          all: 0
        },
        chapterProgress: {
          1: { totalAttempted: 0, totalCorrect: 0 },
          2: { totalAttempted: 0, totalCorrect: 0 },
          3: { totalAttempted: 0, totalCorrect: 0 },
          4: { totalAttempted: 0, totalCorrect: 0 },
          5: { totalAttempted: 0, totalCorrect: 0 },
          6: { totalAttempted: 0, totalCorrect: 0 }
        },
        questionStats: {},
        examHistory: [],
        studySettings: {
          shuffle: true,
          immediateFeedback: true
        }
      };

      // Sessions
      let practiceSession = null;
      let examSession = null;
      let nightmareSession = null;
      let selectedNightmareChapter = 1;
      let examReviewFilter = 'all';

      // ==========================================
      // DATE & TIME HELPERS (VIETNAM TIMEZONE)
      // ==========================================
      function getVietnamDateString(d = new Date()) {
        const parts = new Intl.DateTimeFormat('en-CA', {
          timeZone: 'Asia/Ho_Chi_Minh',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }).formatToParts(d);
        const y = parts.find(p => p.type === 'year').value;
        const m = parts.find(p => p.type === 'month').value;
        const day = parts.find(p => p.type === 'day').value;
        return \`\${y}-\${m}-\${day}\`;
      }

      function getYesterdayVietnamDateString() {
        const now = new Date();
        const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        return getVietnamDateString(yesterday);
      }

      function loadState() {
        try {
          const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('hcm_ideology_quiz_v2') || localStorage.getItem('hcm_ideology_quiz_v1');
          if (saved) {
            const parsed = JSON.parse(saved);
            state = {
              ...state,
              ...parsed,
              themeSettings: {
                ...state.themeSettings,
                ...(parsed.themeSettings || {})
              },
              nightmareRecords: {
                ...state.nightmareRecords,
                ...(parsed.nightmareRecords || {})
              }
            };
          }
        } catch (e) {
          console.warn('Failed to parse local storage', e);
        }

        if (!state.nightmareRecords) {
          state.nightmareRecords = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, all: 0 };
        }

        // Apply theme and background
        applyTheme(state.theme || 'sakura');
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
          console.error('Failed to save to local storage', e);
        }
      }

      // ==========================================
      // THEME & WALLPAPER SYSTEM
      // ==========================================
      const THEME_PRESETS = [
        { id: 'sakura', name: 'Hoa Anh Đào', desc: 'Dịu dàng, cánh hoa rơi', icon: '🌸', color: 'linear-gradient(135deg, #fce7f3, #ffe4e6)' },
        { id: 'rain', name: 'Mưa Êm Đềm', desc: 'Tĩnh lặng, mưa rào mát dịu', icon: '🌧️', color: 'linear-gradient(135deg, #1e293b, #0f172a)' },
        { id: 'winter', name: 'Mùa Đông', desc: 'Băng tuyết trong lành', icon: '❄️', color: 'linear-gradient(135deg, #e0f2fe, #bae6fd)' },
        { id: 'christmas', name: 'Giáng Sinh', desc: 'Ấm cúng, sắc thông & nến', icon: '🎄', color: 'linear-gradient(135deg, #064e3b, #032a1f)' },
        { id: 'vintage', name: 'Trang Sách Cũ', desc: 'Hoài niệm, màu giấy ngà', icon: '📜', color: 'linear-gradient(135deg, #f7f1e1, #f3e9d2)' },
        { id: 'light', name: 'Sáng Tiêu Chuẩn', desc: 'Tối giản, trang nhã', icon: '☀️', color: '#f8fafc' },
        { id: 'dark', name: 'Đêm Tĩnh Lặng', desc: 'Tối slate dịu mắt', icon: '🌙', color: '#0b0f19' }
      ];

      function openThemeModal() {
        renderThemeModal();
        document.getElementById('themePickerModal').classList.add('active');
      }

      function closeThemeModal() {
        document.getElementById('themePickerModal').classList.remove('active');
      }

      function renderThemeModal() {
        const container = document.getElementById('themePresetsContainer');
        container.innerHTML = '';

        THEME_PRESETS.forEach(t => {
          const card = document.createElement('div');
          card.className = 'theme-card-option' + (state.theme === t.id ? ' active' : '');
          card.innerHTML = \`
            <div class="theme-preview-color" style="background: \${t.color};">
              \${t.icon}
            </div>
            <div class="theme-card-title">\${t.name}</div>
            <div class="theme-card-desc">\${t.desc}</div>
          \`;
          card.onclick = () => selectThemePreset(t.id);
          container.appendChild(card);
        });

        // Custom upload state
        const settings = state.themeSettings;
        const uploadPlaceholder = document.getElementById('customUploadPlaceholder');
        const activeRow = document.getElementById('customUploadActiveRow');
        const thumbPreview = document.getElementById('customThumbPreview');
        const removeBtn = document.getElementById('btnRemoveCustomWallpaper');
        const customControls = document.getElementById('customControlsGroup');

        if (settings.customWallpaper) {
          uploadPlaceholder.style.display = 'none';
          activeRow.style.display = 'flex';
          thumbPreview.src = settings.customWallpaper;
          removeBtn.style.display = 'inline-flex';
          customControls.style.display = 'flex';

          document.getElementById('customDimmerSlider').value = Math.round((settings.customOverlayOpacity || 0.35) * 100);
          document.getElementById('customDimmerDisplay').textContent = Math.round((settings.customOverlayOpacity || 0.35) * 100) + '%';

          document.getElementById('customBlurSlider').value = settings.customBlur || 0;
          document.getElementById('customBlurDisplay').textContent = (settings.customBlur || 0) + 'px';

          const tone = settings.customTone || 'light';
          document.getElementById('toneLightBtn').className = 'btn btn-sm ' + (tone === 'light' ? 'btn-primary' : 'btn-outline');
          document.getElementById('toneDarkBtn').className = 'btn btn-sm ' + (tone === 'dark' ? 'btn-primary' : 'btn-outline');
        } else {
          uploadPlaceholder.style.display = 'flex';
          activeRow.style.display = 'none';
          removeBtn.style.display = 'none';
          customControls.style.display = 'none';
        }

        document.getElementById('switchParticlesToggle').checked = settings.enableParticles !== false;
      }

      function selectThemePreset(themeId) {
        state.theme = themeId;
        saveState();
        applyTheme(themeId);
        renderThemeModal();
      }

      function applyTheme(themeName) {
        state.theme = themeName;
        document.documentElement.setAttribute('data-theme', themeName);

        if (themeName === 'custom' && state.themeSettings.customTone) {
          document.documentElement.setAttribute('data-custom-tone', state.themeSettings.customTone);
        } else {
          document.documentElement.removeAttribute('data-custom-tone');
        }

        updateBackgroundLayers();
        renderParticles(themeName);
        updateThemeNavButtonUI();
      }

      function updateBackgroundLayers() {
        const bgLayer = document.getElementById('themeBgLayer');
        const overlayLayer = document.getElementById('themeOverlayLayer');
        if (!bgLayer || !overlayLayer) return;

        const theme = state.theme;
        const settings = state.themeSettings || {};

        bgLayer.style.backgroundImage = 'none';
        bgLayer.style.background = 'none';
        bgLayer.style.filter = 'none';
        overlayLayer.style.backgroundColor = 'transparent';

        if (theme === 'custom' && settings.customWallpaper) {
          bgLayer.style.backgroundImage = \`url("\${settings.customWallpaper}")\`;
          if (settings.customBlur > 0) {
            bgLayer.style.filter = \`blur(\${settings.customBlur}px)\`;
          }
          const opacity = settings.customOverlayOpacity !== undefined ? settings.customOverlayOpacity : 0.35;
          overlayLayer.style.backgroundColor = \`rgba(0, 0, 0, \${opacity})\`;
        } else if (theme === 'sakura') {
          bgLayer.style.background = 'linear-gradient(135deg, #fdf2f8 0%, #fce7f3 40%, #ffe4e6 75%, #fff1f2 100%)';
        } else if (theme === 'rain') {
          bgLayer.style.background = 'linear-gradient(180deg, #0b1120 0%, #111e33 40%, #1e293b 80%, #0f172a 100%)';
          overlayLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        } else if (theme === 'winter') {
          bgLayer.style.background = 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 35%, #f0f9ff 70%, #e2e8f0 100%)';
        } else if (theme === 'christmas') {
          bgLayer.style.background = 'radial-gradient(circle at 50% 15%, #064e3b 0%, #032a1f 65%, #01140e 100%)';
          overlayLayer.style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
        } else if (theme === 'vintage') {
          bgLayer.style.background = 'linear-gradient(180deg, #f7f1e1 0%, #faefe0 50%, #f3e9d2 100%)';
        } else if (theme === 'dark') {
          bgLayer.style.background = '#0b0f19';
        } else {
          bgLayer.style.background = '#f8fafc';
        }
      }

      function renderParticles(theme) {
        const container = document.getElementById('themeParticlesLayer');
        if (!container) return;
        container.innerHTML = '';

        const enabled = state.themeSettings ? state.themeSettings.enableParticles !== false : true;
        if (!enabled) return;

        if (theme === 'sakura') {
          for (let i = 0; i < 18; i++) {
            const p = document.createElement('div');
            p.className = 'particle-sakura';
            p.style.left = Math.random() * 98 + 'vw';
            p.style.animationDuration = (6 + Math.random() * 6) + 's';
            p.style.animationDelay = (Math.random() * 8) + 's';
            const size = 10 + Math.random() * 7;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            container.appendChild(p);
          }
        } else if (theme === 'rain') {
          for (let i = 0; i < 28; i++) {
            const p = document.createElement('div');
            p.className = 'particle-rain';
            p.style.left = Math.random() * 99 + 'vw';
            p.style.animationDuration = (0.7 + Math.random() * 0.7) + 's';
            p.style.animationDelay = (Math.random() * 2) + 's';
            container.appendChild(p);
          }
        } else if (theme === 'winter') {
          const snowChars = ['❄', '❅', '•', '✻'];
          for (let i = 0; i < 22; i++) {
            const p = document.createElement('div');
            p.className = 'particle-snow';
            p.textContent = snowChars[Math.floor(Math.random() * snowChars.length)];
            p.style.left = Math.random() * 98 + 'vw';
            p.style.animationDuration = (7 + Math.random() * 7) + 's';
            p.style.animationDelay = (Math.random() * 7) + 's';
            p.style.fontSize = (12 + Math.random() * 11) + 'px';
            container.appendChild(p);
          }
        } else if (theme === 'christmas') {
          for (let i = 0; i < 14; i++) {
            const p = document.createElement('div');
            p.className = 'particle-sparkle';
            p.style.left = Math.random() * 96 + 'vw';
            p.style.top = Math.random() * 90 + 'vh';
            p.style.animationDuration = (2 + Math.random() * 3) + 's';
            p.style.animationDelay = (Math.random() * 3) + 's';
            container.appendChild(p);
          }
        }
      }

      function updateThemeNavButtonUI() {
        const label = document.getElementById('themePickerLabel');
        if (!label) return;
        const map = {
          sakura: '🌸 Anh đào',
          rain: '🌧️ Mưa êm',
          winter: '❄️ Mùa đông',
          christmas: '🎄 Giáng sinh',
          vintage: '📜 Sách cũ',
          light: '☀️ Sáng',
          dark: '🌙 Tối',
          custom: '🖼️ Tự chọn'
        };
        label.textContent = map[state.theme] || 'Đổi nền';
      }

      function onCustomWallpaperFileSelected(file) {
        if (!file) return;
        if (!file.type.startsWith('image/')) {
          alert('Vui lòng chọn một tệp hình ảnh (PNG, JPG, WEBP)!');
          return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
          const img = new Image();
          img.onload = function() {
            const canvas = document.createElement('canvas');
            let w = img.width;
            let h = img.height;
            const maxDim = 1440;
            if (w > maxDim || h > maxDim) {
              if (w > h) {
                h = Math.round((h * maxDim) / w);
                w = maxDim;
              } else {
                w = Math.round((w * maxDim) / h);
                h = maxDim;
              }
            }
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, w, h);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.82);

            state.themeSettings.customWallpaper = dataUrl;
            state.theme = 'custom';
            saveState();
            applyTheme('custom');
            renderThemeModal();
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      }

      function removeCustomWallpaper() {
        state.themeSettings.customWallpaper = null;
        state.theme = 'sakura';
        saveState();
        applyTheme('sakura');
        renderThemeModal();
      }

      function onCustomDimmerChange(val) {
        const opacity = parseFloat(val) / 100;
        state.themeSettings.customOverlayOpacity = opacity;
        document.getElementById('customDimmerDisplay').textContent = val + '%';
        saveState();
        updateBackgroundLayers();
      }

      function onCustomBlurChange(val) {
        const blurPx = parseInt(val);
        state.themeSettings.customBlur = blurPx;
        document.getElementById('customBlurDisplay').textContent = blurPx + 'px';
        saveState();
        updateBackgroundLayers();
      }

      function setCustomTone(tone) {
        state.themeSettings.customTone = tone;
        saveState();
        applyTheme(state.theme);
        renderThemeModal();
      }

      function toggleParticles(enabled) {
        state.themeSettings.enableParticles = enabled;
        saveState();
        renderParticles(state.theme);
      }

      // ==========================================
      // CHẾ ĐỘ NIGHTMARE (ÁC MỘNG) - SINH TỒN
      // ==========================================
      function openNightmareSetup() {
        navigateTo('nightmare-setup');
        renderNightmareChapterSelection();
      }

      function renderNightmareChapterSelection() {
        const grid = document.getElementById('nightmareChapterSelectionGrid');
        if (!grid) return;
        grid.innerHTML = '';

        const chapters = [1, 2, 3, 4, 5, 6, 'all'];
        chapters.forEach(ch => {
          let name = '';
          let count = 0;
          if (ch === 'all') {
            name = 'Tất cả 6 chương (Thử thách Địa Ngục)';
            count = ALL_QUESTIONS.length;
          } else {
            name = \`Chương \${ch}: \${CHAPTER_NAMES[ch]}\`;
            count = ALL_QUESTIONS.filter(q => q.chuong === ch).length;
          }

          const best = (state.nightmareRecords && state.nightmareRecords[ch]) || 0;
          const isSelected = selectedNightmareChapter === ch;
          const isConquered = count > 0 && best >= count;

          const card = document.createElement('div');
          card.className = \`nightmare-chapter-card \${isSelected ? 'selected' : ''}\`;
          card.onclick = () => {
            selectedNightmareChapter = ch;
            renderNightmareChapterSelection();
          };

          card.innerHTML = \`
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
              <span style="font-size: 14.5px; font-weight: 800; color: var(--text-main); line-height: 1.4;">\${name}</span>
              <span class="badge" style="background: rgba(239, 68, 68, 0.15); color: #ef4444; flex-shrink: 0;">\${count} câu</span>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; font-size: 13px;">
              <span style="color: var(--text-muted);">
                \${isConquered ? '<strong style="color:#eab308;">🏆 ĐÃ CHINH PHỤC (100%)</strong>' : \`Kỷ lục: <strong style="color:#ef4444;">\${best}</strong> / \${count} câu\`}
              </span>
              <span style="color: #ef4444; font-weight: 700;">\${isSelected ? '● Đang chọn' : 'Chọn'}</span>
            </div>
          \`;
          grid.appendChild(card);
        });
      }

      function startNightmare() {
        let rawList = [];
        if (selectedNightmareChapter === 'all') {
          rawList = [...ALL_QUESTIONS];
        } else {
          rawList = ALL_QUESTIONS.filter(q => q.chuong === selectedNightmareChapter);
        }

        if (rawList.length === 0) return;

        const shuffleToggle = document.getElementById('nightmareShuffleToggle');
        const shuffleOn = shuffleToggle ? shuffleToggle.checked : true;
        const preparedQs = prepareQuestions(rawList, shuffleOn, shuffleOn);

        nightmareSession = {
          chapter: selectedNightmareChapter,
          questions: preparedQs,
          currentIndex: 0,
          pendingChosen: null,
          isConfirmed: false,
          currentStreak: 0
        };

        navigateTo('nightmare-taking');
        renderNightmareQuestion();
      }

      function renderNightmareQuestion() {
        if (!nightmareSession) return;
        const { questions, currentIndex, currentStreak, chapter } = nightmareSession;
        const q = questions[currentIndex];
        if (!q) return;

        document.getElementById('nightmareProgressText').textContent = \`Câu \${currentIndex + 1}/\${questions.length}\`;
        const chName = chapter === 'all' ? 'Tất cả 6 chương' : \`Chương \${chapter}\`;
        document.getElementById('nightmareChapterTag').textContent = chName;
        document.getElementById('nightmareLiveStreakBadge').innerHTML = \`🔥 Chuỗi: \${currentStreak} câu đúng\`;

        const best = (state.nightmareRecords && state.nightmareRecords[chapter]) || 0;
        document.getElementById('nightmareBestRecordText').textContent = \`🏆 Kỷ lục: \${best} câu\`;

        document.getElementById('nightmareQuestionText').textContent = \`Câu \${currentIndex + 1}. \${q.cauHoi}\`;

        const optionsList = document.getElementById('nightmareOptionsList');
        optionsList.innerHTML = '';
        const letters = ['A', 'B', 'C', 'D'];

        letters.forEach((letter, idx) => {
          const btn = document.createElement('button');
          btn.className = 'option-btn';

          if (nightmareSession.isConfirmed) {
            if (letter === q.dung) {
              btn.classList.add('correct');
            } else if (letter === nightmareSession.pendingChosen) {
              btn.classList.add('wrong');
            }
          } else {
            if (letter === nightmareSession.pendingChosen) {
              btn.classList.add('selected');
            }
          }

          btn.innerHTML = \`
            <span class="option-key-badge">\${idx + 1}</span>
            <span class="option-letter">\${letter}</span>
            <span class="option-text">\${q.dapAn[idx]}</span>
          \`;

          btn.onclick = () => onSelectNightmareOption(letter);
          optionsList.appendChild(btn);
        });

        const nextBtn = document.getElementById('nightmareNextBtn');
        const enterHint = document.getElementById('nightmareKeyboardEnterHint');
        const isLast = currentIndex === questions.length - 1;

        if (!nightmareSession.isConfirmed) {
          nextBtn.textContent = 'Xác nhận đáp án ↵';
          nextBtn.disabled = !nightmareSession.pendingChosen;
          if (nightmareSession.pendingChosen) {
            enterHint.innerHTML = 'Nhấn <strong>Enter</strong>: <strong style="color:#ef4444;">Xác nhận đáp án ↵</strong>';
          } else {
            enterHint.innerHTML = 'Phím <strong>1, 2, 3, 4</strong> để chọn • Nhấn <strong>Enter</strong> xác nhận';
          }
        } else {
          nextBtn.textContent = isLast ? 'Hoàn thành thử thách 🏆' : 'Câu tiếp theo ➡️';
          nextBtn.disabled = false;
          enterHint.innerHTML = '🎉 Chính xác! Nhấn <strong>Enter</strong>: Sang câu tiếp theo ➔';
        }
      }

      function onSelectNightmareOption(letter) {
        if (!nightmareSession) return;
        if (nightmareSession.isConfirmed) return;

        nightmareSession.pendingChosen = letter;
        renderNightmareQuestion();
      }

      function confirmNightmareAnswer() {
        if (!nightmareSession) return;
        const { questions, currentIndex, chapter } = nightmareSession;
        const q = questions[currentIndex];
        if (!q) return;

        const letter = nightmareSession.pendingChosen;
        if (!letter || nightmareSession.isConfirmed) return;

        nightmareSession.isConfirmed = true;
        const isCorrect = letter === q.dung;

        if (isCorrect) {
          AudioController.playCorrect();
          nightmareSession.currentStreak++;

          if (!state.nightmareRecords) state.nightmareRecords = {};
          if (nightmareSession.currentStreak > (state.nightmareRecords[chapter] || 0)) {
            state.nightmareRecords[chapter] = nightmareSession.currentStreak;
            saveState();
          }

          renderNightmareQuestion();

          if (currentIndex === questions.length - 1) {
            setTimeout(() => {
              showNightmareVictory();
            }, 600);
          }
        } else {
          AudioController.playWrong();
          renderNightmareQuestion();

          setTimeout(() => {
            showNightmareGameOver(q, letter);
          }, 350);
        }
      }

      function nextNightmareQuestion() {
        if (!nightmareSession) return;
        if (nightmareSession.pendingChosen && !nightmareSession.isConfirmed) {
          confirmNightmareAnswer();
          return;
        }

        if (!nightmareSession.isConfirmed) return;

        if (nightmareSession.currentIndex < nightmareSession.questions.length - 1) {
          nightmareSession.currentIndex++;
          nightmareSession.pendingChosen = null;
          nightmareSession.isConfirmed = false;
          renderNightmareQuestion();
        } else {
          showNightmareVictory();
        }
      }

      function onNightmareNextClick() {
        nextNightmareQuestion();
      }

      function showNightmareGameOver(q, wrongLetter) {
        if (!nightmareSession) return;
        const { currentIndex, currentStreak, chapter } = nightmareSession;

        const correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.dung);
        const wrongIdx = ['A', 'B', 'C', 'D'].indexOf(wrongLetter);

        document.getElementById('nightmareFailQNum').textContent = currentIndex + 1;
        document.getElementById('nightmareFailQText').textContent = \`Câu \${currentIndex + 1}. \${q.cauHoi}\`;
        document.getElementById('nightmareUserChoiceDisplay').innerHTML = \`✕ Bạn đã chọn: <strong>[\${wrongLetter}]</strong> \${wrongIdx >= 0 ? q.dapAn[wrongIdx] : ''}\`;
        document.getElementById('nightmareCorrectChoiceDisplay').innerHTML = \`✓ Đáp án đúng là: <strong>[\${q.dung}]</strong> \${correctIdx >= 0 ? q.dapAn[correctIdx] : ''}\`;

        document.getElementById('nightmareSessionStreakNum').textContent = currentStreak;
        const best = (state.nightmareRecords && state.nightmareRecords[chapter]) || 0;
        document.getElementById('nightmareBestRecordNum').textContent = best;

        document.getElementById('nightmareGameOverModal').classList.add('active');
      }

      function restartNightmare() {
        document.getElementById('nightmareGameOverModal').classList.remove('active');
        startNightmare();
      }

      function exitNightmare() {
        document.getElementById('nightmareGameOverModal').classList.remove('active');
        navigateTo('menu');
      }

      function showNightmareVictory() {
        if (!nightmareSession) return;
        const { questions, chapter } = nightmareSession;
        document.getElementById('nightmareVictoryTotalStat').textContent = questions.length;
        const chName = chapter === 'all' ? 'Tất cả 6 chương' : \`Chương \${chapter}\`;
        document.getElementById('nightmareVictorySubtitle').textContent = \`Bạn đã hoàn thành xuất sắc toàn bộ \${questions.length} câu hỏi của \${chName} với 100% độ chính xác mà KHÔNG SAI DÙ CHỈ 1 CÂU NÀO!\`;
        navigateTo('nightmare-victory');
      }

      function handleNightmareKeydown(e) {
        if (!nightmareSession) return;

        const gameOverModal = document.getElementById('nightmareGameOverModal');
        if (gameOverModal && gameOverModal.classList.contains('active')) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            restartNightmare();
          }
          return;
        }

        const key = e.key;
        let chosenLetter = null;
        if (key === '1' || key === 'a' || key === 'A') chosenLetter = 'A';
        else if (key === '2' || key === 'b' || key === 'B') chosenLetter = 'B';
        else if (key === '3' || key === 'c' || key === 'C') chosenLetter = 'C';
        else if (key === '4' || key === 'd' || key === 'D') chosenLetter = 'D';

        if (chosenLetter) {
          e.preventDefault();
          onSelectNightmareOption(chosenLetter);
          return;
        }

        if (key === 'Enter') {
          e.preventDefault();
          nextNightmareQuestion();
          return;
        }
      }

      // ==========================================
      // NAVIGATION
      // ==========================================
      function navigateTo(viewId) {
        document.querySelectorAll('.view-section').forEach(sec => {
          sec.classList.remove('active');
        });

        const target = document.getElementById('view-' + viewId);
        if (target) {
          target.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        if (viewId === 'practice-menu') {
          renderPracticeChaptersGrid();
        } else if (viewId === 'exam-setup') {
          initExamSetupView();
        } else if (viewId === 'mastery-analytics') {
          renderMasteryAnalytics();
        } else if (viewId === 'nightmare-setup') {
          renderNightmareChapterSelection();
        }
      }

      // ==========================================
      // UTILITY: SHUFFLE & PREPARE QUESTIONS
      // ==========================================
      function shuffleArray(array) {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }

      function prepareQuestions(rawQuestions, shouldShuffleQuestions, shouldShuffleAnswers) {
        let list = rawQuestions.map(q => {
          let dapAnList = [...q.dapAn];
          let correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.dung);
          let correctAnswerText = dapAnList[correctIndex];

          if (shouldShuffleAnswers) {
            dapAnList = shuffleArray(dapAnList);
            let newCorrectIndex = dapAnList.indexOf(correctAnswerText);
            let newLetter = ['A', 'B', 'C', 'D'][newCorrectIndex];
            return {
              id: q.id,
              chuong: q.chuong,
              cauHoi: q.cauHoi,
              dapAn: dapAnList,
              dung: newLetter,
              originalCorrectLetter: q.dung
            };
          } else {
            return {
              id: q.id,
              chuong: q.chuong,
              cauHoi: q.cauHoi,
              dapAn: dapAnList,
              dung: q.dung,
              originalCorrectLetter: q.dung
            };
          }
        });

        if (shouldShuffleQuestions) {
          list = shuffleArray(list);
        }

        return list;
      }

      // ==========================================
      // SECTION 1: PRACTICE (ÔN TẬP)
      // ==========================================
      let pendingPracticeTarget = null;
      let selectedCustomChapters = [1, 2];

      function renderPracticeChaptersGrid() {
        const grid = document.getElementById('practiceChaptersGrid');
        grid.innerHTML = '';

        for (let ch = 1; ch <= 6; ch++) {
          const chQuestions = ALL_QUESTIONS.filter(q => q.chuong === ch);
          const totalQ = chQuestions.length;

          let answeredUnique = 0;
          let correctUnique = 0;
          chQuestions.forEach(q => {
            const st = state.questionStats[q.id];
            if (st && st.attempts > 0) {
              answeredUnique++;
              if (st.correct > 0) correctUnique++;
            }
          });

          const pct = totalQ > 0 ? Math.round((answeredUnique / totalQ) * 100) : 0;
          const accuracyPct = answeredUnique > 0 ? Math.round((correctUnique / answeredUnique) * 100) : 0;

          const card = document.createElement('div');
          card.className = 'chapter-card';
          card.innerHTML = \`
            <div class="chapter-header">
              <span class="chapter-tag">Chương \${ch}</span>
              <span style="font-size: 13px; font-weight: 700; color: var(--text-muted);">\${totalQ} câu</span>
            </div>
            <div class="chapter-title">\${CHAPTER_NAMES[ch]}</div>
            <div class="progress-bar-track">
              <div class="progress-bar-fill" style="width: \${pct}%;"></div>
            </div>
            <div class="chapter-stats-row">
              <span>Đã làm: <strong>\${answeredUnique}/\${totalQ}</strong> câu (\${pct}%)</span>
              <span>Đúng: <strong>\${accuracyPct}%</strong></span>
            </div>
            <button class="btn btn-primary btn-sm" style="margin-top: 4px;" onclick="App.openPracticeSettings(\${ch})">
              Ôn chương này ➔
            </button>
          \`;
          grid.appendChild(card);
        }
      }

      function openPracticeSettings(target) {
        pendingPracticeTarget = target;
        const modal = document.getElementById('practiceSettingsModal');
        const title = document.getElementById('practiceSettingsTitle');

        if (target === 'all') {
          title.textContent = 'Cấu Hình Ôn Tất Cả (475 Câu)';
        } else if (typeof target === 'number') {
          title.textContent = \`Cấu Hình Ôn Chương \${target} (\${ALL_QUESTIONS.filter(q => q.chuong === target).length} câu)\`;
        } else if (target === 'custom') {
          title.textContent = 'Cấu Hình Ôn Tự Do (Nhiều Chương)';
        }

        document.getElementById('switchShuffle').checked = state.studySettings.shuffle;
        document.getElementById('switchImmediateFeedback').checked = state.studySettings.immediateFeedback;

        modal.classList.add('active');
      }

      function closePracticeSettingsModal() {
        document.getElementById('practiceSettingsModal').classList.remove('active');
      }

      function confirmStartPractice() {
        const shuffle = document.getElementById('switchShuffle').checked;
        const immediateFeedback = document.getElementById('switchImmediateFeedback').checked;

        state.studySettings.shuffle = shuffle;
        state.studySettings.immediateFeedback = immediateFeedback;
        saveState();

        closePracticeSettingsModal();
        startPractice(pendingPracticeTarget);
      }

      function openCustomPracticeModal() {
        const modal = document.getElementById('customPracticeModal');
        const list = document.getElementById('customChaptersCheckboxList');
        list.innerHTML = '';

        for (let ch = 1; ch <= 6; ch++) {
          const count = ALL_QUESTIONS.filter(q => q.chuong === ch).length;
          const isChecked = selectedCustomChapters.includes(ch);

          const item = document.createElement('label');
          item.style.cssText = 'display: flex; align-items: center; gap: 12px; padding: 10px 14px; background: var(--bg-subtle); border-radius: var(--radius-md); cursor: pointer; font-size: 14px;';
          item.innerHTML = \`
            <input type="checkbox" value="\${ch}" \${isChecked ? 'checked' : ''} onchange="App.onCustomChapterCheck(this)" style="width: 18px; height: 18px; accent-color: var(--primary);">
            <div style="flex: 1;">
              <strong>Chương \${ch}:</strong> \${CHAPTER_NAMES[ch]} (\${count} câu)
            </div>
          \`;
          list.appendChild(item);
        }

        updateCustomSelectedCount();
        modal.classList.add('active');
      }

      function closeCustomPracticeModal() {
        document.getElementById('customPracticeModal').classList.remove('active');
      }

      function onCustomChapterCheck() {
        const boxes = document.querySelectorAll('#customChaptersCheckboxList input[type="checkbox"]');
        selectedCustomChapters = [];
        boxes.forEach(b => {
          if (b.checked) selectedCustomChapters.push(parseInt(b.value));
        });
        updateCustomSelectedCount();
      }

      function updateCustomSelectedCount() {
        const total = ALL_QUESTIONS.filter(q => selectedCustomChapters.includes(q.chuong)).length;
        document.getElementById('customTotalQCount').textContent = \`\${total} câu được chọn\`;
      }

      function toggleSelectAllCustomChapters() {
        const boxes = document.querySelectorAll('#customChaptersCheckboxList input[type="checkbox"]');
        const allChecked = selectedCustomChapters.length === 6;
        boxes.forEach(b => {
          b.checked = !allChecked;
        });
        selectedCustomChapters = allChecked ? [] : [1, 2, 3, 4, 5, 6];
        updateCustomSelectedCount();
      }

      function startCustomPractice() {
        if (selectedCustomChapters.length === 0) {
          alert('Vui lòng chọn ít nhất 1 chương để bắt đầu!');
          return;
        }
        closeCustomPracticeModal();
        openPracticeSettings('custom');
      }

      function startPractice(target, customQuestionsList = null) {
        let rawList = [];

        if (customQuestionsList) {
          rawList = customQuestionsList;
        } else if (target === 'all') {
          rawList = ALL_QUESTIONS;
        } else if (typeof target === 'number') {
          rawList = ALL_QUESTIONS.filter(q => q.chuong === target);
        } else if (target === 'custom') {
          rawList = ALL_QUESTIONS.filter(q => selectedCustomChapters.includes(q.chuong));
        }

        if (rawList.length === 0) {
          alert('Không có câu hỏi nào để ôn tập!');
          return;
        }

        const finalQuestions = prepareQuestions(
          rawList,
          state.studySettings.shuffle,
          state.studySettings.shuffle
        );

        practiceSession = {
          target,
          questions: finalQuestions,
          currentIndex: 0,
          userAnswers: {},
          wrongQuestionIds: [],
          pendingChosen: null,
          isConfirmed: false
        };

        navigateTo('practice-taking');
        renderPracticeCurrentQuestion();
      }

      function renderPracticeCurrentQuestion() {
        if (!practiceSession) return;
        const { questions, currentIndex, userAnswers } = practiceSession;
        const q = questions[currentIndex];
        if (!q) return;

        document.getElementById('practiceProgressText').textContent = \`Câu \${currentIndex + 1}/\${questions.length}\`;
        document.getElementById('practiceChapterTag').textContent = \`Chương \${q.chuong}: \${CHAPTER_NAMES[q.chuong]}\`;
        document.getElementById('practiceQuestionText').textContent = \`Câu \${currentIndex + 1}. \${q.cauHoi}\`;

        const feedbackHint = document.getElementById('practiceFeedbackModeHint');
        if (state.studySettings.immediateFeedback) {
          feedbackHint.textContent = 'Hiện đáp án sau khi xác nhận';
        } else {
          feedbackHint.textContent = 'Ghi nhận lựa chọn (không báo đúng sai ngay)';
        }

        const optionsList = document.getElementById('practiceOptionsList');
        optionsList.innerHTML = '';

        const currentAnswer = userAnswers[currentIndex];
        const letters = ['A', 'B', 'C', 'D'];

        letters.forEach((letter, idx) => {
          const btn = document.createElement('button');
          btn.className = 'option-btn';

          if (practiceSession.isConfirmed && currentAnswer) {
            if (state.studySettings.immediateFeedback) {
              if (letter === q.dung) {
                btn.classList.add('correct');
              } else if (letter === currentAnswer.chosen) {
                btn.classList.add('wrong');
              }
            } else {
              if (letter === currentAnswer.chosen) {
                btn.classList.add('selected');
              }
            }
          } else {
            if (letter === practiceSession.pendingChosen) {
              btn.classList.add('selected');
            }
          }

          btn.innerHTML = \`
            <span class="option-key-badge">\${idx + 1}</span>
            <span class="option-letter">\${letter}</span>
            <span class="option-text">\${q.dapAn[idx]}</span>
          \`;

          btn.onclick = () => onSelectPracticeOption(letter);
          optionsList.appendChild(btn);
        });

        document.getElementById('practicePrevBtn').disabled = currentIndex === 0;

        const nextBtn = document.getElementById('practiceNextBtn');
        const isLast = currentIndex === questions.length - 1;

        if (!practiceSession.isConfirmed) {
          nextBtn.textContent = 'Xác nhận đáp án ↵';
          nextBtn.disabled = !practiceSession.pendingChosen;
        } else if (isLast) {
          nextBtn.textContent = 'Xem kết quả 🏁';
          nextBtn.disabled = false;
        } else {
          nextBtn.textContent = 'Câu tiếp theo ➡️';
          nextBtn.disabled = false;
        }

        const enterHint = document.getElementById('practiceKeyboardEnterHint');
        if (enterHint) {
          if (!practiceSession.isConfirmed) {
            if (practiceSession.pendingChosen) {
              enterHint.innerHTML = 'Nhấn <strong>Enter</strong>: <strong style="color:var(--primary);">Xác nhận câu trả lời ↵</strong> (Enter tiếp để qua câu)';
            } else {
              enterHint.innerHTML = 'Phím <strong>1, 2, 3, 4</strong> để chọn • Nhấn <strong>Enter</strong> để xác nhận';
            }
          } else {
            if (state.studySettings.immediateFeedback) {
              const prefix = currentAnswer && currentAnswer.isCorrect ? '🎉 Chính xác! ' : '❌ Chưa đúng. ';
              enterHint.innerHTML = prefix + 'Nhấn <strong>Enter</strong>: Sang câu tiếp theo ➔';
            } else {
              enterHint.innerHTML = '✅ Đã xác nhận! Nhấn <strong>Enter</strong>: Sang câu tiếp theo ➔';
            }
          }
        }
      }

      function onSelectPracticeOption(letter) {
        if (!practiceSession) return;
        if (practiceSession.isConfirmed) return; // Answer locked until next question

        practiceSession.pendingChosen = letter;
        renderPracticeCurrentQuestion();
      }

      function confirmPracticeAnswer() {
        if (!practiceSession) return;
        const { questions, currentIndex, userAnswers } = practiceSession;
        const q = questions[currentIndex];
        if (!q) return;

        const letter = practiceSession.pendingChosen;
        if (!letter || practiceSession.isConfirmed) return;

        const isCorrect = letter === q.dung;
        userAnswers[currentIndex] = { chosen: letter, isCorrect };
        practiceSession.isConfirmed = true;

        recordQuestionStat(q, letter, isCorrect);
        saveState();

        if (isCorrect) {
          AudioController.playCorrect();
        }

        renderPracticeCurrentQuestion();
      }

      function recordQuestionStat(q, letter, isCorrect) {
        if (!state.questionStats[q.id]) {
          state.questionStats[q.id] = { attempts: 0, correct: 0, wrong: 0, lastResult: '', lastDate: '' };
        }
        const qStat = state.questionStats[q.id];
        qStat.attempts++;
        if (isCorrect) {
          qStat.correct++;
          qStat.lastResult = 'correct';
        } else {
          qStat.wrong++;
          qStat.lastResult = 'wrong';
          if (!practiceSession.wrongQuestionIds.includes(q.id)) {
            practiceSession.wrongQuestionIds.push(q.id);
          }
        }
        qStat.lastDate = getVietnamDateString();

        if (!state.chapterProgress[q.chuong]) {
          state.chapterProgress[q.chuong] = { totalAttempted: 0, totalCorrect: 0 };
        }
        state.chapterProgress[q.chuong].totalAttempted++;
        if (isCorrect) state.chapterProgress[q.chuong].totalCorrect++;
      }

      function prevPracticeQuestion() {
        if (!practiceSession || practiceSession.currentIndex <= 0) return;
        practiceSession.currentIndex--;
        const existing = practiceSession.userAnswers[practiceSession.currentIndex];
        if (existing) {
          practiceSession.pendingChosen = existing.chosen;
          practiceSession.isConfirmed = true;
        } else {
          practiceSession.pendingChosen = null;
          practiceSession.isConfirmed = false;
        }
        renderPracticeCurrentQuestion();
      }

      function nextPracticeQuestion() {
        if (!practiceSession) return;
        // Enter 1: confirm answer if chosen
        if (practiceSession.pendingChosen && !practiceSession.isConfirmed) {
          confirmPracticeAnswer();
          return;
        }

        // Don't advance if no answer selected yet
        if (!practiceSession.isConfirmed) {
          return;
        }

        // Enter 2: advance to next question
        if (practiceSession.currentIndex < practiceSession.questions.length - 1) {
          practiceSession.currentIndex++;
          const existing = practiceSession.userAnswers[practiceSession.currentIndex];
          if (existing) {
            practiceSession.pendingChosen = existing.chosen;
            practiceSession.isConfirmed = true;
          } else {
            practiceSession.pendingChosen = null;
            practiceSession.isConfirmed = false;
          }
          renderPracticeCurrentQuestion();
        } else {
          finishPractice();
        }
      }

      function onPracticeNextClick() {
        nextPracticeQuestion();
      }

      function handlePracticeKeydown(e) {
        if (!practiceSession) return;
        const key = e.key;

        let chosenLetter = null;
        if (key === '1' || key === 'a' || key === 'A') chosenLetter = 'A';
        else if (key === '2' || key === 'b' || key === 'B') chosenLetter = 'B';
        else if (key === '3' || key === 'c' || key === 'C') chosenLetter = 'C';
        else if (key === '4' || key === 'd' || key === 'D') chosenLetter = 'D';

        if (chosenLetter) {
          e.preventDefault();
          onSelectPracticeOption(chosenLetter);
          return;
        }

        if (key === 'Enter') {
          e.preventDefault();
          nextPracticeQuestion();
          return;
        }

        if (key === 'ArrowLeft') {
          e.preventDefault();
          prevPracticeQuestion();
          return;
        }

        if (key === 'ArrowRight') {
          e.preventDefault();
          nextPracticeQuestion();
          return;
        }
      }

      function handleGlobalKeydown(e) {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select') {
          return;
        }

        if (e.key === 'Escape') {
          closeCustomPracticeModal();
          closePracticeSettingsModal();
          closeThemeModal();
          closeQuestionMatrix();
          closeConfirmModal();
          const nmModal = document.getElementById('nightmareGameOverModal');
          if (nmModal) nmModal.classList.remove('active');
          return;
        }

        const nightmareView = document.getElementById('view-nightmare-taking');
        if (nightmareView && nightmareView.classList.contains('active')) {
          handleNightmareKeydown(e);
          return;
        }

        const openModal = document.querySelector('.modal-overlay.active');
        if (openModal) {
          return;
        }

        const practiceView = document.getElementById('view-practice-taking');
        if (practiceView && practiceView.classList.contains('active')) {
          handlePracticeKeydown(e);
        }
      }

      function finishPracticeEarly() {
        showConfirmModal(
          'Kết thúc lượt ôn tập?',
          'Bạn có muốn kết thúc và xem thống kê kết quả các câu đã làm không?',
          () => finishPractice()
        );
      }

      function confirmExitPractice() {
        showConfirmModal(
          'Thoát ôn tập?',
          'Tiến độ của các câu đã làm vẫn sẽ được lưu lại. Bạn có chắc chắn muốn quay về Menu?',
          () => navigateTo('menu')
        );
      }

      function finishPractice() {
        if (!practiceSession) return;

        const { questions, userAnswers, wrongQuestionIds } = practiceSession;
        let totalAnswered = Object.keys(userAnswers).length;
        let correctCount = 0;
        let wrongCount = 0;

        Object.values(userAnswers).forEach(ans => {
          if (ans.isCorrect) correctCount++;
          else wrongCount++;
        });

        document.getElementById('practiceTotalStat').textContent = questions.length;
        document.getElementById('practiceCorrectStat').textContent = correctCount;
        document.getElementById('practiceWrongStat').textContent = wrongCount;
        const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
        document.getElementById('practiceAccuracyStat').textContent = accuracy + '%';

        const retryBtn = document.getElementById('practiceRetryWrongBtn');
        document.getElementById('retryWrongCountText').textContent = wrongQuestionIds.length;
        if (wrongQuestionIds.length === 0) {
          retryBtn.style.display = 'none';
        } else {
          retryBtn.style.display = 'inline-flex';
        }

        navigateTo('practice-result');
      }

      function retryWrongQuestions() {
        if (!practiceSession || practiceSession.wrongQuestionIds.length === 0) return;
        const wrongIds = [...practiceSession.wrongQuestionIds];
        const wrongQs = ALL_QUESTIONS.filter(q => wrongIds.includes(q.id));

        startPractice('retry', wrongQs);
      }

      // ============================================================
      // SECTION 2: EXAM (KIỂM TRA) - 10 QUESTIONS/PAGE & FLAGS
      // ============================================================
      let examSettings = {
        questionCount: 60,
        timeMinutes: 50,
        chapterRatios: {
          1: 15,
          2: 15,
          3: 20,
          4: 20,
          5: 10,
          6: 20
        }
      };

      function initExamSetupView() {
        document.getElementById('examQCountSlider').value = examSettings.questionCount;
        document.getElementById('examQCountDisplay').textContent = examSettings.questionCount + ' câu';

        document.getElementById('examTimeSlider').value = examSettings.timeMinutes;
        document.getElementById('examTimeDisplay').textContent = examSettings.timeMinutes + ' phút';

        renderExamRatioInputs();
      }

      function onExamQuestionCountChange(val) {
        val = parseInt(val);
        examSettings.questionCount = val;
        document.getElementById('examQCountDisplay').textContent = val + ' câu';
        renderExamRatioInputs();
      }

      function onExamTimeChange(val) {
        val = parseInt(val);
        examSettings.timeMinutes = val;
        document.getElementById('examTimeDisplay').textContent = val + ' phút';
      }

      function renderExamRatioInputs() {
        const grid = document.getElementById('examRatioGrid');
        grid.innerHTML = '';

        let totalPct = 0;
        for (let c = 1; c <= 6; c++) {
          totalPct += examSettings.chapterRatios[c] || 0;
        }

        const badge = document.getElementById('examRatioSumBadge');
        badge.textContent = \`Tổng: \${totalPct}%\`;
        if (totalPct === 100) {
          badge.style.background = 'var(--success-light)';
          badge.style.color = 'var(--success)';
          document.getElementById('startExamBtn').disabled = false;
        } else {
          badge.style.background = 'var(--danger-light)';
          badge.style.color = 'var(--danger)';
          document.getElementById('startExamBtn').disabled = true;
        }

        const totalQ = examSettings.questionCount;
        const allocated = {};
        let sumQ = 0;
        for (let c = 1; c <= 6; c++) {
          const ratio = examSettings.chapterRatios[c] || 0;
          allocated[c] = Math.round((ratio / 100) * totalQ);
          sumQ += allocated[c];
        }

        let diff = totalQ - sumQ;
        if (diff !== 0) allocated[3] += diff;

        for (let c = 1; c <= 6; c++) {
          const ratio = examSettings.chapterRatios[c] || 0;
          const qCount = allocated[c];
          const maxAvailable = ALL_QUESTIONS.filter(q => q.chuong === c).length;

          const box = document.createElement('div');
          box.className = 'chapter-slider-item';
          box.innerHTML = \`
            <div style="display: flex; justify-content: space-between; font-size: 13.5px; font-weight: 700;">
              <span>Chương \${c}: \${CHAPTER_NAMES[c].substring(0, 30)}...</span>
              <span style="color: var(--primary);">\${ratio}% (\${qCount} câu)</span>
            </div>
            <input type="range" min="0" max="60" step="5" value="\${ratio}" class="form-range" oninput="App.onChapterRatioChange(\${c}, this.value)">
            <div style="font-size: 11.5px; color: var(--text-muted); display: flex; justify-content: space-between;">
              <span>Tối đa ngân hàng: \${maxAvailable} câu</span>
              \${qCount > maxAvailable ? '<span style="color: var(--danger); font-weight: 700;">⚠️ Thiếu câu (sẽ bù)</span>' : ''}
            </div>
          \`;
          grid.appendChild(box);
        }
      }

      function onChapterRatioChange(chapter, val) {
        val = parseInt(val);
        examSettings.chapterRatios[chapter] = val;
        renderExamRatioInputs();
      }

      function resetExamRatioEven() {
        examSettings.chapterRatios = {
          1: 15,
          2: 15,
          3: 20,
          4: 20,
          5: 10,
          6: 20
        };
        renderExamRatioInputs();
      }

      function startExam() {
        const totalQ = examSettings.questionCount;

        const allocated = {};
        let sumQ = 0;
        for (let c = 1; c <= 6; c++) {
          const ratio = examSettings.chapterRatios[c] || 0;
          allocated[c] = Math.round((ratio / 100) * totalQ);
          sumQ += allocated[c];
        }
        let diff = totalQ - sumQ;
        if (diff !== 0) allocated[3] += diff;

        let examPool = [];
        let backupPool = [];

        for (let c = 1; c <= 6; c++) {
          const chQuestions = shuffleArray(ALL_QUESTIONS.filter(q => q.chuong === c));
          const targetCount = allocated[c];
          const picked = chQuestions.slice(0, targetCount);
          examPool = examPool.concat(picked);

          if (chQuestions.length > targetCount) {
            backupPool = backupPool.concat(chQuestions.slice(targetCount));
          }
        }

        if (examPool.length < totalQ) {
          backupPool = shuffleArray(backupPool);
          const needed = totalQ - examPool.length;
          examPool = examPool.concat(backupPool.slice(0, needed));
        }

        const finalExamQuestions = prepareQuestions(examPool, true, true);

        examSession = {
          questions: finalExamQuestions,
          currentPage: 0,
          questionsPerPage: 10,
          userAnswers: {},
          flaggedQuestions: {},
          totalSeconds: examSettings.timeMinutes * 60,
          secondsLeft: examSettings.timeMinutes * 60,
          timerId: null,
          submitted: false,
          startTime: Date.now()
        };

        navigateTo('exam-taking');
        startExamTimer();
        renderExamCurrentPage();
      }

      function startExamTimer() {
        if (!examSession) return;
        if (examSession.timerId) clearInterval(examSession.timerId);

        updateExamTimerDisplay();
        examSession.timerId = setInterval(() => {
          if (!examSession || examSession.submitted) {
            clearInterval(examSession.timerId);
            return;
          }
          examSession.secondsLeft--;
          updateExamTimerDisplay();

          if (examSession.secondsLeft <= 0) {
            clearInterval(examSession.timerId);
            autoSubmitExam();
          }
        }, 1000);
      }

      function updateExamTimerDisplay() {
        if (!examSession) return;
        const timerEl = document.getElementById('examTimerDisplay');
        if (!timerEl) return;

        const m = Math.floor(examSession.secondsLeft / 60);
        const s = examSession.secondsLeft % 60;
        const timeStr = \`\${String(m).padStart(2, '0')}:\${String(s).padStart(2, '0')}\`;

        timerEl.textContent = \`⏱️ \${timeStr}\`;
        if (examSession.secondsLeft <= 300) {
          timerEl.style.color = 'var(--danger)';
          timerEl.style.background = 'var(--danger-light)';
        } else {
          timerEl.style.color = 'var(--primary)';
          timerEl.style.background = 'var(--primary-light)';
        }
      }

      function updateExamHeaderStats() {
        if (!examSession) return;
        const total = examSession.questions.length;
        const answered = Object.keys(examSession.userAnswers).length;
        const flagged = Object.keys(examSession.flaggedQuestions || {}).filter(k => examSession.flaggedQuestions[k]).length;
        const totalPages = Math.ceil(total / examSession.questionsPerPage);

        const ansEl = document.getElementById('examAnsweredCountText');
        if (ansEl) ansEl.textContent = \`\${answered}/\${total}\`;

        const flagEl = document.getElementById('examFlaggedCountText');
        if (flagEl) flagEl.innerHTML = \`🚩 <strong>\${flagged}</strong> do dự\`;

        const progressEl = document.getElementById('examProgressBar');
        if (progressEl) {
          const pct = Math.round((answered / total) * 100);
          progressEl.style.width = pct + '%';
        }

        const pageBadge = document.getElementById('examTopPageBadge');
        if (pageBadge) {
          pageBadge.textContent = \`Trang \${examSession.currentPage + 1}/\${totalPages}\`;
        }

        const submitStatus = document.getElementById('examSubmitStatusText');
        if (submitStatus) {
          submitStatus.textContent = \`Bạn đã trả lời \${answered}/\${total} câu hỏi (\${total - answered} câu chưa làm, \${flagged} câu đang gắn cờ do dự).\`;
        }
      }

      function renderExamCurrentPage() {
        if (!examSession) return;
        const { questions, currentPage, questionsPerPage, userAnswers, flaggedQuestions } = examSession;
        const totalQuestions = questions.length;
        const totalPages = Math.ceil(totalQuestions / questionsPerPage);

        const startIndex = currentPage * questionsPerPage;
        const endIndex = Math.min(startIndex + questionsPerPage, totalQuestions);

        document.getElementById('examCurrentPageHeading').textContent = \`Trang \${currentPage + 1} / \${totalPages}\`;
        document.getElementById('examCurrentPageRange').textContent = \`Hiển thị Câu \${startIndex + 1} – Câu \${endIndex} (trong tổng số \${totalQuestions} câu)\`;

        document.getElementById('examTopPrevBtn').disabled = currentPage === 0;
        document.getElementById('examTopNextBtn').disabled = currentPage === totalPages - 1;
        document.getElementById('examBottomPrevBtn').disabled = currentPage === 0;
        document.getElementById('examBottomNextBtn').disabled = currentPage === totalPages - 1;

        const pillsContainer = document.getElementById('examPagePillsContainer');
        pillsContainer.innerHTML = '';
        for (let p = 0; p < totalPages; p++) {
          const pill = document.createElement('button');
          pill.className = 'page-pill-btn' + (p === currentPage ? ' active' : '');
          pill.textContent = p + 1;
          pill.title = \`Đi tới Trang \${p + 1}\`;
          pill.onclick = () => goToExamPage(p);
          pillsContainer.appendChild(pill);
        }

        const container = document.getElementById('examQuestionsContainer');
        container.innerHTML = '';

        for (let qIdx = startIndex; qIdx < endIndex; qIdx++) {
          const q = questions[qIdx];
          const isFlagged = !!flaggedQuestions[qIdx];
          const chosenLetter = userAnswers[qIdx];

          const card = document.createElement('div');
          card.className = 'exam-q-card' + (isFlagged ? ' is-flagged' : '');
          card.id = \`exam-q-card-\${qIdx}\`;

          const header = document.createElement('div');
          header.className = 'exam-q-header';
          header.innerHTML = \`
            <div class="exam-q-meta">
              <span class="exam-q-num-badge">Câu \${qIdx + 1}</span>
              <span class="quiz-chapter-pill">Chương \${q.chuong}: \${CHAPTER_NAMES[q.chuong].substring(0, 45)}...</span>
            </div>
            <button class="btn-flag-toggle \${isFlagged ? 'flagged' : ''}" onclick="App.toggleExamFlag(\${qIdx})" type="button">
              <span class="flag-icon">\${isFlagged ? '🚩' : '🏳️'}</span>
              <span class="flag-text">\${isFlagged ? 'Đã gắn cờ do dự' : 'Gắn cờ do dự'}</span>
            </button>
          \`;
          card.appendChild(header);

          const content = document.createElement('div');
          content.className = 'exam-q-content';
          content.textContent = \`Câu \${qIdx + 1}. \${q.cauHoi}\`;
          card.appendChild(content);

          const optionsGrid = document.createElement('div');
          optionsGrid.className = 'exam-options-grid';

          const letters = ['A', 'B', 'C', 'D'];
          letters.forEach((letter, optIdx) => {
            const optBtn = document.createElement('button');
            optBtn.className = 'exam-option-item' + (chosenLetter === letter ? ' selected' : '');
            optBtn.dataset.letter = letter;
            optBtn.innerHTML = \`
              <span class="option-letter">\${letter}</span>
              <span class="option-text">\${q.dapAn[optIdx]}</span>
            \`;
            optBtn.onclick = () => selectExamOption(qIdx, letter);
            optionsGrid.appendChild(optBtn);
          });

          card.appendChild(optionsGrid);
          container.appendChild(card);
        }

        updateExamHeaderStats();
      }

      function selectExamOption(qIndex, letter) {
        if (!examSession || examSession.submitted) return;
        examSession.userAnswers[qIndex] = letter;

        const card = document.getElementById(\`exam-q-card-\${qIndex}\`);
        if (card) {
          const items = card.querySelectorAll('.exam-option-item');
          items.forEach(item => {
            if (item.dataset.letter === letter) {
              item.classList.add('selected');
            } else {
              item.classList.remove('selected');
            }
          });
        }

        updateExamHeaderStats();
      }

      function toggleExamFlag(qIndex) {
        if (!examSession || examSession.submitted) return;
        if (!examSession.flaggedQuestions) examSession.flaggedQuestions = {};

        examSession.flaggedQuestions[qIndex] = !examSession.flaggedQuestions[qIndex];
        const isFlagged = !!examSession.flaggedQuestions[qIndex];

        const card = document.getElementById(\`exam-q-card-\${qIndex}\`);
        if (card) {
          if (isFlagged) {
            card.classList.add('is-flagged');
          } else {
            card.classList.remove('is-flagged');
          }

          const btn = card.querySelector('.btn-flag-toggle');
          if (btn) {
            btn.className = 'btn-flag-toggle' + (isFlagged ? ' flagged' : '');
            btn.innerHTML = \`
              <span class="flag-icon">\${isFlagged ? '🚩' : '🏳️'}</span>
              <span class="flag-text">\${isFlagged ? 'Đã gắn cờ do dự' : 'Gắn cờ do dự'}</span>
            \`;
          }
        }

        updateExamHeaderStats();
      }

      function prevExamPage() {
        if (!examSession || examSession.currentPage <= 0) return;
        examSession.currentPage--;
        renderExamCurrentPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }

      function nextExamPage() {
        if (!examSession) return;
        const totalPages = Math.ceil(examSession.questions.length / examSession.questionsPerPage);
        if (examSession.currentPage < totalPages - 1) {
          examSession.currentPage++;
          renderExamCurrentPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      function goToExamPage(page) {
        if (!examSession) return;
        const totalPages = Math.ceil(examSession.questions.length / examSession.questionsPerPage);
        if (page >= 0 && page < totalPages) {
          examSession.currentPage = page;
          renderExamCurrentPage();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }

      // ==========================================
      // SUBMIT EXAM LOGIC
      // ==========================================
      function promptSubmitExam() {
        if (!examSession || examSession.submitted) return;
        const { questions, userAnswers, flaggedQuestions } = examSession;
        const total = questions.length;
        const answered = Object.keys(userAnswers).length;
        const unanswered = total - answered;
        const flaggedCount = Object.keys(flaggedQuestions || {}).filter(k => flaggedQuestions[k]).length;

        let msg = \`
          <div style="display: flex; flex-direction: column; gap: 14px;">
        \`;

        if (unanswered > 0 || flaggedCount > 0) {
          msg += \`
            <div style="background: var(--warning-light); border: 1.5px solid var(--warning-border); padding: 14px 16px; border-radius: var(--radius-md);">
              <div style="font-weight: 800; color: var(--warning); margin-bottom: 6px; font-size: 15px;">
                ⚠️ Thông tin bài làm của bạn:
              </div>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: var(--text-main); display: flex; flex-direction: column; gap: 4px;">
                \${unanswered > 0 ? \`<li>Còn <strong>\${unanswered} câu</strong> chưa trả lời!</li>\` : ''}
                \${flaggedCount > 0 ? \`<li>Có <strong>\${flaggedCount} câu</strong> đang được gắn cờ do dự 🚩.</li>\` : ''}
              </ul>
            </div>
            <p style="font-size: 14.5px;">Bạn có chắc chắn muốn nộp bài ngay bây giờ không? Sau khi nộp sẽ không thể thay đổi đáp án.</p>
          \`;
        } else {
          msg += \`
            <div style="background: var(--success-light); border: 1.5px solid var(--success-border); padding: 14px 16px; border-radius: var(--radius-md);">
              <span style="color: var(--success); font-weight: 800;">🎉 Hoàn thành xuất sắc!</span> Bạn đã trả lời đầy đủ <strong>\${total}/\${total} câu hỏi</strong> và không còn câu do dự.
            </div>
            <p style="font-size: 14.5px;">Bạn có chắc chắn muốn nộp bài để xem điểm số và bảng phân tích kết quả?</p>
          \`;
        }

        msg += \`
            <div style="font-size: 12.5px; color: var(--text-muted); padding-top: 8px; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between;">
              <span>Tổng: <strong>\${total} câu</strong></span>
              <span>Đã làm: <strong style="color: var(--success);">\${answered}</strong></span>
              <span>Chưa làm: <strong style="color: var(--danger);">\${unanswered}</strong></span>
              <span>Gắn cờ: <strong style="color: var(--warning);">\${flaggedCount}</strong></span>
            </div>
          </div>
        \`;

        showConfirmModal('Xác nhận nộp bài kiểm tra', msg, () => {
          submitExam();
        });
      }

      function autoSubmitExam() {
        if (!examSession || examSession.submitted) return;
        alert('⏰ Đã hết thời gian làm bài! Hệ thống tự động nộp bài kiểm tra của bạn.');
        submitExam();
      }

      function submitExam() {
        if (!examSession || examSession.submitted) return;
        examSession.submitted = true;
        if (examSession.timerId) clearInterval(examSession.timerId);

        const { questions, userAnswers, totalSeconds, secondsLeft } = examSession;
        const timeSpentSeconds = Math.max(0, totalSeconds - secondsLeft);

        let correctCount = 0;
        let wrongCount = 0;
        let skippedCount = 0;

        let chapterStats = {
          1: { total: 0, correct: 0 },
          2: { total: 0, correct: 0 },
          3: { total: 0, correct: 0 },
          4: { total: 0, correct: 0 },
          5: { total: 0, correct: 0 },
          6: { total: 0, correct: 0 }
        };

        questions.forEach((q, idx) => {
          chapterStats[q.chuong].total++;
          const chosen = userAnswers[idx];

          if (!state.questionStats[q.id]) {
            state.questionStats[q.id] = { attempts: 0, correct: 0, wrong: 0, lastResult: '', lastDate: '' };
          }
          const st = state.questionStats[q.id];

          if (chosen) {
            st.attempts++;
            if (chosen === q.dung) {
              correctCount++;
              chapterStats[q.chuong].correct++;
              st.correct++;
              st.lastResult = 'correct';
            } else {
              wrongCount++;
              st.wrong++;
              st.lastResult = 'wrong';
            }
            st.lastDate = getVietnamDateString();
          } else {
            skippedCount++;
            st.attempts++;
            st.wrong++;
            st.lastResult = 'wrong';
            st.lastDate = getVietnamDateString();
          }
        });

        const scoreTen = parseFloat(((correctCount / questions.length) * 10).toFixed(2));

        const examRecord = {
          id: Date.now(),
          date: getVietnamDateString(),
          total: questions.length,
          correct: correctCount,
          wrong: wrongCount,
          skipped: skippedCount,
          score: scoreTen,
          timeSpentSeconds,
          chapterStats
        };

        if (!state.examHistory) state.examHistory = [];
        state.examHistory.push(examRecord);
        saveState();

        if (scoreTen >= 7.0) {
          AudioController.playCorrect();
        }

        document.getElementById('examScoreDisplay').textContent = scoreTen.toFixed(2);
        document.getElementById('examTotalQStat').textContent = questions.length;
        document.getElementById('examCorrectQStat').textContent = correctCount;
        document.getElementById('examWrongQStat').textContent = wrongCount;

        const m = Math.floor(timeSpentSeconds / 60);
        const s = timeSpentSeconds % 60;
        document.getElementById('examTimeSpentStat').textContent = \`\${m}:\${String(s).padStart(2, '0')}\`;

        const ratingBadge = document.getElementById('examRatingBadge');
        if (scoreTen >= 9.0) {
          ratingBadge.textContent = '🌟 Xuất Sắc';
          ratingBadge.style.background = 'var(--success-light)';
          ratingBadge.style.color = 'var(--success)';
        } else if (scoreTen >= 8.0) {
          ratingBadge.textContent = '👏 Giỏi';
          ratingBadge.style.background = 'var(--info-light)';
          ratingBadge.style.color = 'var(--info)';
        } else if (scoreTen >= 6.5) {
          ratingBadge.textContent = '👍 Khá';
          ratingBadge.style.background = 'var(--primary-light)';
          ratingBadge.style.color = 'var(--primary)';
        } else if (scoreTen >= 5.0) {
          ratingBadge.textContent = '⚡ Trung Bình';
          ratingBadge.style.background = 'var(--warning-light)';
          ratingBadge.style.color = 'var(--warning)';
        } else {
          ratingBadge.textContent = '⚠️ Cần Cố Gắng Thêm';
          ratingBadge.style.background = 'var(--danger-light)';
          ratingBadge.style.color = 'var(--danger)';
        }

        examSession.resultData = examRecord;

        document.getElementById('examAnalysisContainer').style.display = 'none';
        document.getElementById('examReviewContainer').style.display = 'none';

        navigateTo('exam-result');
      }

      function showExamAnalysis() {
        if (!examSession || !examSession.resultData) return;
        const container = document.getElementById('examAnalysisContainer');
        const list = document.getElementById('examChapterCharts');
        const bestNotice = document.getElementById('bestChapterNotice');
        container.style.display = 'flex';

        const stats = examSession.resultData.chapterStats;
        let html = '';
        let bestCh = null;
        let bestRate = -1;

        for (let c = 1; c <= 6; c++) {
          const st = stats[c];
          if (st.total > 0) {
            const pct = Math.round((st.correct / st.total) * 100);
            if (pct > bestRate) {
              bestRate = pct;
              bestCh = c;
            }

            let barColor = 'var(--primary)';
            if (pct >= 80) barColor = 'var(--success)';
            else if (pct < 50) barColor = 'var(--danger)';

            html += \`
              <div class="chart-bar-item">
                <div class="chart-bar-header">
                  <span class="chart-bar-title">Chương \${c}: \${CHAPTER_NAMES[c]}</span>
                  <span class="chart-bar-stat">\${st.correct}/\${st.total} câu (\${pct}%)</span>
                </div>
                <div class="chart-bar-track">
                  <div class="chart-bar-fill" style="width: \${pct}%; background: \${barColor};"></div>
                </div>
              </div>
            \`;
          }
        }

        list.innerHTML = html;
        if (bestCh) {
          bestNotice.textContent = \`🏆 Bạn làm tốt nhất: Chương \${bestCh} (\${bestRate}% đúng)\`;
        }

        container.scrollIntoView({ behavior: 'smooth' });
      }

      function showExamReview() {
        const container = document.getElementById('examReviewContainer');
        container.style.display = 'flex';
        renderExamReviewList();
        container.scrollIntoView({ behavior: 'smooth' });
      }

      function filterExamReview(filter) {
        examReviewFilter = filter;
        document.querySelectorAll('#examReviewContainer .btn-sm').forEach(b => b.classList.remove('active'));
        if (filter === 'all') document.getElementById('filterAllBtn').classList.add('active');
        if (filter === 'wrong') document.getElementById('filterWrongBtn').classList.add('active');
        if (filter === 'correct') document.getElementById('filterCorrectBtn').classList.add('active');
        renderExamReviewList();
      }

      function renderExamReviewList() {
        if (!examSession) return;
        const { questions, userAnswers, flaggedQuestions } = examSession;
        const container = document.getElementById('examReviewList');

        let html = '';
        questions.forEach((q, idx) => {
          const chosen = userAnswers[idx];
          const isCorrect = chosen === q.dung;
          const isSkipped = !chosen;
          const isFlagged = !!(flaggedQuestions && flaggedQuestions[idx]);

          if (examReviewFilter === 'wrong' && isCorrect) return;
          if (examReviewFilter === 'correct' && !isCorrect) return;

          let statusClass = isSkipped ? 'is-skipped' : (isCorrect ? 'is-correct' : 'is-wrong');
          let statusBadge = isSkipped
            ? '<span style="color: var(--text-muted); font-weight: 700;">⚪ Chưa làm</span>'
            : (isCorrect
              ? '<span style="color: var(--success); font-weight: 700;">✅ Đúng</span>'
              : '<span style="color: var(--danger); font-weight: 700;">❌ Sai</span>');

          html += \`
            <div class="review-item \${statusClass}">
              <div class="review-meta">
                <span>Câu \${idx + 1} · Chương \${q.chuong} \${isFlagged ? '· 🚩 Đã gắn cờ do dự' : ''}</span>
                <span>\${statusBadge}</span>
              </div>
              <div style="font-weight: 700; color: var(--text-main);">\${q.cauHoi}</div>
              <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 6px; font-size: 14px;">
                <div style="color: \${isCorrect ? 'var(--success)' : (isSkipped ? 'var(--text-muted)' : 'var(--danger)')};">
                  <strong>Bạn chọn:</strong> \${chosen ? \`[\${chosen}] \${q.dapAn[['A','B','C','D'].indexOf(chosen)]}\` : 'Chưa chọn đáp án'}
                </div>
                <div style="color: var(--success);">
                  <strong>Đáp án đúng:</strong> [\${q.dung}] \${q.dapAn[['A','B','C','D'].indexOf(q.dung)]}
                </div>
              </div>
            </div>
          \`;
        });

        if (!html) {
          html = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Không có câu hỏi nào theo bộ lọc này.</p>';
        }

        container.innerHTML = html;
      }

      // ==========================================
      // SECTION 3: TIẾN ĐỘ THUỘC BÀI (ANALYTICS)
      // ==========================================
      function renderMasteryAnalytics() {
        const stats = state.questionStats || {};
        const attemptedIds = Object.keys(stats).filter(id => stats[id].attempts > 0);

        const emptyState = document.getElementById('masteryEmptyState');
        const dataState = document.getElementById('masteryDataState');

        if (attemptedIds.length === 0) {
          emptyState.style.display = 'flex';
          dataState.style.display = 'none';
          return;
        }

        emptyState.style.display = 'none';
        dataState.style.display = 'flex';

        const chapterMetrics = {};
        for (let c = 1; c <= 6; c++) {
          chapterMetrics[c] = { totalAttempts: 0, wrongAttempts: 0 };
        }

        attemptedIds.forEach(id => {
          const st = stats[id];
          const q = ALL_QUESTIONS.find(item => item.id == id);
          if (q) {
            chapterMetrics[q.chuong].totalAttempts += st.attempts;
            chapterMetrics[q.chuong].wrongAttempts += st.wrong;
          }
        });

        const rankedChapters = [];
        for (let c = 1; c <= 6; c++) {
          const m = chapterMetrics[c];
          const errorRate = m.totalAttempts > 0 ? Math.round((m.wrongAttempts / m.totalAttempts) * 100) : 0;
          rankedChapters.push({
            chapter: c,
            total: m.totalAttempts,
            wrong: m.wrongAttempts,
            errorRate
          });
        }

        rankedChapters.sort((a, b) => b.errorRate - a.errorRate);

        const rankListEl = document.getElementById('chapterRankingsList');
        let rankHtml = '';
        rankedChapters.forEach((rc, idx) => {
          let badgeColor = 'var(--danger)';
          if (rc.errorRate < 25) badgeColor = 'var(--success)';
          else if (rc.errorRate < 50) badgeColor = 'var(--warning)';

          rankHtml += \`
            <div class="chart-bar-item" style="padding: 10px 0; border-bottom: 1px solid var(--border-color);">
              <div class="chart-bar-header">
                <span>#\${idx + 1}. Chương \${rc.chapter}: \${CHAPTER_NAMES[rc.chapter]}</span>
                <span style="color: \${badgeColor}; font-weight: 800;">Tỉ lệ sai: \${rc.errorRate}% (\${rc.wrong}/\${rc.total} lượt)</span>
              </div>
              <div class="chart-bar-track" style="height: 9px; margin-top: 4px;">
                <div class="chart-bar-fill" style="width: \${rc.errorRate}%; background: \${badgeColor};"></div>
              </div>
            </div>
          \`;
        });
        rankListEl.innerHTML = rankHtml;

        const failedQuestions = [];
        attemptedIds.forEach(id => {
          const st = stats[id];
          const q = ALL_QUESTIONS.find(item => item.id == id);
          if (q && (st.wrong > 0 || st.lastResult === 'wrong')) {
            failedQuestions.push({
              question: q,
              stat: st,
              failScore: st.wrong * 2 + (st.lastResult === 'wrong' ? 3 : 0)
            });
          }
        });

        failedQuestions.sort((a, b) => b.failScore - a.failScore);

        const failedListContainer = document.getElementById('failedQuestionsList');
        if (failedQuestions.length === 0) {
          failedListContainer.innerHTML = '<p style="color: var(--success); font-weight: 700;">Tuyệt vời! Bạn chưa có câu hỏi nào bị sai nhiều lần.</p>';
        } else {
          let listHtml = '';
          failedQuestions.slice(0, 25).forEach((item, idx) => {
            const q = item.question;
            const st = item.stat;
            const correctOptIdx = ['A', 'B', 'C', 'D'].indexOf(q.dung);

            listHtml += \`
              <div class="review-item is-wrong">
                <div class="review-meta">
                  <span>#\${idx + 1} · Chương \${q.chuong}</span>
                  <span style="color: var(--danger); font-weight: 700;">Đã sai \${st.wrong}/\${st.attempts} lần</span>
                </div>
                <div style="font-weight: 700; color: var(--text-main);">\${q.cauHoi}</div>
                <div style="background: var(--success-light); border-radius: var(--radius-sm); padding: 8px 12px; margin-top: 6px; border: 1px solid var(--success-border);">
                  <div style="color: var(--success); font-weight: 700; font-size: 14px;">
                    ✅ Đáp án đúng: [\${q.dung}] \${q.dapAn[correctOptIdx]}
                  </div>
                </div>
              </div>
            \`;
          });
          failedListContainer.innerHTML = listHtml;
        }
      }

      function confirmClearData() {
        showConfirmModal(
          'Xóa toàn bộ dữ liệu?',
          'Thao tác này sẽ xóa sạch toàn bộ lịch sử ôn tập, kiểm tra, thống kê thuộc bài và kỷ lục Nightmare của bạn. Dữ liệu không thể khôi phục lại!',
          () => clearAllData()
        );
      }

      function clearAllData() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('hcm_ideology_quiz_v2');
        localStorage.removeItem('hcm_ideology_quiz_v1');
        state = {
          theme: state.theme,
          themeSettings: state.themeSettings,
          nightmareRecords: {
            1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, all: 0
          },
          chapterProgress: {
            1: { totalAttempted: 0, totalCorrect: 0 },
            2: { totalAttempted: 0, totalCorrect: 0 },
            3: { totalAttempted: 0, totalCorrect: 0 },
            4: { totalAttempted: 0, totalCorrect: 0 },
            5: { totalAttempted: 0, totalCorrect: 0 },
            6: { totalAttempted: 0, totalCorrect: 0 }
          },
          questionStats: {},
          examHistory: [],
          studySettings: {
            shuffle: true,
            immediateFeedback: true
          }
        };
        saveState();
        navigateTo('menu');
        alert('Đã xóa toàn bộ dữ liệu thành công!');
      }

      // ==========================================
      // QUESTION MATRIX MODAL & NAVIGATION
      // ==========================================
      function openQuestionMatrix(mode) {
        const titleEl = document.getElementById('questionMatrixTitle');
        const gridEl = document.getElementById('questionMatrixGrid');
        const flagLegend = document.getElementById('matrixLegendFlagged');

        let questions = [];
        let userAnswers = {};
        let flagged = {};
        let currentPage = 0;
        let questionsPerPage = 10;

        if (mode === 'practice' && practiceSession) {
          titleEl.textContent = 'Danh Sách Câu Ôn Tập';
          questions = practiceSession.questions;
          userAnswers = practiceSession.userAnswers;
          flagLegend.style.display = 'none';
        } else if (mode === 'exam' && examSession) {
          titleEl.textContent = 'Danh Sách Câu Kiểm Tra';
          questions = examSession.questions;
          userAnswers = examSession.userAnswers;
          flagged = examSession.flaggedQuestions || {};
          currentPage = examSession.currentPage;
          flagLegend.style.display = 'flex';
        }

        let html = '';
        questions.forEach((q, idx) => {
          let btnClass = 'grid-num-btn';

          if (mode === 'practice') {
            const ans = userAnswers[idx];
            if (ans) {
              if (state.studySettings.immediateFeedback) {
                btnClass += ans.isCorrect ? ' correct-ans' : ' wrong-ans';
              } else {
                btnClass += ' answered';
              }
            }
            if (idx === practiceSession.currentIndex) {
              btnClass += ' active-page';
            }
          } else {
            const isAnswered = !!userAnswers[idx];
            const isFl = !!flagged[idx];
            const pageOfQ = Math.floor(idx / questionsPerPage);

            if (isFl) {
              btnClass += ' flagged';
            } else if (isAnswered) {
              btnClass += ' answered';
            }

            if (pageOfQ === currentPage) {
              btnClass += ' active-page';
            }
          }

          html += \`
            <button class="\${btnClass}" onclick="App.jumpToQuestion('\${mode}', \${idx})">
              \${idx + 1}
            </button>
          \`;
        });

        gridEl.innerHTML = html;
        document.getElementById('questionMatrixModal').classList.add('active');
      }

      function closeQuestionMatrix() {
        document.getElementById('questionMatrixModal').classList.remove('active');
      }

      function jumpToQuestion(mode, idx) {
        closeQuestionMatrix();
        if (mode === 'practice' && practiceSession) {
          practiceSession.currentIndex = idx;
          renderPracticeCurrentQuestion();
        } else if (mode === 'exam' && examSession) {
          const targetPage = Math.floor(idx / examSession.questionsPerPage);
          examSession.currentPage = targetPage;
          renderExamCurrentPage();

          setTimeout(() => {
            const card = document.getElementById(\`exam-q-card-\${idx}\`);
            if (card) {
              card.scrollIntoView({ behavior: 'smooth', block: 'center' });
              card.classList.add('highlight-pulse');
              setTimeout(() => card.classList.remove('highlight-pulse'), 1800);
            }
          }, 80);
        }
      }

      // ==========================================
      // CONFIRMATION MODAL HELPER
      // ==========================================
      let onConfirmCallback = null;
      function showConfirmModal(title, msg, onConfirm) {
        document.getElementById('confirmModalTitle').innerHTML = title;
        document.getElementById('confirmModalMessage').innerHTML = msg;
        onConfirmCallback = onConfirm;

        const actionBtn = document.getElementById('confirmModalActionBtn');
        actionBtn.onclick = () => {
          const fn = onConfirmCallback;
          closeConfirmModal();
          if (typeof fn === 'function') {
            fn();
          }
        };

        document.getElementById('confirmModal').classList.add('active');
      }

      function closeConfirmModal() {
        document.getElementById('confirmModal').classList.remove('active');
        onConfirmCallback = null;
      }

      // Download single-file HTML for Netlify Drop or offline usage
      function downloadWebFile() {
        const fullHtml = '<!DOCTYPE html>\\n' + document.documentElement.outerHTML;
        const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'index.html';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      // Public API initialization
      function init() {
        loadState();
        window.addEventListener('keydown', handleGlobalKeydown);
      }

      return {
        init,
        navigateTo,
        downloadWebFile,
        // Theme System
        openThemeModal,
        closeThemeModal,
        selectThemePreset,
        onCustomWallpaperFileSelected,
        removeCustomWallpaper,
        onCustomDimmerChange,
        onCustomBlurChange,
        setCustomTone,
        toggleParticles,
        // Practice
        openPracticeSettings,
        closePracticeSettingsModal,
        confirmStartPractice,
        startPractice,
        confirmPracticeAnswer,
        prevPracticeQuestion,
        nextPracticeQuestion,
        onPracticeNextClick,
        finishPracticeEarly,
        confirmExitPractice,
        retryWrongQuestions,
        openCustomPracticeModal,
        closeCustomPracticeModal,
        onCustomChapterCheck,
        toggleSelectAllCustomChapters,
        startCustomPractice,
        // Nightmare Mode
        openNightmareSetup,
        startNightmare,
        onSelectNightmareOption,
        confirmNightmareAnswer,
        nextNightmareQuestion,
        onNightmareNextClick,
        restartNightmare,
        exitNightmare,
        // Exam
        onExamQuestionCountChange,
        onExamTimeChange,
        onChapterRatioChange,
        resetExamRatioEven,
        startExam,
        prevExamPage,
        nextExamPage,
        goToExamPage,
        selectExamOption,
        toggleExamFlag,
        promptSubmitExam,
        showExamAnalysis,
        showExamReview,
        filterExamReview,
        // Analytics
        confirmClearData,
        // Matrix & Modal
        openQuestionMatrix,
        closeQuestionMatrix,
        jumpToQuestion,
        closeConfirmModal
      };
    })();

    // Start App on DOM Ready
    window.addEventListener('DOMContentLoaded', () => {
      App.init();
    });
  </script>
</body>
</html>
`;

fs.writeFileSync('index.html', htmlContent);
console.log('Successfully generated v3 index.html with theme presets and custom wallpaper upload!');
