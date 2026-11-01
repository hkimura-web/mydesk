/* MYDESK Quick Access — keyboard-first navigation and actions. */
(() => {
  const dialog = document.getElementById('quickdlg');
  const input = document.getElementById('quick-input');
  const results = document.getElementById('quick-results');
  if (!dialog || !input || !results) return;

  const commands = [
    {title:'今日の授業', group:'授業', hint:'今日の時間割・授業記録', key:'today', icon:'◫'},
    {title:'授業計画', group:'授業', hint:'クラス別の計画とコマの編集', key:'plan', icon:'▤'},
    {title:'授業一覧', group:'授業', hint:'日付ごとの授業を一覧で確認', key:'grid', icon:'▦'},
    {title:'単元管理', group:'授業', hint:'単元・教材・予定内容を管理', key:'unit', icon:'◇'},
    {title:'授業サマリー', group:'授業', hint:'学期の授業実績を振り返る', key:'sum', icon:'▥'},
    {title:'教材ライブラリ', group:'授業', hint:'教科書・教材リンクを探す', key:'lib', icon:'▧'},
    {title:'今日のタスク', group:'仕事', hint:'今日やること・期限の確認', key:'work:home', icon:'✓'},
    {title:'年間タスク', group:'仕事', hint:'年間の仕事と準備を管理', key:'work:year', icon:'▦'},
    {title:'カレンダー', group:'仕事', hint:'仕事の予定をカレンダーで確認', key:'work:cal', icon:'▣'},
    {title:'リンク集', group:'資料', hint:'校務・ICT・よく使うリンク', key:'work:links', icon:'↗'},
    {title:'手順・メモ', group:'資料', hint:'仕事の手順と共有メモ', key:'work:docs', icon:'▤'},
    {title:'同期・バックアップ', group:'システム', hint:'GitHub接続・JSONの保存と復元', key:'settings', icon:'⚙'},
    {title:'タスクを追加', group:'クイック操作', hint:'年間タスクに新しい仕事を登録', key:'add-task', icon:'＋'}
  ];
  let filtered = commands, active = 0;

  function open() {
    if (!dialog.open) dialog.showModal();
    input.value = '';
    filter();
    requestAnimationFrame(() => input.focus());
  }
  function close() { if (dialog.open) dialog.close(); }
  function filter() {
    const q = input.value.trim().toLocaleLowerCase();
    filtered = commands.filter(c => !q || (c.title + ' ' + c.group + ' ' + c.hint).toLocaleLowerCase().includes(q));
    active = 0;
    results.innerHTML = filtered.length ? filtered.map((c,i) => `<button type="button" class="quick-item${i===active?' selected':''}" data-index="${i}"><span class="quick-item-icon">${c.icon}</span><span class="quick-item-copy"><b>${c.title}</b><small>${c.group} · ${c.hint}</small></span><span class="quick-enter">↵</span></button>`).join('') : '<div class="quick-empty">該当する機能がありません</div>';
  }
  function select(index) {
    if (!filtered.length) return;
    active = (index + filtered.length) % filtered.length;
    results.querySelectorAll('.quick-item').forEach((el,i) => el.classList.toggle('selected', i===active));
    results.querySelector('.quick-item.selected')?.scrollIntoView({block:'nearest'});
  }
  function run() {
    const item = filtered[active]; if (!item) return;
    close();
    if (item.key === 'add-task') {
      document.querySelector('[data-goto="work:year"]')?.click();
      setTimeout(() => document.querySelector('#app [data-wact="eo"]')?.click(), 80);
    } else document.querySelector(`[data-goto="${item.key}"]`)?.click();
  }

  document.getElementById('md-search-trigger')?.addEventListener('click', open);
  input.addEventListener('input', filter);
  input.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); select(active+1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); select(active-1); }
    else if (e.key === 'Enter') { e.preventDefault(); run(); }
    else if (e.key === 'Escape') close();
  });
  results.addEventListener('click', e => {
    const item = e.target.closest('[data-index]'); if (!item) return;
    active = Number(item.dataset.index); run();
  });
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); }
    if (e.key === '/' && !dialog.open && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) { e.preventDefault(); open(); }
  });
})();
