const fs = require('fs');

// Read questions
const questions = JSON.parse(fs.readFileSync('src/data/questions.json', 'utf8'));

// Verify count
console.log('Building index.html with', questions.length, 'questions...');

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
  <meta name="description" content="Website ôn tập và kiểm tra trắc nghiệm môn Tư tưởng Hồ Chí Minh với đầy đủ 475 câu hỏi theo 6 chương, phân tích thuộc bài và chuỗi streak học tập hàng ngày." />
  <meta property="og:title" content="Ôn Thi Tư Tưởng Hồ Chí Minh - Trắc Nghiệm 475 Câu" />
  <meta property="og:description" content="Website ôn tập và kiểm tra trắc nghiệm môn Tư tưởng Hồ Chí Minh với 475 câu hỏi theo 6 chương." />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />

  <style>
    /* CSS System & Variables */
    :root {
      --bg-page: #f8fafc;
      --bg-card: #ffffff;
      --bg-subtle: #f1f5f9;
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
      --info: #0284c7;
      --info-light: #f0f9ff;
      --radius-sm: 8px;
      --radius-md: 12px;
      --radius-lg: 16px;
      --radius-xl: 20px;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04);
      --font-sans: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    }

    [data-theme="dark"] {
      --bg-page: #0b1120;
      --bg-card: #151e32;
      --bg-subtle: #1e293b;
      --border-color: #334155;
      --border-focus: #f43f5e;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --text-light: #64748b;
      --primary: #e11d48;
      --primary-hover: #be123c;
      --primary-light: #4c0519;
      --primary-text: #ffffff;
      --accent: #f43f5e;
      --success: #10b981;
      --success-light: #064e3b;
      --success-border: #047857;
      --danger: #ef4444;
      --danger-light: #450a0a;
      --danger-border: #b91c1c;
      --warning: #f59e0b;
      --warning-light: #451a03;
      --info: #38bdf8;
      --info-light: #082f49;
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
      --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
      --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.4);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      -webkit-tap-highlight-color: transparent;
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
      padding: 12px 0;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--border-color);
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
    }

    .brand-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--primary), #e11d48);
      color: white;
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 700;
      box-shadow: var(--shadow-sm);
    }

    .brand-text h1 {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.2;
      color: var(--text-main);
    }

    .brand-text p {
      font-size: 12px;
      color: var(--text-muted);
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
      padding: 8px 12px;
      border-radius: var(--radius-md);
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }

    .btn-icon:hover {
      background: var(--bg-subtle);
      border-color: var(--border-focus);
    }

    /* Streak & Progress Banner */
    .streak-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      margin-bottom: 24px;
      box-shadow: var(--shadow-sm);
      display: flex;
      flex-direction: column;
      gap: 14px;
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
      gap: 10px;
    }

    .streak-flame {
      font-size: 30px;
      line-height: 1;
      filter: drop-shadow(0 2px 4px rgba(234, 88, 12, 0.3));
    }

    .streak-count {
      font-size: 24px;
      font-weight: 800;
      color: var(--text-main);
    }

    .streak-subtitle {
      font-size: 13px;
      color: var(--text-muted);
    }

    .streak-record {
      font-size: 13px;
      font-weight: 600;
      color: var(--warning);
      background: var(--warning-light);
      padding: 4px 10px;
      border-radius: var(--radius-sm);
      border: 1px solid rgba(217, 119, 6, 0.2);
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
      padding: 8px 4px;
      border-radius: var(--radius-sm);
      background: var(--bg-subtle);
      border: 1px solid transparent;
      font-size: 12px;
      transition: all 0.2s;
    }

    .week-day.today {
      border-color: var(--primary);
      font-weight: 700;
    }

    .week-day.active {
      background: var(--primary-light);
      color: var(--primary);
      font-weight: 700;
    }

    .week-day-name {
      color: var(--text-muted);
      margin-bottom: 2px;
    }

    .week-day-status {
      font-size: 15px;
      margin-top: 2px;
    }

    /* Main Menu Grid */
    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 28px;
    }

    .menu-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 24px 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      box-shadow: var(--shadow-sm);
      transition: all 0.25s ease;
      position: relative;
      overflow: hidden;
    }

    .menu-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--primary);
      opacity: 0;
      transition: opacity 0.2s;
    }

    .menu-card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-md);
      border-color: var(--border-focus);
    }

    .menu-card:hover::before {
      opacity: 1;
    }

    .menu-card-icon {
      font-size: 32px;
      width: 52px;
      height: 52px;
      border-radius: var(--radius-md);
      background: var(--bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .menu-card-title {
      font-size: 19px;
      font-weight: 700;
      color: var(--text-main);
    }

    .menu-card-desc {
      font-size: 14px;
      color: var(--text-muted);
      line-height: 1.5;
    }

    .menu-card-action {
      margin-top: auto;
      font-size: 13px;
      font-weight: 600;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* Button System */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 10px 20px;
      font-size: 15px;
      font-weight: 600;
      border-radius: var(--radius-md);
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      min-height: 44px;
    }

    .btn-primary {
      background: var(--primary);
      color: var(--primary-text);
      box-shadow: 0 2px 4px rgba(190, 18, 60, 0.2);
    }

    .btn-primary:hover {
      background: var(--primary-hover);
      box-shadow: 0 4px 8px rgba(190, 18, 60, 0.3);
    }

    .btn-secondary {
      background: var(--bg-card);
      border-color: var(--border-color);
      color: var(--text-main);
    }

    .btn-secondary:hover {
      background: var(--bg-subtle);
      border-color: var(--text-muted);
    }

    .btn-outline {
      background: transparent;
      border: 1px solid var(--border-color);
      color: var(--text-main);
    }

    .btn-outline:hover {
      background: var(--bg-subtle);
    }

    .btn-danger {
      background: var(--danger);
      color: #ffffff;
    }

    .btn-danger:hover {
      background: #b91c1c;
    }

    .btn-sm {
      padding: 6px 12px;
      font-size: 13px;
      min-height: 34px;
      border-radius: var(--radius-sm);
    }

    .btn-lg {
      padding: 14px 28px;
      font-size: 16px;
      min-height: 50px;
      border-radius: var(--radius-lg);
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* View Sections */
    .view-section {
      display: none;
      flex-direction: column;
      gap: 20px;
      animation: fadeIn 0.2s ease;
    }

    .view-section.active {
      display: flex;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Page Header in Subviews */
    .view-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 12px;
      padding-bottom: 16px;
      border-bottom: 1px solid var(--border-color);
    }

    .view-title-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .view-title {
      font-size: 22px;
      font-weight: 800;
      color: var(--text-main);
    }

    .view-subtitle {
      font-size: 14px;
      color: var(--text-muted);
    }

    /* Chapter Selection Cards in Practice */
    .action-banner {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 8px;
    }

    .big-action-card {
      background: linear-gradient(135deg, var(--bg-card), var(--bg-subtle));
      border: 2px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 16px;
      cursor: pointer;
      transition: all 0.25s ease;
      box-shadow: var(--shadow-sm);
    }

    .big-action-card:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .big-action-card.featured {
      background: linear-gradient(135deg, rgba(190, 18, 60, 0.08), var(--bg-card));
      border-color: rgba(190, 18, 60, 0.4);
    }

    .big-action-icon {
      font-size: 32px;
      width: 56px;
      height: 56px;
      background: var(--bg-card);
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: var(--shadow-sm);
      flex-shrink: 0;
    }

    .big-action-info h3 {
      font-size: 17px;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 4px;
    }

    .big-action-info p {
      font-size: 13px;
      color: var(--text-muted);
    }

    .chapters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 16px;
    }

    .chapter-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      gap: 12px;
      transition: all 0.2s;
      box-shadow: var(--shadow-sm);
    }

    .chapter-card:hover {
      border-color: var(--primary);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }

    .chapter-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
    }

    .chapter-tag {
      font-size: 12px;
      font-weight: 700;
      color: var(--primary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .chapter-count {
      font-size: 12px;
      font-weight: 600;
      color: var(--text-muted);
    }

    .chapter-name {
      font-size: 15px;
      font-weight: 700;
      line-height: 1.4;
      color: var(--text-main);
    }

    .progress-bar-container {
      width: 100%;
      height: 8px;
      background: var(--bg-subtle);
      border-radius: 999px;
      overflow: hidden;
      margin-top: 4px;
    }

    .progress-bar-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--primary), #f43f5e);
      border-radius: 999px;
      transition: width 0.3s ease;
    }

    .progress-stats {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-muted);
    }

    /* Control Panel / Toggles */
    .control-panel {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: var(--shadow-sm);
    }

    .control-panel-title {
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .toggle-group {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .toggle-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 8px 0;
    }

    .toggle-label {
      font-size: 14px;
      color: var(--text-main);
      font-weight: 500;
    }

    .toggle-sublabel {
      font-size: 12px;
      color: var(--text-muted);
    }

    /* Switch Styling */
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
      top: 0; left: 0; right: 0; bottom: 0;
      background-color: var(--border-color);
      transition: .3s;
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
      transition: .3s;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    }

    input:checked + .slider {
      background-color: var(--primary);
    }

    input:checked + .slider:before {
      transform: translateX(22px);
    }

    /* Quiz Player View */
    .quiz-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 28px 24px;
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
      font-size: 13px;
      color: var(--text-muted);
    }

    .quiz-chapter-pill {
      font-weight: 700;
      color: var(--primary);
      background: var(--primary-light);
      padding: 4px 10px;
      border-radius: var(--radius-sm);
    }

    .quiz-counter {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-main);
    }

    .question-text {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.5;
      color: var(--text-main);
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
      font-size: 15px;
      font-weight: 500;
      color: var(--text-main);
      text-align: left;
      cursor: pointer;
      display: flex;
      align-items: flex-start;
      gap: 12px;
      transition: all 0.2s;
      line-height: 1.5;
      min-height: 48px;
    }

    .option-btn:hover:not(:disabled) {
      background: var(--bg-subtle);
      border-color: var(--text-muted);
    }

    .option-letter {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background: var(--bg-subtle);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      color: var(--text-main);
      flex-shrink: 0;
      margin-top: 1px;
    }

    .option-text {
      flex: 1;
    }

    /* Option Selected (when feedback off) */
    .option-btn.selected {
      border-color: var(--primary);
      background: var(--primary-light);
    }

    .option-btn.selected .option-letter {
      background: var(--primary);
      color: white;
    }

    /* Option Feedback Colors (when feedback on) */
    .option-btn.correct {
      border-color: var(--success);
      background: var(--success-light);
      color: var(--text-main);
    }

    .option-btn.correct .option-letter {
      background: var(--success);
      color: white;
    }

    .option-btn.incorrect {
      border-color: var(--danger);
      background: var(--danger-light);
      color: var(--text-main);
    }

    .option-btn.incorrect .option-letter {
      background: var(--danger);
      color: white;
    }

    .feedback-banner {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      animation: fadeIn 0.2s ease;
    }

    .feedback-banner.correct {
      background: var(--success-light);
      border: 1px solid var(--success-border);
      color: var(--success);
    }

    .feedback-banner.incorrect {
      background: var(--danger-light);
      border: 1px solid var(--danger-border);
      color: var(--danger);
    }

    /* Quiz Navigation Footer */
    .quiz-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    /* Question Matrix Drawer / Modal */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(2px);
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
      border-radius: var(--radius-xl);
      max-width: 600px;
      width: 100%;
      max-height: 88vh;
      display: flex;
      flex-direction: column;
      box-shadow: var(--shadow-lg);
      border: 1px solid var(--border-color);
      overflow: hidden;
      animation: modalPop 0.2s ease;
    }

    @keyframes modalPop {
      from { opacity: 0; transform: scale(0.96); }
      to { opacity: 1; transform: scale(1); }
    }

    .modal-header {
      padding: 18px 24px;
      border-bottom: 1px solid var(--border-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-header h3 {
      font-size: 18px;
      font-weight: 700;
      color: var(--text-main);
    }

    .modal-body {
      padding: 20px 24px;
      overflow-y: auto;
      flex: 1;
    }

    .modal-footer {
      padding: 16px 24px;
      border-top: 1px solid var(--border-color);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      background: var(--bg-subtle);
    }

    .question-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(42px, 1fr));
      gap: 8px;
    }

    .grid-num-btn {
      height: 42px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .grid-num-btn:hover {
      border-color: var(--primary);
    }

    .grid-num-btn.active {
      outline: 2px solid var(--primary);
      outline-offset: 1px;
    }

    .grid-num-btn.answered {
      background: var(--primary-light);
      border-color: var(--primary);
      color: var(--primary);
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

    /* Result Screens */
    .result-card {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-xl);
      padding: 32px 24px;
      box-shadow: var(--shadow-md);
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }

    .score-circle {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--primary-light), var(--bg-subtle));
      border: 4px solid var(--primary);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 8px 0;
    }

    .score-val {
      font-size: 34px;
      font-weight: 900;
      color: var(--primary);
      line-height: 1;
    }

    .score-max {
      font-size: 13px;
      font-weight: 600;
      color: var(--text-muted);
    }

    .stats-summary-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 12px;
      width: 100%;
      max-width: 600px;
    }

    .stat-box {
      background: var(--bg-subtle);
      border-radius: var(--radius-md);
      padding: 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
    }

    .stat-box-val {
      font-size: 20px;
      font-weight: 800;
      color: var(--text-main);
    }

    .stat-box-lbl {
      font-size: 12px;
      color: var(--text-muted);
    }

    .result-actions {
      display: flex;
      gap: 14px;
      flex-wrap: wrap;
      justify-content: center;
      margin-top: 8px;
    }

    /* Review questions list */
    .review-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100%;
      text-align: left;
    }

    .review-item {
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 18px 20px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .review-item.is-correct {
      border-left: 4px solid var(--success);
    }

    .review-item.is-wrong {
      border-left: 4px solid var(--danger);
    }

    .review-item.is-skipped {
      border-left: 4px solid var(--text-light);
    }

    .review-meta {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: var(--text-muted);
    }

    /* Charts (CSS Bar Chart) */
    .chart-container {
      width: 100%;
      background: var(--bg-card);
      border: 1px solid var(--border-color);
      border-radius: var(--radius-lg);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .chart-bar-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .chart-bar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
    }

    .chart-bar-title {
      font-weight: 600;
      color: var(--text-main);
    }

    .chart-bar-stat {
      font-weight: 700;
      color: var(--primary);
    }

    .chart-bar-track {
      height: 10px;
      background: var(--bg-subtle);
      border-radius: 999px;
      overflow: hidden;
      width: 100%;
    }

    .chart-bar-fill {
      height: 100%;
      border-radius: 999px;
      transition: width 0.4s ease;
    }

    /* Form & Range Inputs */
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-label {
      font-size: 14px;
      font-weight: 600;
      color: var(--text-main);
      display: flex;
      justify-content: space-between;
    }

    .form-input {
      padding: 10px 14px;
      border-radius: var(--radius-md);
      border: 1px solid var(--border-color);
      background: var(--bg-card);
      color: var(--text-main);
      font-size: 15px;
      font-family: inherit;
    }

    .form-range {
      width: 100%;
      accent-color: var(--primary);
      cursor: pointer;
    }

    /* Responsive Queries */
    @media (max-width: 640px) {
      .app-container {
        padding: 12px 14px 40px;
      }
      .action-banner {
        grid-template-columns: 1fr;
      }
      .menu-grid {
        grid-template-columns: 1fr;
      }
      .chapters-grid {
        grid-template-columns: 1fr;
      }
      .quiz-card {
        padding: 20px 16px;
      }
      .question-text {
        font-size: 16px;
      }
      .option-btn {
        padding: 12px 14px;
        font-size: 14px;
      }
      .week-calendar {
        gap: 4px;
      }
      .week-day {
        padding: 6px 2px;
        font-size: 11px;
      }
    }
  </style>
</head>
<body>
  <div class="app-container">
    <!-- Top Navigation -->
    <header class="top-nav">
      <div class="brand-group" onclick="App.navigateTo('menu')">
        <div class="brand-icon">HCM</div>
        <div class="brand-text">
          <h1>Tư Tưởng Hồ Chí Minh</h1>
          <p>Ôn Tập & Kiểm Tra Trắc Nghiệm 475 Câu</p>
        </div>
      </div>
      <div class="nav-actions">
        <button class="btn-icon" id="themeToggleBtn" onclick="App.toggleTheme()" title="Đổi giao diện sáng/tối">
          <span id="themeIcon">🌙</span> <span id="themeText">Tối</span>
        </button>
        <button class="btn-icon" id="navHomeBtn" onclick="App.navigateTo('menu')" style="display: none;">
          🏠 Menu
        </button>
      </div>
    </header>

    <!-- VIEW: MAIN MENU -->
    <main id="view-menu" class="view-section active">
      <!-- Streak Banner -->
      <section class="streak-card" id="streakCard">
        <div class="streak-header">
          <div class="streak-badge">
            <span class="streak-flame">🔥</span>
            <div>
              <div class="streak-count" id="streakDisplay">0 Ngày</div>
              <div class="streak-subtitle">Chuỗi ngày học liên tiếp</div>
            </div>
          </div>
          <div class="streak-record" id="longestStreakDisplay">
            🏆 Kỷ lục: 0 ngày
          </div>
        </div>
        <div class="week-calendar" id="weekCalendar">
          <!-- Rendered dynamically -->
        </div>
      </section>

      <!-- 3 Main Categories -->
      <div class="menu-grid">
        <!-- 1. Ôn Tập -->
        <div class="menu-card" onclick="App.navigateTo('practice-select')">
          <div class="menu-card-icon">📚</div>
          <div class="menu-card-title">1. ÔN TẬP</div>
          <div class="menu-card-desc">
            Ôn luyện theo từng chương trong 6 chương, ôn tất cả 475 câu, hoặc chọn tự do nhiều chương. Hỗ trợ tráo câu hỏi và hiện đáp án tức thì.
          </div>
          <div class="menu-card-action">
            Bắt đầu ôn tập ➔
          </div>
        </div>

        <!-- 2. Kiểm Tra -->
        <div class="menu-card" onclick="App.navigateTo('exam-setup')">
          <div class="menu-card-icon">⏱️</div>
          <div class="menu-card-title">2. KIỂM TRA</div>
          <div class="menu-card-desc">
            Thi thử từ 40 - 120 câu với tỉ lệ % câu hỏi tùy chỉnh theo từng chương. Đồng hồ đếm ngược, tính điểm thang 10, phân tích điểm mạnh yếu.
          </div>
          <div class="menu-card-action">
            Thiết lập đề thi ➔
          </div>
        </div>

        <!-- 3. Kiểm Tra Tiến Độ -->
        <div class="menu-card" onclick="App.navigateTo('mastery-analytics')">
          <div class="menu-card-icon">📊</div>
          <div class="menu-card-title">3. TIẾN ĐỘ THUỘC BÀI</div>
          <div class="menu-card-desc">
            Thống kê các chương hay sai nhất, danh sách câu hỏi hay quên cần ôn lại, kèm đáp án đúng chuẩn xác dựa trên lịch sử làm bài.
          </div>
          <div class="menu-card-action">
            Xem phân tích ➔
          </div>
        </div>
      </div>

      <!-- Quick Summary Footer Info -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 16px 20px; font-size: 13px; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <span>📖 Ngân hàng: <strong>475 câu trắc nghiệm</strong> chính thức</span>
        <span>💾 Dữ liệu lưu an toàn trên máy (localStorage)</span>
      </div>
    </main>

    <!-- VIEW 1: PRACTICE SELECTION (ÔN TẬP) -->
    <section id="view-practice-select" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <h2 class="view-title">Ôn Tập Trắc Nghiệm</h2>
          <p class="view-subtitle">Chọn chương hoặc ôn tự do theo nhu cầu</p>
        </div>
        <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('menu')">
          ⬅️ Về Menu
        </button>
      </div>

      <!-- Two Large Buttons -->
      <div class="action-banner">
        <div class="big-action-card featured" onclick="App.openPracticeSettings('all')">
          <div class="big-action-icon">🌟</div>
          <div class="big-action-info">
            <h3>ÔN TẤT CẢ CÁC CÂU</h3>
            <p>Trọn bộ 475 câu hỏi thuộc toàn bộ 6 chương</p>
          </div>
        </div>

        <div class="big-action-card" onclick="App.openCustomPracticeModal()">
          <div class="big-action-icon">🎯</div>
          <div class="big-action-info">
            <h3>ÔN TỰ DO</h3>
            <p>Tự tick chọn 1 hoặc nhiều chương tùy ý</p>
          </div>
        </div>
      </div>

      <!-- Chapter Cards with Progress Trackers -->
      <h3 style="font-size: 16px; font-weight: 700; color: var(--text-main); margin-top: 8px;">6 Chương Trọng Tâm</h3>
      <div class="chapters-grid" id="chaptersPracticeGrid">
        <!-- Generated by JS -->
      </div>
    </section>

    <!-- VIEW 1B: PRACTICE QUIZ SCREEN -->
    <section id="view-practice-quiz" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <span class="quiz-chapter-pill" id="practiceChapterTag">Chương 1</span>
          <span style="font-size: 13px; color: var(--text-muted);" id="practiceProgressText">Câu 1/26</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-sm" onclick="App.openQuestionMatrix('practice')" title="Danh sách câu">
            🔢 Bảng câu
          </button>
          <button class="btn btn-secondary btn-sm" onclick="App.confirmExitPractice()">
            Thoát
          </button>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="progress-bar-container" style="height: 6px;">
        <div class="progress-bar-fill" id="practiceProgressBar" style="width: 0%;"></div>
      </div>

      <!-- Question Card -->
      <div class="quiz-card">
        <div class="quiz-meta">
          <span style="font-weight: 700;" id="practiceQuesNum">Câu 1</span>
          <span id="practiceAnswerStatusBadge" style="display: none;"></span>
        </div>

        <div class="question-text" id="practiceQuestionText">
          Đang tải câu hỏi...
        </div>

        <div class="options-list" id="practiceOptionsList">
          <!-- Options rendered dynamically -->
        </div>

        <div class="feedback-banner" id="practiceFeedbackBanner" style="display: none;">
          <!-- Immediate feedback text -->
        </div>

        <div class="quiz-footer">
          <button class="btn btn-secondary" id="practicePrevBtn" onclick="App.prevPracticeQuestion()">
            ⬅️ Câu trước
          </button>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-outline btn-sm" onclick="App.finishPracticeEarly()">
              🏁 Kết thúc sớm
            </button>
            <button class="btn btn-primary" id="practiceNextBtn" onclick="App.nextPracticeQuestion()">
              Câu tiếp ➡️
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VIEW 1C: PRACTICE RESULT SCREEN -->
    <section id="view-practice-result" class="view-section">
      <div class="result-card">
        <div style="font-size: 48px; line-height: 1;">🎉</div>
        <h2 style="font-size: 24px; font-weight: 800; color: var(--text-main);">Hoàn Thành Lượt Ôn Tập!</h2>
        <p style="font-size: 14px; color: var(--text-muted);" id="practiceResultSub">Kết quả của lượt ôn vừa qua</p>

        <div class="score-circle">
          <span class="score-val" id="practiceAccuracyRate">100%</span>
          <span class="score-max">Chính xác</span>
        </div>

        <div class="stats-summary-grid">
          <div class="stat-box">
            <span class="stat-box-val" id="practiceTotalCount" style="color: var(--text-main);">0</span>
            <span class="stat-box-lbl">Tổng câu</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="practiceCorrectCount" style="color: var(--success);">0</span>
            <span class="stat-box-lbl">Câu đúng</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="practiceWrongCount" style="color: var(--danger);">0</span>
            <span class="stat-box-lbl">Câu sai</span>
          </div>
        </div>

        <div class="result-actions">
          <button class="btn btn-secondary" onclick="App.navigateTo('menu')">
            🏠 Thoát về Menu
          </button>
          <button class="btn btn-outline" onclick="App.navigateTo('practice-select')">
            📚 Chọn chương khác
          </button>
          <button class="btn btn-primary" id="retryWrongBtn" onclick="App.retryWrongQuestions()" style="display: none;">
            🔄 Làm lại các câu đã làm sai (<span id="retryWrongCountText">0</span>)
          </button>
        </div>
      </div>
    </section>

    <!-- VIEW 2: EXAM SETUP (KIỂM TRA) -->
    <section id="view-exam-setup" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <h2 class="view-title">Thiết Lập Đề Kiểm Tra</h2>
          <p class="view-subtitle">Tạo đề thi trắc nghiệm theo phân bổ chương và thời gian</p>
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

    <!-- VIEW 2B: EXAM TAKING -->
    <section id="view-exam-taking" class="view-section">
      <!-- Exam Fixed Sticky Top Bar -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 14px 18px; display: flex; justify-content: space-between; align-items: center; box-shadow: var(--shadow-sm); flex-wrap: wrap; gap: 10px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 20px; font-weight: 800; color: var(--primary); display: flex; align-items: center; gap: 6px;" id="examTimerDisplay">
            ⏱️ 50:00
          </div>
          <span style="font-size: 13px; color: var(--text-muted);" id="examProgressTracker">Câu 1/60</span>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button class="btn btn-outline btn-sm" onclick="App.openQuestionMatrix('exam')">
            🔢 Danh sách câu (<span id="examAnsweredCountText">0/60</span>)
          </button>
          <button class="btn btn-primary btn-sm" onclick="App.promptSubmitExam()" style="background: #e11d48;">
            📝 NỘP BÀI
          </button>
        </div>
      </div>

      <!-- Exam Question Card -->
      <div class="quiz-card">
        <div class="quiz-meta">
          <span class="quiz-chapter-pill" id="examChapterTag">Chương 1</span>
          <span style="font-size: 12px; color: var(--text-muted);">Được phép đổi đáp án trước khi nộp</span>
        </div>

        <div class="question-text" id="examQuestionText">
          Đang tải câu hỏi kiểm tra...
        </div>

        <div class="options-list" id="examOptionsList">
          <!-- Rendered dynamically -->
        </div>

        <div class="quiz-footer">
          <button class="btn btn-secondary" id="examPrevBtn" onclick="App.prevExamQuestion()">
            ⬅️ Câu trước
          </button>
          <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" id="examNextBtn" onclick="App.nextExamQuestion()">
              Câu sau ➡️
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- VIEW 2C: EXAM RESULT -->
    <section id="view-exam-result" class="view-section">
      <div class="result-card">
        <div style="font-size: 40px;">🏆</div>
        <h2 style="font-size: 24px; font-weight: 800;">Kết Quả Bài Kiểm Tra</h2>
        <div id="examRatingBadge" style="padding: 4px 14px; border-radius: 999px; font-weight: 700; font-size: 13px;">
          Xuất sắc
        </div>

        <div class="score-circle" style="width: 140px; height: 140px; border-width: 5px;">
          <span class="score-val" id="examScoreDisplay" style="font-size: 38px;">9.50</span>
          <span class="score-max">Thang điểm 10</span>
        </div>
        <p style="font-size: 13px; color: var(--text-muted);">
          Công thức: (Số câu đúng / Tổng câu) × 10
        </p>

        <div class="stats-summary-grid">
          <div class="stat-box">
            <span class="stat-box-val" id="examTotalQStat">60</span>
            <span class="stat-box-lbl">Tổng câu</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="examCorrectQStat" style="color: var(--success);">55</span>
            <span class="stat-box-lbl">Làm đúng</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="examWrongQStat" style="color: var(--danger);">5</span>
            <span class="stat-box-lbl">Làm sai</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="examTimeSpentStat">32:15</span>
            <span class="stat-box-lbl">Thời gian</span>
          </div>
        </div>

        <div class="result-actions">
          <button class="btn btn-primary" onclick="App.showExamReview()">
            🔍 KIỂM TRA ĐÁP ÁN
          </button>
          <button class="btn btn-secondary" onclick="App.showExamAnalysis()">
            📊 PHÂN TÍCH THEO CHƯƠNG
          </button>
          <button class="btn btn-outline" onclick="App.navigateTo('menu')">
            🏠 Về Menu
          </button>
        </div>
      </div>

      <!-- Analysis Container (Hidden until clicked) -->
      <div id="examAnalysisContainer" class="chart-container" style="display: none;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="font-size: 17px; font-weight: 700; color: var(--text-main);">Phân Tích Kết Quả Từng Chương</h3>
          <span id="bestChapterNotice" style="font-size: 13px; font-weight: 600; color: var(--success);"></span>
        </div>
        <div id="examChapterCharts" style="display: flex; flex-direction: column; gap: 14px;">
          <!-- Dynamically generated bars -->
        </div>
      </div>

      <!-- Review Questions Container -->
      <div id="examReviewContainer" style="display: none; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-top: 12px;">
          <h3 style="font-size: 18px; font-weight: 700;">Chi Tiết Từng Câu Hỏi</h3>
          <!-- Filter buttons -->
          <div style="display: flex; gap: 6px;">
            <button class="btn btn-outline btn-sm active" id="filterAllBtn" onclick="App.filterExamReview('all')">Tất cả</button>
            <button class="btn btn-outline btn-sm" id="filterWrongBtn" onclick="App.filterExamReview('wrong')">Câu sai</button>
            <button class="btn btn-outline btn-sm" id="filterCorrectBtn" onclick="App.filterExamReview('correct')">Câu đúng</button>
          </div>
        </div>
        <div class="review-list" id="examReviewList">
          <!-- Dynamically populated -->
        </div>
      </div>
    </section>

    <!-- VIEW 3: MASTERY ANALYTICS (KIỂM TRA TIẾN ĐỘ THUỘC BÀI) -->
    <section id="view-mastery-analytics" class="view-section">
      <div class="view-header">
        <div class="view-title-group">
          <h2 class="view-title">Kiểm Tra Tiến Độ Thuộc Bài</h2>
          <p class="view-subtitle">Phân tích chuyên sâu các chương hay quên và câu hỏi hay sai</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-danger btn-sm" onclick="App.confirmClearData()">
            🗑️ Xóa toàn bộ dữ liệu
          </button>
          <button class="btn btn-secondary btn-sm" onclick="App.navigateTo('menu')">
            ⬅️ Về Menu
          </button>
        </div>
      </div>

      <!-- Empty State -->
      <div id="masteryEmptyState" class="result-card" style="padding: 48px 24px; display: none;">
        <div style="font-size: 48px;">📝</div>
        <h3 style="font-size: 20px; font-weight: 700;">Chưa Có Dữ Liệu Học Tập</h3>
        <p style="font-size: 14px; color: var(--text-muted); max-width: 440px;">
          Hãy làm bài ôn tập hoặc kiểm tra trước để hệ thống tự động ghi nhận và chỉ ra các chương, câu hỏi bạn hay quên nhất!
        </p>
        <div style="display: flex; gap: 12px; margin-top: 10px;">
          <button class="btn btn-primary" onclick="App.navigateTo('practice-select')">
            Bắt đầu Ôn Tập
          </button>
          <button class="btn btn-secondary" onclick="App.navigateTo('exam-setup')">
            Làm bài Kiểm Tra
          </button>
        </div>
      </div>

      <!-- Data State -->
      <div id="masteryDataState" style="display: none; flex-direction: column; gap: 24px;">
        <!-- Overview Summary -->
        <div class="stats-summary-grid" style="max-width: 100%;">
          <div class="stat-box">
            <span class="stat-box-val" id="masteryTotalAttempts">0</span>
            <span class="stat-box-lbl">Tổng lượt trả lời</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="masteryOverallAccuracy" style="color: var(--success);">0%</span>
            <span class="stat-box-lbl">Tỉ lệ đúng chung</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="masteryUniqueQuestions">0/475</span>
            <span class="stat-box-lbl">Số câu đã tiếp cận</span>
          </div>
          <div class="stat-box">
            <span class="stat-box-val" id="masteryWeakQuestionsCount" style="color: var(--danger);">0</span>
            <span class="stat-box-lbl">Câu hay sai</span>
          </div>
        </div>

        <!-- Section 1: Ranked Chapters with Highest Error Rate -->
        <div class="chart-container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <h3 style="font-size: 17px; font-weight: 800; color: var(--text-main);">
                ⚠️ Các Chương Bạn Hay Quên / Làm Sai Nhất
              </h3>
              <p style="font-size: 12px; color: var(--text-muted);">
                Xếp hạng từ tỉ lệ làm sai cao nhất đến thấp nhất
              </p>
            </div>
          </div>
          <div id="rankedChaptersList" style="display: flex; flex-direction: column; gap: 14px;">
            <!-- Dynamically populated -->
          </div>
        </div>

        <!-- Section 2: Most Frequently Missed Questions -->
        <div class="chart-container">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <h3 style="font-size: 17px; font-weight: 800; color: var(--text-main);">
                ❌ Danh Sách Các Câu Hỏi Hay Sai Nhất
              </h3>
              <p style="font-size: 12px; color: var(--text-muted);">
                Câu sai nhiều lần hoặc lần làm gần nhất vẫn sai kèm đáp án đúng chuẩn xác
              </p>
            </div>
            <span style="font-size: 13px; font-weight: 600; color: var(--text-muted);" id="failedQuestionsCounter">0 câu</span>
          </div>

          <div class="review-list" id="mostFailedQuestionsList">
            <!-- Dynamically populated -->
          </div>
        </div>
      </div>
    </section>

    <!-- MODAL: Custom Practice Selection ("ÔN TỰ DO") -->
    <div class="modal-overlay" id="customPracticeModal">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Ôn Tự Do (Chọn Nhiều Chương)</h3>
          <button class="btn-icon" onclick="App.closeCustomPracticeModal()">✕</button>
        </div>
        <div class="modal-body" style="display: flex; flex-direction: column; gap: 14px;">
          <p style="font-size: 13px; color: var(--text-muted);">
            Tick chọn 1 hoặc nhiều chương bạn muốn ôn luyện hôm nay:
          </p>
          <div id="customChaptersList" style="display: flex; flex-direction: column; gap: 10px;">
            <!-- Chapter checkboxes -->
          </div>
          <div style="margin-top: 10px; font-size: 14px; font-weight: 600; color: var(--text-main); display: flex; justify-content: space-between;">
            <span>Tổng số câu đã chọn:</span>
            <span id="customSelectedQCount" style="color: var(--primary);">0 câu</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary btn-sm" onclick="App.toggleSelectAllCustomChapters(true)">Chọn tất cả</button>
          <button class="btn btn-secondary btn-sm" onclick="App.toggleSelectAllCustomChapters(false)">Bỏ chọn</button>
          <button class="btn btn-primary btn-sm" id="startCustomPracticeBtn" onclick="App.startCustomPractice()">Bắt đầu ôn</button>
        </div>
      </div>
    </div>

    <!-- MODAL: Control Panel Settings Before Practice -->
    <div class="modal-overlay" id="practiceSettingsModal">
      <div class="modal-card" style="max-width: 480px;">
        <div class="modal-header">
          <h3>Bảng Điều Khiển Ôn Tập</h3>
          <button class="btn-icon" onclick="App.closePracticeSettingsModal()">✕</button>
        </div>
        <div class="modal-body">
          <div class="toggle-group">
            <div class="toggle-item">
              <div>
                <div class="toggle-label">(a) Tráo thứ tự câu hỏi và đáp án</div>
                <div class="toggle-sublabel">Xáo trộn ngẫu nhiên để rèn luyện phản xạ</div>
              </div>
              <label class="switch">
                <input type="checkbox" id="settingShuffle" checked>
                <span class="slider"></span>
              </label>
            </div>
            <div class="toggle-item">
              <div>
                <div class="toggle-label">(b) Hiện đáp án đúng ngay khi chọn</div>
                <div class="toggle-sublabel">Bật: hiện đúng/sai lập tức. Tắt: chỉ ghi nhận đáp án</div>
              </div>
              <label class="switch">
                <input type="checkbox" id="settingImmediate" checked>
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="App.closePracticeSettingsModal()">Hủy</button>
          <button class="btn btn-primary" onclick="App.confirmStartPractice()">Bắt đầu ôn tập</button>
        </div>
      </div>
    </div>

    <!-- MODAL: Question Matrix (Bảng số câu) -->
    <div class="modal-overlay" id="questionMatrixModal">
      <div class="modal-card">
        <div class="modal-header">
          <h3 id="questionMatrixTitle">Danh Sách Câu Hỏi</h3>
          <button class="btn-icon" onclick="App.closeQuestionMatrix()">✕</button>
        </div>
        <div class="modal-body">
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
      <div class="modal-card" style="max-width: 420px;">
        <div class="modal-header">
          <h3 id="confirmModalTitle">Xác Nhận</h3>
          <button class="btn-icon" onclick="App.closeConfirmModal()">✕</button>
        </div>
        <div class="modal-body">
          <p id="confirmModalMessage" style="font-size: 15px; color: var(--text-main); line-height: 1.5;"></p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" onclick="App.closeConfirmModal()">Hủy</button>
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
      // Storage keys
      const STORAGE_KEY = 'hcm_ideology_quiz_v1';

      // Default persistent state
      let state = {
        theme: 'light',
        streak: {
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: '',
          activeDates: []
        },
        questionStats: {}, // { [id]: { attempts: 0, correct: 0, wrong: 0, lastResult: 'correct'|'wrong', lastDate: '' } }
        studySettings: {
          shuffle: true,
          immediateFeedback: true
        },
        examHistory: []
      };

      // Active runtime session states
      let currentView = 'menu';
      let practiceSession = null; // { questions: [], originalQuestions: [], currentIndex: 0, userAnswers: {}, isReviewing: false, wrongQuestionIds: [] }
      let examSession = null;     // { questions: [], currentIndex: 0, userAnswers: {}, timerId: null, secondsLeft: 0, totalSeconds: 0, submitted: false }
      let pendingPracticeType = null; // 'all' | 'chapter-X' | 'custom'
      let selectedCustomChapters = [1];
      let examReviewFilter = 'all';

      // Vietnam Timezone Utility (UTC+7)
      function getVietnamDate(d = new Date()) {
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        return new Date(utc + (3600000 * 7));
      }

      function getVietnamDateString(d = new Date()) {
        const vn = getVietnamDate(d);
        const y = vn.getFullYear();
        const m = String(vn.getMonth() + 1).padStart(2, '0');
        const day = String(vn.getDate()).padStart(2, '0');
        return \`\${y}-\${m}-\${day}\`;
      }

      function getYesterdayVietnamDateString() {
        const vn = getVietnamDate();
        vn.setDate(vn.getDate() - 1);
        const y = vn.getFullYear();
        const m = String(vn.getMonth() + 1).padStart(2, '0');
        const day = String(vn.getDate()).padStart(2, '0');
        return \`\${y}-\${m}-\${day}\`;
      }

      // Load State from LocalStorage
      function loadState() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const parsed = JSON.parse(raw);
            state = { ...state, ...parsed };
          }
        } catch (e) {
          console.warn('Failed to parse localStorage, initializing fresh state', e);
        }

        // Validate streak on load: if last active was before yesterday, streak resets to 0
        const today = getVietnamDateString();
        const yesterday = getYesterdayVietnamDateString();
        if (state.streak.lastActiveDate && state.streak.lastActiveDate !== today && state.streak.lastActiveDate !== yesterday) {
          state.streak.currentStreak = 0;
        }

        applyTheme(state.theme || 'light');
      }

      function saveState() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
          console.error('Error saving state to localStorage', e);
        }
      }

      // Theme Management
      function applyTheme(theme) {
        state.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        const icon = document.getElementById('themeIcon');
        const text = document.getElementById('themeText');
        if (icon && text) {
          if (theme === 'dark') {
            icon.textContent = '☀️';
            text.textContent = 'Sáng';
          } else {
            icon.textContent = '🌙';
            text.textContent = 'Tối';
          }
        }
      }

      function toggleTheme() {
        const next = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        saveState();
      }

      // Streak Activity Recorder
      function recordActivityCompleted() {
        const today = getVietnamDateString();
        const yesterday = getYesterdayVietnamDateString();
        let { currentStreak, longestStreak, lastActiveDate, activeDates } = state.streak;

        if (!activeDates) activeDates = [];
        if (!activeDates.includes(today)) {
          activeDates.push(today);
        }

        if (lastActiveDate !== today) {
          if (lastActiveDate === yesterday) {
            currentStreak += 1;
          } else {
            currentStreak = 1;
          }
          lastActiveDate = today;
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
          state.streak = { currentStreak, longestStreak, lastActiveDate, activeDates };
          saveState();
        }
        renderStreakBanner();
      }

      // Render Streak Banner & Calendar
      function renderStreakBanner() {
        const streakEl = document.getElementById('streakDisplay');
        const longestEl = document.getElementById('longestStreakDisplay');
        const calEl = document.getElementById('weekCalendar');
        if (!streakEl || !calEl) return;

        streakEl.textContent = \`\${state.streak.currentStreak} Ngày\`;
        longestEl.textContent = \`🏆 Kỷ lục: \${state.streak.longestStreak || 0} ngày\`;

        // Generate current week in Vietnam time (Mon - Sun)
        const vnNow = getVietnamDate();
        const currentDayOfWeek = vnNow.getDay(); // 0 is Sun, 1 is Mon...
        // distance to Monday: if 0 (Sun), distance is 6. Otherwise day - 1
        const distanceToMon = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
        
        const monday = new Date(vnNow);
        monday.setDate(vnNow.getDate() - distanceToMon);

        const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
        const todayStr = getVietnamDateString();

        let calHtml = '';
        for (let i = 0; i < 7; i++) {
          const d = new Date(monday);
          d.setDate(monday.getDate() + i);
          const dStr = getVietnamDateString(d);
          const isToday = dStr === todayStr;
          const isActive = (state.streak.activeDates || []).includes(dStr);

          calHtml += \`
            <div class="week-day \${isToday ? 'today' : ''} \${isActive ? 'active' : ''}">
              <span class="week-day-name">\${days[i]}</span>
              <span style="font-weight: 700;">\${d.getDate()}</span>
              <span class="week-day-status">\${isActive ? '🔥' : '·'}</span>
            </div>
          \`;
        }
        calEl.innerHTML = calHtml;
      }

      // Navigation
      function navigateTo(viewId) {
        currentView = viewId;
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        const target = document.getElementById('view-' + viewId);
        if (target) {
          target.classList.add('active');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // Show/hide home nav button
        const navHomeBtn = document.getElementById('navHomeBtn');
        if (navHomeBtn) {
          navHomeBtn.style.display = viewId === 'menu' ? 'none' : 'inline-flex';
        }

        // Specific view hooks
        if (viewId === 'menu') {
          renderStreakBanner();
        } else if (viewId === 'practice-select') {
          renderPracticeChaptersGrid();
        } else if (viewId === 'exam-setup') {
          renderExamSetup();
        } else if (viewId === 'mastery-analytics') {
          renderMasteryAnalytics();
        }
      }

      // Helper: Shuffle Array
      function shuffleArray(arr) {
        const copy = [...arr];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy;
      }

      // Helper: Prepare Questions (optional shuffle questions & answers)
      function prepareQuestions(rawList, shuffleQues = true, shuffleOpts = true) {
        let list = rawList.map(q => {
          let opts = [...q.dapAn];
          let correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.dung);
          let correctContent = q.dapAn[correctIdx];

          if (shuffleOpts) {
            opts = shuffleArray(opts);
            const newCorrectIdx = opts.indexOf(correctContent);
            const newCorrectLetter = ['A', 'B', 'C', 'D'][newCorrectIdx];
            return {
              id: q.id,
              chuong: q.chuong,
              cauHoi: q.cauHoi,
              dapAn: opts,
              dung: newCorrectLetter,
              originalDung: q.dung
            };
          } else {
            return {
              id: q.id,
              chuong: q.chuong,
              cauHoi: q.cauHoi,
              dapAn: opts,
              dung: q.dung,
              originalDung: q.dung
            };
          }
        });

        if (shuffleQues) {
          list = shuffleArray(list);
        }
        return list;
      }

      // ==========================================
      // SECTION 1: ÔN TẬP (PRACTICE)
      // ==========================================
      function renderPracticeChaptersGrid() {
        const container = document.getElementById('chaptersPracticeGrid');
        if (!container) return;

        let html = '';
        for (let c = 1; c <= 6; c++) {
          const cQuestions = ALL_QUESTIONS.filter(q => q.chuong === c);
          const totalQ = cQuestions.length;

          // Compute user progress for this chapter
          let attemptedCount = 0;
          let correctCount = 0;
          cQuestions.forEach(q => {
            const st = state.questionStats[q.id];
            if (st && st.attempts > 0) {
              attemptedCount++;
              if (st.lastResult === 'correct') {
                correctCount++;
              }
            }
          });

          const percentDone = Math.round((attemptedCount / totalQ) * 100);
          const percentCorrect = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;

          html += \`
            <div class="chapter-card" onclick="App.openPracticeSettings('chapter-\${c}')">
              <div class="chapter-header">
                <span class="chapter-tag">Chương \${c}</span>
                <span class="chapter-count">\${totalQ} câu</span>
              </div>
              <div class="chapter-name">\${CHAPTER_NAMES[c]}</div>
              <div class="progress-bar-container">
                <div class="progress-bar-fill" style="width: \${percentDone}%;"></div>
              </div>
              <div class="progress-stats">
                <span>Đã làm: \${attemptedCount}/\${totalQ} câu (\${percentDone}%)</span>
                <span style="font-weight: 700; color: \${percentCorrect >= 70 ? 'var(--success)' : 'var(--text-muted)'};">
                  Đúng: \${percentCorrect}%
                </span>
              </div>
            </div>
          \`;
        }
        container.innerHTML = html;
      }

      function openPracticeSettings(type) {
        pendingPracticeType = type;
        const shuffleCheckbox = document.getElementById('settingShuffle');
        const immCheckbox = document.getElementById('settingImmediate');
        if (shuffleCheckbox) shuffleCheckbox.checked = state.studySettings.shuffle !== false;
        if (immCheckbox) immCheckbox.checked = state.studySettings.immediateFeedback !== false;

        document.getElementById('practiceSettingsModal').classList.add('active');
      }

      function closePracticeSettingsModal() {
        document.getElementById('practiceSettingsModal').classList.remove('active');
      }

      function confirmStartPractice() {
        const shuffle = document.getElementById('settingShuffle').checked;
        const immediateFeedback = document.getElementById('settingImmediate').checked;
        state.studySettings = { shuffle, immediateFeedback };
        saveState();
        closePracticeSettingsModal();

        startPractice(pendingPracticeType);
      }

      function startPractice(type) {
        let questionPool = [];
        if (type === 'all') {
          questionPool = [...ALL_QUESTIONS];
        } else if (type && type.startsWith('chapter-')) {
          const chNum = parseInt(type.replace('chapter-', ''), 10);
          questionPool = ALL_QUESTIONS.filter(q => q.chuong === chNum);
        } else if (type === 'custom') {
          questionPool = ALL_QUESTIONS.filter(q => selectedCustomChapters.includes(q.chuong));
        }

        if (questionPool.length === 0) {
          alert('Không tìm thấy câu hỏi phù hợp!');
          return;
        }

        const prepared = prepareQuestions(questionPool, state.studySettings.shuffle, state.studySettings.shuffle);

        practiceSession = {
          type,
          questions: prepared,
          originalQuestions: [...prepared],
          currentIndex: 0,
          userAnswers: {}, // { [index]: { selected: 'A'|'B'|'C'|'D', isCorrect: bool } }
          wrongQuestionIds: []
        };

        navigateTo('practice-quiz');
        renderPracticeCurrentQuestion();
      }

      function renderPracticeCurrentQuestion() {
        if (!practiceSession) return;
        const { questions, currentIndex, userAnswers } = practiceSession;
        const q = questions[currentIndex];
        if (!q) return;

        // Header info
        document.getElementById('practiceChapterTag').textContent = \`Chương \${q.chuong}\`;
        document.getElementById('practiceProgressText').textContent = \`Câu \${currentIndex + 1}/\${questions.length}\`;
        document.getElementById('practiceQuesNum').textContent = \`Câu \${currentIndex + 1} (Mã: #\${q.id})\`;

        // Progress bar
        const pct = ((currentIndex + 1) / questions.length) * 100;
        document.getElementById('practiceProgressBar').style.width = \`\${pct}%\`;

        // Question text
        document.getElementById('practiceQuestionText').textContent = q.cauHoi;

        // Options
        const optionsList = document.getElementById('practiceOptionsList');
        optionsList.innerHTML = '';

        const feedbackBanner = document.getElementById('practiceFeedbackBanner');
        feedbackBanner.style.display = 'none';

        const recorded = userAnswers[currentIndex];
        const isAnswered = recorded !== undefined;
        const showImmediate = state.studySettings.immediateFeedback;

        const letters = ['A', 'B', 'C', 'D'];
        letters.forEach((letter, idx) => {
          const btn = document.createElement('button');
          btn.className = 'option-btn';

          let stateClass = '';
          if (isAnswered) {
            if (showImmediate) {
              if (letter === q.dung) {
                stateClass = ' correct';
              } else if (letter === recorded.selected && !recorded.isCorrect) {
                stateClass = ' incorrect';
              }
            } else {
              if (letter === recorded.selected) {
                stateClass = ' selected';
              }
            }
          }

          btn.className += stateClass;
          btn.innerHTML = \`
            <span class="option-letter">\${letter}</span>
            <span class="option-text">\${q.dapAn[idx]}</span>
          \`;

          btn.onclick = () => onSelectPracticeOption(letter);
          optionsList.appendChild(btn);
        });

        // Banner if answered with feedback
        if (isAnswered && showImmediate) {
          feedbackBanner.style.display = 'flex';
          if (recorded.isCorrect) {
            feedbackBanner.className = 'feedback-banner correct';
            feedbackBanner.innerHTML = '✅ Chính xác! Bạn đã chọn đúng.';
          } else {
            feedbackBanner.className = 'feedback-banner incorrect';
            feedbackBanner.innerHTML = \`❌ Chưa chính xác! Đáp án đúng là: <strong>\${q.dung}</strong>\`;
          }
        }

        // Nav buttons
        document.getElementById('practicePrevBtn').disabled = currentIndex === 0;
        const nextBtn = document.getElementById('practiceNextBtn');
        if (currentIndex === questions.length - 1) {
          nextBtn.textContent = '🏁 Xem Kết Quả';
        } else {
          nextBtn.textContent = 'Câu tiếp ➡️';
        }
      }

      function onSelectPracticeOption(letter) {
        if (!practiceSession) return;
        const { questions, currentIndex, userAnswers } = practiceSession;
        const q = questions[currentIndex];

        // If immediate feedback is ON and already answered, don't allow changing to keep learning clean
        if (state.studySettings.immediateFeedback && userAnswers[currentIndex] !== undefined) {
          return;
        }

        const isCorrect = letter === q.dung;
        userAnswers[currentIndex] = {
          selected: letter,
          isCorrect
        };

        // Update persistent question stats
        if (!state.questionStats[q.id]) {
          state.questionStats[q.id] = { attempts: 0, correct: 0, wrong: 0, lastResult: '', lastDate: '' };
        }
        const st = state.questionStats[q.id];
        st.attempts += 1;
        if (isCorrect) {
          st.correct += 1;
          st.lastResult = 'correct';
        } else {
          st.wrong += 1;
          st.lastResult = 'wrong';
        }
        st.lastDate = getVietnamDateString();
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

        const { questions, userAnswers } = practiceSession;
        let correctCount = 0;
        let wrongCount = 0;
        let answeredCount = 0;
        let wrongList = [];

        questions.forEach((q, idx) => {
          const ans = userAnswers[idx];
          if (ans) {
            answeredCount++;
            if (ans.isCorrect) {
              correctCount++;
            } else {
              wrongCount++;
              wrongList.push(q);
            }
          }
        });

        practiceSession.wrongQuestions = wrongList;

        const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

        document.getElementById('practiceAccuracyRate').textContent = \`\${accuracy}%\`;
        document.getElementById('practiceTotalCount').textContent = answeredCount;
        document.getElementById('practiceCorrectCount').textContent = correctCount;
        document.getElementById('practiceWrongCount').textContent = wrongCount;

        const retryBtn = document.getElementById('retryWrongBtn');
        const retryCountText = document.getElementById('retryWrongCountText');
        if (wrongCount > 0) {
          retryBtn.style.display = 'inline-flex';
          retryCountText.textContent = wrongCount;
        } else {
          retryBtn.style.display = 'none';
        }

        navigateTo('practice-result');
      }

      function retryWrongQuestions() {
        if (!practiceSession || !practiceSession.wrongQuestions || practiceSession.wrongQuestions.length === 0) return;

        const prepared = prepareQuestions(practiceSession.wrongQuestions, state.studySettings.shuffle, state.studySettings.shuffle);

        practiceSession = {
          type: 'retry-wrong',
          questions: prepared,
          originalQuestions: [...prepared],
          currentIndex: 0,
          userAnswers: {},
          wrongQuestions: []
        };

        navigateTo('practice-quiz');
        renderPracticeCurrentQuestion();
      }

      // Custom practice modal (ÔN TỰ DO)
      function openCustomPracticeModal() {
        const container = document.getElementById('customChaptersList');
        if (!container) return;

        let html = '';
        for (let c = 1; c <= 6; c++) {
          const isChecked = selectedCustomChapters.includes(c);
          const count = ALL_QUESTIONS.filter(q => q.chuong === c).length;
          html += \`
            <label style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; border: 1px solid var(--border-color); border-radius: var(--radius-md); background: var(--bg-card); cursor: pointer;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="checkbox" value="\${c}" \${isChecked ? 'checked' : ''} onchange="App.onCustomChapterCheck(this)" style="width: 18px; height: 18px; accent-color: var(--primary);">
                <span style="font-weight: 700; color: var(--text-main);">Chương \${c}</span>
              </div>
              <span style="font-size: 13px; color: var(--text-muted);">\${count} câu</span>
            </label>
          \`;
        }
        container.innerHTML = html;
        updateCustomSelectedCount();
        document.getElementById('customPracticeModal').classList.add('active');
      }

      function closeCustomPracticeModal() {
        document.getElementById('customPracticeModal').classList.remove('active');
      }

      function onCustomChapterCheck(input) {
        const ch = parseInt(input.value, 10);
        if (input.checked) {
          if (!selectedCustomChapters.includes(ch)) selectedCustomChapters.push(ch);
        } else {
          selectedCustomChapters = selectedCustomChapters.filter(c => c !== ch);
        }
        updateCustomSelectedCount();
      }

      function toggleSelectAllCustomChapters(selectAll) {
        if (selectAll) {
          selectedCustomChapters = [1, 2, 3, 4, 5, 6];
        } else {
          selectedCustomChapters = [];
        }
        openCustomPracticeModal();
      }

      function updateCustomSelectedCount() {
        const total = ALL_QUESTIONS.filter(q => selectedCustomChapters.includes(q.chuong)).length;
        document.getElementById('customSelectedQCount').textContent = \`\${total} câu\`;
        const startBtn = document.getElementById('startCustomPracticeBtn');
        if (startBtn) startBtn.disabled = selectedCustomChapters.length === 0;
      }

      function startCustomPractice() {
        if (selectedCustomChapters.length === 0) return;
        closeCustomPracticeModal();
        openPracticeSettings('custom');
      }

      // ==========================================
      // SECTION 2: KIỂM TRA (EXAM)
      // ==========================================
      // Default Exam Ratios (Sum = 100%)
      let examSettings = {
        questionCount: 60,
        timeMinutes: 50,
        ratios: {
          1: 15,
          2: 15,
          3: 20,
          4: 20,
          5: 10,
          6: 20
        }
      };

      function renderExamSetup() {
        document.getElementById('examQCountSlider').value = examSettings.questionCount;
        document.getElementById('examQCountDisplay').textContent = \`\${examSettings.questionCount} câu\`;

        document.getElementById('examTimeSlider').value = examSettings.timeMinutes;
        document.getElementById('examTimeDisplay').textContent = \`\${examSettings.timeMinutes} phút\`;

        renderExamRatioInputs();
      }

      function onExamQuestionCountChange(val) {
        examSettings.questionCount = parseInt(val, 10);
        document.getElementById('examQCountDisplay').textContent = \`\${examSettings.questionCount} câu\`;
        renderExamRatioInputs();
      }

      function onExamTimeChange(val) {
        examSettings.timeMinutes = parseInt(val, 10);
        document.getElementById('examTimeDisplay').textContent = \`\${examSettings.timeMinutes} phút\`;
      }

      function resetExamRatioEven() {
        // Even split across 6 chapters: 17, 17, 17, 17, 16, 16 = 100
        examSettings.ratios = { 1: 17, 2: 17, 3: 17, 4: 17, 5: 16, 6: 16 };
        renderExamRatioInputs();
      }

      function renderExamRatioInputs() {
        const grid = document.getElementById('examRatioGrid');
        if (!grid) return;

        let totalRatio = 0;
        let quota = calculateExamChapterDistribution(examSettings.questionCount, examSettings.ratios);

        let html = '';
        for (let c = 1; c <= 6; c++) {
          const r = examSettings.ratios[c] || 0;
          totalRatio += r;
          const assignedCount = quota[c] || 0;
          const availableCount = ALL_QUESTIONS.filter(q => q.chuong === c).length;

          html += \`
            <div style="background: var(--bg-subtle); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 14px; display: flex; flex-direction: column; gap: 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 700; font-size: 14px;">Chương \${c}</span>
                <span style="font-size: 13px; font-weight: 700; color: var(--primary);">\${assignedCount} câu</span>
              </div>
              <div style="display: flex; align-items: center; gap: 10px;">
                <input type="range" min="0" max="60" step="5" value="\${r}" style="flex: 1; accent-color: var(--primary);" oninput="App.onChapterRatioChange(\${c}, this.value)">
                <span style="font-weight: 700; font-size: 14px; min-width: 44px; text-align: right;">\${r}%</span>
              </div>
              <span style="font-size: 11px; color: var(--text-muted);">
                Có sẵn \${availableCount} câu trong ngân hàng
              </span>
            </div>
          \`;
        }
        grid.innerHTML = html;

        // Ratio sum check
        const sumBadge = document.getElementById('examRatioSumBadge');
        const startBtn = document.getElementById('startExamBtn');
        const noticeEl = document.getElementById('examQuotaNotice');

        sumBadge.textContent = \`Tổng: \${totalRatio}%\`;
        if (totalRatio === 100) {
          sumBadge.style.background = 'var(--success-light)';
          sumBadge.style.color = 'var(--success)';
          startBtn.disabled = false;
        } else {
          sumBadge.style.background = 'var(--danger-light)';
          sumBadge.style.color = 'var(--danger)';
          startBtn.disabled = true;
        }

        // Check if any chapter had to be capped because it doesn't have enough questions
        let cappedNotes = [];
        for (let c = 1; c <= 6; c++) {
          const avail = ALL_QUESTIONS.filter(q => q.chuong === c).length;
          const ideal = Math.round((examSettings.questionCount * (examSettings.ratios[c] || 0)) / 100);
          if (ideal > avail) {
            cappedNotes.push(\`Chương \${c} chỉ có \${avail} câu (đã tự bù thêm sang các chương khác).\`);
          }
        }
        if (cappedNotes.length > 0) {
          noticeEl.textContent = 'ℹ️ ' + cappedNotes.join(' ');
          noticeEl.style.display = 'block';
        } else {
          noticeEl.style.display = 'none';
        }
      }

      function onChapterRatioChange(ch, val) {
        examSettings.ratios[ch] = parseInt(val, 10);
        renderExamRatioInputs();
      }

      // Intelligent allocation algorithm: calculates quotas, caps at max available, and redistributes
      function calculateExamChapterDistribution(totalCount, ratios) {
        let ideal = {};
        let available = {};
        for (let c = 1; c <= 6; c++) {
          available[c] = ALL_QUESTIONS.filter(q => q.chuong === c).length;
          ideal[c] = Math.round((totalCount * (ratios[c] || 0)) / 100);
        }

        // Cap at max available
        let result = {};
        let deficit = 0;
        for (let c = 1; c <= 6; c++) {
          if (ideal[c] > available[c]) {
            result[c] = available[c];
            deficit += (ideal[c] - available[c]);
          } else {
            result[c] = ideal[c];
          }
        }

        // Adjust rounding errors so total exactly matches totalCount
        let currentSum = Object.values(result).reduce((a, b) => a + b, 0);
        let diff = totalCount - currentSum;

        // Distribute diff to chapters that still have capacity
        if (diff !== 0) {
          const order = [3, 4, 6, 5, 2, 1]; // Chapters with largest question pools
          for (const ch of order) {
            if (diff === 0) break;
            const canAdd = available[ch] - result[ch];
            if (diff > 0 && canAdd > 0) {
              const add = Math.min(diff, canAdd);
              result[ch] += add;
              diff -= add;
            } else if (diff < 0 && result[ch] > 0) {
              const sub = Math.min(-diff, result[ch]);
              result[ch] -= sub;
              diff += sub;
            }
          }
        }

        return result;
      }

      function startExam() {
        const totalRatio = Object.values(examSettings.ratios).reduce((a, b) => a + b, 0);
        if (totalRatio !== 100) {
          alert('Tổng tỉ lệ phần trăm các chương phải bằng đúng 100%!');
          return;
        }

        const distribution = calculateExamChapterDistribution(examSettings.questionCount, examSettings.ratios);
        let examPool = [];

        for (let c = 1; c <= 6; c++) {
          const count = distribution[c] || 0;
          if (count > 0) {
            const chQuestions = ALL_QUESTIONS.filter(q => q.chuong === c);
            const shuffled = shuffleArray(chQuestions).slice(0, count);
            examPool.push(...shuffled);
          }
        }

        // Shuffle exam questions and shuffle answer choices (A-D)
        const finalExamQuestions = prepareQuestions(examPool, true, true);

        examSession = {
          questions: finalExamQuestions,
          currentIndex: 0,
          userAnswers: {}, // { [index]: 'A'|'B'|'C'|'D' }
          totalSeconds: examSettings.timeMinutes * 60,
          secondsLeft: examSettings.timeMinutes * 60,
          timerId: null,
          submitted: false,
          startTime: Date.now()
        };

        navigateTo('exam-taking');
        startExamTimer();
        renderExamCurrentQuestion();
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
        if (examSession.secondsLeft <= 300) { // under 5 minutes
          timerEl.style.color = 'var(--danger)';
        } else {
          timerEl.style.color = 'var(--primary)';
        }
      }

      function renderExamCurrentQuestion() {
        if (!examSession) return;
        const { questions, currentIndex, userAnswers } = examSession;
        const q = questions[currentIndex];
        if (!q) return;

        document.getElementById('examChapterTag').textContent = \`Chương \${q.chuong}: \${CHAPTER_NAMES[q.chuong]}\`;
        document.getElementById('examProgressTracker').textContent = \`Câu \${currentIndex + 1}/\${questions.length}\`;

        const answeredCount = Object.keys(userAnswers).length;
        document.getElementById('examAnsweredCountText').textContent = \`\${answeredCount}/\${questions.length}\`;

        document.getElementById('examQuestionText').textContent = \`Câu \${currentIndex + 1}. \${q.cauHoi}\`;

        const optionsList = document.getElementById('examOptionsList');
        optionsList.innerHTML = '';

        const selectedLetter = userAnswers[currentIndex];
        const letters = ['A', 'B', 'C', 'D'];

        letters.forEach((letter, idx) => {
          const btn = document.createElement('button');
          btn.className = 'option-btn' + (selectedLetter === letter ? ' selected' : '');
          btn.innerHTML = \`
            <span class="option-letter">\${letter}</span>
            <span class="option-text">\${q.dapAn[idx]}</span>
          \`;
          btn.onclick = () => onSelectExamOption(letter);
          optionsList.appendChild(btn);
        });

        // Prev/Next
        document.getElementById('examPrevBtn').disabled = currentIndex === 0;
        const nextBtn = document.getElementById('examNextBtn');
        if (currentIndex === questions.length - 1) {
          nextBtn.textContent = 'Câu đầu ⤴️';
          nextBtn.onclick = () => {
            examSession.currentIndex = 0;
            renderExamCurrentQuestion();
          };
        } else {
          nextBtn.textContent = 'Câu sau ➡️';
          nextBtn.onclick = () => nextExamQuestion();
        }
      }

      function onSelectExamOption(letter) {
        if (!examSession || examSession.submitted) return;
        examSession.userAnswers[examSession.currentIndex] = letter;
        renderExamCurrentQuestion();
      }

      function prevExamQuestion() {
        if (!examSession || examSession.currentIndex <= 0) return;
        examSession.currentIndex--;
        renderExamCurrentQuestion();
      }

      function nextExamQuestion() {
        if (!examSession) return;
        if (examSession.currentIndex < examSession.questions.length - 1) {
          examSession.currentIndex++;
          renderExamCurrentQuestion();
        }
      }

      function promptSubmitExam() {
        if (!examSession || examSession.submitted) return;
        const { questions, userAnswers } = examSession;
        const total = questions.length;
        const answered = Object.keys(userAnswers).length;
        const unanswered = total - answered;

        let msg = '';
        if (unanswered > 0) {
          msg = \`⚠️ <strong>Cảnh báo:</strong> Bạn còn <strong>\${unanswered} câu</strong> chưa trả lời! Bạn có chắc chắn muốn nộp bài bây giờ không?\`;
        } else {
          msg = \`Bạn đã hoàn thành đầy đủ \${total} câu hỏi! Bạn có chắc chắn muốn nộp bài để xem điểm số?\`;
        }

        showConfirmModal('Xác nhận nộp bài kiểm tra', msg, () => submitExam());
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
        const timeSpentSeconds = totalSeconds - secondsLeft;

        let correctCount = 0;
        let wrongCount = 0;
        let skippedCount = 0;

        // Track chapter performance
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

          // Update question stats
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

        // 10-point scale rounded to 2 decimal places: (correct / total) * 10
        const scoreTen = parseFloat(((correctCount / questions.length) * 10).toFixed(2));

        // Save into exam history
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

        // Update daily streak
        recordActivityCompleted();

        // Populate Exam Result UI
        document.getElementById('examScoreDisplay').textContent = scoreTen.toFixed(2);
        document.getElementById('examTotalQStat').textContent = questions.length;
        document.getElementById('examCorrectQStat').textContent = correctCount;
        document.getElementById('examWrongQStat').textContent = wrongCount;

        const m = Math.floor(timeSpentSeconds / 60);
        const s = timeSpentSeconds % 60;
        document.getElementById('examTimeSpentStat').textContent = \`\${m}:\${String(s).padStart(2, '0')}\`;

        // Rating Badge
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

        // Hide review & analysis initially
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
        const { questions, userAnswers } = examSession;
        const container = document.getElementById('examReviewList');

        let html = '';
        questions.forEach((q, idx) => {
          const chosen = userAnswers[idx];
          const isCorrect = chosen === q.dung;
          const isSkipped = !chosen;

          if (examReviewFilter === 'wrong' && isCorrect) return;
          if (examReviewFilter === 'correct' && !isCorrect) return;

          let statusClass = isSkipped ? 'is-skipped' : (isCorrect ? 'is-correct' : 'is-wrong');
          let statusBadge = isSkipped
            ? '<span style="color: var(--text-muted); font-weight: 700;">Chưa làm</span>'
            : (isCorrect
              ? '<span style="color: var(--success); font-weight: 700;">✅ Đúng</span>'
              : '<span style="color: var(--danger); font-weight: 700;">❌ Sai</span>');

          html += \`
            <div class="review-item \${statusClass}">
              <div class="review-meta">
                <span>Câu \${idx + 1} · Chương \${q.chuong}</span>
                <span>\${statusBadge}</span>
              </div>
              <div style="font-weight: 700; color: var(--text-main);">\${q.cauHoi}</div>
              <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 6px; font-size: 14px;">
                <div style="color: \${isCorrect ? 'var(--success)' : 'var(--danger)'};">
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

        // 1. Overall stats
        let totalAttempts = 0;
        let totalCorrect = 0;
        attemptedIds.forEach(id => {
          totalAttempts += stats[id].attempts;
          totalCorrect += stats[id].correct;
        });

        const overallAccuracy = totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
        document.getElementById('masteryTotalAttempts').textContent = totalAttempts;
        document.getElementById('masteryOverallAccuracy').textContent = \`\${overallAccuracy}%\`;
        document.getElementById('masteryUniqueQuestions').textContent = \`\${attemptedIds.length}/475\`;

        // 2. Ranked Chapters by Error Rate
        const rankedContainer = document.getElementById('rankedChaptersList');
        let chapterErrorStats = [];

        for (let c = 1; c <= 6; c++) {
          const chQuestions = ALL_QUESTIONS.filter(q => q.chuong === c);
          let chAttempts = 0;
          let chWrong = 0;

          chQuestions.forEach(q => {
            const st = stats[q.id];
            if (st && st.attempts > 0) {
              chAttempts += st.attempts;
              chWrong += st.wrong;
            }
          });

          const errorRate = chAttempts > 0 ? Math.round((chWrong / chAttempts) * 100) : 0;
          chapterErrorStats.push({
            chapter: c,
            name: CHAPTER_NAMES[c],
            attempts: chAttempts,
            wrong: chWrong,
            errorRate
          });
        }

        // Sort descending by error rate
        chapterErrorStats.sort((a, b) => b.errorRate - a.errorRate);

        let rankedHtml = '';
        chapterErrorStats.forEach((item, idx) => {
          let badgeText = 'Nắm chắc';
          let barColor = 'var(--success)';
          if (item.errorRate >= 50) {
            badgeText = 'Cần ôn gấp';
            barColor = 'var(--danger)';
          } else if (item.errorRate >= 30) {
            badgeText = 'Cần chú ý';
            barColor = 'var(--warning)';
          } else if (item.errorRate >= 15) {
            badgeText = 'Khá ổn';
            barColor = 'var(--primary)';
          }

          rankedHtml += \`
            <div class="chart-bar-item">
              <div class="chart-bar-header">
                <div>
                  <strong style="color: var(--primary);">#\${idx + 1}</strong>
                  <span class="chart-bar-title" style="margin-left: 6px;">Chương \${item.chapter}: \${item.name}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 12px; padding: 2px 8px; border-radius: var(--radius-sm); font-weight: 700; background: \${item.errorRate > 30 ? 'var(--danger-light)' : 'var(--bg-subtle)'}; color: \${barColor};">
                    \${badgeText}
                  </span>
                  <span class="chart-bar-stat" style="color: \${barColor};">
                    Sai: \${item.errorRate}% (\${item.wrong}/\${item.attempts} lần)
                  </span>
                </div>
              </div>
              <div class="chart-bar-track">
                <div class="chart-bar-fill" style="width: \${item.errorRate}%; background: \${barColor};"></div>
              </div>
            </div>
          \`;
        });
        rankedContainer.innerHTML = rankedHtml;

        // 3. List of Most Frequently Failed Questions
        // Criteria: either wrong > 0 OR lastResult === 'wrong'
        let failedQuestions = [];
        ALL_QUESTIONS.forEach(q => {
          const st = stats[q.id];
          if (st && (st.wrong > 0 || st.lastResult === 'wrong')) {
            failedQuestions.push({
              q,
              wrongCount: st.wrong,
              attempts: st.attempts,
              lastResult: st.lastResult,
              errorRate: Math.round((st.wrong / st.attempts) * 100)
            });
          }
        });

        // Sort by wrong count descending, then error rate
        failedQuestions.sort((a, b) => {
          if (b.wrongCount !== a.wrongCount) return b.wrongCount - a.wrongCount;
          return b.errorRate - a.errorRate;
        });

        document.getElementById('masteryWeakQuestionsCount').textContent = failedQuestions.length;
        document.getElementById('failedQuestionsCounter').textContent = \`\${failedQuestions.length} câu\`;

        const failedListContainer = document.getElementById('mostFailedQuestionsList');
        if (failedQuestions.length === 0) {
          failedListContainer.innerHTML = '<p style="color: var(--success); text-align: center; padding: 20px;">Tuyệt vời! Hiện tại bạn không có câu hỏi nào bị làm sai nhiều lần.</p>';
        } else {
          let listHtml = '';
          // Show top 30 most critical weak questions
          const topFailed = failedQuestions.slice(0, 30);
          topFailed.forEach(item => {
            const { q, wrongCount, attempts, lastResult } = item;
            const correctText = q.dapAn[['A','B','C','D'].indexOf(q.dung)];

            listHtml += \`
              <div class="review-item is-wrong">
                <div class="review-meta">
                  <span>Câu mã #\${q.id} · Chương \${q.chuong}</span>
                  <span style="color: var(--danger); font-weight: 700;">
                    \${lastResult === 'wrong' ? '⚠️ Lần gần nhất sai · ' : ''}Đã sai \${wrongCount}/\${attempts} lần
                  </span>
                </div>
                <div style="font-weight: 700; color: var(--text-main); font-size: 15px;">\${q.cauHoi}</div>
                <div style="background: var(--success-light); border: 1px solid var(--success-border); border-radius: var(--radius-md); padding: 10px 14px; margin-top: 6px;">
                  <span style="font-size: 12px; font-weight: 700; color: var(--success); text-transform: uppercase;">Đáp án đúng chuẩn xác:</span>
                  <div style="font-weight: 700; color: var(--text-main); margin-top: 2px;">
                    [\${q.dung}] \${correctText}
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
        state = {
          theme: state.theme,
          streak: {
            currentStreak: 0,
            longestStreak: 0,
            lastActiveDate: '',
            activeDates: []
          },
          questionStats: {},
          studySettings: {
            shuffle: true,
            immediateFeedback: true
          },
          examHistory: []
        };
        saveState();
        renderStreakBanner();
        renderMasteryAnalytics();
        alert('Đã xóa toàn bộ dữ liệu người dùng thành công.');
      }

      // ==========================================
      // QUESTION MATRIX MODAL (JUMP TO ANY QUESTION)
      // ==========================================
      function openQuestionMatrix(mode) {
        const titleEl = document.getElementById('questionMatrixTitle');
        const gridEl = document.getElementById('questionMatrixGrid');

        let questions = [];
        let userAnswers = {};
        let currentIndex = 0;

        if (mode === 'practice' && practiceSession) {
          titleEl.textContent = 'Danh Sách Câu Ôn Tập';
          questions = practiceSession.questions;
          userAnswers = practiceSession.userAnswers;
          currentIndex = practiceSession.currentIndex;
        } else if (mode === 'exam' && examSession) {
          titleEl.textContent = 'Danh Sách Câu Kiểm Tra';
          questions = examSession.questions;
          userAnswers = examSession.userAnswers;
          currentIndex = examSession.currentIndex;
        }

        let html = '';
        questions.forEach((q, idx) => {
          let btnClass = 'grid-num-btn';
          if (idx === currentIndex) btnClass += ' active';

          if (mode === 'practice') {
            const ans = userAnswers[idx];
            if (ans) {
              if (state.studySettings.immediateFeedback) {
                btnClass += ans.isCorrect ? ' correct-ans' : ' wrong-ans';
              } else {
                btnClass += ' answered';
              }
            }
          } else {
            if (userAnswers[idx]) btnClass += ' answered';
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
          examSession.currentIndex = idx;
          renderExamCurrentQuestion();
        }
      }

      // Confirmation Modal Helper
      let onConfirmCallback = null;
      function showConfirmModal(title, msg, onConfirm) {
        document.getElementById('confirmModalTitle').innerHTML = title;
        document.getElementById('confirmModalMessage').innerHTML = msg;
        onConfirmCallback = onConfirm;
        const actionBtn = document.getElementById('confirmModalActionBtn');
        actionBtn.onclick = () => {
          closeConfirmModal();
          if (onConfirmCallback) onConfirmCallback();
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
        prevExamQuestion,
        nextExamQuestion,
        promptSubmitExam,
        showExamAnalysis,
        showExamReview,
        filterExamReview,
        // Analytics
        confirmClearData,
        // Matrix
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
console.log('Successfully generated index.html with all 475 questions and complete single-file SPA!');
