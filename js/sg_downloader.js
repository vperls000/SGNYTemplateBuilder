// SIEGEL+GALE TEMPLATE DOWNLOADER
// APRIL 2021

function resetForm()
{
	document.forms['customizer'].passedErrorCheck.value="no";
	document.location = 'index.php';
}

// CHECK FOR ERRORS AND TOGGLE VISIBILITY

function errorCheck()
{
	passcolor = "#7F7F7F" // 50% black
	failcolor = "#DA291C" // Red
	error = "no";

	// CHECK MENU SELECTIONS
	if ((document.customizer.menu_type.value == "Letter") || (document.customizer.menu_type.value == "Agenda") || (document.customizer.menu_type.value == "Fax") || (document.customizer.menu_type.value == "Label")) { var checkMenus = new Array("type","size","printing","city"); }
	if (document.customizer.menu_type.value == "Envelope") { var checkMenus = new Array("type","size","printing"); }
	if ((document.customizer.menu_type.value == "PowerPoint") || (document.customizer.menu_type.value == "PowerPoint")) { var checkMenus = new Array("type","size"); }
	if (document.customizer.menu_type.value == "Email") { var checkMenus = new Array("type"); }

	for (counter=0; counter < checkMenus.length ; counter++)
	{
		eval("menuSelection = document.customizer.menu_" + checkMenus[counter] + ".options[0].selected");
		if (menuSelection) { error = "yes"; eval("document.getElementById('error_" + checkMenus[counter] + "').style.color = failcolor;"); }
		else { eval("document.getElementById('error_" + checkMenus[counter] + "').style.color = passcolor;"); }
	}

	// CHECK TEXT ENTRIES
	if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized"))
	{
		var checkFields = new Array("myname","mytitle1","myphone1","myemail");

		for (counter=0; counter < checkFields.length ; counter++)
		{	
			eval("fieldContent = document.forms['customizer']." + checkFields[counter] + ".value;");

			if ((fieldContent == "") || (fieldContent == "+0 000 000 0000") || (fieldContent == "+1 000 000 0000"))
			{
				error = "yes"; eval("document.getElementById('error_" + checkFields[counter] + "').style.color = failcolor;");
			}
			else { eval("document.getElementById('error_" + checkFields[counter] + "').style.color = passcolor;"); }
		}

		// CHECK EMAIL ADDRESS FOR VALID PATTERN
		document.forms['customizer'].myemail.value = document.forms['customizer'].myemail.value.replace(/^\s+|\s+$/g, '') ;
		var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (reg.test(document.forms['customizer'].myemail.value) == false) { error = "yes"; document.getElementById('error_myemail').style.color = failcolor; }
		else { document.getElementById('error_myemail').style.color = passcolor; }
	}
	
	// TOGGLE VISIBILITY

	if (((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) && (document.forms['customizer'].menu_city.value != "disabled"))
	{
		document.getElementById("div_personalization_section").style.display = "";
		
		if ((document.forms['customizer'].myphone1.value == "") || (document.forms['customizer'].myphone1.value == "+1 000 000 0000") || (document.forms['customizer'].myphone1.value == "+0 000 000 0000"))
		{
			if ((document.forms['customizer'].menu_city.value == "LosAngeles") || (document.forms['customizer'].menu_city.value == "NewYork") || (document.forms['customizer'].menu_city.value == "SanFrancisco"))
			{
				document.forms['customizer'].myphone1.value = "+1 000 000 0000";
			}
			else
			{
				document.forms['customizer'].myphone1.value = "+0 000 000 0000";
			}
		}
	}
	else
	{
		document.getElementById("div_personalization_section").style.display = "none";
	}

	if (document.customizer.menu_type.value == "Envelope")
	{
		document.getElementById("div_menu_city").style.display = "none";
	}

	if (error == "no")
	{
		document.forms['customizer'].passedErrorCheck.value="yes";
		document.getElementById("submit_button").className="button slim critical";
		document.getElementById("submit_button").href="javascript:document.forms['customizer'].submit();";
	}
	else
	{
		document.forms['customizer'].passedErrorCheck.value="no";
		document.getElementById("submit_button").className="button slim critical_disabled";
		document.getElementById("submit_button").href="javascript:void(0);";
	}
}

// POPULATE SPECIFIED MENU BASED ON MENU SELECTION

function createMenu(thisMenu)
{
	eval("theArray = menuArray_" + thisMenu +";");

	counter = 0;
	menuItemCounter = 0;

	eval("document.customizer.menu_" + thisMenu + ".options.length = theArray.length/2");

	while (counter < theArray.length)
	{
		eval("document.customizer.menu_" + thisMenu + ".options[menuItemCounter].text = theArray[counter]");
		counter += 1;
		eval("document.customizer.menu_" + thisMenu + ".options[menuItemCounter].value = theArray[counter]");
		eval("document.customizer.menu_" + thisMenu + ".options[menuItemCounter].disabled = false");
	
		if (theArray[counter] == "disabled") eval("document.customizer.menu_" + thisMenu + ".options[menuItemCounter].disabled = true");

		counter += 1;
		menuItemCounter += 1;
	}

	eval("document.customizer.menu_" + thisMenu + ".options[0].selected = true");
	eval("document.getElementById('div_menu_" + thisMenu + "').style.display = ''");
}

// WHAT HAPPENS AFTER SELECTION IN "TYPE" MENU

function processMenuType()
{
	if (document.customizer.menu_type.value == "Email")
	{
		document.forms['customizer'].passedErrorCheck.value="yes";
		document.getElementById("submit_button").className="button slim critical";
		document.getElementById("submit_button").href="javascript:document.forms['customizer'].submit();";

		document.getElementById("div_menu_size").style.display = "none";
	}
	else
	{
		menuArray_size = new Array();
		
		menuArray_size = menuArray_size.concat("Â Choose size", "disabled");
		
		if (document.customizer.menu_type.value == "Envelope")
		{
			menuArray_size = menuArray_size.concat("Â US Sizes", "US");
			menuArray_size = menuArray_size.concat("Â Metric Sizes", "A4");
		}
		else if (document.customizer.menu_type.value == "Label")
		{
			menuArray_size = menuArray_size.concat("Â 8.5\" x 11\" US Letter, 3 per sheet", "US");
			menuArray_size = menuArray_size.concat("Â 210mm x 297mm A4, 3 per sheet", "A4");
		}
		else if (document.customizer.menu_type.value == "LabelGeneric")
		{
			menuArray_size = menuArray_size.concat("Â 8.5\" x 11\" US Letter, preprinted, 3 per sheet", "US");
			menuArray_size = menuArray_size.concat("Â 210mm x 297mm A4, preprinted, 3 per sheet", "A4");
		}
		else if (document.customizer.menu_type.value == "PowerPoint")
		{
			menuArray_size = menuArray_size.concat("Â 16x9 Complete (with instruction slides)", "16x9_Complete");
			menuArray_size = menuArray_size.concat("Â 16x9 Simple (without instruction slides)", "16x9_Simple");
		}
		else
		{
			menuArray_size = menuArray_size.concat("Â 8.5\" x 11\" US Letter", "US");
			menuArray_size = menuArray_size.concat("Â 210mm x 297mm A4", "A4");
		}
		
		createMenu("size");
		document.customizer.menu_size.focus();
	}
	
	document.forms['customizer'].menu_printing.options[0].selected = true;
	document.getElementById("div_menu_printing").style.display = "none";
	document.forms['customizer'].menu_city.options[0].selected = true;
	document.getElementById("div_menu_city").style.display = "none";
	document.getElementById("div_city_info").style.display = "none";
	document.getElementById("div_city_address").innerHTML = "";
}

// WHAT HAPPENS AFTER SELECTION IN "SIZE" MENU

function processMenuSize()
{
	if ((document.customizer.menu_type.value == "LabelGeneric") || (document.customizer.menu_type.value == "PowerPoint") || (document.customizer.menu_type.value == "Simple"))
	{
		document.forms['customizer'].passedErrorCheck.value="yes";
		document.getElementById("submit_button").className="button slim critical";
		document.getElementById("submit_button").href="javascript:document.forms['customizer'].submit();";
		
		document.getElementById("div_menu_printing").style.display = "none";
	}
	else
	{
		menuArray_printing = new Array();
		
		menuArray_printing = menuArray_printing.concat("Â Choose printing format", "disabled");
		
		if (document.customizer.menu_type.value == "Letter")
		{
			menuArray_printing = menuArray_printing.concat("Â On blank paper, with personalization", "BlankPersonalized");
			menuArray_printing = menuArray_printing.concat("Â On blank paper, with generic info", "BlankGeneric");
			menuArray_printing = menuArray_printing.concat("Â On preprinted letterhead, with personalization", "PreprintedPersonalized");
			menuArray_printing = menuArray_printing.concat("Â On preprinted letterhead, with generic info", "PreprintedGeneric");
		}
		
		if (document.customizer.menu_type.value == "Memo")
		{
			menuArray_printing = menuArray_printing.concat("Â On blank paper, with personalization", "BlankPersonalized");
			menuArray_printing = menuArray_printing.concat("Â On blank paper, with generic info", "BlankGeneric");
		}
		
		if (document.customizer.menu_type.value == "Agenda")
		{
			menuArray_printing = menuArray_printing.concat("Â On blank paper, with generic info", "BlankGeneric");
		}
		
		if (document.customizer.menu_type.value == "Fax")
		{
			menuArray_printing = menuArray_printing.concat("Â On blank paper, with generic info", "BlankGeneric");
		}
		
		if (document.customizer.menu_type.value == "Label")
		{
			menuArray_printing = menuArray_printing.concat("Â On blank labels, with generic info", "BlankGeneric");
		}
		
		if (document.customizer.menu_type.value == "Envelope")
		{
			if (document.customizer.menu_size.value == "US") menuArray_printing = menuArray_printing.concat("Â On preprinted #10 envelopes", "PreprintedGeneric");
			if (document.customizer.menu_size.value == "A4") menuArray_printing = menuArray_printing.concat("Â On preprinted DL envelopes", "PreprintedGeneric");
		}

		createMenu("printing");
		document.customizer.menu_printing.focus();
	}
	
	document.getElementById("div_menu_city").style.display = "none";
	document.getElementById("div_city_info").style.display = "none";
	document.getElementById("div_city_address").innerHTML = "";
}

// WHAT HAPPENS AFTER SELECTION IN "PRINTING" MENU

function processMenuPrinting()
{
	menuArray_city = new Array();

	menuArray_city = menuArray_city.concat("Â Choose city", "disabled");
	menuArray_city = menuArray_city.concat("Â Dubai", "Dubai");
	menuArray_city = menuArray_city.concat("Â Dubai Ø§Ù„Ø¹Ø±Ø¨ÙŠØ©", "DubaiArabic");
	menuArray_city = menuArray_city.concat("Â London", "London");			
	menuArray_city = menuArray_city.concat("Â Los Angeles", "LosAngeles");
	menuArray_city = menuArray_city.concat("Â New York", "NewYork");
	menuArray_city = menuArray_city.concat("Â San Francisco", "SanFrancisco");
	menuArray_city = menuArray_city.concat("Â Shanghai", "Shanghai");
	menuArray_city = menuArray_city.concat("Â Shanghai ä¸­æ–‡", "ShanghaiChinese");

	createMenu("city");
	document.customizer.menu_city.focus();

	document.getElementById("div_city_info").style.display = "none";
	document.getElementById("div_city_address").innerHTML = "";
}

// WHAT HAPPENS AFTER SELECTION IN "CITY" MENU

function processMenuCity()
{
	document.getElementById("div_city_info").style.display = "";
	document.getElementById("div_city_address").innerHTML = "";
	document.getElementById("div_city_phone").innerHTML = "";
	
	if (document.forms['customizer'].menu_city.value == "Dubai")
	{
		document.getElementById("div_city_address").innerHTML = "Office 206, 2nd Fl<br />Bldg 4, Dubai Media City<br />PO Box 502835<br />Dubai, UAE";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+971 4 369 9750<br />siegelgale.com"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.com"; }
	}
	
	if (document.forms['customizer'].menu_city.value == "DubaiArabic")
	{
		document.getElementById("div_city_address").innerHTML = "Ù…ÙƒØªØ¨ 206ØŒ Ø§Ù„Ø·Ø§Ø¨Ù‚ Ø§Ù„Ø«Ø§Ù†ÙŠ<br />Ù…Ø¨Ù†Ù‰ 4ØŒ Ù…Ø¯ÙŠÙ†Ø© Ø¯Ø¨ÙŠ Ù„Ù„Ø§Ø¹Ù„Ø§Ù…<br />Ø¯Ø¨ÙŠØŒ Ø§Ù„Ø§Ù…Ø§Ø±Ø§Øª Ø§Ù„Ø¹Ø±Ø¨ÙŠØ© Ø§Ù„Ù…ØªØ­Ø¯Ø©";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+971 4 369 9750<br />siegelgale.com"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.com"; }
	}
	
	if (document.forms['customizer'].menu_city.value == "London")
	{
		document.getElementById("div_city_address").innerHTML = "Bankside 2, 1st Fl<br />100 Southwark St<br />London SE1 0SW";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+44 (0)20 8618 1950<br />siegelgale.com"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.com"; }
	}
	
	if (document.forms['customizer'].menu_city.value == "LosAngeles")
	{
		document.getElementById("div_city_address").innerHTML = "5353 Grosvenor Blvd<br />Los Angeles, CA 90066";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+1 310 312 2200<br />siegelgale.com"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.com"; }
	}
	
	if (document.forms['customizer'].menu_city.value == "NewYork")
	{
		document.getElementById("div_city_address").innerHTML = "195 Broadway<br />7th Floor<br />New York, NY 10007";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+1 212 453 0400<br />siegelgale.com"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.com"; }
	}
	
	if (document.forms['customizer'].menu_city.value == "SanFrancisco")
	{
		document.getElementById("div_city_address").innerHTML = "600 California St<br />8th Floor<br />San Francisco, CA 94108";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+1 415 955 1250<br />siegelgale.com"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.com"; }
	}
	
	if (document.forms['customizer'].menu_city.value == "Shanghai")
	{
		document.getElementById("div_city_address").innerHTML = "1788 Nanjing West Rd, 11/F<br />Jing'an District<br />Shanghai 200040<br />China";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+86 186 2158 6455<br />siegelgale.cn"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.cn"; }
	}
	
	if (document.forms['customizer'].menu_city.value == "ShanghaiChinese")
	{
		document.getElementById("div_city_address").innerHTML = "æ€ç¿é«˜å“ç‰Œæˆ˜ç•¥å’¨è¯¢å…¬å¸<br />ä¸Šæµ·å¸‚é™å®‰åŒºå—äº¬è¥¿è·¯1788å·11<br />æ¥¼ 200040";
		if (((document.forms['customizer'].menu_printing.value == "BlankGeneric") || (document.forms['customizer'].menu_printing.value == "PreprintedGeneric")) && (document.forms['customizer'].menu_type.value != "Label")) { document.getElementById("div_city_phone").innerHTML = "+86 186 2158 6455<br />siegelgale.cn"; }
		if ((document.forms['customizer'].menu_printing.value == "BlankPersonalized") || (document.forms['customizer'].menu_printing.value == "PreprintedPersonalized")) { document.getElementById("div_city_phone").innerHTML = "siegelgale.cn"; }
	}
}

// FORMAT PHONE NUMBERS

function formatPhone(obj)
{
	if ((document.forms['customizer'].menu_city.value == "LosAngeles") || (document.forms['customizer'].menu_city.value == "NewYork") || (document.forms['customizer'].menu_city.value == "NewYork"))
	{
		if ((obj.value != "+0 000 000 0000") && (obj.value != "+1 000 000 0000") && (obj.value != ""))
		{
			justNumbers = obj.value.replace(/\D/g, ''); // Just leave numbers
    		patternUS = {0:'+',1:' ',4:' ',7:' ',11:' x'}; // Pattern to format US numbers - Character position : What to add before
    		
    		if (justNumbers == "") { obj.value = ""; return; }
			
			if (justNumbers.substring(0,1) != "1") { justNumbers = "1" + justNumbers; } // Add "1" at start if needed
			
    		obj.value = '';
    		for (var i = 0; i < justNumbers.length; i++)
    		{
        		obj.value += (patternUS[i]||'') + justNumbers[i];
    		}
    	}
    }
    else
    {
    	if ((obj.value != "+0 000 000 0000") && (obj.value != "+1 000 000 0000") && (obj.value != ""))
		{
			obj.value = obj.value.replace(/-/g, ' '); // Replace all dashes with spaces
			obj.value = obj.value.replace(/\./g, ' '); // Replace dots with spaces		
			obj.value = obj.value.replace(/\s\s+/g, ' '); // Replace multiple spaces with single space
			obj.value = obj.value.trim(); // Trim leading and trailing spaces
			if (obj.value.substring(0,1) != "+") { obj.value = "+" + obj.value; } // Add + if needed
		}
    }
}

// FORMAT TWITTER

function formatTwitter(obj)
{
	obj.value = obj.value.replace(/\s+/g, ''); // Strip spaces
	if ((obj.value != "") && (obj.value.substring(0,1) != "@")) { obj.value = "@" + obj.value; } // Add "@" at start if needed
}

// DISPLAY DOWNLOAD INSTRUCIONS

function displayHelp(opt)
{
	if (document.forms['customizer'].passedErrorCheck.value=="yes")
	{
		document.getElementById("div_download_instructions").innerHTML = '<span style="color: #DA291C;"><strong>Where\'s my download?</strong></span><br />After clicking the Create/Download button, it may take a few seconds to create your template. Depending on your browser settings, you may then be prompted to select where to save your template, or it may be saved automatically to your default download location. If you cannot find your template, check your default download location. Your default download location can be changed in your browser settings.<br /><br /><a href="javascript:displayHelp(\'toggle\');"><span style="color: #7F7F7F; font-size: 10px;">Close</a>';
	}
	else
	{
		document.getElementById("div_download_instructions").innerHTML = '<span style="color: #DA291C;"><strong>Fill out the form completely</strong></span><br />Once all required information has been entered in the form above, the Create/Download button will become active (red) and you can then download your template.<br /><br /><span style="color: #DA291C;"><strong>Where\'s my download?</strong></span><br />After clicking the Create/Download button, it may take a few seconds to create your template. Depending on your browser settings, you may then be prompted to select where to save your template, or it may be saved automatically to your default download location. If you cannot find your template, check your default download location. Your default download location can be changed in your browser settings.<br /><br /><a href="javascript:displayHelp(\'toggle\');"><span style="color: #7F7F7F; font-size: 10px;">Close</a>';
	}
	
	if ((opt == "toggle") && (document.getElementById("div_download_instructions").style.display == ""))
	{
		document.getElementById("div_display_download_instructions").style.display = "";
		document.getElementById("div_download_instructions").style.display = "none";
	}
	else
	{
		document.getElementById("div_display_download_instructions").style.display = "none";
		document.getElementById("div_download_instructions").style.display = "";
	}
}