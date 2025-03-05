<?php
/**
 * Sample Data Initializer
 * 
 * Provides sample business data for testing
 */

class Interactive_Globe_Sample_Data {
    private $wpdb;

    public function __construct() {
        global $wpdb;
        $this->wpdb = $wpdb;
        add_action('admin_post_initialize_sample_data', array($this, 'initialize_sample_data'));
        add_action('admin_menu', array($this, 'add_sample_data_page'));
    }

    public function add_sample_data_page() {
        add_submenu_page(
            'interactive-globe',
            'Sample Data',
            'Initialize Sample Data',
            'manage_options',
            'interactive-globe-sample-data',
            array($this, 'render_sample_data_page')
        );
    }

    public function render_sample_data_page() {
        ?>
        <div class="wrap">
            <h1>Initialize Sample Business Data</h1>
            <p>Click the button below to add sample business locations and metrics data.</p>
            <form method="post" action="<?php echo admin_url('admin-post.php'); ?>">
                <input type="hidden" name="action" value="initialize_sample_data">
                <?php wp_nonce_field('initialize_sample_data', 'sample_data_nonce'); ?>
                <p class="submit">
                    <input type="submit" class="button button-primary" value="Initialize Sample Data">
                </p>
            </form>
        </div>
        <?php
    }

    public function initialize_sample_data() {
        check_admin_referer('initialize_sample_data', 'sample_data_nonce');

        // Sample office locations
        $locations = array(
            array(
                'name' => 'New York HQ',
                'lat' => 40.7128,
                'lng' => -74.0060,
                'type' => 'headquarters',
                'address' => '350 Fifth Avenue, New York, NY 10118',
                'contact_info' => 'Tel: +1 212-555-0123\nEmail: ny@example.com'
            ),
            array(
                'name' => 'London Office',
                'lat' => 51.5074,
                'lng' => -0.1278,
                'type' => 'regional_office',
                'address' => '30 St Mary Axe, London EC3A 8BF',
                'contact_info' => 'Tel: +44 20-555-0124\nEmail: london@example.com'
            ),
            array(
                'name' => 'Tokyo Branch',
                'lat' => 35.6762,
                'lng' => 139.6503,
                'type' => 'branch',
                'address' => '1-1 Marunouchi, Tokyo 100-0005',
                'contact_info' => 'Tel: +81 3-555-0125\nEmail: tokyo@example.com'
            ),
            array(
                'name' => 'Singapore Hub',
                'lat' => 1.3521,
                'lng' => 103.8198,
                'type' => 'regional_office',
                'address' => '1 Raffles Place, Singapore 048616',
                'contact_info' => 'Tel: +65 6555-0126\nEmail: singapore@example.com'
            ),
            array(
                'name' => 'Sydney Office',
                'lat' => -33.8688,
                'lng' => 151.2093,
                'type' => 'branch',
                'address' => '1 Market Street, Sydney NSW 2000',
                'contact_info' => 'Tel: +61 2-555-0127\nEmail: sydney@example.com'
            )
        );

        $locations_table = $this->wpdb->prefix . 'interactive_globe_locations';
        $metrics_table = $this->wpdb->prefix . 'interactive_globe_metrics';

        // Clear existing data
        $this->wpdb->query("TRUNCATE TABLE $locations_table");
        $this->wpdb->query("TRUNCATE TABLE $metrics_table");

        // Insert locations and their metrics
        foreach ($locations as $location) {
            $this->wpdb->insert($locations_table, array(
                'name' => $location['name'],
                'lat' => $location['lat'],
                'lng' => $location['lng'],
                'type' => $location['type'],
                'address' => $location['address'],
                'contact_info' => $location['contact_info']
            ));

            $location_id = $this->wpdb->insert_id;

            // Add sample metrics for each location
            $this->wpdb->insert($metrics_table, array(
                'location_id' => $location_id,
                'revenue' => rand(1000000, 50000000),
                'employees' => rand(50, 1000),
                'market_share' => rand(5, 30),
                'growth_rate' => rand(2, 15)
            ));
        }

        wp_redirect(admin_url('admin.php?page=interactive-globe-sample-data&initialized=1'));
        exit;
    }
} 