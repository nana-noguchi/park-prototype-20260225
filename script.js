document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab switching in Dashboard "My Tasks" panel
    const dashboardTabs = document.querySelectorAll('.panel .tabs .tab');
    if (dashboardTabs.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                dashboardTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // 1b. Tab switching in Projects page
    const filterTabs = document.querySelectorAll('.page-header .filter-tab');
    if (filterTabs.length > 0) {
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                filterTabs.forEach(t => t.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
    }

    // 2. Clickable rows should navigate
    const rows = document.querySelectorAll('.clickable-row');
    if (rows.length > 0) {
        rows.forEach(row => {
            row.addEventListener('click', (e) => {
                if (e.target.tagName !== 'A' && e.target.parentElement.tagName !== 'A') {
                    const link = row.querySelector('.issue-key');
                    if (link) {
                        console.log('Navigating to ' + link.textContent);
                    }
                }
            });
        });
    }

    // 3. Project Details interaction logic (for projects.html)
    const projectCards = document.querySelectorAll('.project-card-item');
    const projectListPage = document.querySelector('.projects-grid');
    const projectPageHeader = document.querySelector('.page-header');
    const projectDetailPage = document.getElementById('projectDetailPage');

    if (projectCards.length > 0 && projectDetailPage) {
        projectCards.forEach((card, index) => {
            card.addEventListener('click', () => showProjectDetail(index, card));
        });
    }

    function showProjectDetail(index, card) {
        // Hide list, show details
        projectListPage.style.display = 'none';
        if (projectPageHeader) projectPageHeader.style.display = 'none';
        projectDetailPage.style.display = 'block';

        // Extract basic data from clicked card
        const titleEl = card.querySelector('.project-card-title');
        const badgeEl = card.querySelector('.project-card-badge');

        document.getElementById('detailTitle').textContent = titleEl ? titleEl.textContent : 'Project Details';
        document.getElementById('detailStatus').textContent = badgeEl ? badgeEl.textContent : '';
        document.getElementById('detailStatus').className = badgeEl ? badgeEl.className : 'status-badge';
        document.getElementById('detailMeta').textContent = `最終更新: ついさっき • 担当者: あなたを含め数名`;

        renderMockTasks();
        renderMockTimeline();
    }

    // Make back button global
    window.backToList = function () {
        projectDetailPage.style.display = 'none';
        projectListPage.style.display = 'grid';
        if (projectPageHeader) projectPageHeader.style.display = 'block';
    };

    // Render mock tasks
    function renderMockTasks() {
        const tasksList = document.getElementById('tasksList');
        // Simple mock data loosely based on the original structure
        const tasks = [
            { id: 1, title: '商品カタログデザイン制作', status: '進行中', priority: 'high', priorityLabel: '高', deadline: '2026-02-28', tags: ['デザイン', '印刷物'] },
            { id: 2, title: '展示会出展準備', status: '未着手', priority: 'medium', priorityLabel: '中', deadline: '2026-03-05', tags: ['展示会', 'イベント'] }
        ];

        tasksList.innerHTML = tasks.map(task => `
            <div class="task-card" onclick="openTaskDetail(${task.id})">
                <div class="task-info">
                    <div class="task-header">
                        <span class="task-priority priority-${task.priority}">${task.priorityLabel}</span>
                        <div class="task-title">${task.title}</div>
                    </div>
                    <div class="task-meta-flex mt-1">
                        <span><i data-lucide="circle-dashed" class="icon-xs mr-1"></i> ${task.status}</span>
                        <span><i data-lucide="calendar" class="icon-xs mr-1"></i> 期限: ${task.deadline}</span>
                    </div>
                </div>
                <div class="task-buttons" style="display: flex; gap: 8px;">
                    <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); handleDocumentCreation()">資料作成</button>
                    <button class="btn btn-primary btn-sm" onclick="event.stopPropagation(); handleOutsource('${task.title}')">案件化</button>
                </div>
            </div>
        `).join('');
        // We delay icon creation slightly for dynamic content
        setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 10);
    }

    // Render mock timeline
    function renderMockTimeline() {
        const timeline = document.getElementById('historyTimeline');
        timeline.innerHTML = `
            <div class="timeline-item">
                <div class="timeline-avatar"><div class="avatar avatar-xs bg-indigo">S</div></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <span class="user-name">システム</span> がプロジェクトを作成しました
                        <span class="timestamp">10分前</span>
                    </div>
                </div>
            </div>
            
            <div class="timeline-item mt-4">
                <div class="timeline-avatar"><div class="avatar avatar-xs bg-blue" style="background-color: #0052cc;">T</div></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <span class="user-name">山田</span> がキックオフミーティングを実施しました
                        <span class="timestamp">1月10日</span>
                    </div>
                    <div class="timeline-body mt-2">
                        新商品企画プロジェクトの開始。営業企画部、製造部、デザイン部門が参加し、スケジュールと役割分担を確認
                    </div>
                    <div class="history-resources mt-3 p-3 bg-gray-subtle" style="border-radius: var(--radius-sm);">
                        <div class="text-muted mb-2" style="font-size: 11px; font-weight: 600;">参考資料</div>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <a href="#" class="resource-link text-primary" style="font-size: 12px; display: inline-flex; align-items: center; gap: 4px; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-color);" onclick="event.preventDefault(); showMinutes('議事録', 'キックオフミーティング'); return false;">
                                <i data-lucide="file-text" class="icon-xs"></i> 議事録
                            </a>
                            <a href="#" class="resource-link text-primary" style="font-size: 12px; display: inline-flex; align-items: center; gap: 4px; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-color);" onclick="event.preventDefault();">
                                <i data-lucide="link" class="icon-xs"></i> キックオフ資料
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="timeline-item mt-4">
                <div class="timeline-avatar"><div class="avatar avatar-xs bg-pink" style="background-color: #c054be;">K</div></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <span class="user-name">佐藤</span> が商品ラインナップを確定しました
                        <span class="timestamp">1月25日</span>
                    </div>
                    <div class="timeline-body mt-2">
                        春夏シーズン向け新商品50点のラインナップを確定。価格帯、ターゲット層、販売チャネルについて合意
                    </div>
                    <div class="history-resources mt-3 p-3 bg-gray-subtle" style="border-radius: var(--radius-sm);">
                        <div class="text-muted mb-2" style="font-size: 11px; font-weight: 600;">参考資料</div>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                            <a href="#" class="resource-link text-primary" style="font-size: 12px; display: inline-flex; align-items: center; gap: 4px; background: white; padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-color);" onclick="event.preventDefault(); showMinutes('商品企画会議議事録', '商品ラインナップ確定'); return false;">
                                <i data-lucide="file-text" class="icon-xs"></i> 商品企画会議議事録
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => { if (window.lucide) lucide.createIcons(); }, 10);
    }

    // Task Modal logic
    window.openTaskDetail = function (id) {
        const modal = document.getElementById('taskDetailModal');
        if (!modal) return;

        // Populate mock data
        document.getElementById('modalTaskTitle').textContent = id === 1 ? '商品カタログデザイン制作' : '展示会出展準備';
        document.getElementById('modalTaskPriority').textContent = id === 1 ? '高' : '中';
        document.getElementById('modalTaskPriority').className = 'task-priority priority-' + (id === 1 ? 'high' : 'medium');
        document.getElementById('modalTaskStatus').textContent = id === 1 ? '進行中' : '未着手';
        document.getElementById('modalTaskStatus').className = 'status-badge ' + (id === 1 ? 'badge-進行中' : 'badge-企画中');

        document.getElementById('modalTags').innerHTML = id === 1 ? '<span class="task-tag">デザイン</span><span class="task-tag">印刷物</span>' : '<span class="task-tag">展示会</span><span class="task-tag">イベント</span>';

        document.getElementById('modalBackground').textContent = '年2回の展示会に合わせて商品カタログを更新しています。今回は新規取引先開拓も視野に入れており、より訴求力の高いデザインが求められています。';
        document.getElementById('modalContent').textContent = '春夏シーズン向けの新商品約50点を掲載するカタログのデザイン制作を進めます。デザイナーとの打ち合わせ、原稿校正、印刷手配まで一貫して管理し、展示会開催の2週間前までに納品できるよう進行します。';

        document.getElementById('modalObjectives').innerHTML = `
            <li>商品の魅力が伝わるビジュアル表現</li>
            <li>価格・仕様情報の正確な記載</li>
        `;
        document.getElementById('modalDeliverables').innerHTML = `
            <li>印刷用カタログ（5,000部）</li>
            <li>Web掲載用画像データ</li>
        `;

        modal.classList.add('visible');
    };

    window.closeTaskDetail = function () {
        const modal = document.getElementById('taskDetailModal');
        if (modal) modal.classList.remove('visible');
    };

    // Action Handlers
    window.handleOutsource = function (taskTitle) {
        if (confirm(`「${taskTitle}」を案件化しますか？\n\n案件化すると外部パートナーや追加リソースに依頼できます。`)) {
            alert(`「${taskTitle}」を案件化しました。`);
        }
    };

    window.handleDocumentCreation = function () {
        alert('資料作成機能は準備中です');
    };

    window.showMinutes = function (title, eventTitle) {
        document.getElementById('minutesTitle').textContent = title;

        const dummySummary = `会議では、${eventTitle}について議論しました。\n\n主な議題:\n- プロジェクトの進捗状況の確認\n- 次のフェーズに向けた課題の洗い出し\n- チーム間の連携強化について\n- スケジュールの調整と優先順位の見直し\n\n決定事項:\n1. 開発スケジュールを2週間前倒しで進める\n2. デザインレビューを週次で実施する\n3. 外部パートナーとの定例会議を設定する\n\n次回アクション:\n- 各チームリーダーは進捗レポートを作成\n- デザインチームはモックアップの最終版を準備\n- 開発チームは技術検証を完了させる\n\n参加者全員が合意し、次回会議は2週間後に開催することが決定されました。`;

        document.getElementById('minutesSummary').textContent = dummySummary;
        const modal = document.getElementById('minutesModal');
        if (modal) modal.classList.add('visible');
    };

    window.closeMinutes = function () {
        const modal = document.getElementById('minutesModal');
        if (modal) modal.classList.remove('visible');
    };

});
