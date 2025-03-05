<?php
/**
 * Template Name: Interactive Globe
 * 
 * This template displays the interactive 3D globe visualization
 */

get_header(); ?>

<div class="globe-page-wrapper">
    <div id="globe-container"></div>
    <nav id="main-navigation"></nav>

    <div class="data-controls">
        <div class="data-layers">
            <button class="data-layer-toggle" data-layer="revenue" disabled>
                Revenue Distribution
            </button>
            <button class="data-layer-toggle" data-layer="employees" disabled>
                Employee Count
            </button>
            <button class="data-layer-toggle" data-layer="market_share" disabled>
                Market Share
            </button>
        </div>
    </div>
</div>

<?php
// Enqueue required scripts
function enqueue_globe_scripts() {
    wp_enqueue_script('three-js', 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js', array(), null, true);
    wp_enqueue_script('gltf-loader', 'https://unpkg.com/three@0.128.0/examples/js/loaders/GLTFLoader.js', array('three-js'), null, true);
    wp_enqueue_script('gsap', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.7.1/gsap.min.js', array(), null, true);

    // Theme scripts
    wp_enqueue_script('globe-js', get_template_directory_uri() . '/assets/js/globe.js', array('three-js'), '1.0.0', true);
    wp_enqueue_script('navigation-js', get_template_directory_uri() . '/assets/js/navigation.js', array('globe-js'), '1.0.0', true);
    wp_enqueue_script('business-data-js', get_template_directory_uri() . '/assets/js/business-data.js', array('globe-js'), '1.0.0', true);
    wp_enqueue_script('accessibility-js', get_template_directory_uri() . '/assets/js/accessibility.js', array('globe-js'), '1.0.0', true);
    wp_enqueue_script('main-js', get_template_directory_uri() . '/assets/js/main.js', array('globe-js'), '1.0.0', true);
}
add_action('wp_enqueue_scripts', 'enqueue_globe_scripts');

get_footer();
?>
