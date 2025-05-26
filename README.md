# Open Data Product Specification Website

This repository contains the official website for the Open Data Product Specification (ODPS) initiative.

## 🚀 GitHub Pages Deployment

This website is automatically deployed to GitHub Pages using GitHub Actions whenever code is pushed to the `website_with_pages_feature` branch.

### Setup Instructions

To enable GitHub Pages deployment for this repository:

1. **Go to Repository Settings**
   - Navigate to your repository on GitHub
   - Click on the "Settings" tab

2. **Configure GitHub Pages**
   - Scroll down to the "Pages" section in the left sidebar
   - Under "Source", select "GitHub Actions"
   - This will enable the custom workflow we've created

3. **Branch Configuration**
   - The deployment is configured to trigger on pushes to the `website_with_pages_feature` branch
   - Make sure you're working on this branch for automatic deployments

4. **First Deployment**
   - Push your changes to the `website_with_pages_feature` branch
   - The GitHub Action will automatically run and deploy your site
   - You can monitor the deployment progress in the "Actions" tab

### 🔧 Local Development

To run the site locally for development:

```bash
# Install Jekyll and dependencies
gem install bundler jekyll
bundle install

# Serve the site locally
bundle exec jekyll serve

# The site will be available at http://localhost:4000
```

### 📁 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy-pages.yml    # GitHub Actions workflow
├── _layouts/
│   └── default.html           # Jekyll layout template
├── css/
│   └── style.css             # Main stylesheet
├── js/
│   ├── mobile-menu.js        # Mobile menu functionality
│   └── script.js             # Additional JavaScript
├── images/                   # Image assets
├── _config.yml              # Jekyll configuration
├── Gemfile                  # Ruby dependencies
├── index.html               # Homepage
├── about.html               # About page
├── contact.html             # Contact page
├── development.html         # Development page
├── use-cases.html          # Use cases page
├── versions.html           # Versions page
└── blog.html               # Blog page
```

### 🛠 Features

- **Responsive Design**: Mobile-first approach with custom mobile menu
- **Modern UI**: Clean, professional design with smooth animations
- **SEO Optimized**: Jekyll SEO tags and proper meta information
- **Fast Loading**: Optimized assets and efficient CSS/JS
- **Accessibility**: WCAG compliant navigation and interactions

### 🔄 Deployment Workflow

The GitHub Actions workflow (`deploy-pages.yml`) automatically:

1. **Triggers** on pushes to `website_with_pages_feature` branch
2. **Builds** the Jekyll site with all dependencies
3. **Deploys** to GitHub Pages with proper caching
4. **Provides** the live URL in the deployment summary

### 📝 Making Changes

1. **Create/Switch to the feature branch**:
   ```bash
   git checkout website_with_pages_feature
   ```

2. **Make your changes** to HTML, CSS, or JS files

3. **Test locally** (optional but recommended):
   ```bash
   bundle exec jekyll serve
   ```

4. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   git push origin website_with_pages_feature
   ```

5. **Monitor deployment** in the GitHub Actions tab

### 🌐 Live Site

Once deployed, your site will be available at:
`https://open-data-product-initiative.github.io`

### 🐛 Troubleshooting

**Deployment fails?**
- Check the Actions tab for error details
- Ensure all file paths are correct
- Verify Jekyll syntax in `_config.yml`

**Local development issues?**
- Run `bundle install` to update dependencies
- Check Ruby version compatibility
- Ensure all required gems are installed

**Mobile menu not working?**
- Verify Font Awesome is loading correctly
- Check browser console for JavaScript errors
- Ensure `mobile-menu.js` is properly linked

### 📞 Support

For issues related to:
- **Website functionality**: Create an issue in this repository
- **ODPS specification**: Visit the main ODPS documentation
- **GitHub Pages**: Check GitHub's official documentation

---

**Note**: This setup uses Jekyll for GitHub Pages compatibility while preserving your existing HTML structure. Your current files will work seamlessly with minimal modifications. 