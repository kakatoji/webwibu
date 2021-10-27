async function getFileContent(file) {
  const reader = new FileReader();
  return await new Promise(resv => {
    reader.onload = function(evt) {
      resv(evt.target.result);
    };
    reader.readAsText(file);
  });
}

function loadingBox() {
  $("#resultBox").html(`
    <div class="box">
    <div class="box-header with-border">
    <h3 class="box-title">Result</h3>
    </div>
    <div class="box-body">
    loading...
    </div>
    <!-- /.box-body -->
    <!-- Loading (remove the following to stop the loading)-->
    <div class="overlay">
    <i class="fa fa-refresh fa-spin"></i>
    </div>
    <!-- end loading -->
    </div>
    `);
}
function loadSwal(kemon) {
  return Swal.fire({
    didRender: () => {
      Swal.showLoading();
    },
    allowOutsideClick: false,
    showConfirmButton: false,
    backdrop: '#ffffffc2',
    background: 'none'
  });
}
function postData(url, data, ot = {}) {
  if (ot.complete) {
    var cm = ot.complete;
    var limit = $("#limit-key").attr("data-url");
    if (limit) {
      ot.complete = function() {
        $.get(limit, function(data) {
          $("#limit-key").text(data);
        });
        cm();
      };
      ot.xhrFields = {
        withCredentials: true
      };
    }
  }
  return $.ajax({
    url: url,
    type: 'POST',
    contentType: false,
    cache: false,
    processData: false,
    data: (function(x) {
      if (x.constructor.name !== "FormData") {
        data = new FormData(); for (o in x) data.append(o, x[o]);
        x = data;
      }
      if ($("input[type=file]")[0] && $("input[type=file]")[0].files.length == 0)
        x.delete($("input[type=file]").attr("name"));
      return x;
    })(data),
    ...ot
  })
}

function buildDl(data, name, ext, nb64 = false) {
  return {
    name: `${name}-${(new Date()).getTime()}.${ext}`,
    url: ((!nb64) ? 'data:application/octet-stream;base64,'+data: window.URL.createObjectURL((data && data.constructor && data.constructor.name === "Blob" ? data: new Blob([data]))))
  }
}

function enableSubmit(data) {
  $('form').has('div.g-recaptcha[data-callback="enableSubmit"]').find('button[type="submit"]').attr('disabled', false);
}


function randomFilename(name, ext) {
  return name + (new Date()).getTime() + '.' + ext;
}


function paste(e) {
  navigator.clipboard && navigator.clipboard.readText()
  .then(data => {
    $(e).parent().parent().find('input.form-control,textarea.form-control').val(data);
  });
}
