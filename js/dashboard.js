// 博客数据Dashboard脚本文件
var anzhiyuDashboard = {
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

    // 初始化Dashboard
    initDashboard: function() {
        if (window.location.pathname !== "/dashboard/") {
            return;
        }

        // 检查页面元素是否存在
        const dashboardPage = document.getElementById("dashboard-page");
        if (!dashboardPage) {
            console.warn("Dashboard页面元素未找到");
            return;
        }

        // 创建Dashboard HTML结构
        this.createDashboardHTML();
        
        // 等待Chart.js加载完成
        this.waitForChartJS(() => {
            this.updateStats();
            this.createPublishTrendChart();
            this.createCategoryChart();
            this.createMonthlyViewsChart();
            this.updateRecentPosts();
        });
    },

    // 等待Chart.js加载
    waitForChartJS: function(callback) {
        if (typeof Chart !== 'undefined') {
            callback();
        } else {
            let timer = setInterval(() => {
                if (typeof Chart !== 'undefined') {
                    clearInterval(timer);
                    callback();
                }
            }, 100);
        }
    },

    // 创建Dashboard HTML结构
    createDashboardHTML: function() {
        const dashboardPage = document.getElementById("dashboard-page");
        dashboardPage.innerHTML = `
            <div class="dashboard-container">
                <button class="refresh-btn" onclick="anzhiyuDashboard.refreshData()">🔄 刷新数据</button>
                
                <div class="dashboard-header">
                    <h1 class="dashboard-title">博客数据Dashboard</h1>
                    <p class="last-updated">最后更新: <span id="lastUpdate"></span></p>
                </div>

                <!-- 概览统计卡片 -->
                <div class="stats-overview">
                    <div class="stat-card">
                        <span class="stat-number" id="totalPosts">0</span>
                        <span class="stat-label">总文章数</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" id="totalViews">0</span>
                        <span class="stat-label">总浏览量</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" id="avgViews">0</span>
                        <span class="stat-label">平均浏览量</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-number" id="updateFreq">0</span>
                        <span class="stat-label">本月更新</span>
                    </div>
                </div>

                <!-- 图表区域 -->
                <div class="charts-container">
                    <div class="chart-card">
                        <h3 class="chart-title">文章发布趋势</h3>
                        <div class="chart-container">
                            <canvas id="publishTrendChart"></canvas>
                        </div>
                    </div>
                    <div class="chart-card">
                        <h3 class="chart-title">分类分布</h3>
                        <div class="chart-container">
                            <canvas id="categoryChart"></canvas>
                        </div>
                    </div>
                    <div class="chart-card full-width-chart">
                        <h3 class="chart-title">月度浏览量统计</h3>
                        <div class="chart-container">
                            <canvas id="monthlyViewsChart"></canvas>
                        </div>
                    </div>
                </div>

                <!-- 最近文章 -->
                <div class="recent-posts">
                    <h3 class="chart-title">最近文章</h3>
                    <div id="recentPostsList">
                        <div class="loading">加载中...</div>
                    </div>
                </div>
            </div>
        `;
    },

    // 更新统计卡片
    updateStats: function() {
        const stats = this.mockData.stats;
        const totalPostsEl = document.getElementById('totalPosts');
        const totalViewsEl = document.getElementById('totalViews');
        const avgViewsEl = document.getElementById('avgViews');
        const updateFreqEl = document.getElementById('updateFreq');
        const lastUpdateEl = document.getElementById('lastUpdate');

        if (totalPostsEl) totalPostsEl.textContent = stats.totalPosts;
        if (totalViewsEl) totalViewsEl.textContent = stats.totalViews.toLocaleString();
        if (avgViewsEl) avgViewsEl.textContent = stats.avgViews;
        if (updateFreqEl) updateFreqEl.textContent = stats.updateFreq;
        if (lastUpdateEl) lastUpdateEl.textContent = new Date().toLocaleString('zh-CN');
    },

    // 创建发布趋势图
    createPublishTrendChart: function() {
        const ctx = document.getElementById('publishTrendChart');
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
        const ctx = document.getElementById('categoryChart');
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
        const ctx = document.getElementById('monthlyViewsChart');
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
        const container = document.getElementById('recentPostsList');
        if (!container) return;

        const posts = this.mockData.recentPosts;
        
        container.innerHTML = posts.map(post => `
            <div class="post-item">
                <span class="post-title">${post.title}</span>
                <span class="post-date">${post.date}</span>
                <span class="post-views">${post.views} 次浏览</span>
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
        const btn = document.querySelector('#dashboard-page .refresh-btn');
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

    // 添加事件监听器
    addEventListeners: function() {
        // 响应式处理
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }
};

// 页面加载完成后初始化Dashboard
document.addEventListener('DOMContentLoaded', function() {
    anzhiyuDashboard.initDashboard();
    anzhiyuDashboard.addEventListeners();
});

// 页面切换时重新初始化
if (typeof pjax !== 'undefined') {
    document.addEventListener('pjax:complete', function() {
        anzhiyuDashboard.initDashboard();
    });
}