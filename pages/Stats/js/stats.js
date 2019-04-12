
Date.prototype.daysInMonth = function(month) {
	return 33 - new Date(this.getFullYear(), month, 33).getDate();
};
var training_var = {};
training_var.workout = {};

training_var.workout.corsi = {}
training_var.workout.corsi.attempts = 0;

training_var.workout.math = {}
training_var.workout.math.attempts = 0;

training_var.workout.fastest = {}
training_var.workout.fastest.attempts = 0;

training_var.workout.nback = {}
training_var.workout.nback.attempts = 0;

training_var.workout.cwm = {}
training_var.workout.cwm.attempts = 0;

/*
var nex_game;
training_var.corsi_raund = function()
{
		//localStorage.setItem('corsi_raund', Number(localStorage.getItem('corsi_raund'))+1);
		//localStorage.setItem('corsi_raund', 0);
		nex_game = 'game/mental math/game.html';
		$('.train_ifarme>iframe').attr('src', nex_game);
		$('.train_corsi').removeClass('train_active');
		$('.train_math').addClass('train_active');
}

training_var.math_raund = function()
{
	nex_game = 'game/fastest/game.html';
	$('.train_ifarme>iframe').attr('src', nex_game);
	$('.train_math').removeClass('train_active');
	$('.train_fastest').addClass('train_active');
}

training_var.fastest_raund = function()
{
	nex_game = 'game/dual n-back/game.html';
	$('.train_ifarme>iframe').attr('src', nex_game);
	$('.train_fastest').removeClass('train_active');
	$('.train_nback').addClass('train_active');
}*/

var months=new Array(12);
months[0]=parent.window._t("Jan.");
months[1]=parent.window._t("Feb.");
months[2]=parent.window._t("Mar.");
months[3]=parent.window._t("Apr.");
months[4]=parent.window._t("May");
months[5]=parent.window._t("June");
months[6]=parent.window._t("July");
months[7]=parent.window._t("Aug.");
months[8]=parent.window._t("Sept.");
months[9]=parent.window._t("Oct.");
months[10]=parent.window._t("Nov.");
months[11]=parent.window._t("Dec.");
var months_fool=new Array(12);
months_fool[0]="January";
months_fool[1]="February";
months_fool[2]="March";
months_fool[3]="April";
months_fool[4]="May";
months_fool[5]="June";
months_fool[6]="July";
months_fool[7]="August";
months_fool[8]="September";
months_fool[9]="October";
months_fool[10]="November";
months_fool[11]="December";

var time=new Date();
var thismonth=months[time.getMonth() + 1];
var date=time.getDate();
var thisyear=time.getFullYear();

	training_var.workout.curent_day = date;
	training_var.workout.curent_month = time.getMonth();
	training_var.workout.curent_thismonth = months[training_var.workout.curent_month];

	Chart.defaults.global.pointHitDetectionRadius = 1;
	Chart.defaults.global.defaultFontColor = 'white';
	Chart.defaults.global.defaultFontSize = 20;
	Chart.defaults.global.defaultFontFamily = "'IgraSans'";
	var customTooltips = function(tooltip) {
		// Tooltip Element
		var tooltipEl = document.getElementById('chartjs-tooltip');

		if (!tooltipEl) {
			tooltipEl = document.createElement('div');
			tooltipEl.id = 'chartjs-tooltip';
			tooltipEl.innerHTML = '<table></table>';
			this._chart.canvas.parentNode.appendChild(tooltipEl);
		}

		// Hide if no tooltip
		if (tooltip.opacity === 0) {
			tooltipEl.style.opacity = 0;
			return;
		}

		// Set caret Position
		tooltipEl.classList.remove('above', 'below', 'no-transform');
		if (tooltip.yAlign) {
			tooltipEl.classList.add(tooltip.yAlign);
		} else {
			tooltipEl.classList.add('no-transform');
		}

		function getBody(bodyItem) {
			return bodyItem.lines;
		}

		// Set Text
		if (tooltip.body) {
			var titleLines = tooltip.title || [];
			var bodyLines = tooltip.body.map(getBody);

			var innerHtml = '<thead>';

			titleLines.forEach(function(title) {
				innerHtml += '<tr><th>' + title + '</th></tr>';
			});
			innerHtml += '</thead><tbody>';

			bodyLines.forEach(function(body, i) {
				var colors = tooltip.labelColors[i];
				var style = 'background:' + colors.backgroundColor;
				style += '; border-color:' + colors.borderColor;
				style += '; border-width: 2px';
				var span = '<span class="chartjs-tooltip-key" style="' + style + '"></span>';
				innerHtml += '<tr><td>' + span + body + '</td></tr>';
			});
			innerHtml += '</tbody>';

			var tableRoot = tooltipEl.querySelector('table');
			tableRoot.innerHTML = innerHtml;
		}

		var positionY = this._chart.canvas.offsetTop;
		var positionX = this._chart.canvas.offsetLeft;

		// Display, position, and set styles for font
		tooltipEl.style.opacity = 1;
		tooltipEl.style.left = positionX + tooltip.caretX + 'px';
		tooltipEl.style.top = positionY + tooltip.caretY + 'px';
		tooltipEl.style.fontFamily = tooltip._bodyFontFamily;
		tooltipEl.style.fontSize = tooltip.bodyFontSize + 'px';
		tooltipEl.style.fontStyle = tooltip._bodyFontStyle;
		tooltipEl.style.padding = tooltip.yPadding + 'px ' + tooltip.xPadding + 'px';
	};
	var labels_days = 7;


	var lineChartData = {
		labels: (function()
			{
				var days = new Array();
				for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
				{
					days.push(i+" "+months[training_var.workout.curent_month]);
				}	
				return days;			
			})(),
		datasets: [{
			label: 'Meteor Rain',
			borderColor: window.chartColors.red,
			pointBackgroundColor: window.chartColors.red,
			fill: false,
			data: (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_meteor_rain_score"+i+"/"+training_var.workout.curent_month))
						{
							days.push(localStorage.getItem("stats_meteor_rain_score"+i+"/"+training_var.workout.curent_month));
							last_day = localStorage.getItem("stats_meteor_rain_score"+i+"/"+training_var.workout.curent_month);
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})()
		}, {
			label: 'Starships',
			borderColor: window.chartColors.blue,
			pointBackgroundColor: window.chartColors.blue,
			fill: false,
			data: (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_starships_level"+i+"/"+training_var.workout.curent_month))
						{
							days.push(localStorage.getItem("stats_starships_level"+i+"/"+training_var.workout.curent_month));
							last_day = localStorage.getItem("stats_starships_level"+i+"/"+training_var.workout.curent_month);
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})()
		},{
			label: 'Fueling',
			borderColor: window.chartColors.orange,
			pointBackgroundColor: window.chartColors.orange,
			fill: false,
			data: (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_fueling_level"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_fueling_level"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_fueling_level"+i+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})()
		},{
			label: 'Cube Match',
			borderColor: window.chartColors.yellow,
			pointBackgroundColor: window.chartColors.yellow,
			fill: false,
			data: (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_сube_match_score"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_сube_match_score"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_сube_match_score"+i+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
							
						}
						
					}	
					return days;
										
				})()
			},{
			label: 'Orientation',
			borderColor: window.chartColors.green,
			pointBackgroundColor: window.chartColors.green,
			fill: false,
			data: (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_orientation_score"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_orientation_score"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(Math.floor(localStorage.getItem("stats_orientation_score"+i+"/"+training_var.workout.curent_month)));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
							
						}
						
					}	
					return days;
										
				})()
			},{
			label: 'Observation Speed',
			borderColor: window.chartColors.purple,
			pointBackgroundColor: window.chartColors.purple,
			fill: false,
			data: (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_observation_speed_level"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_observation_speed_level"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(Math.floor(localStorage.getItem("stats_observation_speed_level"+i+"/"+training_var.workout.curent_month)));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
							
						}
						
					}	
					return days;
										
				})()
			},{
			label: 'Very Sharp Eye',
			borderColor: window.chartColors.grey,
			pointBackgroundColor: window.chartColors.grey,
			fill: false,
			data: (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_very_sharp_eye_level"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_very_sharp_eye_level"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(Math.floor(localStorage.getItem("stats_very_sharp_eye_level"+i+"/"+training_var.workout.curent_month)));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
							
						}
						
					}	
					return days;
										
				})()
			},{
			label: 'Direction',
			borderColor: window.chartColors.pink,
			pointBackgroundColor: window.chartColors.pink,
			fill: false,
			data: (function()
				{

					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_direction_score"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_direction_score"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(Math.floor(localStorage.getItem("stats_direction_score"+i+"/"+training_var.workout.curent_month)));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
							
						}
						
					}	
					return days;
										
				})()
			},{
			label: 'Lost Starships',
			borderColor: window.chartColors.brown,
			pointBackgroundColor: window.chartColors.brown,
			fill: false,
			data: (function()
				{

					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_lost_starships_level"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_lost_starships_level"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(Math.floor(localStorage.getItem("stats_lost_starships_level"+i+"/"+training_var.workout.curent_month)));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
							
						}
						
					}	
					return days;
										
				})()
			},{
			label: 'Musical Planets',
			borderColor: window.chartColors.greenb,
			pointBackgroundColor: window.chartColors.greenb,
			fill: false,
			data: (function()
				{

					var days = new Array();
					var last_day = 0;
					for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
					{
						if(localStorage.getItem("stats_musical_planets_level"+i+"/"+training_var.workout.curent_month))
						{
							days.push(Math.floor(localStorage.getItem("stats_musical_planets_level"+i+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(Math.floor(localStorage.getItem("stats_musical_planets_level"+i+"/"+training_var.workout.curent_month)));
						}
						else
						{
							if(i<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
							
						}
						
					}	
					return days;
										
				})()
			}
		]
	};
		function update_stats()
		{
			var chartEl = document.getElementById('myChart');
			window.myLine = new Chart(chartEl, {
				type: 'line',
				data: lineChartData,
				options: {
					title: {
						display: true,
						text: parent.window._t("Stats")
					},
					scales: {
			        	xAxes: [{
				          	gridLines: {
			            		color: '#ebedec50'
				            }
			          }],
						yAxes: [{
			              	gridLines: {
			            		color: '#ebedec50'
			                }
						}]
					},
					tooltips: {
						enabled: false,
						mode: 'index',
						position: 'nearest',
						custom: customTooltips
					}
				}
			});			
		}
		
	window.onload = function() {
		update_stats();
	};
training_var.chart_rezet_result_info = function()
{

	var days = new Array();
	for(var i=1;i<time.daysInMonth(training_var.workout.curent_month)+1; i++)
	{
		days.push(i+" "+months[training_var.workout.curent_month]);
	}
	
	window.myLine.data.labels = days;

	for(var i=0;i<window.myLine.data.datasets.length; i++)
	{
		if(window.myLine.data.datasets[i].label == 'Meteor Rain')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_meteor_rain_score"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(localStorage.getItem("stats_meteor_rain_score"+x+"/"+training_var.workout.curent_month));
							last_day = localStorage.getItem("stats_meteor_rain_score"+x+"/"+training_var.workout.curent_month);
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Starships')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_starships_level"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(localStorage.getItem("stats_starships_level"+x+"/"+training_var.workout.curent_month));
							last_day = localStorage.getItem("stats_starships_level"+x+"/"+training_var.workout.curent_month);
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Fueling')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_fueling_level"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(localStorage.getItem("stats_fueling_level"+x+"/"+training_var.workout.curent_month));
							last_day = localStorage.getItem("stats_fueling_level"+x+"/"+training_var.workout.curent_month);
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Cube Match')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_сube_match_score"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(localStorage.getItem("stats_сube_match_score"+x+"/"+training_var.workout.curent_month));
							last_day = localStorage.getItem("stats_сube_match_score"+x+"/"+training_var.workout.curent_month);
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Orientation')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_orientation_score"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(Math.floor(localStorage.getItem("stats_orientation_score"+x+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_orientation_score"+x+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Observation Speed')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_observation_speed_level"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(Math.floor(localStorage.getItem("stats_observation_speed_level"+x+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_observation_speed_level"+x+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Very Sharp Eye')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_very_sharp_eye_level"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(Math.floor(localStorage.getItem("stats_very_sharp_eye_level"+x+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_very_sharp_eye_level"+x+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Lost Starships')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_lost_starships_level"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(Math.floor(localStorage.getItem("stats_lost_starships_level"+x+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_lost_starships_level"+x+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Direction')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_direction_score"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(Math.floor(localStorage.getItem("stats_direction_score"+x+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_direction_score"+x+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
		if(window.myLine.data.datasets[i].label == 'Musical Planets')
		{

			window.myLine.data.datasets[i].data = (function()
				{
					var days = new Array();
					var last_day = 0;
					for(var x=1;x<time.daysInMonth(training_var.workout.curent_month)+1; x++)
					{
						if(localStorage.getItem("stats_musical_planets_level"+x+"/"+training_var.workout.curent_month))
						{
							
							days.push(Math.floor(localStorage.getItem("stats_musical_planets_level"+x+"/"+training_var.workout.curent_month)));
							last_day = Math.floor(localStorage.getItem("stats_musical_planets_level"+x+"/"+training_var.workout.curent_month));
						}
						else
						{
							if(x<date+1 || training_var.workout.curent_month < time.getMonth())
							{
								days.push(last_day);
							}
							else
							{
								if(time.getMonth() != training_var.workout.curent_month)
								{
									days.push(last_day);
								}
							}
						}
						
					}	
					return days;
										
				})();
		}
	}

    window.myLine.update();

}

$("#month_train").change(function () {
	for(var i = 0; months_fool.length > i; i++)
	{		
		var month = $(this).val().split('"')[1].split('"')[0];

		if(months_fool[i] == month)
		{
			training_var.workout.curent_month = i;
			training_var.workout.curent_thismonth = months[training_var.workout.curent_month];
			training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
		}
	}


    training_var.chart_rezet_result_info();

  });
$("#slide_train_day_left").click(function(e)
{
	if((training_var.workout.curent_day-1)>0)
	{
		training_var.workout.curent_day--;
	}
	else
	{
		training_var.workout.curent_day = time.daysInMonth(training_var.workout.curent_month-1);
		if(training_var.workout.curent_month>0)
		{
			training_var.workout.curent_month--;
		}
		else
		{
			training_var.workout.curent_month = 0;
		}
		training_var.chart_rezet_result_info();
	}
	training_var.workout.curent_thismonth = months[training_var.workout.curent_month];
	training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
});	
$("#slide_train_day_right").click(function(e)
{
	if((training_var.workout.curent_day+1)<(time.daysInMonth(training_var.workout.curent_month))+1)
	{
		training_var.workout.curent_day++;
	}
	else
	{
		training_var.workout.curent_day = 1;
		if(training_var.workout.curent_month<11)
		{
			training_var.workout.curent_month++;
		}
		else
		{
			training_var.workout.curent_month = 0;
		}
		training_var.chart_rezet_result_info();
	}
	training_var.workout.curent_thismonth = months[training_var.workout.curent_month];
	training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
});	
training_var.rezet_result_info = function(curent_day, curent_month, curent_thismonth)
{
	$("#month_train").val("document.write(parent.window._t(\""+months_fool[curent_month]+"\"));"+parent.window._t(months_fool[curent_month]));
	$('ul>li.current_day>div>span:nth-child(1)').html(training_var.workout.curent_day+'</br>');
	$('ul>li.current_day>div>span:nth-child(2)').html(training_var.workout.curent_thismonth);
	training_var.rezet_result_info_train(training_var.workout.curent_day, training_var.workout.curent_month);
	if((curent_day-2)>0)
	{
		$('ul>li.train_day:nth-child(1)>div>span:nth-child(1)').html((curent_day-2)+'</br>');
		$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(curent_thismonth);		
	}
	else
	{
		if(curent_day == 1)
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(1)').html(time.daysInMonth(curent_month-1)-1+'</br>');
		}
		else
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(1)').html(time.daysInMonth(curent_month-1)+'</br>');
		}
		$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(months[curent_month]);
		if(curent_month>0)
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(months[curent_month-1]);			
		}
		else
		{
			$('ul>li.train_day:nth-child(1)>div>span:nth-child(2)').html(months[11]);
		}
	}
	
	if((curent_day-1)>0)
	{
		$('ul>li.train_day:nth-child(2)>div>span:nth-child(1)').html((curent_day-1)+'</br>');
		$('ul>li.train_day:nth-child(2)>div>span:nth-child(2)').html(curent_thismonth);	
	}
	else
	{
		$('ul>li.train_day:nth-child(2)>div>span:nth-child(1)').html(time.daysInMonth(curent_month-1)+'</br>');
		if(curent_month>0)
		{
			$('ul>li.train_day:nth-child(2)>div>span:nth-child(2)').html(months[curent_month-1]);			
		}
		else
		{
			$('ul>li.train_day:nth-child(2)>div>span:nth-child(2)').html(months[11]);
		}
			
	}
	
	if((curent_day+1)<(time.daysInMonth(curent_month)+1))
	{
		$('ul>li.train_day:nth-child(4)>div>span:nth-child(1)').html((curent_day+1)+'</br>');
		$('ul>li.train_day:nth-child(4)>div>span:nth-child(2)').html(curent_thismonth);	
	}
	else
	{
		$('ul>li.train_day:nth-child(4)>div>span:nth-child(1)').html(1+'</br>');
		if(curent_month<11)
		{
			$('ul>li.train_day:nth-child(4)>div>span:nth-child(2)').html(months[curent_month+1]);			
		}
		else
		{
			$('ul>li.train_day:nth-child(4)>div>span:nth-child(2)').html(months[0]);
		}		
	}
	
	if((curent_day+2)<(time.daysInMonth(curent_month)+1))
	{
		$('ul>li.train_day:nth-child(5)>div>span:nth-child(1)').html((curent_day+2)+'</br>');
		$('ul>li.train_day:nth-child(5)>div>span:nth-child(2)').html(curent_thismonth);	
	}
	else
	{
		if(time.daysInMonth(curent_month) == curent_day)
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(1)').html(2+'</br>');
		}
		else
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(1)').html(1+'</br>');
		}
			
		if(curent_month<11)
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(2)').html(months[curent_month+1]);				
		}
		else
		{
			$('ul>li.train_day:nth-child(5)>div>span:nth-child(2)').html(months[0]);
		}		
	}
}
training_var.rezet_result_info_train = function(day, month)
{

	//Meteor Rain
	if(localStorage.getItem("stats_meteor_rain_score"+day+"/"+month))
	$("#results_meteor_rain>td:nth-child(2)").html(localStorage.getItem("stats_meteor_rain_score"+day+"/"+month));
	else
	$("#results_meteor_rain>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_meteor_rain_best_score"))
	$("#results_meteor_rain>td:nth-child(3)").html(localStorage.getItem("stats_meteor_rain_best_score"));
	else
	$("#results_meteor_rain>td:nth-child(3)").html("");


	//Starships
	if(localStorage.getItem("stats_starships_level"+day+"/"+month))
	$("#results_starships>td:nth-child(2)").html(localStorage.getItem("stats_starships_level"+day+"/"+month));
	else
	$("#results_starships>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_starships_best_level"))
	$("#results_starships>td:nth-child(3)").html(localStorage.getItem("stats_starships_best_level"));
	else
	$("#results_starships>td:nth-child(3)").html("");

	//Fueling
	if(localStorage.getItem("stats_fueling_level"+day+"/"+month))
	$("#results_fueling>td:nth-child(2)").html(localStorage.getItem("stats_fueling_level"+day+"/"+month));
	else
	$("#results_fueling>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_fueling_best_level"))
	$("#results_fueling>td:nth-child(3)").html(localStorage.getItem("stats_fueling_best_level"));
	else
	$("#results_fueling>td:nth-child(3)").html("");

	//Cube Match
	if(localStorage.getItem("stats_сube_match_score"+day+"/"+month))
	$("#results_сube_match>td:nth-child(2)").html(localStorage.getItem("stats_сube_match_score"+day+"/"+month));
	else
	$("#results_сube_match>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_сube_match_best_score"))
	$("#results_сube_match>td:nth-child(3)").html(localStorage.getItem("stats_сube_match_best_score"));
	else
	$("#results_сube_match>td:nth-child(3)").html("");

	//Orientation
	if(localStorage.getItem("stats_orientation_score"+day+"/"+month))
	$("#results_orientation>td:nth-child(2)").html(localStorage.getItem("stats_orientation_score"+day+"/"+month));
	else
	$("#results_orientation>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_orientation_best_score"))
	$("#results_orientation>td:nth-child(3)").html(localStorage.getItem("stats_orientation_best_score"));
	else
	$("#results_orientation>td:nth-child(3)").html("");

	//Observation Speed
	if(localStorage.getItem("stats_observation_speed_level"+day+"/"+month))
	$("#results_observation_speed>td:nth-child(2)").html(localStorage.getItem("stats_observation_speed_level"+day+"/"+month));
	else
	$("#results_observation_speed>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_observation_speed_best_level"))
	$("#results_observation_speed>td:nth-child(3)").html(localStorage.getItem("stats_observation_speed_best_level"));
	else
	$("#results_observation_speed>td:nth-child(3)").html("");

	//Very Sharp Eye
	if(localStorage.getItem("stats_very_sharp_eye_level"+day+"/"+month))
	$("#results_very_sharp_eye>td:nth-child(2)").html(localStorage.getItem("stats_very_sharp_eye_level"+day+"/"+month));
	else
	$("#results_very_sharp_eye>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_very_sharp_eye_best_level"))
	$("#results_very_sharp_eye>td:nth-child(3)").html(localStorage.getItem("stats_very_sharp_eye_best_level"));
	else
	$("#results_very_sharp_eye>td:nth-child(3)").html("");

	//Lost Starships
	if(localStorage.getItem("stats_lost_starships_level"+day+"/"+month))
	$("#results_lost_starships>td:nth-child(2)").html(localStorage.getItem("stats_lost_starships_level"+day+"/"+month));
	else
	$("#results_lost_starships>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_lost_starships_best_level"))
	$("#results_lost_starships>td:nth-child(3)").html(localStorage.getItem("stats_lost_starships_best_level"));
	else
	$("#results_lost_starships>td:nth-child(3)").html("");

	//Direction
	if(localStorage.getItem("stats_direction_score"+day+"/"+month))
	$("#results_direction>td:nth-child(2)").html(localStorage.getItem("stats_direction_score"+day+"/"+month));
	else
	$("#results_direction>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_direction_best_score"))
	$("#results_direction>td:nth-child(3)").html(localStorage.getItem("stats_direction_best_score"));
	else
	$("#results_direction>td:nth-child(3)").html("");

	//Musical Planets
	if(localStorage.getItem("stats_musical_planets_level"+day+"/"+month))
	$("#results_musical_planets>td:nth-child(2)").html(localStorage.getItem("stats_musical_planets_level"+day+"/"+month));
	else
	$("#results_musical_planets>td:nth-child(2)").html("");

	if(localStorage.getItem("stats_musical_planets_best_level"))
	$("#results_musical_planets>td:nth-child(3)").html(localStorage.getItem("stats_musical_planets_best_level"));
	else
	$("#results_musical_planets>td:nth-child(3)").html("");
	resize_iframe();
}

training_var.rezet_result_info(training_var.workout.curent_day, training_var.workout.curent_month, training_var.workout.curent_thismonth);
