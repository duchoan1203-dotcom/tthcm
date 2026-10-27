const fs = require('fs');

// Read questions
const questions = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));
console.log('Building v2 index.html with', questions.length, 'questions...');

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
  <meta name="description" content="Website ôn tập và kiểm tra trắc nghiệm môn Tư tưởng Hồ Chí Minh với 475 câu hỏi trắc nghiệm chia theo 6 chương, phân trang 10 câu/trang, gắn cờ câu do dự, phân tích thuộc bài và chuỗi streak học tập." />
  <meta property="og:title" content="Ôn Thi Tư Tưởng Hồ Chí Minh - Trắc Nghiệm 475 Câu" />
  <meta property="og:description" content="Website ôn tập và kiểm tra trắc nghiệm môn Tư tưởng Hồ Chí Minh đầy đủ 475 câu hỏi." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />

  <style>
    /* CSS System & Variables */
    :root {
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --bg-card-hover: #fcfdfe;
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

    [data-theme="dark"] {
      --bg-page: #0b0f19;
      --bg-card: #151e2e;
      --bg-card-hover: #1c273c;
      --bg-subtle: #1e293b;
      --bg-elevated: #243046;
      --border-color: #2e3a50;
      --border-focus: #f43f5e;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-light: #64748b;
      --primary: #f43f5e;
      --primary-hover: #e11d48;
      --primary-light: rgba(244, 63, 94, 0.15);
      --primary-text: #ffffff;
      --accent: #fb7185;
      --success: #10b981;
      --success-light: rgba(16, 185, 129, 0.15);
      --success-border: #065f46;
      --danger: #f87171;
      --danger-light: rgba(239, 68, 68, 0.15);
      --danger-border: #991b1b;
      --warning: #fbbf24;
      --warning-light: rgba(245, 158, 11, 0.18);
      --warning-border: #92400e;
      --info: #38bdf8;
      --info-light: rgba(56, 189, 248, 0.15);
      --flag-bg: rgba(245, 158, 11, 0.16);
      --flag-border: #f59e0b;
      --flag-text: #fcd34d;
      --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.3);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.4);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
      --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.6);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg-page);
      color: var(--text-main);
      line-height: 1.6;
      font-size: 16px;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      transition: background-color 0.25s ease, color 0.25s ease;
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
      background: linear-gradient(135deg, #be123c, #e11d48);
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
      background: var(--bg-subtle);
      border-color: var(--border-focus);
      transform: translateY(-1px);
    }

    /* Streak & Progress Banner */
    .streak-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px 24px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-md);
      display: flex;
      flex-direction: column;
      gap: 16px;
      position: relative;
      overflow: hidden;
    }

    .streak-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #f59e0b, #ef4444, #be123c);
    }

    .streak-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
    }

    .streak-badge {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .streak-flame {
      font-size: 34px;
      line-height: 1;
      filter: drop-shadow(0 2px 6px rgba(245, 158, 11, 0.35));
      animation: pulseFlame 2.5s infinite ease-in-out;
    }

    @keyframes pulseFlame {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.08); }
    }

    .streak-count {
      font-size: 26px;
      font-weight: 800;
      color: var(--text-main);
      line-height: 1.1;
    }

    .streak-subtitle {
      font-size: 13px;
      color: var(--text-muted);
    }

    .streak-record {
      font-size: 13px;
      font-weight: 700;
      color: var(--warning);
      background: var(--warning-light);
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid var(--warning-border);
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }

    .week-calendar {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
    }

    .week-day {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 4px;
      border-radius: var(--radius-sm);
      background: var(--bg-subtle);
      border: 1px solid transparent;
      font-size: 12px;
      transition: all 0.2s;
    }

    .week-day.today {
      border-color: var(--primary);
      font-weight: 700;
      box-shadow: 0 0 0 1px var(--primary);
    }

    .week-day.active {
      background: var(--primary-light);
      color: var(--primary);
      font-weight: 700;
    }

    .week-day-name {
      color: var(--text-muted);
      margin-bottom: 4px;
      font-size: 11px;
      text-transform: uppercase;
      font-weight: 600;
    }

    .week-day-status {
      font-size: 16px;
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
      background: linear-gradient(90deg, #be123c, #e11d48);
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
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      width: 100%;
      max-width: 540px;
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
    /* EXAM SECTION (KIỂM TRA) - MODERN PAGINATION & FLAGGING UI   */
    /* ============================================================ */

    /* Sticky Header in Exam Mode */
    .exam-sticky-bar {
      position: sticky;
      top: 12px;
      z-index: 100;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 14px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: var(--shadow-lg);
      backdrop-filter: blur(12px);
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
      background: linear-gradient(90deg, #be123c, #10b981);
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

    /* Questions Container (10 Questions List) */
    .exam-questions-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    /* Individual Question Card on Exam Page */
    .exam-q-card {
      background: var(--bg-card);
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

    /* Flagged Question Highlight */
    .exam-q-card.is-flagged {
      border-color: #f59e0b;
      box-shadow: 0 4px 14px rgba(245, 158, 11, 0.18);
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

    /* Flag Toggle Button */
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

    [data-theme="dark"] .btn-flag-toggle.flagged {
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

    /* Exam Options (Instant Selectable) */
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

    /* Bottom Pagination Bar */
    .exam-pagination-bar {
      background: var(--bg-card);
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

    /* Prominent Submit Banner */
    .exam-submit-banner {
      background: linear-gradient(135deg, rgba(190, 18, 60, 0.08), rgba(245, 158, 11, 0.08));
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

    /* Floating Scroll-to-Top Button */
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

    /* Question Matrix Grid (Modal) */
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

    [data-theme="dark"] .grid-num-btn.flagged {
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

    /* Review & Analysis Containers */
    .review-item {
      background: var(--bg-card);
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

    /* Chapter Chart Item */
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

    /* Form range sliders */
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
    }
  </style>
</head>
<body>
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
        <button class="btn-icon" onclick="App.toggleTheme()" id="themeToggleBtn" title="Chuyển chế độ Sáng / Tối">
          🌓 <span id="themeToggleLabel">Tối</span>
        </button>
      </div>
    </header>

    <!-- DAILY STREAK BANNER -->
    <section class="streak-card" id="streakBanner">
      <div class="streak-header">
        <div class="streak-badge">
          <div class="streak-flame">🔥</div>
          <div>
            <div class="streak-count" id="streakCountText">0 Ngày Liên Tiếp</div>
            <div class="streak-subtitle" id="streakSubtitleText">Hoàn thành ít nhất 1 bài mỗi ngày để duy trì chuỗi học tập</div>
          </div>
        </div>
        <div class="streak-record" id="longestStreakText">
          🏆 Kỷ lục: 0 ngày
        </div>
      </div>
      <div class="week-calendar" id="streakWeekCalendar">
        <!-- 7 days dynamically rendered -->
      </div>
    </section>

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

      <!-- 2 Nút Lớn: Ôn Tất Cả & Ôn Tự Do -->
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

      <!-- 6 Thẻ Chương -->
      <div class="chapters-grid" id="practiceChaptersGrid">
        <!-- Rendered dynamically -->
      </div>
    </section>

    <!-- VIEW 1B: PRACTICE SESSION (LÀM CÂU HỎI ÔN TẬP) -->
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

      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; display: flex; flex-direction: column; gap: 24px; box-shadow: var(--shadow-sm);">
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
      <div id="examAnalysisContainer" style="display: none; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); flex-direction: column; gap: 16px;">
        <h3 style="font-size: 18px; font-weight: 800;">Phân Tích Tỉ Lệ Đúng Theo Từng Chương</h3>
        <p style="font-size: 13px; color: var(--text-muted);" id="bestChapterNotice">
          Chương bạn làm đúng nhiều nhất: Đang tải...
        </p>

        <div id="examChapterCharts" style="margin-top: 10px;">
          <!-- 6 bars rendered dynamically -->
        </div>
      </div>

      <!-- Xem Lại Toàn Bộ Bài Thi -->
      <div id="examReviewContainer" style="display: none; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); flex-direction: column; gap: 16px;">
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
      <div id="masteryEmptyState" style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 48px 24px; text-align: center; display: none; flex-direction: column; align-items: center; gap: 14px;">
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
        <!-- Xếp hạng chương hay sai nhất -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 800;">Xếp Hạng Các Chương Hay Quên / Làm Sai Nhất</h3>
          <p style="font-size: 13px; color: var(--text-muted);">
            Thứ tự từ chương có tỉ lệ làm sai cao nhất xuống thấp nhất dựa trên mọi lần làm bài.
          </p>

          <div id="chapterRankingsList">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- Danh sách các câu hỏi hay sai nhất -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-xl); padding: 24px; box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 16px;">
          <h3 style="font-size: 18px; font-weight: 800;">Danh Sách Các Câu Hỏi Hay Sai Nhất</h3>
          <p style="font-size: 13px; color: var(--text-muted);">
            Những câu hỏi bạn đã sai nhiều lần hoặc ở lần làm gần đây nhất vẫn chưa chọn đúng:
          </p>

          <div id="failedQuestionsList">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- Xóa dữ liệu -->
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-outline btn-sm" onclick="App.confirmClearData()" style="color: var(--danger); border-color: var(--danger-border);">
            🗑️ Xóa toàn bộ dữ liệu học tập
          </button>
        </div>
      </div>
    </section>

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

  <!-- EMBEDDED QUESTION BANK & APP LOGIC -->
  <script>
    // 475 Câu hỏi trắc nghiệm Tư tưởng Hồ Chí Minh
    const ALL_QUESTIONS = ${JSON.stringify(questions)};
    const CHAPTER_NAMES = ${JSON.stringify(chapterNames)};

    // Main App Object
    const App = (function() {
      const STORAGE_KEY = 'hcm_ideology_quiz_v2';

      let state = {
        theme: 'light',
        streak: {
          current: 0,
          longest: 0,
          lastActivityDate: null,
          historyDates: []
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
      let examSession = null;     // { questions, currentPage, questionsPerPage: 10, userAnswers: {}, flaggedQuestions: {}, timerId, totalSeconds, secondsLeft, submitted }
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
          const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('hcm_ideology_quiz_v1');
          if (saved) {
            const parsed = JSON.parse(saved);
            state = { ...state, ...parsed };
          }
        } catch (e) {
          console.warn('Failed to parse local storage', e);
        }

        // Apply theme
        document.documentElement.setAttribute('data-theme', state.theme);
        updateThemeButtonUI();

        // Check Streak validity
        checkStreakContinuity();
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
          console.error('Failed to save to local storage', e);
        }
      }

      function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        updateThemeButtonUI();
        saveState();
      }

      function updateThemeButtonUI() {
        const label = document.getElementById('themeToggleLabel');
        if (label) {
          label.textContent = state.theme === 'light' ? 'Tối' : 'Sáng';
        }
      }

      // ==========================================
      // STREAK MANAGEMENT
      // ==========================================
      function checkStreakContinuity() {
        const today = getVietnamDateString();
        const yesterday = getYesterdayVietnamDateString();
        const last = state.streak.lastActivityDate;

        if (!last) {
          state.streak.current = 0;
          return;
        }

        if (last === today || last === yesterday) {
          // Streak remains intact
        } else {
          // Missed at least one day -> reset to 0
          state.streak.current = 0;
          saveState();
        }
      }

      function recordActivityCompleted() {
        const today = getVietnamDateString();
        const yesterday = getYesterdayVietnamDateString();
        const last = state.streak.lastActivityDate;

        if (last === today) {
          // Already recorded today
          return;
        }

        if (last === yesterday) {
          state.streak.current += 1;
        } else {
          state.streak.current = 1;
        }

        state.streak.lastActivityDate = today;
        if (!state.streak.historyDates.includes(today)) {
          state.streak.historyDates.push(today);
        }

        if (state.streak.current > state.streak.longest) {
          state.streak.longest = state.streak.current;
        }

        saveState();
        renderStreakBanner();
      }

      function renderStreakBanner() {
        const streakCountEl = document.getElementById('streakCountText');
        const streakSubEl = document.getElementById('streakSubtitleText');
        const longestEl = document.getElementById('longestStreakText');
        const calendarEl = document.getElementById('streakWeekCalendar');

        if (!streakCountEl) return;

        const current = state.streak.current;
        streakCountEl.textContent = \`\${current} Ngày Liên Tiếp\`;
        longestEl.textContent = \`🏆 Kỷ lục: \${state.streak.longest} ngày\`;

        const today = getVietnamDateString();
        const yesterday = getYesterdayVietnamDateString();

        if (state.streak.lastActivityDate === today) {
          streakSubEl.textContent = '🎉 Hôm nay bạn đã hoàn thành bài học! Tuyệt vời!';
        } else if (state.streak.lastActivityDate === yesterday) {
          streakSubEl.textContent = '⚡ Hoàn thành 1 bài hôm nay để nâng chuỗi lên ' + (current + 1) + ' ngày!';
        } else {
          streakSubEl.textContent = 'Bắt đầu bài ôn hoặc bài thi ngay để xây dựng chuỗi học tập!';
        }

        // Render 7-day calendar (Mon -> Sun or last 7 days)
        calendarEl.innerHTML = '';
        const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

        const now = new Date();
        const days = [];
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
          days.push(d);
        }

        const todayStr = getVietnamDateString();

        days.forEach(d => {
          const dStr = getVietnamDateString(d);
          const dayName = dayNames[d.getDay()];
          const isToday = dStr === todayStr;
          const isActive = state.streak.historyDates.includes(dStr);

          const div = document.createElement('div');
          div.className = \`week-day \${isToday ? 'today' : ''} \${isActive ? 'active' : ''}\`;
          div.innerHTML = \`
            <span class="week-day-name">\${dayName}</span>
            <span class="week-day-status">\${isActive ? '🔥' : (isToday ? '⏳' : '○')}</span>
          \`;
          calendarEl.appendChild(div);
        });
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

        if (viewId === 'menu') {
          renderStreakBanner();
        } else if (viewId === 'practice-menu') {
          renderPracticeChaptersGrid();
        } else if (viewId === 'exam-setup') {
          initExamSetupView();
        } else if (viewId === 'mastery-analytics') {
          renderMasteryAnalytics();
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
      let pendingPracticeTarget = null; // 'all' | 1..6 | 'custom'
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
          userAnswers: {}, // { [index]: { chosen: 'A', isCorrect: bool } }
          wrongQuestionIds: []
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
          feedbackHint.textContent = 'Hiện đáp án ngay khi chọn';
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

          if (currentAnswer) {
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
          }

          btn.innerHTML = \`
            <span class="option-letter">\${letter}</span>
            <span class="option-text">\${q.dapAn[idx]}</span>
          \`;

          btn.onclick = () => onSelectPracticeOption(letter);
          optionsList.appendChild(btn);
        });

        // Prev/Next buttons
        document.getElementById('practicePrevBtn').disabled = currentIndex === 0;
        const nextBtn = document.getElementById('practiceNextBtn');
        if (currentIndex === questions.length - 1) {
          nextBtn.textContent = 'Xem kết quả 🏁';
        } else {
          nextBtn.textContent = 'Câu tiếp theo ➡️';
        }
      }

      function onSelectPracticeOption(letter) {
        if (!practiceSession) return;
        const { questions, currentIndex, userAnswers } = practiceSession;
        const q = questions[currentIndex];

        // If feedback is on and already answered, prevent re-answering
        if (state.studySettings.immediateFeedback && userAnswers[currentIndex]) {
          return;
        }

        const isCorrect = letter === q.dung;
        userAnswers[currentIndex] = { chosen: letter, isCorrect };

        // Save to statistics
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

        // Save chapter progress
        if (!state.chapterProgress[q.chuong]) {
          state.chapterProgress[q.chuong] = { totalAttempted: 0, totalCorrect: 0 };
        }
        state.chapterProgress[q.chuong].totalAttempted++;
        if (isCorrect) state.chapterProgress[q.chuong].totalCorrect++;

        saveState();
        renderPracticeCurrentQuestion();
      }

      function prevPracticeQuestion() {
        if (!practiceSession || practiceSession.currentIndex <= 0) return;
        practiceSession.currentIndex--;
        renderPracticeCurrentQuestion();
      }

      function nextPracticeQuestion() {
        if (!practiceSession) return;
        if (practiceSession.currentIndex < practiceSession.questions.length - 1) {
          practiceSession.currentIndex++;
          renderPracticeCurrentQuestion();
        } else {
          finishPractice();
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
        recordActivityCompleted();

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
      // SECTION 2: EXAM (KIỂM TRA) - WITH 10 QUESTIONS/PAGE & FLAGS
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

        // Calculate question count per chapter
        const totalQ = examSettings.questionCount;
        const allocated = {};
        let sumQ = 0;
        for (let c = 1; c <= 6; c++) {
          const ratio = examSettings.chapterRatios[c] || 0;
          allocated[c] = Math.round((ratio / 100) * totalQ);
          sumQ += allocated[c];
        }

        // Adjust rounding
        let diff = totalQ - sumQ;
        if (diff !== 0) {
          allocated[3] += diff; // adjust chapter 3
        }

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

        // Allocate questions per chapter
        const allocated = {};
        let sumQ = 0;
        for (let c = 1; c <= 6; c++) {
          const ratio = examSettings.chapterRatios[c] || 0;
          allocated[c] = Math.round((ratio / 100) * totalQ);
          sumQ += allocated[c];
        }
        let diff = totalQ - sumQ;
        if (diff !== 0) allocated[3] += diff;

        // Pick questions randomly from each chapter
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

        // If any chapter was short of questions, fill from backupPool
        if (examPool.length < totalQ) {
          backupPool = shuffleArray(backupPool);
          const needed = totalQ - examPool.length;
          examPool = examPool.concat(backupPool.slice(0, needed));
        }

        // Shuffle exam questions and answer choices
        const finalExamQuestions = prepareQuestions(examPool, true, true);

        examSession = {
          questions: finalExamQuestions,
          currentPage: 0,
          questionsPerPage: 10,
          userAnswers: {},       // { [questionIdx]: 'A'|'B'|'C'|'D' }
          flaggedQuestions: {},  // { [questionIdx]: true|false }
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

      // ============================================================
      // EXAM RENDERING (10 QUESTIONS PER PAGE) & FLAGGING
      // ============================================================
      function updateExamHeaderStats() {
        if (!examSession) return;
        const total = examSession.questions.length;
        const answered = Object.keys(examSession.userAnswers).length;
        const flagged = Object.keys(examSession.flaggedQuestions || {}).filter(k => examSession.flaggedQuestions[k]).length;
        const totalPages = Math.ceil(total / examSession.questionsPerPage);

        // Header counts
        const ansEl = document.getElementById('examAnsweredCountText');
        if (ansEl) ansEl.textContent = \`\${answered}/\${total}\`;

        const flagEl = document.getElementById('examFlaggedCountText');
        if (flagEl) flagEl.innerHTML = \`🚩 <strong>\${flagged}</strong> do dự\`;

        // Progress bar
        const progressEl = document.getElementById('examProgressBar');
        if (progressEl) {
          const pct = Math.round((answered / total) * 100);
          progressEl.style.width = pct + '%';
        }

        // Top page badge
        const pageBadge = document.getElementById('examTopPageBadge');
        if (pageBadge) {
          pageBadge.textContent = \`Trang \${examSession.currentPage + 1}/\${totalPages}\`;
        }

        // Submit status text at bottom banner
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

        // Update Page Banner
        document.getElementById('examCurrentPageHeading').textContent = \`Trang \${currentPage + 1} / \${totalPages}\`;
        document.getElementById('examCurrentPageRange').textContent = \`Hiển thị Câu \${startIndex + 1} – Câu \${endIndex} (trong tổng số \${totalQuestions} câu)\`;

        // Top navigation buttons state
        document.getElementById('examTopPrevBtn').disabled = currentPage === 0;
        document.getElementById('examTopNextBtn').disabled = currentPage === totalPages - 1;
        document.getElementById('examBottomPrevBtn').disabled = currentPage === 0;
        document.getElementById('examBottomNextBtn').disabled = currentPage === totalPages - 1;

        // Render Page Pills
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

        // Render 10 Questions on this page
        const container = document.getElementById('examQuestionsContainer');
        container.innerHTML = '';

        for (let qIdx = startIndex; qIdx < endIndex; qIdx++) {
          const q = questions[qIdx];
          const isFlagged = !!flaggedQuestions[qIdx];
          const chosenLetter = userAnswers[qIdx];

          const card = document.createElement('div');
          card.className = 'exam-q-card' + (isFlagged ? ' is-flagged' : '');
          card.id = \`exam-q-card-\${qIdx}\`;

          // Header
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

          // Content
          const content = document.createElement('div');
          content.className = 'exam-q-content';
          content.textContent = \`Câu \${qIdx + 1}. \${q.cauHoi}\`;
          card.appendChild(content);

          // Options Grid
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

        // Efficiently update only the clicked question card options
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
      // SUBMIT EXAM LOGIC (ROCK-SOLID BUG FIX)
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

        // 10-point scale rounded to 2 decimal places
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

        recordActivityCompleted();

        // Populate Result UI
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

        // 1. Calculate chapter failure rates
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

        // 2. Identify most failed questions
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
          'Thao tác này sẽ xóa sạch toàn bộ lịch sử ôn tập, kiểm tra, thống kê thuộc bài và chuỗi ngày streak của bạn. Dữ liệu không thể khôi phục lại!',
          () => clearAllData()
        );
      }

      function clearAllData() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem('hcm_ideology_quiz_v1');
        state = {
          theme: state.theme,
          streak: {
            current: 0,
            longest: 0,
            lastActivityDate: null,
            historyDates: []
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
            // Exam Mode
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
      // CONFIRMATION MODAL HELPER (ZERO-BUG FIX)
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

      // Public API initialization
      function init() {
        loadState();
        renderStreakBanner();
      }

      return {
        init,
        navigateTo,
        toggleTheme,
        // Practice
        openPracticeSettings,
        closePracticeSettingsModal,
        confirmStartPractice,
        startPractice,
        prevPracticeQuestion,
        nextPracticeQuestion,
        finishPracticeEarly,
        confirmExitPractice,
        retryWrongQuestions,
        openCustomPracticeModal,
        closeCustomPracticeModal,
        onCustomChapterCheck,
        toggleSelectAllCustomChapters,
        startCustomPractice,
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
console.log('Successfully generated v2 index.html with 10 questions/page, flagging, and rock-solid submit!');
