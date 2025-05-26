// Debug script for testing testimonial carousel heights
(function() {
    'use strict';
    
    let debugMode = false;
    let debugControls = null;
    
    function createDebugControls() {
        debugControls = document.createElement('div');
        debugControls.className = 'debug-controls';
        debugControls.innerHTML = `
            <h4>Height Debug</h4>
            <button id="toggle-debug">Toggle Debug Mode</button>
            <button id="measure-heights">Measure Heights</button>
            <button id="test-responsive">Test Responsive</button>
            <button id="export-report">Export Report</button>
            <div class="debug-info">
                <div id="current-mode">Mode: Normal</div>
                <div id="viewport-size">Viewport: ${window.innerWidth}×${window.innerHeight}</div>
                <div id="carousel-status">Carousel: Loading...</div>
                <div id="height-consistency">Heights: Checking...</div>
            </div>
        `;
        
        document.body.appendChild(debugControls);
        
        // Add event listeners
        document.getElementById('toggle-debug').onclick = toggleDebugMode;
        document.getElementById('measure-heights').onclick = measureHeights;
        document.getElementById('test-responsive').onclick = testResponsive;
        document.getElementById('export-report').onclick = exportReport;
        
        // Update viewport size on resize
        window.addEventListener('resize', updateViewportInfo);
    }
    
    function toggleDebugMode() {
        debugMode = !debugMode;
        const carousel = document.querySelector('#testmonail');
        const button = document.getElementById('toggle-debug');
        
        if (debugMode) {
            carousel.classList.add('debug-mode');
            button.classList.add('active');
            button.textContent = 'Disable Debug';
            document.getElementById('current-mode').textContent = 'Mode: Debug Active';
            addHeightAttributes();
            addRulers();
        } else {
            carousel.classList.remove('debug-mode');
            button.classList.remove('active');
            button.textContent = 'Enable Debug';
            document.getElementById('current-mode').textContent = 'Mode: Normal';
            removeRulers();
        }
        
        measureHeights();
    }
    
    function addHeightAttributes() {
        const boxes = document.querySelectorAll('.testmonail-box');
        boxes.forEach((box, index) => {
            const height = box.offsetHeight;
            box.setAttribute('data-height', height);
        });
    }
    
    function addRulers() {
        const boxes = document.querySelectorAll('.testmonail-box');
        boxes.forEach(box => {
            if (!box.querySelector('.height-ruler')) {
                const ruler = document.createElement('div');
                ruler.className = 'height-ruler';
                box.style.position = 'relative';
                box.appendChild(ruler);
            }
        });
    }
    
    function removeRulers() {
        const rulers = document.querySelectorAll('.height-ruler');
        rulers.forEach(ruler => ruler.remove());
    }
    
    function measureHeights() {
        const boxes = document.querySelectorAll('.testmonail-box');
        const heights = Array.from(boxes).map(box => box.offsetHeight);
        const unique = [...new Set(heights)];
        
        const isConsistent = unique.length === 1;
        const statusText = isConsistent ? 
            `✓ Consistent (${unique[0]}px)` : 
            `✗ Inconsistent (${heights.join(', ')}px)`;
        
        document.getElementById('height-consistency').textContent = `Heights: ${statusText}`;
        
        // Update carousel status
        const carousel = document.querySelector('.owl-carousel');
        const isInitialized = carousel && carousel.classList.contains('owl-loaded');
        document.getElementById('carousel-status').textContent = 
            `Carousel: ${isInitialized ? '✓ Initialized' : '✗ Not initialized'}`;
        
        console.log('Height Measurement:', {
            heights: heights,
            consistent: isConsistent,
            carouselInitialized: isInitialized
        });
        
        return { heights, consistent: isConsistent };
    }
    
    function updateViewportInfo() {
        document.getElementById('viewport-size').textContent = 
            `Viewport: ${window.innerWidth}×${window.innerHeight}`;
    }
    
    function testResponsive() {
        const breakpoints = [
            { name: 'Mobile', width: 375 },
            { name: 'Tablet', width: 768 },
            { name: 'Desktop', width: 1200 }
        ];
        
        let currentBreakpoint = 0;
        const button = document.getElementById('test-responsive');
        button.textContent = 'Testing...';
        button.disabled = true;
        
        function testNextBreakpoint() {
            if (currentBreakpoint >= breakpoints.length) {
                button.textContent = 'Test Responsive';
                button.disabled = false;
                // Restore original viewport
                document.body.style.width = '';
                return;
            }
            
            const bp = breakpoints[currentBreakpoint];
            console.log(`Testing ${bp.name} (${bp.width}px)`);
            
            // Simulate viewport change
            document.body.style.width = bp.width + 'px';
            
            setTimeout(() => {
                const result = measureHeights();
                console.log(`${bp.name} heights:`, result);
                currentBreakpoint++;
                testNextBreakpoint();
            }, 500);
        }
        
        testNextBreakpoint();
    }
    
    function exportReport() {
        const report = generateReport();
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'carousel-height-report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
    
    function generateReport() {
        const timestamp = new Date().toISOString();
        const viewport = `${window.innerWidth}×${window.innerHeight}`;
        const userAgent = navigator.userAgent;
        
        const boxes = document.querySelectorAll('.testmonail-box');
        const heights = Array.from(boxes).map((box, index) => ({
            index: index + 1,
            height: box.offsetHeight,
            content: box.querySelector('.quote-section p')?.textContent?.length || 0
        }));
        
        const carousel = document.querySelector('.owl-carousel');
        const carouselInfo = {
            initialized: carousel?.classList.contains('owl-loaded') || false,
            itemCount: document.querySelectorAll('.owl-item').length,
            activeItems: document.querySelectorAll('.owl-item.active').length
        };
        
        return `
TESTIMONIALS CAROUSEL HEIGHT REPORT
Generated: ${timestamp}
Viewport: ${viewport}
User Agent: ${userAgent}

CAROUSEL STATUS:
- Initialized: ${carouselInfo.initialized}
- Total Items: ${carouselInfo.itemCount}
- Active Items: ${carouselInfo.activeItems}

TESTIMONIAL BOX HEIGHTS:
${heights.map(h => `- Box ${h.index}: ${h.height}px (${h.content} chars)`).join('\n')}

CONSISTENCY CHECK:
- Unique Heights: ${[...new Set(heights.map(h => h.height))].join(', ')}
- Is Consistent: ${new Set(heights.map(h => h.height)).size === 1}

CSS COMPUTED STYLES:
${boxes.length > 0 ? `
- Box Height: ${getComputedStyle(boxes[0]).height}
- Box Min-Height: ${getComputedStyle(boxes[0]).minHeight}
- Box Display: ${getComputedStyle(boxes[0]).display}
- Box Flex-Direction: ${getComputedStyle(boxes[0]).flexDirection}
` : 'No boxes found'}

RECOMMENDATIONS:
${generateRecommendations(heights)}
        `.trim();
    }
    
    function generateRecommendations(heights) {
        const unique = [...new Set(heights.map(h => h.height))];
        
        if (unique.length === 1) {
            return "✓ Heights are consistent. No action needed.";
        }
        
        const recommendations = [];
        const maxHeight = Math.max(...heights.map(h => h.height));
        const minHeight = Math.min(...heights.map(h => h.height));
        const difference = maxHeight - minHeight;
        
        if (difference > 50) {
            recommendations.push("- Large height variation detected (>50px)");
            recommendations.push("- Consider reviewing content length");
            recommendations.push("- Check for CSS conflicts");
        }
        
        if (difference > 20) {
            recommendations.push("- Set explicit height constraints");
            recommendations.push("- Implement text truncation");
        }
        
        const problematicBoxes = heights.filter(h => h.height !== unique[0]);
        if (problematicBoxes.length > 0) {
            recommendations.push(`- Check boxes: ${problematicBoxes.map(b => b.index).join(', ')}`);
        }
        
        return recommendations.length > 0 ? recommendations.join('\n') : "✓ Minor variations within acceptable range.";
    }
    
    // Auto-start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // Wait a bit for carousel to initialize
        setTimeout(() => {
            createDebugControls();
            measureHeights();
        }, 1000);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.shiftKey) {
            switch(e.key) {
                case 'D':
                    e.preventDefault();
                    toggleDebugMode();
                    break;
                case 'M':
                    e.preventDefault();
                    measureHeights();
                    break;
                case 'R':
                    e.preventDefault();
                    testResponsive();
                    break;
            }
        }
    });
    
    // Export functions for console access
    window.carouselDebug = {
        toggle: toggleDebugMode,
        measure: measureHeights,
        testResponsive: testResponsive,
        export: exportReport
    };
    
})();