console.log("i'm working!");

var productIdentifier = "trcdv1";

$(document).ready(function(){
  var $els = {
 	body: $("body"),
 	sidebarToggle: $(".sidebar-toggle")
  }

  //autorun on all pages

	var sidebar = {

		key: productIdentifier + 'SidebarOpen',

		canHas: false,

		toggleState: function(){
			var current = localStorage[this.key];
			if( current === "open"){
				localStorage[this.key] = "closed";
				$els.body.addClass("-js-sidebar-closed");
				console.log(localStorage[this.key]);
			}
			else if( current === "closed"){
				localStorage[this.key] = "open";
				$els.body.removeClass("-js-sidebar-closed");
				console.log(localStorage[this.key]);
			}
			else{
				console.log("sidebar.setState only accepts 'open' or 'closed' as options");
			}
		},
		setStateTrue: function(){
			localStorage[this.key] = 'open';
			$els.body.removeClass("-js-sidebar-closed");
		},
		setStateFalse: function(){
			localStorage[this.key] = 'closed';
			$els.body.addClass("-js-sidebar-closed");
		},

		getState: function(){
			return localStorage[this.key];
		},
		init: function(){
			if (window.localStorage) { // checks if browser support localStorage
				this.canHas = true;
				
				if (localStorage[this.key]) { // checks if value exists
					var setAs = this.getState();
					if (setAs ==='closed') {
						this.setStateFalse();
					}
				}
				else{
					this.setStateTrue();
				}
			}
			//if there is no localStorage we can't save state so may as well hide the close option
			else {
				$els.sidebarToggle.hide();
				console.log("localStorage is not supported");
			}

		}
	}

	sidebar.init(); 

  //interactions all pages
  $els.sidebarToggle.on("click keydown", function(e){
  	if (e.type ==='click' || e.type ==='keydown' && e.which == 13) {
	  	sidebar.toggleState(); 

  	}
  })



});