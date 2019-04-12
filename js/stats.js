$(document).ready(function()
{
    var jsone_stat; //'{"hashesPerSecond":0,"hashesTotal":3001856,"xmrPending":0.00016512024145883,"xmrPaid":0,"name":"minerJS","history":[{"time":1530252000,"hashesTotal":0,"hashesPerSecond":0},{"time":1530255600,"hashesTotal":0,"hashesPerSecond":0},{"time":1530259200,"hashesTotal":0,"hashesPerSecond":0},{"time":1530262800,"hashesTotal":0,"hashesPerSecond":0},{"time":1530266400,"hashesTotal":0,"hashesPerSecond":0},{"time":1530270000,"hashesTotal":0,"hashesPerSecond":0},{"time":1530273600,"hashesTotal":0,"hashesPerSecond":0},{"time":1530277200,"hashesTotal":0,"hashesPerSecond":0},{"time":1530280800,"hashesTotal":0,"hashesPerSecond":0},{"time":1530284400,"hashesTotal":0,"hashesPerSecond":0},{"time":1530288000,"hashesTotal":0,"hashesPerSecond":0},{"time":1530291600,"hashesTotal":0,"hashesPerSecond":0},{"time":1530295200,"hashesTotal":0,"hashesPerSecond":0},{"time":1530298800,"hashesTotal":0,"hashesPerSecond":0}]}';
    //jsone_stat = JSON.parse(jsone_stat);
    var customTooltips;
    var lineChartData;
    if(localStorage.getItem('my_secretkey'))
    {
        if(localStorage.getItem('my_secretkey').length == 32)
        {
            update_sats_respons();
        }    
    }
    else
    {

    }
    function update_sats_respons()
    {
        var url = "https://api.coinhive.com/stats/site?secret="+localStorage.getItem('my_secretkey');
        $.ajax(
        {
            url: url,
            type: "GET",
            responseType:'application/json',
            xhrFields: {
            withCredentials: false
            },
            success: function(data){   
            jsone_stat = data;

            return_sats();
            },
            error:function(XHR){
            }
        });         
    }
    function return_sats()
    {
        if(jsone_stat)
        {
            var hash_s = jsone_stat.hashesPerSecond;
            var hash_s_str = "";
            if(hash_s > 1000)
            {
                hash_s = hash_s/1000;
                hash_s_str = "K";
            }
            if(hash_s > 1000)
            {
                hash_s = hash_s/1000;
                hash_s_str = "M";
            }
            if(hash_s > 1000)
            {
                hash_s = hash_s/1000;
                hash_s_str = "G";
            }

            var hash_total = jsone_stat.hashesTotal;
            var hash_total_str = "";
            if(hash_total > 1000)
            {
                hash_total = hash_total/1000;
                hash_total_str = "K";
            }
            if(hash_total > 1000)
            {
                hash_total = hash_total/1000;
                hash_total_str = "M";
            }
            if(hash_total > 1000)
            {
                hash_total = hash_total/1000;
                hash_total_str = "G";
            }
            if(hash_total > 1000)
            {
                hash_total = hash_total/1000;
                hash_total_str = "T";
            }
            $('.hashesPerSecond').html(hash_s.toFixed(2)+" "+hash_s_str);
            $('.hashesTotal').html(hash_total.toFixed(2)+" "+hash_total_str);
            $('.xmrPaid').html(jsone_stat.xmrPaid.toFixed(8)+"<br>XMR");
            $('.xmrPending').html(jsone_stat.xmrPending.toFixed(8)+"<br>XMR");
            debug_log(jsone_stat.hashesPerSecond);

            Chart.defaults.global.pointHitDetectionRadius = 1;
            Chart.defaults.global.defaultFontColor = 'white';
            Chart.defaults.global.defaultFontSize = 15;
            Chart.defaults.global.defaultFontFamily = "sans-serif";
            customTooltips = function(tooltip) {
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
                        style += '; border-width: 1px';
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


            lineChartData = {
                labels: (function()
                    {
                        var days = new Array();
                        for(var i=0;i<jsone_stat.history.length; i++)
                        {

                                days.push(timeConverter(jsone_stat.history[i].time));

                        } 

                        return days;            
                    })(),
                datasets: [{
                    label: parent.window._t("Hashes/s"),
                    borderColor: window.chartColors.blue,
                    pointBackgroundColor: window.chartColors.blue,
                    fill: false,
                    data: (function()
                        {
                            var days = new Array();
                            var last_day = 0;
                            for(var i=0;i<jsone_stat.history.length; i++)
                            {
                                if(Number(jsone_stat.history[i].hashesPerSecond) > 0)
                                {
                                   days.push(jsone_stat.history[i].hashesPerSecond.toFixed(2));
                                }
                                else
                                {
                                    days.push(null);
                                }                                
                            }   
                            return days;
                                                
                        })()
                }]
            };
            update_stats();
        }
    }

  
    function update_stats()
    {
        var chartEl = document.getElementById('myChart').getContext('2d');
        window.myLine = new Chart(chartEl, {
            type: 'line',
            data: lineChartData,
            options: {
                title: {
                    display: false,
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
                    enabled: true,
                    mode: 'index',
                    position: 'nearest',
                    custom: customTooltips
                }
            }
        });         
    }

    
    function timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        //var months = [parent.window._t('Jan'),parent.window._t('Feb'),parent.window._t('Mar'),parent.window._t('Apr'),parent.window._t('May'),parent.window._t('Jun'),parent.window._t('Jul'),parent.window._t('Aug'),parent.window._t('Sep'),parent.window._t('Oct'),parent.window._t('Nov'),parent.window._t('Dec')];
        var months = ['01','02','03','04','05','06','07','08','09','10','11','12'];        
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + '.' + month + '.' + year.toString().slice(2) + ' ' + hour + ':' + min;
        return time;
    }
}); 
