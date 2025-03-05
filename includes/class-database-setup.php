<?php
/**
 * Database Setup Handler
 * 
 * Creates and manages custom tables for locations and metrics
 */

class Interactive_Globe_Database_Setup {
    public function __construct() {
        add_action('activate_interactive-globe/interactive-globe.php', array($this, 'create_tables'));
    }

    public function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();

        // Locations table
        $table_name = $wpdb->prefix . 'interactive_globe_locations';
        $sql = "CREATE TABLE IF NOT EXISTS $table_name (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            lat decimal(10,8) NOT NULL,
            lng decimal(11,8) NOT NULL,
            type varchar(50) NOT NULL,
            address text,
            contact_info text,
            metrics_id bigint(20),
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY type (type),
            KEY coordinates (lat, lng)
        ) $charset_collate;";

        // Metrics table
        $metrics_table = $wpdb->prefix . 'interactive_globe_metrics';
        $sql .= "CREATE TABLE IF NOT EXISTS $metrics_table (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            location_id bigint(20),
            revenue decimal(15,2),
            employees int,
            market_share decimal(5,2),
            growth_rate decimal(5,2),
            timestamp datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY  (id),
            KEY location_id (location_id),
            KEY timestamp (timestamp)
        ) $charset_collate;";

        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
} 