<?php

/**
 * Tests for get_theme_mods() and remove_theme_mods().
 *
 * @group theme
 *
 * @covers ::get_theme_mods
 * @covers ::remove_theme_mods
 */
class Tests_Theme_GetThemeMods extends WP_UnitTestCase {

	/**
	 * Original theme mods option value.
	 *
	 * @var mixed
	 */
	private $original_mods;

	/**
	 * Stylesheet option.
	 *
	 * @var string
	 */
	private $stylesheet;

	/**
	 * Sets up the fixture.
	 */
	public function set_up() {
		parent::set_up();

		$this->stylesheet    = get_option( 'stylesheet' );
		$this->original_mods = get_option( "theme_mods_{$this->stylesheet}" );
	}

	/**
	 * Tears down the fixture.
	 */
	public function tear_down() {
		if ( false !== $this->original_mods ) {
			update_option( "theme_mods_{$this->stylesheet}", $this->original_mods );
		} else {
			delete_option( "theme_mods_{$this->stylesheet}" );
		}

		$theme_name = get_option( 'current_theme' );
		if ( false === $theme_name ) {
			$theme_name = wp_get_theme()->get( 'Name' );
		}
		delete_option( "mods_{$theme_name}" );

		parent::tear_down();
	}

	/**
	 * Tests that get_theme_mods() returns an empty array when no mods exist.
	 *
	 * @ticket 65819
	 */
	public function test_get_theme_mods_returns_empty_array_when_no_mods() {
		delete_option( "theme_mods_{$this->stylesheet}" );

		$theme_name = get_option( 'current_theme' );
		if ( false === $theme_name ) {
			$theme_name = wp_get_theme()->get( 'Name' );
		}
		delete_option( "mods_{$theme_name}" );

		$this->assertSame( array(), get_theme_mods() );
	}

	/**
	 * Tests that get_theme_mods() returns stored theme modifications.
	 *
	 * @ticket 65819
	 */
	public function test_get_theme_mods_returns_stored_mods() {
		$expected = array(
			'custom_logo'  => 42,
			'header_color' => 'ffffff',
		);

		update_option( "theme_mods_{$this->stylesheet}", $expected );

		$this->assertSame( $expected, get_theme_mods() );
	}

	/**
	 * Tests that get_theme_mods() falls back to deprecated mods location if modern location is missing.
	 *
	 * @ticket 65819
	 */
	public function test_get_theme_mods_falls_back_to_deprecated_location() {
		delete_option( "theme_mods_{$this->stylesheet}" );

		$theme_name = get_option( 'current_theme' );
		if ( false === $theme_name ) {
			$theme_name = wp_get_theme()->get( 'Name' );
		}

		$expected = array(
			'background_color' => '000000',
		);
		update_option( "mods_{$theme_name}", $expected );

		$this->assertSame( $expected, get_theme_mods() );
	}

	/**
	 * Tests that remove_theme_mods() removes theme modifications for both modern and legacy option locations.
	 *
	 * @ticket 65819
	 */
	public function test_remove_theme_mods_deletes_mods() {
		$theme_name = get_option( 'current_theme' );
		if ( false === $theme_name ) {
			$theme_name = wp_get_theme()->get( 'Name' );
		}

		$mods = array(
			'color_scheme' => 'dark',
		);
		update_option( "theme_mods_{$this->stylesheet}", $mods );
		update_option( "mods_{$theme_name}", $mods );

		$this->assertSame( $mods, get_theme_mods() );

		remove_theme_mods();

		$this->assertSame( array(), get_theme_mods() );
		$this->assertFalse( get_option( "theme_mods_{$this->stylesheet}" ) );
		$this->assertFalse( get_option( "mods_{$theme_name}" ) );
	}
}
