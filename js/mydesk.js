/* MYDESK presentation layer: original lesson/work engine remains intact. */
(() => {
  const labels = {
    today: '今日の授業', plan: '授業計画', grid: '授業一覧', unit: '単元管理', sum: '授業サマリー', lib: '教材ライブラリ',
    home: '今日のタスク', year: '年間タスク', links: 'リンク集', docs: '手順・メモ', cal: 'カレンダー', set: '仕事の設定'
  };
  const nav = [...document.querySelectorAll('[data-goto]')];
  const shell = document.getElementById('mydesk-shell');
  const sidebar = document.getElementById('mydesk-sidebar');
  const label = document.getElementById('md-current-view');
  const sync = document.getElementById('md-sync-label');
  const syncDot = document.querySelector('.md-sync-indicator i');
  function goto(key) {
    if (key === 'settings') {
      document.querySelector('[data-act="settings"]')?.click();
      return;
    }
    if (key.startsWith('work:')) {
      document.getElementById('mode-work')?.click();
      document.querySelector(`[data-wtab="${key.split(':')[1]}"]`)?.click();
    } else {
      document.getElementById('mode-class')?.click();
      document.querySelector(`[data-tab="${key}"]`)?.click();
    }
    sidebar?.classList.remove('open');
    syncNav();
  }
  function syncNav() {
    const workMode = document.getElementById('mode-work')?.getAttribute('aria-pressed') === 'true';
    const selectedClass = document.querySelector('#classtabs [data-tab][aria-selected="true"]')?.dataset.tab || 'today';
    const selectedWork = document.querySelector('#worktabs [data-wtab][aria-selected="true"]')?.dataset.wtab || 'home';
    const key = workMode ? `work:${selectedWork}` : selectedClass;
    nav.forEach(b => b.classList.toggle('active', b.dataset.goto === key || (key === 'today' && b.dataset.goto === 'today')));
    label.textContent = workMode ? (labels[selectedWork] || '仕事') : (labels[selectedClass] || '授業');
    const modeBtn = document.getElementById(workMode ? 'mode-work' : 'mode-class');
    if (modeBtn) modeBtn.setAttribute('aria-pressed','true');
    const statusText = document.getElementById('status')?.textContent || '';
    if (sync) sync.textContent = /GitHubに保存済み/.test(statusText) ? 'GitHubに同期済み' : /保存中/.test(statusText) ? '同期しています' : 'この端末に保存';
    if (syncDot) syncDot.classList.toggle('is-synced', /GitHubに保存済み/.test(statusText));
  }
  nav.forEach(b => b.addEventListener('click', () => goto(b.dataset.goto)));
  document.getElementById('md-mobile-menu')?.addEventListener('click', () => sidebar?.classList.toggle('open'));
  document.addEventListener('click', e => { if (e.target.closest('[data-tab],[data-wtab],[data-act="mode"]')) setTimeout(syncNav, 0); });
  const compat = document.querySelector('.md-compat');
  if (compat && 'MutationObserver' in window) new MutationObserver(syncNav).observe(compat, {subtree:true, attributes:true, attributeFilter:['aria-selected','aria-pressed','hidden']});
  const status = document.getElementById('status');
  if (status && 'MutationObserver' in window) new MutationObserver(syncNav).observe(status, {childList:true,subtree:true,characterData:true});
  syncNav();
})();
