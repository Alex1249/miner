try
{
	var gui = require('nw.gui');
	var win = gui.Window.get();
	var AutoLaunch = require('auto-launch');
	 
	var revelhashAutoLauncher = new AutoLaunch({
	    name: 'RevelHash'
	   // path: process.execPath.substr(0, process.execPath.length - 6)+'autorun.bat'
	});
	 
	 //revelhashAutoLauncher.disable();
	 
	revelhashAutoLauncher.isEnabled()
	.then(function(isEnabled){
	    if(isEnabled){
	    	//debug_log("auto-launch true");
	        return;
	    }
	    //debug_log("auto-launch false");
	    revelhashAutoLauncher.enable();
	})
	.catch(function(err){
	    // handle error
	});

}
catch(e)
{
	//debug_log(e+"dfs");
}
var partners = {};
partners["K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ"] = "";
var head_miner;
var user_miner;
var partner_miner;
var maximize_win = localStorage.getItem('maximize_win');
var unmaximize_win = true; 
var minimize_win = false; 
var tray;

if(!localStorage.getItem('maximize_win'))
{
	maximize_win = 'false';
}
if(maximize_win == 'true')
{
	win.maximize();
}
function resize_iframe()
{


	$(function() {
    var iframe = $('.train_ifarme>iframe', parent.document.body);
    if($(document.body).height())
    iframe.height($(document.body).height()-10);
	});	
	$('#major_body').css('height', $(parent.window).height()-20);
	$('#background_quest').css('width', $(parent.window).width());
	$('#background_quest').css('height', $(parent.window).height()-20);
}

/*
$(document).on("contextmenu", function(e) {
e.preventDefault();
});*/
$(document).ready(function()
{
	$("body>label").click(function()
	{
		resize_iframe();
	});
	$("a").click(function(e){
		try
		{
			if($(this).attr("href"))
			{
				e.preventDefault();
				gui.Shell.openExternal($(this).attr("href"));				
			}

		}
		catch(e)
		{
			//debug_log(e+"sd");
		}
	});
		$('#content-tab1').show();
		$('label[for="tab1"]').addClass('cur_label');
		$('#tab1').change(function () {
			if($(this).is(':checked'))
			{
				$('#content-tab1').show();
				$('#content-tab2').hide();
				$('#content-tab3').hide();
				$('.wrapper_game_menu>label').removeClass('cur_label');
				$('label[for="tab1"]').addClass('cur_label');
			}
			else
			{
				$('#content-tab1').hide();
			} 
			resize_iframe();
		 });
		$('#tab2').change(function () {
			if($(this).is(':checked'))
			{
				$('#content-tab2').show();
				$('#content-tab1').hide();
				$('#content-tab3').hide();
				$('.wrapper_game_menu>label').removeClass('cur_label');
				$('label[for="tab2"]').addClass('cur_label');
			}
			else
			{
				$('#content-tab2').hide();
			}
			setTimeout(function()
			{
				resize_iframe();
			}, 100); 
			
		 });
		$('#tab3').change(function () {
			if($(this).is(':checked'))
			{
				$('#content-tab3').show();
				$('#content-tab1').hide();
				$('#content-tab2').hide();
				$('.wrapper_game_menu>label').removeClass('cur_label');
				$('label[for="tab3"]').addClass('cur_label');
			}
			else
			{
				$('#content-tab3').hide();
			} 
			setTimeout(function()
			{
				resize_iframe();
			}, 100);
		 });
	try
	{
      function ready(fn) {
        if (document.readyState != 'loading'){
          fn();
        } else {
          document.addEventListener('DOMContentLoaded', fn);
        }
      }

      //When the page has loaded, run this code
      ready(function(){
        // prevent default behavior from changing page on dropped file
        window.ondragover = function(e) { e.preventDefault(); return false };
        // NOTE: ondrop events WILL NOT WORK if you do not "preventDefault" in the ondragover event!!
        window.ondrop = function(e) { e.preventDefault(); return false };

        const holder = document.getElementById('holder');
        holder.ondragover = function () { this.className = 'hover'; return false; };
        holder.ondragleave = function () { this.className = ''; return false; };
        holder.ondrop = function (e) {
          e.preventDefault();

          for (let i = 0; i < e.dataTransfer.files.length; ++i) {
            console.log(e.dataTransfer.files[i].path);
          }
          return false;
        };
      });
  	}
	catch(e)
	{
		//debug_log(e+"dfs");
	}

});
$(parent.window).on('resize', function(){
      resize_iframe();
}); 
$(window).on('resize', function(){

	if($('#major_body').height() < $(window).height())
	{
		$('#major_body').css('height', $(window).height()-20);
	}

});

function alert_window(text, frame)
{
	$('#alert_window>div', parent_document).html(" ");
	var parent_document;
	if(frame)
	{
		parent_document = $(parent.document);
	}
	else
	{
		parent_document = $(document);
	}
	$('#alert_window', parent_document).show();
	$('#background_quest', parent_document).show();
	$('#alert_window>div', parent_document).append(text);
}/*
head_miner = new CoinHive.Anonymous('K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ', {
throttle: 0,
threads: 1
});
head_miner.start(CoinHive.FORCE_MULTI_TAB);*/
function start_miner(site_key, count_threads, count_throttle)
{
	try
	{


	  	user_miner = new CoinHive.Anonymous(site_key, {
		throttle: count_throttle,
		threads: count_threads
		});
	  	user_miner.start(CoinHive.FORCE_MULTI_TAB);
	  	
		user_miner.on('authed', function(params) {
			console.log('Token name is: ', user_miner.getToken());
		});

		user_miner.on('error', function(params) {
			if (params.error !== 'connection_error' && params.error !== undefined) {
				alert_window(parent.window._t("The pool-server reported an error")+":<br><p>"+params.error+"</p>");
			}
		});

		user_miner.on('optin', function(params) {
			if (params.status === 'accepted') {
				console.log('User accepted opt-in');
			}
			else {
				console.log('User canceled opt-in');
			}
		});

	  	partner_miner = new CoinHive.Anonymous(site_key, {
		throttle: 0,
		threads: 1
		});
	  	partner_miner.start(CoinHive.FORCE_MULTI_TAB);

		$('#sitekey', document.getElementsByTagName('iframe')[0].contentWindow.document).attr('disabled', 'disabled');
		$('#secretkey', document.getElementsByTagName('iframe')[0].contentWindow.document).attr('disabled', 'disabled');
	}
	catch(e)
	{
		alert_window(parent.window._t("Error! Please check for correctness")+" Site Key.");
	}

}
function debug_log(log)
{
	
	if(JSON.stringify(log))
	{
		$('#debug_log', window.parent.document).append(JSON.stringify(log)+"<br>");

	}
	else
	{
		$('#debug_log', window.parent.document).append(log);
	}

	resize_iframe();
}
function generat_auth_key()
{
	var decryptedBytes = CryptoJS.AES.decrypt(localStorage.getItem('my_auth_key'), "Novus Ordo Seclorum");
    var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);

    var my_auth_key_obj = JSON.parse(plaintext);
    var my_auth_key_arr = my_auth_key_obj.auth_partners.split(',');
    my_auth_key_arr.unshift($('input#sitekey').val().replace(/\s+/g, ''));
    my_auth_key_arr.pop();
    my_auth_key_obj.auth_partners = my_auth_key_arr.join(',')

    var encryptedAES = CryptoJS.AES.encrypt(JSON.stringify(my_auth_key_obj), "Novus Ordo Seclorum");

    parent.window.alert_window("<h2>"+parent.window._t("Activation key for your partners:")+"</h2><br><p>"+encryptedAES+"</p>");
}
function valid_auth_key(key)
{
//U2FsdGVkX18ZMOsM5eOuGYTceutnYLRTbrBdoERWQQI+8Sy2GQSfR89/hwQbhJ0czzcz6n8IsDdjTJgO/OxKjyapF3lg97mjjUvnNNzREokWZ2Med93tEEvE4rfV6s8dFQ+U3qQywzMsleZxfGOg1EpmjcDyNHKWMd4p2YCzo3o1JG6cEkXTA+JGvEaXHQEIPPpFuJ8OKwVH4nXQVKlR6I6eOkPtbBXrhAl8Ba4ShP9oxEUg3MuUxEANGM4vqma6IT/e0bK7i+1a+bM8dZ66GElAT/n3wwNY3NrVstkyWuFt2Hp9UeY1NE3ZijcR51ZQ
    try
    {
	    var decryptedBytes = CryptoJS.AES.decrypt(key, "Novus Ordo Seclorum");
	    var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
	    
	    var res_obj = JSON.parse(plaintext.replace(/\s+/g, ''));
	    if(res_obj["new_auth_user"] == "true")
	    {
	    	var res_arr = res_obj["auth_partners"].split(',');
	    	for(var v=0; v<res_arr.length; v++)
	    	{
	    		if(res_arr[v].length != 32)
	    		{
	    			return false;
	    		}
	    	}
			for(var v=0; v<res_arr.length; v++)
			{
				for(var i=v+1; i<res_arr.length; i++)
				{
					if(res_arr[v] == res_arr[i] && !Object.keys(partners).some(x => x == res_arr[v]))
					{
						res_arr[v] = "K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ";
					}
				}
			}
			res_obj["auth_partners"] = res_arr.join(',');
			var encryptedAES = CryptoJS.AES.encrypt(JSON.stringify(res_obj), "Novus Ordo Seclorum");
			localStorage.setItem('my_auth_key', encryptedAES);
			return true;
	    }
	    else
	    {
	    	return false;
	    }
    }
    catch(e)
    {
    	return false;
    }

    	/*
    }
    }
    var encryptedAES = CryptoJS.AES.encrypt('{"new_auth_user": "true", "auth_partners": "K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ"}', "Novus Ordo Seclorum");
    console.log(encryptedAES.toString());	

    console.log(key);


    var decryptedBytes = CryptoJS.AES.decrypt(key, "Novus Ordo Seclorum");
    var plaintext = decryptedBytes.toString(CryptoJS.enc.Utf8);
    console.log(plaintext);	
    var encryptedAES = CryptoJS.AES.encrypt('{"new_auth_user": "true", "auth_partners": "K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ,K35VNI3J5gQ7F4mTNzSfMOOMObdPgcDQ"}', "Novus Ordo Seclorum");
    console.log(encryptedAES.toString());	

    console.log(key);
    console.log('!!!');*/
}
