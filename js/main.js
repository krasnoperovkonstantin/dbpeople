$( init );

function init() {
  $('#save').click( save );
}

function save() {
  $form1=$('#form1');
  //alert( $form1.serialize() );
  $.get('save.php', $form1.serialize(), function( data ){
    if ( data=="1" ){
      alert("Информация сохранена в базе данных");
      $form1.trigger("reset");
    } else {
      alert(data);
    }
});
}



