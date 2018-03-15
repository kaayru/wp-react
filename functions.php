<?php
/**
 * WP-React functions and definitions.
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package wpreact
 */

if ( ! defined( 'WP_REACT_VERSION' ) ) {
	define( 'WP_REACT_VERSION', time() );
}

if ( ! function_exists( 'wpreact_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function wpreact_setup() {
	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on WpReact, use a find and replace
	 * to change 'wpreact' to the name of your theme in all the template files.
	 */
	load_theme_textdomain( 'wpreact', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => esc_html__( 'Primary Menu', 'wpreact' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	) );

	/*
	 * Enable support for Post Formats.
	 * See https://developer.wordpress.org/themes/functionality/post-formats/
	 */
	add_theme_support( 'post-formats', array(
		'aside',
		'image',
		'video',
		'quote',
		'link',
	) );

	add_post_type_support( 'post', 'comments' );
	add_post_type_support( 'page', 'comments' );

	// Set up the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'wpreact_custom_background_args', array(
		'default-color' => 'ffffff',
		'default-image' => '',
	) ) );

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support( 'custom-logo', array(
		'height'      => 250,
		'width'       => 250,
		'flex-width'  => true,
		'flex-height' => true,
	) );
}
endif; // wpreact_setup
add_action( 'after_setup_theme', 'wpreact_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function wpreact_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'wpreact_content_width', 730 );
}
add_action( 'after_setup_theme', 'wpreact_content_width', 0 );

/**
 * Enqueue scripts and styles.
 */
function wpreact_scripts() {
	/*if ( is_customize_preview() ) {
		wp_enqueue_script( 'wpreact-customize-preview', get_template_directory_uri() . '/js/customize-preview.js', array( 'jquery', 'customize-preview', 'customize-preview-nav-menus' ), WP_REACT_VERSION, true );
	}*/

	wp_enqueue_style( 'wpreact-style', get_stylesheet_uri() );
	wp_enqueue_script( 'main-js', get_template_directory_uri() . '/compiled/js/main.js', null, WP_REACT_VERSION, true);
	wp_enqueue_style( 'main-css', get_template_directory_uri() . '/compiled/main.css', null, WP_REACT_VERSION, false);
}
add_action( 'wp_enqueue_scripts', 'wpreact_scripts' );

/**
 * Returns the Google font stylesheet URL, if available.
 *
 * The use of Source Serif Pro and Source Code Pro by default is
 * localized. For languages that use characters not supported by
 * either font, the font can be disabled.
 *
 * @return string Font stylesheet or empty string if disabled.
 */
function wpreact_fonts_url() {
	$fonts_url = '';

	/* Translators: If there are characters in your language that are not
	 * supported by Source Serif Pro, translate this to 'off'. Do not translate
	 * into your own language.
	 */
	$serifpro = _x( 'on', 'Source Serif Pro font: on or off', 'wpreact' );

	/* Translators: If there are characters in your language that are not
	 * supported by Source Code Pro, translate this to 'off'. Do not translate into
	 * your own language.
	 */
	$codepro = _x( 'on', 'Source Code Pro font: on or off', 'wpreact' );

	if ( 'off' !== $serifpro || 'off' !== $codepro ) {
		$font_families = array();

		if ( 'off' !== $serifpro )
			$font_families[] = urlencode( 'Source Serif Pro:400,700' );

		if ( 'off' !== $codepro )
			$font_families[] = urlencode( 'Source Code Pro:400,600' );

		$protocol = is_ssl() ? 'https' : 'http';
		$query_args = array(
			'family' => implode( '|', $font_families ),
			'subset' => urlencode( 'latin,latin-ext' ),
		);
		$fonts_url = add_query_arg( $query_args, "$protocol://fonts.googleapis.com/css" );
	}

	return $fonts_url;
}

/**
 * Loads our special font CSS file.
 *
 * To disable in a child theme, use wp_dequeue_style()
 * function mytheme_dequeue_fonts() {
 *     wp_dequeue_style( 'wpreact-fonts' );
 * }
 * add_action( 'wp_enqueue_scripts', 'mytheme_dequeue_fonts', 11 );
 *
 * @return void
 */
function wpreact_fonts() {
	$fonts_url = wpreact_fonts_url();
	if ( ! empty( $fonts_url ) )
		wp_enqueue_style( 'wpreact-fonts', esc_url_raw( $fonts_url ), array(), null );
}
add_action( 'wp_enqueue_scripts', 'wpreact_fonts' );

/**
 * Add theme support for Jetpack Features
 */
function wpreact_jetpack_setup() {
	add_theme_support( 'site-logo' );
}
add_action( 'after_setup_theme', 'wpreact_jetpack_setup' );

/**
 * Register customizer settings.
 *
 * @param WP_Customize_Manager $wp_customize Customize manager.
 */
function wpreact_customize_register( WP_Customize_Manager $wp_customize ) {
	$wp_customize->get_setting( 'blogname' )->transport        = 'postMessage';
	$wp_customize->get_setting( 'blogdescription' )->transport = 'postMessage';

	add_filter( 'wp_get_nav_menu_items', '_wpreact_filter_wp_api_nav_menu_items_workaround', 20  );
}
add_action( 'customize_register', 'wpreact_customize_register' );

/**
 * Workaround issue in WP API Menus plugin to force nav menu item classes to be arrays instead of strings.
 *
 * @see \WP_REST_Menus::get_menu_location()
 *
 * @param array $items Nav menu items.
 */
function _wpreact_filter_wp_api_nav_menu_items_workaround( $items ) {
	foreach ( $items as &$item ) {
		if ( is_string( $item->classes ) ) {
			$item->classes = explode( ' ', $item->classes );
		}
	}
	return $items;
}

function wpreact_get_settings() {
	$settings = wp_load_alloptions();
	$mods = get_theme_mods();

	$return = [];

	if ($settings['blogname']) {
		$return['name'] = $settings['blogname'];
	}

	if ($settings['blogdescription']) {
		$return['description'] = $settings['blogdescription'];
	}

	if ($settings['home']) {
		$return['home'] = $settings['home'];
	}

	if ($mods['custom_logo']) {
		$logo = wp_get_attachment_image_src( $mods['custom_logo'] , 'full' );
		$return['custom_logo'] = $logo[0];
	}

	return $return;
}

add_action( 'rest_api_init', function () {
  register_rest_route( 'wpreact/v1', '/settings', array(
    'methods' => 'GET',
    'callback' => 'wpreact_get_settings',
  ) );
} );