var RegStatsView = Backbone.View.extend({
	template: _.template($('#RegStatsTemplate').html()),
	el: "#reg-stats",

	initialize: function() {
		this.render();
	},

	render: function() {
		$('#reg-stats').html(this.template({regTotal: regTotal}));
	}

});

var regStatsView = new RegStatsView();


var TicketStatsView = Backbone.View.extend({
	template: _.template($('#TicketStatsTemplate').html()),
	el: "#ticket-stats",

	initialize: function() {
		this.render();
	},

	render: function() {
		$('#ticket-stats').html(this.template({ticketSubmitTotal: ticketSubmitTotal, ticketAnswerTotal: ticketAnswerTotal}));
	}

});

var ticketStatsView = new TicketStatsView();

