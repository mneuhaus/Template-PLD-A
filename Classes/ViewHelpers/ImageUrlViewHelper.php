<?php

/* * *************************************************************
 *  Copyright notice
 *
 *  (c) 2010 Claus Due <claus@wildside.dk>, Wildside A/S
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 * ************************************************************* */

/**
 * I f'ing love Coffee.
 *
 * This ViewHelper lets you render a Partial Fluid template containing
 * Javascript - in other words, "Java Script Fluid", popularly known as "Coffee"
 *
 * Does exactly what fed:script does, except uses Fluid with a special pattern
 * when parsing the file or tag content.
 *
 * @author Claus Due, Wildside A/S
 * @package Fed
 * @subpackage ViewHelpers\Extbase\Widget
 */
class Tx_Plda_ViewHelpers_ImageUrlViewHelper extends Tx_Fed_ViewHelpers_ImageViewHelper {

	/**
	 * Initialize arguments
	 * @return void
	 */
	public function initializeArguments() {
		parent::initializeArguments();
		$this->registerTagAttribute('as', 'string', 'name to use as new Variable', FALSE, NULL);
	}

	/**
	 * Render the image(s) to HTML
	 *
	 * @return string
	 */
	public function render() {
		if (TYPO3_MODE === 'BE') {
			$this->simulateFrontendEnvironment();
		}
		$pathinfo = pathinfo($this->arguments['src']);
		if ($pathinfo['filename'] === '*') {
			$images = $this->documentHead->getFilenamesOfType($pathinfo['dirname'], $pathinfo['extension']);
		} elseif ($this->arguments['path']) {
			$src = trim(trim($this->arguments['src']), ',');
			if (strlen($src) === 0) {
				return '';
			}
			$images = explode(',', $src);
				// patch for CSV files missing relative pathnames and possible missing files
			foreach ($images as $k => $v) {
				$images[$k] = $this->arguments['path'] . $v;
			}
		} elseif (is_array($this->arguments['src'])) {
			$images = $this->arguments['src'];
		} else {
			$images = array(trim($this->arguments['src'], ', '));
		}
		if ($this->arguments['sortBy'] !== NULL) {
			$images = $this->sortImages($images);
		}

		if ($this->arguments['limit'] > 0) {
			$images = array_slice($images, 0, $this->arguments['limit']);
		}


		if (count($images) === 0) {
			return '';
		}

			// use altsrc for any image not present
		foreach ($images as $k => $v) {
			if (is_file(t3lib_div::getFileAbsFileName($v)) === FALSE) {
				$images[$k] = $this->arguments['altsrc'];
			}
		}
		$files = $this->renderImages($images);
		if (TYPO3_MODE === 'BE') {
			$this->resetFrontendEnvironment();
		}
		$this->templateVariableContainer->add($this->arguments['as'], $files[0]);
		$output = $this->renderChildren();
		$this->templateVariableContainer->remove($this->arguments['as']);
		return $output;
	}

	/**
	 * Render the images into HTML
	 *
	 * @param array $files
	 * @param boolean $returnConverted
	 * @return string
	 */
	protected function renderImages(array $images, $returnConverted = FALSE) {
		$converted = array();
		$lines = array();
		$setup = array(
			'width' => $this->arguments['width'],
			'height' => $this->arguments['height'],
			'minW' => $this->arguments['minWidth'],
			'minH' => $this->arguments['minHeight'],
			'maxW' => $this->arguments['maxWidth'],
			'maxH' => $this->arguments['maxHeight'],
		);
		if ($this->arguments['clickenlarge'] === TRUE) {
			$this->addScript();
		}

		if ($this->arguments['id']) {
			$uniqid = $this->arguments['id'];
		} else {
			$uniqid = uniqid('fed-xl-');
		}
		if ($this->arguments['largeWidth'] > 0 || $this->arguments['largeHeight'] > 0) {
			$largeSetup = array(
				'width' => $this->arguments['largeWidth'],
				'height' => $this->arguments['largeHeight'],
				'minW' => $this->arguments['largeWidth'],
				'minH' => $this->arguments['largeHeight'],
				'maxW' => $this->arguments['largeWidth'],
				'maxH' => $this->arguments['largeHeight'],
			);
			$large = array();
			foreach ($images as $k => $image) {
				$large[$k] = $this->renderImage($image, $largeSetup);
			}
			$convertedImageFilename = $this->renderImage($images[0], $largeSetup);
			$this->tag->addAttribute('width', $this->arguments['largeWidth']);
			$this->tag->addAttribute('height', $this->arguments['largeHeight']);
			$this->tag->addAttribute('class', 'large ' . $this->arguments['largePosition']);
			$this->tag->addAttribute('id', $uniqid);
			$this->tag->addAttribute('src', $convertedImageFilename[0]);
			$lines[] = $this->tag->render();
			$this->tag->removeAttribute('id');
			array_push($converted, $convertedImageFilename[0]);
		} else {
			$large = NULL;
		}
		$files;
		foreach ($images as $k => $image) {
			$convertedImageFilename = $this->renderImage($image, $setup);
			$files[] = $convertedImageFilename;
		}
		return $files;
	}

}
