<?php include('index.php');?>
<script>
$(document).ready(function() {
  $("#files").change(function() {
    $("#fileinfo").remove();
    var store = files;
    var reader = new FileReader();
    if (store.files[0]) {
      var data = store.files[0];
      reader.onloadstart = function(event) {
        console.log("star");
      };
      reader.onprogress = function(nAll) {
        console.log("progres");
      };
      reader.onload = function(fileLoadedEvent) {
        $("#result")
          .show()
          .val(reader.result);
        $("#info").append(
          '<span id="fileinfo">Name: ' +
            data.name +
            "<br>Size: " +
            data.size +
            "<br>Type: " +
            data.type +
            "</span><br>"
        );
        if (data.type.match(/image\//g)) {
          alert("Gambar: " + data.type);
        }
      };
      reader.onloadend = function(event) {
        console.log("onloaded");
      };
      reader.onabort = function(event) {
        console.log("abort: " + reader.abort);
        $("#result")
          .show()
          .val(reader.abort);
      };
      reader.onerror = function(event) {
        console.log("error: " + reader.error);
        $("#result")
          .show()
          .val(reader.error);
      };
      //reader.readAsDataURL(data); //base64
      reader.readAsText(data);
    } else {
      alert("Error 😁😀");
    }
  });
});
</script>
<h1>CLEANER VARIABEL</h1>
<form method="POST" enctype="multipart/form-data">
  <input class="my-2" name="obf" type="file" id="files"><br>
  <div id="info"></div>
  <div id="form-group">
    <textarea class="form-control" id="result" rows="8"></textarea>
  </div>
  <div class="my-2 form-group">
    <button name="submit" class="btn btn-primary" type="submit" id="submit">Bersih</button>
  </div>
</form>
<?php
error_reporting(0);
if(isset($_POST['submit'])){
if(!empty($_FILES['obf'])){
$var=utf8_encode(file_get_contents($_FILES['obf']['tmp_name']));
if(preg_match_all('/(?:\$[\x{0080}-\x{FFFF}A-Za-z0-9]+)(?=\W)/u',$var,$code))
{
  $vars=array_unique($code[0]);
  foreach ($vars as $i => $cd)
  {
      $vm="\$var_{$i}";
      $var=str_replace($cd,$vm,$var);
  }
  $b64cde = base64_encode($var);
  $fnm    = 'b-'.time().'-res.php';
  echo '<div class="form-group my-2">
          <textarea class="form-control my-2" rows="8">'.$var.'</textarea>
        </div>
  ';
  echo "<a class='btn btn-success btn-block' href='data:application/octet-stream;base64,$b64cde' download='$fnm'>download</a>";
   }
  }
}
?>
<?php include('template/footer.php');?>
