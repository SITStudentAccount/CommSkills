
// CREATE A REFERENCE TO FIREBASE
var config = {
	apiKey: "AIzaSyDOl9P1XEPMvI4bUAtm9A8S34m9upfUZIo",
	authDomain: "ict3001-bb85a.firebaseapp.com",
	databaseURL: "https://ict3001-bb85a.firebaseio.com",
    storageBucket: "ict3001-bb85a.appspot.com",
    messagingSenderId: "597329719830"
};
firebase.initializeApp(config);
					  
var messagesRef = firebase.database().ref().child("Gesture");
  //var messagesRef = new Firebase('https://ict3001-bb85a.firebaseio.com');

  // REGISTER DOM ELEMENTS
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var messageList = $('#example-messages');

  // LISTEN FOR KEYPRESS EVENT
  messageField.keypress(function (e) {
    if (e.keyCode == 13) {
      //FIELD VALUES
      var username = nameField.val();
      var message = messageField.val();

      //SAVE DATA TO FIREBASE AND EMPTY FIELD
      messagesRef.push({name:username, text:message});
      messageField.val('');
    }
  });

  // Add a callback that is triggered for each chat message.
  messagesRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.name || "anonymous";
    var message = data.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>")
    nameElement.text(username);
    messageElement.text(message).prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });