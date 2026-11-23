<?php

/**
 * Tests for wp_widgets_add_menu().
 *
 * @group widgets
 *
 * @covers ::wp_widgets_add_menu
 */
class Tests_Widgets_WpWidgetsAddMenu extends WP_UnitTestCase {

	/**
	 * Original submenu global.
	 *
	 * @var array
	 */
	private $original_submenu;

	/**
	 * Sets up the fixture.
	 */
	public function set_up() {
		parent::set_up();

		global $submenu;
		$this->original_submenu = $submenu;
		$submenu                = array();
	}

	/**
	 * Tears down the fixture.
	 */
	public function tear_down() {
		global $submenu;
		$submenu = $this->original_submenu;

		parent::tear_down();
	}

	/**
	 * Tests that wp_widgets_add_menu() does nothing when the theme does not support widgets.
	 *
	 * @ticket 60179
	 */
	public function test_does_nothing_when_theme_does_not_support_widgets() {
		global $submenu;

		add_filter( 'current_theme_supports-widgets', '__return_false' );

		wp_widgets_add_menu();

		$this->assertArrayNotHasKey( 'themes.php', $submenu );
	}

	/**
	 * Tests that wp_widgets_add_menu() adds the widgets submenu entry at index 9 for classic themes.
	 *
	 * @ticket 60179
	 */
	public function test_adds_submenu_at_index_9_for_classic_theme() {
		global $submenu;

		add_filter( 'current_theme_supports-widgets', '__return_true' );

		wp_widgets_add_menu();

		$expected_entry = array( __( 'Widgets' ), 'edit_theme_options', 'widgets.php' );

		$this->assertArrayHasKey( 'themes.php', $submenu );
		$this->assertArrayHasKey( 9, $submenu['themes.php'] );
		$this->assertSame( $expected_entry, $submenu['themes.php'][9] );
	}

	/**
	 * Tests that wp_widgets_add_menu() appends the widgets submenu entry for block themes.
	 *
	 * @ticket 60179
	 */
	public function test_appends_submenu_for_block_theme() {
		global $submenu;

		switch_theme( 'block-theme' );
		add_filter( 'current_theme_supports-widgets', '__return_true' );

		wp_widgets_add_menu();

		$expected_entry = array( __( 'Widgets' ), 'edit_theme_options', 'widgets.php' );

		$this->assertArrayHasKey( 'themes.php', $submenu );
		$this->assertContains( $expected_entry, $submenu['themes.php'] );
	}
}
