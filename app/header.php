<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

  <link rel="shortcut icon" href="<?php theme_url(); ?>favicon.ico">

  <!-- Disable tap highlight on IE -->
  <meta name="msapplication-tap-highlight" content="no">

  <!-- Browser`s header background color -->
  <meta name="theme-color" content="#000000">

  <!-- Add to homescreen for Chrome on Android -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="<?php echo SITE_NAME; ?>">

  <!-- Add to homescreen for Safari on iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
  <meta name="apple-mobile-web-app-title" content="<?php echo SITE_NAME; ?>">

  <!-- build:css -->
  <link rel="stylesheet" href="<?php theme_url(); ?>css/style.css">
  <!-- endbuild -->

  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

  <h1><?php echo SITE_NAME; ?></h1>
