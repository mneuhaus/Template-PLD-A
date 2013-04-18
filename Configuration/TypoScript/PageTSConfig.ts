###########################################################
#	Backend Configuration
###########################################################

#TCAdefaults.tt_content {
#	imagewidth = 150
#	imageorient = 1
#	imagecols = 3
#	image_zoom = 1
#	image_noRows = 1
#    sys_language_uid = -1
#}

#TCEFORM{
#	pages_language_overlay{
#		author.disabled = 1
#		author_email.disabled = 1
#		abstract.disabled = 1
#		keywords.disabled = 1
#		description.disabled = 1
#		media.disabled = 1
#		starttime.disabled = 1
#		endtime.disabled = 1
#		nav_title.disabled = 1
#		tx_realurl_pathsegment.disabled = 1
#	}
#	tt_content {
#	}
#	tt_address {
#        middle_name.disabled = 1
#        building.disabled = 1
#        room.disabled = 1
#        name.disabled = 1
#	}
#}

#tx_news.templateLayouts {
#    microblog = Microblog
#}

RTE.default.proc {
  allowTags := addToList(iframe)
  allowTagsOutside := addToList(iframe)
  entryHTMLparser_db.allowTags < RTE.default.proc.allowTags
}
RTE.default.FE.proc < RTE.default.proc