// Blog functionality for fetching and displaying Medium posts
(function() {
    'use strict';

    // Function to get Medium feed using vanilla JavaScript and axios
    async function getMediumFeed() {
        try {
            const mediumRssFeed = "https://blog.opendataproducts.org/feed";
            const rssToJsonApi = "https://api.rss2json.com/v1/api.json";
            
            const response = await axios.get(rssToJsonApi, {
                params: { 
                    rss_url: mediumRssFeed,
                    count: 10 // Limit to 10 posts
                }
            });
            
            return response.data;
        } catch (error) {
            console.error('Error fetching Medium feed:', error);
            throw error;
        }
    }

    // Function to extract text content from HTML
    function stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    }

    // Function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    // Function to extract image from content
    function extractImageFromContent(content) {
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const match = content.match(imgRegex);
        return match ? match[1] : null;
    }

    // Function to create blog card HTML
    function createBlogCard(post) {
        const excerpt = stripHtml(post.description || post.content || '').substring(0, 150) + '...';
        const image = post.thumbnail || extractImageFromContent(post.content) || extractImageFromContent(post.description);
        const date = formatDate(post.pubDate);
        const author = post.author || 'ODPS Team';

        return `
            <article class="blog-card wow fadeInUp" data-wow-delay=".3s">
                ${image ? `<div class="blog-card-image" style="background-image: url('${image}')"></div>` : ''}
                <div class="blog-card-content">
                    <h2 class="blog-card-title">
                        <a href="${post.link}" target="_blank" rel="noopener noreferrer">
                            ${post.title}
                        </a>
                    </h2>
                    <p class="blog-card-excerpt">${excerpt}</p>
                    <div class="blog-card-meta">
                        <span class="blog-card-author">By ${author}</span>
                        <span class="blog-card-date">${date}</span>
                    </div>
                </div>
            </article>
        `;
    }

    // Function to display blog posts
    function displayBlogPosts(posts) {
        const blogPostsContainer = document.getElementById('blog-posts');
        const loadingElement = document.getElementById('loading');
        const errorElement = document.getElementById('error');

        if (!posts || posts.length === 0) {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            errorElement.innerHTML = `
                <i class="fas fa-info-circle"></i>
                <h3>No blog posts found</h3>
                <p>Check back later for new content or visit our <a href="https://blog.opendataproducts.org" target="_blank">blog directly</a>.</p>
            `;
            return;
        }

        const blogCardsHTML = posts.map(post => createBlogCard(post)).join('');
        blogPostsContainer.innerHTML = blogCardsHTML;

        // Hide loading, show posts
        loadingElement.style.display = 'none';
        blogPostsContainer.style.display = 'grid';

        // Initialize WOW.js for new elements if available
        if (typeof WOW !== 'undefined') {
            new WOW().init();
        }
    }

    // Function to show error
    function showError(error) {
        const loadingElement = document.getElementById('loading');
        const errorElement = document.getElementById('error');

        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';

        console.error('Blog loading error:', error);
    }

    // Main function to load and display blog posts
    async function loadBlogPosts() {
        try {
            const feedData = await getMediumFeed();
            
            if (feedData && feedData.status === 'ok' && feedData.items) {
                displayBlogPosts(feedData.items);
            } else {
                throw new Error('Invalid feed data received');
            }
        } catch (error) {
            showError(error);
        }
    }

    // Initialize when DOM is loaded
    function init() {
        // Check if we're on the blog page
        if (document.getElementById('blog-posts')) {
            loadBlogPosts();
        }
    }

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Fallback: if axios is not loaded, show error
    if (typeof axios === 'undefined') {
        console.error('Axios library not loaded');
        setTimeout(() => {
            if (document.getElementById('loading')) {
                showError(new Error('Required libraries not loaded'));
            }
        }, 1000);
    }

})(); 