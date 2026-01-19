// 将文章页的标题放到图片下面
const postInfo = document.getElementById('post-info');
const topImg = document.querySelector('.top-img');

// 设置文章页布局
if (postInfo && topImg) {
    // 将 post-info 插入到 top-img 的下一个兄弟节点之前
    // 如果 top-img 没有下一个兄弟节点，则 insertBefore 会自动将其插入到最后
    topImg.parentNode.insertBefore(postInfo, topImg.nextSibling);
	postInfo.style.textAlign = 'center';
	
	const postBg = document.querySelector('.post-bg');
	postBg.style.setProperty('height', '10px', 'important');
	const layout = document.querySelector('.layout');
	layout.style.marginTop = '40px';
	layout.style.maxWidth = '1500px';
	
	const post = document.querySelector('#post');
	post.style.width = '62%';

	// 将文章页背景替换为与模糊化的顶部图
	const webBg = document.querySelector('#web_bg');
	webBg.style.background = topImg.style.backgroundImage;
	
	const cardToc = document.querySelector('#card-toc');
	if (cardToc) {
		cardToc.style.marginTop = '0px';
		const aside = document.querySelector('#aside-content');
		aside.style.width = '18%';
		aside.style.paddingLeft = '15px';
		const cardAnnouncement = document.querySelector('.card-announcement');
		if (cardAnnouncement) {
			cardAnnouncement.style.display = 'none';
		}
		const cardInfo = document.querySelector('.card-info');
		if (cardInfo) {
			cardInfo.style.display = 'none';
		}
	}else{
		const cardAnnouncement = document.querySelector('.card-announcement');
		const cardInfo = document.querySelector('.card-info');
		cardAnnouncement.style.display = 'none';
		cardInfo.style.position = 'sticky'; /*当卡片滚动到离顶部8px时自动固定*/
		cardInfo.style.top = '8px';
		const aside = document.querySelector('#aside-content');
		aside.style.width = '17%';
		//aside.style.marginLeft = '20px';
	}
}

const dashBoard = document.querySelector('#dashboard-page');
if (dashBoard) {
	const page = document.querySelector('.page');
	page.style.background = 'url(/img/dash.png)';
	const page_ = document.querySelector('#page');
	page_.style.border = '1px solid rgba(255, 255, 255, 0.2)';
	page_.style.setProperty('background','rgba(255, 255, 255, 0.12)','important');
	page_.style.setProperty('backdrop-filter', 'blur(2px)', 'important');
	page_.style.setProperty('-webkit-backdrop-filter', 'blur(2px)', 'important');
}

const starRotation = document.querySelector('#starRotation');
if (starRotation) {
	const pageHeader = document.querySelector('#page-header');
	pageHeader.parentNode.insertBefore(starRotation, pageHeader.nextSibling);
	const pageSiteInfo = document.querySelector('#page-site-info');
	pageSiteInfo.style.display = 'none';
	const nav = document.querySelector('#nav');
	pageHeader.parentNode.insertBefore(nav, pageHeader.nextSibling);
	pageHeader.style.display = 'none';
	
	const webBg = document.querySelector('#web_bg');
	webBg.style.display = 'none';
	const aside = document.querySelector('#aside-content');
	aside.style.display = 'none';
	const footer = document.querySelector('#footer');
	footer.style.display = 'none';
	const page = document.querySelector('#page');
	page.style.setProperty('background','transparent','important');
	page.style.setProperty('backdrop-filter', 'blur(0px)', 'important');
	page.style.setProperty('-webkit-backdrop-filter', 'blur(0px)', 'important');
	page.style.border = '';
	
	const width = document.querySelector('.layout > div:first-child');
	width.style.width = '100%';
	const layout = document.querySelector('.layout');
	layout.style.setProperty('padding', '0px 0px', 'important');
	
	
}