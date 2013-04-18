<?php
/**
 * PostProcess-Hook of render method in t3lib/class.t3lib_pagerenderer.php
 * to manipulate markers for html5boilerplate changes in TYPO3
 *
 * This is used e.g. to add a custom <html>-tag, to modify the <meta charset>-tag
 * or to add the X-UA-Compatible parameter directly after the <meta charset>-tag
 */
$TYPO3_CONF_VARS['SC_OPTIONS']['t3lib/class.t3lib_pagerenderer.php']['render-postProcess'][] = 'EXT:' . $_EXTKEY . '/Classes/class.tx_html5boilerplate.php:tx_html5boilerplate->pageRendererPostProcessHook';

$TYPO3_CONF_VARS['EXT']['news']['templateLayouts']['myext'] = array('Home Teaser', 'home-teaser');
?>