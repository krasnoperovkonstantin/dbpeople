  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
   function initClient() {
    // Client ID and API key from the Developer Console
    var CLIENT_ID = '251614148407-9gv6bkaqfpvg8u601se0riu5jenj04u7.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyDtggxDFVhFkfpeVAAx77cFHmViN5XL3Uc';
  
    // Array of API discovery doc URLs for APIs used by the quickstart
    var DISCOVERY_DOCS = ['https://docs.googleapis.com/$discovery/rest?version=v1'];
  
    // Authorization scopes required by the API; multiple scopes can be
    // included, separated by spaces.
    var SCOPES = "https://www.googleapis.com/auth/documents";
  
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then( function() {
      if ( gapi.auth2.getAuthInstance().isSignedIn.get() ) {
        exportDoc();
      } 
      else {
        gapi.auth2.getAuthInstance().isSignedIn.listen( exportDoc );
        gapi.auth2.getAuthInstance().signIn();
      }
    }, function( error ) {
      console.log( error );
    });
  }
  
  function exportDoc() {
    console.log ( "exportDoc" );
    var now = new Date();
      gapi.client.docs.documents.create( {
        "title": "Возраст больше 18 лет (" + now.toLocaleString() + ")"
      }).then( function( response ) {
      var documentId = response.result.documentId;
      insertTableDoc( documentId );
    }, function( response ) {
      console.log ( response );
    });
  }
  
  function createContentArray( parsedata ) {
    contentCells = new Array();
    parsedata.unshift( { firstname: "Имя", lastname: "Фамилия", age: "Возраст" } );
    parsedata.forEach( function( item, row, array ) {
      if ( item.firstname.length > 0 ) {
        contentCells.push( { content: item.firstname, row: row, col: 0 } );
      }
      if ( item.lastname.length > 0 ) {
        contentCells.push( { content: item.lastname, row: row, col: 1 } );
      }
      contentCells.push( { content: item.age, row: row, col: 2 } );
    });
    return contentCells;
  }
  
  function insertTableDoc( documentId ) {
    $.get( 'upload.php', function( data ){
      var parsedata = JSON.parse( data );
      var rows = parsedata.length + 1;
      gapi.client.docs.documents.batchUpdate( {
      "documentId": documentId,    
      "requests": [
        {
          "insertTable": {
            "columns": 3,
            "rows": rows,
            "location": {
              "index": 1
            }
          }
        }
      ]
      }).then( function( response ) {
      
        insertText( createContentArray( parsedata ), documentId );
      }, function( response ) {
        console.log( response );
      });
    })
  }
  
  function insertText( contentCells, documentId ) {
    gapi.client.docs.documents.get( {
    "documentId": documentId,    
    } ).then( function( response ) {
      var content = response.result.body.content;
      var revisionId = response.result.revisionId;
      contentOneCell = contentCells.shift();
      console.log( contentOneCell );
      content.forEach( function( item, index, array ) {
        if ( "table" in item ) {
            var contentIndex = item
                                .table
                                .tableRows[ contentOneCell.row ]
                                .tableCells[contentOneCell.col]
                                .content[0]
                                .paragraph
                                .elements[0]
                                .startIndex;    
            gapi.client.docs.documents.batchUpdate( {
              "documentId": documentId,    
              "requests": [
                {
                  "insertText": {
                    "location": {
                      "index": contentIndex
                    },
                    "text": contentOneCell.content
                    }
                  }
                ],
                "writeControl": {
                  "targetRevisionId": revisionId
                }
              }).then( function( response ) {
              if ( contentCells.length == 0 ) {
                uploadSuccess( documentId );
              } else
              {
                progressbar( contentCells.length );
                insertText( contentCells, documentId );
              }
            }, function( response ) {
              console.log( response );
            })   
        };
      });
    }, function( response ) {
      console.log ( response );
    });
  }
  
  function uploadSuccess( documentId ){
    console.log( "uploadSuccess" );
    window.open( 'https://docs.google.com/document/d/' + documentId + '/edit' );
    $( "#upload" ).attr( "disabled", false );
    $( "#upload" ).text( "выгрузить" );
  }
  
  function progressbar( length ){
    $( "#upload" ).text( "выгрузка, осталось элементов: " + length );
  }
  