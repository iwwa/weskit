<?php

// Definindo a constante do nome do site
define("SITE_NAME", get_bloginfo('name'));

// Definindo a constante da url do tema
define("THEME_URL", get_template_directory_uri() . '/');
function theme_url() {
	echo THEME_URL;
}

// Definindo a constante do diretorio do tema
define("THEME_DIR", get_template_directory() . '/');
function theme_dir() {
	echo THEME_DIR;
}


// Desabilitando a barra adminstrativa
add_action('after_setup_theme', 'disable_admin_bar');
function disable_admin_bar() {
    if ( !current_user_can('administrator') && !is_admin() ) {
        show_admin_bar(false);
    }
}


// Habilitando suporte a thumbnails
add_theme_support('post-thumbnails');


// Criando os cortes das imagens
// add_image_size( 'Slide Home', 1600, 600, true );


// Criando o menu
function register_my_menu() {
	register_nav_menu( 'primary', __( 'Primary Menu', 'theme-slug' ) );
}
add_action( 'after_setup_theme', 'register_my_menu' );


// Incluindo Css e Js
function enqueue_scripts() {
	// Desabilita o JQuery padrao do Wordpress
	wp_deregister_script('jquery');
	// Desabilita embed.js do Wordpress
	wp_deregister_script('wp-embed');
}
add_action( 'wp_enqueue_scripts', 'enqueue_scripts' );


// Habilitando Css Login
function enqueue_login_style() {
	wp_enqueue_style('login-css', THEME_URL . 'css/login.css' );
}
add_action('login_head', 'enqueue_login_style');


// Aqua Resizer
require_once('aq_resizer.php');


// Habilitando ACF options
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page();
}


// Desabilitando wp_emoji
// - Remove os styles e scripts do wp_emoji no Head e Footer de todas as páginas
function disable_wp_emoji() {
	remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
	remove_action( 'wp_print_styles', 'print_emoji_styles' );
}
add_action( 'init', 'disable_wp_emoji' );


// Adicionando o slug da pagina no body_class()
function add_slug_body_class( $classes ) {
	if ( is_page() ) {
		global $post;
		$classes[] = $post->post_type . '-' . $post->post_name;

		if ( $post->post_parent ) {
			$parent = get_post( $post->post_parent );
			$classes[] = $parent->post_type . '-' . $parent->post_name;
		}
	}
	return $classes;
}
add_filter( 'body_class', 'add_slug_body_class' );


/////////********** CODIGO DA MORTE - ALTERE E MORRA ************////////////
function add_image_insert_override($sizes) {
	global $corte;
	foreach ($sizes as $key => $size) {
		if (
			$key != $corte &&
			$key != 'thumbnail' &&
			$key != 'medium' &&
			$key != 'medium_large' &&
			$key != 'large'
			) { unset($sizes[$key]); }
	}
	return $sizes;
}
$corte = '';
if (isset($_POST['editedSize'])) {
	$corte = $_POST['editedSize'];
}
add_filter('intermediate_image_sizes_advanced', 'add_image_insert_override' );
/////////********** CODIGO DA MORTE - ALTERE E MORRA ************////////////
?>
