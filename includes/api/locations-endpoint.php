<?php
/**
 * Locations API Endpoint
 * 
 * Manages office location data
 */

class Interactive_Globe_Locations_Endpoint {
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_endpoints'));
    }

    /**
     * Register API endpoints
     */
    public function register_endpoints() {
        register_rest_route('interactive-globe/v1', '/locations', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_locations'),
                'permission_callback' => array($this, 'check_permission')
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'add_location'),
                'permission_callback' => array($this, 'check_admin_permission')
            )
        ));
    }

    /**
     * Get locations
     */
    public function get_locations($request) {
        $type = $request->get_param('type');
        $locations = $this->fetch_locations($type);
        return rest_ensure_response($locations);
    }

    /**
     * Add new location
     */
    public function add_location($request) {
        $location_data = $request->get_params();
        $result = $this->save_location($location_data);
        return rest_ensure_response($result);
    }

    /**
     * Check basic permissions
     */
    public function check_permission() {
        return true;
    }

    /**
     * Check admin permissions
     */
    public function check_admin_permission() {
        return current_user_can('manage_options');
    }

    public function fetch_locations($type = null) {
        global $wpdb;
        $locations_table = $wpdb->prefix . 'interactive_globe_locations';
        $metrics_table = $wpdb->prefix . 'interactive_globe_metrics';

        $query = "
            SELECT 
                l.*,
                m.revenue,
                m.employees,
                m.market_share,
                m.growth_rate
            FROM $locations_table l
            LEFT JOIN $metrics_table m ON l.id = m.location_id
        ";

        if ($type) {
            $query .= $wpdb->prepare(" WHERE l.type = %s", $type);
        }

        return $wpdb->get_results($query);
    }
} 