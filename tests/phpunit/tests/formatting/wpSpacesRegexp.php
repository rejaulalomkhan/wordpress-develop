<?php

/**
 * Tests for the wp_spaces_regexp() function.
 *
 * @group formatting
 *
 * @covers ::wp_spaces_regexp
 */
class Tests_Formatting_WpSpacesRegexp extends WP_UnitTestCase {

	/**
	 * Tests that wp_spaces_regexp() returns the expected default regular expression pattern.
	 *
	 * @ticket 65819
	 */
	public function test_default_value() {
		$expected = '[\r\n\t ]|\xC2\xA0|&nbsp;';

		$this->assertSame( $expected, wp_spaces_regexp() );
	}

	/**
	 * Tests matching whitespace characters with the regexp pattern.
	 *
	 * @ticket 65819
	 *
	 * @dataProvider data_whitespace_characters
	 *
	 * @param string $input    The character or string to test.
	 * @param bool   $expected Whether it matches whitespace.
	 */
	public function test_matches_whitespace_characters( $input, $expected ) {
		$pattern = '/' . wp_spaces_regexp() . '/';

		$this->assertSame( $expected, (bool) preg_match( $pattern, $input ) );
	}

	/**
	 * Data provider for test_matches_whitespace_characters().
	 *
	 * @return array[]
	 */
	public static function data_whitespace_characters() {
		return array(
			'ordinary space'     => array( ' ', true ),
			'tab character'      => array( "\t", true ),
			'newline character'  => array( "\n", true ),
			'carriage return'    => array( "\r", true ),
			'non-breaking space' => array( "\xC2\xA0", true ),
			'HTML entity &nbsp;' => array( '&nbsp;', true ),
			'lowercase letter'   => array( 'a', false ),
			'digit'              => array( '9', false ),
			'punctuation'        => array( '.', false ),
		);
	}
}
