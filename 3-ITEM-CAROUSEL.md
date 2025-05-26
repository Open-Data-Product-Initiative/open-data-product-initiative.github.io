# 3-Item Carousel Configuration

## Overview
The testimonials carousel is configured to display a maximum of 3 items simultaneously on desktop screens, with responsive behavior for smaller devices.

## Current Configuration

### Desktop (≥992px)
- **Items displayed**: 3
- **Margin between items**: 30px
- **Slide behavior**: Advances by 1 item at a time
- **Total testimonials**: 6
- **Cycling**: Continuous loop through all 6 testimonials

### Tablet (768px - 991px)
- **Items displayed**: 2
- **Margin between items**: 25px
- **Slide behavior**: Advances by 1 item at a time

### Mobile (<768px)
- **Items displayed**: 1
- **Margin between items**: 20px
- **Slide behavior**: Advances by 1 item at a time

## Technical Implementation

### JavaScript Settings
```javascript
{
  items: 3,
  loop: true,
  autoplay: true,
  autoplayTimeout: 4000,
  slideBy: 1,
  responsive: {
    0: { items: 1, margin: 20 },
    768: { items: 2, margin: 25 },
    992: { items: 3, margin: 30 }
  }
}
```

### CSS Layout
- Fixed item width: `calc(33.333% - 20px)` on desktop
- Flexbox alignment for equal heights
- Overflow hidden to prevent display issues

## Expected Behavior

### Auto-advance
- Automatically advances every 4 seconds
- Pauses on hover interaction
- Smooth 600ms transition speed

### Navigation
- Custom arrow buttons for manual control
- Touch/swipe support on mobile devices
- Keyboard navigation (arrows, spacebar)

### Cycling Pattern
With 6 testimonials and 3 visible items:
1. **Position 1**: Shows testimonials 1, 2, 3
2. **Position 2**: Shows testimonials 2, 3, 4
3. **Position 3**: Shows testimonials 3, 4, 5
4. **Position 4**: Shows testimonials 4, 5, 6
5. **Position 5**: Shows testimonials 5, 6, 1 (loop)
6. **Position 6**: Shows testimonials 6, 1, 2 (loop)

## Testing Instructions

### Visual Verification
1. Open the main website on desktop (≥992px width)
2. Navigate to testimonials section
3. Verify exactly 3 testimonials are visible
4. Wait for auto-advance or use navigation
5. Confirm all 6 testimonials cycle through

### Responsive Testing
1. Resize browser window
2. Verify item count changes at breakpoints:
   - Desktop: 3 items
   - Tablet: 2 items
   - Mobile: 1 item

### Test Pages
- `test-3-items.html`: Dedicated testing page with item numbering
- `test-carousel.html`: General carousel functionality test

## Performance Considerations

### Optimization Features
- Hardware-accelerated animations
- Efficient DOM manipulation
- Minimal layout reflows
- Touch-optimized for mobile

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### Common Issues
1. **More than 3 items visible**: Check CSS item width calculations
2. **Items not cycling**: Verify loop configuration and total item count
3. **Responsive not working**: Check viewport meta tag and breakpoints
4. **Auto-advance stopped**: Check hover state and autoplay settings

### Debug Tools
- Browser console for carousel events
- `carouselDebug.measure()` for height consistency
- Viewport info display in test pages

## Maintenance Notes

### Adding/Removing Testimonials
- Update total count in documentation
- Test cycling behavior with new count
- Verify responsive breakpoints still work
- Update test pages if needed

### Configuration Changes
- Modify `js/main.js` for timing/behavior
- Update `css/style.css` for layout
- Test across all breakpoints
- Update documentation accordingly