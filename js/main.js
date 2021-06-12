$( init );

function init() {
  $( '#save' ).click( save );
  $( '#upload' ).click( upload );
  $( '#age' ).bind( 'change keyup input', function () {
      if ( this.value.match( /[^0-9]/g ) ) {
        this.value = this.value.replace( /[^0-9]/g, '' );
    }
  });
}

function save() {
  $form1=$( '#form1' );
  $.post( 'save.php', $form1.serialize(), function( data ) {
    if ( data=="1" ){
      alert( "Информация сохранена в базе данных" );
      $form1.trigger( "reset" );
    } else {
      alert( "Не корректный запрос" );
    }
  });
}

function upload() {
  $( "#upload" ).attr( "disabled", true );
  $( "#upload" ).text( "создание документа" );
  gapi.load( 'client:auth2', initClient );
}
