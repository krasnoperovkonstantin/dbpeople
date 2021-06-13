$( init );

function init() {
  $( "#save" ).click( save );
  $( "#upload" ).click( upload );
  $( "#age" ).bind( "change keyup input", function () {
      if ( this.value.match( /[^0-9]/g ) ) {
        this.value = this.value.replace( /[^0-9]/g, "" );
    }
  });
}

function save() {
  $form1=$( "#form1" );
  $.post( "save.php", $form1.serialize(), function( data ) {
    if ( data=="1" ){
      $( "#status" ).text( "Информация сохранена в базе данных" );
      $form1.trigger( "reset" );
    } else {
      $( "#status" ).text( "Не корректный запрос" );
    }
  });
}

function upload() {
  $( "#upload" ).attr( "disabled", true );
  $( "#status" ).text( "создание документа..." );
  gapi.load( "client:auth2", initClient );
}

function uploadSuccess( documentId ){
  console.log( "uploadSuccess" );
  window.open( "https://docs.google.com/document/d/" + documentId + "/edit" );
  $( "#upload" ).attr( "disabled", false );
  $( "#status" ).text( "" );
}

function progressbar( length ){
  $( "#status" ).text( "выгрузка, осталось элементов: " + length );
}
