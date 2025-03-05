<?php
/**
 * Metrics API Endpoint
 * 
 * Handles real-time business metrics
 */

class Interactive_Globe_Metrics_Endpoint {
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_endpoints'));
    }

    /**
     * Register API endpoints
     */
    public function register_endpoints() {
        register_rest_route('interactive-globe/v1', '/metrics', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_metrics'),
            'permission_callback' => array($this, 'check_permission')
        ));
    }

    /**
     * Get metrics data
     */
    public function get_metrics($request) {
        $type = $request->get_param('type');
        $region = $request->get_param('region');

        // Get metrics based on type and region
        $metrics = $this->fetch_metrics($type, $region);

        return rest_ensure_response($metrics);
    }

    /**
     * Check API permissions
     */
    public function check_permission() {
        // Implement permission checks
        return true;
    }

    /**
     * Fetch specific metrics
     */
    private function fetch_metrics($type, $region) {
        global $wpdb;
        $metrics_table = $wpdb->prefix . 'interactive_globe_metrics';
        $locations_table = $wpdb->prefix . 'interactive_globe_locations';

        $query = "
            SELECT 
                l.lat,
                l.lng,
                m.$type as value
            FROM $metrics_table m
            JOIN $locations_table l ON m.location_id = l.id
        ";

        if ($region !== 'all') {
            // Add region filtering if needed
            // This would require adding a region column to the locations table
        }

        return $wpdb->get_results($query);
    }
} 