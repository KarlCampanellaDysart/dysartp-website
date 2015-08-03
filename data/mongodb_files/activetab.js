//Determine which tab is presently open in nav menu
var url = location.pathname;
if (url.indexOf("campaigns") != -1) {
    document.getElementById("campaigns").className = "on";
}
else if (url.indexOf("jobs") != -1) {
    document.getElementById("jobs").className = "on";
}
else if (url.indexOf("contacts") != -1) {
    document.getElementById("contacts").className = "on";
}
else if (url.indexOf("companies") != -1) {
    document.getElementById("companies").className = "on";
}
else if (url.indexOf("documents") != -1) {
    document.getElementById("documents").className = "on";
}
else if (url.indexOf("calendar") != -1) {
    document.getElementById("calendar").className = "on";
}
else if (url.indexOf("MyAccount") != -1) {
    document.getElementById("myaccountlink").className = "active";
}
else if (url.indexOf("support") != -1) {
    document.getElementById("supportlink").className = "active";
}

//Determines which link is open in sub nav
var url = location.pathname;

//Jobs
if (url.indexOf("jobs/manage") != -1) {
    document.getElementById("ctl00_innernavmenu1_hlJobManage").className = "active";
}
else if (url.indexOf("jobs/search") != -1) {
    document.getElementById("ctl00_innernavmenu1_hlJobSearch").className = "active";
}
else if (url.indexOf("jobs/saved_searches") != -1) {
    document.getElementById("ctl00_innernavmenu1_hlJobSave").className = "active";
}
//else if (url.indexOf("*return=true") != -1) {
//    document.getElementById("ctl00_innernavmenu1_hlJobLast").className = "active";
//}

//Contacts
if (url.indexOf("contacts/manage") != -1) {
    document.getElementById("contact_manage").className = "active";
}
else if (url.indexOf("contacts/search") != -1) {
    document.getElementById("contact_search").className = "active";
}
else if (url.indexOf("contacts/import") != -1) {
    document.getElementById("contact_import").className = "active";
}
else if (url.indexOf("contacts/export") != -1) {
    document.getElementById("contact_export").className = "active";
}
else if (url.indexOf("contacts/saved_searches") != -1) {
    document.getElementById("contact_save").className = "active";
}
//Companies
if (url.indexOf("companies/manage") != -1) {
    document.getElementById("company_manage").className = "active";
}
else if (url.indexOf("companies/search") != -1) {
    document.getElementById("company_search").className = "active";
}
else if (url.indexOf("companies/saved_searches") != -1) {
    document.getElementById("company_save").className = "active";
}
//Documents
if (url.indexOf("documents/manage") != -1) {
    document.getElementById("ctl00_innernavmenu1_hlDocManage").className = "active";
}
else if (url.indexOf("documents/create") != -1) {
    document.getElementById("ctl00_innernavmenu1_hlDocCreate").className = "active";
}
else if (url.indexOf("documents/upload") != -1) {
    document.getElementById("ctl00_innernavmenu1_hlDocUpload").className = "active";
}
else if (url.indexOf("documents/wizard") != -1) {
    document.getElementById("ctl00_innernavmenu1_hlDocWizard").className = "active";
}
//Campaigns
if (url.indexOf("campaigns/manage") != -1) {
    document.getElementById("campaign_manage").className = "active";
}
else if (url.indexOf("campaigns/create") != -1) {
    document.getElementById("campaign_create").className = "active";
}
else if (url.indexOf("campaigns/send") != -1) {
    document.getElementById("campaign_manage").className = "active";
}
//else if (url.indexOf("campaigns/send") != -1) {
    //document.getElementById("campaign_send").className = "active";
//}

//Calendar
if (url.indexOf("calendar/calendar") != -1) {
    document.getElementById("calendar_manage").className = "active";
}
else if (url.indexOf("calendar/create") != -1) {
    document.getElementById("calendar_create").className = "active";
}
else if (url.indexOf("calendar/settings") != -1) {
    document.getElementById("calendar_settings").className = "active";
}

//Remove dotted line around top nav tabs
var links = document.getElementById('divNav').getElementsByTagName('a');
for (var i = 0; i < links.length; i++) {
    links[i].onmousedown = function() {
        this.blur();
        return false;
    }
    links[i].onclick = function() {
        this.blur();
    }
    if (/msie/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent)) {
        links[i].onfocus = function() {
            this.blur();
        }
    }
}





