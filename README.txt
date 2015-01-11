Documentation

Author: Di'el aka dakaringer
Project: BnS Skill Tree

Disclaimer:

The following files (used for the skill tree itself) is made by ncsoft. 
Most of those are modified by me for translating, fixing bugs and optimizing webpage size.

data_skill-tooltip.js (split into separate files for each class)
data_skill-tooltip-attribute.js
training.min.js
training2.css
common.js (only used the functions relating to JSON)
category_data_XX.js
slot_data_XX.js
skill_data_XX.js


Some codes like jquerytools.js are codes I found floating in the internet.
Background images are taken by me or found on the bns kr screenshot forum.
Skill images are directly from the bns kr website.

If you are going to use, modify and/or host this project yourself, please give credit to where it belongs.




Filename + description:

data_skill-tooltip-attribute.js
 - nested javascript objects describing various type of a tooltip description.
 
extra.js
 - misc. javascript functions
 
jquerytools.js
 - used for the sidebar tabs and dynamic descriptions
 
training.min.js
 - the main underlying functions of the skill tree itself. (advise not to touch unless you feel adventurous or know what you're doing)
 
layout.css
 - styling for the basic layout of the page
 
training2.css
 - styling for the skill tree
 
main.html
 - the main intro page

AS = assassin
BM = blade master
DE = destroyer
FM = force master
KF = kung-fu master
SM = lyn blade master
SU = summoner
WL = warlock

In each class(XX) folder....
bg.css - style used to set the background image on the sidebar
bg_tree.png
 - the background image
 
category_data_XX.js
 - lists the skills shown on the right of the tree
 
data_skill-tooltip_XX.js
 - defines each tooltip description to its type in data_skill-tooltip-attribute.js mainly for the add/mod labels
 
skill_data_XX.js
 - tooltip data (change this if you want to translate the tooltip)
 
slot_data_XX.js
 - defines the layout of the tree for each skill and links each talent to its tooltip data in skill_data_XX.js
 - if a skill isn't here it doesn't have a tree and the skill id in slot_data_XX will link it to the tooltip data in skill_data_XX.js instead
 
XXbuilds.js
 - list of preset builds. Functions are called from this file to apply the JSON string.
 
skillXX.html
 - the page itself
 
 
img folder
bg_tree.psd - used to make each class background images for the sidebar
home.psd - used to make the main background image
disable.png - covers disabled skills in the skill list
favicon.ico - favicon
home.jpg - main bg image (progressive)
ico_down.gif - little down arrow for level/divine level dropdowns
progress.gif - used in the loading bar
skill.png - image map for the tooltip
skill_ui_add.png - add tag for the tooltip
skill_ui_mod.png - mod tag for the tooltip
tr_v2.png - image map for the various components of the skill tree




simplifier
- isn't directly related to the website
- it's a tool I made to quickly optimize data_skill-tooltip-attribute.js and skill_data_XX.js by cutting unused lines of code