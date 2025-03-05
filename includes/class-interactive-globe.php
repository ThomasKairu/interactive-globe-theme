<?php
/**
 * Main Interactive Globe Theme Class
 */

if (!defined('ABSPATH')) {
    exit;
}

class Interactive_Globe {
    /**
     * Constructor
     */
    public function __construct() {
        $this->init_hooks();
    }

    /**
     * Initialize hooks
     */
    private function init_hooks() {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('init', array($this, 'register_shortcodes'));
    }

    /**
     * Enqueue required scripts and styles
     */
    public function enqueue_scripts() {
        // Styles
        wp_enqueue_style('interactive-globe-style', get_template_directory_uri() . '/assets/css/style.css');
        wp_enqueue_style('interactive-globe-responsive', get_template_directory_uri() . '/assets/css/responsive.css');
        wp_enqueue_style('interactive-globe-business', get_template_directory_uri() . '/assets/css/business-data.css');
    }

    /**
     * Register shortcodes
     */
    public function register_shortcodes() {
        require_once get_template_directory() . '/includes/shortcodes.php';
    }

    public function add_admin_menu() {
        add_menu_page(
            'Interactive Globe Settings',
            'Interactive Globe',
            'manage_options',
            'interactive-globe',
            array($this, 'render_admin_page'),
            'dashicons-admin-site'
        );
    }

    public function render_admin_page() {
        require_once plugin_dir_path(__FILE__) . '../templates/admin-page.php';
    }
}

// Initialize the class
new Interactive_Globe();
