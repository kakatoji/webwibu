<script type="text/javascript" charset="utf-8">
  $('input[name="filesh"]').on('change', async function(e){
    $('textarea[name=code]').val(await getFileContent(e.target.files[0]));
  });

  $('form[method=POST]#form').on('submit', function(e){

    var result = $('')
    var submit = $(e.target).find('')

    submit.attr('disabled', true);

    postData(window.location.pathname, new FormData(this), ot={
      dataType: 'JSON',
      beforeSend: loadSwal,
      complete: function(){
        grecaptcha.reset();
      }
    })
      .done(function({ data, msg }){
        result.find('a.btn-success.btn-block[download]').remove()

        if(data){
          var data = buildDl(data, 'sbo', 'sh');
          result.append(
            `
            <a class="btn btn-block btn-success" href="${data.url}" download="${data.name}">Download</a>
            `
          );
        }
      })
      .fail(function({ responseJSON }){
      })
    e.preventDefault();
  });
</script>
