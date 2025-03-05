<?php
/**
 * Register shortcodes for the Interactive Globe Theme
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Create [interactive_globe] shortcode
 */
function interactive_globe_shortcode($atts) {
    // Parse attributes
    $atts = shortcode_atts(array(
        'height' => '600px',
        'width' => '100%'
    ), $atts);

    // Check for WebGL support
    ob_start();
    ?>
    <div class="interactive-globe-container" style="height: <?php echo esc_attr($atts['height']); ?>; width: <?php echo esc_attr($atts['width']); ?>;">
        <div id="globe-container"></div>
        <nav id="main-navigation"></nav>
        <div class="data-controls">
            <div class="data-layers">
                <button class="data-layer-toggle" data-layer="revenue" disabled>
                    <?php _e('Revenue Distribution', 'interactive-globe'); ?>
                </button>
                <button class="data-layer-toggle" data-layer="employees" disabled>
                    <?php _e('Employee Count', 'interactive-globe'); ?>
                </button>
                <button class="data-layer-toggle" data-layer="market_share" disabled>
                    <?php _e('Market Share', 'interactive-globe'); ?>
                </button>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('interactive_globe', 'interactive_globe_shortcode');
