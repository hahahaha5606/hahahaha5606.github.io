// 博客数据Dashboard脚本文件
var dashboard = {
    // 模拟数据 - 实际使用时替换为真实API调用
    mockData: {
        stats: {
            totalPosts: 42,
            totalViews: 15680,
            avgViews: 373,
            updateFreq: 8
        },
        publishTrend: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            data: [2, 3, 5, 4, 6, 8, 7, 9]
        },
        categories: {
            labels: ['技术分享', '数据分析', '工具推荐', '生活感悟', '项目总结'],
            data: [15, 12, 8, 4, 3]
        },
        monthlyViews: {
            labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
            data: [1200, 1450, 1800, 2100, 2350, 2800, 2650, 3100]
        },
        recentPosts: [
            { title: 'Hexo博客优化实战指南', date: '2024-08-20', views: 245 },
            { title: 'Python数据可视化最佳实践', date: '2024-08-18', views: 389 },
            { title: 'JavaScript异步编程深入理解', date: '2024-08-15', views: 156 },
            { title: 'Docker容器化部署完整流程', date: '2024-08-12', views: 278 },
            { title: 'Vue3组件设计模式总结', date: '2024-08-10', views: 203 }
        ]
    },

    // 图表实例存储
    charts: {},

    // 初始化Dashboard - 参考music.js的changeMusicBg方法结构
    initDashboard: function(isReload = false) {
        if (window.location.pathname !== "/dashboard/") {
            return;
        }

        const dashboardPage = document.getElementById("dashboard-page");
        if (!dashboardPage) {
            console.warn("Dashboard页面元素未找到");
            return;
        }

        if (isReload) {
            // 重新加载时直接更新内容
            this.updateDashboardContent();
        } else {
            // 第一次进入，等待依赖加载完成后初始化
            let timer = setInterval(() => {
                console.info("等待Chart.js加载...");
                if (typeof Chart !== 'undefined') {
                    clearInterval(timer);
                    // 创建Dashboard HTML结构
                    this.createDashboardHTML();
                    // 初始化内容
                    this.updateDashboardContent();
                    // 绑定事件
                    this.addEventListeners();
                }
            }, 100);
        }
    },

    // 更新Dashboard内容
    updateDashboardContent: function() {
        this.updateStats();
        this.createPublishTrendChart();
        this.createCategoryChart();
        this.createMonthlyViewsChart();
        this.updateRecentPosts();
    },

    // 创建Dashboard HTML结构 - 完全替换原页面内容
    createDashboardHTML: function() {
        const dashboardPage = document.getElementById("dashboard-page");
        dashboardPage.innerHTML = `
            <div class="blog-dashboard-container">
                <button class="blog-refresh-btn" onclick="dashboard.refreshData()">🔄 刷新数据</button>
                
                <div class="blog-dashboard-header">
                    <h1 class="blog-dashboard-title">博客数据看板</h1>
                    <p class="blog-last-updated">最后更新: <span id="blogLastUpdate"></span></p>
                </div>

                <!-- 概览统计卡片 -->
                <div class="blog-stats-overview">
                    <div class="blog-stat-card">
                        <span class="blog-stat-number" id="blogTotalPosts">0</span>
                        <span class="blog-stat-label">总文章数</span>
                    </div>
                    <div class="blog-stat-card">
                        <span class="blog-stat-number" id="blogTotalViews">0</span>
                        <span class="blog-stat-label">总浏览量</span>
                    </div>
                    <div class="blog-stat-card">
                        <span class="blog-stat-number" id="blogAvgViews">0</span>
                        <span class="blog-stat-label">平均浏览量</span>
                    </div>
                    <div class="blog-stat-card">
                        <span class="blog-stat-number" id="blogUpdateFreq">0</span>
                        <span class="blog-stat-label">本月更新</span>
                    </div>
                </div>

                <!-- 图表区域 -->
                <div class="blog-charts-container">
                    <div class="blog-chart-card">
                        <h3 class="blog-chart-title">文章发布趋势</h3>
                        <div class="blog-chart-container">
                            <canvas id="blogPublishTrendChart"></canvas>
                        </div>
                    </div>
                    <div class="blog-chart-card">
                        <h3 class="blog-chart-title">分类分布</h3>
                        <div class="blog-chart-container">
                            <canvas id="blogCategoryChart"></canvas>
                        </div>
                    </div>
                    <div class="blog-chart-card blog-full-width-chart">
                        <h3 class="blog-chart-title">月度浏览量统计</h3>
                        <div class="blog-chart-container">
                            <canvas id="blogMonthlyViewsChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- 最近文章 -->
                <div class="blog-recent-posts">
                    <h3 class="blog-chart-title">最近文章</h3>
                    <div id="blogRecentPostsList">
                        <div class="blog-loading">加载中...</div>
                    </div>
                </div>
            </div>
        `;
    },

    // 更新统计卡片
    updateStats: function() {
        const stats = this.mockData.stats;
        const totalPostsEl = document.getElementById('blogTotalPosts');
        const totalViewsEl = document.getElementById('blogTotalViews');
        const avgViewsEl = document.getElementById('blogAvgViews');
        const updateFreqEl = document.getElementById('blogUpdateFreq');
        const lastUpdateEl = document.getElementById('blogLastUpdate');

        if (totalPostsEl) totalPostsEl.textContent = stats.totalPosts;
        if (totalViewsEl) totalViewsEl.textContent = stats.totalViews.toLocaleString();
        if (avgViewsEl) avgViewsEl.textContent = stats.avgViews;
        if (updateFreqEl) updateFreqEl.textContent = stats.updateFreq;
        if (lastUpdateEl) lastUpdateEl.textContent = new Date().toLocaleString('zh-CN');
    },

    // 创建发布趋势图
    createPublishTrendChart: function() {
        const ctx = document.getElementById('blogPublishTrendChart');
        if (!ctx) return;

        // 销毁已存在的图表
        if (this.charts.publishTrend) {
            this.charts.publishTrend.destroy();
        }

        this.charts.publishTrend = new Chart(ctx.getContext('2d'), {
            type: 'line',
            data: {
                labels: this.mockData.publishTrend.labels,
                datasets: [{
                    label: '文章发布数',
                    data: this.mockData.publishTrend.data,
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    // 创建分类分布图
    createCategoryChart: function() {
        const ctx = document.getElementById('blogCategoryChart');
        if (!ctx) return;

        // 销毁已存在的图表
        if (this.charts.category) {
            this.charts.category.destroy();
        }

        this.charts.category = new Chart(ctx.getContext('2d'), {
            type: 'doughnut',
            data: {
                labels: this.mockData.categories.labels,
                datasets: [{
                    data: this.mockData.categories.data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    },

    // 创建月度浏览量图
    createMonthlyViewsChart: function() {
        const ctx = document.getElementById('blogMonthlyViewsChart');
        if (!ctx) return;

        // 销毁已存在的图表
        if (this.charts.monthlyViews) {
            this.charts.monthlyViews.destroy();
        }

        this.charts.monthlyViews = new Chart(ctx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: this.mockData.monthlyViews.labels,
                datasets: [{
                    label: '月度浏览量',
                    data: this.mockData.monthlyViews.data,
                    backgroundColor: 'rgba(103, 126, 234, 0.8)',
                    borderColor: '#667eea',
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    },

    // 更新最近文章列表
    updateRecentPosts: function() {
        const container = document.getElementById('blogRecentPostsList');
        if (!container) return;

        const posts = this.mockData.recentPosts;
        
        container.innerHTML = posts.map(post => `
            <div class="blog-post-item">
                <span class="blog-post-title">${post.title}</span>
                <span class="blog-post-date">${post.date}</span>
                <span class="blog-post-views">${post.views} 次浏览</span>
            </div>
        `).join('');
    },

    // 刷新数据
    refreshData: function() {
        // 这里可以添加API调用来获取最新数据
        // 模拟数据更新
        this.mockData.stats.totalViews += Math.floor(Math.random() * 100);
        this.mockData.stats.avgViews = Math.floor(this.mockData.stats.totalViews / this.mockData.stats.totalPosts);
        
        this.updateStats();
        
        // 添加刷新动画效果
        const btn = document.querySelector('#dashboard-page .blog-refresh-btn');
        if (btn) {
            btn.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 500);
        }
    },

    // 响应式处理
    handleResize: function() {
        // Chart.js会自动处理响应式，这里可以添加其他响应式逻辑
        Object.keys(this.charts).forEach(key => {
            if (this.charts[key]) {
                this.charts[key].resize();
            }
        });
    },

    // 添加事件监听器 - 参考music.js的addEventListenerChangeMusicBg方法
    addEventListeners: function() {
        const dashboardPage = document.getElementById("dashboard-page");
        if (!dashboardPage) return;

        // 响应式处理
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // 可以在这里添加更多事件监听器
        console.info("Dashboard事件监听器已绑定");
    }
};

// 调用 - 参考music.js的调用方式
dashboard.initDashboard(false);

// 页面切换时重新初始化
if (typeof pjax !== 'undefined') {
    document.addEventListener('pjax:complete', function() {
        dashboard.initDashboard(false);
    });
}
