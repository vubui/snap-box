var rowCount=0;
function createStatusbar(obj)
{
     rowCount++;
     var row="odd";
     if(rowCount %2 ==0) row ="even";
     this.statusbar = $("<div class='statusbar "+row+"'></div>");
     this.filename = $("<div class='filename'></div>").appendTo(this.statusbar);
     this.size = $("<div class='filesize'></div>").appendTo(this.statusbar);
     this.status = $("<div class='filesize'></div>").appendTo(this.statusbar);
  
     obj.after(this.statusbar);
 
    this.setFileNameSize = function(name,size, status)
    {
/*        var sizeStr="";
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
 */
        this.filename.html(name);
        this.size.html(size);
        if (status==true) this.status.html("Deleted"); else this.status.html("Pending"); 
    }
}

function updateHistory(files,obj)
{
   for (var i = 0; i < files.length; i++) 
   {
        var status = new createStatusbar(obj); //Using this we can set progress.
        status.setFileNameSize(files[i].file_name,files[i].deletion_date.$date, files[i].deletion_status);
   }
}

files = {};

// ajax
$.ajax({
  type: "GET",
  dataType: "json",
  url: "https://api.mongolab.com/api/1/databases/snapbox/collections/schedule?apiKey=YUKjYvofAmJT5vdbqQOs6uerLIkbeV7v",
  success: function(response) {
    files = response;
    console.log(response);
  },
  error: function(error) {
    console.log(error);
  }
}).done(function() {
  var obj = $(".history");
  updateHistory(files, obj);
});
