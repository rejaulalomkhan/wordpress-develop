<?php

/**
 * Tests for wp_get_original_referer() and wp_original_referer_field().
 *
 * @group functions
 *
 * @covers ::wp_get_original_referer
 * @covers ::wp_original_referer_field
 */
class Tests_Functions_OriginalReferer extends WP_UnitTestCase {

	/**
	 * Sets up the fixture.
	 */
	public function set_up() {
		parent::set_up();

		$_SERVER['REQUEST_URI']                = '';
		$_REQUEST['_wp_original_http_referer'] = '';
	}

	/**
	 * Tears down the fixture.
	 */
	public function tear_down() {
		$_SERVER['REQUEST_URI'] = '';
		unset( $_REQUEST['_wp_original_http_referer'] );

		parent::tear_down();
	}

	/**
	 * Tests that wp_get_original_referer() returns false when no referer is set.
	 *
	 * @ticket 65819
	 */
	public function test_wp_get_original_referer_returns_false_when_empty() {
		$this->assertFalse( wp_get_original_referer() );
	}

	/**
	 * Tests that wp_get_original_referer() returns a validated local redirect URL.
	 *
	 * @ticket 65819
	 */
	public function test_wp_get_original_referer_validates_internal_url() {
		$url                                   = 'http://' . WP_TESTS_DOMAIN . '/target-page.php?param=value';
		$_REQUEST['_wp_original_http_referer'] = $url;

		$this->assertSame( $url, wp_get_original_referer() );
	}

	/**
	 * Tests that wp_get_original_referer() rejects an external unsafe redirect URL.
	 *
	 * @ticket 65819
	 */
	public function test_wp_get_original_referer_rejects_external_unsafe_url() {
		$_REQUEST['_wp_original_http_referer'] = 'http://example.com/malicious-target';

		$this->assertFalse( wp_get_original_referer() );
	}

	/**
	 * Tests that wp_original_referer_field() returns markup with the original referer value.
	 *
	 * @ticket 65819
	 */
	public function test_wp_original_referer_field_markup_with_original_referer() {
		$url                                   = 'http://' . WP_TESTS_DOMAIN . '/edit.php?post_type=page';
		$_REQUEST['_wp_original_http_referer'] = $url;

		$expected = '<input type="hidden" name="_wp_original_http_referer" value="' . esc_attr( $url ) . '" />';

		$this->assertSame( $expected, wp_original_referer_field( false ) );
	}

	/**
	 * Tests that wp_original_referer_field() falls back to REQUEST_URI when jump_back_to is 'current'.
	 *
	 * @ticket 65819
	 */
	public function test_wp_original_referer_field_falls_back_to_request_uri() {
		$_REQUEST['_wp_original_http_referer'] = '';
		$_SERVER['REQUEST_URI']                = '/wp-admin/options-general.php';

		$expected = '<input type="hidden" name="_wp_original_http_referer" value="/wp-admin/options-general.php" />';

		$this->assertSame( $expected, wp_original_referer_field( false, 'current' ) );
	}

	/**
	 * Tests that wp_original_referer_field() echoes the markup when display is true.
	 *
	 * @ticket 65819
	 */
	public function test_wp_original_referer_field_echoes_markup() {
		$url                                   = 'http://' . WP_TESTS_DOMAIN . '/post-new.php';
		$_REQUEST['_wp_original_http_referer'] = $url;

		$expected = '<input type="hidden" name="_wp_original_http_referer" value="' . esc_attr( $url ) . '" />';

		$this->expectOutputString( $expected );
		$returned = wp_original_referer_field( true );

		$this->assertSame( $expected, $returned );
	}
}
