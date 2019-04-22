//AJAX call for the image button
$("#project-img-upload").on("click", function(event) {
  event.preventDefault();

  var data = new FormData();
  $.each($("#file")[0].files, function(i, file) {
    console.log($("#file")[0].file);
    data.append("file-" + i, file);
  });

  $.ajax({
    url: "/uploads",
    data: data,
    cache: false,
    contentType: false,
    processData: false,
    method: "POST",
    success: function(data) {
      alert(data);
    }
  });

  /*$.post("/uploads", $(this).serialize(), function(data) {
    console.log("Success: " + data);
  }).error(function() {
    // This is executed when the call to mail.php failed.
  });*/
});
