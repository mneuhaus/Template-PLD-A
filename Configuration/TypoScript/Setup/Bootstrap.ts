page = PAGE
page {
	headerData {
		10 = HTML
		10.value (
			<link rel="shortcut icon" href="{$config.template_path}/Resources/Public/img/favicon.ico" />
			<link rel="apple-touch-icon" href="{$config.template_path}/Resources/Public/img/apple-touch-icon.png">
		<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    		<!--[if lt IE 9]>
    		  <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    		<![endif]-->
		)
	}

	includeCSS {
		bootstrap = {$config.template_path}/Resources/Public/styles/main.css
		marc = {$config.template_path}/Resources/Public/styles/marc.css
		sven = {$config.template_path}/Resources/Public/styles/sven.css
	}

	includeJS{
		jquery = {$config.template_path}/Resources/Public/components/jquery/jquery.js
		colorbox = {$config.template_path}/Resources/Public/components/jquery.colorbox/jquery.colorbox-min.js
		bootstrap-dropdown = {$config.template_path}/Resources/Public/components/bootstrap/js/bootstrap-dropdown.js
		bootstrap-button = {$config.template_path}/Resources/Public/components/bootstrap/js/bootstrap-button.js
		bootstrap-tooltip = {$config.template_path}/Resources/Public/components/bootstrap/js/bootstrap-tooltip.js
		bootstrap-tabs = {$config.template_path}/Resources/Public/components/bootstrap/js/bootstrap-tab.js

		famelo-off-canvas = {$config.template_path}/Resources/Public/components/famelo/components/scripts/off-canvas.js
		flexslider = {$config.template_path}/Resources/Public/components/flexslider/jquery.flexslider-min.js
		main = {$config.template_path}/Resources/Public/scripts/main.js
	}
}

# General site config
config {
	# Development
	## Disable Cache
	config.no_cache = 1

	# html5? Yes, please!
	doctype = html5

	# XML? No, thank you!
	xmlprologue = none

	html5boilerplate{
		# This replaces the html tag with some conditional comments for IE and a no-js class
		htmlTag (
<!--[if lt IE 7 ]> <html lang="en" class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html lang="en" class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html lang="en" class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html lang="en" class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html lang="en" class="no-js"> <!--<![endif]-->
		)

		# Make sure the meta charset is short and sweet
		metaCharsetTag = <meta charset="|">
		metaCharsetTag.insertAfter (
			<!-- Always force latest IE rendering engine (even in intranet) & Chrome Frame -->
			<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
	  	)
	}


	# Taking out the trash, aka. cleaning up the code

	# Tries to clean up the output. Tries...
	# xhtml_cleaning = all

	# If set, the stdWrap property “prefixComment” will be disabled, thus preventing any revealing and space-consuming comments in the HTML source code.
	disablePrefixComment = 1

	# If set, the inline styles TYPO3 controls in the core are written to a file
	inlineStyle2TempFile = 1

	# All javascript (includes and inline) will be moved to the bottom of the html document
	moveJsFromHeaderToFooter = 1

	# If set, the default JavaScript in the header will be removed (blurLink function and browser detection variables)
	removeDefaultJS = 1

	# If set inline or externalized (see removeDefaultJS above) JavaScript will be minified.
	# Minification will remove all excess space and cause faster page loading.
	minifyJS = 1

	# Add L and print values to all links in TYPO3.
	linkVars = L, print

	# Charset, should always be utf-8
	renderCharset = utf-8


	# Search. This should be disabled if you are not using Indexed search!

	# For pages
	index_enable = {$config.index_enable}

	# For documents
	index_externals = {$config.index_externals}


	# Multidomain setup

	# If set, then every “typolink” is checked whether it's linking to a page within the current rootline of the site.
	typolinkCheckRootline = 1

	# This option enables to create links across domains using current domain's linking scheme.
	typolinkEnableLinksAcrossDomains = 1

	# Spam protection
	spamProtectEmailAddresses = ascii


	# Enable RealURL
	tx_realurl_enable = 1

	# The <base> tag in the header of the document which is used by RealURL
	baseURL = {$config.baseURL}

}

	# Seitentitel entfernen
	config.noPageTitle = 1
	page = PAGE
	page {
	# Neuen title Tag in headerData setzen
		headerData {
			11 = TEXT
			11 {
				field = title
				noTrimWrap = |<title> | - Professional Lighting Designers' Association</title>|
		  	}
		}
	}
	
	# bodyTag
	page.bodyTag >
	
	page.bodyTagCObject = TEXT
	page.bodyTagCObject.field = uid
	page.bodyTagCObject.wrap = <body id="page-|"> 