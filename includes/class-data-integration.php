<?php
/**
 * Data Integration Handler
 * 
 * Handles external data sources and integration with business systems
 */

class Interactive_Globe_Data_Integration {
    private $api_key;
    private $cache_duration = 3600; // 1 hour cache

    public function __construct() {
        $this->api_key = get_option('interactive_globe_api_key');
        add_action('wp_ajax_fetch_business_data', array($this, 'fetch_business_data'));
        add_action('wp_ajax_nopriv_fetch_business_data', array($this, 'fetch_business_data'));
    }

    /**
     * Fetch business metrics from various sources
     */
    public function fetch_business_data() {
        // Verify nonce and permissions
        check_ajax_referer('interactive_globe_data', 'nonce');

        $data_type = sanitize_text_field($_POST['data_type']);
        $cached_data = get_transient('interactive_globe_' . $data_type);

        if (false !== $cached_data) {
            wp_send_json_success($cached_data);
        }

        $data = $this->get_external_data($data_type);
        set_transient('interactive_globe_' . $data_type, $data, $this->cache_duration);

        wp_send_json_success($data);
    }

    /**
     * Get data from external APIs
     */
    private function get_external_data($type) {
        switch ($type) {
            case 'revenue':
                return $this->get_revenue_data();
            case 'employees':
                return $this->get_employee_data();
            case 'markets':
                return $this->get_market_data();
            default:
                return array();
        }
    }

    /**
     * Connect to CRM systems
     */
    public function connect_crm($crm_type) {
        // Implementation for CRM connection
    }

    /**
     * Handle real-time data updates
     */
    public function handle_realtime_updates() {
        // Implementation for real-time updates
    }
} 