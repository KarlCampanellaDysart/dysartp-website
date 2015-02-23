Type.registerNamespace("TSC.Timeout");


// Define the control class and properties.
TSC.Timeout.Timeout = function(element) {
    TSC.Timeout.Timeout.initializeBase(this, [element]);
    // class properties
    this._timeoutMinutes = null;
    this._aboutToTimeoutMinutes = null;
    this._timeoutURL = null;
    this._clientId = null;
    this._btnClientId = null;
    this._timerTimeout = null;
    this._timerAboutToTimeout = null;
    this._displayButton = null;
    this._dirtyFormSpanID = null;
    this._timerCountDown = null;
    this._countDownSeconds = null;
    this._countDownSpanID = null;
    this._resetSessionOnAsyncPostback = null;
}

//// Create the prototype for the control.//
TSC.Timeout.Timeout.prototype =
{
    initialize: function() {
        TSC.Timeout.Timeout.callBaseMethod(this, 'initialize');

        // async postback support to reset session
        if (this._resetSessionOnAsyncPostback)
            Sys.Application.add_load(Function.createDelegate(this, this._handlePageLoaded));
        else
            this._resetTimeout();

        // respect displayButton
        if (this._displayButton) {
            this._onclickHandler = Function.createDelegate(this, this._onClick);
            $addHandler($get(this._btnClientId), "click", this._onClick);
        }
        else if (typeof jQuery.ui == 'undefined') {   // if no jquery ui, clicking div will reset - otherwise must click jquery ui modal button
            this._onclickHandler = Function.createDelegate(this, this._onClick);
            $addHandler($get(this._clientId), "click", this._onClick);
        }

        this.initDialog();
    },

    //Dispose Method
    dispose: function() {
        $clearHandlers(this.get_element());
        TSC.Timeout.Timeout.callBaseMethod(this, 'dispose');
    },

    get_timeoutMinutes: function() {
        return this._timeoutMinutes;
    },

    set_timeoutMinutes: function(value) {
        if (this._timeoutMinutes !== value) {
            this._timeoutMinutes = value;
            this.raisePropertyChanged('timeoutMinutes');
        }
    },

    get_aboutToTimeoutMinutes: function() {
        return this._aboutToTimeoutMinutes;
    },

    set_aboutToTimeoutMinutes: function(value) {
        if (this._aboutToTimeoutMinutes !== value) {
            this._aboutToTimeoutMinutes = value;
            this.raisePropertyChanged('aboutToTimeoutMinutes');
        }
    },

    get_timeoutURL: function() {
        return this._timeoutURL;
    },

    set_timeoutURL: function(value) {
        if (this._timeoutURL !== value) {
            this._timeoutURL = value;
            this.raisePropertyChanged('timeoutURL');
        }
    },

    get_clientId: function() {
        return this._clientId;
    },

    set_clientId: function(value) {
        if (this._clientId !== value) {
            this._clientId = value;
            this.raisePropertyChanged('clientId');
        }
    },

    get_btnClientId: function() {
        return this._btnClientId;
    },

    set_btnClientId: function(value) {
        if (this._btnClientId !== value) {
            this._btnClientId = value;
            this.raisePropertyChanged('btnClientId');
        }
    },

    get_displayButton: function() {
        return this._displayButton;
    },

    set_displayButton: function(value) {
        if (this._displayButton !== value) {
            this._displayButton = value;
            this.raisePropertyChanged('displayButton');
        }
    },

    get_dirtyFormSpanID: function() {
        return this._dirtyFormSpanID;
    },

    set_dirtyFormSpanID: function(value) {
        if (this._dirtyFormSpanID !== value) {
            this._dirtyFormSpanID = value;
            this.raisePropertyChanged('dirtyFormSpanID');
        }
    },

    get_countDownSpanID: function() {
        return this._countDownSpanID;
    },

    set_countDownSpanID: function(value) {
        if (this._countDownSpanID !== value) {
            this._countDownSpanID = value;
            this.raisePropertyChanged('countDownSpanID');
        }
    },

    get_resetSessionOnAsyncPostback: function() {
        return this.resetSessionOnAsyncPostback;
    },

    set_resetSessionOnAsyncPostback: function(value) {
        if (this._resetSessionOnAsyncPostback !== value) {
            this._resetSessionOnAsyncPostback = value;
            this.raisePropertyChanged('resetSessionOnAsyncPostback');
        }
    },

    _resetTimeout: function(e) {
        // modify timeout to do jquery dialog
        if (typeof jQuery.ui == 'undefined')
            $get(this._clientId).style.display = 'none';

        clearTimeout(this._timerAboutToTimeout);
        clearTimeout(this._timerTimeout);
        clearTimeout(this._timerCountDown);

        this._showAboutToTimeoutDelegate = Function.createDelegate(this, this.showAboutToTimeout);
        this._timerAboutToTimeout = setTimeout(this._showAboutToTimeoutDelegate, this._aboutToTimeoutMinutes * 60 * 1000);
        this._timeoutDelegate = Function.createDelegate(this, this.timeout);
        this._timerTimeout = setTimeout(this._timeoutDelegate, this._timeoutMinutes * 60 * 1000);
    },

    // this is essentially the default dialog if not overriden
    initDialog: function(e) {
        // modify timeout to do jquery dialog
        if (typeof jQuery.ui != 'undefined') {
            var tsc = this;
            $("#" + this._clientId).dialog({
                autoOpen: false,
                bgiframe: true,
                modal: true,
                buttons: {
                    Ok: function() {
                        $(this).dialog('close');
                        CallServer();
                        tsc._resetTimeout();
                    }
                }
            });
        }
    },

    countDown: function(e) {
        var secs = this._countDownSeconds % 60;
        $get(this._countDownSpanID).innerHTML = (parseInt(this._countDownSeconds / 60)) + ':' + ((secs < 10) ? '0' + secs : secs);
        this._countDownSeconds -= 1;
        this._timerCountDown = setTimeout(this._countDownDelegate, 1000);
    },

    showAboutToTimeout: function(e) {
        // add countdown support
        if (this._countDownSpanID.length > 0) {
            this._countDownSeconds = ((this._timeoutMinutes - this._aboutToTimeoutMinutes) * 60) - 1;
            $get(this._countDownSpanID).innerHTML = (this._timeoutMinutes - this._aboutToTimeoutMinutes) + ':00';
            this._countDownDelegate = Function.createDelegate(this, this.countDown);
            this._timerCountDown = setTimeout(this._countDownDelegate, 1000);
        }
        // modify timeout to do jquery dialog
        if (typeof jQuery.ui != 'undefined')
            $("#" + this._clientId).dialog('open');
        else {
            $get(this._clientId).style.display = 'block';
            ScrollToElement($get(this._clientId));
        }
        window.focus();
    },

    timeout: function(e) {
        if (this._timeoutURL.length > 0) {
            // disable dirtyForm warning
            if (this._dirtyFormSpanID.length > 0)
                $get(this._dirtyFormSpanID).innerHTML = 'false';
            window.location = this._timeoutURL;
        }
    },

    // async postback support
    _handlePageLoaded: function(sender, e) {
        this._resetTimeout();
    },

    // Event delegates
    _onClick: function(e) {
        CallServer();
        if (this.tagName == 'INPUT')
            this.parentNode.control._resetTimeout();
        else
            this.control._resetTimeout();
    }
}

TSC.Timeout.Timeout.registerClass('TSC.Timeout.Timeout', Sys.UI.Control); 

if (typeof(Sys) !== 'undefined') 
     Sys.Application.notifyScriptLoaded();


function ScrollToElement(theElement)
{
  var selectedPosX = 0;
  var selectedPosY = 0;
              
  while(theElement != null)
  {
    selectedPosX += theElement.offsetLeft;
    selectedPosY += theElement.offsetTop;
    theElement = theElement.offsetParent;
  }
                        		      
 window.scrollTo(selectedPosX,selectedPosY);
}


function ReceiveServerData(rValue) { }
