var client = new Dropbox.Client({key: "gzh9gtknnfo104t"});
var realFiles;

$(function () {
	$('#loginDropbox').click(function (e) {
		e.preventDefault();
		// This will redirect the browser to OAuth login.
		client.authenticate({"redirect_uri" : "snap.html"});
	});

	$('#uploadDropbox').click(function (e) {
		e.preventDefault();
		var user_email;
		var current_file;
		var deletion_date = Date.parse($("#datepicker").val()+" "+$("#timepicker").val());
		console.log(deletion_date);
		client.getAccountInfo(function (error, info) {
		    user_email = info.email;
		});
		// This will redirect the browser to OAuth login.
		for (var i = 0; i < realFiles.length; i++) {
			current_file = realFiles[i];
			client.writeFile(current_file.name, current_file, {"noOverwrite" : false}, function(error, stat) {
				if (error) {
					console.log("Fail");
				}
				console.log("Success");
				var json = '{'
			       +'"user" : "'+user_email+'",'
			       +'"token"  : "'+client.credentials().token+'",'
			       +'"file_name" : "/'+current_file.name+'",'
			       +'"deletion_date" : "'+deletion_date+'",'
			       +'"tag" : "100"'
			       +'}';
			    var url = "https://api.mongolab.com/api/1/databases/snapbox/collections/dauxanh?apiKey=YUKjYvofAmJT5vdbqQOs6uerLIkbeV7v";
			    /*$.post(url, new jQuery.parseJSON(json), function(data){}, "json" )
			    	.done(function() {
			    		window.location = "history.html";
			    	})
			    	.fail(function() {
			    		$("#error-message").show().delay(3000);
			    		$(document).location = "snap.html";
			    	});*/

// 					$.ajax({
// 						type: 'POST',
// 						data: data,
// 						dataType: "json",
// 						url: url
// 					}).done(function(){
// 					window.location = "history.html";	
// 					}).fail(function() {
// $("#error-message").show().delay(3000);
// 			    		$(document).location = "snap.html";
// 					});

				var xhr = new XMLHttpRequest();
				xhr.open("POST", "https://api.mongolab.com/api/1/databases/snapbox/collections/dauxanh?apiKey=YUKjYvofAmJT5vdbqQOs6uerLIkbeV7v", true);
				xhr.setRequestHeader("Content-Type", "application/json");
				xhr.send(json);
				// $("#error-message").show().delay(3000);
			});
		}

		// window.location = "history.html";
	});

	// Try to finish OAuth authorization.
	client.authenticate({interactive:false}, function (error) {
		if (error) {
			alert('Authentication error: ' + error);
		}
	});

	if (client.isAuthenticated()) { 
		if (window.location.pathname=="/app/index.html") window.location = "snap.html";
	}

	var obj = $("#draganddrop");
	obj.on('dragenter', function (e) 
	{
	    e.stopPropagation();
	    e.preventDefault();
	    $(this).css('border', '4px dashed #3482E1');
	});
	obj.on('dragover', function (e) 
	{
	     e.stopPropagation();
	     e.preventDefault();
	});
	obj.on('drop', function (e) 
	{
		$(this).css('border', '4px dashed rgba(0, 0, 0, 0.2)');
		e.preventDefault();
		var files = e.originalEvent.dataTransfer.files;
		realFiles = files;

        // hide drag and drop windows
        obj.slideUp();
        $('h2').show();
        $('.uploadDiv').show();

		//We need to send dropped files to Server
		handleFileUpload(files,obj);
	});
	$(document).on('dragenter', function (e) 
	{
	    e.stopPropagation();
	    e.preventDefault();
	});
	$(document).on('dragover', function (e) 
	{
	  e.stopPropagation();
	  e.preventDefault();
	  obj.css('border', '4px dashed rgba(0, 0, 0, 0.2)');
	});
	$(document).on('drop', function (e) 
	{
	    e.stopPropagation();
	    e.preventDefault();
	});

});


function sendFileToServer(formData,status)
{
    var uploadURL ="http://hayageek.com/examples/jquery/drag-drop-file-upload/upload.php"; //Upload URL
    var extraData ={}; //Extra Data.
    var jqXHR=$.ajax({
            xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                    xhrobj.upload.addEventListener('progress', function(event) {
                        var percent = 0;
                        var position = event.loaded || event.position;
                        var total = event.total;
                        if (event.lengthComputable) {
                            percent = Math.ceil(position / total * 100);
                        }
                        //Set progress
                        status.setProgress(percent);
                    }, false);
                }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        success: function(data){
            status.setProgress(100);
 
            $("#status1").append("File upload Done<br>");         
        }
    }); 
 
    status.setAbort(jqXHR);
}
 
var rowCount=0;
function createStatusbar(obj)
{
     rowCount++;
     var row="odd";
     if(rowCount %2 ==0) row ="even";
     this.statusbar = $("<div class='statusbar "+row+"'></div>");
     this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
     this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
     /*this.progressBar = $("<div class='progressBar'><div></div></div>").appendTo(this.statusbar);
    */  
     obj.after(this.statusbar);
 
    this.setFileNameSize = function(name,size)
    {
        var sizeStr="";
        var sizeKB = size/1024;
        if(parseInt(sizeKB) > 1024)
        {
            var sizeMB = sizeKB/1024;
            sizeStr = sizeMB.toFixed(2)+" MB";
        }
        else
        {
            sizeStr = sizeKB.toFixed(2)+" KB";
        }
 
        this.filename.html(name);
        this.size.html(sizeStr);
    }
    this.setProgress = function(progress)
    {       
        var progressBarWidth =progress*this.progressBar.width()/ 100;  
        this.progressBar.find('div').animate({ width: progressBarWidth }, 10).html(progress + "% ");
        if(parseInt(progress) >= 100)
        {
            this.abort.hide();
        }
    }
    this.setAbort = function(jqxhr)
    {
        var sb = this.statusbar;
        this.abort.click(function()
        {
            jqxhr.abort();
            sb.hide();
        });
    }
}
function handleFileUpload(files,obj)
{
   for (var i = 0; i < files.length; i++) 
   {
        var fd = new FormData();
        fd.append('file', files[i]);
 
        var status = new createStatusbar(obj); //Using this we can set progress.
        status.setFileNameSize(files[i].name,files[i].size);
   }
}