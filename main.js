// ===================================
// Git学習サイト - JavaScript
// このファイルも複数人で編集してコンフリクトを体験しよう！
// ===================================

// ---- ページ読み込み時のアニメーション ----
document.addEventListener('DOMContentLoaded', () => {
  // カードをフェードインさせる
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.4s ease ${i * 0.1}s, transform 0.4s ease ${i * 0.1}s`;
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100);
  });

  // ---- アクティブなナビリンクをハイライト ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${entry.target.id}`
            ? 'var(--color-accent)'
            : 'var(--color-muted)';
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => observer.observe(s));
});

// ---- TODO: メンバーBが担当 ----
// ダークモード切替ボタンを追加してみよう
// function toggleDarkMode() { ... }

// ---- TODO: メンバーCが担当 ----
// 活動ログをフィルタリングする機能を追加してみよう
// function filterLog(branch) { ... }
