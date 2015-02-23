//<![CDATA[
//show the modal window
function showDialog() {
    //Force reload in order to guarantee that the onload event handler
    // of the dialog which configures it executes on every show./// <reference path="../controls/SavePopup.aspx" />

    var oWnd = window.radopen("/controls/SavePopup.aspx", "DialogWindow");
}

// Called when a window is being closed.  (force refresh)
function onClientClose(radWindow) {
    window.location.href = window.location.href;
}
//]]>